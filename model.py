from flask_sqlalchemy import SQLAlchemy
import psycopg2

import os

db = SQLAlchemy()


class ProductInfo(db.Model):
	"""database for target items."""

	__tablename__ = "products"

	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(500), nullable=False, unique=True)
	target_name = db.Column(db.String(500), nullable=False, unique=True)
	price = db.Column(db.String(10), nullable=False)
	link = db.Column(db.String(500), nullable=False)
	img_link = db.Column(db.String(500), nullable=False)


	def __repr__(self):
		"""Statement when object is printed."""

		return "<Product: %s>" % (self.name)



def connect_to_db(app):
    """Connect the database to our Flask app."""


    DATABASE_URL = os.environ.get("DATABASE_URL",
                              "postgresql://localhost/productsdb")
   
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
    db.app = app
    db.init_app(app)



if __name__ == "__main__":
# allows working with the database directly

    from server import app
    connect_to_db(app)
    print "Connected to DB."