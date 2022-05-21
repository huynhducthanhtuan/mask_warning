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
import pandas as pd

index = ["color_name","R","G","B"]
csv = pd.read_csv('./maMau4.csv', names=index, header=None)
h,w = 0,0



def get_color_name(R, G, B):
    minimum = 10000
    cname = 'undefined'
    r,g,b = 0,0,0
    for i in range(len(csv)):
        r = R - int(csv.loc[i, "R"])
        g = G - int(csv.loc[i, "G"])
        b = B - int(csv.loc[i, "B"])
        d = np.sqrt(r**2+b**2+g**2)
        if d <= minimum:
            minimum = d
            cname = csv.loc[i, "color_name"]

    return cname

def detectColor(frame,x,y,color):
    h,w = frame.shape[:2]

    if y >= h or x >= w:
        return 'undefined'

    b, g, r = frame[y, x]
    b = int(b)
    g = int(g)
    r = int(r)

    # cv2.circle(frame, (x,y),3,color,-1)
    # cv2.rectangle(image, start point, endpoint, color, thickness)-1 fills entire rectangle
    # cv2.rectangle(frame, (20, 20), (750, 60), (b, g, r), -1)

    # Creating text string to display( Color name and RGB values )
    text = get_color_name(r, g, b)

    # cv2.putText(frame,text,start,font(0-7),fontScale,color,thickness,lineType )
    # cv2.putText(frame, text, (50, 50), 2, 0.8, (255, 255, 255), 2, cv2.LINE_AA)

    # For very light colours we will display text in black colour
    # if r + g + b >= 600:
        # cv2.putText(frame, text, (50, 50), 2, 0.8, (0, 0, 0), 2, cv2.LINE_AA)

    return text
face_cascade = cv2.CascadeClassifier('./haarcascade_frontalface_default.xml')

def predict_mask(frame, maskNet):
    h,w = frame.shape[:2]    
    faces = []
    locs = []
    preds = []

    face_rects = face_cascade.detectMultiScale(frame) 
    
    for (x,y,wf,hf) in face_rects: 
        (startX, startY, endX, endY) = (x,y,x+wf,y+hf)
        if(wf*hf <= 10000):
            continue
        # ensure the bounding boxes fall within the dimensions of
        # the frame
        (startX, startY) = (max(0, startX), max(0, startY))
        (endX, endY) = (min(w - 1, endX), min(h - 1, endY))
        # extract the face ROI, convert it from BGR to RGB channel
        # ordering, resize it to 224x224, and preprocess it
        face = frame[startY:endY, startX:endX]
        face = cv2.cvtColor(face, cv2.COLOR_BGR2RGB)
        # cv2.imshow('face',face)
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
redCornerOffFrame = [5,6]

prefix = fr"{os.getcwd()}\colorSound\prefix.mp3"
posfix = fr"{os.getcwd()}\colorSound\posfix.mp3"

def playUnmaskSound(unmaskColors):

    if unmaskColors == ['undefined']:
        playsound(fr"{os.getcwd()}\colorSound\undefined.mp3")
        return
    unmaskColors = list(dict.fromkeys(unmaskColors))
    print(unmaskColors)
    playsound(prefix)
    for color in unmaskColors:
        if color not in'undefined':
            playsound(fr"{os.getcwd()}\colorSound\{color}.mp3")
    playsound(posfix)


def stream(videoStreamUrl):
    # cap = cv2.VideoCapture("rtsp://admin:123@192.168.11.105:80/onvif13") 
    # cap = cv2.VideoCapture("rtsp://admin:123@192.168.11.105:8080/onvif13") 
    # cap = cv2.VideoCapture(videoStreamUrl)
    threaded_camera = ThreadedCamera(videoStreamUrl) 
    frame_count = 0

    limitCallSound = 150
    lastFrameCallSound = 0
    limitDetected = 100
    lastFrameDetect = 0
    isOnRedcorner = False
    lastFrameRedCorner = 0
    stopFrameRedCorner = 0
    while True:

        try:
            frame,frame_count = threaded_camera.show_frame()
        except:
            print(frame_count,'-fail')
            continue

        h,w = frame.shape[:2]
        if (frame_count - lastFrameDetect >= limitDetected) or (lastFrameDetect == 0):
            lastFrameDetect = frame_count
            (locs, preds) = predict_mask(frame,maskNet)

            # loop over the detected face locations and their corresponding
            # locations
            unmaskColors = []

            for (box, pred) in zip(locs, preds):
                # unpack the bounding box and predictions
                (startX, startY, endX, endY) = box
                # print(startX, startY, endX, endY)
                (mask, withoutMask) = pred

                # determine the class label and color we'll use to draw
                # the bounding box and text
                # and put red corner if need
                if mask > withoutMask:
                    label = 'Mask'
                    color = (0, 255, 0)

                else:
                    label = 'No Mask'
                    color = (0, 0, 255)
                    isOnRedcorner = True

                
                
                # print(h,w)
                    
                #     frame = cv2.polylines(frame, [pts], isClosed=True, color=color, thickness=30)

                shirtColor = detectColor(frame,np.int32(startX+(endX-startX)/2),np.int32(endY+(endY-startY)/1.7),color)

                # print(frame_count,lastFrameCallSound)
                if label == 'No Mask':
                    unmaskColors.append(shirtColor)


                # include the probability in the label
                label = "{}: {:.2f}%".format(label, max(mask, withoutMask) * 100)
                label += f'-{shirtColor}'
                


                # display the label and bounding box rectangle on the output
                # frame
                # cv2.putText(frame, label, (startX, startY - 10),
                #     cv2.FONT_HERSHEY_SIMPLEX, 0.45, color, 2)
                cv2.rectangle(frame, (startX, startY), (endX, endY), color, 2)

            if unmaskColors != [] :
                if stopFrameRedCorner < frame_count:
                    stopFrameRedCorner = frame_count + 200

                if frame_count - lastFrameCallSound >= limitCallSound:
                    lastFrameCallSound = frame_count
                    t2 = threading.Thread(target=playUnmaskSound, args=(unmaskColors,))
                    t2.start()
        
        # print(stopFrameRedCorner,frame_count)
        if stopFrameRedCorner >= frame_count:
            lastFrameRedCorner = frame_count
            for offTime in redCornerOffFrame:
                if lastFrameRedCorner % offTime == 0:
                    isOnRedcorner = False
                    break
            if isOnRedcorner:
                cv2.rectangle(frame, (0, 0), (w, h), (0, 0, 255), 20)  
            isOnRedcorner = True
        key = cv2.waitKey(1) & 0xFF
        if key == ord("q"):
            break
        cv2.imwrite('demo.jpg', frame)
        yield (b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + open('demo.jpg', 'rb').read() + b'\r\n')

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
        self.frameCount = 0
        (self.status, self.frame) = self.capture.read()
        h,w = self.frame.shape[:2]
        # FPS = 1/X
        # X = desired FPS
        self.FPS = 1/50
        self.FPS_MS = int(self.FPS * 1000)
        
        # Start frame retrieval thread
        self.thread = Thread(target=self.update, args=())
        self.thread.daemon = True
        self.thread.start()
        
    def update(self):
        while True:
            if self.capture.isOpened():
                self.frameCount += 1
                (self.status, self.frame) = self.capture.read()
            time.sleep(self.FPS)
            
    def show_frame(self):
        cv2.waitKey(self.FPS_MS)
        return self.frame,self.frameCount
        # image = self.frame
        # _, jpeg = cv2.imencode('.jpg', image)
        # return jpeg.tobytes()