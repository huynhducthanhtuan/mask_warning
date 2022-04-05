from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.contrib.auth import authenticate, login
from google.cloud.firestore_v1.field_path import FieldPath
import firebase_admin, json, os, jwt, datetime, smtplib, socket
from socket import gaierror
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
                        # "userName": userName,
                        # "fullName": fullName
                    }
                })


def Signout(request):
    return JsonResponse({"message": "Sign out success !!"})


def ViewProfile(request):
    if request.method == "POST":
        # Lấy dữ liệu client gởi lên
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        userId = body_data["userId"]
        print(userId)
        
        # Xử lí
        try:
            doc_ref = db.collection(f"users").document(userId)
            doc = doc_ref.get().to_dict()

            result = {
                "storeName": doc.get("storeName"),
                "fullName": doc.get("fullName"),
                "email": doc.get("email"),
                "gender": doc.get("gender"),
                "address": doc.get("address").split(",")[0].strip(),
                "district": doc.get("address").split(",")[1].strip(),
                "hometown": doc.get("address").split(",")[2].strip(),
                "phoneNumber": doc.get("phoneNumber"),
            }
            return JsonResponse(result)
        except:
            return JsonResponse({"error": "User not found"})


def UpdateProfile(request):
    if request.method == "POST":
        # Lấy dữ liệu client gởi lên
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        userId = body_data["userId"]
        hometown = body_data["hometown"]
        district = body_data["district"]
        address = body_data["address"]
        storeName = body_data["storeName"]
        phoneNumber = body_data["phoneNumber"]
        gender = body_data["gender"]
        
        # Xử lí
        try:
            doc = db.collection(f"users").document(userId)
            doc.update({
                'address': f'{address}, {district}, {hometown}',
                'phoneNumber': phoneNumber,
                'storeName': storeName,
                'gender': gender
            })
            return JsonResponse({"status": "success"})
        except:
            return JsonResponse({"status": "fail"})


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


def ForgotPasswordSendCode(request): 
    if request.method == "POST":
        # Lấy dữ liệu client gởi lên (email, newPassword)
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        email = body_data["email"]

        sender = "thanhtuanhuynh0011@gmail.com"
        receivers = [email]
        message = f"""From: From Person <{sender}>
        To: To Person <{receivers[0]}>
        Subject: Verify code to create new password - Mask Warning

        123456
        """
        print(message)

        try:
            # smtplib.SMTP_PORT
            # 116.110.250.42: Timeout
            # 127.0.0.1: Refused
            # localhost: Refused
            smtpObj = smtplib.SMTP('127.0.0.1', 5000, socket.getfqdn())
            smtpObj.sendmail(sender, receivers, message)         
            print("Successfully sent email")
            return JsonResponse({"status": "success"})

        except smtplib.SMTPException:
            print("Error: unable to send email")
            return JsonResponse({"status": "fail"})

        # Define the SMTP server
        # port = 2525
        # smtp_server = "smtp.mailtrap.io"
        # login = "c5a6b7264acd23"
        # password = "c69400ef5d34f7"

        # # specify the sender and receiver
        # sender = "thanhtuanhuynh0011@gmail.com"
        # receiver = email

        # message = f"""\
        # Subject: Verify code to create new password - Mask Warning
        # To: {receiver}
        # From: {sender}

        # Hi you, your code is: 123456"""

        # try:
        #     #send your message with credentials specified above
        #     server = smtplib.SMTP(smtp_server, port)
        #     server.login(login, password)
        #     server.sendmail(sender, receiver, message)
            
        #     # sent success
        #     print('Sent')
        #     return JsonResponse({"status": "success"})
        # except (gaierror, ConnectionRefusedError):
        #     print('Failed to connect to the server. Bad connection settings?')
        #     return JsonResponse({"status": "fail"})
        # except smtplib.SMTPServerDisconnected:
        #     print('Failed to connect to the server. Wrong user/password?')
        #     return JsonResponse({"status": "fail"})
        # except smtplib.SMTPException as e:
        #     print('SMTP error occurred: ' + str(e))
        #     return JsonResponse({"status": "fail"})

