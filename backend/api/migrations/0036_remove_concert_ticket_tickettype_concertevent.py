# Generated by Django 4.2.2 on 2023-09-25 03:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0035_tickettype_remove_ticket_datevalidrange1_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='concert',
            name='ticket',
        ),
        migrations.AddField(
            model_name='tickettype',
            name='concertEvent',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.concert'),
        ),
    ]
