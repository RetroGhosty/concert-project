# Generated by Django 4.2.2 on 2023-08-11 14:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0019_alter_concert_bannerimg'),
    ]

    operations = [
        migrations.AlterField(
            model_name='concert',
            name='bannerImg',
            field=models.ImageField(default='concert_banners/default.jpg', upload_to='concert_banners'),
        ),
    ]
