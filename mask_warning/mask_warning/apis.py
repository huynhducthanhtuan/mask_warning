from tabnanny import check
from tkinter.tix import Tree
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.contrib.auth import authenticate, login
from google.cloud.firestore_v1.field_path import FieldPath
import firebase_admin, json, os, jwt, re, datetime, smtplib, socket, math, random
from socket import gaierror
from email.mime.text import MIMEText
from firebase_admin import credentials, firestore
from numpy import true_divide
from datetime import datetime, timedelta, date

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


def Notifications(request, quantity = 0):
    docs = db.collection(f'notifications').order_by(u'createdDate').stream()
    notifications = []

    for doc in docs:
        result = doc.to_dict()
    
        
    return JsonResponse({
        'notifications': notifications[:quantity] if quantity else notifications
    })

def ListOfUsers(request):

    if request.method == "POST":
        # Lấy dữ liệu client gởi lên
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        pageSize = body_data['pageSize']
        pageIndex = body_data['pageIndex']

        usersList = []
        startIndex = (pageIndex-1)*pageSize
        endIndex = startIndex + pageSize

        
        
        docs = db.collection(u'users').order_by(u'fullName').limit(endIndex+1).stream()

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
            'pageIndex': pageIndex,
            'pageSize': pageSize,
            'usersList': usersList[startIndex:endIndex] if endIndex < len(usersList) else usersList[startIndex]
        })

def validatePassword(password):
    
    passwordLength = len(password)
    if(passwordLength < 8 or passwordLength > 15):
        return{
            'isValid': False,
            'message': 'Password should not be less than 8 characters or greater than 15 characters'
        }

    if(password.count(' ') > 0):
        return{
            'isValid': False,
            'message': 'Password should not contain whitespace characters'
        }

    if(password.islower()):
        return{
            'isValid': False,
            'message': 'Password should contain At least one upper case letter'
        }

    if(password.isupper()):
        return{
            'isValid': False,
            'message': 'Password should contain At least one lower case letter'
        }

    if(not any(char.isdigit() for char in password)):
        return{
            'isValid': False,
            'message': 'Password should contain at least one numeric value'
        }

    special_characters = "\"!@#$%^&*()-+?_=,<>\'"
    if(not any(c in special_characters for c in password)):
        return{
            'isValid': False,
            'message': 'Password should contain at least one special character'
        }

    return{
        'isValid': True,
        'message': 'Password is Valid'
    }

def validateNewUser(newUser):

    if(not CheckValidFormatEmail(newUser['email'])):
        return{
            'isValid': False,
            'message': 'Please Enter right email format!'
        }

   
    if(newUser['password'] != newUser['confirm_password']):
        return{
            'isValid': False,
            'message': 'Please enter the same password'
        }


    validPassword_Response = validatePassword(newUser['password'])
    if(not validPassword_Response['isValid']):
        return validPassword_Response

    # Check if already have user with same username
    if(checkExistAttributeValue('users', 'userName', newUser['userName'])):
        return {
            'isValid': False,
            'message': 'Username existed'
        }

    # Check if already have user with same email
    if(checkExistAttributeValue('users', 'email', newUser['email'])):
        return {
            'isValid': False,
            'message': 'Email existed'
        }

    return {
            'isValid': True,
            'message': 'New User Valid'
    }

def checkExistAttributeValue(collection, attribute, value):
    collection_ref = db.collection(collection)
    query_ref = collection_ref.where(attribute,u'==',value).get()

    return len(query_ref) > 0

def addUser(request):

    if request.method == "POST":
        # Lấy dữ liệu client gởi lên
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        firstName = body_data['firstName']
        lastName = body_data['lastName']
        phoneNumber = body_data['phoneNumber']
        storeName = body_data['storeName']
        email = body_data['email']
        dateOfBirth = body_data['dateOfBirth'] 
        gender = body_data['gender'] 
        address = body_data['address'] 
        province = body_data['province'] 
        district = body_data['district'] 
        userName = body_data['userName'] 
        password = body_data['password'] 
        confirm_password = body_data['re_password']

        try:
            newUser = {
                'address': f'{address}, {district}, {province}',
                'createdDate': datetime.datetime.now(tz=datetime.timezone.utc),
                'email': email,
                'fullName': f'{firstName} {lastName}',
                'gender': gender,
                'password': password,
                'confirm_password': confirm_password,
                'phoneNumber': phoneNumber,
                'storeName': storeName,
                'userName': userName,
                'dateOfBirth': dateOfBirth
            }


            # Validate new user
            validUser_Response = validateNewUser(newUser)
            if(validUser_Response['isValid']):

                del newUser['confirm_password']
                user_ref = db.collection('users')

                user_ref.add(newUser)
                
                validUser_Response['newUser'] = newUser

                return JsonResponse(
                    validUser_Response
                )

            
            return JsonResponse(validUser_Response)
        except:
            return JsonResponse({
                'error': 'error'
            }) 
        

def searchUsers(request):

    if request.method == "POST":
        # Lấy dữ liệu client gởi lên
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        pageSize = body_data['pageSize']
        pageIndex = body_data['pageIndex']
        query = body_data['query']

        users_ref = db.collection(u'users').get()
        usersList = []
        startIndex = (pageIndex-1)*pageSize
        endIndex = startIndex + pageSize

        # find user match in through phone, full name, store and username
        attributeFind = ['phoneNumber', 'fullName', 'storeName', 'userName']
        for user in users_ref:
            for atb in attributeFind:
                if query in user.to_dict()[atb].lower():
                    usersList.append({
                    'fullName': user.to_dict()['fullName'],
                    'storeName': user.to_dict()['storeName'],
                    'createdDate': user.to_dict()['createdDate']
                    })
                    break
                
                
        if usersList == []:
            return JsonResponse({
            'message' : 'There is no user match you query!',
            'usersList': usersList
            })

        if startIndex >= len(usersList) or startIndex < 0:
            return JsonResponse({
                "error": "Index out of bound."
            })
        
        return JsonResponse({
            'message' : 'Search succesfully',
            'pageIndex': pageIndex,
            'pageSize': pageSize,
            'startIndex': startIndex,
            'endIndex' : endIndex,
            'usersList': usersList[startIndex:endIndex] if endIndex < len(usersList) else usersList[startIndex]
        })


def getRevenueIn1Day(day):
    query_ref = db.collection(f"users").get()
    
    newUser = 0
    for query in query_ref:
        if query.to_dict()['createdDate'].date() == day:
            newUser += 1
    return 500000*newUser
import random
def getRevenueByDay():
    currentDay = date.today()
    # currentDay = date(2022,1,1)
    revenueByDay = {}

    for i in range(-7,0):
        iDayAgo = currentDay + timedelta(days=i)
        revenueByDay[iDayAgo.strftime('%a')] = getRevenueIn1Day(iDayAgo)

    return revenueByDay


def getRevenue(request):
    if request.method == "POST":
        # Lấy dữ liệu client gởi lên
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        formatType = body_data['formatType']

        revenue = {}
        if formatType == 'd':
            revenue = getRevenueByDay()

        
        return JsonResponse({
            'message' : 'Succesfully',
            'revenue' :  revenue,
            'formatType' : formatType
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


def CheckValidFormatEmail(email):
    regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'  
    if(re.search(regex,email)):   
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


# Hàm gửi mail, chưa thành công
def SendCode(email):
    #region Code gửi mail, đang lỗi 
    #region Cách 1
    # sender = "thanhtuanhuynh0011@gmail.com"
    # receivers = [email]
    # message = f"""From: From Person <{sender}>
    # To: To Person <{receivers[0]}>
    # Subject: Verify code to create new password - Mask Warning

    # 123456
    # """

    # try:
    #     # smtplib.SMTP_PORT
    #     # 116.110.250.42: Timeout
    #     # 127.0.0.1: Refused
    #     # localhost: Refused
    #     smtpObj = smtplib.SMTP('127.0.0.1', 5000, socket.getfqdn())
    #     smtpObj.sendmail(sender, receivers, message)         
    #     print("Successfully sent email")
    #     return JsonResponse({"status": "success"})

    # except smtplib.SMTPException:
    #     print("Error: unable to send email")
    #     return JsonResponse({"status": "fail"})
    #endregion

    #region Cách 2
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
    #endregion
    #endregion

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
            doc_ref.update({'code': RandomCode()})
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

        # NNếu người dùng không nhập gì cả
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
  