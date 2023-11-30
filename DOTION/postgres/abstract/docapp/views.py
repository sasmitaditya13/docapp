from django.shortcuts import render
from rest_framework import permissions
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import User
from .serializers import UserSerializer
from rest_framework import mixins
from rest_framework import generics
from .models import Project
from .models import Project_role
from .models import Document
from .models import Document_role
from .serializers import UserSerializer
from .serializers import ProjectSerializer
from .serializers import ProjectRoleSerializer
from .serializers import DocumentSerializer
from .serializers import DocumentRoleSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
import requests
from rest_framework.authentication import TokenAuthentication

# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
  authentication_classes = [TokenAuthentication]
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = [permissions.AllowAny]
  
class ProjectGetView(APIView):
  authentication_classes = [TokenAuthentication]
  permission_classes = [permissions.AllowAny]
  
  def get(self,request,*args, **kwargs):
    
    projec = request.data.get("pname","")
    project = Project.objects.all().get(pname = projec , user = request.user)
    # project = Project.objects.all()
    serializedproject = ProjectSerializer(project)
    return Response(serializedproject.data)

class ProjectViewSet(viewsets.ModelViewSet):
  queryset = Project.objects.all()
  serializer_class = ProjectSerializer
  authentication_classes = [TokenAuthentication]
  permission_classes = [permissions.AllowAny]
  
  

class ProjectRoleViewSet(viewsets.ModelViewSet):
  authentication_classes = [TokenAuthentication]
  queryset = Project_role.objects.all()
  serializer_class = ProjectRoleSerializer
  permission_classes = [permissions.AllowAny]

class DocumentViewSet(viewsets.ModelViewSet):
  authentication_classes = [TokenAuthentication]
  queryset = Document.objects.all()
  serializer_class = DocumentSerializer
  permission_classes = [permissions.AllowAny]

class DocumentRoleViewSet(viewsets.ModelViewSet):
  authentication_classes = [TokenAuthentication]
  queryset = Document_role.objects.all()
  serializer_class = DocumentRoleSerializer
  permission_classes = [permissions.AllowAny]

def index(request):
  return redirect("https://channeli.in/oauth/authorise/?client_id=2ZX53W71ALyNvM8UryjFGfiNGi6GkdCUgxDvyrgf&redirect_uri=http://localhost:8000/docapp/authenticate/&state='success'")

def authenticate(request):
  code = request.GET['code']
  print(code)
  url1 = "https://channeli.in/open_auth/token/"
  # return redirect("http://localhost:8000/docapp/gettoken/")
  payload1 = {'client_id': '2ZX53W71ALyNvM8UryjFGfiNGi6GkdCUgxDvyrgf', 'client_secret':'lp9Zt2mrL3lohhweEppEw6dHmBsfITDuNJ9SCZcxK16mDTby1cBNz12fJJssHAguLh6SV2lKT1s8J1agNPOmSshNQFRojx2Aq1MXIAIblhTYYpOC4cQbtjEvtMFmmom2','grant_type': 'authorization_code' , 'redirect_uri':'http://localhost:8000/docapp/authenticate/','code': code}
  response1 = requests.post(url1 , data=payload1)
  token = "Bearer " + response1.json().get('access_token','')
  print(response1.json().get('access_token',''))
  print(response1.json().get('token_type',''))
  print (token)
  param = {"Authorization" : token}
  url2 = "https://channeli.in/open_auth/get_user_data/"
  response2 = requests.get(url = url2 , headers = param)
  print(response2.json().get('contactInformation','').get('instituteWebmailAddress',''))
  
  # payload2 = {
  #   'uname' = 
  # }
  return HttpResponse("userId")
# def gettoken(request):
#   url = "https:/channeli.in/open_auth/token/"
#   payload = {'client_id': '2ZX53W71ALyNvM8UryjFGfiNGi6GkdCUgxDvyrgf', 'client_secret':'lp9Zt2mrL3lohhweEppEw6dHmBsfITDuNJ9SCZcxK16mDTby1cBNz12fJJssHAguLh6SV2lKT1s8J1agNPOmSshNQFRojx2Aq1MXIAIblhTYYpOC4cQbtjEvtMFmmom2','grant_type': code , 'redirect_uri':'http://localhost:8000/docapp/authenticate/','code': code}
#   url1 = "https://channeli.in/open_auth/token/"
#   r = requests.post(url , data=payload)
#   return HttpResponse("K     "+code)