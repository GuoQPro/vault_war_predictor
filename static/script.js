
function RefreshPageInfo() {
    console.log("call RefreshArmies")
    fetch("/get_info")
        .then(response => response.json())
        .then(function(response){
            for (var key in response) {
                if (key == "atk_heroes") {
                    atk_heroes_field_set = document.createElement("fieldset")
                    atk_heroes_field_legend = document.createElement("legend")
                    atk_heroes_field_legend.innerHTML = "攻方英雄(id | level | quality | star)"
                    atk_heroes_field_set.appendChild(atk_heroes_field_legend)
                    document.getElementById('sec_hero').appendChild(atk_heroes_field_set);
                    
                    for (var hero_id in response[key]) {
                        if (response[key][hero_id] == 0) {
                            console.log("is 0::: ", hero_id)
                        }
                        else {
                            var hero_level = response[key][hero_id]["level"]
                            var hero_quality = response[key][hero_id]["quality"]
                            var hero_star = response[key][hero_id]["star"]
                            CreateAtkHeroInfo(atk_heroes_field_set, hero_id, hero_level, hero_quality, hero_star)
                        }
                    }

                    CreateNewAtkHeroElement(atk_heroes_field_set)
                }
                
                if (key == "atk_armies") {
                    atk_armies_field_set = document.createElement("fieldset")
                    atk_armie_field_legend = document.createElement("legend")
                    atk_armie_field_legend.innerHTML = "攻方部队"
                    atk_armies_field_set.appendChild(atk_armie_field_legend)
                    document.getElementById('sec_input').appendChild(atk_armies_field_set);
                    for (var atkArmy in response[key]) {
                        if (Number(response[key][atkArmy]) > 0) {
                            CreateAtkArmyInfo(atk_armies_field_set, atkArmy, response[key][atkArmy]);
                        }
                    }
                    CreateNewAtkArmyElement(atk_armies_field_set);
                }

                if (key == "def_armies") {
                    def_armies_field_set = document.createElement("fieldset")
                    def_armie_field_legend = document.createElement("legend")
                    def_armie_field_legend.innerHTML = "守方部队"
                    def_armies_field_set.appendChild(def_armie_field_legend)
                    document.getElementById('sec_input').appendChild(def_armies_field_set);
                    for (var defArmy in response[key]) {
                        if (Number(response[key][defArmy]) > 0) {
                            CreateDefArmyInfo(def_armies_field_set, defArmy, response[key][defArmy]);
                        }
                    }
                    CreateNewDefArmyElement(def_armies_field_set);
                }

                if (key == "atk_level") {
                    atk_lvl_field_set = document.createElement("fieldset")
                    atk_lvl_field_legend = document.createElement("legend")
                    atk_lvl_field_legend.innerHTML = "玩家等级"
                    atk_lvl_field_set.appendChild(atk_lvl_field_legend)
                    document.getElementById('sec_user_lvl').appendChild(atk_lvl_field_set);
                    SetAttackerLevel(atk_lvl_field_set, response[key])

                }

                if (key == "result") {
                    result_field_set = document.createElement("fieldset")
                    result_field_legend = document.createElement("legend")
                    result_field_legend.innerHTML = "预测结果"
                    result_field_set.appendChild(result_field_legend)
                    document.getElementById('sec_result').appendChild(result_field_set);

                    win_proba_label = document.createElement("label")
                    win_proba_label.innerHTML = "预测胜率: " + (Math.floor(response[key]["win_proba"] * 1000) / 10) + "%"

                    casualty_label = document.createElement("label")
                    casualty_label.innerHTML = "预测受伤士兵数: " + Math.floor(response[key]["casualty"])

                    result_field_set.appendChild(win_proba_label)
                    result_field_set.appendChild(document.createElement("br"))
                    result_field_set.appendChild(casualty_label)
                }
            }
        })
}

function CreateNewAtkArmyElement(parentElement) {
    var new_form = document.createElement("form")
    new_form.setAttribute('name', "new_atk_army");
    new_form.setAttribute('method', "get");
    new_form.setAttribute('action', "/add/atk_army")

    var id_input = document.createElement("select");
    id_input.setAttribute('name', "new_atk_army");

    for (var i of [53101,53102,53103,53104,53105,53106,53107,53109,53110,53111,53112,53113,53114,53115,53117,53118,53119,53120,53121,53122,53123,53125,53126,53127,53128,53129,53130,53131,53133,53134,53135,53136,53137,53138,53139,53141,53142,53143,53144,53145,53146,53147]) {
        var newOpt = document.createElement("option");
        newOpt.setAttribute('value', i)
        newOpt.innerHTML = i
        id_input.appendChild(newOpt)
    }

    var amount_input = document.createElement("input");
    amount_input.setAttribute('type', "text");
    amount_input.setAttribute('name', "amount");
    amount_input.setAttribute('value', 0)

    var s = document.createElement("input"); 
    s.setAttribute('type', "submit");
    s.setAttribute('value', "add/modify");

    new_form.appendChild(id_input);
    new_form.appendChild(amount_input);
    new_form.appendChild(s);
    parentElement.appendChild(new_form);
}

function CreateNewAtkHeroElement(parentElement) {
    var new_form = document.createElement("form")
    new_form.setAttribute('name', "new_atk_hero");
    new_form.setAttribute('method', "get");
    new_form.setAttribute('action', "/add/atk_hero")

    var id_input = document.createElement("select");
    id_input.setAttribute('name', "new_atk_hero");

    for (var i of [30001, 30002, 30003, 30004, 30005, 30006]) {
        var newOpt = document.createElement("option");
        newOpt.setAttribute('value', i)
        newOpt.innerHTML = i
        id_input.appendChild(newOpt)
    }

    var level_input = document.createElement("input");
    level_input.setAttribute('type', "text");
    level_input.setAttribute('name', "level");
    level_input.setAttribute('value', 0)

    var quality_input = document.createElement("input");
    quality_input.setAttribute('type', "text");
    quality_input.setAttribute('name', "quality");
    quality_input.setAttribute('value', 0)

    var star_input = document.createElement("input");
    star_input.setAttribute('type', "text");
    star_input.setAttribute('name', "star");
    star_input.setAttribute('value', 0)

    var s = document.createElement("input"); 
    s.setAttribute('type', "submit");
    s.setAttribute('value', "add/modify");

    new_form.appendChild(id_input);
    new_form.appendChild(level_input);
    new_form.appendChild(quality_input);
    new_form.appendChild(star_input);
    new_form.appendChild(s);
    parentElement.appendChild(new_form);
}

function CreateNewDefArmyElement(parentElement) {
    var new_form = document.createElement("form")
    new_form.setAttribute('name', "new_def_army");
    new_form.setAttribute('method', "get");
    new_form.setAttribute('action', "/add/def_army")

    var id_input = document.createElement("select");
    id_input.setAttribute('name', "new_def_army");

    for (var i of [53101,53102,53103,53104,53105,53106,53107,53109,53110,53111,53112,53113,53114,53115,53117,53118,53119,53120,53121,53122,53123,53125,53126,53127,53128,53129,53130,53131,53133,53134,53135,53136,53137,53138,53139,53141,53142,53143,53144,53145,53146,53147]) {
        var newOpt = document.createElement("option");
        newOpt.setAttribute('value', i)
        newOpt.innerHTML = i
        id_input.appendChild(newOpt)
    }

    var amount_input = document.createElement("input"); //input element, Submit button
    amount_input.setAttribute('type', "text");
    amount_input.setAttribute('name', "amount");
    amount_input.setAttribute('value', 0)

    var s = document.createElement("input"); //input element, Submit button
    s.setAttribute('type', "submit");
    s.setAttribute('value', "add/modify");

    new_form.appendChild(id_input);
    new_form.appendChild(amount_input);
    new_form.appendChild(s);
    //document.getElementsByTagName('body')[0].appendChild(new_form);
    parentElement.appendChild(new_form);
}

function CreateAtkArmyInfo(parentElement, army_id, army_amount) {
    var new_form = document.createElement("form")
    new_form.setAttribute('method',"get");
    new_form.setAttribute('action',"/delete/atk_army")

    var id_input = document.createElement("input"); 
    id_input.setAttribute('type', "text");
    id_input.setAttribute('value', army_id)

    var amount_input = document.createElement("input"); 
    amount_input.setAttribute('type', "text");
    amount_input.setAttribute('name', army_id);
    amount_input.setAttribute('value', army_amount)

    var s = document.createElement("input");
    s.setAttribute('type', "submit");
    s.setAttribute('value', "remove");

    new_form.appendChild(id_input);
    new_form.appendChild(amount_input);
    new_form.appendChild(s);

    parentElement.appendChild(new_form);
}

function CreateDefArmyInfo(parentElement, army_id, army_amount) {
    var new_form = document.createElement("form")
    new_form.setAttribute('method',"get");
    new_form.setAttribute('action',"/delete/def_army")

    var id_input = document.createElement("input"); 
    id_input.setAttribute('type', "text");
    id_input.setAttribute('value', army_id)

    var amount_input = document.createElement("input"); 
    amount_input.setAttribute('type', "text");
    amount_input.setAttribute('name', army_id);
    amount_input.setAttribute('value', army_amount)


    var s = document.createElement("input");
    s.setAttribute('type', "submit");
    s.setAttribute('value', "remove");

    new_form.appendChild(id_input);
    new_form.appendChild(amount_input);
    new_form.appendChild(s);

    parentElement.appendChild(new_form);
}

function CreateAtkHeroInfo(parentElement, hero_id, hero_level, hero_quality, hero_star) {
    var new_form = document.createElement("form")
    new_form.setAttribute('method',"get");
    new_form.setAttribute('action',"/delete/atk_hero")

    var id_input = document.createElement("input"); 
    id_input.setAttribute('type', "text");
    id_input.setAttribute('name', "hero_id");
    id_input.setAttribute('value', hero_id)

    var level_input = document.createElement("input"); 
    level_input.setAttribute('type', "text");
    level_input.setAttribute('value', hero_level);

    var quality_input = document.createElement("input"); 
    quality_input.setAttribute('type', "text");
    quality_input.setAttribute('value', hero_quality);

    var star_input = document.createElement("input"); 
    star_input.setAttribute('type', "text");
    star_input.setAttribute('value', hero_star);


    var btn = document.createElement("input");
    btn.setAttribute('type', "submit");
    btn.setAttribute('value', "remove");

    new_form.appendChild(id_input);
    new_form.appendChild(level_input);
    new_form.appendChild(quality_input);
    new_form.appendChild(star_input);
    new_form.appendChild(btn);

    parentElement.appendChild(new_form);
}

function SetAttackerLevel(parentElement, level) {
    var new_form = document.createElement("form")
    new_form.setAttribute('method',"get");
    new_form.setAttribute('action',"/mod_atk_lvl")

    var level_input = document.createElement("input"); 
    level_input.setAttribute('type', "number");
    level_input.setAttribute('name', "level");
    level_input.setAttribute('value', level)

    var s = document.createElement("input");
    s.setAttribute('type', "submit");
    s.setAttribute('value', "modify");

    new_form.appendChild(level_input);
    new_form.appendChild(s);
    parentElement.appendChild(new_form);
}

