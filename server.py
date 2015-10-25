from model import ProductInfo, connect_to_db, db
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
					"R2D2 Backpack": "843340090504",
					"Pikachu Backpack": "688955702790",
					"Stitch Tsum Tsum": "887734074909",
					"Crayons": "71662000967",
					"Water Bottle": "41205688075",
					"Notebook": "844331015049",
					"Milk": "492840220616",
					"Bread": "72250011372",
					"Erasers": "70530705027",
					"Football": "630509244645",
					"Basketball": "883813853359",
					"Legos": "673419230513",
					"Bike": "87876514220",
					"Hot Wheels Playset": "887961030815",
					"Kitchen Playset": "706943531730",
					"Gluestick": "26000005531",
					"Phone": "708431191457",
					"Guitar": "653569592495",
					"Keyboard": "62243219885"}

@app.route('/')
def index():
	"""Return index page"""
	l = [1,3,6,7]
	d = {}
	for i in l:
		
	return render_template('index.html')


@app.route('/testingpage')
def testing_page():
	"""Return test page"""

	return render_template('test.html')



@app.route('/shopping_item.json')
def target_items():
	"""getting items from target API"""


	# Accept: application/json

	for item in shopping_items.keys():

		id_type = "barcode"
		product_id = shopping_items[item]

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

		new_product = ProductInfo(name=item, link=product_link, img_link=product_image, target_name=product_name, price=product_price)
		db.session.add(new_product)
		db.session.commit()

	return jsonify(img_link=product_image, price=product_price, link=product_link, name=product_name)




'''
************************************
*********WORK ROUTES
************************************
'''



@app.route('/new_game')
def create_new_game():
	pass

@app.route('/process_results', methods=['POST'])
def results():
	pass

if __name__ == "__main__":
    app.debug = True


    connect_to_db(app)


    app.run()
