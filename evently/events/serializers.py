from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Event


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name"]


class EventSerializer(serializers.ModelSerializer):
    attendees = serializers.SerializerMethodField()
    owner = UserSerializer()
    is_user_attending = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = [
            "id",
            "title",
            "description",
            "longitude",
            "latitude",
            "start_time",
            "end_time",
            "organizers",
            "owner",
            "attendees",
            "location",
            "is_user_attending",
        ]

    def validate_empty_values(self, data):
        return super().validate_empty_values(data)

    def get_attendees(self, obj):
        return obj.attendees.count()
    
    def get_is_user_attending(self, obj):
        request = self.context.get("request")
        if request and request.user.is_authenticated:
            return obj.attendees.filter(id=request.user.id).exists()
        return False
