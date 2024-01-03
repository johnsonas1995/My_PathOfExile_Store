# My_PathOfExile_Store
# E-Commerce Store for purchasing items that are in my POE account's in-game public trading stash.

# Summary:
The video game Path of Exile has a very clunky trading system in which you must send a direct message to another player you wish to trade with and barter with them. This is typically done via direct messages that are copied and pasted from the Path of Exile Trade website. This website displays all items for every player with a public trading stash and provides a convoluted sorting system that is difficult to navigate. Additionally, you must interact with random players who may attempt to scam or harass you.

I want players to be able to visit my personal shop, sort through my products by category, see my prices, generate a shopping cart, and contact me directly in game through the website for a more positive customer experience.  ##completed

Customers will also be able to compare my store prices to current global market value of simlar items via the POE Ninja API. 

Customers who link their steam account will have added functionality to coordinate via Steam to conduct trades while not in game. ##in progress


# APIs Utilized:

-Path of Exile API
-RAWG.IO API (Temporary to ensure project completion by grading criteria as below implemenations are in progress)

-POE Ninja API

-Steam Web API (To be implemented)

startup:
backend:
cd poe_store_backend
source ../poe_venv/bin/activate
pip install -r requirements.txt
touch .env (and add keys)
python manage.py runserver

frontend:
npm install
cd front_end