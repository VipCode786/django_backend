# api/models.py

from django.db import models
import jsonfield

class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='images/', null=True, blank=True)  # Add this line
    points = jsonfield.JSONField(default=dict, blank=True)  # New JSON field for key-value points

    def __str__(self):
        return self.name
