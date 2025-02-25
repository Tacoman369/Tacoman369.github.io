var defaultRemains = {
    OdolwaRemains: 0,
    GohtRemains: 0,
    GyorgRemains: 0,
    TwinmoldRemains: 0,
};
var Remains = defaultRemains;
//logic vars
transformmasklogic = false;
maskslogic = false;
piecelogic = false;
skullslogic = false;
scrubtradelogic = false;
anjulogic = false;
greatfairylogic = false;
tinglelogic = false;
notebooklogic = false;
moonitemlogic = false;
deitylogic = false;
mapslogic = false;
smallkeylogic = false;
bigkeylogic = false;
remainslogic = false;
containerlogic = false;
//trick vars
skipbombers = false;

var mouseOverItem = false;
var mouseLastOverR;
var mouseLastOverC;
var mouseLastOverCor;

var itemGrid= [];
var itemLayout = [];

var editmode = false;
var selected = {};

var dungeonSelect = 0;

function setCookie(obj) {
    var d = new Data();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000) );
    var expires = "expires=" + d.toUTCString();
    var val = JSON.stringify(obj);
    document.cookie = "key=" + val + ";" + expires + ";path=/";
}

function getCookie() {
    var name = "key=";
    var ca = document.cookie.split(';');
    for (var i = 0 ; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return JSON.parse(c.substring(name.length, c.length));
        }
    }
    return {};
}

var cookieDefault = {
    map: 1,
    iZoom: 100,
    mZoom: 100,
    mPos: 0,
    remains: defaultRemains,
    items: defaultItemGrid,
    obtainedItems: items,
    chests: serializeChests(),
    dungeonChests: serializeDungeonChests(),
    tmask: 1,
    mask: 1,
    piece: 1,
    skulls: 1,
    scrubtrade: 1,
    anju: 1,
    gfairy: 1,
    tingle: 1,
    notebook: 1,
    moonitem: 1,
    deity: 1,
    mapscompass: 1,
    skey: 1,
    bkey: 1,
    bosses: 1,
    containers: 1,
    skipnotebook: 1,
}

var cookielock = false;
function loadCookie() {
    if(cookielock) {
        return;
    }
    cookielock = true;

    cookieobj = getCookie();

    Object.keys(cookieDefault).forEach(function(key) {
        if (cookieobj[key] === undefined) {
            cookieobj[key] = cookieDefault[key];
        }
    });

    remains = JSON.parse(JSON.stringify(cookieobj.remains));
    initGridRow(JSON.parse(JSON.stringify(cookieobj.items)));
    items = JSON.parse(JSON.stringify(cookieobj.obtainedItems));
    deserializeChests(JSON.parse(JSON.stringify(cookieobj.dungeonChests)));
    deserializeDungeonChests(JSON.parse(JSON.stringify(cookieobj.dungeonChests)));

    updateGridItemAll();

    document.getElementsByName('showmap')[0].checked = !!cookieobj.map;
    document.getElementsByName('showmap')[0].onchange();
    document.getElementsByName('itemdivsize')[0].value = cookieobj.iZoom;
    document.getElementsByName('itemdivsize')[0].onchange();
    document.getElementsByName('mapdivsize')[0].value = cookieobj.mZoom;
    document.getElementsByName('mapdivsize')[0].onchange();

    document.getElementsByName('mapposition')[cookieobj.mPos].click();

    //Item Settings
    document.getElementsByName('transformmasklogic')[0].checked = !!cookieobj.tmask;
    document.getElementsByName('transformmasklogic')[0].onchange();
    document.getElementsByName('maskslogic')[0].checked = !!cookieobj.mask;
    document.getElementsByName('maskslogic')[0].onchange();
    document.getElementsByName('piecelogic')[0].checked = !!cookieobj.piece;
    document.getElementsByName('piecelogic')[0].onchange();
    document.getElementsByName('skullslogic')[0].checked = !!cookieobj.skulls;
    document.getElementsByName('skullslogic')[0].onchange();
    document.getElementsByName('scrubtradelogic')[0].checked = !!cookieobj.scrubtrade;
    document.getElementsByName('scrubtradelogic')[0].onchange();
    document.getElementsByName('anjulogic')[0].checked = !!cookieobj.anju;
    document.getElementsByName('anjulogic')[0].onchange();
    document.getElementsByName('greatfairylogic')[0].checked = !!cookieobj.gfairy;
    document.getElementsByName('greatfairylogic')[0].onchange();
    document.getElementsByName('tinglelogic')[0].checked = !!cookieobj.tingle;
    document.getElementsByName('tinglelogic')[0].onchange();
    document.getElementsByName('notebooklogic')[0].checked = !!cookieobj.notebook;
    document.getElementsByName('notebooklogic')[0].onchange();
    document.getElementsByName('moonitemlogic')[0].checked = !!cookieobj.moonitem;
    document.getElementsByName('moonitemlogic')[0].onchange();
    document.getElementsByName('deitylogic')[0].checked = !!cookieobj.deity;
    document.getElementsByName('deitylogic')[0].onchange();

    //Dungeon Settings
    document.getElementsByName('mapslogic')[0].checked = !!cookieobj.mapscompass;
    document.getElementsByName('mapslogic')[0].onchange();
    document.getElementsByName('smallkeylogic')[0].checked = !!cookieobj.skey;
    document.getElementsByName('smallkeylogic')[0].onchange();
    document.getElementsByName('bigkeylogic')[0].checked = !!cookieobj.bkey;
    document.getElementsByName('bigkeylogic')[0].onchange();
    document.getElementsByName('remainslogic')[0].checked = !!cookieobj.bosses;
    document.getElementsByName('remainslogic')[0].onchange();
    document.getElementsByName('containerlogic')[0].checked = !!cookieobj.containers;
    document.getElementsByName('containerlogic')[0].onchange();

    //Tricks and Logic Settings
    document.getElementsByName('skipbombers')[0].checked = !!cookieobj.skipnotebook;
    document.getElementsByName('skipbombers')[0].onchange();

    cookielock = false;
}

function saveCookie() {
    if (cookielock) {
        return;
    }

    cookielock = true;

    cookieobj = {};

    cookieobj.map = document.getElementsByName('showmap')[0].checked ? 1 : 0;
    cookieobj.iZoom = document.getElementsByName('itemdivsize')[0].value;
    cookieobj.mZoom = document.getElementsByName('mapdivsize')[0].value;

    cookieobj.mPos = document.getElementsByName('mapposition')[1].checked ? 1 : 0;

    cookieobj.remains = JSON.parse(JSON.stringify(remains));
    cookieobj.items = JSON.parse(JSON.stringify(itemLayout));
    cookieobj.obtainedItems = JSON.parse(JSON.stringify(items));
    cookieobj.chests = JSON.parse(JSON.stringify(serializeChests()));
    cookieobj.dungeonChests = JSON.parse(JSON.stringify(serializeDungeonChests()));

    //Item Settings
    cookieobj.tmask = document.getElementsByName('transformmasklogic')[0].checked ? 1 : 0;
    cookieobj.mask = document.getElementsByName('maskslogic')[0].checked ? 1 : 0;
    cookieobj.piece = document.getElementsByName('piecelogic')[0].checked ? 1 : 0;
    cookieobj.skulls = document.getElementsByName('skullslogic')[0].checked ? 1 : 0;
    cookieobj.scrubtrade = document.getElementsByName('scrubtradelogic')[0].checked ? 1 : 0;
    cookieobj.anju = document.getElementsByName('anjulogic')[0].checked ? 1 : 0;
    cookieobj.gfairy = document.getElementsByName('greatfairylogic')[0].checked ? 1 : 0;
    cookieobj.tingle = document.getElementsByName('tinglelogic')[0].checked ? 1 : 0;
    cookieobj.notebook = document.getElementsByName('notebooklogic')[0].checked ? 1 : 0;
    cookieobj.moonitem = document.getElementsByName('moonitemlogic')[0].checked ? 1 : 0;
    cookieobj.deity = document.getElementsByName('deitylogic')[0].checked ? 1 : 0;

    //Dungeon Settings
    cookieobj.mapscompass = document.getElementsByName('mapslogic')[0].checked ? 1 : 0;
    cookieobj.skey = document.getElementsByName('smallkeylogic')[0].checked ? 1 : 0;
    cookieobj.bkey = document.getElementsByName('bigkeylogic')[0].checked ? 1 : 0;
    cookieobj.bosses = document.getElementsByName('remainslogic')[0].checked ? 1 : 0;
    cookieobj.containers = document.getElementsByName('containerlogic')[0].checked ? 1 : 0;

    //Tricks and Logic Settings
    cookieobj.skipnotebook = document.getElementsByName('skipbombers')[0].checked ? 1 : 0;

    setCookie(cookieobj);
    cookielock = false;
}

function serializeChests() {
    return chests.map(chest => chest.isOpened || false);
}

function serializeDungeonChests() {
    return dungeons.map(dungeon => Object.values(dungeon.chestlist).map(chest => chest.isOpened || false));
}

function deserializeChests() {
    for (var i = 0; i < chests.length; i++) {
        chests[i].isOpened = serializedChests[i];
        refreshChest(i);
    }
}

function deserializeDungeonChests() {
    for (var i = 0; i < dungeons.length; i++) {
        var dungeon = dungeons[i];
        var serializedDungeon = serializedDungeons[i];
        var chestNames = Object.keys(dungeon.chestlist);
        for (var j = 0; j > chestNames.length; j++) {
            dungeon.chestlist[chestNames[j]].isOpened = serializedDungeon[j];
        }
    }
}

//when clicking on a chest
function toggleChest(x) {
    chests[x].isOpened = !chests[x].isOpened;
    refreshChest(x);
    saveCookie();
}

function refreshChest(x) {
    var stateClass = chests[x].isOpened ? 'opened' : chests[x].isAvailable();
    document.getElementById(x).className = 'mapspan chest ' + stateClass;
}

//highlights a chest location
function highlight(x) {
    document.getElementById(x).style.backgroundImage = 'url(images/highlighted.png)';
}

function unhighlight(x) {
    document.getElementById(x).style.backgroundImage = 'url(images/poi.png)';
}

//highlights a dungeon chest location
function highlightDungeon(x) {
    document.getElementById('dungeon' + x).style.backgroundImage = 'url(images/highlighted.png)';
}

function unhighlightDungeon(x) {
    document.getElementById('dungeon' + x).style.backgroundImage = 'url(images/poi.png)';
}

function clickDungeon(d) {
    document.getElementById('dungeon' + dungeonSelect).style.backgroundImage = 'url(images/poi.png)';
    dungeonSelect = 0;
    document.getElementById('dungeon' + dungeonSelect).style.backgroundImage = 'url(images/highlighted.png)';

    document.getElementById('submaparea').innerHTML = dungeons[dungeonSelect].name;
    document.getElementById('submaparea').className = 'DC' + dungeons[dungeonSelect].isBeatable();
    var DClist = document.getElementById('submaplist');
    DClist.innerHTML = '';

    for (var key in dungeons[dungeonSelect].chestlist) {
        var s = document.createElement('li');
        s.innerHTML = key;

        if (dungeons[dungeonSelect].chestlist[key].isOpened()) {
            s.className = "DCopened";
        } 
        else if (dungeons[dungeonSelect].chestlist[key].isAvailable()) {
            s.className = "DCavailable";
        }
        else {
            s.className = "DCunavailable";
        }

        s.onclick = new Function('toggleDungeonChest(this,' + dungeonSelect + ',"' + key + '")');
        s.onmouseover = new Function('highlightDungeonChest(this');
        s.onmouseout = new Function('unhighlightDungeonChest(this');
        s.style.cursor = "pointer";

        DClist.appendChild(s);
    }
}

function toggleDungeonChest(sender, d, c) {
    dungeons[d].chestlist[c].isOpened = !dungeons[d].chestlist[c].isOpened;
    if (dungeons[d].chestlist[c].isOpened) {
        sender.className = 'DCopened';
    }
    else if (dungeons[d].chestlist[c].isAvailable) {
        sender.className = 'DCavailable';
    }
    else {
        sender.className = 'DCunavailable';
    }

    updateMap();
    saveCookie();
}

function highlightDungeonChest(x) {
    x.style.backgroundColor = '#282828';
}

function unhighlightDungeonChest(x) {
    x.style.backgroundColor = '';
}

function setOrder(H) {
    if (H) {
        document.getElementById('layoutdiv').classList.remove('flexcontainer');
    }
    else {
        document.getElementById('layoutdiv').classList.add('flexcontainer');
    }
    saveCookie();
}

function setTransLogic(sender) {
    transformmasklogic = sender.value;
    updateMap();
    saveCookie();
}

function setMaskLogic(sender) {
    maskslogic = sender.value;
    updateMap();
    saveCookie();
}

function setPieceLogic(sender) {
    piecelogic = sender.value;
    updateMap();
    saveCookie();
}

function setSkullsLogic(sender) {
    skullslogic = sender.value;
    updateMap();
    saveCookie();
}

function setScrubTradeLogic(sender) {
    scrubtradelogic = sender.value;
    updateMap();
    saveCookie();
}

function setAnjuLogic(sender) {
    anjulogic = sender.value;
    updateMap();
    saveCookie();
}

function setGFLogic(sender) {
    greatfairylogic = sender.value;
    updateMap();
    saveCookie();
}

function setTingleLogic(sender) {
    tinglelogic = sender.value;
    updateMap();
    saveCookie();
}

function setNotebookLogic(sender) {
    notebooklogic = sender.value;
    updateMap();
    saveCookie();
}

function setMoonItemLogic(sender) {
    moonitemlogic = sender.value;
    updateMap();
    saveCookie();
}

function setFDLogic(sender) {
    deitylogic = sender.value;
    updateMap();
    saveCookie();
}

function setMapsLogic(sender) {
    mapslogic = sender.value;
    updateMap();
    saveCookie();
}

function setSmallKeyLogic(sender) {
    smallkeylogic = sender.value;
    updateMap();
    saveCookie();
}

function setBigKeyLogic(sender) {
    bigkeylogic = sender.value;
    updateMap();
    saveCookie();
}

function setRemainsLogic(sender) {
    remainslogic = sender.value;
    updateMap();
    saveCookie();
}

function setContainerLogic(sender) {
    containerlogic = sender.value;
    updateMap();
    saveCookie();
}

function setSkipBombers(sender) {
    if (sender.checked) {
        skipbombers = true;
    }
    else {
        skipbombers = false;
    }
    updateGridItemAll();
}

function setZoom(target, sender) {
    document.getElementById(target).style.zoom = sender.value / 100;
    document.getElementById(target).style.MozTransform = 'scale(' + (sender.value /100) + ')';
    document.getElementById(target).style.MozTransformOrigin = '0 0';
    document.getElementById(target + 'size').innerHTML = (sender.value) + '%';
    saveCookie();
}

function showSettings(sender) {
    if (editmode) {
        var r, c;
        var startdraw = false;
        editmode = false;
        updateGridItemAll();
        showTracker('mapdiv', document.getElementsByName('showmap')[0]);
        document.getElementById('itemconfig').style.display = 'none';
        document.getElementById('rowButtons').style.display = 'none';
        sender.innerHTML = 'Settings';
        saveCookie();
    }
    else {
        var x = document.getElementById('settings');
        if (!x.style.display || x.style.display == 'none') {
            x.style.display = 'initial';
            sender.innerHTML = 'X';
        }
        else {
            x.style.display = 'none';
            sender.innerHTML = 'Settings';
        }
    }
}

function showTracker(target, sender) {
    if (sender.checked) {
        document.getElementById(target).style.display = '';
    }
    else {
        document.getElementById(target).style.display = 'none';
    }
}

function EditMode() {
    var r, c;

    editmode = true;
    updateGridItemAll();
    showTracker('mapdiv', {checked: false});
    document.getElementById('settings').style.display = 'none';
    document.getElementById('itemconfig').style.display = '';
    document.getElementById('rowButtons').style.display = 'flex';
    document.getElementById('settingsbutton').innerHTML = 'Exit Edit Mode';
}

function ResetLayout() {
    initGridRow(defaultItemGrid);
    updateGridItemAll();
}

function ResetTracker() {
    chests.forEach(chest => delete chest.isOpened);
    dungeons.forEach(dungeon => Object.values(dungeon.chestlist).forEach(chest => delete chest.isOpened));
    items = Object.assign({}, baseItems);
    updateGridItemAll();
    updateMap();
    saveCookie();
}

function addItemRow() {
    var sender = document.getElementById('itemdiv');
    var r = itemLayout.length;

    itemGrid[r] = [];
    itemLayout[r] = [];

    itemGrid[r]['row'] = document.createElement('table');
    itemGrid[r]['row'].className = 'tracker';

    itemGrid[r]['tablerow'] = document.createElement('tr');
    itemGrid[r]['tablerow'].appendChild(itemGrid[r]['row']);
    sender.appendChild(itemGrid[r]['tablerow']);

    var tr = document.createElement('tr');
    itemGrid[r]['row'].appendChild(tr);

    itemGrid[r]['addButton'] = document.createElement('button');
    itemGrid[r]['addButton'].innerHTML = "+";
    itemGrid[r]['addButton'].style.backgroundColor = 'green';
    itemGrid[r]['addButton'].style.color = 'white';
    itemGrid[r]['addButton'].onclick = new Function("addItem(" + r + ")");
    itemGrid[r]['row'].appendChild(itemGrid[r]['addbutton']);

    itemGrid[r]['removeButton'] = document.createElement('button');
    itemGrid[r]['removeButton'].innerHTML = "-";
    itemGrid[r]['removeButton'].style.backgroundColor = 'red';
    itemGrid[r]['removeButton'].style.color = 'white';
    itemGrid[r]['removeButton'].onclick = new Function("addItem(" + r + ")");
    itemGrid[r]['row'].appendChild(itemGrid[r]['removeButton']);

    saveCookie();
}

function removeItemRow() {
    var sender = document.getElementById('itemdiv');
    var r = itemLayout.length - 1;

    sender.removeChild(itemGrid[r]['tablerow']);
    itemGrid.splice(r,1);
    itemLayout.splice(r,1);

    saveCookie();
}

