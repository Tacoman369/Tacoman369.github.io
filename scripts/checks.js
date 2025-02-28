function generalCanGetCheck(checklist) {
    var canGet = 0;
    var unopened = 0;
    for (var key in checklist) {
        if (checklist.hasOwnProperty(key)) {
            if (!checklist[key].isOpened) {
                unopened++;
            }
            if (!checklist[key].isOpened && checklist[key].isAvailable()) {
                canGet++;   
            }
        }
    }
    if (unopened == 0) {
        return "opened";
    }
    if (canGet == unopened) {
        return "available";
    }
    if (canGet = 0) {
        return "unavailable";
    }
    return "possible";
}

function canPlay(song) {
    return (song && items.Ocarina);
}