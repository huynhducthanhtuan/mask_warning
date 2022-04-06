from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.contrib.auth import authenticate, login
import firebase_admin, json, os
from firebase_admin import credentials, firestore
from google.cloud.firestore_v1.field_path import FieldPath

# import datetime
# import string
# import random
# import pytz
# from proto.datetime_helpers import DatetimeWithNanoseconds

# init app use a service account
cred = credentials.Certificate(fr"{os.getcwd()}\mask_warning\mask-warning-787c4c69708d.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


def Home(request):
    return JsonResponse({"page": "home"})


# --> OK, cần xử lí thêm JWT
@require_http_methods(["POST"])
@csrf_exempt
def Signin(request):
    if request.method == 'POST':
        # Lấy và convert dữ liệu từ request.body
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        userName = body_data["userName"]
        password = body_data["password"]

        # Lấy thông tin _id và fullName của user
        _id = ""
        fullName = ""
        docs = db.collection(f"users").where(u"userName", u"==", f"{userName}").stream()

        for doc in docs:
            _id = doc.id
            fullName = doc.to_dict().get("fullName")

        # Neu userName ko ton tai
        if (_id == ""):
            return JsonResponse({"error": "User not found."})
        else:
            check = False
            docs_2 = db.collection(f"users").where(u"userName", u"==", f"{userName}").where(u"password", u"==", f"{password}").stream()
            for doc in docs_2:
                check = True if (doc.id != "") else False

            if (check == False):
                return JsonResponse({"error": "Email and password doesn't match."})
            else:
                return JsonResponse({
                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjMzNjBhODUyMTlhMTljN2UyZjA2NDciLCJpYXQiOjE2NDg0NDUxMDd9.ySlGukTpYBTaVOquCgGrlgqUD_GnZqfUBYFfSWEpFbQ",
                    "user": {
                        "_id": _id,
                        "userName": userName,
                        "fullName": fullName
                    }
                })


# --> OK
def Profile(request, userId):
    filter = [db.document(f'users/{userId}')]
    docs = db.collection(f"users").where(FieldPath.document_id(), u'in', filter).get()
    result = {}

    for doc in docs:
        result = doc.to_dict()
    
    return JsonResponse(result)

def Notifications(request, quantity=0):

    docs = db.collection(f'notifications').order_by(u'createdDate').stream()
    notifications = []

    for doc in docs:
        notifications.append(doc.to_dict())

    print('---------------------------\n' + str(quantity) + '------------------------')
    return JsonResponse({
        
        'notifications': notifications[:quantity] if quantity else notifications
    })

def ListOfUsers(request, pages):

    usersList = []
    nUserInPage = 2
    startIndex = (pages-1)*nUserInPage
    endIndex = startIndex + nUserInPage

    docs = db.collection(u'users').limit(endIndex+1).stream()

    for doc in docs:
        usersList.append({
            'fullName': doc.to_dict()['fullName'],
            'storeName': doc.to_dict()['storeName'],
            'createdDate': doc.to_dict()['createdDate']
        })

    if startIndex >= len(usersList) or startIndex < 0:
        return JsonResponse({
            "error": "Index out of bound."
        })

    return JsonResponse({
        'usersList': usersList[startIndex:endIndex] if endIndex < len(usersList) else usersList[startIndex]
    })
# (Tuấn) Phần code này là khi học cách làm việc với Firestore - Firebase
# [ADD] data
# arr = [
#     { "date": [2021,12,31], "totalGuest": 100000000000, "totalUnmaskGuest": 37, "onlineHours": 10, "userId": "9ijj7GXUcyKia6uc1UOq" },
#     # { "date": [2021,12,31], "totalGuest": 98, "totalUnmaskGuest": 43, "onlineHours": 12, "userId": "Lndoc3FNFjimEfMPDjiS" },
# ]
# for i in arr:
#     randomString = ''.join(random.choices(string.ascii_uppercase + string.ascii_lowercase + string.digits, k=20))
#     date = datetime.datetime(i.get("date")[0], i.get("date")[1], i.get("date")[2], 0, 0)
#     date = pytz.timezone('Asia/Ho_Chi_Minh').localize(date)
    # doc_ref = db.collection('userStatistics').document(str(randomString))
    # doc_ref.set({
    #     'date': date,
    #     'onlineHours': i.get("onlineHours"),
    #     'totalGuest': i.get("totalGuest"),
    #     'totalUnmaskGuest': i.get("totalUnmaskGuest"),
    #     'userId': i.get("userId")
    # })
    # doc_ref.set({'fullName': 'Tran Huyen My', 'address': '187 an hai, lien chieu, da nang', 'phoneNumber': '0900986450', 'createdDate': DatetimeWithNanoseconds(2021, 12, 31, 17, 0, tzinfo=datetime.timezone.utc), 'userName': 'huyenmytran', 'password': 'User120039873%', 'email': 'huyenmytran@gmail.com', 'storeName': 'Little Devil Shop'})


# [UPDATE] data (one or many fields)
# doc_ref = db.collection('userStatistics').document("ElCG5VEfomHom5IJGbTF")
# doc_ref.update({
#     'date': date,
#     'totalUnmaskGuest': 37,
# })


# [DELETE] data
# db.collection("userStatistics").document("4gdu7aK7eVwi3dBqKqCj").delete()
