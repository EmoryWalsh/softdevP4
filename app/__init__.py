import os
from utl import ops
from flask import Flask, render_template


app = Flask(__name__)

@app.route('/')
def map():
    return render_template("home.html",data=ops.allDict())

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
    pass

if __name__ == '__main__':
    app.debug = True
    app.run()
