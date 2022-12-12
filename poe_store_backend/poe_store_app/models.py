from django.db import models
from django.contrib.auth.models import (AbstractUser)

class AppUser(AbstractUser):
    email = models.EmailField(
        
        max_length=255,
        unique=True,
    )
    
    # A user account must be active to log in, etc.
    is_active =  models.BooleanField(
       default=True,
       help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active',
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
class League (models.Model):
    title = models.CharField(max_length=200, null=False) #TODO
    
class Currency(models.Model):
    # league = models.ForeignKey(League, on_delete=models.CASCADE) TODO
    league = models.CharField(max_length=200, null=False)
    baseType = models.CharField(max_length=200, null=False)
    inventoryId = models.CharField(max_length=200, null=False)
    icon = models.CharField(max_length=200, null=False)
    stackSize = models.IntegerField(default=1)
    note = models.CharField(max_length=200, default="Contact for price")