from django.urls import include, path
from django.contrib import admin
from .apis import Home, Signin, Signout, ViewProfile, UpdateProfile, Notifications, HandleChangePassword
from .apis import ForgotPasswordSendCode, ForgotPasswordCreateNewPassword, CheckEmailExist
from .views import video_feed

urlpatterns = [
    path('', Home),
    path('auth/signin/', Signin),
    path('signout/', Signout),
    path('profile/', ViewProfile),
    path('update-profile/', UpdateProfile),
    path('change-password/', HandleChangePassword),
    path('video_feed/', video_feed),
    path('notifications/<int:quantity>', Notifications),
    path('notifications/', Notifications),
    path('forgot-password-send-code/', ForgotPasswordSendCode),
    path('forgot-password-create-new-password/', ForgotPasswordCreateNewPassword),
    path('check-email-exist/', CheckEmailExist),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls'))
]
