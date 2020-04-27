import os
from flask import Flask
from flask import render_template
app = Flask(__name__)

#DIR = os.path.dirname(__file__)
#DIR += "/"

@app.route("/")
def hello_world():
	return render_template("home.html")


if __name__ == "__main__":
    app.debug = False
    app.run()

