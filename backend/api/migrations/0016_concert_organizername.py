# Generated by Django 4.2.2 on 2023-08-03 09:04

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_remove_user_usertype_user_isorganizer'),
    ]

    operations = [
        migrations.AddField(
            model_name='concert',
            name='organizerName',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
