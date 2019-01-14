# Generated by Django 2.1.5 on 2019-01-14 19:17

from django.db import migrations, models
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=220)),
                ('address', models.TextField(blank=True, null=True)),
                ('phone_number', phonenumber_field.modelfields.PhoneNumberField(max_length=128)),
            ],
        ),
    ]
