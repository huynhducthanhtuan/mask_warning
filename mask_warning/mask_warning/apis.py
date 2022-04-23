from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.contrib.auth import authenticate, login
from datetime import datetime
from googletrans import Translator
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from firebase_admin import credentials, firestore
import firebase_admin, smtplib, math, random, smtplib, ssl
import string, pytz, json, os, jwt, re, pandas
DEFAULT_USER_AVATAR = "https://firebasestorage.googleapis.com/v0/b/mask-warning.appspot.com/o/user-avatars%2Fdefault-avatar.png?alt=media&token=5c74e841-ff74-43f3-a65d-583a35a5d98c"


# Init app
cred = credentials.Certificate(fr"{os.getcwd()}\mask_warning\mask-warning-787c4c69708d.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


# APIS
def Signin(userName, password):
    try:
        # Lấy ra mảng các document theo userName và password truyền vào
        docs = db.collection(f"users").where(u"userName", u"==", f"{userName}").where(u"password", u"==", f"{password}").stream()
        
        # Nếu có document chứa userName và password truyền vào thì lấy ra document id của document đó   
        userId = ""
        for doc in docs:
            userId = doc.id

        # Nếu không có document chứa userName và password truyền vào
        if (userId == ""):
            return False
        else:
            # Token
            token = jwt.encode(
                payload = {"userId": userId},
                key = '1asda242efwefwe'
            )
            token = "Bearer " + token

            return {
                "token": token,
                "user": {
                    "userId": userId
                }
            }
    except:
        return False 


def HandleSignin(request): 
    if request.method == "POST":
        # Lấy dữ liệu client gởi lên
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        userName = body_data["userName"].strip()
        password = body_data["password"].strip()

        # Nếu người dùng ko nhập gì cả
        if userName == "" or password == "":
            return JsonResponse({"message": "Please enter all information"})
        else:
            # Nếu độ dài mật khẩu < 8
            if len(password) < 8:
                return JsonResponse({"message": "Please enter password has more 8 characters"})
            else:
                # Thực hiện đăng nhập
                if Signin(userName, password) == False:
                    return JsonResponse({"message": "User name and password do not match"})
                else:
                    data = Signin(userName, password)
                    data["message"] = "Signin success"
                    return JsonResponse(data)
  

def Signout(request):
    return JsonResponse({"message": "Sign out success !!"})


def ViewProfile(request):
    if request.method == "POST":
        # Lấy dữ liệu client gởi lên
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        userId = body_data["userId"]
        
        # Xử lí
        try:
            user_ref = db.collection(f"users").document(userId)
            doc = user_ref.get().to_dict()

            result = {
                "userId": user_ref.get().id,
                "storeName": doc.get("storeName"),
                "fullName": doc.get("fullName"),
                "email": doc.get("email"),
                "gender": doc.get("gender"),
                "address": doc.get("address").split(",")[0].strip(),
                "district": doc.get("address").split(",")[1].strip(),
                "hometown": doc.get("address").split(",")[2].strip(),
                "phoneNumber": doc.get("phoneNumber"),
                "avatar": doc.get("avatar")
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


def ChangeAvatar(request):
    if request.method == "POST":
        # Lấy dữ liệu client gởi lên
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        userId = body_data["userId"]
        avatar = body_data["avatar"]
        
        # Xử lí
        try:
            doc = db.collection(f"users").document(userId)
            doc.update({
                'avatar': avatar
            })
            return JsonResponse({"status": "success"})
        except:
            return JsonResponse({"status": "fail"})


def GetCurrentTimestamp():
    datetime_arr = datetime.now().strftime("%Y-%m-%d-%H-%M-%S").split("-")
    current_timestamp = datetime(int(datetime_arr[0]), int(datetime_arr[1]), int(datetime_arr[2]), int(datetime_arr[3]), int(datetime_arr[4]), int(datetime_arr[5]))
    current_timestamp = pytz.timezone("Asia/Ho_Chi_Minh").localize(current_timestamp)
    return current_timestamp


def CalculateTimestampDifferent(timestampInDB):
    # Lấy ra timestamp ngay thời điểm hiện tại
    current_timestamp = GetCurrentTimestamp()

    # Tính khoảng cách giữa timestamp ngay thời điểm hiện tại và timestamp trong DB
    timestamp_diff = abs(pandas.Timestamp(current_timestamp) - pandas.Timestamp(timestampInDB))

    # Trả về số ngày
    return timestamp_diff.days


def Notifications(request, quantity = 0):
    docs = db.collection(f'notifications').order_by(u'createdDate', direction=firestore.Query.DESCENDING).stream()
    notifications = []

    for doc in docs:
        # CalculateTimestampDifferent
        notification = doc.to_dict()
        notification["timestampDifferent"] = CalculateTimestampDifferent(notification.get("createdDate"))
        notifications.append(notification)
        
    return JsonResponse({
        'notifications': notifications[:quantity] if quantity else notifications
    })


def CountNewNotificationsQuantity(request):
    quantity = 0
    try:
        docs = db.collection(f'notifications').order_by(u'createdDate', direction=firestore.Query.DESCENDING).stream()

        for doc in docs:
            notification = doc.to_dict()
            timestampDifferent = CalculateTimestampDifferent(notification.get("createdDate"))

            if timestampDifferent == 0:
                quantity = quantity + 1
            
        return JsonResponse({'quantity': quantity})
    except:
        return JsonResponse({'quantity': 0})


def CheckPasswordExist(userId, password):
    try:
        # Lấy ra document theo document id
        doc_ref = db.collection('users').document(userId)
        doc = doc_ref.get().to_dict()

        # Nếu document này có password trùng với password truyền vào 
        if doc.get('password') == password:
            return True
        else:
            return False
    except:
        return False


def ChangePassword(userId, newPassword):
    try:
        doc_ref = db.collection(f"users").document(userId)
        doc_ref.update({'password': newPassword})
        return True
    except:
        return False


def HandleChangePassword(request): 
    if request.method == "POST":
        # Lấy dữ liệu client gởi lên
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        userId = body_data["userId"]
        oldPassword = body_data["oldPassword"].strip()
        newPassword = body_data["newPassword"].strip()
        newPasswordConfirm = body_data["newPasswordConfirm"].strip()

        # Kiểm tra user có tồn tại thông qua userId
        if CheckUserIdExist(userId):
            # Nếu người dùng ko nhập gì cả
            if oldPassword == "" or newPassword == "" or newPasswordConfirm == "":
                return JsonResponse({"message": "Please enter all information"})
            else:
                # Nếu độ dài 1 trong 3 mật khẩu < 8
                if len(oldPassword) < 8 or len(newPassword) < 8 or len(newPasswordConfirm) < 8:
                    return JsonResponse({"message": "Please enter passwords has more 8 characters"})
                else:
                    # Nếu mật khẩu mới và xác nhận mật khẩu mới khác nhau
                    if newPassword != newPasswordConfirm:
                        return JsonResponse({"message": "Please enter the same new password and new password confirm"})
                    else:
                        # Kiểm tra mật khẩu cũ có đúng ko
                        if CheckPasswordExist(userId, oldPassword):
                            # Thực hiện cập nhật mật khẩu
                            if ChangePassword(userId, newPassword):
                                return JsonResponse({"message": "Change password success"})
                            else:
                                return JsonResponse({"message": "Change password failed"})
                        else:
                            return JsonResponse({"message": "Please enter correct old password"})
        else:
            return JsonResponse({"message": "User not found"})
                    
            
def CheckUserIdExist(userId):
    try: 
        # Lấy ra document đó theo document id
        doc_ref = db.collection(f"users").document(userId)

        # Nếu có document đó thì return True, ngược lại: False   
        if doc_ref.get().to_dict():
            return True
        else:
            return False
    except:
        return False


def CheckEmailExist(email):
    # Lấy ra mảng các document theo email
    docs = db.collection('users').where(u"email", u"==", f"{email}").stream()
    check = False

    # Nếu có document chứa email truyền vào thì check = True   
    for doc in docs: 
        check = True
    return check


def CheckUserNameExist(userName):
    # Lấy ra mảng các document theo userName
    docs = db.collection('users').where(u"userName", u"==", f"{userName}").stream()
    check = False

    # Nếu có document chứa userName truyền vào thì check = True   
    for doc in docs: 
        check = True
    return check


def CheckValidFormatEmail(email):
    regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'  
    if(re.search(regex, email)):   
        return True 
    else:   
        return False  
      

def RandomCode():
    digits = [i for i in range(0, 10)]
    random_str = ""
    for i in range(6):
        index = math.floor(random.random() * 10)
        random_str += str(digits[index])
    return random_str


def UpdateCodeInDB(email, code): 
    print(email, code)
    try:
        # Lấy ra mảng các document theo email
        docs = db.collection('users').where(u"email", u"==", f"{email}").stream()

        # Nếu có document chứa email truyền vào thì lấy ra document id của document đó   
        userId = ""
        for doc in docs: 
            userId = doc.id    

        # Lấy ra chính document đó theo document id lấy được ở trên và cập nhật nó
        if userId != "":
            doc_ref = db.collection('users').document(userId)
            doc_ref.update({'code': code})
            return True
    except:
        return False


def SendCode(email):
    sender_email = "baop38391@gmail.com"
    receiver_email = email
    password = ",,s,ffine-m..a.r.t.::ds-=/ / //5V y"

    message = MIMEMultipart("alternative")
    message["Subject"] = "Verify code to create new password - Mask Warning"
    message["From"] = "Mask Warning's support team"
    message["To"] = receiver_email

    # Create the plain-text of your message
    code = RandomCode()
    text = f"Hi, your verification code is: {code}"

    # Turn these into plain MIMEText objects
    part = MIMEText(text, "plain")
    message.attach(part)

    # Create secure connection with server and send email
    context = ssl.create_default_context()
    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
            server.login(sender_email, password)
            server.sendmail(
                sender_email, receiver_email, message.as_string()
            )
            if UpdateCodeInDB(email, code): 
                return True
            else: 
                return False
    except:
        return False


def HandleSubmitEmail(request): 
    if request.method == "POST":
        # Lấy dữ liệu client gởi lên
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        email = body_data["email"].strip()

        # Nếu người dùng không nhập gì cả
        if email == "":
            return JsonResponse({"message": "Please enter your email"})
        else:
            # Kiểm tra email có đúng format
            if CheckValidFormatEmail(email) == False:
                return JsonResponse({"message": "Please enter an valid format email"})
            else:
                if CheckEmailExist(email) == False:
                    return JsonResponse({"message": "Email not found"})
                else:
                    if SendCode(email) == False:
                        return JsonResponse({"message": "Send code failed"})
                    else:
                        return JsonResponse({"message": "Send code success. Please check your email"})


def SubmitCode(email, code):
    try:
        # Lấy ra mảng các document chứa email và code truyền vào
        docs = db.collection('users').where(u'email', u'==', f"{email}").where(u'code', u'==', f"{code}").stream()
    
        # Nếu có document chứa email và code truyền vào thì lấy ra document id của document đó   
        userId = ""
        for doc in docs: 
            userId = doc.id    

        # Nếu có document thỏa mãn các yêu cầu trên
        if userId != "":
            return True
        else:
            return False
    except:
        return False


def HandleSubmitCode(request): 
    if request.method == "POST":
        # Lấy dữ liệu client gởi lên
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        email = body_data["email"].strip()
        code = body_data["code"].strip()

        # Nếu người dùng không nhập gì cả
        if code == "":
            return JsonResponse({"message": "Please enter code"})
        else:
            # Nếu gửi code sai
            if SubmitCode(email, code) == False:
                return JsonResponse({"message": "You were enter wrong code"})
            else:
                return JsonResponse({"message": "Correct code"})


def HandleReSendCode(request):
    if request.method == "POST":
        # Lấy dữ liệu client gởi lên
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        email = body_data["email"].strip()

        # Nếu gửi code lại không thành công
        if SendCode(email) == False:
            return JsonResponse({"message": "Failed to re-send code"})
        else:
            return JsonResponse({"message": "Re-send code success. Please check your email"})


def CreateNewPassword(email, newPassword):
    try:
        # Lấy ra mảng các document theo email
        docs = db.collection('users').where(u"email", u"==", f"{email}").stream()

        # Nếu có document chứa email truyền vào thì lấy ra document id của document đó   
        userId = ""
        for doc in docs: 
            userId = doc.id    

        # Lấy ra chính document đó theo document id lấy được ở trên và cập nhật trường password
        if userId != "":
            doc_ref = db.collection('users').document(userId)
            doc_ref.update({'password': newPassword})
            return True
        else:
            return False
    except:
        return False 


def HandleCreateNewPassword(request): 
    if request.method == "POST":
        # Lấy dữ liệu client gởi lên
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        email = body_data["email"]
        newPassword = body_data["newPassword"].strip()
        newPasswordConfirm = body_data["newPasswordConfirm"].strip()

        # Kiểm tra user có tồn tại thông qua email
        if CheckEmailExist(email):
            # Nếu người dùng ko nhập gì cả
            if newPassword == "" or newPasswordConfirm == "":
                return JsonResponse({"message": "Please enter all information"})
            else:
                # Nếu độ dài 1 trong 2 mật khẩu < 8
                if len(newPassword) < 8 or len(newPasswordConfirm) < 8:
                    return JsonResponse({"message": "Please enter passwords has more 8 characters"})
                else:
                    # Nếu mật khẩu mới và xác nhận mật khẩu mới khác nhau
                    if newPassword != newPasswordConfirm:
                        return JsonResponse({"message": "Please enter the same new password and new password confirm"})
                    else:
                        # Thực hiện tạo mật khẩu mới
                        if CreateNewPassword(email, newPassword):
                            return JsonResponse({"message": "Create new password success"})
                        else:
                            return JsonResponse({"message": "Create new password failed"})
        else:
            return JsonResponse({"message": "User not found"})
  

def ViewReportList(request):
    try:
        docs = db.collection(f"reports").stream()

        result = []
        for doc in docs:
            report = doc.to_dict()
            report["reportId"] = doc.id
            result.append(report)
            
        return JsonResponse({"result": result})
    except:
        return JsonResponse({"error": "Failed to get data"})


def ViewReportDetailUser(request):
    if request.method == "POST":
        # Lấy dữ liệu client gởi lên
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        reportId = body_data["reportId"]
        
        # Xử lí
        try:
            report = db.collection(f"reports").document(reportId)
            userId = report.get().to_dict().get("userId")

            # Trả về thông tin user gửi report dựa vào userId ở trên
            user = db.collection(f"users").document(userId)
            doc = user.get().to_dict()

            result = {
                "userId": user.get().id,
                "storeName": doc.get("storeName"),
                "fullName": doc.get("fullName"),
                "email": doc.get("email"),
                "gender": doc.get("gender"),
                "address": doc.get("address").split(",")[0].strip(),
                "district": doc.get("address").split(",")[1].strip(),
                "hometown": doc.get("address").split(",")[2].strip(),
                "phoneNumber": doc.get("phoneNumber"),
                "avatar": doc.get("avatar"),
            }
            return JsonResponse(result)
        except:
            return JsonResponse({"error": "Failed to get data"})


def ViewReportHistory(request):
    if request.method == "POST":
        # Lấy dữ liệu client gởi lên
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        userId = body_data["userId"]
        
        # Xử lí
        try:
            docs = db.collection(f"reports").where(u"userId", u"==", f"{userId}").stream()

            result = []
            for doc in docs:
                report = doc.to_dict()
                report["reportId"] = doc.id
                result.append(report)
                
            return JsonResponse({"result": result})
        except:
            return JsonResponse({"error": "Failed to get data"})


def ViewReportDetail(request):
    if request.method == "POST":
        # Lấy dữ liệu client gởi lên
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        reportId = body_data["reportId"]
        
        # Xử lí
        try:
            report_ref = db.collection(f"reports").document(reportId)
            report = report_ref.get().to_dict()
            report["reportId"] = report_ref.get().id
                
            return JsonResponse(report)
        except:
            return JsonResponse({"error": "Failed to get data"})


def ViewUserList(request):
    try:
        docs = db.collection(f"users").stream()

        result = []
        for doc in docs:
            user = doc.to_dict()
            user["userId"] = doc.id
            result.append(user)
            
        return JsonResponse({"result": result})
    except:
        return JsonResponse({"error": "Failed to get data"})


def DeleteUser(request):
    if request.method == "POST":
        # Lấy dữ liệu client gởi lên
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        userId = body_data["userId"]
        
        # Xử lí
        try:
            if CheckUserIdExist(userId):
                db.collection(f"users").document(userId).delete()
                return JsonResponse({"status": "success"})
            else:
                return JsonResponse({"status": "fail"})
        except:
            return JsonResponse({"status": "fail"})


def ConfirmSolvedReport(request):
    if request.method == "POST":
        # Lấy dữ liệu client gởi lên
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        reportId = body_data["reportId"]

        # Xử lí
        try:
            doc = db.collection(f"reports").document(reportId)
            doc.update({
                'isSolved': True
            })
            return JsonResponse({"status": "success"})
        except:
            return JsonResponse({"status": "fail"})
        

def ValidateReport(image, title, description):
    if image.strip() != "" and title.strip() != "" and description.strip() != "":
        return True
    else:
        return False


def SendReport(request):
    if request.method == "POST":
        # Lấy dữ liệu client gởi lên
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        userId = body_data["userId"]
        image = body_data["image"]
        title = body_data["title"]
        description = body_data["description"]

        if ValidateReport(image, title, description):
            try:
                randomString = "".join(random.choices(string.ascii_uppercase + string.ascii_lowercase + string.digits, k=20))
                current_timestamp = GetCurrentTimestamp()
                new_report = db.collection("reports").document(str(randomString))
                
                new_report.set({
                    "userId": userId,
                    "createdDate": current_timestamp,
                    "image": image,
                    "title": title,
                    "description": description,
                    "isSolved": False,
                })
                return JsonResponse({"status": "success"})
            except:
                return JsonResponse({"status": "fail"})
        else:
            return JsonResponse({"error": "Please enter all information"})


def HandleSigninAdmin(request): 
    if request.method == "POST":
        # Lấy dữ liệu client gởi lên
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        userName = body_data["userName"].strip()
        password = body_data["password"].strip()

        # Nếu người dùng ko nhập gì cả
        if userName == "" or password == "":
            return JsonResponse({"message": "Please enter all information"})
        else:
            # Nếu độ dài mật khẩu < 8
            if len(password) < 8:
                return JsonResponse({"message": "Please enter password has more 8 characters"})
            else:
                try:
                    # Thực hiện đăng nhập
                    docs = db.collection(f"admins").where(u"userName", u"==", f"{userName}").where(u"password", u"==", f"{password}").stream()

                    check = False
                    for doc in docs:
                        if doc.to_dict().get("userName") == userName and doc.to_dict().get("password") == password:
                            check = True
                            
                    if check:
                        return JsonResponse({"message": "Signin success"})
                    else:
                        return JsonResponse({"message": "User name and password do not match"})
                except:
                    return JsonResponse({"message": "Signin failed"})


def SaveVideoStreamUrl(request):
    if request.method == "POST":
        # Lấy dữ liệu client gởi lên
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        userId = body_data["userId"].strip()
        videoStreamUrl = body_data["videoStreamUrl"].strip()

        try:
            user = db.collection('users').document(userId)
            user.update({'videoStreamUrl': videoStreamUrl})
            return JsonResponse({"status": "success"})
        except:
            return JsonResponse({"status": "failed"})


def GetVideoStreamUrl(userId):
    try:
        user = db.collection('users').document(userId)
        videoStreamUrl = user.get().to_dict().get("videoStreamUrl")
        return videoStreamUrl
    except:
        return ""


def CreateNewUser(request):
    if request.method == "POST":
        # Lấy dữ liệu client gởi lên
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        hometown = body_data["hometown"]
        district = body_data["district"]
        address = body_data["address"]
        fullName = body_data["fullName"]
        phoneNumber = body_data["phoneNumber"]
        gender = body_data["gender"]
        storeName = body_data["storeName"]
        email = body_data["email"]
        userName = body_data["userName"]
        password = body_data["password"]
        
        # Xử lí
        try:
            # FE: check valid email, phoneNumber, fullname, storeName, 2 password is same
            
            # Check email có đã tồn tại trong DB ?
            if CheckEmailExist(email):
                return JsonResponse({"error": "Email already exists"})
            else:
                # Create new user
                current_timestamp = GetCurrentTimestamp()
                
                newUser = {
                    'address': f'{address}, {district}, {hometown}',
                    'avatar': DEFAULT_USER_AVATAR,
                    'email': email,
                    'createdDate': current_timestamp,
                    'fullName': fullName,
                    'gender': gender,
                    'phoneNumber': phoneNumber,
                    'storeName': storeName,
                    'userName': userName,
                    'password': password
                }
                randomString = "".join(random.choices(string.ascii_uppercase + string.ascii_lowercase + string.digits, k=20))
                db.collection(f"users").document(f'{randomString}').set(newUser)

                return JsonResponse({"status": "success"})
        except:
            return JsonResponse({"status": "fail"})


# fire when onchange fullName
def GenerateUserName(request):
    if request.method == "POST":
        # Lấy dữ liệu client gởi lên
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        fullName = body_data["fullName"]
        
        # Xử lí
        try:
            translator = Translator()
            translation = translator.translate(fullName, src="vi", dest='en')
            userName = translation.text.lower().replace(" ", "")

            if CheckUserNameExist(userName):
                random_char_number = random.randint(0, 19)
                userName = f'{userName}{random_char_number}'

            return JsonResponse({"userName": userName})
        except:
            return JsonResponse({"userName": userName})


# fire when load "Create new user" page
def GeneratePassword(request):
    if request.method == "POST":
        randomString = "".join(random.choices(string.ascii_uppercase + string.ascii_lowercase + string.digits, k=15))
        return JsonResponse({"password": randomString})

