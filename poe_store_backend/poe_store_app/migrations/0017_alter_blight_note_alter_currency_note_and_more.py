# Generated by Django 4.1.3 on 2022-12-21 18:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('poe_store_app', '0016_blight_explicitmods_blight_implicitmods_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blight',
            name='note',
            field=models.CharField(default='Contact for price', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='currency',
            name='note',
            field=models.CharField(default='Contact for price', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='delirium',
            name='note',
            field=models.CharField(default='Contact for price', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='delve',
            name='note',
            field=models.CharField(default='Contact for price', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='divination',
            name='note',
            field=models.CharField(default='Contact for price', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='essence',
            name='note',
            field=models.CharField(default='Contact for price', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='fragment',
            name='note',
            field=models.CharField(default='Contact for price', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='gems',
            name='note',
            field=models.CharField(default='Contact for price', max_length=200, null=True),
        ),
    ]
