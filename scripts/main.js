/*jshint esversion: 6 */
var defaultRemains = {
    OdolwaRemains: 0,
    GohtRemains: 0,
    GyorgRemains: 0,
    TwinmoldRemains: 0
};
var Remains = defaultRemains;
//logic vars
var ocarinalogic;
var transformmasklogic;
var maskslogic;
var piecelogic;
var skullslogic;
var scrubtradelogic;
var anjulogic;
var greatfairylogic;
var tinglelogic;
var notebooklogic;
var moonitemlogic;
var deitylogic;
var mapslogic;
var smallkeylogic;
var bigkeylogic;
var remainslogic;
var containerlogic;
//trick vars
var skipbombers;

var mouseOverItem = false;
var mouseOverMask = false;
var mouseOverDungeon = false;
var mouseOverQuest = false;
var mouseLastOverR;
var mouseLastOverC;
var mouseLastOverCor;

var itemGrid = [];
var maskGrid = [];
var dungeonGrid = [];
var questGrid = [];
var itemLayout = [];
var maskLayout = [];
var dungeonLayout = [];
var questLayout = [];

var editmode = false;
var selected = {};

var areaSelect = 0;

function setCookie(obj, name) {
    var d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    var val = JSON.stringify(obj);
    document.cookie = name + "=" +  val + ";" + "SameSite=None;" + "Secure;" + expires + ";path=/";
}

function getCookie(name) {
    var cname = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(cname) == 0) {
            return JSON.parse(c.substring(cname.length, c.length));
        }
    }
    return {};
}

var settingsCookieDefault = {
    map: 1,
    iZoom: 100,
    mZoom: 100,
    mPos: 0,
};

var itemsCookieDefault = {
    remains: defaultRemains,
    items: defaultItemGrid,
    masks: defaultMaskGrid,
    dungeons: defaultDungeonGrid,
    quests: defaultQuestGrid,
    obtainedItems: items,
    obtainedMasks: masks,
    obtainedDungeons: dungeons,
    obtainedQuests: quests,
};

var checksCookieDefault = {
    checks: serializeChecks(),
    areaChecks: serializeAreaChecks(),
};

var logicCookieDefault = {
    ocashuffle: false,
    tmask: false,
    mask: false,
    piece: false,
    skulls: false,
    scrubtrade: false,
    anju: false,
    gfairy: false,
    tingle: false,
    notebook: false,
    moonitem: false,
    deity: false,
    mapscompass: false,
    skey: false,
    bkey: false,
    bosses: false,
    containers: false,
    skipnotebook: false,
};

var cookielock = false;
function loadCookie(name) {
    if(cookielock) {
        return;
    }
    cookielock = true;

    cookieobj = getCookie(name);

    if (name == "settings") {
        Object.keys(settingsCookieDefault).forEach(function(key) {
            if (cookieobj[key] === undefined) {
                cookieobj[key] = settingsCookieDefault[key];
            }
        });

        document.getElementsByName("showmap")[0].checked = !!cookieobj.map;
        document.getElementsByName("showmap")[0].onchange();
        document.getElementsByName("itemtablesize")[0].value = cookieobj.iZoom;
        document.getElementsByName("itemtablesize")[0].onchange();
        document.getElementsByName("mapdivsize")[0].value = cookieobj.mZoom;
        document.getElementsByName("mapdivsize")[0].onchange();

        document.getElementsByName("mapposition")[cookieobj.mPos].click();
    }
    else if (name == "items") {
        Object.keys(itemsCookieDefault).forEach(function(key) {
            if (cookieobj[key] === undefined) {
                cookieobj[key] = itemsCookieDefault[key];
            }
        });

        remains = JSON.parse(JSON.stringify(cookieobj.remains));
        initGridRowItem(JSON.parse(JSON.stringify(cookieobj.items)));
        initGridRowMask(JSON.parse(JSON.stringify(cookieobj.masks)));
        initGridRowDungeon(JSON.parse(JSON.stringify(cookieobj.dungeons)));
        initGridRowQuest(JSON.parse(JSON.stringify(cookieobj.quests)));
        items = JSON.parse(JSON.stringify(cookieobj.obtainedItems));
        masks = JSON.parse(JSON.stringify(cookieobj.obtainedMasks));
        dungeons = JSON.parse(JSON.stringify(cookieobj.obtainedDungeons));
        quests = JSON.parse(JSON.stringify(cookieobj.obtainedQuests));
        updateGridItemAll();
        updateGridMaskAll();
        updateGridDungeonAll();
        updateGridQuestAll();

    }
    else if (name == "checks") {
        Object.keys(checksCookieDefault).forEach(function(key) {
            if (cookieobj[key] === undefined) {
                cookieobj[key] = checksCookieDefault[key];
            }
        });

        deserializeChecks(JSON.parse(JSON.stringify(cookieobj.checks)));
        deserializeAreaChecks(JSON.parse(JSON.stringify(cookieobj.areaChecks)));
        updateMap();
    }
    else if (name == "logic") {
        Object.keys(logicCookieDefault).forEach(function(key) {
            if (cookieobj[key] === undefined) {
                cookieobj[key] = logicCookieDefault[key];
            }
        });

        //Item Settings
        document.getElementById("ocarinalogictoggle").checked = cookieobj.ocashuffle ? 1 : 0;
        document.getElementById("transformmasklogictoggle").checked = cookieobj.tmask ? 1 : 0;
        document.getElementById("maskslogictoggle").checked = cookieobj.mask ? 1 : 0;
        document.getElementById("piecelogictoggle").checked = cookieobj.piece ? 1 : 0;
        document.getElementById("skullslogictoggle").checked = cookieobj.skulls ? 1 : 0;
        document.getElementById("scrubtradelogictoggle").checked = cookieobj.scrubtrade ? 1 : 0;
        document.getElementById("anjulogictoggle").checked = cookieobj.anju ? 1 : 0;
        document.getElementById("greatfairylogictoggle").checked = cookieobj.gfairy ? 1 : 0;
        document.getElementById("tinglelogictoggle").checked = cookieobj.tingle ? 1 : 0;
        document.getElementById("notebooklogictoggle").checked = cookieobj.notebook ? 1 : 0;
        document.getElementById("moonitemlogictoggle").checked = cookieobj.moonitem ? 1 : 0;
        document.getElementById("deitylogictoggle").checked = cookieobj.deity ? 1 : 0;
        
        //Area Settings
        document.getElementById("mapslogictoggle").checked = cookieobj.mapscompass ? 1 : 0;
        document.getElementById("smallkeylogictoggle").checked = cookieobj.skey ? 1 : 0;
        document.getElementById("bigkeylogictoggle").checked = cookieobj.bkey ? 1 : 0;
        document.getElementById("remainslogictoggle").checked = cookieobj.bosses ? 1 : 0;
        document.getElementById("containerlogictoggle").checked = cookieobj.containers ? 1 : 0;
        
        //Tricks and Logic Settings
        document.getElementById("skipbomberstoggle").checked = cookieobj.skipnotebook ? 1 : 0;
        updateMap();
    }  

    cookielock = false;
}

function saveCookie(name) {
    if (cookielock) {
        return;
    }

    cookielock = true;

    cookieobj = {};

    if(name == "settings") {
        cookieobj.map = document.getElementsByName("showmap")[0].checked ? 1 : 0;
        cookieobj.iZoom = document.getElementsByName("itemtablesize")[0].value;
        cookieobj.mZoom = document.getElementsByName("mapdivsize")[0].value;

        cookieobj.mPos = document.getElementsByName("mapposition")[1].checked ? 1 : 0;
    }
    else if (name == "items") {
        cookieobj.remains = JSON.parse(JSON.stringify(remains));
        cookieobj.items = JSON.parse(JSON.stringify(itemLayout));
        cookieobj.masks = JSON.parse(JSON.stringify(maskLayout));
        cookieobj.dungeons = JSON.parse(JSON.stringify(dungeonLayout));
        cookieobj.quests = JSON.parse(JSON.stringify(questLayout));
        cookieobj.obtainedItems = JSON.parse(JSON.stringify(items));
        cookieobj.obtainedMasks = JSON.parse(JSON.stringify(masks));
        cookieobj.obtainedDungeons = JSON.parse(JSON.stringify(dungeons));
        cookieobj.obtainedQuests = JSON.parse(JSON.stringify(quests));
    }
    else if (name == "checks") {
        cookieobj.checks = JSON.parse(JSON.stringify(serializeChecks()));
        cookieobj.areaChecks = JSON.parse(JSON.stringify(serializeAreaChecks()));
    }
    else if (name == "logic") {
        //Item Settings
        cookieobj.ocashuffle = document.getElementById("ocarinalogictoggle").checked;
        cookieobj.tmask = document.getElementById("transformmasklogictoggle").checked;
        cookieobj.mask = document.getElementById("maskslogictoggle").checked;
        cookieobj.piece = document.getElementById("piecelogictoggle").checked;
        cookieobj.skulls = document.getElementById("skullslogictoggle").checked
        cookieobj.scrubtrade = document.getElementById("scrubtradelogictoggle").checked;
        cookieobj.anju = document.getElementById("anjulogictoggle").checked;
        cookieobj.gfairy = document.getElementById("greatfairylogictoggle").checked;
        cookieobj.tingle = document.getElementById("tinglelogictoggle").checked;
        cookieobj.notebook = document.getElementById("notebooklogictoggle").checked;
        cookieobj.moonitem = document.getElementById("moonitemlogictoggle").checked;
        cookieobj.deity = document.getElementById("deitylogictoggle").checked;

        //Area Settings
        cookieobj.mapscompass = document.getElementById("mapslogictoggle").checked;
        cookieobj.skey = document.getElementById("smallkeylogictoggle").checked;
        cookieobj.bkey = document.getElementById("bigkeylogictoggle").checked;
        cookieobj.bosses = document.getElementById("remainslogictoggle").checked;
        cookieobj.containers = document.getElementById("containerlogictoggle").checked;
        //Tricks and Logic Settings
        cookieobj.skipnotebook = document.getElementById("skipbomberstoggle").checked;

        //Set logic values according to cookie values (or not)
        if(cookieobj.ocashuffle) {setOcarinaLogic();}
        if(cookieobj.tmask) {setTransLogic();}
        if(cookieobj.mask)  {setMaskLogic();}
        if(cookieobj.piece) {setPieceLogic();}
        if(cookieobj.skulls) {setSkullsLogic();}
        if(cookieobj.scrubtrade) {setScrubTradeLogic();}
        if(cookieobj.anju) {setAnjuLogic();}
        if(cookieobj.gfairy) {setGFLogic();}
        if(cookieobj.tingle) {setTingleLogic();}
        if(cookieobj.notebook) {setNotebookLogic();}
        if(cookieobj.moonitem) {setMoonItemLogic();}
        if(cookieobj.deity) {setFDLogic();}

        if(cookieobj.mapscompass) {setMapsLogic();}
        if(cookieobj.skey) {setSmallKeyLogic();}
        if(cookieobj.bkey) {setBigKeyLogic();}
        if(cookieobj.bosses) {setRemainsLogic();}
        if(cookieobj.containers) {setContainerLogic();}

        if(cookieobj.skipnotebook) {setSkipBombers();}
    }   

    setCookie(cookieobj, name);
    cookielock = false;
}

function serializeChecks() {
    return checks.map(check => check.isOpened || false);
}

function serializeAreaChecks() {
    return areas.map(area => Object.values(area.checklist).map(check => check.isOpened || false));
}

function deserializeChecks(serializedChecks) {
    for (var i = 0; i < checks.length; i++) {
        checks[i].isOpened = serializedChecks[i];
        refreshCheck(i);
    }
}

function deserializeAreaChecks(serializedAreas) {
    for (var i = 0; i < areas.length; i++) {
        var area = areas[i];
        var serializedArea = serializedAreas[i];
        var checkNames = Object.keys(area.checklist);
        for (var j = 0; j < checkNames.length; j++) {
            area.checklist[checkNames[j]].isOpened = serializedArea[j];
        }
    }
}

//when clicking on a check
function toggleCheck(x) {
    checks[x].isOpened = !checks[x].isOpened;
    refreshCheck(x);
    saveCookie("checks");
}

function refreshCheck(x) {
    var stateClass = checks[x].isOpened ? "opened" : checks[x].isAvailable();
    document.getElementById(x).className = "mapspan check " + stateClass;
}

//highlights a check location
function highlight(x) {
    document.getElementById(x).style.backgroundImage = "url(images/highlighted.png)";
}

function unhighlight(x) {
    document.getElementById(x).style.backgroundImage = "url(images/poi.png)";
}

//highlights a area check location
function highlightArea(x) {
    document.getElementById("area" + x).style.backgroundImage = "url(images/highlighted.png)";
}

function unhighlightArea(x) {
    document.getElementById("area" + x).style.backgroundImage = 'url(images/poi.png)';
}

function clickArea(d) {
    document.getElementById("area" + areaSelect).style.backgroundImage = 'url(images/poi.png)';
    areaSelect = d;
    document.getElementById("area" + areaSelect).style.backgroundImage = 'url(images/highlighted.png)';

    document.getElementById("submaparea").innerHTML = areas[areaSelect].name;
    document.getElementById("submaparea").className = "DC" + areas[areaSelect].isBeatable();
    var DClist = document.getElementById("submaplist");
    DClist.innerHTML = "";

    for (var key in areas[areaSelect].checklist) {
        var s = document.createElement("li");
        s.innerHTML = key;

        if (areas[areaSelect].checklist[key].isOpened) {
            s.className = "DCopened";
        }
        else if (!areas[areaSelect].checklist[key].isLogic()) {
            s.className = "DChidden";
        }
        else if (areas[areaSelect].checklist[key].isAvailable()) {
            s.className = "DCavailable";
        }
        else {
            s.className = "DCunavailable";
        }

        s.onclick = new Function("toggleAreaCheck(this," + areaSelect + ',"' + key + '")');
        s.onmouseover = new Function("highlightAreaCheck(this)");
        s.onmouseout = new Function("unhighlightAreaCheck(this)");
        s.style.cursor = "pointer";

        DClist.appendChild(s);
    }
}

function toggleAreaCheck(sender, d, c) {
    areas[d].checklist[c].isOpened = !areas[d].checklist[c].isOpened;
    if (areas[d].checklist[c].isOpened) {
        sender.className = "DCopened";
    }
    else if (!areas[d].checklist[c].isLogic()) {
        sender.className = "DChidden";
    }
    else if (areas[d].checklist[c].isAvailable()) {
        sender.className = "DCavailable";
    }
    else {
        sender.className = "DCunavailable";
    }

    updateMap();
    saveCookie("checks");
}

function highlightAreaCheck(x) {
    x.style.backgroundColor = "#282828";
}

function unhighlightAreaCheck(x) {
    x.style.backgroundColor = "";
}

function setOrder(H) {
    if (H) {
        document.getElementById("layoutdiv").classList.remove("flexcontainer");
    }
    else {
        document.getElementById("layoutdiv").classList.add("flexcontainer");
    }
    saveCookie("settings");
}

function setOcarinaLogic() {
    if (document.getElementById("ocarinalogictoggle").checked) {
        ocarinalogic = true;
    }
    else { ocarinalogic = false;}
    updateMap();
    saveCookie("logic");
}

function setTransLogic() {
    //transformmasklogic = sender.value;
    if (document.getElementById("transformmasklogictoggle").checked) {
        transformmasklogic = true;
    }
    else { transformmasklogic = false;}
    updateMap();
    saveCookie("logic");
}

function setMaskLogic() {
    if (document.getElementById("maskslogictoggle").checked) {
        maskslogic = true;
    }
    else { maskslogic = false;}
    //maskslogic = sender.value;
    updateMap();
    saveCookie("logic");
}

function setPieceLogic() {
    if (document.getElementById("piecelogictoggle").checked) {
        piecelogic = true;
    }
    else { piecelogic = false;}
    //piecelogic = sender.value;
    updateMap();
    saveCookie("logic");
}

function setSkullsLogic() {
    if (document.getElementById("skullslogictoggle").checked) {
        skullslogic = true;
    }
    else { skullslogic = false;}
    //skullslogic = sender.value;
    updateMap();
    saveCookie("logic");
}

function setScrubTradeLogic() {
    if (document.getElementById("scrubtradelogictoggle").checked) {
        scrubtradelogic = true;
    }
    else { scrubtradelogic = false;}
    //scrubtradelogic = sender.value;
    updateMap();
    saveCookie("logic");
}

function setAnjuLogic() {
    if (document.getElementById("anjulogictoggle").checked) {
        anjulogic = true;
    }
    else { anjulogic = false;}
    //anjulogic = sender.value;
    updateMap();
    saveCookie("logic");
}

function setGFLogic() {
    if (document.getElementById("greatfairylogictoggle").checked) {
        greatfairylogic = true;
    }
    else { greatfairylogic = false;}
    ///greatfairylogic = sender.value;
    updateMap();
    saveCookie("logic");
}

function setTingleLogic() {
    if (document.getElementById("tinglelogictoggle").checked) {
        tinglelogic = true;
    }
    else { tinglelogic = false;}
    //tinglelogic = sender.value;
    updateMap();
    saveCookie("logic");
}

function setNotebookLogic() {
    if (document.getElementById("notebooklogictoggle").checked) {
        notebooklogic = true;
    }
    else { notebooklogic = false;}
    //notebooklogic = sender.value;
    updateMap();
    saveCookie("logic");
}

function setMoonItemLogic() {
    if (document.getElementById("moonitemlogictoggle").checked) {
        moonitemlogic = true;
    }
    else { moonitemlogic = false;}
    //moonitemlogic = sender.value;
    updateMap();
    saveCookie("logic");
}

function setFDLogic() {
    if (document.getElementById("deitylogictoggle").checked) {
        deitylogic = true;
    }
    else { deitylogic = false;}
    //deitylogic = sender.value;
    updateMap();
    saveCookie("logic");
}

function setMapsLogic() {
    if (document.getElementById("mapslogictoggle").checked) {
        mapslogic = true;
    }
    else { mapslogic = false;}
    //mapslogic = sender.value;
    updateMap();
    saveCookie("logic");
}

function setSmallKeyLogic() {
    if (document.getElementById("smallkeylogictoggle").checked) {
        smallkeylogic = true;
    }
    else { smallkeylogic = false;}
    //smallkeylogic = sender.value;
    updateMap();
    saveCookie("logic");
}

function setBigKeyLogic() {
    if (document.getElementById("bigkeylogictoggle").checked) {
        bigkeylogic = true;
    }
    else { bigkeylogic = false;}
    //bigkeylogic = sender.value;
    updateMap();
    saveCookie("logic");
}

function setRemainsLogic() {
    if (document.getElementById("remainslogictoggle").checked) {
        remainslogic = true;
    }
    else { remainslogic = false;}
    //remainslogic = sender.value;
    updateMap();
    saveCookie("logic");
}

function setContainerLogic() {
    if (document.getElementById("containerlogictoggle").checked) {
        containerlogic = true;
    }
    else { containerlogic = false;}
    //containerlogic = sender.value;
    updateMap();
    saveCookie("logic");
}

function setSkipBombers() {
    if (document.getElementById("skipbomberstoggle").checked) {
        skipbombers = true;
    }
    else { skipbombers = false;}
    
    updateGridItemAll();
    updateGridMaskAll();
    updateGridDungeonAll();
    updateGridQuestAll();
}

function setZoom(target, sender) {
    document.getElementById(target).style.zoom = sender.value / 100;
    document.getElementById(target).style.zoom = sender.value / 100;
    document.getElementById(target).style.MozTransform = "scale(" + (sender.value /100) + ")";
    document.getElementById(target).style.MozTransformOrigin = "0 0";
    document.getElementById(target + "size").innerHTML = (sender.value) + "%";
    saveCookie("settings");
}

function showSettings(sender) {
    if (editmode) {
        var r, c;
        var startdraw = false;
        editmode = false;
        updateGridItemAll();
        updateGridMaskAll();
        updateGridDungeonAll();
        updateGridQuestAll();
        showTracker("mapdiv", document.getElementsByName("showmap")[0]);
        document.getElementById("itemconfig").style.display = "none";
        document.getElementById("maskconfig").style.display = "none";
        document.getElementById("dungeonconfig").style.display = "none";
        document.getElementById("questconfig").style.display = "none";
        document.getElementById("rowButtons").style.display = "none";
        sender.innerHTML = "Options";
        saveCookie("settings");
    }
    else {
        var x = document.getElementById("settings");
        if (!x.style.display || x.style.display == "none") {
            x.style.display = "initial";
            sender.innerHTML = "CLOSE";
        }
        else {
            x.style.display = "none";
            sender.innerHTML = "Options";
        }
    }
}

function showTracker(target, sender) {
    if (sender.checked) {
        document.getElementById(target).style.display = "";
    }
    else {
        document.getElementById(target).style.display = "none";
    }
}

function EditMode() {
    var r, c;

    editmode = true;
    updateGridItemAll();
    updateGridMaskAll();
    updateGridDungeonAll();
    updateGridQuestAll();
    showTracker("mapdiv", {checked: false});
    document.getElementById("settings").style.display = "none";
    document.getElementById("itemconfig").style.display = "";
    document.getElementById("maskconfig").style.display = "";
    document.getElementById("dungeonconfig").style.display = "";
    document.getElementById("questconfig").style.display = "";
    document.getElementById("rowButtons").style.display = 'flex';
    document.getElementById("settingsbutton").innerHTML = "Exit Edit Mode";
}

function ResetLayout() {
    initGridRowItem(defaultItemGrid);
    updateGridItemAll();
    initGridRowMask(defaultMaskGrid);
    updateGridMaskAll();
    initGridRowDungeon(defaultDungeonGrid);
    updateGridDungeonAll();
    initGridRowQuest(defaultQuestGrid);
    updateGridQuestAll();
    document.getElementsByName("showmap")[0].checked = true;
    document.getElementsByName("showmap")[0].onchange();
    document.getElementsByName("itemtablesize")[0].value = 100;
    document.getElementsByName("itemtablesize")[0].onchange();
    document.getElementsByName("mapdivsize")[0].value = 100;
    document.getElementsByName("mapdivsize")[0].onchange();
}

function ResetTracker() {
    checks.forEach(check => delete check.isOpened);
    areas.forEach(area => Object.values(area.checklist).forEach(check => delete check.isOpened));
    items = Object.assign({}, baseItems);
    masks = Object.assign({}, baseMasks);
    dungeons = Object.assign({}, baseDungeons);
    quests = Object.assign({}, baseQuests);
    updateGridItemAll();
    updateGridMaskAll();
    updateGridDungeonAll();
    updateGridQuestAll();
    updateMap();
    saveCookie("settings");
    saveCookie("items");
    saveCookie("checks");
    saveCookie("logic");
}

function ResetLogic() {
    //Set all checkboxes to false

    //Item Settings
    document.getElementById("ocarinalogictoggle").checked = false;
    document.getElementById("transformmasklogictoggle").checked = false;
    document.getElementById("maskslogictoggle").checked = false;
    document.getElementById("piecelogictoggle").checked = false;
    document.getElementById("skullslogictoggle").checked = false;
    document.getElementById("scrubtradelogictoggle").checked = false;
    document.getElementById("anjulogictoggle").checked = false;
    document.getElementById("greatfairylogictoggle").checked = false;
    document.getElementById("tinglelogictoggle").checked = false;
    document.getElementById("notebooklogictoggle").checked = false;
    document.getElementById("moonitemlogictoggle").checked = false;
    document.getElementById("deitylogictoggle").checked = false;
    
    //Area Settings
    document.getElementById("mapslogictoggle").checked = false;
    document.getElementById("smallkeylogictoggle").checked = false;
    document.getElementById("bigkeylogictoggle").checked = false;
    document.getElementById("remainslogictoggle").checked = false;
    document.getElementById("containerlogictoggle").checked = false;
    
    //Tricks and Logic Settings
    document.getElementById("skipbomberstoggle").checked = false;

    //set logic flags to false
    setOcarinaLogic();
    setTransLogic();
    setMaskLogic();
    setPieceLogic();
    setSkullsLogic();
    setScrubTradeLogic();
    setAnjuLogic();
    setGFLogic();
    setTingleLogic();
    setNotebookLogic();
    setMoonItemLogic();
    setFDLogic();

    setMapsLogic();
    setSmallKeyLogic();
    setBigKeyLogic();
    setRemainsLogic();
    setContainerLogic();

    setSkipBombers();
    //update map to reflect changes
    updateMap();   
}

function addItemRow() {
    //Items
    var sender = document.getElementById("itemdiv");
    var r = itemLayout.length;

    itemGrid[r] = [];
    itemLayout[r] = [];

    itemGrid[r]['row'] = document.createElement("table");
    itemGrid[r]['row'].className = "tracker";

    itemGrid[r].tablerow = document.createElement("tr");
    itemGrid[r].tablerow.appendChild(itemGrid[r]['row']);
    sender.appendChild(itemGrid[r].tablerow);

    var tr = document.createElement("tr");
    itemGrid[r]['row'].appendChild(tr);

    itemGrid[r]['addbutton'] = document.createElement("button");
    itemGrid[r]['addbutton'].innerHTML = "+";
    itemGrid[r]['addbutton'].style.backgroundColor = "green";
    itemGrid[r]['addbutton'].style.color = "white";
    itemGrid[r]['addbutton'].onclick = new Function("addItem(" + r + ")");
    itemGrid[r]['row'].appendChild(itemGrid[r]['addbutton']);

    itemGrid[r]['removebutton'] = document.createElement("button");
    itemGrid[r]['removebutton'].innerHTML = "-";
    itemGrid[r]['removebutton'].style.backgroundColor = "red";
    itemGrid[r]['removebutton'].style.color = "white";
    itemGrid[r]['removebutton'].onclick = new Function("addItem(" + r + ")");
    itemGrid[r]['row'].appendChild(itemGrid[r]['removebutton']);

    saveCookie("items");
}

function addMaskRow() {
    //Masks
    var sender1 = document.getElementById("maskdiv");
    var r1 = maskLayout.length;

    maskGrid[r1] = [];
    maskLayout[r1] = [];

    maskGrid[r1]['row'] = document.createElement("table");
    maskGrid[r1]['row'].className = "tracker";

    maskGrid[r1].tablerow = document.createElement("tr");
    maskGrid[r1].tablerow.appendChild(maskGrid[r1]['row']);
    sender1.appendChild(maskGrid[r1].tablerow);

    var tr1 = document.createElement("tr");
    maskGrid[r1]['row'].appendChild(tr1);

    maskGrid[r1]['addbutton'] = document.createElement("button");
    maskGrid[r1]['addbutton'].innerHTML = "+";
    maskGrid[r1]['addbutton'].style.backgroundColor = "green";
    maskGrid[r1]['addbutton'].style.color = "white";
    maskGrid[r1]['addbutton'].onclick = new Function("addItem(" + r1 + ")");
    maskGrid[r1]['row'].appendChild(maskGrid[r1]['addbutton']);

    maskGrid[r1]['removebutton'] = document.createElement("button");
    maskGrid[r1]['removebutton'].innerHTML = "-";
    maskGrid[r1]['removebutton'].style.backgroundColor = "red";
    maskGrid[r1]['removebutton'].style.color = "white";
    maskGrid[r1]['removebutton'].onclick = new Function("addItem(" + r1 + ")");
    maskGrid[r1]['row'].appendChild(maskGrid[r1]['removebutton']);

    saveCookie("items");
}

function addDungeonRow() {
    //Dungeons
    var sender2 = document.getElementById("dungeondiv");
    var r2 = dungeonLayout.length;

    dungeonGrid[r2] = [];
    dungeonLayout[r2] = [];

    dungeonGrid[r2]['row'] = document.createElement("table");
    dungeonGrid[r2]['row'].className = "tracker";

    dungeonGrid[r2].tablerow = document.createElement("tr");
    dungeonGrid[r2].tablerow.appendChild(dungeonGrid[r2]['row']);
    sender2.appendChild(dungeonGrid[r2].tablerow);

    var tr2 = document.createElement("tr");
    dungeonGrid[r2]['row'].appendChild(tr2);

    dungeonGrid[r2]['addbutton'] = document.createElement("button");
    dungeonGrid[r2]['addbutton'].innerHTML = "+";
    dungeonGrid[r2]['addbutton'].style.backgroundColor = "green";
    dungeonGrid[r2]['addbutton'].style.color = "white";
    dungeonGrid[r2]['addbutton'].onclick = new Function("addItem(" + r2 + ")");
    dungeonGrid[r2]['row'].appendChild(dungeonGrid[r2]['addbutton']);

    dungeonGrid[r2]['removebutton'] = document.createElement("button");
    dungeonGrid[r2]['removebutton'].innerHTML = "-";
    dungeonGrid[r2]['removebutton'].style.backgroundColor = "red";
    dungeonGrid[r2]['removebutton'].style.color = "white";
    dungeonGrid[r2]['removebutton'].onclick = new Function("addItem(" + r2 + ")");
    dungeonGrid[r2]['row'].appendChild(dungeonGrid[r2]['removebutton']);

    saveCookie("items");
}

function addQuestRow() {
    //Quests
    var sender3 = document.getElementById("questdiv");
    var r3 = questLayout.length;

    questGrid[r3] = [];
    questLayout[r3] = [];

    questGrid[r3]['row'] = document.createElement("table");
    questGrid[r3]['row'].className = "tracker";

    questGrid[r3].tablerow = document.createElement("tr");
    questGrid[r3].tablerow.appendChild(questGrid[r3]['row']);
    sender3.appendChild(questGrid[r3].tablerow);

    var tr3 = document.createElement("tr");
    questGrid[r3]['row'].appendChild(tr3);

    questGrid[r3]['addbutton'] = document.createElement("button");
    questGrid[r3]['addbutton'].innerHTML = "+";
    questGrid[r3]['addbutton'].style.backgroundColor = "green";
    questGrid[r3]['addbutton'].style.color = "white";
    questGrid[r3]['addbutton'].onclick = new Function("addItem(" + r3 + ")");
    questGrid[r3]['row'].appendChild(questGrid[r3]['addbutton']);

    questGrid[r3]['removebutton'] = document.createElement("button");
    questGrid[r3]['removebutton'].innerHTML = "-";
    questGrid[r3]['removebutton'].style.backgroundColor = "red";
    questGrid[r3]['removebutton'].style.color = "white";
    questGrid[r3]['removebutton'].onclick = new Function("addItem(" + r3 + ")");
    questGrid[r3]['row'].appendChild(questGrid[r3]['removebutton']);

    saveCookie("items");
}

function removeItemRow() {
    var sender = document.getElementById("itemdiv");
    var r = itemLayout.length - 1;

    sender.removeChild(itemGrid[r].tablerow);
    itemGrid.splice(r,1);
    itemLayout.splice(r,1);

    saveCookie("items");
}

function removeMaskRow() {
    //Masks
    var sender1 = document.getElementById("maskdiv");
    var r1 = maskLayout.length - 1;

    sender1.removeChild(maskGrid[r1].tablerow);
    maskGrid.splice(r1,1);
    maskLayout.splice(r1,1);

    saveCookie("items");
}

function removeDungeonRow() {
    //Dungeons
    var sender2 = document.getElementById("dungeondiv");
    var r2 = dungeonLayout.length - 1;

    sender2.removeChild(dungeonGrid[r2].tablerow);
    dungeonGrid.splice(r2,1);
    dungeonLayout.splice(r2,1);

    saveCookie("items");
}

function removeQuestRow() {
    //Quests
    var sender3 = document.getElementById("questdiv");
    var r3 = questLayout.length - 1;

    sender3.removeChild(questGrid[r3].tablerow);
    questGrid.splice(r3,1);
    questLayout.splice(r3,1);

    saveCookie("items");
}

function addItem(r) {
    var i = itemLayout[r].length;
    itemGrid[r][i] = [];
    itemLayout[r][i] = "blank";
    itemGrid[r][i].item = document.createElement("td");
    itemGrid[r][i].item.className = "griditem";
    itemGrid[r]['row'].appendChild(itemGrid[r][i].item);

    var tdt = document.createElement("table");
    tdt.className = "bonk";
    itemGrid[r][i].item.appendChild(tdt);

    var tdtr1 = document.createElement("tr");
    tdt.appendChild(tdtr1);
    itemGrid[r][i][0] = document.createElement("th");
    itemGrid[r][i][0].className = "corner";
    itemGrid[r][i][0].onmouseover = new Function("setMOverItem(" + r + "," + i + ",0)");
    itemGrid[r][i][0].onmouseout = new Function("setMOff()");
    itemGrid[r][i][0].onclick = new Function("gridItemClick(" + r + "," + i + ",0)");
    tdtr1.appendChild(itemGrid[r][i][0]);

    updateGridItem(r, i);
    saveCookie("items");
}

function removeItem(r) {
    var i = itemLayout[r].length - 1;
    if (i < 0) {
        return;
    }
    itemGrid[r]['row'].removeChild(itemGrid[r][i].item);
    itemGrid[r].splice(i, 1);
    itemLayout[r].splice(i, 1);
    saveCookie("items");
}

function updateGridItem(row, index) {
    var item = itemLayout[row][index];
    if (editmode) {
        if (!item || item == "blank") {
            itemGrid[row][index].item.style.backgroundImage = 'url(images/blank.png)';
        }
        else if ((typeof items[item]) == "boolean") {
            itemGrid[row][index].item.style.backgroundImage = 'url(images/' + item + '.png)';
        }
        else {
            itemGrid[row][index].item.style.backgroundImage = 'url(images/' + item + itemsMax[item] + '.png)';
        }
        itemGrid[row][index].item.style.border = "1px solid white";
        itemGrid[row][index].item.className = "griditem true";
        return;
    }

    itemGrid[row][index].item.style.border = "0px";

    if (!item || item == "blank") {
        itemGrid[row][index].item.style.backgroundImage = "";
        return;
    }

    if ((typeof items[item]) == "boolean") {
        itemGrid[row][index].item.style.backgroundImage = 'url(images/' + item + '.png)';
    }
    else {
        itemGrid[row][index].item.style.backgroundImage = 'url(images/' + item + items[item] + '.png)';
    }

    itemGrid[row][index].item.className = "griditem " + !!items[item];

    if (remains[item] != undefined) {
        itemGrid[row][index][0].style.backgroundImage = "";
    }
}

function updateGridItemAll() {
    //Items
    var r, c;
    for (r = 0; r < itemLayout.length; r++) {
        for (c = 0; c < itemLayout[r].length; c++) {
            updateGridItem(r, c);
        }
        if (editmode) {
            itemGrid[r]['addbutton'].style.display = "";
            itemGrid[r]['removebutton'].style.display = "";
        }
        else {
            itemGrid[r]['addbutton'].style.display = "none";
            itemGrid[r]['removebutton'].style.display = "none";
        }
    }
}

function setGridItem(item, row, index) {
    while (!itemLayout[row]) {
        addItemRow();
    }
    while (!itemLayout[row][index]) {
        addItem(row);
    }
    itemLayout[row][index] = item;
    updateGridItem(row, index);
}

function initGridRowItem(itemsets) {
    while(itemLayout.length > 0) {
        removeItemRow();
    }

    var r, c;
    for (r = 0; r < itemsets.length; r++) {
        for (c = 0; c < itemsets[r].length; c++) {
            setGridItem(itemsets[r][c], r, c);
        }
    }
}


function addMask(r) {
    var i = maskLayout[r].length;
    maskGrid[r][i] = [];
    maskLayout[r][i] = "blank";
    maskGrid[r][i].mask = document.createElement("td");
    maskGrid[r][i].mask.className = "gridmask";
    maskGrid[r]['row'].appendChild(maskGrid[r][i].mask);

    var tdt = document.createElement("table");
    tdt.className = "bonk";
    maskGrid[r][i].mask.appendChild(tdt);

    var tdtr1 = document.createElement("tr");
    tdt.appendChild(tdtr1);
    maskGrid[r][i][0] = document.createElement("th");
    maskGrid[r][i][0].className = "corner";
    maskGrid[r][i][0].onmouseover = new Function("setMOverMask(" + r + "," + i + ",0)");
    maskGrid[r][i][0].onmouseout = new Function("setMOff()");
    maskGrid[r][i][0].onclick = new Function("gridMaskClick(" + r + "," + i + ",0)");
    tdtr1.appendChild(maskGrid[r][i][0]);

    updateGridMask(r, i);
    saveCookie("items");
}

function removeMask(r) {
    var i = maskLayout[r].length - 1;
    if (i < 0) {
        return;
    }
    maskGrid[r]['row'].removeChild(maskGrid[r][i].mask);
    maskGrid[r].splice(i, 1);
    maskLayout[r].splice(i, 1);
    saveCookie("items");
}

function updateGridMask(row, index) {
    var mask = maskLayout[row][index];
    if (editmode) {
        if (!mask || mask == "blank") {
            maskGrid[row][index].mask.style.backgroundImage = 'url(images/blank.png)';
        }
        else if ((typeof masks[mask]) == "boolean") {
            maskGrid[row][index].mask.style.backgroundImage = 'url(images/' + mask + '.png)';
        }
        else {
            maskGrid[row][index].mask.style.backgroundImage = 'url(images/' + mask + itemsMax[mask] + '.png)';
        }
        maskGrid[row][index].mask.style.border = "1px solid white";
        maskGrid[row][index].mask.className = "gridmask true";
        return;
    }

    maskGrid[row][index].mask.style.border = "0px";

    if (!mask || mask == "blank") {
        maskGrid[row][index].mask.style.backgroundImage = "";
        return;
    }

    if ((typeof masks[mask]) == "boolean") {
        maskGrid[row][index].mask.style.backgroundImage = 'url(images/' + mask + '.png)';
    }
    else {
        maskGrid[row][index].mask.style.backgroundImage = 'url(images/' + mask + masks[mask] + '.png)';
    }

    maskGrid[row][index].mask.className = "gridmask " + !!masks[mask];

    if (remains[mask] != undefined) {
        maskGrid[row][index][0].style.backgroundImage = "";
    }
}

function updateGridMaskAll() {
    var r, c;
    for (r = 0; r < maskLayout.length; r++) {
        for (c = 0; c < maskLayout[r].length; c++) {
            updateGridMask(r, c);
        }
        if (editmode) {
            maskGrid[r]['addbutton'].style.display = "";
            maskGrid[r]['removebutton'].style.display = "";
        }
        else {
            maskGrid[r]['addbutton'].style.display = "none";
            maskGrid[r]['removebutton'].style.display = "none";
        }
    }
}

function setGridMask(mask, row, index) {
    while (!maskLayout[row]) {
        addMaskRow();
    }
    while (!maskLayout[row][index]) {
        addMask(row);
    }
    maskLayout[row][index] = mask;
    updateGridMask(row, index);
}

function initGridRowMask(masksets) {
    while(maskLayout.length > 0) {
        removeMaskRow();
    }

    var r, c;
    for (r = 0; r < masksets.length; r++) {
        for (c = 0; c < masksets[r].length; c++) {
            setGridMask(masksets[r][c], r, c);
        }
    }
}


function addDungeon(r) {
    var i = dungeonLayout[r].length;
    dungeonGrid[r][i] = [];
    dungeonLayout[r][i] = "blank";
    dungeonGrid[r][i].dungeon = document.createElement("td");
    dungeonGrid[r][i].dungeon.className = "griddungeon";
    dungeonGrid[r]['row'].appendChild(dungeonGrid[r][i].dungeon);

    var tdt = document.createElement("table");
    tdt.className = "bonk";
    dungeonGrid[r][i].dungeon.appendChild(tdt);

    var tdtr1 = document.createElement("tr");
    tdt.appendChild(tdtr1);
    dungeonGrid[r][i][0] = document.createElement("th");
    dungeonGrid[r][i][0].className = "corner";
    dungeonGrid[r][i][0].onmouseover = new Function("setMOverDungeon(" + r + "," + i + ",0)");
    dungeonGrid[r][i][0].onmouseout = new Function("setMOff()");
    dungeonGrid[r][i][0].onclick = new Function("gridDungeonClick(" + r + "," + i + ",0)");
    tdtr1.appendChild(dungeonGrid[r][i][0]);
    
    updateGridDungeon(r, i);
    saveCookie("items");
}

function removeDungeon(r) {
    var i = dungeonLayout[r].length - 1;
    if (i < 0) {
        return;
    }
    dungeonGrid[r]['row'].removeChild(dungeonGrid[r][i].dungeon);
    dungeonGrid[r].splice(i, 1);
    dungeonLayout[r].splice(i, 1);
    saveCookie("items");
}

function updateGridDungeon(row, index) {
    var dungeon = dungeonLayout[row][index];
    if (editmode) {
        if (!dungeon || dungeon == "blank") {
            dungeonGrid[row][index].dungeon.style.backgroundImage = 'url(images/blank.png)';
        }
        else if ((typeof dungeons[dungeon]) == "boolean") {
            dungeonGrid[row][index].dungeon.style.backgroundImage = 'url(images/' + dungeon + '.png)';
        }
        else {
            dungeonGrid[row][index].dungeon.style.backgroundImage = 'url(images/' + dungeon + itemsMax[dungeon] + '.png)';
        }
        dungeonGrid[row][index].dungeon.style.border = "1px solid white";
        dungeonGrid[row][index].dungeon.className = "griddungeon true";
        
        return;
    }

    dungeonGrid[row][index].dungeon.style.border = "0px";
    //ToDo:Fix tooltips
    //var ss = document.createElement("span");
    //ss.className = "tooltip";
    //ss.innerHTML = dungeon;
    //dungeonGrid[row][index].dungeon.appendChild(ss);

    if (!dungeon || dungeon == "blank") {
        dungeonGrid[row][index].dungeon.style.backgroundImage = "";
        return;
    }

    if ((typeof dungeons[dungeon]) == "boolean") {
        dungeonGrid[row][index].dungeon.style.backgroundImage = 'url(images/' + dungeon + '.png)';
    }
    else {
        dungeonGrid[row][index].dungeon.style.backgroundImage = 'url(images/' + dungeon + dungeons[dungeon] + '.png)';
    }

    dungeonGrid[row][index].dungeon.className = "griddungeon " + !!dungeons[dungeon];

    if (remains[dungeon] != undefined) {
        dungeonGrid[row][index][0].style.backgroundImage = "";
    }
}

function updateGridDungeonAll() {
    var r, c;
    for (r = 0; r < dungeonLayout.length; r++) {
        for (c = 0; c < dungeonLayout[r].length; c++) {
            updateGridDungeon(r, c);
        }
        if (editmode) {
            dungeonGrid[r]['addbutton'].style.display = "";
            dungeonGrid[r]['removebutton'].style.display = "";
        }
        else {
            dungeonGrid[r]['addbutton'].style.display = "none";
            dungeonGrid[r]['removebutton'].style.display = "none";
        }
    }
}

function setGridDungeon(dungeon, row, index) {
    while (!dungeonLayout[row]) {
        addDungeonRow();
    }
    while (!dungeonLayout[row][index]) {
        addDungeon(row);
    }
    dungeonLayout[row][index] = dungeon;
    updateGridDungeon(row, index);
}

function initGridRowDungeon(dungeonsets) {
    while(dungeonLayout.length > 0) {
        removeDungeonRow();
    }

    var r, c;
    for (r = 0; r < dungeonsets.length; r++) {
        for (c = 0; c < dungeonsets[r].length; c++) {
            setGridDungeon(dungeonsets[r][c], r, c);
        }
    }
}


function addQuest(r) {
    var i = questLayout[r].length;
    questGrid[r][i] = [];
    questLayout[r][i] = "blank";
    questGrid[r][i].quest = document.createElement("td");
    questGrid[r][i].quest.className = "gridquest";
    questGrid[r]['row'].appendChild(questGrid[r][i].quest);

    var tdt = document.createElement("table");
    tdt.className = "bonk";
    questGrid[r][i].quest.appendChild(tdt);

    var tdtr1 = document.createElement("tr");
    tdt.appendChild(tdtr1);
    questGrid[r][i][0] = document.createElement("th");
    questGrid[r][i][0].className = "corner";
    questGrid[r][i][0].onmouseover = new Function("setMOverQuest(" + r + "," + i + ",0)");
    questGrid[r][i][0].onmouseout = new Function("setMOff()");
    questGrid[r][i][0].onclick = new Function("gridQuestClick(" + r + "," + i + ",0)");
    tdtr1.appendChild(questGrid[r][i][0]);

    updateGridQuest(r, i);
    saveCookie("items");
}

function removeQuest(r) {
    var i = questLayout[r].length - 1;
    if (i < 0) {
        return;
    }
    questGrid[r]['row'].removeChild(questGrid[r][i].quest);
    questGrid[r].splice(i, 1);
    questLayout[r].splice(i, 1);
    saveCookie("items");
}

function updateGridQuest(row, index) {
    var quest = questLayout[row][index];
    if (editmode) {
        if (!quest || quest == "blank") {
            questGrid[row][index].quest.style.backgroundImage = 'url(images/blank.png)';
        }
        else if ((typeof quests[quest]) == "boolean") {
            questGrid[row][index].quest.style.backgroundImage = 'url(images/' + quest + '.png)';
        }
        else {
            questGrid[row][index].quest.style.backgroundImage = 'url(images/' + quest + questsMax[quest] + '.png)';
        }
        questGrid[row][index].quest.style.border = "1px solid white";
        questGrid[row][index].quest.className = "gridquest true";
        return;
    }

    questGrid[row][index].quest.style.border = "0px";

    if (!quest || quest == "blank") {
        questGrid[row][index].quest.style.backgroundImage = "";
        return;
    }

    if ((typeof quests[quest]) == "boolean") {
        questGrid[row][index].quest.style.backgroundImage = 'url(images/' + quest + '.png)';
    }
    else {
        questGrid[row][index].quest.style.backgroundImage = 'url(images/' + quest + quests[quest] + '.png)';
    }

    questGrid[row][index].quest.className = "gridquest " + !!quests[quest];

    if (remains[quest] != undefined) {
        questGrid[row][index][0].style.backgroundImage = "";
    }
}

function updateGridQuestAll() {
    var r, c;
    for (r = 0; r < questLayout.length; r++) {
        for (c = 0; c < questLayout[r].length; c++) {
            updateGridQuest(r, c);
        }
        if (editmode) {
            questGrid[r]['addbutton'].style.display = "";
            questGrid[r]['removebutton'].style.display = "";
        }
        else {
            questGrid[r]['addbutton'].style.display = "none";
            questGrid[r]['removebutton'].style.display = "none";
        }
    }
}

function setGridQuest(quest, row, index) {
    while (!questLayout[row]) {
        addQuestRow();
    }
    while (!questLayout[row][index]) {
        addQuest(row);
    }
    questLayout[row][index] = quest;
    updateGridQuest(row, index);
}

function initGridRowQuest(questsets) {
    while(questLayout.length > 0) {
        removeQuestRow();
    }

    var r, c;
    for (r = 0; r < questsets.length; r++) {
        for (c = 0; c < questsets[r].length; c++) {
            setGridQuest(questsets[r][c], r, c);
        }
    }
}

function setMOverItem(row, col, corner) {
    //keep track of what was moused over
    mouseLastOverCor = corner;
    mouseLastOverR = row;
    mouseLastOverC = col;
    mouseOverItem = true;
}

function setMOverMask(row, col, corner) {
    //keep track of what was moused over
    mouseLastOverCor = corner;
    mouseLastOverR = row;
    mouseLastOverC = col;
    mouseOverMask = true;
}

function setMOverDungeon(row, col, corner) {
    //keep track of what was moused over
    mouseLastOverCor = corner;
    mouseLastOverR = row;
    mouseLastOverC = col;
    mouseOverDungeon = true;
}

function setMOverQuest(row, col, corner) {
    //keep track of what was moused over
    mouseLastOverCor = corner;
    mouseLastOverR = row;
    mouseLastOverC = col;
    mouseOverQuest = true;
}

function setMOff() {
    mouseOverItem = false;
    mouseOverMask = false;
    mouseOverDungeon = false;
    mouseOverQuest = false;
}

function gridItemClick(row, col, corner) {
    if (editmode) {
        if (selected.item) {
            document.getElementById(selected.item).style.border = "1px solid white";
            var old = itemLayout[row][col];
            if (old == selected.item) {
                selected = {};
                return;
            }
            itemLayout[row][col] = selected.item;
            updateGridItem(row, col);
            selected = {};
            document.getElementById(old).style.opacity = 1;
        }
        else if (selected.row !== undefined) {
            itemGrid[selected.row][selected.col].item.style.border = "1px solid white";
            var temp = itemLayout[row][col];
            itemLayout[row][col] = itemLayout[selected.row][selected.col];
            itemLayout[selected.row][selected.col] = temp;
            updateGridItem(row, col);
            updateGridItem(selected.row, selected.col);
            selected = {};
        }
    }
    else {
        var item = itemLayout[row][col];
        if (remains[item] !== undefined) {
            if (corner == 3) {
                remains[item]++;
                if (remains[item] >= 4) {
                    remains[item] = 0;
                }
            }
            else {
                items[item] = !items[item];
            }
        }
        else if ((typeof items[item]) == "boolean") {
            items[item] = !items[item];
        }
        else {
            items[item]++;
            if (items[item] > itemsMax[item]) {
                items[item] = itemsMin[item];
            }
        }
    }
    updateMap();
    updateGridItem(row,col);
    saveCookie("items");
}

function gridItemRClick(row, col, corner) {
    if (editmode) {
        //do nothing
    }
    else {
        var item = itemLayout[row][col];
        if (remains[item] != undefined) {
            if (corner == 3) {
                //area list happens here
                //corner 3 is bottom right
                if (remains[item] <= 0) {
                    remains[item] = 4;
                }
                else {
                    remains[item] = remains[item] - 1;
                }
            }
            else {
                items[item] = !items[item];
            }
        }
        else if ((typeof items[item]) == "boolean") {
            items[item] = !items[item];
        }
        else {
            if (items[item] == itemsMin[item]) {
                items[item] = itemsMax[item];
            }
            else {
                items[item]--;
            }
        }
        updateMap();
        updateGridItem(row, col);
    }
    saveCookie("items");
}

function gridMaskClick(row, col, corner) {
    if (editmode) {
        if (selected.mask) {
            document.getElementById(selected.mask).style.border = "1px solid white";
            var old = maskLayout[row][col];
            if (old == selected.mask) {
                selected = {};
                return;
            }
            maskLayout[row][col] = selected.mask;
            updateGridMask(row, col);
            selected = {};
            document.getElementById(old).style.opacity = 1;
        }
        else if (selected.row !== undefined) {
            maskGrid[selected.row][selected.col].mask.style.border = "1px solid white";
            var temp = maskLayout[row][col];
            maskLayout[row][col] = maskLayout[selected.row][selected.col];
            maskLayout[selected.row][selected.col] = temp;
            updateGridMask(row, col);
            updateGridMask(selected.row, selected.col);
            selected = {};
        }
    }
    else {
        var mask = maskLayout[row][col];
        if (remains[mask] !== undefined) {
            if (corner == 3) {
                remains[mask]++;
                if (remains[mask] >= 4) {
                    remains[mask] = 0;
                }
            }
            else {
                masks[mask] = !masks[mask];
            }
        }
        else if ((typeof masks[mask]) == "boolean") {
            masks[mask] = !masks[mask];
        }
        else {
            masks[mask]++;
            if (masks[mask] > itemsMax[mask]) {
                masks[mask] = itemsMin[mask];
            }
        }
    }
    updateMap();
    updateGridMask(row,col);
    saveCookie("items");
}

function gridMaskRClick(row, col, corner) {
    if (editmode) {
        //do nothing
    }
    else {
        var mask = maskLayout[row][col];
        if (remains[mask] != undefined) {
            if (corner == 3) {
                //area list happens here
                //corner 3 is bottom right
                if (remains[mask] <= 0) {
                    remains[mask] = 4;
                }
                else {
                    remains[mask] = remains[mask] - 1;
                }
            }
            else {
                masks[mask] = !masks[mask];
            }
        }
        else if ((typeof masks[mask]) == "boolean") {
            masks[mask] = !masks[mask];
        }
        else {
            if (masks[mask] == itemsMin[mask]) {
                masks[mask] = itemsMax[mask];
            }
            else {
                masks[mask]--;
            }
        }
        updateMap();
        updateGridMask(row, col);
    }
    saveCookie("items");
}

function gridDungeonClick(row, col, corner) {
    if (editmode) {
        if (selected.dungeon) {
            document.getElementById(selected.dungeon).style.border = "1px solid white";
            var old = dungeonLayout[row][col];
            if (old == selected.dungeon) {
                selected = {};
                return;
            }
            dungeonLayout[row][col] = selected.dungeon;
            updateGridDungeon(row, col);
            selected = {};
            document.getElementById(old).style.opacity = 1;
        }
        else if (selected.row !== undefined) {
            dungeonGrid[selected.row][selected.col].dungeon.style.border = "1px solid white";
            var temp = dungeonLayout[row][col];
            dungeonLayout[row][col] = dungeonLayout[selected.row][selected.col];
            dungeonLayout[selected.row][selected.col] = temp;
            updateGridDungeon(row, col);
            updateGridDungeon(selected.row, selected.col);
            selected = {};
        }
    }
    else {
        var dungeon = dungeonLayout[row][col];
        if (remains[dungeon] !== undefined) {
            if (corner == 3) {
                remains[dungeon]++;
                if (remains[dungeon] >= 4) {
                    remains[dungeon] = 0;
                }
            }
            else {
                dungeons[dungeon] = !dungeons[dungeon];
            }
        }
        else if ((typeof dungeons[dungeon]) == "boolean") {
            dungeons[dungeon] = !dungeons[dungeon];
        }
        else {
            dungeons[dungeon]++;
            if (dungeons[dungeon] > dungeonMax[dungeon]) {
                dungeons[dungeon] = dungeonMin[dungeon];
            }
        }
    }
    updateMap();
    updateGridDungeon(row,col);
    saveCookie("items");
}

function gridDungeonRClick(row, col, corner) {
    if (editmode) {
        //do nothing
    }
    else {
        var dungeon = dungeonLayout[row][col];
        if (remains[dungeon] != undefined) {
            if (corner == 3) {
                //area list happens here
                //corner 3 is bottom right
                if (remains[dungeon] <= 0) {
                    remains[dungeon] = 4;
                }
                else {
                    remains[dungeon] = remains[dungeon] - 1;
                }
            }
            else {
                dungeons[dungeon] = !dungeons[dungeon];
            }
        }
        else if ((typeof dungeons[dungeon]) == "boolean") {
            dungeons[dungeon] = !dungeons[dungeon];
        }
        else {
            if (dungeons[dungeon] == dungeonMin[dungeon]) {
                dungeons[dungeon] = dungeonMax[dungeon];
            }
            else {
                dungeons[dungeon]--;
            }
        }
        updateMap();
        updateGridDungeon(row, col);
    }
    saveCookie("items");
}

function gridQuestClick(row, col, corner) {
    if (editmode) {
        if (selected.quest) {
            document.getElementById(selected.quest).style.border = "1px solid white";
            var old = questLayout[row][col];
            if (old == selected.quest) {
                selected = {};
                return;
            }
            questLayout[row][col] = selected.quest;
            updateGridQuest(row, col);
            selected = {};
            document.getElementById(old).style.opacity = 1;
        }
        else if (selected.row !== undefined) {
            questGrid[selected.row][selected.col].quest.style.border = "1px solid white";
            var temp = questLayout[row][col];
            questLayout[row][col] = questLayout[selected.row][selected.col];
            questLayout[selected.row][selected.col] = temp;
            updateGridQuest(row, col);
            updateGridQuest(selected.row, selected.col);
            selected = {};
        }
    }
    else {
        var quest = questLayout[row][col];
        if (remains[quest] !== undefined) {
            if (corner == 3) {
                remains[quest]++;
                if (remains[quest] >= 4) {
                    remains[quest] = 0;
                }
            }
            else {
                quests[quest] = !quests[quest];
            }
        }
        else if ((typeof quests[quest]) == "boolean") {
            quests[quest] = !quests[quest];
        }
        else {
            quests[quest]++;
            if (quests[quest] > questMax[quest]) {
                quests[quest] = questMin[quest];
            }
        }
    }
    updateMap();
    updateGridQuest(row,col);
    saveCookie("items");
}

function gridQuestRClick(row, col, corner) {
    if (editmode) {
        //do nothing
    }
    else {
        var quest = questLayout[row][col];
        if (remains[quest] != undefined) {
            if (corner == 3) {
                //area list happens here
                //corner 3 is bottom right
                if (remains[quest] <= 0) {
                    remains[quest] = 4;
                }
                else {
                    remains[quest] = remains[quest] - 1;
                }
            }
            else {
                quests[quest] = !quests[quest];
            }
        }
        else if ((typeof quests[quest]) == "boolean") {
            quests[quest] = !quests[quest];
        }
        else {
            if (quests[quest] == questMin[quest]) {
                quests[quest] = questMax[quest];
            }
            else {
                quests[quest]--;
            }
        }
        updateMap();
        updateGridQuest(row, col);
    }
    saveCookie("items");
}

function updateMap() {
    for (k = 0; k < checks.length; k++) {
        if(checks[k].isOpened) {
            document.getElementById(k).className = "mapspan check " + checks[k].isAvailable();
        }
    }
    for (k = 0; k < areas.length; k++) {
        document.getElementById("area" + k).className = "mapspan area " + areas[k].canGetCheck();
        var DCcount = 0;
        for (var key in areas[k].checklist) {
            if (areas[k].checklist.hasOwnProperty(key)) {
                if (!areas[k].checklist[key].isOpened && areas[k].checklist[key].isAvailable()) {
                    DCcount++;
                }
            }
        }
        var child = document.getElementById("area" + k).firstChild;
        while (child) {
            if (child.className == "checkCount") {
                if (DCcount == 0) {
                    child.innerHTML = "";
                }
                else {
                    child.innerHTML = DCcount;
                }
                break;
            }
            child = child.nextSibling;
        }
    }
    document.getElementById("submaparea").className = "DC" + areas[areaSelect].isBeatable();
    var itemlist = document.getElementById("submaplist").children;
    for (var item in itemlist) {
        if (itemlist.hasOwnProperty(item)) {
            if (areas[areaSelect].checklist[itemlist[item].innerHTML].isOpened) {
                itemlist[item].className = "DCopened";
            }
            else if (!areas[areaSelect].checklist[itemlist[item].innerHTML].isLogic()) {
                itemlist[item].className = "DChidden";
            }
            else if (areas[areaSelect].checklist[itemlist[item].innerHTML].isAvailable()) {
                itemlist[item].className = "DCavailable";
            }
            else {
                itemlist[item].className = "DCunavailable";
            }
        }
    }
}

function itemConfigClick(sender) {
    var item = sender.id;
    if (selected.item) {
        document.getElementById(selected.item).style.border = "0px";
        sender.style.border = "3px solid yellow";
        selected = {item: item};
    }
    else if (selected.row !== undefined) {
        itemGrid[selected.row][selected.col].item.style.border = "1px solid white";
        var old = itemLayout[selected.row][selected.col];
        if (old == item) {
            selected = {};
            return;
        }
        itemLayout[selected.row][selected.col] = item;
        updateGridItem(selected.row, selected.col);
        document.getElementById(old).style.opacity = 1;
        selected = {};
    }
    else {
        sender.style.border = "3px solid yellow";
        selected = {item: item};
    }
}

function maskConfigClick(sender) {
    var mask = sender.id;
    if (selected.mask) {
        document.getElementById(selected.mask).style.border = "0px";
        sender.style.border = "3px solid yellow";
        selected = {mask: mask};
    }
    else if (selected.row !== undefined) {
        maskGrid[selected.row][selected.col].mask.style.border = "1px solid white";
        var old = maskLayout[selected.row][selected.col];
        if (old == mask) {
            selected = {};
            return;
        }
        maskLayout[selected.row][selected.col] = mask;
        updateGridMask(selected.row, selected.col);
        document.getElementById(old).style.opacity = 1;
        selected = {};
    }
    else {
        sender.style.border = "3px solid yellow";
        selected = {mask: mask};
    }
}

function dungeonConfigClick(sender) {
    var dungeon = sender.id;
    if (selected.dungeon) {
        document.getElementById(selected.dungeon).style.border = "0px";
        sender.style.border = "3px solid yellow";
        selected = {dungeon: dungeon};
    }
    else if (selected.row !== undefined) {
        dungeonGrid[selected.row][selected.col].dungeon.style.border = "1px solid white";
        var old = dungeonLayout[selected.row][selected.col];
        if (old == dungeon) {
            selected = {};
            return;
        }
        dungeonLayout[selected.row][selected.col] = dungeon;
        updateGridDungeon(selected.row, selected.col);
        document.getElementById(old).style.opacity = 1;
        selected = {};
    }
    else {
        sender.style.border = "3px solid yellow";
        selected = {dungeon: dungeon};
    }
}

function questConfigClick(sender) {
    var quest = sender.id;
    if (selected.quest) {
        document.getElementById(selected.quest).style.border = "0px";
        sender.style.border = "3px solid yellow";
        selected = {quest: quest};
    }
    else if (selected.row !== undefined) {
        questGrid[selected.row][selected.col].quest.style.border = "1px solid white";
        var old = questLayout[selected.row][selected.col];
        if (old == quest) {
            selected = {};
            return;
        }
        questLayout[selected.row][selected.col] = quest;
        updateGridQuest(selected.row, selected.col);
        document.getElementById(old).style.opacity = 1;
        selected = {};
    }
    else {
        sender.style.border = "3px solid yellow";
        selected = {quest: quest};
    }
}

function populateMapDiv() {
    var mapdiv = document.getElementById('mapdiv');
    //Initialize all checks on the map
    
    for (k = 0; k < checks.length; k++) {
        var s = document.createElement("span");
        s.style.backgroundImage = "url(images/poi.png)";
        s.style.color = "black";
        s.id = k;
        s.onclick = new Function("toggleCheck(" + k + ")");
        s.onmouseover = new Function("highlight(" + k + ")");
        s.onmouseout = new Function("unhighlight(" + k + ")");
        s.style.left = checks[k].x;
        s.style.top = checks[k].y;
        if (checks[k].isOpened) {
            s.className = "mapspan check opened";
        }
        else {
            s.className = "mapspan check " + checks[k].isAvailable();
        }
        var ss = document.createElement("span");
        ss.className = "tooltip";
        ss.innerHTML = checks[k].name;
        s.appendChild(ss);
        mapdiv.appendChild(s);
    }

    //Area Bosses and checks
    for (k = 0; k < areas.length; k++) {
        var s = document.createElement("span");
        s.id = "area" + k;

        s.onclick = new Function("clickArea(" + k + ")");
        s.onmouseover = new Function("highlightArea(" + k + ")");
        s.onmouseout = new Function("unhighlightArea(" + k + ")");
        s.style.backgroundImage = 'url(images/poi.png)';
        s.style.left = areas[k].x;
        s.style.top = areas[k].y;
        s.style.textAlign = "center";
        s.className = "mapspan area " + areas[k].canGetCheck();

        var DCcount = 0;
        for (var key in areas[k].checklist) {
            if (areas[k].checklist.hasOwnProperty(key)) {
                if (!areas[k].checklist[key].isOpened && areas[k].checklist[key].isAvailable()) {
                    DCcount++;
                }
            }
        }
        var ss = document.createElement("span");
        ss.className = "checkCount";
        if (DCcount == 0) {
            ss.innerHTML = "";
        }
        else {
            ss.innerHTML = DCcount;
        }
        ss.style.color = "black";
        ss.display = "inline-block";
        ss.style.lineHeight = "24px";
        s.appendChild(ss);

        var ss = document.createElement('span');
        ss.className = 'tooltipgrey';
        ss.innerHTML = areas[k].name;
        s.appendChild(ss);

        mapdiv.appendChild(s);
    }
    document.getElementById("submaparea").innerHTML = areas[areaSelect].name;
    document.getElementById("submaparea").className = "DC" + areas[areaSelect].isBeatable();
    document.getElementById("area" + areaSelect).style.backgroundImage = 'url(images/highlighted.png)';
    for (var key1 in areas[areaSelect].checklist) {
        var l = document.createElement("li");
        l.innerHTML = key1;

        if (areas[areaSelect].checklist[key1].isOpened) {
            l.className = "DCopened";
        }
        else if (!areas[areaSelect].checklist[key1].isLogic()) {
            length.className = "DChidden";
        }
        else if (areas[areaSelect].checklist[key1].isAvailable()) {
            length.className = "DCavailable";
        }
        
        else {
            l.className = "DCunavailable";
        }
        l.onclick = new Function('toggleAreaCheck(this,' + areaSelect + ',"' + key1 + '")');
        l.onmouseover = new Function("highlightAreaCheck(this)");
        l.onmouseout = new Function("unhighlightAreaCheck(this)");
        l.style.cursor = "pointer";
        document.getElementById("submaplist").appendChild(l);
    }
}

function populateItemConfig() {
    var grid = document.getElementById("itemconfig");
    var i = 0;
    var row;
    for (var key in items) {
        if (i % 10 == 0) {
            row = document.createElement("tr");
            grid.appendChild(row);
        }
        i++;
        var rowitem = document.createElement("td");
        rowitem.className = "corner";
        rowitem.id = key;
        rowitem.style.backgroundSize = "100% 100%";
        rowitem.onclick = new Function("itemConfigClick(this)");
        if ((typeof items[key]) == "boolean") {
            rowitem.style.backgroundImage = 'url(images/' + key + '.png")';
        }
        else {
            rowitem.style.backgroundImage = 'url(images/' + key + itemsMax[key] + '.png")';
        }
        row.appendChild(rowitem);
    }
}

function populateMaskConfig() {
    var grid = document.getElementById("maskconfig");
    var i = 0;
    var row;
    for (var key in masks) {
        if (i % 10 == 0) {
            row = document.createElement("tr");
            grid.appendChild(row);
        }
        i++;
        var rowmask = document.createElement("td");
        rowmask.className = "corner";
        rowmask.id = key;
        rowmask.style.backgroundSize = "100% 100%";
        rowmask.onclick = new Function("maskConfigClick(this)");
        if ((typeof masks[key]) == "boolean") {
            rowmask.style.backgroundImage = 'url(images/' + key + '.png")';
        }
        else {
            rowmask.style.backgroundImage = 'url(images/' + key + itemsMax[key] + '.png")';
        }
        row.appendChild(rowmask);
    }
}

function populateDungeonConfig() {
    var grid = document.getElementById("dungeonconfig");
    var i = 0;
    var row;
    for (var key in dungeons) {
        if (i % 10 == 0) {
            row = document.createElement("tr");
            grid.appendChild(row);
        }
        i++;
        var rowdungeon = document.createElement("td");
        rowdungeon.className = "corner";
        rowdungeon.id = key;
        rowdungeon.style.backgroundSize = "100% 100%";
        rowdungeon.onclick = new Function("dungeonConfigClick(this)");
        if ((typeof dungeons[key]) == "boolean") {
            rowdungeon.style.backgroundImage = 'url(images/' + key + '.png")';
        }
        else {
            rowdungeon.style.backgroundImage = 'url(images/' + key + itemsMax[key] + '.png")';
        }
        row.appendChild(rowdungeon);
    }
}

function populateQuestConfig() {
    var grid = document.getElementById("questconfig");
    var i = 0;
    var row;
    for (var key in quests) {
        if (i % 10 == 0) {
            row = document.createElement("tr");
            grid.appendChild(row);
        }
        i++;
        var rowquest = document.createElement("td");
        rowquest.className = "corner";
        rowquest.id = key;
        rowquest.style.backgroundSize = "100% 100%";
        rowquest.onclick = new Function("questConfigClick(this)");
        if ((typeof quests[key]) == "boolean") {
            rowquest.style.backgroundImage = 'url(images/' + key + '.png")';
        }
        else {
            rowquest.style.backgroundImage = 'url(images/' + key + itemsMax[key] + '.png")';
        }
        row.appendChild(rowquest);
    }
}

function init() {
    populateMapDiv();
    populateItemConfig();
    populateMaskConfig();
    populateDungeonConfig();
    populateQuestConfig();
    loadCookie("settings");
    loadCookie("items");
    loadCookie("checks");
    loadCookie("logic");
    saveCookie("settings");
    saveCookie("items");
    saveCookie("checks");
    saveCookie("logic");
    // Check if the user is accessing the page on a mobile device
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    //Set "Below" if user is on mobile
    window.onload = function() {
        if (isMobileDevice()){
            const belowRadio = document.getElementById("mappositionbelow");
            if (belowRadio) {
                belowRadio.checked = true;
                setOrder(true);
            }
        }
    };
}

function preloader() {
    var img = new Image();
    for (var item in items) {
        if ((typeof items[item]) == "boolean") {
            img.src = "images/" + item + ".png";
        }
        else {
            for (i = itemsMin[item]; i < itemsMax[item]; i++) {
                img.src = "images/" + item + i + ".png";
            }
        }
    }
    //Masks
    for (var mask in masks) {
        if ((typeof masks[mask]) == "boolean") {
            img.src = "images/" + mask + ".png";
        }
        else {
            for (i = itemsMin[mask]; i < itemsMax[mask]; i++) {
                img.src = "images/" + mask + i + ".png";
            }
        }
    }
    //Dungeons
    for (var dungeon in dungeons) {
        if ((typeof dungeons[dungeon]) == "boolean") {
            img.src = "images/" + dungeon + ".png";
        }
        else {
            for (i = dungeonMin[dungeon]; i < dungeonMax[dungeon]; i++) {
                img.src = "images/" + dungeon + i + ".png";
            }
        }
    }
    //Quests
    for (var quest in quests) {
        if ((typeof quests[quest]) == "boolean") {
            img.src = "images/" + quest + ".png";
        }
        else {
            for (i = questMin[quest]; i < questMax[quest]; i++) {
                img.src = "images/" + quest + i + ".png";
            }
        }
    }
}

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != "function") {
        window.onload = func;
    }
    else {
        window.onload = function() {
            if (oldonload) {
                oldonload();
            }
            func();
        };
    }
}
addLoadEvent(preloader);