from django.shortcuts import render
from django.http import HttpResponse
import os
from dotenv import load_dotenv
load_dotenv()
import requests


def index(request):
    index_file = open('static/index.html').read()
    
    # char_token = os.environ["CHARACTER_TOKEN"]
 
    # endpoint = 'https://www.pathofexile.com/character-window/get-characters '
    # data = {
    #     'accountName': 'DarthValdo',
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
    stash_token = os.environ["STASH_TOKEN"]
 
    endpoint = 'https://www.pathofexile.com/character-window/get-stash-items'
    data = {
        'accountName': 'DarthValdo',
        'league': 'Hardcore',
        'realm': 'pc',
        'tabIndex': 4,
        'tabs': 0,
   
    }
    headers = {
        'user-agent': 'School API Project/0.0.1 (contact: toxicity.aj@gmail.com)',
        'Authorization': 'Bearer ' + stash_token,      
    }
    response = requests.post(endpoint, headers=headers, data=data)
    #needed to be a x post request for some stupid x reason
    print(response.json()) 
    ###############################################################################################
    return HttpResponse(index_file)
