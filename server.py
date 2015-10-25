from flask import Flask, render_template, redirect, request
from jinja2 import StrictUndefined

app = Flask(__name__)

app.secret_key = 'ABC'
app.jinja_env.undefined = StrictUndefined

@app.route('/')
def index():
	"""Return index page"""
	return render_template('index.html')

if __name__ == "__main__":
    app.debug = True

    app.run()
