from flask import Flask
from flask import request, jsonify, render_template, redirect, url_for
from flask import make_response
import data_handler
import prediction
import math

app = Flask(__name__)

default_config = {
    "atk_heroes":{
        "30001":{"star":2, "level":10, "quality":1},
        "30002":{"star":1, "level":14, "quality": 3},
    },
    "atk_armies":{
        "53107":1927,
        "53125":19270,
    },

    "def_armies":{
        "53125":1927,
        "53109":1927,
    },

    "atk_level": 11,

    "result":{
        "win_proba": 0,
        "casualty": 0,
    } 
}

@app.route("/")
def root():
    return render_template("index.html")


@app.route("/predict")
def Predict():
    #print(request.args)
    global default_config
    default_config["result"]["win_proba"], default_config["result"]["casualty"] = data_handler.ExecPrediction(default_config["atk_armies"], default_config["atk_heroes"], default_config["def_armies"], default_config["atk_level"])
    return redirect('/')


@app.route("/delete/atk_army", methods=['GET', 'POST'])
def delete_atk_army():
    global default_config
    for i, v in request.args.items():
        del default_config["atk_armies"][i];
    return redirect('/')

@app.route("/delete/def_army", methods=['GET', 'POST'])
def delete_def_army():
    global default_config
    for i, v in request.args.items():
        del default_config["def_armies"][i]
    return redirect('/')

@app.route("/add/atk_army", methods=['GET', 'POST'])
def add_atk_army():
    global default_config
    army_id = request.args.get('new_atk_army', '')
    army_amount = request.args.get('amount', '')
    army_amount = int(army_amount)
    default_config["atk_armies"][army_id] = army_amount
    return redirect('/')

@app.route("/add/atk_hero", methods=['GET', 'POST'])
def add_atk_hero():
    global default_config
    hero_id = request.args.get('new_atk_hero', '')
    hero_level = int(request.args.get('level', ''))
    hero_quality = int(request.args.get('quality', ''))
    hero_star = int(request.args.get('star', ''))

    default_config["atk_heroes"][hero_id] = {
        "star":hero_star, "level":hero_level, "quality":hero_quality
    }
    return redirect('/')

@app.route("/add/def_army", methods=['GET', 'POST'])
def add_def_army():
    global default_config
    army_id = request.args.get('new_def_army', '')
    army_amount = request.args.get('amount', '')
    army_amount = int(army_amount)
    default_config["def_armies"][army_id] = army_amount
    return redirect('/')

@app.route("/delete/atk_hero", methods=['GET', 'POST'])
def del_atk_hero():
    global default_config
    hero_id = request.args.get('hero_id', '')
    #default_config["atk_heroes"][hero_id] = 0
    del default_config["atk_heroes"][hero_id]
    return redirect('/')

@app.route("/mod_atk_lvl", methods=['GET', 'POST'])
def mod_user_level():
    global default_config
    level = request.args.get('level', '')
    #default_config["atk_heroes"][hero_id] = 0
    default_config["atk_level"] = int(level)
    return redirect('/')


@app.route("/get_info")
def get_cur_selection():
    #print(default_config)
    return jsonify(default_config)

def start():
    prediction.init()
    print("All Done!!!!!!")


start()