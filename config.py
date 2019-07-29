
HERO_LIST = [30001, 30002, 30003, 30004, 30005, 30006]
ARMY_LIST = [53101,53102,53103,53104,53105,53106,53107,53109,53110,53111,53112,53113,53114,53115,53117,53118,53119,53120,53121,53122,53123,53125,53126,53127,53128,53129,53130,53131,53133,53134,53135,53136,53137,53138,53139,53141,53142,53143,53144,53145,53146,53147]

ORIGINAL_DATA_FULL_PATH = "data/battle_logs_vault.csv"
PARSED_ORIGINAL_DATA_FULL_PATH = "data/parsed_data.data"

ENGINEERED_DATA_FULL_PATH = "data/engineered_data.data"
SCALAR_DICT_FULL_PATH = "data/scalar.data"

CASUALTY_PREDICTION_MODEL_FULL_PATH = "data/best_model_randomforrestregression.model"
WINLOSE_PREDICTION_MODEL_FULL_PATH = "data/win_or_lose.model"
NN_WINLOSE_PREDICTION_MODEL_FULL_PATH = "data/nn_win_or_lose.model"

def hero_exist(hero_id):
    return int(hero_id) in HERO_LIST

def get_atk_hero_level_key(hero_id):
    return "atk_hero_" + str(hero_id) + "_level"

def get_atk_hero_quality_key(hero_id):
    return "atk_hero_" + str(hero_id) + "_quality"

def get_atk_hero_star_key(hero_id):
    return "atk_hero_" + str(hero_id) + "_star"

def get_atk_hero_existence_key(hero_id):
    return "atk_hero_" + str(hero_id) + "_exist"

