from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EventViewSet, LoginView, LogoutView, AttendanceView, EventRadiusFilterView

router = DefaultRouter()
router.register(r'events', EventViewSet)

urlpatterns = [
    path('events/filter/', EventRadiusFilterView.as_view()),
    path('', include(router.urls)),
	path('events/<int:pk>/attendance/', AttendanceView.as_view()),
	path('auth/login/', LoginView.as_view()),
	path('auth/logout/', LogoutView.as_view())
]
