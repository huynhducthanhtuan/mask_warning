from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.contrib.auth import authenticate, login
from google.cloud.firestore_v1.field_path import FieldPath
import firebase_admin, json, os, jwt, datetime, smtplib
from email.mime.text import MIMEText
from firebase_admin import credentials, firestore

# init app
cred = credentials.Certificate(fr"{os.getcwd()}\mask_warning\mask-warning-787c4c69708d.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


def Home(request):
    return JsonResponse({"page": "home"})


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

        # Nếu userName ko tồn tại
        if (_id == ""):
            return JsonResponse({"error": "User not found."})
        else:
            check = False
            docs_2 = db.collection(f"users").where(u"userName", u"==", f"{userName}").where(u"password", u"==", f"{password}").stream()
            for doc in docs_2:
                check = True if (doc.id != "") else False

            if (check == False):
                return JsonResponse({"error": "Username and password doesn't match."})
            else:
                # Token
                payload_data = {"_id": _id}
                my_secret = '1asda242efwefwe'
                token = jwt.encode(
                    payload=payload_data,
                    key=my_secret
                )
                token = "Bearer " + token

                return JsonResponse({
                    "token": token,
                    "user": {
                        "_id": _id,
                        "userName": userName,
                        "fullName": fullName
                    }
                })


def Signout(request):
    return JsonResponse({"message": "Sign out success !!"})


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
        
    return JsonResponse({
        'notifications': notifications[:quantity] if quantity else notifications
    })


def ForgotPasswordCreateNewPassword(request):
    if request.method == "POST":
        # Lấy dữ liệu client gởi lên (email, newPassword)
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        email = body_data["email"]
        newPassword = body_data["newPassword"]

        # Lấy ra mảng chứa document đó theo email
        docs = db.collection('users').where(u"email", u"==", f"{email}").stream()
        docId = ""
        for doc in docs: 
            docId = doc.id

        # Lấy ra đích thị document đó theo document id và cập nhật password
        if docId != "":
            db.collection('users').document(docId).update({'password': newPassword})
            return JsonResponse({"message": "success"})
        else:
            return JsonResponse({"message": "fail"})


def CheckEmailExist(request):
    if request.method == "POST":
        # Lấy dữ liệu client gởi lên (email, newPassword)
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        email = body_data["email"]

        # Lấy ra mảng chứa document đó theo email
        docs = db.collection('users').where(u"email", u"==", f"{email}").stream()
        check = False

        # Nếu có document đó thì check = True   
        for doc in docs: 
            check = True

        return JsonResponse({"isExistEmail": check})

