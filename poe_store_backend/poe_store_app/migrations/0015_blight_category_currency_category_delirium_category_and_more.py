# Generated by Django 4.1.3 on 2022-12-21 17:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('poe_store_app', '0014_rename_impliicitmods_gear_implicitmods'),
    ]

    operations = [
        migrations.AddField(
            model_name='blight',
            name='category',
            field=models.CharField(default='Blight', max_length=200),
        ),
        migrations.AddField(
            model_name='currency',
            name='category',
            field=models.CharField(default='Currency', max_length=200),
        ),
        migrations.AddField(
            model_name='delirium',
            name='category',
            field=models.CharField(default='Delirium', max_length=200),
        ),
        migrations.AddField(
            model_name='delve',
            name='category',
            field=models.CharField(default='Delve', max_length=200),
        ),
        migrations.AddField(
            model_name='divination',
            name='category',
            field=models.CharField(default='Divination', max_length=200),
        ),
        migrations.AddField(
            model_name='essence',
            name='category',
            field=models.CharField(default='Essence', max_length=200),
        ),
        migrations.AddField(
            model_name='fragment',
            name='category',
            field=models.CharField(default='Fragment', max_length=200),
        ),
        migrations.AddField(
            model_name='gear',
            name='category',
            field=models.CharField(default='Gear', max_length=200),
        ),
        migrations.AddField(
            model_name='gems',
            name='category',
            field=models.CharField(default='Gems', max_length=200),
        ),
    ]
