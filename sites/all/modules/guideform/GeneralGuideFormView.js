/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


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


jQuery(document).ready(function ($) {

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

    httpRequestRunes.open("GET", urlRunes, false);
    httpRequestChamps.open("GET", urlChamps, true);
    httpRequestChamp.open("GET", urlChamp, true);
    httpRequestItems.open("GET", urlItems, true);
    httpRequestSummoners.open("GET", urlSummoners, true);
    httpRequestChamps.send();
    httpRequestChamp.send();
    httpRequestRunes.send();
    httpRequestItems.send();
    httpRequestSummoners.send();

    window.getTypeObj = function(type) {
        if (type === "items")
            return itemsObj;
        else if (type === "champions")
            return champsObj;
        else if (type === "summoners")
            return summObj;
    };



});