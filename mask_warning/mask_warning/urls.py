from django.urls import include, path
from django.contrib import admin
from .apis import HandleSignin, Signout, ViewProfile, UpdateProfile, Notifications, HandleChangePassword
from .apis import HandleSubmitEmail, HandleSubmitCode, HandleReSendCode, HandleCreateNewPassword, ListOfUsers
from .apis import addUser, searchUsers
from .views import video_feed

urlpatterns = [
    path('auth/signin/', HandleSignin),
    path('auth/signout/', Signout),
    path('profile/', ViewProfile),
    path('update-profile/', UpdateProfile),
    path('change-password/', HandleChangePassword),
    path('video_feed/', video_feed),
    path('notifications/<int:quantity>', Notifications),
    path('notifications/', Notifications),
    path('forgot-password-submit-email/', HandleSubmitEmail),
    path('forgot-password-submit-code/', HandleSubmitCode),
    path('forgot-password-resend-code/', HandleReSendCode),
    path('forgot-password-create-new-password/', HandleCreateNewPassword),
    path('list/', ListOfUsers),
    path('addUser/', addUser),
    path('searchUsers/', searchUsers),
    # Trang admin mặc định của Django, mình ko dùng
    # path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls'))
]
