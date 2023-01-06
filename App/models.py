from django.db import models

# Create your models here.

class Student(models.Model):
    id=models.AutoField(primary_key=True)
    name=models.CharField(max_length=20)
    img=models.ImageField()

    def __str__(self) -> str:
        return self.name

    def save(self):
        self.img.field.upload_to=f'students/{self.name}'
        return super().save()
    pass
