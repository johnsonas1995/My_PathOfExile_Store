import requests
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import json
import time
import logging
import os
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
        print(tabs)
        return tabs
    
    response = getAllTabs()
    
    return JsonResponse({'success': True, 'response': response})
    