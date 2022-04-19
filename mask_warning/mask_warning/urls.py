from django.urls import include, path
from django.contrib import admin
from .apis import HandleSignin, Signout, ViewProfile, UpdateProfile, Notifications, HandleChangePassword
from .apis import HandleSubmitEmail, HandleSubmitCode, HandleReSendCode, HandleCreateNewPassword, DeleteUser, SendReport
from .apis import ViewReportList, ViewReportDetailUser, ViewReportHistory, ViewReportDetail, ViewUserList, ConfirmSolvedReport
from .apis import HandleSigninAdmin
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
    path('send-report/', SendReport),
    path('report-history/', ViewReportHistory),
    path('report-history-detail/', ViewReportDetail),

    # Role Admin
    path('auth/admin/signin/', HandleSigninAdmin),
    path('admin/notifications/<int:quantity>', Notifications),
    path('admin/notifications/', Notifications),
    path('admin/users-manager/detail-user/', ViewProfile),
    path('admin/users-manager/delete-user/', DeleteUser),
    path('admin/users-manager/', ViewUserList),
    path('admin/reports-manager/detail-user/', ViewReportDetailUser),
    path('admin/reports-manager/detail-report/', ViewReportDetail),
    path('admin/reports-manager/confirm-solved/', ConfirmSolvedReport),
    path('admin/reports-manager/', ViewReportList),
    path('api-auth/', include('rest_framework.urls')),
   path('admin/reports-manager/detail-report/', ViewReportDetail),

]
