import csv

countries = {}

with open("static/data/2016.csv","r") as file:
	reader = csv.reader(file,delimiter=',')
	for row in reader:
		app = {}
		app['region'] = row[1]
		app['score'] = row[3]
		app['economy'] = row[6]
		app['family'] = row[7]
		app['health'] = row[8]
		app['freedom'] = row[9]
		app['trust'] = row[10]
		app['generosity'] = row[11]
		app['other'] = row[12]
		countries[row[0].replace(" ","")] = app

def isCountry(name):
	return name in countries

def countryDict(name):
	return countries[name]