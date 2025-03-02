/*jshint esversion: 6 */
var defaultRemains = {
    OdolwaRemains: 0,
    GohtRemains: 0,
    GyorgRemains: 0,
    TwinmoldRemains: 0
};
var Remains = defaultRemains;
//logic vars
var transformmasklogic = false;
var maskslogic = false;
var piecelogic = false;
var skullslogic = false;
var scrubtradelogic = false;
var anjulogic = false;
var greatfairylogic = false;
var tinglelogic = false;
var notebooklogic = false;
var moonitemlogic = false;
var deitylogic = false;
var mapslogic = false;
var smallkeylogic = false;
var bigkeylogic = false;
var remainslogic = false;
var containerlogic = false;
//trick vars
var skipbombers = false;

var mouseOverItem = false;
var mouseLastOverR;
var mouseLastOverC;
var mouseLastOverCor;

var itemGrid = [];
var itemLayout = [];

var editmode = false;
var selected = {};

var areaSelect = 0;

function setCookie(obj) {
    var d = new Date();
    var expires = "expires=" + d.toUTCString();
    var val = JSON.stringify(obj);
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    document.cookie = "key=" + val + ";" + expires + ";path=/";
}

function getCookie() {
    var name = "key=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
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
    checks: serializeChecks(),
    areaChecks: serializeAreaChecks(),
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
};

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
    deserializeChecks(JSON.parse(JSON.stringify(cookieobj.areaChecks)));
    deserializeAreaChecks(JSON.parse(JSON.stringify(cookieobj.areaChecks)));

    updateGridItemAll();

    document.getElementsByName("showmap")[0].checked = !!cookieobj.map;
    document.getElementsByName("showmap")[0].onchange();
    document.getElementsByName("itemdivsize")[0].value = cookieobj.iZoom;
    document.getElementsByName("itemdivsize")[0].onchange();
    document.getElementsByName("mapdivsize")[0].value = cookieobj.mZoom;
    document.getElementsByName("mapdivsize")[0].onchange();

    document.getElementsByName("mapposition")[cookieobj.mPos].click();

    //Item Settings
    document.getElementsByName("transformmasklogic")[0].checked = !!cookieobj.tmask;
    //document.getElementsByName('transformmasklogic')[0].onchange();
    document.getElementsByName("maskslogic")[0].checked = !!cookieobj.mask;
    //document.getElementsByName("maskslogic")[0].onchange();
    document.getElementsByName("piecelogic")[0].checked = !!cookieobj.piece;
    //document.getElementsByName("piecelogic")[0].onchange();
    document.getElementsByName("skullslogic")[0].checked = !!cookieobj.skulls;
    //document.getElementsByName("skullslogic")[0].onchange();
    document.getElementsByName("scrubtradelogic")[0].checked = !!cookieobj.scrubtrade;
    //document.getElementsByName("scrubtradelogic")[0].onchange();
    document.getElementsByName("anjulogic")[0].checked = !!cookieobj.anju;
    //document.getElementsByName("anjulogic")[0].onchange();
    document.getElementsByName("greatfairylogic")[0].checked = !!cookieobj.gfairy;
    //document.getElementsByName("greatfairylogic")[0].onchange();
    document.getElementsByName("tinglelogic")[0].checked = !!cookieobj.tingle;
    //document.getElementsByName("tinglelogic")[0].onchange();
    document.getElementsByName("notebooklogic")[0].checked = !!cookieobj.notebook;
    //document.getElementsByName("notebooklogic")[0].onchange();
    document.getElementsByName("moonitemlogic")[0].checked = !!cookieobj.moonitem;
    //document.getElementsByName("moonitemlogic")[0].onchange();
    document.getElementsByName("deitylogic")[0].checked = !!cookieobj.deity;
    //document.getElementsByName("deitylogic")[0].onchange();

    //Area Settings
    document.getElementsByName("mapslogic")[0].checked = !!cookieobj.mapscompass;
    //document.getElementsByName("mapslogic")[0].onchange();
    document.getElementsByName("smallkeylogic")[0].checked = !!cookieobj.skey;
    //document.getElementsByName("smallkeylogic")[0].onchange();
    document.getElementsByName("bigkeylogic")[0].checked = !!cookieobj.bkey;
    //document.getElementsByName("bigkeylogic")[0].onchange();
    document.getElementsByName("remainslogic")[0].checked = !!cookieobj.bosses;
    //document.getElementsByName("remainslogic")[0].onchange();
    document.getElementsByName("containerlogic")[0].checked = !!cookieobj.containers;
    //document.getElementsByName("containerlogic")[0].onchange();

    //Tricks and Logic Settings
    document.getElementsByName("skipbombers")[0].checked = !!cookieobj.skipnotebook;
    //document.getElementsByName("skipbombers")[0].onchange();

    cookielock = false;
}

function saveCookie() {
    if (cookielock) {
        return;
    }

    cookielock = true;

    cookieobj = {};

    cookieobj.map = document.getElementsByName("showmap")[0].checked ? 1 : 0;
    cookieobj.iZoom = document.getElementsByName("itemdivsize")[0].value;
    cookieobj.mZoom = document.getElementsByName("mapdivsize")[0].value;

    cookieobj.mPos = document.getElementsByName("mapposition")[1].checked ? 1 : 0;

    cookieobj.remains = JSON.parse(JSON.stringify(remains));
    cookieobj.items = JSON.parse(JSON.stringify(itemLayout));
    cookieobj.obtainedItems = JSON.parse(JSON.stringify(items));
    cookieobj.checks = JSON.parse(JSON.stringify(serializeChecks()));
    cookieobj.areaChecks = JSON.parse(JSON.stringify(serializeAreaChecks()));

    //Item Settings
    cookieobj.tmask = document.getElementsByName("transformmasklogic")[0].checked ? 1 : 0;
    cookieobj.mask = document.getElementsByName("maskslogic")[0].checked ? 1 : 0;
    cookieobj.piece = document.getElementsByName("piecelogic")[0].checked ? 1 : 0;
    cookieobj.skulls = document.getElementsByName("skullslogic")[0].checked ? 1 : 0;
    cookieobj.scrubtrade = document.getElementsByName("scrubtradelogic")[0].checked ? 1 : 0;
    cookieobj.anju = document.getElementsByName("anjulogic")[0].checked ? 1 : 0;
    cookieobj.gfairy = document.getElementsByName("greatfairylogic")[0].checked ? 1 : 0;
    cookieobj.tingle = document.getElementsByName("tinglelogic")[0].checked ? 1 : 0;
    cookieobj.notebook = document.getElementsByName("notebooklogic")[0].checked ? 1 : 0;
    cookieobj.moonitem = document.getElementsByName("moonitemlogic")[0].checked ? 1 : 0;
    cookieobj.deity = document.getElementsByName("deitylogic")[0].checked ? 1 : 0;

    //Area Settings
    cookieobj.mapscompass = document.getElementsByName("mapslogic")[0].checked ? 1 : 0;
    cookieobj.skey = document.getElementsByName("smallkeylogic")[0].checked ? 1 : 0;
    cookieobj.bkey = document.getElementsByName("bigkeylogic")[0].checked ? 1 : 0;
    cookieobj.bosses = document.getElementsByName("remainslogic")[0].checked ? 1 : 0;
    cookieobj.containers = document.getElementsByName("containerlogic")[0].checked ? 1 : 0;

    //Tricks and Logic Settings
    cookieobj.skipnotebook = document.getElementsByName("skipbombers")[0].checked ? 1 : 0;

    setCookie(cookieobj);
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
        for (var j = 0; j > checkNames.length; j++) {
            area.checklist[checkNames[j]].isOpened = serializedArea[j];
        }
    }
}

//when clicking on a check
function toggleCheck(x) {
    checks[x].isOpened = !checks[x].isOpened;
    refreshCheck(x);
    saveCookie();
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
    areaSelect = 0;
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
        else if (areas[areaSelect].checklist[key].isAvailable()) {
            s.className = "DCavailable";
        }
        /*else if (areas[areaSelect].check[key].isCheckable()) {
            s.className = "DChidden";
        }*/
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
    else if (areas[d].checklist[c].isAvailable()) {
        sender.className = "DCavailable";
    }
    /*else if (areas[d].checklist[c].isCheckable()) {
        sender.className = "DChidden";
    }*/
    else {
        sender.className = "DCunavailable";
    }

    updateMap();
    saveCookie();
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
    document.getElementById(target).style.zoom = sender.value / 100;
    document.getElementById(target).style.MozTransform = "scale(" + (sender.value /100) + ")";
    document.getElementById(target).style.MozTransformOrigin = "0 0";
    document.getElementById(target + "size").innerHTML = (sender.value) + "%";
    saveCookie();
}

function showSettings(sender) {
    if (editmode) {
        var r, c;
        var startdraw = false;
        editmode = false;
        updateGridItemAll();
        showTracker("mapdiv", document.getElementsByName("showmap")[0]);
        document.getElementById("itemconfig").style.display = "none";
        document.getElementById("rowButtons").style.display = "none";
        sender.innerHTML = "Options";
        saveCookie();
    }
    else {
        var x = document.getElementById("settings");
        if (!x.style.display || x.style.display == "none") {
            x.style.display = "initial";
            sender.innerHTML = "X";
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
    showTracker("mapdiv", {checked: false});
    document.getElementById("settings").style.display = "none";
    document.getElementById("itemconfig").style.display = "";
    document.getElementById("rowButtons").style.display = 'flex';
    document.getElementById("settingsbutton").innerHTML = "Exit Edit Mode";
}

function ResetLayout() {
    initGridRow(defaultItemGrid);
    updateGridItemAll();
}

function ResetTracker() {
    checks.forEach(check => delete check.isOpened);
    areas.forEach(area => Object.values(area.checklist).forEach(check => delete check.isOpened));
    items = Object.assign({}, baseItems);
    updateGridItemAll();
    updateMap();
    saveCookie();
}

function addItemRow() {
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

    saveCookie();
}

function removeItemRow() {
    var sender = document.getElementById("itemdiv");
    var r = itemLayout.length - 1;

    sender.removeChild(itemGrid[r].tablerow);
    itemGrid.splice(r,1);
    itemLayout.splice(r,1);

    saveCookie();
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
    itemGrid[r][i][0].onmouseover = new Function("setMOver(" + r + "," + i + ",0)");
    itemGrid[r][i][0].onmouseout = new Function("setMOff()");
    itemGrid[r][i][0].onclick = new Function("gridItemClick(" + r + "," + i + ",0)");
    tdtr1.appendChild(itemGrid[r][i][0]);
    itemGrid[r][i][1] = document.createElement("th");
    itemGrid[r][i][1].className = "corner";
    itemGrid[r][i][1].onmouseover = new Function("setMOver(" + r + "," + i + ",1)");
    itemGrid[r][i][1].onmouseout = new Function("setMOff()");
    itemGrid[r][i][1].onclick = new Function("gridItemClick(" + r + "," + i + ",1)");
    tdtr1.appendChild(itemGrid[r][i][1]);

    var tdtr2 = document.createElement("tr");
    tdt.appendChild(tdtr2);
    itemGrid[r][i][2] = document.createElement("th");
    itemGrid[r][i][2].className = "corner";
    itemGrid[r][i][2].onmouseover = new Function("setMOver(" + r + "," + i + ",2)");
    itemGrid[r][i][2].onmouseout = new Function("setMOff()");
    itemGrid[r][i][2].onclick = new Function("gridItemClick(" + r + "," + i + ",2)");
    tdtr2.appendChild(itemGrid[r][i][2]);
    itemGrid[r][i][3] = document.createElement("th");
    itemGrid[r][i][3].className = "corner";
    itemGrid[r][i][3].onmouseover = new Function("setMOver(" + r + "," + i + ",3)");
    itemGrid[r][i][3].onmouseout = new Function("setMOff()");
    itemGrid[r][i][3].onclick = new Function("gridItemClick(" + r + "," + i + ",3)");
    tdtr1.appendChild(itemGrid[r][i][3]);

    updateGridItem(r, i);
    saveCookie();
}

function removeItem(r) {
    var i = itemLayout[r].length - 1;
    if (i < 0) {
        return;
    }
    itemGrid[r]['row'].removeChild(itemGrid[r][i].item);
    itemGrid[r].splice(i, 1);
    itemLayout[r].splice(i, 1);
    saveCookie();
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
        itemGrid[row][index][3].style.backgroundImage = "";
    }
}

function updateGridItemAll() {
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

function initGridRow(itemsets) {
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

function setMOver(row, col, corner) {
    //keep track of what was moused over
    mouseLastOverCor = corner;
    mouseLastOverR = row;
    mouseLastOverC = col;
    mouseOverItem = true;
}

function setMOff() {
    mouseOverItem = false;
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
    saveCookie();
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
    saveCookie();
}

function updateMap() {
    for (k = 0; k < checks.length; k++) {
        if(!checks[k].isOpened) {
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
            else if (areas[areaSelect].checklist[itemlist[item].innerHTML].isAvailable()) {
                itemlist[item].className = "DCavailable";
            }
            /*else if (areas[areaSelect].checklist[itemlist[item].innerHTML].isCheckable()) {
                itemlist[item].className = "DChidden";
            }*/
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
        else if (areas[areaSelect].checklist[key1].isAvailable()) {
            length.className = "DCavailable";
        }
        /*else if (areas[areaSelect].checklist[key1].isCheckable()) {
            length.className = "DChidden";
        }*/
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

function init() {
    populateMapDiv();
    populateItemConfig();
    loadCookie();
    saveCookie();
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