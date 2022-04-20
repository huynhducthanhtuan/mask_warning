from django.http import HttpResponse, StreamingHttpResponse, JsonResponse
from django.shortcuts import render
from django.core.mail import EmailMessage
from django.views.decorators import gzip
from .apis import GetVideoStreamUrl

# detect part import the necessary packages
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.models import load_model
from imutils.video import VideoStream
import numpy as np
import threading, imutils, time, cv2, os


def detect_and_predict_mask(frame, faceNet, maskNet):
	# grab the dimensions of the frame and then construct a blob
	# from it
	(h, w) = frame.shape[:2]
	blob = cv2.dnn.blobFromImage(frame, 1.0, (224, 224),
		(104.0, 177.0, 123.0))

	# pass the blob through the network and obtain the face detections
	faceNet.setInput(blob)
	detections = faceNet.forward()

	# initialize our list of faces, their corresponding locations,
	# and the list of predictions from our face mask network
	faces = []
	locs = []
	preds = []

	# loop over the detections
	for i in range(0, detections.shape[2]):
		# extract the confidence (i.e., probability) associated with
		# the detection
		confidence = detections[0, 0, i, 2]

		# filter out weak detections by ensuring the confidence is
		# greater than the minimum confidence
		if confidence > 0.5:
			# compute the (x, y)-coordinates of the bounding box for
			# the object
			box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
			(startX, startY, endX, endY) = box.astype("int")

			# ensure the bounding boxes fall within the dimensions of
			# the frame
			(startX, startY) = (max(0, startX), max(0, startY))
			(endX, endY) = (min(w - 1, endX), min(h - 1, endY))

			# extract the face ROI, convert it from BGR to RGB channel
			# ordering, resize it to 224x224, and preprocess it
			face = frame[startY:endY, startX:endX]
			face = cv2.cvtColor(face, cv2.COLOR_BGR2RGB)
			face = cv2.resize(face, (224, 224))
			face = img_to_array(face)
			face = preprocess_input(face)

			# add the face and bounding boxes to their respective
			# lists
			faces.append(face)
			locs.append((startX, startY, endX, endY))

	# only make a predictions if at least one face was detected
	if len(faces) > 0:
		# for faster inference we'll make batch predictions on *all*
		# faces at the same time rather than one-by-one predictions
		# in the above `for` loop
		faces = np.array(faces, dtype="float32")
		preds = maskNet.predict(faces, batch_size=32)

	# return a 2-tuple of the face locations and their corresponding locations
	return (locs, preds)

# load our serialized face detector model from disk
prototxtPath = fr"{os.getcwd()}\deploy.prototxt"
weightsPath = fr"{os.getcwd()}\res10_300x300_ssd_iter_140000.caffemodel"
faceNet = cv2.dnn.readNet(prototxtPath, weightsPath)

# load the face mask detector model from disk
maskNet = load_model(fr"{os.getcwd()}\mask_detector.model")
# maskNet = load_model("keras_model.h5")
# initialize the video stream

# Create red corner
pts = np.array([[15,15], [625, 15], 
	[625, 465], [15, 465]],
	np.int32)
pts = pts.reshape((-1, 1, 2))

# Frame time when red corner off
redCornerOffTime = [7,8,9]


def stream(videoStream):
	cap = cv2.VideoCapture(videoStream) 
	frame_count = 0

	while True:
		frame_count += 1
		ret, frame = cap.read()
		(locs, preds) = detect_and_predict_mask(frame, faceNet, maskNet)

        # loop over the detected face locations and their corresponding
        # locations
		for (box, pred) in zip(locs, preds):
			# unpack the bounding box and predictions
			(startX, startY, endX, endY) = box
			(mask, withoutMask) = pred

			# determine the class label and color we'll use to draw
			# the bounding box and text
			# and put red corner if need
			if mask > withoutMask:
				label = 'Mask'
				color = (0, 255, 0)
				frame_count = 0

			else:
				label = 'No Mask'
				color = (0, 0, 255)

				isOnRedcorner = True

				for time_off in redCornerOffTime:
					if frame_count % time_off == 0:
						isOnRedcorner = False
						break

				if isOnRedcorner:
					frame = cv2.polylines(frame, [pts], isClosed=True, color=color, thickness=30)


			# include the probability in the label
			label = "{}: {:.2f}%".format(label, max(mask, withoutMask) * 100)

			
			# display the label and bounding box rectangle on the output
			# frame
			cv2.putText(frame, label, (startX, startY - 10),
				cv2.FONT_HERSHEY_SIMPLEX, 0.45, color, 2)
			cv2.rectangle(frame, (startX, startY), (endX, endY), color, 2)
		
		if not ret:
			print("Error: failed to capture image")
			break

		cv2.imwrite('demo.jpg', frame)
		yield (b'--frame\r\n'
				b'Content-Type: image/jpeg\r\n\r\n' + open('demo.jpg', 'rb').read() + b'\r\n')


def showCamera(request, userId):
	try:
		if request.method == "GET":
			videoStreamUrl = GetVideoStreamUrl(userId)
			return StreamingHttpResponse(stream(videoStreamUrl), content_type='multipart/x-mixed-replace; boundary=frame')
	except:
		return JsonResponse({"error": "Connect camera failed"})

