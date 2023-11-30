from rest_framework.urlpatterns import format_suffix_patterns
from django.urls import path,include
from rest_framework import routers
from . import views
from rest_framework.authtoken.views import obtain_auth_token

router = routers.DefaultRouter()
router.register(r'user', views.UserViewSet)
router.register(r'project', views.ProjectViewSet)
router.register(r'projectrole', views.ProjectRoleViewSet)
router.register(r'document', views.DocumentViewSet)
router.register(r'documentrole', views.DocumentRoleViewSet)

urlpatterns=[
  path('start/', include(router.urls)),
  path('token/',obtain_auth_token),
  path('authenticate/',views.authenticate),
  path('project/', views.ProjectGetView.as_view()),
  path('',views.index)]