# Generated by Django 4.1.1 on 2022-11-04 17:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lms_main', '0011_alter_courserating_options_alter_student_email'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='teacher',
            name='detail',
        ),
        migrations.AddField(
            model_name='teacher',
            name='profile_img',
            field=models.ImageField(null=True, upload_to='teacher_profile_imgs/'),
        ),
    ]
