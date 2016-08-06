/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

jQuery(document).ready(function ($) {



//------------------------------------------------------------MASTERIES---------------------------------------------------------
    function changeBorder(elem, color) {
        $(elem).children(".masteryImg").css("border-color", color);
    }

    function masteryPointsCounter(masteriesContainer) { //recibe el parent superior, para contar todo el arbol
        var counterFerocity = getPointsOfTree(masteriesContainer, ".ferocity", "Ferocidad: ");
        var counterCunning = getPointsOfTree(masteriesContainer, ".cunning", "Astucia: ");
        var counterResolve = getPointsOfTree(masteriesContainer, ".resolve", "Valor: ");
        var totalTreePoints = counterCunning + counterFerocity + counterResolve;
        return totalTreePoints;
    }

    function getPointsOfTree($masteriesContainer, tree, treeName) { //cuenta los mastery tree de forma individual
        var totalPoints = 0;
        $($masteriesContainer).children(tree).children(".masteriesLevelContainer").children().each(function () {
            $(this).children().each(function () {
                var counter = $(this).find(".counter").html();
                var actualValue = parseInt(counter.split("/")[0]);
                totalPoints += actualValue;
            });
        });
        var treeTitle = treeName + totalPoints;
        $($masteriesContainer).children(tree).children(".masteriesTypeTitle").text(treeTitle);
        return totalPoints;
    }

    function cleanWholeTree($masteriesContainer) {
        $($masteriesContainer).children().each(function () { //obtener el container mediante el ID del field, se recorren sus 3 contenedores
            $(this).find(".masteriesLevelContainer").children().each(function () { //se recorren los masteries level de los contenedores principales
                $(this).children().each(function () { //se recorren los íconos que están dentro de los niveles
                    var masteryCounter = parseInt($(this).data("counter"));
                    if (masteryCounter === 0) {
                        $(this).children(".masteryImg").hide();
                        $(this).children(".masteryImgGray").show();
                    }
                });
            });
        });
    }

    window.loadSelectedMasteryTree = function (parentID, values) {
        //var masteryTreeValues = document.getElementById("field_maestrias1").value;
        var valuesArray = values.split(",");
        var arrayLength = valuesArray.length;
        var elemID = "#" + parentID;
        $(elemID).children().each(function () { //obtener el container mediante el ID del field, se recorren sus 3 contenedores
            $(this).find(".masteriesLevelContainer").children().each(function () { //se recorren los masteries level de los contenedores principales
                $(this).children().each(function () { //se recorren los íconos que están dentro de los niveles
                    var masteryID = $(this).data("id").toString();  //obtener id              
                    for (i = 0; i < arrayLength; i++) {
                        var arrayID = valuesArray[i].toString();
                        var arrayIDStr = arrayID.substring(0, 4);
                        if (arrayIDStr === masteryID) { //comparar con masteryID
                            var arrayValue = arrayID.charAt(5);
                            var rightNum = $(this).find(".counter").html().charAt(2);
                            $(this).data("counter", arrayValue);
                            $(this).find(".counter").text(arrayValue + "/" + rightNum);
                            $(this).children(".masteryImg").show();
                            $(this).children(".masteryImgGray").hide();
                            changeBorder(this, "yellow");
                        }
                    }
                });

            });
        });
        masteryPointsCounter($(elemID));
        cleanWholeTree($(elemID));
    };


//------------------------------------------------------------ITEMS/SPELLS---------------------------------------------------------

    window.loadSelectedItems = function (parentID, typeOfItems, itemsValues) {
        //var itemsValues = document.getElementById("startItemsInput").value.toString();
        var valuesArray = itemsValues.split(",");
        var fullItemsContainer = document.getElementById(parentID);
        var valuesArraySize = valuesArray.length;
        var trinketID;
        for (var i = 0; i < valuesArraySize - 1; i++) {
            var id = valuesArray[i];
            if (typeOfItems === "starting") { //condiciones para 
                if (id === "3340" || id === "3341") {
                    trinketID = id;
                    continue;
                }
            } else {
                if (id === "3340" || id === "3363" || id === "3364") {
                    trinketID = id;
                    continue;
                }
            }
            insertToBoxContainer(fullItemsContainer, id, i.toString());
        }
        insertToBoxContainer(fullItemsContainer, trinketID, i.toString());
    };

//    window.myDelayMethod = function (funcName, parentID, typeOfItems, itemsValues){
//        var timeout = window.setTimeout(funcName, 500, parentID, typeOfItems, itemsValues);
//    };

    window.loadSelectedSpells = function (parentID, spellsValues) {
        //var itemsValues = document.getElementById("spellsInput").value.toString();
        var valuesArray = spellsValues.split(",");
        var fullSpellsContainer = document.getElementById(parentID);
        for (var i = 0; i < 2; i++) {
            var id = valuesArray[i];
            insertToBoxContainer(fullSpellsContainer, id, i.toString(), true);
        }
    };

    function insertToBoxContainer(parent, id, index, isSpell) {
        var itemBoxContainer = document.createElement("div");
        var itemIcon;
        (isSpell) ? itemIcon = loadImgIcon(id, "summIcon", "summoners") : itemIcon = loadImgIcon(id, "itemIcon itemSelective", "items");
        itemBoxContainer.setAttribute("class", "selectorContainer");
        itemBoxContainer.setAttribute("data-index", index);
        itemBoxContainer.appendChild(itemIcon);
        parent.appendChild(itemBoxContainer);
    }

    function loadImgIcon(id, classes, type) {
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



//------------------------------------------------------------RUNES------------------------------------------------------------------

    window.loadSelectedRunes = function (parentID, runesValues) {
        //var runesValues = document.getElementById("runeFieldInput").value;
        var valuesArray = runesValues.split(",");
        var runes = ["n", "r", "y", "b"];
        for (var i = 0; i < runes.length; i++) {
            for (var j = 0; j < valuesArray.length; j++) {
                var currentStr = valuesArray[j].toString();
                var color = currentStr.charAt(7);
                if (color === runes[i]) {
                    var runeID = currentStr.substring(0, 4);
                    var qty = currentStr.charAt(5);
                    runeViewDivCreator(parentID, runeID, qty);
                }

            }
        }

    };
    function runeViewDivCreator(parentID, id, qty) {
        var runeName = myRunesObj.data[id].name;
        var runeDescription = myRunesObj.data[id].description;
        var xPos = (myRunesObj.data[id].image.x) / 48;
        var yPos = yPosConverter(myRunesObj.data[id].image.y);
        var type = myRunesObj.data[id].rune.type.toString();
        var newX = (100 / 9) * xPos;
        var newY = 100 * yPos;
        var stringX = newX + "%";
        var stringY = newY + "%";
        var rvContainer = document.createElement("div");
        var rvLeft = document.createElement("div");
        var rvNum = document.createElement("div");
        var rvNumNode = document.createTextNode(qty);
        var rvImg = document.createElement("div");
        var rvRight = document.createElement("div");
        var rvName = document.createElement("p");
        var rvNameNode = document.createTextNode(runeName);
        var rvDescription = document.createElement("small");
        var rvDescriptionNode = document.createTextNode(runeDescription);
        rvContainer.setAttribute("class", "runeViewContainer");
        rvLeft.setAttribute("class", "runeViewLeft");
        rvRight.setAttribute("class", "runeViewRight");
        rvImg.setAttribute("style", "background: url('/assets/Images/runes.png') " + stringX + " " + stringY + " no-repeat;");
        rvDescription.setAttribute("class", "text-muted");
        rvNum.setAttribute("class", "runeViewNum");
        if (type === "black") {
            rvImg.setAttribute("class", "bigIcon runeTypeImg");
        } else {
            rvImg.setAttribute("class", "smallIcon runeTypeImg");
        }
        rvDescription.appendChild(rvDescriptionNode);
        rvName.appendChild(rvNameNode);
        rvNum.appendChild(rvNumNode);
        rvRight.appendChild(rvName);
        rvRight.appendChild(rvDescription);
        rvLeft.appendChild(rvNum);
        rvLeft.appendChild(rvImg);
        rvContainer.appendChild(rvLeft);
        rvContainer.appendChild(rvRight);
        document.getElementById(parentID).appendChild(rvContainer);
    }

    function yPosConverter(y) {
        if (y === 192) {
            return 1;
        } else {
            return 0;
        }
    }

//--------------------------------------------------------------SKILLS--------------------------------------------------------------

    window.loadSelectedSkills = function (parentID, fieldInfo) { //containerID se refiere al contenedor donde se cargarán los selected skills
        var table = document.createElement("table");
        var tableRow, tableData, tableDataText, tdLetter, tdIcon, tdText;
        //var fieldInfo = document.getElementById(fieldID).value;
        var fieldInfoArray, skillID, skillValue, currentStr;
        fieldInfoArray = fieldInfo.split(",");
        var rowsSkills = [];
        var rows = ["Q", "W", "E", "R"];
        var rowVal;
        for (var i = 0; i < 4; i++) {
            rowVal = rows[i];
            for (var x = 0; x < 18; x++) { //ciclo que recorre el field de los skills
                currentStr = fieldInfoArray[x].toString();
                skillValue = currentStr.charAt(3);
                if (skillValue === rowVal) { //se obtienen los id que tienen un valor igual a este row
                    skillID = fieldInfoArray[x].toString();
                    rowsSkills.push(skillID); // se pushean los id de los niveles en que se sube esta skill i.e. "E" => [1,4,5]
                    console.log("me pushearon");
                }
            }
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
            for (var z = 1; z < 19; z++) { //ciclo que crea los 18 div's para los niveles
                tableData = document.createElement("td");
                for (var k = 0; k < rowsSkills.length; k++) {
                    if (parseInt(rowsSkills[k], 10) === z) {
                        tableData.setAttribute("class", "skillActive");
                    }
                }
                tableDataText = document.createTextNode(z.toString());
                tableData.appendChild(tableDataText);
                tableRow.appendChild(tableData);
            }
            rowsSkills = [];
            table.appendChild(tableRow);
        }
        document.getElementById(parentID).appendChild(table);
        loadChampSkills(parentID);
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

});