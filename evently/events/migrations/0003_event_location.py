# Generated by Django 5.1.4 on 2024-12-19 13:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0002_alter_event_attendees_alter_event_organizers'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='location',
            field=models.CharField(max_length=100, null=True),
        ),
    ]