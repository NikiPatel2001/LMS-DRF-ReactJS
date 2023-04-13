from django.db import models
from django.core import serializers
from django.core.mail import send_mail


# import moviepy.editor


# Teacher Model
class Teacher(models.Model):
    full_name = models.CharField(max_length=50)
    email = models.CharField(max_length=70)
    password = models.CharField(max_length=50, blank=True, null=True)
    qualification = models.CharField(max_length=200)
    mobile_no = models.CharField(max_length=20)
    profile_img = models.ImageField(upload_to='teacher_profile_imgs/', null=True)
    skills = models.TextField()

    class Meta:
        verbose_name_plural = "1. Teachers"

    def skill(self):
        skill = self.skills.split(',')
        return skill

    #     Total teacher courses
    def total_teacher_courses(self):
        total_courses = Course.objects.filter(teacher=self).count()
        return total_courses

    #     Total teacher Chapters
    def total_teacher_chapters(self):
        total_chapters = Chapter.objects.filter(course__teacher=self).count()
        return total_chapters

    #     Total teacher students
    def total_teacher_students(self):
        total_students = StudentCourseEnrollment.objects.filter(course__teacher=self).count()
        return total_students

    def __str__(self):
        return self.full_name


# Course Category Model


class CourseCategory(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()

    class Meta:
        verbose_name_plural = "2. Course Categories"

    def __str__(self):
        return self.title


# Course Model
class Course(models.Model):
    category = models.ForeignKey(CourseCategory, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='teacher_courses')
    title = models.CharField(max_length=150)
    description = models.TextField()
    featured_img = models.ImageField(upload_to='course_imgs/', null=True)
    techs = models.TextField(null=True)
    course_views = models.BigIntegerField(default=0)

    class Meta:
        verbose_name_plural = "3. Courses"

    def related_videos(self):
        related_videos = Course.objects.filter(techs__icontains=self.techs).exclude(id=self.id)
        return serializers.serialize('json', related_videos)

    def tech_list(self):
        tech_list = self.techs.split(',')
        return tech_list

    def total_enrolled_students(self):
        total_enrolled_students = StudentCourseEnrollment.objects.filter(course=self).count()
        return total_enrolled_students

    def course_rating(self):
        course_rating = CourseRating.objects.filter(course=self).aggregate(avg_rating=models.Avg('rating'))
        return course_rating['avg_rating']

    def __str__(self):
        return self.title


# Chapter Model
class Chapter(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='course_chapters')
    title = models.CharField(max_length=150)
    description = models.TextField()
    video = models.FileField(upload_to='chapter_videos/', null=True)
    remarks = models.TextField(null=True)

    class Meta:
        verbose_name_plural = "4. Chapters"

    # def chapter_duration(self):
    #     seconds = 0
    #     import cv2
    #     cap = cv2.VideoCapture(self.video.path)
    #     fps = cap.get(cv2.CAP_PROP_FPS)
    #     frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    #     if frame_count:
    #         duration = frame_count / fps
    #         print('fps = ' + str(fps))
    #         print('number of frames = ' + str(frame_count))
    #         print('duration (s) = ' + str(duration))
    #         minutes = int(duration / 60)
    #         seconds = duration % 60
    #         print('duration (M:S) = ' + str(minutes) + ":" + str(seconds))
    #     return seconds


# Student Model
class Student(models.Model):
    full_name = models.CharField(max_length=50)
    email = models.CharField(max_length=70, unique=True)
    username = models.CharField(max_length=50, default='')
    password = models.CharField(max_length=50, null=True)
    profile_img = models.ImageField(upload_to='student_profile_imgs/', null=True)
    interested_categories = models.TextField()

    def __str__(self):
        return self.full_name

    #     Total enrolled courses
    def enrolled_courses(self):
        enrolled_courses = StudentCourseEnrollment.objects.filter(student=self).count()
        return enrolled_courses

    #     Total favourite Courses
    def favourite_courses(self):
        favourite_courses = StudentFavouriteCourse.objects.filter(student=self).count()
        return favourite_courses

    class Meta:
        verbose_name_plural = "5. Students"


# Student course enrollment
class StudentCourseEnrollment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrolled_courses')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='enrolled_student')
    enrolled_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "6. Enrolled Courses"

    def __str__(self):
        return f"{self.course} - {self.student}"


# Student Favourite course
class StudentFavouriteCourse(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    status = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = "8. Student Favourite Course"

    def __str__(self):
        return f"{self.course} - {self.student}"


# Course rating & review
class CourseRating(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    rating = models.PositiveBigIntegerField(default=0)
    reviews = models.TextField(null=True)
    review_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "7. Student Rating"

    def __str__(self):
        return f"{self.course}-{self.student}-{self.rating}"


class ContactUs(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    query_msg = models.TextField()
    add_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name

    def save(self, *args, **kwargs):
        send_mail(
            'Contact Query',
            'Here is the message',
            'nikip0085@gmail.com',
            {self.email},
            fail_silently=False,
            html_message=f'<p>{self.full_name}</p><p>{self.query_msg}</p>'
        )
        return super(ContactUs, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "9. ContactUs Query"

