from django.http import HttpResponse, StreamingHttpResponse, JsonResponse
from django.shortcuts import render
from django.core.mail import EmailMessage
from django.views.decorators import gzip
from playsound import playsound
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.models import load_model
from imutils.video import VideoStream
from .apis import GetVideoStreamUrl
import threading, imutils, time, cv2, os, numpy as np
from threading import Thread


def detect_and_predict_mask(frame, faceNet, maskNet, zoomRate):
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

# # load our serialized face detector model from disk
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
redCornerOffFrame = [7,8,9]

def playUnmaskSound(urlSound):
    # using play sound
    playsound(urlSound)


def stream(videoStreamUrl):
    # cap = cv2.VideoCapture("rtsp://admin:123@192.168.11.105:80/onvif13") 
    # cap = cv2.VideoCapture("rtsp://admin:123@192.168.11.105:8080/onvif13") 
    # cap = cv2.VideoCapture(videoStreamUrl)
    threaded_camera = ThreadedCamera(videoStreamUrl) 
    frame_count = 0

    limitCallSound = 22;
    lastFrameCallSound = 0
    urlSound = fr"{os.getcwd()}\vuilongdeokhautrang.mp3"
    while True:
        frame_count += 1
        frame = threaded_camera.show_frame()
        (h,w) = frame.shape[:2]

        # print('----------------------\n',h,w)
        # frame = imutils.resize(frame,width=400)
        # (h,w) = frame.shape[:2]
        # print(h,w,'-----------------------\n')
        zoomRate = float(400) / w
        # ret,frame = cap.read()
        (locs, preds) = detect_and_predict_mask(imutils.resize(frame,width=400), faceNet, maskNet, zoomRate)

        # loop over the detected face locations and their corresponding
        # locations
        for (box, pred) in zip(locs, preds):
            # unpack the bounding box and predictions
            (startX, startY, endX, endY) = box
            (startX, startY, endX, endY) = (np.int32(startX*3.2), np.int32(startY*3.2), np.int32(endX*3), np.int32(endY*3))
            # print(startX, startY, endX, endY)
            (mask, withoutMask) = pred


            # test pull request
            # # determine the class label and color we'll use to draw
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

            for time_off in redCornerOffFrame:
                if frame_count % time_off == 0:
                    isOnRedcorner = False
                    break
            
            # print(h,w)
            if isOnRedcorner:
                cv2.rectangle(frame, (0, 0), (w, h), color, 40)
                
            #     frame = cv2.polylines(frame, [pts], isClosed=True, color=color, thickness=30)

            if label == 'No Mask' and lastFrameCallSound == 0 or frame_count - lastFrameCallSound >= limitCallSound:
                lastFrameCallSound = frame_count

                # using play sound
                # playsound(urlSound)

                # using vlc
                # p = vlc.Me
                # diaPlayer(urlSound)
                # p.play()
                # time.sleep(3)
                # p.stop()
                t2 = threading.Thread(target=playUnmaskSound, args=(urlSound,))
                t2.start()


            # include the probability in the label
            label = "{}: {:.2f}%".format(label, max(mask, withoutMask) * 100)

            


            # display the label and bounding box rectangle on the output
            # frame
            cv2.putText(frame, label, (startX, startY - 10),
                cv2.FONT_HERSHEY_SIMPLEX, 0.45, color, 2)
            cv2.rectangle(frame, (startX, startY), (endX, endY), color, 2)
        
        

        cv2.imwrite('demo.jpg', frame)
        yield (b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + open('demo.jpg', 'rb').read() + b'\r\n')
        # yield (b'--frame\r\n'
        #         b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

def showCamera(request, userId):
    try:
        if request.method == "GET":
            videoStreamUrl = GetVideoStreamUrl(userId)
            return StreamingHttpResponse(stream(videoStreamUrl), content_type='multipart/x-mixed-replace; boundary=frame')
            # return StreamingHttpResponse(stream(), content_type='multipart/x-mixed-replace; boundary=frame')
    except:
        return JsonResponse({"error": "Connect camera failed"})
    # return StreamingHttpResponse(stream(), content_type='multipart/x-mixed-replace; boundary=frame')


def index(request):
    return render(request,'my_app/index.html')

class ThreadedCamera(object):
    def __init__(self, src=0):
        self.capture = cv2.VideoCapture(src)
        self.capture.set(cv2.CAP_PROP_BUFFERSIZE, 2)
       
        # FPS = 1/X
        # X = desired FPS
        self.FPS = 1/40
        self.FPS_MS = int(self.FPS * 1000)
        
        # Start frame retrieval thread
        self.thread = Thread(target=self.update, args=())
        self.thread.daemon = True
        self.thread.start()
        
    def update(self):
        while True:
            if self.capture.isOpened():
                (self.status, self.frame) = self.capture.read()
            time.sleep(self.FPS)
            
    def show_frame(self):
        cv2.waitKey(self.FPS_MS)
        return self.frame
        # image = self.frame
        # _, jpeg = cv2.imencode('.jpg', image)
        # return jpeg.tobytes()