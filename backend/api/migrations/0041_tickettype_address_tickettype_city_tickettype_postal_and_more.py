# Generated by Django 4.2.2 on 2023-10-17 06:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0040_alter_concert_organizername'),
    ]

    operations = [
        migrations.AddField(
            model_name='tickettype',
            name='address',
            field=models.CharField(max_length=150, null=True),
        ),
        migrations.AddField(
            model_name='tickettype',
            name='city',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='tickettype',
            name='postal',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='tickettype',
            name='province',
            field=models.CharField(max_length=100, null=True),
        ),
    ]