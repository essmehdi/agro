from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.authtoken.models import Token
from .models import Event
from .serializers import EventSerializer
from django.contrib.auth import authenticate
from geopy.distance import distance


# CRUD operations for events
class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def perform_update(self, serializer):
        if serializer.instance.owner != self.request.user:
            raise PermissionDenied("You do not have permission to edit this event.")
        serializer.save()

    def perform_destroy(self, instance):
        if instance.owner != self.request.user:
            raise PermissionDenied("You do not have permission to delete this event.")
        instance.delete()


# Ability to filter events by coords and radius in kilometers

class EventRadiusFilterView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        latitude = request.query_params.get("latitude")
        longitude = request.query_params.get("longitude")
        radius = request.query_params.get("radius")
        if latitude is None or longitude is None or radius is None:
            return Response(
                {"error": "Please provide latitude, longitude, and radius."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        latitude = float(latitude)
        longitude = float(longitude)
        radius = float(radius)

        events = Event.objects.all()
        filtered_events = []
        for event in events:
            event_location = (event.latitude, event.longitude)
            user_location = (latitude, longitude)
            if distance(user_location, event_location).km <= radius:
                filtered_events.append(event)

        serializer = EventSerializer(filtered_events, many=True)
        return Response(serializer.data)


# Toggle attendance for an event
class AttendanceView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        event = Event.objects.get(pk=pk)
        if request.user in event.attendees.all():
            event.attendees.remove(request.user)
            return Response({"message": "You are no longer attending this event."})
        else:
            event.attendees.add(request.user)
            return Response({"message": "You are now attending this event."})


# Authentication views
class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        print(request.data)
        user = authenticate(
            username=request.data["username"], password=request.data["password"]
        )
        print(user)
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key})
        else:
            return Response(
                {"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
            )


class LogoutView(APIView):
    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)
