from django.urls import include, path
from django.contrib import admin
from .apis import Home, Signin, Profile


# specify URL Path for rest_framework
urlpatterns = [
    path('', Home),
    path('signin/', Signin),
    path('<str:role>/profile/<str:userId>/', Profile),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls'))
]
