/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


jQuery(document).ready(function ($) {
    var httpRequestChamp = new XMLHttpRequest();
    var httpRequestRunes = new XMLHttpRequest();
    var httpRequestItems = new XMLHttpRequest();
    var httpRequestChamps = new XMLHttpRequest();
    var httpRequestSummoners = new XMLHttpRequest();
    var champSelected = "Anivia";
    var urlBase = "http://ddragon.leagueoflegends.com/cdn/";
    var version = "6.14.1";
    var language = "/data/es_MX/";
    var urlRunes = urlBase + version + language + "rune.json";
    var urlChamp = urlBase + version + language + "/champion/" + champSelected + ".json";
    var urlChamps = urlBase + version + language + "champion.json";
    var urlItems = urlBase + version + language + "item.json";
    var urlSummoners = urlBase + version + language + "summoner.json";
    var myRunesObj, champObj, champsObj, itemsObj, summObj;

    httpRequestChamps.onreadystatechange = function () {
        if (httpRequestChamps.readyState === 4 && httpRequestChamps.status === 200) {
            champsObj = JSON.parse(httpRequestChamps.responseText);
        }
    };

    httpRequestChamp.onreadystatechange = function () {
        if (httpRequestChamp.readyState === 4 && httpRequestChamp.status === 200) {
            champObj = JSON.parse(httpRequestChamp.responseText);
    }
    };
    httpRequestItems.onreadystatechange = function () {
        if (httpRequestItems.readyState === 4 && httpRequestItems.status === 200) {
            itemsObj = JSON.parse(httpRequestItems.responseText);
        }
    };
    httpRequestRunes.onreadystatechange = function () {
        if (httpRequestRunes.readyState === 4 && httpRequestRunes.status === 200) {
            myRunesObj = JSON.parse(httpRequestRunes.responseText);
        }
    };
    httpRequestSummoners.onreadystatechange = function () {
        if (httpRequestSummoners.readyState === 4 && httpRequestSummoners.status === 200) {
            summObj = JSON.parse(httpRequestSummoners.responseText);
        }
    };

    httpRequestRunes.open("GET", urlRunes, true);
    httpRequestChamps.open("GET", urlChamps, true);
    httpRequestChamp.open("GET", urlChamp, false);
    httpRequestItems.open("GET", urlItems, true);
    httpRequestSummoners.open("GET", urlSummoners, true);
    httpRequestChamps.send();
    httpRequestChamp.send();
    httpRequestRunes.send();
    httpRequestItems.send();
    httpRequestSummoners.send();
    var principalesRed = ["5245", "5247", "5251", "5253", "5257", "5267", "5273", "5402"];
    var restoRed = ["5246", "5249", "5255", "5256", "5259", "5260", "5265", "5268", "5269", "5270", "5271"];
    var principalesBlue = ["5301", "5289", "5290", "5297", "5298", "5295", "5296"];
    var restoBlue = ["5275", "5276", "5277", "5279", "5281", "5285", "5286", "5287", "5291", "5299", "5300", "5302", "5303", "5371"];
    var principalesYellow = ["5315", "5316", "5317", "5318", "5415"];
    var restoYellow = ["5305", "5306", "5307", "5309", "5311", "5319", "5320", "5321", "5322", "5325", "5327", "5328", "5329", "5330", "5331", "5332", "5369", "5370", "5403"];
    var principalesQuint = ["5335", "5357", "5337", "5343", "5347", "5363", "5365", "5412", "5418"];
    var restoQuint = ["5336", "5339", "5341", "5345", "5346", "5348", "5349", "5350", "5351", "5352", "5355", "5356", "5358", "5359", "5360", "5361", "5362", "5366", "5367", "5368", "5373", "5374", "5406", "5409"];
    var imagesID = ["3006", "3047", "3111", "3009", "3020", "3117", "3158", "1001", "1004", "1006", "1011", "1018", "1026", "1027", "1028", "1029", "1031", "1033", "1036", "1037", "1038", "1039", "1041", "1042", "1043", "1051", "1052", "1053", "1054", "1055", "1056", "1057", "1058", "1082", "1083", "1400", "1401", "1402", "1408", "1409", "1410", "1412", "1413", "1414", "1416", "1418", "1419", "2003", "2015", "2031", "2032", "2033", "2043", "2045", "2049", "2053", "2138", "2139", "2140", "2301", "2302", "2303", "3001", "3003", "3004", "3010", "3022", "3024", "3025", "3026", "3027", "3028", "3030", "3031", "3033", "3034", "3035", "3036", "3041", "3044", "3046", "3050", "3052", "3053", "3056", "3057", "3060", "3065", "3067", "3068", "3069", "3070", "3071", "3072", "3074", "3075", "3077", "3078", "3082", "3083", "3085", "3086", "3087", "3089", "3091", "3092", "3094", "3096", "3097", "3098", "3100", "3101", "3102", "3105", "3108", "3110", "3113", "3114", "3115", "3116", "3123", "3124", "3133", "3134", "3135", "3136", "3139", "3140", "3142", "3143", "3144", "3145", "3146", "3147", "3151", "3152", "3153", "3155", "3156", "3157", "3165", "3174", "3190", "3191", "3196", "3197", "3198", "3211", "3222", "3285", "3301", "3302", "3303", "3340", "3341", "3363", "3364", "3401", "3504", "3508", "3512", "3599", "3671", "3672", "3673", "3675", "3706", "3711", "3715", "3742", "3748", "3751", "3800", "3801", "3802", "3812", "3901", "3902", "3903"];
    var summonersID = ["SummonerFlash", "SummonerDot", "SummonerSmite", "SummonerExhaust", "SummonerTeleport", "SummonerHeal", "SummonerHaste", "SummonerMana", "SummonerClairvoyance", "SummonerBoost", "SummonerBarrier"];


    $(".quints").click(function () {
        var id = $(this).parents(".seccionRunas").attr("id").toString();
        console.log("var: " + id);
        runeDivCreatorAuto(id, principalesQuint, restoQuint);
        shadowAnimation(this);
    });

    $(".glyphs").click(function () {
        var id = $(this).parents(".seccionRunas").attr("id").toString();
        runeDivCreatorAuto(id, principalesBlue, restoBlue);
        shadowAnimation(this);
    });
    $(".seals").click(function () {
        var id = $(this).parents(".seccionRunas").attr("id").toString();
        runeDivCreatorAuto(id, principalesYellow, restoYellow);
        shadowAnimation(this);
    });
    $(".marks").click(function () {
        var id = $(this).parents(".seccionRunas").attr("id").toString();
        runeDivCreatorAuto(id, principalesRed, restoRed);
        shadowAnimation(this);
    });



    $('.modal-body').on('click', '.itemIcon', function () {
        var text = $(this).data("id");
        var textInsert = "[item/" + text + "]";
        insertText(textInsert);
    });
    $('.modal-body').on('click', '.champIcon', function () {
        var text = $(this).data("id");
        var textInsert = "[champion/" + text + "]";
        insertText(textInsert);
    });
    $('.modal-body').on('click', '.summIcon', function () {
        var text = $(this).data("id");
        //var textInsert = '"' + text + '", ';
        var textInsert = "[summoner/" + text + "]";
        insertText(textInsert);
    });

    $('#box').keyup(function () {
        var valThis = this.value.toLowerCase();
        $('.modalImgsContainer>div').each(function (i) {
            var text = $(this).data("name");
            console.log("text: " + text);
            var textL = text.toLowerCase();
            (textL.indexOf(valThis) >= 0) ? $(this).fadeIn(500) : $(this).fadeOut((i * 2.8) + 100);
            //(textL.indexOf(valThis) >= 0) ? $(this).fadeIn(500) : $(this).fadeOut((i*4)+70);
        });

    });
    function clearModalBody() {
        var $modalBody = $(".modal-body>div").first();
        if ($modalBody.children().first().length) { //si el modal-body tiene hijos
            $(".modal-body>div").empty();
        }
        $('#box').val('');
    }

    function clearDropdownForItems(parent, typeOfItems) { //checkea si el dropdownforitems tiene hijos
        var index = -1;
        (typeOfItems === "starting") ? index = 3 : index = 7;
        var dropdownBody = document.getElementById(parent).children[index].children[0];
        dropdownBody.innerHTML = '';
    }

    var wrap = $("#wrap");
//
//    wrap.on("scroll", function (e) {
//
//        if (this.scrollTop > 147) {
//            wrap.addClass("fix-search");
//        } else {
//            wrap.removeClass("fix-search");
//        }
//
//    });
    wrap.bind("scroll", function (){
       console.log("probando scrolling"); 
    });
    
       $(document).on("scroll", debounce(function(e) {
        if ($(window).scrollTop() > 200) {
            console.log("llegue a mi limite!");
            wrap.addClass("fix-search");
        } else {
            wrap.removeClass("fix-search");
        }
        console.log("me escrollearon!");

    },50));




    $(".ddSelectorsContainer").on("click", ".itemSelective", function () {
        var $itemContainer = $(this).parents(".selectorsContainer").children("div [data-index='" + itemSlotIndex + "']");
        var $fieldContainer = $(this).parents(".selectorsContainer").next();
        var id = $(this).data("id");
        var $itemIcon = $itemContainer.children();
        if ($itemIcon.length) { //if para eliminar el item que se encontraba en el slot (se sustituirá por el nuevo)
            var idOld = $itemIcon.first().data("id");
            updateGuideField($fieldContainer, idOld, 0, "items", 0);
            $itemContainer.first().empty();
        }
        $(this).clone().appendTo($itemContainer);
        $fieldContainer.val(""); //TENTATIVO
        $(this).parents(".selectorsContainer").children().each(function (i) {
            var $itemChild = $(this).children().first();
            var idExisting = $itemChild.data("id");
            if (idExisting !== undefined) {
                if (idExisting === id && itemSlotIndex !== i) { //if para eliminar el item repetido y solo se deja guarda el nuevo
                    $itemChild.remove();
                    //updateGuideField($fieldContainer, idExisting, 0, "items", 0); //OVITATNET
                } else { // TENTATIVO
                    updateGuideField($fieldContainer, idExisting, 0, "items", 0); //TENTATIVO
                }
            }
        });

        //updateGuideField($fieldContainer, id, 0, "items", "0"); //OVITATNET
    });

    $(".selectorsContainer").on('contextmenu', '.selectorContainer', function (e) {
        e.preventDefault();
        var $fieldContainer = $(this).parent().next();
        var id = $(this).children().first().data("id");
        if (id !== undefined) {
            updateGuideField($fieldContainer, id, 0, "items", "0");
        }
        $(this).empty();
    });

    window.loadTrinkets = function (parent, index, typeOfItems) {
        itemSlotIndex = index;
        if (typeOfItems === "finish") {
            var trinkets = ["3340", "3363", "3364"];
            var indexToInsert = 7;
        } else {
            var trinkets = ["3340", "3341"];
            var indexToInsert = 3;
        }
        clearDropdownForItems(parent, typeOfItems);
        for (var i = 0; i < trinkets.length; i++) {
            var id = trinkets[i];
            var itemIcon = loadImgIcon(id, "itemIcon itemSelective", "items");
            document.getElementById(parent).children[indexToInsert].children[0].appendChild(itemIcon);
        }
    };



    function getTypeObj(type) {
        if (type === "items")
            return itemsObj;
        else if (type === "champions")
            return champsObj;
        else if (type === "summoners")
            return summObj;
    }
    ;



    var itemSlotIndex = -1;

    window.loadSelectionItems = function (parent, index, typeOfItems) {
        itemSlotIndex = index; //index para saber cual cajita abrió el dropdown
        var indexToInsert = -1;
        clearDropdownForItems(parent, typeOfItems);
        (typeOfItems === "starting") ? indexToInsert = 3 : indexToInsert = 7; //index de children en el que se encuentra el dropdown menu
        var imagesLength = imagesID.length;                                 //si son starting items, el dd menu está en el index 3.
        for (var i = 0; i < imagesLength; i++) {
            var id = imagesID[i];
            var datas = itemsObj.data[id];
            var totalGoldValue = datas.gold.total;
            var group = datas.group;
            if (typeOfItems === "starting") {
                if (totalGoldValue > 500 || totalGoldValue === 0)
                    continue;
            } else {
                if (totalGoldValue < 1700 && group !== "BootsUpgrades")
                    continue;
            }
            var itemIcon = loadImgIcon(id, "itemIcon itemSelective", "items");
            document.getElementById(parent).children[indexToInsert].children[0].appendChild(itemIcon); //el index se utiliza para insertar los items
        }
    };

    window.loadSelectionSpells = function (parent, index) {
        itemSlotIndex = index;
        var dropdownBody = document.getElementById(parent).children[2].children[0];
        dropdownBody.innerHTML = '';
        for (var i = 0; i < summonersID.length; i++) {
            var summonerIcon = loadImgIcon(summonersID[i], "summIcon itemSelective", "summoners");
            document.getElementById(parent).children[2].children[0].appendChild(summonerIcon);
        }

    };


    function loadImgIcon(id, classes, type) {
        console.log("me llega id" + id);
        var typeObj = getTypeObj(type);
        var datas = typeObj.data[id];
        var name = datas.name;
        var posX = datas.image.x;
        var posY = datas.image.y;
        var sprite = datas.image.sprite;
        var imgSrc = "//ddragon.leagueoflegends.com/cdn/" + version + "/img/sprite/" + sprite;
        var itemIcon = document.createElement("div");
        itemIcon.setAttribute("style", " float:left; width:48px; height:48px; background: url('" + imgSrc + "') -" + posX + "px -" + posY + "px; ");
        itemIcon.setAttribute("data-id", id);
        itemIcon.setAttribute("class", classes);
        itemIcon.setAttribute("data-name", name);
        return itemIcon;
    }

    window.loadChampsImages = function () {
        clearModalBody();
        var datas = champsObj.data;
        for (var i in datas) {
            var champIcon = loadImgIcon(i, "champIcon", "champions");
            document.getElementsByClassName("modal-body")[0].children[0].appendChild(champIcon);
        }
    };

    window.loadSummImages = function () {
        clearModalBody();
        for (var i = 0; i < summonersID.length; i++) {
            var summonerIcon = loadImgIcon(summonersID[i], "summIcon", "summoners");
            document.getElementsByClassName("modal-body")[0].children[0].appendChild(summonerIcon);
        }
    };

    window.loadItemsImages = function () {
        clearModalBody();
        var imagesLength = imagesID.length;
        for (var i = 0; i < imagesLength; i++) {
            var itemIcon = loadImgIcon(imagesID[i], "itemIcon imgIcon", "items");
            document.getElementsByClassName("modal-body")[0].children[0].appendChild(itemIcon);
        }
    };

    function checkSameLvlSkill(tableRow, number) {
        $(tableRow).siblings().each(function () {
            $(this).children().each(function () {
                var currNumber = $(this).text();
                if (currNumber === number && $(this).hasClass("skillActive")) {
                    $(this).addClass("skillInactive");
                    $(this).removeClass("skillActive");
                }
            });
        });
    }

    $(".skillsContainer").on("click", ".skillInactive", function () {
        checkSameLvlSkill($(this).parent(), $(this).text());
        var skillsContainer = $(this).parents(".skillsContainer");
        var fieldSkillsContainer = skillsContainer.next();
        var id = $(this).data("id").toString();
        var idValue = $(this).data("value").toString();
        updateGuideField(fieldSkillsContainer, id, idValue, "skill", "");
        $(this).removeClass("skillInactive");
        $(this).addClass("skillActive");
    });

    window.createSkills = function (containerID) {
        var table = document.createElement("table");
        var tableRow, tableData, tableDataText, tdLetter, tdIcon, tdText;
        var rows = ["Q", "W", "E", "R"];
        var nums = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18"];
        for (var i = 0; i < 4; i++) { //ciclo que crea las 4 rows
            tableRow = document.createElement("tr");
            tdLetter = document.createElement("td");
            tdIcon = document.createElement("td");
            tdText = document.createElement("td");
            tdLetter.setAttribute("class", "letter");
            tdIcon.setAttribute("class", "skillIcon");
            tdText.setAttribute("class", "skillText");
            tdLetter.innerHTML = rows[i];
            tableRow.appendChild(tdLetter);
            tableRow.appendChild(tdIcon);
            tableRow.appendChild(tdText);
            for (var x = 1; x < 19; x++) { //ciclo que crea los 18 td's
                tableData = document.createElement("td");
                tableData.setAttribute("class", "skillInactive");
                tableData.setAttribute("data-id", nums[x - 1]);
                tableData.setAttribute("data-value", rows[i]);
                tableDataText = document.createTextNode(x.toString());
                tableData.appendChild(tableDataText);
                tableRow.appendChild(tableData);
            }
            table.appendChild(tableRow);
        }
        document.getElementById(containerID).appendChild(table);
        loadChampSkills(containerID);
    };


    function loadChampSkills(containerID) {
        var i = 0;
        while (i < 4) {
            loadSkill(i, containerID);
            i++;
        }
    }

    function loadSkill(index, containerID) {
        var name = champObj.data[champSelected].spells[index].name;
        var description = champObj.data[champSelected].spells[index].description;
        var img = champObj.data[champSelected].spells[index].image.full;
        var imgSrc = "//ddragon.leagueoflegends.com/cdn/" + version + "/img/spell/" + img;
        var skillIcon = document.createElement("div");
        skillIcon.setAttribute("data-description", description);
        skillIcon.setAttribute("style", " width:35px; height:35px; background: url('" + imgSrc + "') no-repeat; background-size: contain; ");
        skillIcon.innerHTML = "&nbsp;";
        var container = document.getElementById(containerID);
        container.getElementsByClassName("skillIcon")[index].appendChild(skillIcon);
        container.getElementsByClassName("skillText")[index].innerHTML = name;
    }


    function runeDivCreatorAuto(idParent, runesPrinc, runesSecund) {
        runeDivRemover(idParent);
        for (var i = 0; i < runesPrinc.length; i++) {
            runeDivCreator(idParent, runesPrinc[i]);
        }
        for (var j = 0; j < runesSecund.length; j++) {
            runeDivCreator(idParent, runesSecund[j]);
        }
    }

    function runeDivCreator(idParent, id) {
        var runeName = myRunesObj.data[id].name;
        var runeDescription = myRunesObj.data[id].description;
        var xPos = (myRunesObj.data[id].image.x) / 48;
        var yPos = yPosConverter(myRunesObj.data[id].image.y);
        var type = myRunesObj.data[id].rune.type;
        var newX = (100 / 9) * xPos;
        var newY = 100 * yPos;
        var stringX = newX + "%";
        var stringY = newY + "%";
        var runeTypeInfo = document.createElement("div");
        var runeTypeIcon = document.createElement("div");
        var runeTypeImg = document.createElement("div");
        var runeTypeText = document.createElement("div");
        var runeTypeTextName = document.createElement("p");
        var runeTypeTextNameNode = document.createTextNode(runeName);
        var runeTypeTextDescript = document.createElement("span");
        var runeTypeTextDescriptNode = document.createTextNode(runeDescription);
        runeTypeInfo.setAttribute("class", "runeTypeInfo");
        runeTypeInfo.setAttribute("data-id", id);
        runeTypeInfo.setAttribute("data-type", type);
        runeTypeIcon.setAttribute("class", "runeTypeIcon");
        runeTypeImg.setAttribute("class", "runeTypeImg");
        runeTypeImg.setAttribute("style", "background: url('/assets/Images/runes.png') " + stringX + " " + stringY + " no-repeat;");
        runeTypeText.setAttribute("class", "runeTypeText");
        runeTypeTextName.appendChild(runeTypeTextNameNode);
        runeTypeTextDescript.appendChild(runeTypeTextDescriptNode);
        runeTypeText.appendChild(runeTypeTextName);
        runeTypeText.appendChild(runeTypeTextDescript);
        runeTypeIcon.appendChild(runeTypeImg);
        runeTypeInfo.appendChild(runeTypeIcon);
        runeTypeInfo.appendChild(runeTypeText);
        document.getElementById(idParent).children[1].appendChild(runeTypeInfo);
    }


    function runeShortType(type) {
        if (type === "black")
            return "n";
        else if (type === "blue")
            return "b";
        else if (type === "yellow")
            return "y";
        else
            return "r";
    }

    $('.runeTypeContainer').on('click', '.runeTypeInfo', function () { //funcion para agregar runas a lista de elegidas
        var currentRuneID = $(this).data("id").toString();
        var currentRuneType = $(this).data("type");
        var maxRunes = getMaxQtyRuneType(currentRuneType);
        var runesChosen = $(this).parent().next();
        var runesContainer = $(this).parents(".seccionRunas");
        var currentTypeQty = calcRuneTypeQty(runesChosen, currentRuneType);
        var canAdd = true;
        runesChosen.children().each(function () { //recorre lista de runas en seccion de elegidas
            var chosenRunesID = $(this).data("id").toString();
            if (currentRuneID === chosenRunesID) { //verifica si ya existe runa con mismo id
                canAdd = false;
                var runeQty = $(this).data("qty");
                if (currentTypeQty < maxRunes) {
                    runeQty += 1;
                    $(this).data("qty", runeQty);
                    $(this).children().first().children().first().text(runeQty);
                    var color = runeShortType(currentRuneType);
                    var runesField = runesContainer.next();
                    updateGuideField(runesField, currentRuneID, runeQty, "rune", color);
                } else {
                    return;
                }
            }
        });
        if (!canAdd) {
            return;
        } else {
            if (currentTypeQty < maxRunes) {
                var color = runeShortType(currentRuneType);
                var runesField = runesContainer.next();
                updateGuideField(runesField, currentRuneID, 1, "rune", color);
                $(this).clone().addClass("locked-rune").attr("data-qty", "1").appendTo(runesChosen);
                runesChosen.children().last().children().first().prepend('<div class="runeTypeCounter">1</div'); //agrega "1" en runeInfo->runeIcon
                //clona y mueve runa a sección de elegidas por usuario 
            } else { //si se puede agregar pero se alcanzó cantidad máxima de runas por tipo
                return;
            }
        }
    });

    $(".runesChosen").on('contextmenu', '.locked-rune', function () {
        var currentQty = $(this).data("qty");
        var id = $(this).data("id").toString();
        var fieldContainer = $(this).parents(".seccionRunas").next();
        var value = currentQty - 1;
        var currentRuneType = $(this).data("type");
        var color = runeShortType(currentRuneType);
        if (currentQty > 1) {
            currentQty -= 1;
            $(this).data("qty", currentQty);
            $(this).children().first().children().first().text(currentQty);
        } else {
            $(this).remove();
        }
        updateGuideField(fieldContainer, id, value, "rune", color);

    });


    $(".runesChosen").contextmenu(function () {
        return false;
    });

    function yPosConverter(y) {
        if (y === 192) {
            return 1;
        } else {
            return 0;
        }
    }

    function calcRuneTypeQty($elem, runeType) {
        var runeQty = 0;
        $elem.children().each(function () {
            var type = $(this).data("type");
            if (type === runeType) {
                runeQty += $(this).data("qty");
            }
        });
        return runeQty;
    }
    function getMaxQtyRuneType(runeType) {
        if (runeType === "black") {
            return 3;
        } else {
            return 9;
        }
    }

    function runeDivRemover(idParent) {
        var myNode = document.getElementById(idParent).children[1];
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
    }

    function shadowAnimation(elem) {
        if (!$(elem).hasClass("sombra")) {
            $(elem).addClass("sombra");
            removeSiblingsRunesShadow(elem);
        } else {
            runeDivRemover();
            $(elem).removeClass("sombra");
        }
    }

    function removeSiblingsRunesShadow(elem) {
        $(elem).siblings().each(function () {
            if ($(this).hasClass("sombra")) {
                $(this).removeClass("sombra");
            }
        });
    }
});






