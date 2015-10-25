from flask import Flask, render_template, redirect, request, jsonify
from jinja2 import StrictUndefined

import requests
import pprint
import json
import os

app = Flask(__name__)

target_key = os.environ["TARGET_KEY"]

app.secret_key = 'ABC'
app.jinja_env.undefined = StrictUndefined

shopping_item_list = ["Graphing Calculator", "Backpack"]

shopping_items = {"Graphing Calculator": "033317192120",
					"Backpack": " 843340090504"}

@app.route('/')
def index():
	"""Return index page"""
	return render_template('index.html')


@app.route('/shopping_item.json')
def target_items():
	"""getting items from target API"""

	product_id = "033317192120"
	id_type = "barcode"

	# Accept: application/json

	headers = {'Accept': "application/json"}

	# /items/v3/{product_id}{?id_type,store_id,fields,key}
	base_url = "https://api.target.com/items/v3/"
	param_url = "%s?id_type=%s&key=%s&fields=extended_core,ids,descriptions,brand,pricing,images" % (
		product_id, id_type, target_key)
	final_url = base_url + param_url
	print "FINAL URL: ", final_url

	response = requests.get(final_url, headers)

	response_text = response.json()

	pprint.pprint(response_text)

	product_link = response_text["product_composite_response"]["items"][0]["data_page_link"]
	print "PRODUCT LINK: ", product_link

	product_name = response_text["product_composite_response"]["items"][0]["alternate_description"][0]["value"]
	print "PRODUCT NAME: ", product_name

	product_price = response_text["product_composite_response"]["items"][0]["online_price"]["current_price"]
	print "PRODUCT PRICE: ", product_price

	product_image = response_text["product_composite_response"]["items"][0]["image"]["internal_primary_image_url"]
	product_image = product_image[0]
	print "PRODUCT IMAGE LINK: ", product_image

	product_object = {"img_link": product_image,
						"price": product_price,
						"link": product_link,
						"name": product_name}

	return jsonify(img_link=product_image, price=product_price, link=product_link, name=product_name)


if __name__ == "__main__":
    app.debug = True

    app.run()
