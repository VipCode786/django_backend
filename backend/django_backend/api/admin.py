from django.contrib import admin
from .models import Item

class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    fields = ('name', 'description', 'image', 'points')

admin.site.register(Item, ItemAdmin)
