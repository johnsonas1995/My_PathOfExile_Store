# Generated by Django 4.1.3 on 2022-12-21 18:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('poe_store_app', '0017_alter_blight_note_alter_currency_note_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blight',
            name='stackSize',
            field=models.IntegerField(default=1, null=True),
        ),
        migrations.AlterField(
            model_name='currency',
            name='stackSize',
            field=models.IntegerField(default=1, null=True),
        ),
        migrations.AlterField(
            model_name='delirium',
            name='stackSize',
            field=models.IntegerField(default=1, null=True),
        ),
        migrations.AlterField(
            model_name='delve',
            name='stackSize',
            field=models.IntegerField(default=1, null=True),
        ),
        migrations.AlterField(
            model_name='divination',
            name='stackSize',
            field=models.IntegerField(default=1, null=True),
        ),
        migrations.AlterField(
            model_name='essence',
            name='stackSize',
            field=models.IntegerField(default=1, null=True),
        ),
        migrations.AlterField(
            model_name='fragment',
            name='stackSize',
            field=models.IntegerField(default=1, null=True),
        ),
        migrations.AlterField(
            model_name='gems',
            name='stackSize',
            field=models.IntegerField(default=1, null=True),
        ),
    ]
