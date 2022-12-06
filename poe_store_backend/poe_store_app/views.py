from django.shortcuts import render
from django.http import HttpResponse
import os
from dotenv import load_dotenv
load_dotenv()
import requests


def index(request):
    index_file = open('static/index.html').read()
    char_token = os.environ["CHARACTER_TOKEN"]
    print(char_token)
 
    endpoint = 'https://www.pathofexile.com/character-window/get-characters '
    data = {
        'accountName': 'DarthValdo',
        'league': 'Standard',
        'realm': 'pc'
    }
    
    headers = {
        'user-agent': 'School API Project/0.0.1 (contact: toxicity.aj@gmail.com)',
        'Authorization': 'Bearer ' + char_token,      
    }
    response = requests.get(endpoint, headers=headers, data=data)

    print(response.json())
    return HttpResponse(index_file)