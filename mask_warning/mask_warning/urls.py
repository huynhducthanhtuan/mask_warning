from django.urls import include, path
from django.contrib import admin
from .apis import Home, Signin, Profile, Notifications, ListOfUsers
from .views import video_feed

# specify URL Path for rest_framework
urlpatterns = [
    path('', Home),
    path('auth/signin/', Signin),
    path('user/profile/<str:userId>/', Profile),
    path('video_feed/', video_feed),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('notifications/<int:quantity>', Notifications),
    path('notifications/', Notifications),
    path('list/<int:pages>', ListOfUsers)
]
