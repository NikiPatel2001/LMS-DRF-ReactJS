# Generated by Django 4.1.1 on 2022-10-21 09:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lms_main', '0005_alter_chapter_course'),
    ]

    operations = [
        migrations.AddField(
            model_name='chapter',
            name='video_duration',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]