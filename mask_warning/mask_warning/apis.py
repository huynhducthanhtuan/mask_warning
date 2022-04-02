from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.contrib.auth import authenticate, login
from google.cloud.firestore_v1.field_path import FieldPath
import firebase_admin, json, os, jwt, datetime
from firebase_admin import credentials, firestore


# init app use a service account
cred = credentials.Certificate(fr"{os.getcwd()}\mask_warning\mask-warning-787c4c69708d.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


def Home(request):
    return JsonResponse({"page": "home"})


# --> Chưa xử lí xong
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
                return JsonResponse({"error": "userName and password doesn't match."})
            else:
                # Token
                payload_data = {"_id": _id}
                my_secret = '1asda242efwefwe'
                token = jwt.encode(
                    payload=payload_data,
                    key=my_secret
                )
                token = "Bearer " + token

                # # Cookie
                # response = HttpResponse()
                # time = datetime.datetime.utcnow() + datetime.timedelta(days=1)
                # expires = time.strftime("%a, %d %b %Y %H:%M:%S GMT")
                # response.set_cookie('t', token, max_age=None, expires=expires)
                # # return response: lưu cookie
                # return response
                # logic này chưa thể done vì nó cần làm 2 tác vụ 1 lúc (lưu cookie và trả về json)

                return JsonResponse({
                    "token": token,
                    "user": {
                        "_id": _id,
                        "userName": userName,
                        "fullName": fullName
                    }
                })


# --> Chưa xử lí xong
def Signout(request):
    # response = HttpResponse()
    # if request.COOKIES.get('t'):
    #     response.delete_cookie("t")
    # return response
    return JsonResponse({"message": "Sign out success !!"})


# --> OK
def Profile(request, userId):
    filter = [db.document(f'users/{userId}')]
    docs = db.collection(f"users").where(FieldPath.document_id(), u'in', filter).get()
    result = {}
    for doc in docs:
        result = doc.to_dict()
    return JsonResponse(result)


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
