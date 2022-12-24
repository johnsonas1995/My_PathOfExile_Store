from django.db import models
from django.contrib.auth.models import (AbstractUser)

class AppUser(AbstractUser):
    email = models.EmailField(
        
        max_length=255,
        unique=True,
    )
    #add poe account name?
    
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
    category = models.CharField(max_length=200, default="Currency") 
    league = models.CharField(max_length=200, null=False)
    name = models.CharField(max_length=200, default="Name")
    baseType = models.CharField(max_length=200, null=False)
    inventoryId = models.CharField(max_length=200, null=False)
    icon = models.CharField(max_length=1000, null=False)
    explicitMods = models.CharField(max_length=1000, null=True, default="None")
    implicitMods = models.CharField(max_length=1000, null=True, default="None")
    stackSize = models.IntegerField(default=1, null=True)
    note = models.CharField(max_length=200, null=True, default="Contact for price")
    
class Gems(models.Model):
    # league = models.ForeignKey(League, on_delete=models.CASCADE) TODO
    category = models.CharField(max_length=200, default="Gems") 
    league = models.CharField(max_length=200, null=False)
    name = models.CharField(max_length=200, default="Name")
    baseType = models.CharField(max_length=200, null=False)
    inventoryId = models.CharField(max_length=200, null=False)
    icon = models.CharField(max_length=1000, null=False)
    explicitMods = models.CharField(max_length=1000, null=True, default="None")
    implicitMods = models.CharField(max_length=1000, null=True, default="None")
    stackSize = models.IntegerField(default=1, null=True)
    note = models.CharField(max_length=200, null=True, default="Contact for price")

class Divination(models.Model):
     # league = models.ForeignKey(League, on_delete=models.CASCADE) TODO
    category = models.CharField(max_length=200, default="Divination") 
    league = models.CharField(max_length=200, null=False)
    name = models.CharField(max_length=200, default="Name")
    baseType = models.CharField(max_length=200, null=False)
    inventoryId = models.CharField(max_length=200, null=False)
    icon = models.CharField(max_length=1000, null=False)
    explicitMods = models.CharField(max_length=1000, null=True, default="None")
    implicitMods = models.CharField(max_length=1000, null=True, default="None")
    stackSize = models.IntegerField(default=1, null=True)
    note = models.CharField(max_length=200, null=True, default="Contact for price")
    
class Blight(models.Model):
    category = models.CharField(max_length=200, default="Blight") 
    league = models.CharField(max_length=200, null=False)
    name = models.CharField(max_length=200, default="Name")
    baseType = models.CharField(max_length=200, null=False)
    inventoryId = models.CharField(max_length=200, null=False)
    icon = models.CharField(max_length=1000, null=False)
    explicitMods = models.CharField(max_length=1000, null=True, default="None")
    implicitMods = models.CharField(max_length=1000, null=True, default="None")
    stackSize = models.IntegerField(default=1, null=True)
    note = models.CharField(max_length=200, null=True, default="Contact for price")
    
class Delve(models.Model):
    category = models.CharField(max_length=200, default="Delve") 
    league = models.CharField(max_length=200, null=False)
    name = models.CharField(max_length=200, default="Name")
    baseType = models.CharField(max_length=200, null=False)
    inventoryId = models.CharField(max_length=200, null=False)
    icon = models.CharField(max_length=1000, null=False)
    explicitMods = models.CharField(max_length=1000, null=True, default="None")
    implicitMods = models.CharField(max_length=1000, null=True, default="None")
    stackSize = models.IntegerField(default=1, null=True)
    note = models.CharField(max_length=200, null=True, default="Contact for price")
    
class Fragment(models.Model):
    category = models.CharField(max_length=200, default="Fragment") 
    league = models.CharField(max_length=200, null=False)
    name = models.CharField(max_length=200, default="Name")
    baseType = models.CharField(max_length=200, null=False)
    inventoryId = models.CharField(max_length=200, null=False)
    icon = models.CharField(max_length=1000, null=False)
    explicitMods = models.CharField(max_length=1000, null=True, default="None")
    implicitMods = models.CharField(max_length=1000, null=True, default="None")
    stackSize = models.IntegerField(default=1, null=True)
    note = models.CharField(max_length=200, null=True, default="Contact for price")
    
class Essence(models.Model):
    category = models.CharField(max_length=200, default="Essence") 
    league = models.CharField(max_length=200, null=False)
    name = models.CharField(max_length=200, default="Name")
    baseType = models.CharField(max_length=200, null=False)
    inventoryId = models.CharField(max_length=200, null=False)
    icon = models.CharField(max_length=1000, null=False)
    explicitMods = models.CharField(max_length=1000, null=True, default="None")
    implicitMods = models.CharField(max_length=1000, null=True, default="None")
    stackSize = models.IntegerField(default=1, null=True)
    note = models.CharField(max_length=200, null=True, default="Contact for price")

class Delirium(models.Model):
    category = models.CharField(max_length=200, default="Delirium") 
    league = models.CharField(max_length=200, null=False)
    name = models.CharField(max_length=200, default="Name")
    baseType = models.CharField(max_length=200, null=False)
    inventoryId = models.CharField(max_length=200, null=False)
    icon = models.CharField(max_length=1000, null=False)
    explicitMods = models.CharField(max_length=1000, null=True, default="None")
    implicitMods = models.CharField(max_length=1000, null=True, default="None")
    stackSize = models.IntegerField(default=1, null=True)
    note = models.CharField(max_length=200, null=True, default="Contact for price")

class Gear(models.Model):
    category = models.CharField(max_length=200, default="Gear") 
    league = models.CharField(max_length=200, null=False)
    name = models.CharField(max_length=200, default="Name")
    baseType = models.CharField(max_length=200, null=False)
    inventoryId = models.CharField(max_length=200, null=False)
    icon = models.CharField(max_length=1000, null=False)
    explicitMods = models.CharField(max_length=1000, null=True, default="None") ####need to figure out null requirment on .get query from API.
    implicitMods = models.CharField(max_length=1000, null=True, default="None")
    stackSize = models.IntegerField(default=1, null=True)
    note = models.CharField(max_length=200, null=True, default="Contact for price")
    
class Cart(models.Model):
    category = models.CharField(max_length=200, default="Gear") 
    league = models.CharField(max_length=200, null=False)
    name = models.CharField(max_length=200, default="Name")
    baseType = models.CharField(max_length=200, null=False)
    inventoryId = models.CharField(max_length=200, null=False)
    icon = models.CharField(max_length=1000, null=False)
    explicitMods = models.CharField(max_length=1000, null=True, default="None") 
    implicitMods = models.CharField(max_length=1000, null=True, default="None")
    stackSize = models.IntegerField(default=1, null=True)
    note = models.CharField(max_length=200, null=True, default="Contact for price")

    
    