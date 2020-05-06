import csv

countries = {}
nscountries = {}
num = 0

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
		countries[row[0]] = app
		nscountries[row[0].replace(" ","")] = app
		num = num+1

def isCountry(name):
	return name in nscountries

def countryDict(name):
	return nscountries[name]

def allDict():
	return countries

def rank(name, factor):
	with open("static/data/2016.csv","r") as file:
		reader = csv.reader(file,delimiter=',')
		ans = 0
		score = nscountries[name][factor]
		for c in countries:
			if countries[c][factor] > score:
				ans = ans + 1
		return ans

def ranks(name):
	ans = {}
	ans['score'] = rank(name,'score')
	ans['economy'] = rank(name,'economy')
	ans['family'] = rank(name,'family')
	ans['health'] = rank(name,'health')
	ans['freedom'] = rank(name,'freedom')
	ans['trust'] = rank(name,'trust')
	ans['generosity'] = rank(name,'generosity')
	ans['other'] = rank(name,'other')
	return ans

def numCountries():
	return num