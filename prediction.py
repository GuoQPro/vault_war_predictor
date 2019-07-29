

import util.py_data_analysis_util.py_util as pu
#from sklearn.ensemble import RandomForestRegressor
import math
import config
import pandas as pd
import numpy as np


casualty_prediction_model = None
win_prob_model = None
win_nn_model = None
scalar_dict = None

total_hero_num = 2

input_data_template = {
    "atk_heroes":{
        "30006":{"star":10, "level":62, "quality":7},
        "30005":{"star":10, "level":62, "quality":6},
    },
    "atk_armies":{
        "53107":9299,
        "53104":22523,
    },

    "def_armies":{
        "53136":13848,
        "53112":6924,
        "53144":6924,
    },

    "atk_level": 20,
}

#army_plans = []

def init():
    get_pretrained_model()
    get_win_prob_model()
    get_win_nn_model()
    get_scalar_dict()


def get_pretrained_model():
    global casualty_prediction_model
    if casualty_prediction_model is None:
        casualty_prediction_model = pu.load_object(config.CASUALTY_PREDICTION_MODEL_FULL_PATH)
    return casualty_prediction_model

def get_win_prob_model():
    global win_prob_model
    if win_prob_model is None:
        win_prob_model = pu.load_object(config.WINLOSE_PREDICTION_MODEL_FULL_PATH)
    return win_prob_model

def get_win_nn_model():
    global win_nn_model
    if win_nn_model is None:
        win_nn_model = pu.load_object(config.NN_WINLOSE_PREDICTION_MODEL_FULL_PATH)
    return win_nn_model

def get_scalar_dict():
    global scalar_dict
    if scalar_dict is None:
        scalar_dict = pu.load_object(config.SCALAR_DICT_FULL_PATH)
    return scalar_dict

def get_scalar_by_id(scalar_id):
    return get_scalar_dict()[scalar_id]

def predict_casualty(data_x):
    return get_pretrained_model().predict(data_x)

def predict_win_prob(data_x):
    return get_win_prob_model().predict_proba(data_x)[0][1]

def predict_win_nn(data_x):
    return get_win_nn_model().predict(data_x, verbose = 1)

def get_real_casualty(normalized_num):
    army_amount_scalar = get_scalar_by_id("army_amount")
    real_value = army_amount_scalar.inverse_transform([[normalized_num]])
    return real_value

def process_original_data(data):
    atk_heroes = data["atk_heroes"]
    atk_armies = data["atk_armies"]
    def_armies = data["def_armies"]

    pd_data = pd.DataFrame()

    for hero_id in config.HERO_LIST:
        hero_id_str = str(hero_id)
        level_key = config.get_atk_hero_level_key(hero_id_str)
        quality_key = config.get_atk_hero_quality_key(hero_id_str)
        star_key = config.get_atk_hero_star_key(hero_id_str)
        existence_key = config.get_atk_hero_existence_key(hero_id_str)

        if hero_id_str in atk_heroes:
            pd_data[existence_key] = [1]
            pd_data[level_key] = [get_scalar_by_id(level_key).transform(atk_heroes[hero_id_str]["level"])]
            pd_data[star_key] = [get_scalar_by_id(star_key).transform(atk_heroes[hero_id_str]["star"])]
            pd_data[quality_key] = [get_scalar_by_id(quality_key).transform(atk_heroes[hero_id_str]["quality"])]
        else:
            pd_data[existence_key] = [0]
            pd_data[level_key] = [0]
            pd_data[star_key] = [0]
            pd_data[quality_key] = [0]

    army_amount_scalar = get_scalar_by_id("army_amount")

    total_atk_army_amount = 0

    for army_id in config.ARMY_LIST:
        atk_amount_key = "atk_army_" + str(army_id)

        if str(army_id) in atk_armies:
            pd_data[atk_amount_key] = army_amount_scalar.transform([[atk_armies[str(army_id)]]])
            total_atk_army_amount += atk_armies[str(army_id)]
        else:
            pd_data[atk_amount_key] = 0

    total_def_army_amount = 0
    for army_id in config.ARMY_LIST:
        def_amount_key = "def_army_" + str(army_id)
        if str(army_id) in def_armies:
            pd_data[def_amount_key] = army_amount_scalar.transform([[def_armies[str(army_id)]]])
            total_def_army_amount += def_armies[str(army_id)]
        else:
            pd_data[def_amount_key] = 0
      
    pd_data["atk_level"] = get_scalar_by_id("atk_level").transform([[data["atk_level"]]])
    pd_data["atk_total_army"] = get_scalar_by_id("atk_total_army").transform([[total_atk_army_amount]])
    pd_data["def_total_army"] = get_scalar_by_id("def_total_army").transform([[total_def_army_amount]])

    return pd_data
