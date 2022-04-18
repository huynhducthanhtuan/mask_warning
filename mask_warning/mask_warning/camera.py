import cv2

cap = cv2.VideoCapture(0)

ret, frame = cap.read()

while 1:
    cv2.imshow('camera',frame)
    
