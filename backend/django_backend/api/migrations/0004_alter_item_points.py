# Generated by Django 5.0.7 on 2024-07-15 15:05

import jsonfield.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_item_points'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='points',
            field=jsonfield.fields.JSONField(blank=True, default=dict),
        ),
    ]
