# Generated by Django 4.1.1 on 2022-11-05 13:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('lms_main', '0013_alter_teacher_password'),
    ]

    operations = [
        migrations.CreateModel(
            name='StudentFavouriteCourse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.BooleanField(default=False)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='lms_main.course')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='lms_main.student')),
            ],
            options={
                'verbose_name_plural': '7. Student Favourite Course',
            },
        ),
    ]
