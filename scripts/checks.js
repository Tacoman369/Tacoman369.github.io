/*eslint strict: ["error", "never"]*/
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
            /*if (checklist[key].isCheckable(key)){
                checkable++;
            }*/
        }
    }
    if (unopened == 0) {
        return "opened";
    }
    if (canGet == unopened) {
        return "available";
    }
    if (canGet == 0) {
        return "unavailable";
    }
    /*
    if (checkable == 1)
    {
        return "hidden";
    }*/
    return "possible";
}
/*
function isCheckable(key) {
    return (key.hasOwnProperty(transformmasklogic) || key.hasOwnProperty(maskslogic) || key.hasOwnProperty(piecelogic) ||
            key.hasOwnProperty(skullslogic) || key.hasOwnProperty(scrubtradelogic) || key.hasOwnProperty(anjulogic) ||
            key.hasOwnProperty(greatfairylogic) || key.hasOwnProperty(tinglelogic) || key.hasOwnProperty(notebooklogic) ||
            key.hasOwnProperty(moonitemlogic) || key.hasOwnProperty(deitylogic) || key.hasOwnProperty(mapslogic) || 
            key.hasOwnProperty(smallkeylogic) || key.hasOwnProperty(bigkeylogic) || key.hasOwnProperty(remainslogic) || 
            key.hasOwnProperty(containerlogic) );
}*/

function canPlay(song) {
    return (song && quests.Ocarina);
}

function Fighting(){
    return (items.Sword >= 1 || masks.GoronMask || masks.ZoraMask || items.GreatFairySword); 
}

function HasBottle() {
    return (items.RedPotion || items.GoldDust || items.Milk || items.ChateauRomani || items.MysteryMilk || (items.EmptyBottle >= 1));
}

function HasRangeAttack() {
    return ((masks.DekuMask && items.Magic >=1) || masks.ZoraMask || (items.Bow >=1) || items.Hookshot);
}

function HasExplosives() {
    return items.Bomb >= 1 || masks.BlastMask;
}

function CanUse(item) {
    if (item == items.LensOfTruth) { return (items.LensOfTruth && items.Magic >= 1); }
    else if (item == masks.GiantMask) { return (masks.GiantMask && items.Magic >= 1); }
    else if (item == items.FireArrow) { return (items.FireArrow && items.Magic >= 1 && items.Bow >= 1);}
    else if (item == items.IceArrow) { return (items.IceArrow && items.Magic >= 1 && items.Bow >= 1);}
    else if (item == items.LightArrow) { return (items.LightArrow && items.Magic >= 1 && items.Bow >= 1);}
    else { return item;}
}

function CanGetToDekuPalace() {
    return masks.DekuMask && (HasBottle() || HasRangeAttack());
}

function WoodfallClear() {
    return (items.Bow >= 1 && dungeons.SwampSmallKey >=1 && dungeons.SwampBigKey && Fighting() && masks.DekuMask && canPlay(quests.SonataOfAwakening));
}

function SnowheadClear() {
    return (items.Bow >= 1 && masks.GoronMask && dungeons.SnowSmallKey >= 3 && items.FireArrow && items.Magic >= 1 && HasExplosives() && canPlay(quests.GoronLullaby) && dungeons.SnowBigKey && Fighting() && items.LensOfTruth);
}

function BayClear() {
    return (items.Bow >= 1 && masks.ZoraMask && dungeons.OceanSmallKey >= 1 && dungeons.OceanBigKey && items.IceArrow && items.Magic >= 1 && canPlay(quests.NewWaveBossaNova) && Fighting() && canPlay(quests.EponasSong) && items.Hookshot);
}

function StoneClear() {
    return (EnterStoneTower() && dungeons.StoneSmallKey >= 3 && CanUse(items.LightArrow) && dungeons.StoneBigKey && masks.GiantMask);
}

function EnterWoodfallTemple() {
    return (canPlay(quests.SonataOfAwakening) && masks.DekuMask && HasRangeAttack() && Fighting());
}

function EnterSnowheadTemple() {
    return (canPlay(quests.GoronLullaby) && masks.GoronMask && CanUse(items.LensOfTruth));
}

function EnterGreatBayTemple() {
    return (canPlay(quests.EponasSong) && items.Hookshot && masks.ZoraMask && dungeons.ZoraEgg >= 7 && items.Magic >= 1);
}

function EnterIkana() {
    return (canPlay(quests.EponasSong) && (masks.GaroMask || masks.GibdoMask) && items.Hookshot && CanUse(items.IceArrow));
}

function EnterStoneTower() {
    return (EnterIkana() && masks.ZoraMask && masks.GoronMask && canPlay(quests.ElegyOfEmptiness));
}

function EnterIkanaCastle() {
    return (EnterIkana() && (HasBottle() && masks.GibdoMask && CanUse(items.FireArrow)) || items.Shield > 2 || CanUse(items.LightArrow));
}

function EnterMoon() {
    return dungeons.OdolwaRemains && dungeons.GohtRemains && dungeons.GyorgRemains && dungeons.TwinmoldRemains && canPlay(quests.OathToOrder);
}


function TotalMasks(total) {
    var TotalMasks = 0;
    if (masks.KeatonMask)       {TotalMasks++;}
    if (masks.BunnyHood)        {TotalMasks++;}
    if (masks.PostmanHat)       {TotalMasks++;}
    if (masks.AllNightMask)     {TotalMasks++;}
    if (masks.BlastMask)        {TotalMasks++;}
    if (masks.StoneMask)        {TotalMasks++;}
    if (masks.GreatFairyMask)   {TotalMasks++;}
    if (masks.BremenMask)       {TotalMasks++;}
    if (masks.DonGeroMask)      {TotalMasks++;}
    if (masks.MaskOfScents)     {TotalMasks++;}
    if (masks.RomaniMask)       {TotalMasks++;}
    if (masks.TroupeLeaderMask) {TotalMasks++;}
    if (masks.KafeiMask)        {TotalMasks++;}
    if (masks.CouplesMask)      {TotalMasks++;}
    if (masks.MaskOfTruth)      {TotalMasks++;}
    if (masks.KamaroMask)       {TotalMasks++;}
    if (masks.GibdoMask)        {TotalMasks++;}
    if (masks.GaroMask)         {TotalMasks++;}
    if (masks.CaptainsHat)      {TotalMasks++;}
    if (masks.GiantMask)        {TotalMasks++;}
    if (masks.FierceDeityMask)  {TotalMasks++;}
    
    if (TotalMasks >= total) {return true;}
    return false;
}

var areas = [
    {
        name: "North Clock Town",
        x: "50.0%",
        y: "45.0%",
        checklist: {
            'Keaton Quiz': { 
                isAvailable: function() { return masks.KeatonMask;}, 
                isLogic: function() { return piecelogic;}, 
            },
            'Tree HP': { 
                isAvailable: function() { return piecelogic;}, 
                isLogic: function() { return piecelogic;},
            },
            'Old Lady': { 
                isAvailable: function() { return Fighting();},
                isLogic: function() { return maskslogic;},
            },
            'Tingle Clock Town Map': { 
                isAvailable: function() {return tinglelogic;},
                isLogic: function() { return tinglelogic;},
            },
            'Tingle Woodfall Map': { 
                isAvailable: function() {return tinglelogic;},
                isLogic: function() { return tinglelogic;},
            },
            'Postbox': { 
                isAvailable: function() {return masks.PostmanHat;},
                isLogic: function() { return piecelogic;},
            },
            'Deku Playground (all 3 days)': { 
                isAvailable: function() {return masks.DekuMask;},
                isLogic: function() { return piecelogic;},
            },
            'Clock Town Fairy (Deku)': { 
                isAvailable: function() { return masks.DekuMask && dungeons.TownStrayFairy;},
                isLogic: function() { return greatfairylogic;}, 
            },
            'Clock Town Fairy (Human)': { 
                isAvailable: function() { return dungeons.TownStrayFairy;},
                isLogic: function() { return greatfairylogic;}, 
            },
        },
        isBeatable: function() {
            if (masks.KeatonMask && masks.PostmanHat && masks.DekuMask) {
                if (this.canGetCheck() == 'available') {
                    return 'available';
                }
                return 'possible';
            }
            else {
                return 'unavailable';
            }
        },
        canGetCheck: function() {
            return generalCanGetCheck(this.checklist);
        },
    },
    {
        name: "East Clock Town",
        x: "47%",
        y: "50%",
        checklist: {
            'Chest': { 
                isAvailable: function() { return true;}, 
                isLogic: function() { return true;},
            },
            'Postbox': { 
                isAvailable: function() { return masks.PostmanHat;},
                isLogic: function() { return piecelogic;},
            },
            'Postman Freedom': { 
                isAvailable: function() { return quests.LetterToMama;},
                isLogic: function() { return anjulogic;},
            },
            'Gorman at Bar': { 
                isAvailable: function() { return masks.RomaniMask && masks.DekuMask && masks.GoronMask && masks.ZoraMask && quests.Ocarina;},
                isLogic: function() { return piecelogic;},
            },
            'Aroma at Bar': { 
                isAvailable: function() { return quests.LetterToMama && masks.KafeiMask;},
                isLogic: function() { return maskslogic;},
            },
            'Honey & Darling (3 Days)': { 
                isAvailable: function() { return (items.Bow >=1) && (items.Bomb >=1);},
                isLogic: function() { return piecelogic;},
            },
            'Treasure Chest Game': { 
                isAvailable: function() { return masks.GoronMask;},
                isLogic: function() { return piecelogic;},
            },
            'Archery 1': { 
                isAvailable: function() { return items.Bow >= 1;},
                isLogic: function() { return true;},
            },
            'Archery 2': { 
                isAvailable: function() { return items.Bow >= 1;},
                isLogic: function() { return piecelogic;},
            },
            'Mayor Reward': { 
                isAvailable: function() { return masks.CouplesMask;},
                isLogic: function() { return piecelogic;},
            },
            'Aroma in Office': { 
                isAvailable: function() { return true;},
                isLogic: function() { return maskslogic;},
            },
        },
        isBeatable: function() {
            return this.canGetCheck();
        },
        canGetCheck: function() {
            return generalCanGetCheck(this.checklist);
        },
    },
    {
        name: "StockPotInn",
        x: "47%",
        y: "45%",
        checklist: {
            'Reservation': { isAvailable: function() { return masks.GoronMask && anjulogic;}, },
            'Toilet Hand': { isAvailable: function() { return (quests.LetterToMama || quests.LetterToKafei || quests.LandDeed || quests.SwampDeed || quests.MountainDeed || quests.OceanDeed) && piecelogic;}, },
            'Guest Room Chest': { isAvailable: function() { return quests.RoomKey;}, },
            'Staff Room Chest': { isAvailable: function() { return true;}, },
            'Midnight Meeting': { isAvailable: function() { return masks.KafeiMask && (masks.DekuMask || quests.RoomKey) && anjulogic;}, },
            'Anju and Kafei': { isAvailable: function() { return masks.KafeiMask && quests.LetterToKafei && quests.PendantOfMemories && canPlay(quests.EponasSong) && (masks.GaroMask || masks.GibdoMask) && items.Hookshot && Fighting() && anjulogic;}, },
            'Grandma Short Story': { isAvailable: function() { return masks.AllNightMask && piecelogic;}, },
            'Grandma Long Story': { isAvailable: function() { return masks.AllNightMask && piecelogic;}, },
        },
        isBeatable: function() {
            return this.canGetCheck();
        },
        canGetCheck: function() {
            return generalCanGetCheck(this.checklist);
        },
    },
    {
        name: "West Clock Town",
        x: "53%",
        y: "50%",
        checklist: {
            'Rosa Sisters': { isAvailable: function() { return masks.KamaroMask;}, },
            'Swordsman School': { isAvailable: function() { return items.Sword >= 1;}, },
            'Postman Game': { isAvailable: function() { return masks.BunnyHood;}, },
            'All Night Mask': { isAvailable: function() { return items.Wallet >= 2;}, },
            'Bomb Bag': { isAvailable: function() { return true;}, },
            'Big Bomb Bag': { isAvailable: function() { return Fighting();}, },
        },
        isBeatable: function() {
           return this.canGetCheck();
        },
        canGetCheck: function() {
            return generalCanGetCheck(this.checklist);
        },
    },
    {
        name: "South Clock Town",
        x: "50%",
        y: "55%",
        checklist: {
            'Scrub Trade': { isAvailable: function() { return scrubtradelogic && quests.MoonsTear;}, },
            'Postbox': { isAvailable: function() { return masks.PostmanHat;}, },
            'Clock Tower HP': { isAvailable: function() { return true;}, },
            'Straw Roof Chest': { isAvailable: function() { return items.Hookshot || (masks.DekuMask && quests.MoonsTear);}, },
            'Final Day Chest': { isAvailable: function() { return items.Hookshot || (masks.DekuMask && quests.MoonsTear);}, },
            'Bank 1': { isAvailable: function() { return true;}, },
            'Bank 2': { isAvailable: function() { return items.Wallet >=1;}, },
            'Bank 3': { isAvailable: function() { return items.Wallet >=2;}, },
        },
        isBeatable: function() {
            return this.canGetCheck();
        },
        canGetCheck: function() {
            return generalCanGetCheck(this.checklist);
        },
    },
    {
        name: "Clock Tower",
        x: "50%",
        y: "50%",
        checklist: {
            'Song of Healing': { isAvailable: function() { return true;}, },
            'Deku Mask': { isAvailable: function() { return true;}, },
            'Bombers Notebook': { isAvailable: function() { return true;}, },
        },
        isBeatable: function() {
            return this.canGetCheck();
        },
        canGetCheck: function() {
            return generalCanGetCheck(this.checklist);
        },
    },
    {
        name: "Laundry Pool",
        x: "47%",
        y: "55%",
        checklist: {
            'Keaton Mask': { isAvailable: function() { return quests.LetterToKafei;}, },
            'Pendant of Memories': { isAvailable: function() { return quests.LetterToKafei;}, },
            'Guru Guru': { isAvailable: function() { return true;}, },
            'Stray Fairy': { isAvailable: function() { return true;}, },
            'Kafei': { isAvailable: function() { return quests.LetterToKafei;}, },

        },
        isBeatable: function() {
            return this.canGetCheck();
        },
        canGetCheck: function() {
            return generalCanGetCheck(this.checklist);
        },
    },
    {
        name: "Termina Field",
        x: "53%",
        y: "55%",
        checklist: {
            'Kamaro': { isAvailable: function() { return canPlay(quests.SongOfHealing);}, },
            'Underwater Chest': { isAvailable: function() { return masks.ZoraMask;}, },
            'Grass Chest': { isAvailable: function() { return true;}, },
            'Stump Chest': { isAvailable: function() { return items.Hookshot || (items.MagicBean && HasBottle());}, },
            'Moons Tear': { isAvailable: function() { return masks.DekuMask || (quests.BombersNotebook && HasRangeAttack());}, },
            'Peahat Grotto Chest': { isAvailable: function() { return Fighting();}, },
            'Dodongo Grotto Chest': { isAvailable: function() { return Fighting();}, },
            'BioBaba Grotto HP': { isAvailable: function() { return masks.ZoraMask && (items.Bomb >=1 || masks.GoronMask);}, },
            'Pillar Grotto Chest': { isAvailable: function() { return true;}, },
            'Grass Grotto Chest': { isAvailable: function() { return true;}, },
            'Business Scrub': { isAvailable: function() { return items.Wallet >=1 && masks.DekuMask || (quests.BombersNotebook && HasRangeAttack());}, },
            'Colored Gossip Stones': { isAvailable: function() { return (items.Bomb >=1 || masks.GoronMask) && ((quests.SonataOfAwakening && masks.DekuMask) || (quests.GoronLullaby && masks.GoronMask) || (quests.NewWaveBossaNova && masks.ZoraMask))  ;}, },
        },
        isBeatable: function() {
            return this.canGetCheck();
        },
        canGetCheck: function() {
            return generalCanGetCheck(this.checklist);
        },
    },
    {
        name: "Road to Southern Swamp",
        x: "50%",
        y: "60%",
        checklist: {
            'Tree HP': { isAvailable: function() { return HasRangeAttack() && piecelogic;}, },
            'Tingle Woodfall Map': { isAvailable: function() { return HasRangeAttack() && tinglelogic;}, },
            'Tingle Snowhead Map': { isAvailable: function() { return HasRangeAttack() && tinglelogic;}, },
            'Swamp Archery 1': { isAvailable: function() { return items.Bow >= 1;}, },
            'Swamp Archery 2': { isAvailable: function() { return (items.Bow >=1) && piecelogic;}, },
            'Grotto Chest': { isAvailable: function() { return true;}, },

        },
        isBeatable: function() {
            return this.canGetCheck();
        },
        canGetCheck: function() {
            return generalCanGetCheck(this.checklist);
        },
    },
    {
        name: "Southern Swamp",
        x: "50%",
        y: "65%",
        checklist: {
            'Scrub Trade': { isAvailable: function() { return quests.LandDeed && scrubtradelogic;}, },
            'Scrub Purchase': { isAvailable: function() { return masks.DekuMask;}, },
            'Song of Soaring': { isAvailable: function() { return quests.Ocarina;}, },
            'Tourist Center Roof': { isAvailable: function() { return masks.DekuMask && quests.LandDeed;}, },
            'Koume': { isAvailable: function() { return HasBottle();}, },
            'Pictograph Winner': { isAvailable: function() { return items.PictographBox;}, },
            'Boat Archery': { isAvailable: function() { return WoodfallClear() && HasBottle();}, },
            'Kotake': { isAvailable: function() { return true;}, },
            'Mushroom Sale': { isAvailable: function() { return HasBottle() && masks.MaskOfScents;}, },
            'Spider House Grotto Chest': { isAvailable: function() { return masks.DekuMask && (HasBottle() || (items.Bow >= 1) || ZoraMask || Hookshot || WoodfallClear());}, },
        },
        isBeatable: function() {
            return this.canGetCheck();
        },
        canGetCheck: function() {
            return generalCanGetCheck(this.checklist);
        },
    },
    {
        name: "Deku Palace",
        x: "55%",
        y: "65%",
        checklist: {
            'West Garden HP': { isAvailable: function() { return CanGetToDekuPalace();}, },
            'Imprisoned Monkey': { isAvailable: function() { return CanGetToDekuPalace() && quests.Ocarina && items.MagicBean;}, },
            'Bean Seller': { isAvailable: function() { return CanGetToDekuPalace();}, },
            'Bean Grotto Chest': { isAvailable: function() { return CanGetToDekuPalace() && (items.Hookshot || HasBottle());}, },
            'Butler Race': { isAvailable: function() { return WoodfallClear() && HasBottle();}, },
        },
        isBeatable: function() {
          return this.canGetCheck();
        },
        canGetCheck: function() {
            return generalCanGetCheck(this.checklist);
        },
    },
    {
        name: "Woodfall",
        x: "50%",
        y: "70%",
        checklist: {
            'Entrance Chest': { isAvailable: function() { return CanGetToDekuPalace();}, },
            'Bridge Chest': { isAvailable: function() { return CanGetToDekuPalace() && (Fighting() || HasRangeAttack());}, },
            'Behind Owl Chest': { isAvailable: function() { return CanGetToDekuPalace() && (Fighting() || HasRangeAttack());}, },
        },
        isBeatable: function() {
            return this.canGetCheck();
        },
        canGetCheck: function() {
            return generalCanGetCheck(this.checklist);
        },
    },
    {
        name: "Mountain Village",
        x: "50%",
        y: "35%",
        checklist: {
            'Frog Choir': { isAvailable: function() { return WoodfallClear() && SnowheadClear() && BayClear() && masks.DonGeroMask  && piecelogic;}, },
            'Hungry Goron': { isAvailable: function() { return masks.GoronMask && items.Magic >= 1 && items.Bow >=1 && HasExplosives() && piecelogic;}, },
            'Waterfall Chest': { isAvailable: function() { return SnowheadClear() && CanUse(items.LensOfTruth);}, },
            'Darmani': { isAvailable: function() { return CanUse(items.LensOfTruth) && canPlay(quests.SongOfHealing) && items.Bow >= 1 && HasExplosives() && transformmasklogic;}, },
            'Smith Day 1': { isAvailable: function() { return HasExplosives() && items.Wallet >=1 && items.Sword >= 1 && (CanUse(items.FireArrow) || SnowheadClear() || (HasBottle() && CanUse(items.LensOfTruth))) ;}, },
            'Smith Day 2': { isAvailable: function() { return HasExplosives() && items.GoldDust && items.Wallet >=1 && items.Sword >= 1 && ((CanUse(items.FireArrow)) || SnowheadClear() || (HasBottle() && CanUse(items.LensOfTruth)));}, },
            'Spring Water Grotto Chest': { isAvailable: function() { return SnowheadClear();}, },
        },
        isBeatable: function() {
           return this.canGetCheck();
        },
        canGetCheck: function() {
            return generalCanGetCheck(this.checklist);
        },
    },
    {
        name: "Twin Islands",
        x: "55%",
        y: "33%",
        checklist: {
            'Underwater Ramp Chest': { isAvailable: function() { return SnowheadClear() && masks.ZoraMask;}, },
            'Cave Chest': { isAvailable: function() { return SnowheadClear() && masks.ZoraMask;}, },
            'Lullaby Intro': { isAvailable: function() { return HasExplosives() && masks.GoronMask && (HasBottle() || CanUse(items.FireArrow));}, },
            'Tingle Snowhead Map': { isAvailable: function() { return items.Bow >= 1 && HasExplosives() && tinglelogic;}, },
            'Tingle Romani Ranch Map': { isAvailable: function() { return items.Bow >= 1 && HasExplosives() && tinglelogic;}, },
            'Goron Race': { isAvailable: function() { return SnowheadClear();}, },
            'Racetrack Grotto Chest': { isAvailable: function() { return HasExplosives() && masks.MaskOfTruth && ((items.Hookshot && canPlay(quests.ScarecrowSong) || GoronMask));}, },
            'Hot Spring Water Grotto Chest': { isAvailable: function() { return HasExplosives() && ((HasBottle() && CanUse(items.LensOfTruth)) || CanUse(items.FireArrow) || SnowheadClear());}, },
        },
        isBeatable: function() {
            return this.canGetCheck();
        },
        canGetCheck: function() {
            return generalCanGetCheck(this.checklist);
        },
    },
    {
        name: "Goron Village",
        x: "60%",
        y: "25%",
        checklist: {
            'Powder Keg Challenge': { isAvailable: function() { return HasExplosives() && masks.GoronMask && (SnowheadClear() || CanUse(items.FireArrow));}, },
            'Scrub Purchase': { isAvailable: function() { return HasExplosives() && items.Wallet >= 1 && masks.GoronMask && items.Bomb >= 2;}, },
            'Scrub Trade': { isAvailable: function() { return HasExplosives() && masks.DekuMask && quests.SwampDeed && scrubtradelogic;}, },
            'Ledge HP': { isAvailable: function() { return HasExplosives() && masks.DekuMask && quests.SwampDeed && piecelogic;}, },
            'Lens Cave Chest': { isAvailable: function() { return HasExplosives() && CanUse(items.LensOfTruth);}, },
            'Lens Cave Rock Chest': { isAvailable: function() { return HasExplosives();}, },
            'Lens Cave Lens Chest': { isAvailable: function() { return HasExplosives();}, },
            'Goron Lullaby': { isAvailable: function() { return HasExplosives() && masks.GoronMask && ((HasBottle() && CanUse(items.LensOfTruth)) || CanUse(items.FireArrow));}, },
        },
        isBeatable: function() {
            return this.canGetCheck();
        },
        canGetCheck: function() {
            return generalCanGetCheck(this.checklist);
        },
    },
    {
        name: "Milk Road",
        x: "43%",
        y: "55%",
        checklist: {
            'Tingle Milk Road Map': { isAvailable: function() { return HasRangeAttack() && tinglelogic;}, },
            'Tingle Great Bay Map': { isAvailable: function() { return HasRangeAttack() && tinglelogic;}, },
            'Gorman Race': { isAvailable: function() { return canPlay(quests.EponasSong);}, },
            'Mystery Milk': { isAvailable: function() { return HasBottle();}, },
        },
        isBeatable: function() {
            return this.canGetCheck();
        },
        canGetCheck: function() {
            return generalCanGetCheck(this.checklist);
        },
    },
    {
        name: "Romani Ranch",
        x: "40%",
        y: "60%",
        checklist: {
            'Alien Defense': { isAvailable: function() { return items.PowderKeg && masks.GoronMask && items.Bow >= 1;}, },
            'Cremia Escort': { isAvailable: function() { return items.PowderKeg && masks.GoronMask && items.Bow >= 1 && piecelogic;}, },
            'Romanis Game': { isAvailable: function() { return items.PowderKeg && masks.GoronMask && items.Bow >= 1;}, },
            'Dog Race Winner': { isAvailable: function() { return masks.MaskOfTruth && piecelogic;}, },
            'Doggy Racetrack Chest': { isAvailable: function() { return items.Hookshot;}, },
            'Grogs Chickens': { isAvailable: function() { return masks.BremenMask && piecelogic;}, },
        },
        isBeatable: function() {
            return this.canGetCheck();
        },
        canGetCheck: function() {
            return generalCanGetCheck(this.checklist);
        },
    },
    {
        name: "Great Bay Coast",
        x: "30%",
        y: "50%",
        checklist: {
            'Fisherman Game': { isAvailable: function() { return BayClear() && piecelogic;}, },
            'Ledge HP': { isAvailable: function() { return canPlay(quests.EponasSong) && items.Hookshot && HasBottle() && items.MagicBean && piecelogic;}, },
            'Mikau': { isAvailable: function() { return canPlay(quests.EponasSong) && canPlay(quests.SongOfHealing) && transformmasklogic;}, },
            'Tingle Great Bay Map': { isAvailable: function() { return canPlay(quests.EponasSong) && HasRangeAttack() && tinglelogic;}, },
            'Tingle Stone Tower Map': { isAvailable: function() { return canPlay(quests.EponasSong) && HasRangeAttack() && tinglelogic;}, },
            'Baby Zoras': { isAvailable: function() { return canPlay(quests.EponasSong) && HasBottle() && dungeons.ZoraEgg >= 7;}, },
            'Lab Fish': { isAvailable: function() { return canPlay(quests.EponasSong) && HasBottle() && piecelogic;}, },
            'Grotto Chest': { isAvailable: function() { return canPlay(quests.EponasSong);}, },
            'Fisherman Photo': { isAvailable: function() { return canPlay(quests.EponasSong) && masks.ZoraMask && items.PictographBox;}, },
        },
        isBeatable: function() {
            return this.canGetCheck();
        },
        canGetCheck: function() {
            return generalCanGetCheck(this.checklist);
        },
    },
    {
        name: "Pinnacle Rock",
        x: "18%",
        y: "48%",
        checklist: {
            'Seahorse HP': { isAvailable: function() { return canPlay(quests.EponasSong) && masks.ZoraMask && dungeons.Seahorse && items.Magic >= 1 && piecelogic;}, },
            'Upper Chest': { isAvailable: function() { return canPlay(quests.EponasSong) && masks.ZoraMask && dungeons.Seahorse && items.Magic >= 1;}, },
            'Lower Chest': { isAvailable: function() { return canPlay(quests.EponasSong) && masks.ZoraMask && dungeons.Seahorse && items.Magic >= 1;}, },
            'Zora Egg 1': { isAvailable: function() { return canPlay(quests.EponasSong) && masks.ZoraMask && dungeons.Seahorse && items.Magic >= 1 && HasBottle();}, },
            'Zora Egg 2': { isAvailable: function() { return canPlay(quests.EponasSong) && masks.ZoraMask && dungeons.Seahorse && items.Magic >= 1 && HasBottle();}, },
            'Zora Egg 3': { isAvailable: function() { return canPlay(quests.EponasSong) && masks.ZoraMask && dungeons.Seahorse && items.Magic >= 1 && HasBottle();}, },
        },
        isBeatable: function() {
           return this.canGetCheck();
        },
        canGetCheck: function() {
            return generalCanGetCheck(this.checklist);
        },
    },
    {
        name: 'Zora Cape',
        x: "28%",
        y: "60%",
        checklist: {
            'Like Like HP': { isAvailable: function() { return canPlay(quests.EponasSong) && masks.ZoraMask && piecelogic;}, },
            'Ledge Chest (No Tree)': { isAvailable: function() { return canPlay(quests.EponasSong) && items.Hookshot;}, },
            'Ledge Chest (Tree)': { isAvailable: function() { return canPlay(quests.EponasSong) && items.Hookshot;}, },
            'Underwater Chest': { isAvailable: function() { return canPlay(quests.EponasSong) && masks.ZoraMask;}, },
            'Beaver Race 1': { isAvailable: function() { return canPlay(quests.EponasSong) && masks.ZoraMask && items.Hookshot && items.Magic >= 1;}, },
            'Beaver Race 2': { isAvailable: function() { return canPlay(quests.EponasSong) && masks.ZoraMask && items.Hookshot && items.Magic >= 1 && piecelogic;}, },
        },
        isBeatable: function() {
            return this.canGetCheck();
        },
        canGetCheck: function() {
            return generalCanGetCheck(this.checklist);
        },
    },
    {
        name: 'Zora Hall',
        x: "25%",
        y: "59%",
        checklist: {
            'Evan HP': { isAvailable: function() { return canPlay(quests.EponasSong) && masks.ZoraMask && piecelogic;}, },
            'Scrub Trade': { isAvailable: function() { return canPlay(quests.EponasSong) && masks.ZoraMask && masks.GoronMask && quests.MountainDeed;}, },
            'Scrub Purchase': { isAvailable: function() { return canPlay(quests.EponasSong) && masks.ZoraMask;}, },
            'Lulu Room HP': { isAvailable: function() { return canPlay(quests.EponasSong) && masks.ZoraMask && masks.GoronMask && quests.MountainDeed && piecelogic;}, },
        },
        isBeatable: function() {
            return this.canGetCheck();
        },
        canGetCheck: function() {
            return generalCanGetCheck(this.checklist);
        },
    },
    {
        name: 'Road To Ikana/Graveyard',
        x: "60%",
        y: "49%",
        checklist: {
            'Road to Ikana Pillar Chest': { isAvailable: function() { return canPlay(quests.EponasSong) && items.Hookshot;}, },
            'Road to Ikana Grotto Chest': { isAvailable: function() { return canPlay(quests.EponasSong) && masks.GoronMask;}, },
            'Captain Keeta Chest': { isAvailable: function() { return canPlay(quests.EponasSong) && canPlay(quests.SonataOfAwakening) && Fighting();}, },
            'Graveyard Grotto Chest': { isAvailable: function() { return canPlay(quests.EponasSong) && HasExplosives() && masks.MaskOfTruth;}, },
            'Day 1 Grave Bats Chest': { isAvailable: function() { return canPlay(quests.EponasSong) && masks.CaptainsHat && Fighting();}, },
            'Day 1 Grave Tablet': { isAvailable: function() { return canPlay(quests.EponasSong) && masks.CaptainsHat && Fighting();}, },
            'Day 2 Iron Knuckle Chest': { isAvailable: function() { return canPlay(quests.EponasSong) && masks.CaptainsHat && Fighting();}, },
            'Dampe Digging': { isAvailable: function() { return canPlay(quests.EponasSong) && masks.CaptainsHat && Fighting();}, },
        },
        isBeatable: function() {
            return this.canGetCheck();
        },
        canGetCheck: function() {
            return generalCanGetCheck(this.checklist);
        },
    },
    {
        name: 'Ikana Canyon',
        x: "70%",
        y: "48%",
        checklist: {
            'Ledge HP': { isAvailable: function() { return EnterIkana() && quests.OceanDeed && masks.DekuMask;}, },
            'Secret Shrine Grotto': { isAvailable: function() { return EnterIkana() && masks.ZoraMask;}, },
            'Scrub Trade': { isAvailable: function() { return EnterIkana() && quests.OceanDeed;}, },
            'Scrub Purchase': { isAvailable: function() { return EnterIkana() && HasBottle() && items.Wallet >= 1;}, },
            'Tingle Stone Tower Map': { isAvailable: function() { return EnterIkana() && HasRangeAttack();}, },
            'Tingle Clock Town Map': { isAvailable: function() { return EnterIkana() && HasRangeAttack();}, },
        },
        isBeatable: function() {
            return this.canGetCheck();
        },
        canGetCheck: function() {
            return generalCanGetCheck(this.checklist);
        },
    },
    {
        name: 'Secret Shrine',
        x: "70%",
        y: "40%",
        checklist: {
            'Dinolfos Chest': { isAvailable: function() { return EnterIkana() && CanUse(items.LightArrow);}, },
            'Wizzrobe Chest': { isAvailable: function() { return EnterIkana() && CanUse(items.LightArrow);}, },
            'Wart Chest': { isAvailable: function() { return EnterIkana() && CanUse(items.LightArrow);}, },
            'Garo Chest': { isAvailable: function() { return EnterIkana() && CanUse(items.LightArrow);}, },
            'Final Chest': { isAvailable: function() { return EnterIkana && CanUse(items.LightArrow);}, },
        },
        isBeatable: function() {
            return this.canGetCheck();
        },
        canGetCheck: function() {
            return generalCanGetCheck(this.checklist);
        },
    },
    {
        name: 'Stone Tower',
        x: "80%",
        y: "42%",
        checklist: {
            'Left Inverted Chest': { isAvailable: function() { return EnterStoneTower() && CanUse(items.LightArrow) && items.MagicBean && (HasBottle() || canPlay(quests.SongOfStorms));}, },
            'Center Inverted Chest': { isAvailable: function() { return EnterStoneTower() && CanUse(items.LightArrow) && items.MagicBean && (HasBottle() || canPlay(quests.SongOfStorms));}, },
            'Right Inverted Chest': { isAvailable: function() { return EnterStoneTower() && CanUse(items.LightArrow) && items.MagicBean && (HasBottle() || canPlay(quests.SongOfStorms));}, },
        },
        isBeatable: function() {
            return this.canGetCheck();
        },
        canGetCheck: function() {
            return generalCanGetCheck(this.checklist);
        },
    },
    {
        name: 'Woodfall Temple',
        x: "47%",
        y: "75%",
        checklist: {
            'Small Key Chest': { isAvailable: function() { return EnterWoodfallTemple();}, },
            'Bow Chest': { isAvailable: function() { return EnterWoodfallTemple() && dungeons.SwampSmallKey >= 1;}, },
            'Boss Key Chest': { isAvailable: function() { return EnterWoodfallTemple() && dungeons.SwampSmallKey >= 1;}, },
            'Map Chest': { isAvailable: function() { return EnterWoodfallTemple();}, },
            'Compass Chest': { isAvailable: function() { return EnterWoodfallTemple();}, },
            'Heart Container': { isAvailable: function() { return EnterWoodfallTemple() && dungeons.SwampSmallKey >= 1 && dungeons.SwampBigKey && items.Bow >= 1;}, },
            'Odolwa Remains': { isAvailable: function() { return EnterWoodfallTemple() && dungeons.SwampSmallKey >= 1 && dungeons.SwampBigKey && items.Bow >= 1;}, },
        },
        isBeatable: function() {
            return this.canGetCheck();
        },
        canGetCheck: function() {
            return generalCanGetCheck(this.checklist);
        },
    },
    {
        name: 'Snowhead Temple',
        x: "46%",
        y: "19%",
        checklist: {
            'Bridge Room Frozen Chest': { isAvailable: function() { return EnterSnowheadTemple() && CanUse(items.FireArrow);}, },
            'Map Chest': { isAvailable: function() { return EnterSnowheadTemple();}, },
            'Compass Chest': { isAvailable: function() { return EnterSnowheadTemple() && dungeons.SnowSmallKey >= 1;}, },
            'Double Block Room Chest': { isAvailable: function() { return EnterSnowheadTemple();}, },
            'Icicle Room Chest': { isAvailable: function() { return EnterSnowheadTemple() && dungeons.SnowSmallKey >= 1;}, },
            'Fire Arrow Chest': { isAvailable: function() { return EnterSnowheadTemple() && dungeons.SnowSmallKey >= 2;}, },
            'Boss Key Chest': { isAvailable: function() { return EnterSnowheadTemple() && dungeons.SnowSmallKey >= 3;}, },
            'Goht Remains': { isAvailable: function() { return EnterSnowheadTemple() && dungeons.SnowSmallKey >= 3 && dungeons.SnowBigKey && CanUse(items.FireArrow);}, },
            'Heart Container': { isAvailable: function() { return EnterSnowheadTemple() && dungeons.SnowSmallKey >= 3 && dungeons.SnowBigKey && CanUse(items.FireArrow);}, },
        },
        isBeatable: function() {
            return this.canGetCheck();
        },
        canGetCheck: function() {
            return generalCanGetCheck(this.checklist);
        },
    },
    {
        name: 'Great Bay Temple',
        x: "10%",
        y: "55%",
        checklist: {
            'Map Chest': { isAvailable: function() { return EnterGreatBayTemple();}, },
            'Compass Chest': { isAvailable: function() { return EnterGreatBayTemple();}, },
            'Small Key Chest': { isAvailable: function() { return EnterGreatBayTemple();}, },
            'Boss Key Chest': { isAvailable: function() { return EnterGreatBayTemple() && CanUse(items.FireArrow) && dungeons.OceanSmallKey >= 1;}, },
            'Goht Remains': { isAvailable: function() { return EnterGreatBayTemple() && CanUse(items.FireArrow) && CanUse(items.IceArrow) && dungeons.OceanSmallKey >= 1 && dungeons.OceanBigKey;}, },
            'Heart Container': { isAvailable: function() { return EnterGreatBayTemple() && CanUse(items.FireArrow) && CanUse(items.IceArrow) && dungeons.OceanSmallKey >= 1 && dungeons.OceanBigKey;}, },
        },
        isBeatable: function() {
            return this.canGetCheck();
        },
        canGetCheck: function() {
            return generalCanGetCheck(this.checklist);
        },
    },
    {
        name: 'Stone Tower Temple',
        x: "84%",
        y: "42%",
        checklist: {
            'Map Chest': { isAvailable: function() { return EnterStoneTower();}, },
            'Armos Room Chest': { isAvailable: function() { return EnterStoneTower() && HasExplosives() && (items.Shield > 2 || CanUse(items.LightArrow));}, },
            'Bridge Switch Chest': { isAvailable: function() { return EnterStoneTower() && HasExplosives() && (items.Shield > 2 || CanUse(items.LightArrow)) && dungeons.StoneSmallKey >= 1;}, },
            'Compass Chest': { isAvailable: function() { return EnterStoneTower() && HasExplosives() && (items.Shield > 2 || CanUse(items.LightArrow)) && dungeons.StoneSmallKey >= 1;}, },
            'Light Arrow Chest': { isAvailable: function() { return EnterStoneTower() && HasExplosives() && (items.Shield > 2 || CanUse(items.LightArrow)) && dungeons.StoneSmallKey >= 2;}, },
            'Inverted Updraft Chest': { isAvailable: function() { return EnterStoneTower() && CanUse(items.LightArrow) && dungeons.StoneSmallKey >= 2;}, },
            'Death Armos Chest': { isAvailable: function() { return EnterStoneTower() && CanUse(items.LightArrow) && dungeons.StoneSmallKey >= 3;}, },
            'Big Key Chest': { isAvailable: function() { return EnterStoneTower() && CanUse(items.LightArrow) && dungeons.StoneSmallKey >= 3;}, },
            'Twinmold Remains': { isAvailable: function() { return EnterStoneTower() && CanUse(items.LightArrow) && dungeons.StoneSmallKey >= 4 && dungeons.StoneBigKey;}, },
            'Heart Container': { isAvailable: function() { return EnterStoneTower() && CanUse(items.LightArrow) && dungeons.StoneSmallKey >= 4 && dungeons.StoneBigKey;}, },
        },
        isBeatable: function() {
            return this.canGetCheck();
        },
        canGetCheck: function() {
            return generalCanGetCheck(this.checklist);
        },
    },
    {
        name: 'Pirate Fortress',
        x: "32%",
        y: "40%",
        checklist: {
            'Exterior Log Chest': { isAvailable: function() { return canPlay(quests.EponasSong) && masks.ZoraMask && items.Magic >= 1;}, },
            'Exterior Sand Chest': { isAvailable: function() { return canPlay(quests.EponasSong) && masks.ZoraMask && items.Magic >= 1;}, },
            'Exterior Corner Chest': { isAvailable: function() { return canPlay(quests.EponasSong) && masks.ZoraMask && items.Magic >= 1;}, },
            'Maze Chest': { isAvailable: function() { return canPlay(quests.EponasSong) && masks.ZoraMask && masks.GoronMask && items.Magic >= 1;}, },
            'Cage Shallow Chest': { isAvailable: function() { return canPlay(quests.EponasSong) && masks.ZoraMask && masks.GoronMask && items.Magic >= 1;}, },
            'Cage Deep Chest': { isAvailable: function() { return canPlay(quests.EponasSong) && masks.ZoraMask && masks.GoronMask && items.Magic >= 1;}, },
            'Cage HP': { isAvailable: function() { return canPlay(quests.EponasSong) && masks.ZoraMask && masks.GoronMask && items.Magic >= 1;}, },
            'Interior Lower Chest': { isAvailable: function() { return canPlay(quests.EponasSong) && masks.ZoraMask && items.Hookshot && items.Magic >= 1;}, },
            'Interior Upper Chest': { isAvailable: function() { return canPlay(quests.EponasSong) && masks.ZoraMask && items.Hookshot && items.Magic >= 1;}, },
            'Invisible Soldier': { isAvailable: function() { return canPlay(quests.EponasSong) && masks.ZoraMask && CanUse(items.LensOfTruth) && HasBottle();}, },
            'Hookshot Chest': { isAvailable: function() { return canPlay(quests.EponasSong) && masks.ZoraMask && masks.GoronMask && items.Bow >= 1 && items.Magic >= 1;}, },
            'Guard Room Chest': { isAvailable: function() { return canPlay(quests.EponasSong) && masks.ZoraMask && masks.GoronMask && items.Magic >= 1 && (HasRangeAttack() || masks.StoneMask);}, },
            'Barrel Maze Zora Egg': { isAvailable: function() { return canPlay(quests.EponasSong) && masks.ZoraMask && masks.GoronMask && items.Magic >= 1 && items.Hookshot;}, },
            'Lava Room Zora Egg': { isAvailable: function() { return canPlay(quests.EponasSong) && masks.ZoraMask && masks.GoronMask && items.Magic >= 1 && items.Hookshot;}, },
            'Guard Room Zora Egg': { isAvailable: function() { return canPlay(quests.EponasSong) && masks.ZoraMask && masks.GoronMask && items.Magic >= 1 && items.Hookshot;}, },
            'Hookshot Room Zora Egg': { isAvailable: function() { return canPlay(quests.EponasSong) && masks.ZoraMask && masks.GoronMask && items.Magic >= 1 && items.Hookshot;}, },
        },
        isBeatable: function() {
            return this.canGetCheck();
        },
        canGetCheck: function() {
            return generalCanGetCheck(this.checklist);
        },
    },
    {
        name: 'Beneath The Well',
        x: "75%",
        y: "40%",
        checklist: {
            'Left Path Chest': { isAvailable: function() { return EnterIkana() && HasBottle() && masks.GibdoMask && CanUse(items.LensOfTruth);}, },
            'Right Path Chest': { isAvailable: function() { return EnterIkana() && HasBottle() && masks.GibdoMask && CanUse(items.FireArrow);}, },
            'Mirror Shield Chest': { isAvailable: function() { return EnterIkana() && HasBottle() && masks.GibdoMask && CanUse(items.FireArrow);}, },
        },
        isBeatable: function() {
            return this.canGetCheck();
        },
        canGetCheck: function() {
            return generalCanGetCheck(this.checklist);
        },
    },
    {
        name: 'Ikana Castle',
        x: "74%",
        y: "47%",
        checklist: {
            'Pillar HP': { isAvailable: function() { return EnterIkanaCastle() && masks.DekuMask;}, },
            'Elegy of Emptiness': { isAvailable: function() { return EnterIkanaCastle() && masks.DekuMask && items.Shield > 2 && items.PowderKeg && masks.GoronMask;}, },
        },
        isBeatable: function() {
            return this.canGetCheck();
        },
        canGetCheck: function() {
            return generalCanGetCheck(this.checklist);
        },
    },
    {
        name: 'The Moon',
        x: "20%",
        y: "20%",
        checklist: {
            'Deku Bonus HP': { isAvailable: function() { return EnterMoon() && masks.DekuMask && TotalMasks(1) && moonitemlogic;}, },
            'Goron Bonus HP': { isAvailable: function() { return EnterMoon() && masks.GoronMask && TotalMasks(2) && moonitemlogic;}, },
            'Zora Bonus HP': { isAvailable: function() { return EnterMoon() && masks.ZoraMask && TotalMasks(3) && moonitemlogic;}, },
            'Link Garo Chest': { isAvailable: function() { return EnterMoon() && TotalMasks(4) && Fighting() && items.Hookshot && moonitemlogic;}, },
            'Link Iron Knuckle Chest': { isAvailable: function() { return EnterMoon() && TotalMasks(4) && Fighting() && items.Hookshot && moonitemlogic;}, },
            'Link Bonus HP': { isAvailable: function() { return EnterMoon() && TotalMasks(4) && Fighting() && items.Hookshot && items.Bombchu && items.Bow >= 1 && moonitemlogic;}, },
            'Fierce Deity Mask': { isAvailable: function() { return EnterMoon() && TotalMasks(20) && masks.GoronMask && masks.ZoraMask && masks.DekuMask && Fighting() && items.Hookshot && items.Bombchu && items.Bow >= 1 && deitylogic;}, },
        },
        isBeatable: function() {
            return this.canGetCheck();
        },
        canGetCheck: function() {
            return generalCanGetCheck(this.checklist);
        },
    },
    {
        name: 'Swamp Skulltula House',
        x: "47%",
        y: "67%",
        checklist: {
            'Main Room Water Spider': { isAvailable: function() { return masks.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Main Room Lower Left Soil': { isAvailable: function() { return masks.DekuMask && HasRangeAttack() && Fighting() && HasBottle() && skullslogic;}, },
            'Main Room Lower Right Soil': { isAvailable: function() { return masks.DekuMask && HasRangeAttack() && Fighting() && HasBottle() && skullslogic;}, },
            'Main Room Pillar': { isAvailable: function() { return masks.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Main Room Jar': { isAvailable: function() { return masks.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Main Room Upper Soil': { isAvailable: function() { return masks.DekuMask && HasRangeAttack() && Fighting() && HasBottle() && skullslogic;}, },
            'Main Room Upper Pillar': { isAvailable: function() { return masks.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Main Room Near Ceiling': { isAvailable: function() { return masks.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Monument Crate 1': { isAvailable: function() { return masks.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Monument Crate 2': { isAvailable: function() { return masks.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Monument Lower Wall': { isAvailable: function() { return masks.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Monument Torch': { isAvailable: function() { return masks.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Monument Spider': { isAvailable: function() { return masks.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Pot Room Jar': { isAvailable: function() { return masks.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Pot Room Pot 1': { isAvailable: function() { return masks.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Pot Room Pot 2': { isAvailable: function() { return masks.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Pot Room Behind Vines': { isAvailable: function() { return masks.DekuMask && HasRangeAttack() && Fighting() && (items.Sword >= 1 || items.GreatFairySword) && skullslogic;}, },
            'Pot Room Wall': { isAvailable: function() { return masks.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Pot Room Beehive 1': { isAvailable: function() { return masks.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Pot Room Beehive 2': { isAvailable: function() { return masks.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Gold Room Pillar': { isAvailable: function() { return masks.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Gold Room Beehive': { isAvailable: function() { return masks.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Gold Room Wall': { isAvailable: function() { return masks.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Gold Room Near Ceiling': { isAvailable: function() { return masks.DekuMask && HasRangeAttack() && Fighting() && (items.Hookshot || masks.ZoraMask) && skullslogic;}, },
            'Tree Room Tree 1': { isAvailable: function() { return masks.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Tree Room Tree 2': { isAvailable: function() { return masks.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Tree Room Tree 3': { isAvailable: function() { return masks.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Tree Room Grass 1': { isAvailable: function() { return masks.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Tree Room Grass 2': { isAvailable: function() { return masks.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Tree Room Beehive': { isAvailable: function() { return masks.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Mask of Truth': { isAvailable: function() { return dungeons.SwampSkulltulas >= 30;}, },
        },
        isBeatable: function() {
            return this.canGetCheck();
        },
        canGetCheck: function() {
            return generalCanGetCheck(this.checklist);
        },
    },
    {
        name: 'Ocean Skulltula House',
        x: "33%",
        y: "55%",
        checklist: {
            'Entrance Left Wall': { isAvailable: function() { return canPlay(quests.EponasSong) && HasExplosives() && masks.GoronMask && (items.Hookshot || masks.ZoraMask) && skullslogic;}, },
            'Entrance Right Wall': { isAvailable: function() { return canPlay(quests.EponasSong) && HasExplosives() && masks.GoronMask && (items.Hookshot || masks.ZoraMask) && skullslogic;}, },
            'Entrance Web': { isAvailable: function() { return canPlay(quests.EponasSong) && HasExplosives() && masks.GoronMask && (items.Hookshot || masks.ZoraMask) && CanUse(items.FireArrow) && skullslogic;}, },
            'Second Room Ceiling Edge': { isAvailable: function() { return canPlay(quests.EponasSong) && HasExplosives() && masks.GoronMask && (items.Hookshot || masks.ZoraMask) && skullslogic;}, },
            'Second Room Ceiling Plank': { isAvailable: function() { return canPlay(quests.EponasSong) && HasExplosives() && masks.GoronMask && (items.Hookshot || masks.ZoraMask) && skullslogic;}, },
            'Second Room Jar': { isAvailable: function() { return canPlay(quests.EponasSong) && HasExplosives() && masks.GoronMask && (items.Hookshot || masks.ZoraMask) && skullslogic;}, },
            'Second Room Webbed Hole': { isAvailable: function() { return canPlay(quests.EponasSong) && HasExplosives() && masks.GoronMask && (items.Hookshot || masks.ZoraMask) && CanUse(items.FireArrow) && skullslogic;}, },
            'Second Room Webbed Pot': { isAvailable: function() { return canPlay(quests.EponasSong) && HasExplosives() && masks.GoronMask && (items.Hookshot || masks.ZoraMask) && CanUse(items.FireArrow) && skullslogic;}, },
            'Second Room Upper Pot': { isAvailable: function() { return canPlay(quests.EponasSong) && HasExplosives() && masks.GoronMask && (items.Hookshot || masks.ZoraMask) && skullslogic;}, },
            'Second Room Behind Skull 1': { isAvailable: function() { return canPlay(quests.EponasSong) && HasExplosives() && masks.GoronMask && (items.Hookshot || masks.ZoraMask) && skullslogic;}, },
            'Second Room Behind Skull 2': { isAvailable: function() { return canPlay(quests.EponasSong) && HasExplosives() && masks.GoronMask && (items.Hookshot || masks.ZoraMask) && skullslogic;}, },
            'Second Room Lower Pot': { isAvailable: function() { return canPlay(quests.EponasSong) && HasExplosives() && masks.GoronMask && (items.Hookshot || masks.ZoraMask) && skullslogic;}, },
            'Library Behind Picture': { isAvailable: function() { return canPlay(quests.EponasSong) && HasExplosives() && masks.GoronMask && (items.Hookshot || masks.ZoraMask) && skullslogic;}, },
            'Library Behind Cabinet': { isAvailable: function() { return canPlay(quests.EponasSong) && HasExplosives() && masks.GoronMask && (items.Hookshot || masks.ZoraMask) && skullslogic;}, },
            'Library On Bookshelf': { isAvailable: function() { return canPlay(quests.EponasSong) && HasExplosives() && masks.GoronMask && (items.Hookshot || masks.ZoraMask) && skullslogic;}, },
            'Library Ceiling Edge': { isAvailable: function() { return canPlay(quests.EponasSong) && HasExplosives() && masks.GoronMask && (items.Hookshot || masks.ZoraMask) && skullslogic;}, },
            'Library Behind Bookcase 1': { isAvailable: function() { return canPlay(quests.EponasSong) && HasExplosives() && masks.GoronMask && (items.Hookshot || masks.ZoraMask) && skullslogic;}, },
            'Library Behind Bookcase 2': { isAvailable: function() { return canPlay(quests.EponasSong) && HasExplosives() && masks.GoronMask && (items.Hookshot || masks.ZoraMask) && skullslogic;}, },
            'Library Hole Behind Picture': { isAvailable: function() { return canPlay(quests.EponasSong) && HasExplosives() && masks.GoronMask && (items.Hookshot || masks.ZoraMask) && skullslogic;}, },
            'Colored Skulls Ceiling Edge': { isAvailable: function() { return canPlay(quests.EponasSong) && HasExplosives() && masks.GoronMask && (items.Hookshot || masks.ZoraMask) && skullslogic;}, },
            'Colored Skulls Chandelier 1': { isAvailable: function() { return canPlay(quests.EponasSong) && HasExplosives() && masks.GoronMask && (items.Hookshot || masks.ZoraMask) && skullslogic;}, },
            'Colored Skulls Chandelier 2': { isAvailable: function() { return canPlay(quests.EponasSong) && HasExplosives() && masks.GoronMask && (items.Hookshot || masks.ZoraMask) && skullslogic;}, },
            'Colored Skulls Chandelier 3': { isAvailable: function() { return canPlay(quests.EponasSong) && HasExplosives() && masks.GoronMask && (items.Hookshot || masks.ZoraMask) && skullslogic;}, },
            'Colored Skulls Behind Picture': { isAvailable: function() { return canPlay(quests.EponasSong) && HasExplosives() && masks.GoronMask && (items.Hookshot || masks.ZoraMask) && skullslogic;}, },
            'Colored Skulls Pot': { isAvailable: function() { return canPlay(quests.EponasSong) && HasExplosives() && masks.GoronMask && (items.Hookshot || masks.ZoraMask) && skullslogic;}, },
            'Storage Web': { isAvailable: function() { return canPlay(quests.EponasSong) && HasExplosives() && masks.GoronMask && (items.Hookshot || masks.ZoraMask) && CanUse(items.FireArrow) && skullslogic;}, },
            'Storage Crate': { isAvailable: function() { return canPlay(quests.EponasSong) && HasExplosives() && masks.GoronMask && (items.Hookshot || masks.ZoraMask) && skullslogic;}, },
            'Storage Wall': { isAvailable: function() { return canPlay(quests.EponasSong) && HasExplosives() && masks.GoronMask && (items.Hookshot || masks.ZoraMask) && skullslogic;}, },
            'Storage Barrel': { isAvailable: function() { return canPlay(quests.EponasSong) && HasExplosives() && masks.GoronMask && items.Hookshot && skullslogic;}, },
            'Storage Behind Crate': { isAvailable: function() { return canPlay(quests.EponasSong) && HasExplosives() && masks.GoronMask && (items.Hookshot || masks.ZoraMask) && skullslogic;}, },
            'Wallet Upgrade': { isAvailable: function() { return dungeons.OceanSkulltulas >= 30;}, },
            'Colored Skulls Chest': { isAvailable: function() {return canPlay(quests.EponasSong) && HasExplosives() && items.Hookshot && items.Bow >= 1 && masks.CaptainsHat;}}
        },
        isBeatable: function() {
            return this.canGetCheck();
        },
        canGetCheck: function() {
            return generalCanGetCheck(this.checklist);
        },
    },

];

//define overworld Checks
var checks = [
    {
        name: 'Bombers Hideout Chest',
        x: "53%",
        y: "45%",
        isAvailable: function() {
            if (items.Bomb >=1 && quests.BombersNotebook){
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: 'Mystery Woods Grotto Chest',
        x: "53%",
        y: "60%",
        isAvailable: function() {
            return "available";
        },
    },
    {
        name: 'Woodfall Great Fairy',
        x: "52%",
        y: "75%",
        isAvailable: function() {
            if (dungeons.SwampStrayFairy >= 15 && greatfairylogic) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: 'Road to Snowhead Grotto',
        x: "46%",
        y: "25%",
        isAvailable: function() {
            if (HasExplosives() && masks.GoronMask && masks.MaskOfTruth && items.Magic >= 1) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: 'Road to Snowhead Pillar HP',
        x: "47%",
        y: "28%",
        isAvailable: function() {
            if (piecelogic && HasExplosives() && masks.GoronMask && CanUse(items.LensOfTruth) && items.Hookshot && canPlay(quests.ScarecrowSong)) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: 'Snowhead Great Fairy',
        x: "49%",
        y: "21%",
        isAvailable: function() {
            if (dungeons.SnowStrayFairy >= 15 && greatfairylogic) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: 'Great Bay Great Fairy',
        x: "25%",
        y: "64%",
        isAvailable: function() {
            if (dungeons.OceanStrayFairy >= 15 && greatfairylogic) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: 'Ikana Great Fairy',
        x: "77%",
        y: "45%",
        isAvailable: function() {
            if (dungeons.StoneStrayFairy >= 15 && greatfairylogic) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: 'Oath to Order',
        x: "50%",
        y: "85%",
        isAvailable: function() {
            if (WoodfallClear() || SnowheadClear() || BayClear() || StoneClear()) {
                return "available";
            }
            return "unavailable";
        },
    },
];