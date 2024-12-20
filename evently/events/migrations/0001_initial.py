# Generated by Django 5.1.4 on 2024-12-18 23:23

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField(max_length=500)),
                ('longitude', models.FloatField()),
                ('latitude', models.FloatField()),
                ('start_time', models.DateTimeField()),
                ('end_time', models.DateTimeField(null=True)),
                ('attendees', models.ManyToManyField(related_name='events_attending', to=settings.AUTH_USER_MODEL)),
                ('organizers', models.ManyToManyField(related_name='events_organized', to=settings.AUTH_USER_MODEL)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='events_owned', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
