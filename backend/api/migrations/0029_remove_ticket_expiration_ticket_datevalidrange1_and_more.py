# Generated by Django 4.2.2 on 2023-09-22 02:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0028_alter_concert_ticket'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ticket',
            name='expiration',
        ),
        migrations.AddField(
            model_name='ticket',
            name='dateValidRange1',
            field=models.DateField(null=True),
        ),
        migrations.AddField(
            model_name='ticket',
            name='dateValidRange2',
            field=models.DateField(null=True),
        ),
        migrations.AlterField(
            model_name='concert',
            name='ticket',
            field=models.ManyToManyField(to='api.ticket'),
        ),
    ]
