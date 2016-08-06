/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var masteryPoints = 90;


jQuery(document).ready(function ($) {

    function changeBorder(elem, color) {
        $(elem).children(".masteryImg").css("border-color", color);
    }

    function disableSiblings(elem) {
        $(elem).siblings().each(function () {
            $(this).children(".masteryImg").hide();
            $(this).children(".masteryImgGray").show();
        });
    }

    function enableSiblings(elem) {
        $(elem).siblings().each(function () {
            $(this).children(".masteryImg").show();
            $(this).children(".masteryImgGray").hide();
        });
    }

    function showNextlvl(elem) {
        var hasNext = $(elem).parent().next();
        if (hasNext.length > 0) {
            hasNext.children().each(function () {
                $(this).children(".masteryImg").show();
                $(this).children(".masteryImgGray").hide();
            });
        } else {
            return;
        }
    }

    function hideNextlvl(elem) {
        var hasNext = $(elem).parent().next();
        if (hasNext.length > 0) {
            hasNext.children().each(function () {
                $(this).children(".masteryImg").hide();
                $(this).children(".masteryImgGray").show();
            });
        } else {
            return;
        }
    }

    function lvlHasMaxPoints(elem, actualPoints) { //se "balancean" puntos para que haya un maximo de 1 o 5 puntos por nivel
        var maxPointslvl = 0;
        var points = actualPoints;
        $(elem).siblings().each(function () {
            var strCounter = $(this).children(".counter").html();
            var numLeft = parseInt(strCounter);
            var numRight = parseInt(strCounter.charAt(2));
            maxPointslvl = numRight;
            points = points + numLeft;
        });
        if (points === maxPointslvl) {
            return true;
        } else if (points < maxPointslvl) {
            return false;
        }
    }


    function canRemovePoint(elem) {
        var hasNext = $(elem).parent().next();
        if (hasNext.length > 0) {
            var points = 0;
            hasNext.children().each(function () {
                var strCounter = $(this).children(".counter").html();
                var numLeft = parseInt(strCounter);
                points = points + numLeft;
            });
            if (points > 0) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }

    function canAddPoint(elem) {
        var hasPrev = $(elem).parent().prev();
        if (hasPrev.length > 0) {
            var maxPointslvl = 0;
            var points = 0;
            hasPrev.children().each(function () {
                var strCounter = $(this).children(".counter").html();
                var numLeft = parseInt(strCounter);
                var numRight = parseInt(strCounter.charAt(2));
                maxPointslvl = numRight;
                points = points + numLeft;
            });
            if (maxPointslvl === points) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }

    $(".masteryIconContainer").mousedown(function (e) {
        var strNum = $(this).children(".counter").html();
        var numLeft = parseInt(strNum);
        var numRight = parseInt(strNum.charAt(2));
        var masteriesContainer = $(this).parents(".masteriesContainer");
        var totalPoints = masteryPointsCounter(masteriesContainer);
        if (e.which === 3 && numLeft > 0) { //condicion left click
            if (canRemovePoint(this) === true) {
                numLeft--;
                enableFirstLevels(masteriesContainer);
                //masteryPoints++;
            } else {
                return;
            }
        } else if (e.which === 1 && numLeft < numRight && totalPoints < 30) {
            if (canAddPoint(this) === true && lvlHasMaxPoints(this, numLeft) === false) {
                numLeft++;
                $(this).children(".masteryImg").show();
                $(this).children(".masteryImgGray").hide();
                // masteryPoints--;
            } else {
                return;
            }
        } else { //si maestria tiene 0 puntos o esta maxeada, no se hace nada
            return;
        }
        var newNum = String(numLeft);
        if (lvlHasMaxPoints(this, numLeft) === true && totalPoints <= 29) { //verificaciones de nivel, para habilitar o deshabilitar otras maestrias
            if (totalPoints < 29) {
                showNextlvl(this);
            }
            if (numLeft === numRight) {
                changeBorder(this, "yellow");
                disableSiblings(this);
            }
        } else {
            changeBorder(this, "green");
            enableSiblings(this);
            hideNextlvl(this);
        }
        $(this).children(".counter").text(newNum + "/" + numRight);
        $(this).data("counter", newNum);
        var masteriesField = masteriesContainer.next(); // var que contiene el hidden field
        var masteryID = $(this).data("id").toString(); // se obtiene el id de la maestria que se está agregando
        updateGuideField(masteriesField, masteryID, newNum, "mastery"); //se actualiza el hidden field respectivo
        totalPoints = masteryPointsCounter(masteriesContainer);
        if (totalPoints === 30){
            cleanWholeTree(masteriesContainer);
        }

    });

    $('.masteriesContainer').bind('contextmenu', function (e) {
        return false;
    });

    
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
    
    
    function cleanWholeTree($masteriesContainer){
        $($masteriesContainer).children().each(function () { //obtener el container mediante el ID del field, se recorren sus 3 contenedores
            $(this).find(".masteriesLevelContainer").children().each(function (){ //se recorren los masteries level de los contenedores principales
                $(this).children().each(function(){ //se recorren los íconos que están dentro de los niveles
                    var masteryCounter =  parseInt($(this).data("counter"));
                    console.log("mastery counters:" + masteryCounter);
                    if (masteryCounter === 0){
                        $(this).children(".masteryImg").hide();
                        $(this).children(".masteryImgGray").show();
                    }
                });
            });
        });
    }
    
    function enableFirstLevels($masteriesContainer){
        $($masteriesContainer).children().each(function () { //obtener el container mediante el ID del field, se recorren sus 3 contenedores
            $(this).find(".masteriesLevelContainer").children().first().each(function (){ //se recorren los masteries level de los contenedores principales
                $(this).children().each(function(){ //se recorren los íconos que están dentro de los niveles
                    var masteryCounter =  parseInt($(this).data("counter"));
                    if (lvlHasMaxPoints(this,masteryCounter)){
                        return false;
                    }
                    else{
                        $(this).children(".masteryImg").show();
                        $(this).children(".masteryImgGray").hide();
                        changeBorder(this, "green");
                    }
                });
            });
        });
    }       


});
