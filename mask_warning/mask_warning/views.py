from django.shortcuts import render
from django.http import HttpResponse
from django.core.mail import EmailMessage
from django.views.decorators import gzip
from django.http import StreamingHttpResponse
import threading

# detect part import the necessary packages
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.models import load_model
from imutils.video import VideoStream
import numpy as np
import imutils
import time
import cv2

def detect_and_predict_mask(frame, faceNet, maskNet):
	# grab the dimensions of the frame and then construct a blob
	# from it
	(h, w) = frame.shape[:2]
	blob = cv2.dnn.blobFromImage(frame, 1.0, (224, 224),
		(104.0, 177.0, 123.0))

	# pass the blob through the network and obtain the face detections
	faceNet.setInput(blob)
	detections = faceNet.forward()
	print(detections.shape)

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

	# return a 2-tuple of the face locations and their corresponding
	# locations
	return (locs, preds)

# load our serialized face detector model from disk // can sua duong dan
prototxtPath = r"C:\Users\asus\Desktop\NCKH\6. CODE\FULL-STACK\mask_warning\mask_warning\deploy.prototxt"
weightsPath = r"C:\Users\asus\Desktop\NCKH\6. CODE\FULL-STACK\mask_warning\mask_warning\res10_300x300_ssd_iter_140000.caffemodel"
faceNet = cv2.dnn.readNet(prototxtPath, weightsPath)

# load the face mask detector model from disk
maskNet = load_model(r"C:\Users\asus\Desktop\NCKH\6. CODE\mask_warning\mask_warning\mask_detector.model")
# maskNet = load_model("keras_model.h5")
# initialize the video stream


# Create your views here.
def example_view(request):
    # my_app/templates/my_app/example.html
    my_var = {'fullname':'Nguyen Hong Lich', 'mylist':[1,2,3,4]}
    return render(request,'my_app/example.html', context=my_var)

def variable_view(request):
    
    return render(request,'my_app/variable.html')

def webcam(request):
    return render(request, 'my_app/app1.html')
@gzip.gzip_page
def Home(request):
    try:
        cam = VideoCamera()
        return StreamingHttpResponse(gen(cam), content_type="multipart/x-mixed-replace;boundary=frame")
    except:
        pass
    return render(request, 'my_app/app1.html')

#to capture video class
class VideoCamera(object):
    def __init__(self):
        self.video = cv2.VideoCapture(0)
        (self.grabbed, self.frame) = self.video.read()
        threading.Thread(target=self.update, args=()).start()

    def __del__(self):
        self.video.release()

    def get_frame(self):
        image = self.frame
        _, jpeg = cv2.imencode('.jpg', image)
        return jpeg.tobytes()

    def update(self):
        while True:
            (self.grabbed, self.frame) = self.video.read()

def gen(camera):
    while True:
        frame = camera.get_frame()
        # (locs, preds) = detect_and_predict_mask(frame, faceNet, maskNet)

        # # loop over the detected face locations and their corresponding
        # # locations
        # for (box, pred) in zip(locs, preds):
        #     # unpack the bounding box and predictions
        #     (startX, startY, endX, endY) = box
        #     (mask, withoutMask) = pred

        #     # determine the class label and color we'll use to draw
        #     # the bounding box and text
        #     label = "Mask" if mask > withoutMask else "No Mask"
        #     color = (0, 255, 0) if label == "Mask" else (0, 0, 255)

        #     # include the probability in the label
        #     label = "{}: {:.2f}%".format(label, max(mask, withoutMask) * 100)

        #     # display the label and bounding box rectangle on the output
        #     # frame
        #     cv2.putText(frame, label, (startX, startY - 10),
        #         cv2.FONT_HERSHEY_SIMPLEX, 0.45, color, 2)
        #     cv2.rectangle(frame, (startX, startY), (endX, endY), color, 2)
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')


def stream():
	cap = cv2.VideoCapture(0) 

	while True:
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
			label = "Mask" if mask > withoutMask else "No Mask"
			color = (0, 255, 0) if label == "Mask" else (0, 0, 255)

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

def video_feed(request):
    return StreamingHttpResponse(stream(), content_type='multipart/x-mixed-replace; boundary=frame')

def index(request):
    return render(request,'my_app/index.html')