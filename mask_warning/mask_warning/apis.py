from django.http import JsonResponse
import firebase_admin
from firebase_admin import credentials, firestore
from google.cloud.firestore_v1.field_path import FieldPath
# import datetime
# import string
# import random
# import pytz
# from proto.datetime_helpers import DatetimeWithNanoseconds

# initialize_app use a service account
cred = credentials.Certificate(r'C:\Users\asus\PycharmProjects\mask_warning\mask_warning\mask_warning\mask-warning-787c4c69708d.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

# [READ] data
def Home(request):
    result = {

    }
    return JsonResponse(result)

def Signin(request):
    result = {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjMzNjBhODUyMTlhMTljN2UyZjA2NDciLCJpYXQiOjE2NDg0NDUxMDd9.ySlGukTpYBTaVOquCgGrlgqUD_GnZqfUBYFfSWEpFbQ",
        "user": {
            "_id": "623360a85219a19c7e2f0647",
            "email": "kante@gmail.com",
            "name": "Kante"
        }
    }
    return JsonResponse(result)

# --> OK
def Profile(request, role, userId):
    # test_userId: 6iNhPp5x1UFYhlUJ8WSA
    # test_adminId: JDCfs6ZdljJLsUIwnQpZ

    users_ref = db.collection(f"{role}s")
    filter = [db.document(f'{role}s/{userId}')]

    docs = users_ref.where(FieldPath.document_id(), u'in', filter).get()
    result = {}
    for doc in docs:
        result = doc.to_dict()
    return JsonResponse(result)


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


# [QUERY] data
# 1. Get full collection
# admins = db.collection("admins").stream()
# for admin in admins:
#     print(f'{admin.to_dict()}')

# 2. Get documents report has isSolved is False
# docs = db.collection('reports').where('isSolved', '==', False).stream()
# for doc in docs:
#   print(f'{doc.id} => {doc.to_dict()}')

