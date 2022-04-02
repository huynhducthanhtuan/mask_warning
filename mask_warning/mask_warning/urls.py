from django.urls import include, path
from django.contrib import admin
from .apis import Home, Signin, Signout, Profile
from .views import video_feed

# specify URL Path for rest_framework
urlpatterns = [
    path('', Home),
    path('auth/signin/', Signin),
    path('signout/', Signout),
    path('user/profile/<str:userId>/', Profile),
    path('video_feed/', video_feed),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls'))
]
