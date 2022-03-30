# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status, permissions
# from django.http import JsonResponse
# from .models import UserModel
# from .serializers import UserSerializer
#
#
# class UserApiView(APIView):
#     permission_classes = [permissions.IsAuthenticated]
#
#     # 1. List all
#     def get(self, request, *args, **kwargs):
#         users = UserModel.objects.filter({})
#         serializer = UserSerializer(users)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#
#     # 2. Create
#     def post(self, request, *args, **kwargs):
#         data = {
#             'userName': "kante",
#             'password': "kante123"
#         }
#         serializer = UserSerializer(data=data)
#
#         # if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)