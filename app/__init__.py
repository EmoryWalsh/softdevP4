import os
from utl import ops
from flask import Flask, render_template


app = Flask(__name__)

@app.route('/')
def home():
    return render_template("home.html")

@app.route('/map')
def map():
    return render_template("maps.html",data=ops.allDict())

@app.route('/nation/<country>')
def stats(country):
	if (ops.isCountry(country)):
		return render_template("country.html",name=country,stats=ops.countryDict(country))
	return "No Such Country"

@app.route('/graphs')
def graphs():
    return render_template("graphs.html")

@app.route('/help')
def help():
    return render_template("help.html")

if __name__ == '__main__':
    app.debug = True
    app.run()
