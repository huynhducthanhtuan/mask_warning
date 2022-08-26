# import the necessary packages
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.models import load_model
from imutils.video import VideoStream
import numpy as np
import imutils
import time
import cv2
import os
import pandas as pd

# function to calculate minimum distance from all colors and get the most matching color
def get_color_name(R, G, B):
    minimum = 10000
    for i in range(len(csv)):
        d = (
            abs(R - int(csv.loc[i, "R"]))
            + abs(G - int(csv.loc[i, "G"]))
            + abs(B - int(csv.loc[i, "B"]))
        )
        if d <= minimum:
            minimum = d
            cname = csv.loc[i, "color_name"]
    return cname


face_cascade = cv2.CascadeClassifier("./haarcascade_frontalface_default.xml")


def detect_and_predict_mask(frame, maskNet):

    faces = []
    locs = []
    preds = []

    face_rects = face_cascade.detectMultiScale(frame)

    for (x, y, wf, hf) in face_rects:
        (startX, startY, endX, endY) = (x, y, x + wf, y + hf)
        # ensure the bounding boxes fall within the dimensions of
        # the frame
        (startX, startY) = (max(0, startX), max(0, startY))
        (endX, endY) = (min(w - 1, endX), min(h - 1, endY))
        print(startX, startY, endX, endY)
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


def detectColor(frame, x, y):
    global h, w

    if y >= h or x >= w:
        return frame

    b, g, r = frame[y, x]
    b = int(b)
    g = int(g)
    r = int(r)

    cv2.circle(frame, (x, y), 2, color, -1)
    # cv2.rectangle(image, start point, endpoint, color, thickness)-1 fills entire rectangle
    # cv2.rectangle(frame, (20, 20), (750, 60), (b, g, r), -1)

    # Creating text string to display( Color name and RGB values )
    text = (
        get_color_name(r, g, b)
        + " R="
        + str(r)
        + " G="
        + str(g)
        + " B="
        + str(b)
    )

    # cv2.putText(frame,text,start,font(0-7),fontScale,color,thickness,lineType )
    # cv2.putText(frame, text, (50, 50), 2, 0.8, (255, 255, 255), 2, cv2.LINE_AA)

    # For very light colours we will display text in black colour
    # if r + g + b >= 600:
    # cv2.putText(frame, text, (50, 50), 2, 0.8, (0, 0, 0), 2, cv2.LINE_AA)

    return text


# Load csv color file
index = ["color_name", "R", "G", "B"]
csv = pd.read_csv("./maMau4.csv", names=index, header=None)

# load our serialized face detector model from disk
prototxtPath = r"face_detector\deploy.prototxt"
weightsPath = r"face_detector\res10_300x300_ssd_iter_140000.caffemodel"
faceNet = cv2.dnn.readNet(prototxtPath, weightsPath)

# load the face mask detector model from disk
maskNet = load_model("mask_detector.model")

# initialize the video stream
print("[INFO] starting video stream...")
vs = cv2.VideoCapture(
    "rtsp://192.168.1.45:554/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif"
)
frame = vs.read()
h, w = frame.shape[:2]
zoomRate = w / float(400)
# loop over the frames from the video stream
while True:
    # grab the frame from the threaded video stream and resize it
    # to have a maximum width of 400 pixels
    ret, frame = vs.read()

    # detect faces in the frame and determine if they are wearing a
    # face mask or not
    (locs, preds) = detect_and_predict_mask(
        imutils.resize(frame, width=400), faceNet, maskNet
    )

    # loop over the detected face locations and their corresponding
    # locations
    for (box, pred) in zip(locs, preds):
        # unpack the bounding box and predictions
        (startX, startY, endX, endY) = box
        (startX, startY, endX, endY) = (
            np.int32(startX * zoomRate),
            np.int32(startY * zoomRate),
            np.int32(endX * zoomRate),
            np.int32(endY * zoomRate),
        )
        (mask, withoutMask) = pred

        # determine the class label and color we'll use to draw
        # the bounding box and text
        label = "Mask" if mask > withoutMask else "No Mask"
        color = (0, 255, 0) if label == "Mask" else (0, 0, 255)

        colorDetec = detectColor(
            frame,
            np.int32(startX + (endX - startX) / 2),
            np.int32(endY + (endY - startY) / 2),
        )
        # include the probability in the label
        label = "{}: {:.2f}%".format(label, max(mask, withoutMask) * 100)
        label += f"-{colorDetec}"
        # display the label and bounding box rectangle on the output
        # frame
        cv2.putText(
            frame,
            label,
            (startX, startY - 10),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.45,
            color,
            2,
        )
        cv2.rectangle(frame, (startX, startY), (endX, endY), color, 2)

    # show the output frame
    cv2.imshow("Frame", frame)
    key = cv2.waitKey(1) & 0xFF

    # if the `q` key was pressed, break from the loop
    if key == ord("q"):
        break

# do a bit of cleanup
cv2.destroyAllWindows()
vs.stop()
