#Shopping Cart Math
####Winner of "Most Creative Use of Target APIs" at the October 2015 HackingEdu hackathon.

###A math game targeted towards children / young students using real prices and products from Target.com
#### Now deployed on Heroku: [Shopping Cart Math](http://shoppingcartmath.herokuapp.com/)

<img src="static/img/app.jpg">

-----------------

##Table of Contents

* [Idea](#idea)
* [Target Products](#target-products)
* [Challenges](#challenges)
* [Version 2.0](#version2)
* [About The Developers](#about-us)

-------------

## <a name="idea"></a>Idea
Since the hackathon had an education theme, our team wanted to encourage kids to learn math by giving them real-world prices and scenarios. When we shop at Target, most of us have played the game of who can guess the closest total price of the purchase. It's a fun idea that we wanted kids to have access to and keep them occupied while the parents do some grocery shopping. Currently, our problems involve addition and multiplication. As players progress, we increase the quantity of total items as well as quantity of individual items.

-------------

## <a name="target-products"></a>Target Products
We used the Target API to get product name, price, image URL, and product detail Target URL and stored it in our PostgreSQL database. At first we were using SQLAlchemy to query that data to display in our UI. However, we wanted to test out Cluster Point (one of the sponsors of the hackathon) so we imported our data to a Cluster Point account and we are not making an API call each time we display a math problem.

-------------

## <a name="challenges"></a>Challenges
We had so many ideas and features we wanted to add to this game! 
Since Shopping Cart Math is inspired by the guessing game at checkout, we really wanted to have interactions between users. We wanted to use websockets to bring that to a multiplayer level if we had more time at the hackathon! We also had an idea to make the game run on a time limit so that the user is forced to calculate on their feet. We hope to implement these ideas in our Version 2.0.

-------------

## <a name="version2"></a>Version 2.0
In addition to the above ideas, we plan to expand this project to incorporate subtraction and division. We also plan to introduce algebra/variable problems such as "If I have $60, what combination of x and y items can I buy?". 
We also wanted to display a step-by-step walkthrough of the answer so that the player can identify what they did wrong and learn from their mistakes.

-------------

## <a name="about-us"></a>About The Developers

**Lauren Ortencio** | [GitHub](https://github.com/laurenor) | [LinkedIn](https://www.linkedin.com/in/laurenortencio)

**Paola Socorro** | [GitHub](https://github.com/PaolaSocorro) | [LinkedIn](https://www.linkedin.com/in/paolasocorro)

**Susan Chin** | [GitHub](https://github.com/susancodes) | [LinkedIn](https://www.linkedin.com/in/susanschin) | [Personal](http://susancodes.com/)

**Andrew Nguyen** | [GitHub](https://github.com/andrewn2118) | [LinkedIn](https://www.linkedin.com/pub/andrew-nguyen/bb/aa0/207)



