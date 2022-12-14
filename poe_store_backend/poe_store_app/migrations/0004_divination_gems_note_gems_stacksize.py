# Generated by Django 4.1.3 on 2022-12-14 18:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('poe_store_app', '0003_gems_alter_currency_icon'),
    ]

    operations = [
        migrations.CreateModel(
            name='Divination',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('league', models.CharField(max_length=200)),
                ('baseType', models.CharField(max_length=200)),
                ('inventoryId', models.CharField(max_length=200)),
                ('icon', models.CharField(max_length=1000)),
                ('stackSize', models.IntegerField(default=1)),
                ('note', models.CharField(default='Contact for price', max_length=200)),
            ],
        ),
        migrations.AddField(
            model_name='gems',
            name='note',
            field=models.CharField(default='Contact for price', max_length=200),
        ),
        migrations.AddField(
            model_name='gems',
            name='stackSize',
            field=models.IntegerField(default=1),
        ),
    ]
