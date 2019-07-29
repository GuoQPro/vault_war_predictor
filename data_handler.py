
import prediction
import config
import importlib
importlib.reload(prediction);
importlib.reload(config);
import math;

def ExecPrediction(atk_army_dict, atk_hero_dict, def_army_dict, atk_lvl):
    input_data_template = {
        "atk_heroes":{
            #"30001":{"star":2, "level":10, "quality":1},
            #"30002":{"star":1, "level":14, "quality": 3},
        },
        "atk_armies":{
            #"53107":1927,
            #"53104":917,
            #"53125":19270,
            #"53109":1927,
        },

        "def_armies":{
            #"53125":1927,
            #"53109":1927,
        },

        "atk_level": 11,
    }

    for army_id, army_amount in atk_army_dict.items():
        input_data_template["atk_armies"][army_id] = int(army_amount)

    for army_id, army_amount in def_army_dict.items():
        input_data_template["def_armies"][army_id] = int(army_amount)

    for hero_id, hero_info in atk_hero_dict.items():
        input_data_template["atk_heroes"][hero_id] = hero_info

    input_data_template["atk_level"] = int(atk_lvl)

    parsed_data = prediction.process_original_data(input_data_template)
    win_proba = prediction.predict_win_prob(parsed_data)

    scaled_casualty = prediction.predict_casualty(parsed_data)
    real_casualty = prediction.get_real_casualty(scaled_casualty[0])[0][0]
    return win_proba, real_casualty


