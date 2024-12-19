from django.db import models
from django.contrib.auth.models import User

class Event(models.Model):
	title = models.CharField(max_length=100)
	description = models.TextField(max_length=500)
	longitude = models.FloatField()
	latitude = models.FloatField()
	location = models.CharField(max_length=100, null=True)
	start_time = models.DateTimeField()
	end_time = models.DateTimeField(null=True)
	owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='events_owned')
	organizers = models.ManyToManyField(User, related_name='events_organized', blank=True)
	attendees = models.ManyToManyField(User, related_name='events_attending', blank=True)

	def __str__(self):
		return self.title