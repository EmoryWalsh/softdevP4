import os
from flask import Flask, render_template


app = Flask(__name__)

@app.route('/')
def map():
    return render_template("home.html")

@app.route('/graphs')
def graph():
    return render_template("graphs.html")

if __name__ == '__main__':
    app.debug = True
    app.run()
