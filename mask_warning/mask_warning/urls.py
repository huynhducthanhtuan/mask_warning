from django.urls import include, path
from django.contrib import admin
from .apis import HandleSignin, Signout, ViewProfile, UpdateProfile, Notifications, HandleChangePassword
from .apis import HandleSubmitEmail, HandleSubmitCode, HandleReSendCode, HandleCreateNewPassword
from .apis import ViewReportPage, ViewReportDetailUser, ViewReportHistory
from .views import video_feed

urlpatterns = [
    # All roles
    path('auth/signin/', HandleSignin),
    path('auth/signout/', Signout),

    # Role User
    path('profile/', ViewProfile),
    path('update-profile/', UpdateProfile),
    path('change-password/', HandleChangePassword),
    path('video_feed/', video_feed),
    path('forgot-password-submit-email/', HandleSubmitEmail),
    path('forgot-password-submit-code/', HandleSubmitCode),
    path('forgot-password-resend-code/', HandleReSendCode),
    path('forgot-password-create-new-password/', HandleCreateNewPassword),
    path('report-history/', ViewReportHistory),

    # Role Admin
    path('admin/notifications/<int:quantity>', Notifications),
    path('admin/notifications/', Notifications),
    path('admin/report/', ViewReportPage),
    path('admin/report/detail-user/', ViewReportDetailUser),
    path('api-auth/', include('rest_framework.urls'))
]
