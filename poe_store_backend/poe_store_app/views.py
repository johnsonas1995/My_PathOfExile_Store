from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import json
import os
import time
import logging
from dotenv import load_dotenv
load_dotenv()
import requests

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
    print(parsed['numTabs'])
       
    return JsonResponse({'success': True, 'response': parsed})
    ###############################################################################################
    ################################################################################################
    # char_token = os.environ["CHARACTER_TOKEN"]
 
    # endpoint = 'https://www.pathofexile.com/character-window/get-characters '
    # data = {
    #     'accountName': 'darthvaldo',
    #     'league': 'Standard',
    #     'realm': 'pc'
    # }
    
    # headers = {
    #     'user-agent': 'School API Project/0.0.1 (contact: toxicity.aj@gmail.com)',
    #     'Authorization': 'Bearer ' + char_token,      
    # }
    # response = requests.get(endpoint, headers=headers, data=data)

    # print(response.json()[1]) 
################################################################################################
    
