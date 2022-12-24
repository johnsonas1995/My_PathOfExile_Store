
import requests
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import json
import time
import logging
import os
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login, logout
from django.core import serializers
from .models import *
from dotenv import load_dotenv
load_dotenv()

class FetchTabException(RuntimeError):
    pass

class ResourceNotFoundFTException(FetchTabException):
    pass

class RateLimitExceededFTException(FetchTabException):
    pass


def index(request):
    index_file = open('static/index.html').read()
    return HttpResponse(index_file)


def getStashTabs(request, league, tab_index):
    stash_token = os.environ["STASH_TOKEN"]
    endpoint = 'https://www.pathofexile.com/character-window/get-stash-items'
    data = {
        'accountName': 'DarthValdo',
        'league': league,
        'realm': 'pc',
        'tabIndex': tab_index,
        'tabs': 1,
    }
    headers = {
        'user-agent': 'School API Project/0.0.1 (contact: toxicity.aj@gmail.com)',
        'Authorization': 'Bearer ' + stash_token,
    }
    response = requests.post(endpoint, headers=headers, data=data)
    response = response.text
    
    parsed = json.loads(response)
    print(parsed)
    return JsonResponse({'success': True, 'response': parsed})

def pull_all_tabs_to_db(request, league):
    categories = []
    Gear.objects.all().delete()#deletes all objects from tables to refresh with below inserts
    Currency.objects.all().delete() 
    Gems.objects.all().delete()
    Divination.objects.all().delete()
    Blight.objects.all().delete()
    Delve.objects.all().delete()
    Fragment.objects.all().delete()
    Essence.objects.all().delete()
    Delirium.objects.all().delete()
    def getTab(tab_index):
        stash_token = os.environ["STASH_TOKEN"]
        endpoint = 'https://www.pathofexile.com/character-window/get-stash-items'
        data = {
            'accountName': 'DarthValdo',
            'league': league,
            'realm': 'pc',
            'tabIndex': tab_index,
            'tabs': 1,
        }
        headers = {
            'user-agent': 'School API Project/0.0.1 (contact: toxicity.aj@gmail.com)',
            'Authorization': 'Bearer ' + stash_token,      
        }
        response = requests.post(endpoint, headers=headers, data=data)
        response = response.text
        parsed = json.loads(response)
        if 'error' in parsed:
            if parsed['error']['code'] == 3:
                raise RateLimitExceededFTException(f'Raw response: {response}')
            elif parsed['error']['code'] == 1:
                raise ResourceNotFoundFTException(f'Raw response: {response}')
            else:
                raise FetchTabException(f'Unknown error received. Raw response: {response}')
    
        if len(parsed['items']) > 0:
            
            if "currencyLayout" in parsed:
                
                print("------------Getting Currency Tabs------------")
                categories.append("Currency")
                for item in parsed['items']:
                    new_currency_items= Currency(
                        category="Currency",
                        league=item['league'],
                        name=item['name'],
                        baseType=item['baseType'],
                        inventoryId=item['inventoryId'],
                        icon=item['icon'],
                        implicitMods=item.get('implicitMods'),# prevents key error if no exist (.get)
                        explicitMods = item.get('explicitMods'),
                        stackSize = item.get('stackSize'),
                        note = item.get('note'))
                    new_currency_items.save()
            elif "gemLayout" in parsed:
                categories.append("Gems")
                print("------------Getting Gem Tabs------------")
                for item in parsed['items']:
                    new_gem_items = Gems(
                        category="Gems",
                        league=item['league'],
                        name=item['name'],
                        baseType=item['baseType'],
                        inventoryId=item['inventoryId'],
                        icon=item['icon'],
                        implicitMods=item.get('implicitMods'),# prevents key error if no exist (.get)
                        explicitMods = item.get('explicitMods'),
                        stackSize = item.get('stackSize'),
                        note = item.get('note'))
                    new_gem_items.save()
            elif "divinationLayout" in parsed:
                categories.append("Divination")
                print("------------Getting Divination Tabs------------")
                for item in parsed['items']:
                    new_div_items = Divination(
                        category="Divination",
                        league=item['league'],
                        name=item['name'],
                        baseType=item['baseType'],
                        inventoryId=item['inventoryId'],
                        icon=item['icon'],
                        implicitMods=item.get('implicitMods'),# prevents key error if no exist (.get)
                        explicitMods = item.get('explicitMods'),
                        stackSize = item.get('stackSize'),
                        note = item.get('note'))
                    new_div_items.save()
            elif "blightLayout" in parsed:
                categories.append("Blight")
                print("------------Getting Blight Tabs------------")
                for item in parsed['items']:
                    new_blight_items = Blight(
                        category="Blight",
                        league=item['league'],
                        name=item['name'],
                        baseType=item['baseType'],
                        inventoryId=item['inventoryId'],
                        icon=item['icon'],
                        implicitMods=item.get('implicitMods'),# prevents key error if no exist (.get)
                        explicitMods = item.get('explicitMods'),
                        stackSize = item.get('stackSize'),
                        note = item.get('note'))
                    new_blight_items.save()
            elif "delveLayout" in parsed:
                categories.append("Delve")
                print("------------Getting Delve Tabs------------")
                for item in parsed['items']:
                    new_delve_items = Delve(
                        category="Delve",
                        league=item['league'],
                        name=item['name'],
                        baseType=item['baseType'],
                        inventoryId=item['inventoryId'],
                        icon=item['icon'],
                        implicitMods=item.get('implicitMods'),# prevents key error if no exist (.get)
                        explicitMods = item.get('explicitMods'),
                        stackSize = item.get('stackSize'),
                        note = item.get('note'))
                    new_delve_items.save()
            elif "fragmentLayout" in parsed:
                categories.append("Fragment")
                print("------------Getting Fragment Tabs------------")
                for item in parsed['items']:
                    new_frag_items = Fragment(
                        category="Fragment",
                        league=item['league'],
                        name=item['name'],
                        baseType=item['baseType'],
                        inventoryId=item['inventoryId'],
                        icon=item['icon'],
                        implicitMods=item.get('implicitMods'),# prevents key error if no exist (.get)
                        explicitMods = item.get('explicitMods'),
                        stackSize = item.get('stackSize'),
                        note = item.get('note'))
                    new_frag_items.save()
            elif "essenceLayout" in parsed:
                categories.append("Essence")
                print("------------Getting Essence Tabs------------")
                for item in parsed['items']:
                    new_ess_items = Essence(
                        category="Essence",
                        league=item['league'],
                        name=item['name'],
                        baseType=item['baseType'],
                        inventoryId=item['inventoryId'],
                        icon=item['icon'],
                        implicitMods=item.get('implicitMods'),# prevents key error if no exist (.get)
                        explicitMods = item.get('explicitMods'),
                        stackSize = item.get('stackSize'),
                        note = item.get('note'))
                    new_ess_items.save()
                    
            elif "deliriumLayout" in parsed:
                categories.append("Delirium")
                print("------------Getting Delirium Tabs------------")
                for item in parsed['items']:
                    new_del_items = Delirium(
                        category="Delirium",
                        league=item['league'],
                        name=item['name'],
                        baseType=item['baseType'],
                        inventoryId=item['inventoryId'],
                        icon=item['icon'],
                        implicitMods=item.get('implicitMods'),# prevents key error if no exist (.get)
                        explicitMods = item.get('explicitMods'),
                        stackSize = item.get('stackSize'),
                        note = item.get('note'))
                    new_del_items.save()
            else:
                categories.append("Gear")
                print("------------Getting Gear Tabs------------")
                for item in parsed['items']:
                    new_gear_items = Gear(
                        category="Gear",
                        league = item['league'],
                        name=item['name'],
                        baseType = item['baseType'],
                        inventoryId = item['inventoryId'],
                        icon = item['icon'],
                        implicitMods=item.get('implicitMods'),# prevents key error if no exist (.get)
                        explicitMods = item.get('explicitMods'),
                        stackSize = item.get('stackSize'),
                        note = item.get('note'))
                    new_gear_items.save()
        return parsed
    
    def getAllTabs():
        tabs = list()
        tabs.append(getTab(0))
        base_delay = 0.005
        flood_delay = 30
        tab_index = 1
        # Loop while we can find tabs (while 'resource not found' has NOT been received)
        while True:
            try:
                time.sleep(base_delay)
                logging.info(f'Fetching tab {tab_index}...')
                tabs.append(getTab(tab_index))
            except RateLimitExceededFTException:
                logging.warning(f"Rate limit exceeded received. Sleeping {flood_delay}")
                time.sleep(flood_delay)
                flood_delay *= 2
                base_delay += 1
            except ResourceNotFoundFTException:
                break
            else:
                tab_index = tab_index + 1
                flood_delay = 30
        return tabs
    
    response = getAllTabs()
    
    gear = list(Gear.objects.all().values())
    currency = list(Currency.objects.all().values())
    gems = list(Gems.objects.all().values())
    divination = list(Divination.objects.all().values())
    blight = list(Blight.objects.all().values())
    delve = list(Delve.objects.all().values())
    fragment = list(Fragment.objects.all().values())
    essence = list(Essence.objects.all().values())
    delirium = list(Delirium.objects.all().values())

    categories = [*set(categories)]
    return JsonResponse({'database_loaded': True,'response': response,
                         'categories': categories, 'gear': gear, 'currency': currency, 
                         'gems': gems, 'divination': divination, 'blight': blight, 
                         'delve': delve, 'fragment': fragment, "essence": essence,
                         'delirium': delirium}) #need to remove these dictionaries to call one at a time below instead

def getCategory(request, category):
    
    print(category)
    if category == "Gear":
        response = list(Gear.objects.all().values())
    elif category == "Currency":
        response = list(Currency.objects.all().values())
    elif category == "Gems":
        response = list(Gems.objects.all().values())
    elif category == "Divination":
        response = list(Divination.objects.all().values())
    elif category == "Blight":
        response = list(Blight.objects.all().values())
    elif category == "Delve":
        response = list(Delve.objects.all().values())
    elif category == "Fragment":
        response = list(Fragment.objects.all().values())
    elif category == "Essence":
        response = list(Essence.objects.all().values())
    elif category == "Delirium":
        response = list(Delirium.objects.all().values())
    # print(response)
    return JsonResponse({'response': response})

def getCart(request):
    response = list(Cart.objects.all().values())
    return JsonResponse({'response': response})
    
@api_view(["POST"])
def add_to_cart(request):
    if request.method == "POST":
        data = request.data
        category = data['category']
        item_id = data['item_id']
        item = {}
        if category == "Gear":
            item = Gear.objects.get(pk=item_id)
        elif category == "Currency":
            item = Currency.objects.get(pk=item_id)
        elif category == "Gems":
            item = Gems.objects.get(pk=item_id)
        elif category == "Divination":
            item = Divination.objects.get(pk=item_id)
        elif category == "Blight":
            item = Blight.objects.get(pk=item_id)
        elif category == "Delve":
            item = Delve.objects.get(pk=item_id)
        elif category == "Fragment":
            item = Fragment.objects.get(pk=item_id)
        elif category == "Essence":
            item = Essence.objects.get(pk=item_id)
        elif category == "Delirium":
            item = Delirium.objects.get(pk=item_id)
        print(category)
        print(item_id)
        print(item.name, item.baseType)
        new_cart_item = Cart(
            category=item.category,
            league = item.league,
            name=item.name,
            baseType = item.baseType,
            inventoryId = item.inventoryId,
            icon = item.icon,
            explicitMods = item.explicitMods,
            implicitMods=item.implicitMods, 
            stackSize = item.stackSize,
            note = item.note)
        new_cart_item.save()
        return JsonResponse({'response': 'added'})

@api_view(["POST"])
def remove_from_cart(request):
    if request.method == "POST":
        data = request.data
        print(data)
        Cart.objects.filter(id=data['item_id']).delete()
        return JsonResponse({'response': 'removed'})


@api_view(["POST"])
def signIn(request):
    # print(request.data)
    email=request.data["email"]
    password=request.data["password"]
    print(email, password)
    user = authenticate(username= email, password = password)
    print(user)
    if user is not None and user.is_active:
        try:
            login(request._request, user)
            return JsonResponse({'signIn':True})
        except Exception as e:
            print(e)
            return JsonResponse({'signIn':False})
    else:
        return JsonResponse({'signIn':False})
    # else:
    #         return JsonResponse({'signIn':False})
    
@api_view(["GET"])
def curr_user(request):
    if request.user.is_authenticated:
        data=serializers.serialize("json", [request.user], fields=['email'])
        return HttpResponse(data)
    else:
        return JsonResponse({"user":None})
        
        
    

@api_view(["POST"])
def signUp(request):
    # print(request.data)
    email=request.data["email"]
    password=request.data["password"]
    print(email, password)
    try:
        AppUser.objects.create_user(username=email, email=email, password=password)
        return JsonResponse({'signup':True})
    except Exception as e:
        print(e)
        return JsonResponse({'signup':False})

def signOut(request):
    try:
        logout(request)
        return JsonResponse({'signout':True})
    except Exception as e:
        print(e)
        return JsonResponse({'signout':False})
    
def get_games(request):
    page_count = 1
    key = os.environ["RAWG_KEY"]
    response = requests.get(f'https://api.rawg.io/api/games?&key={key}&page={page_count}')
    response = response.text
    parsed = json.loads(response)
    # print (parsed)
    return JsonResponse({'response':parsed})
    