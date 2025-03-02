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
    return (song && items.Ocarina);
}

function Fighting(){
    return (items.Sword >= 1 || items.GoronMask || items.ZoraMask || items.GreatFairySword); 
}

function HasBottle() {
    return (items.RedPotion || items.GoldDust || items.Milk || items.ChateauRomani || items.MysteryMilk || (items.EmptyBottle >= 1));
}

function HasRangeAttack() {
    return ((items.DekuMask && items.Magic >=1) || items.ZoraMask || (items.Bow >=1) || items.Hookshot);
}

function HasExplosives() {
    return items.Bombs >= 1 || items.BlastMask;
}

function CanUse(item) {
    if (item == items.LensOfTruth) { return (items.LensOfTruth && items.Magic >= 1); }
    else if (item == items.GiantMask) { return (items.GiantMask && items.Magic >= 1); }
    else if (item == items.FireArrow) { return (items.FireArrow && items.Magic >= 1 && items.Bow >= 1);}
    else if (item == items.IceArrow) { return (items.IceArrow && items.Magic >= 1 && items.Bow >= 1);}
    else if (item == items.LightArrow) { return (items.LightArrow && items.Magic >= 1 && items.Bow >= 1);}
    else { return item;}
}

function CanGetToDekuPalace() {
    return items.DekuMask && (HasBottle() || HasRangeAttack());
}

function WoodfallClear() {
    return (items.Bow >= 1 && items.SwampSmallKey >=1 && items.SwampBigKey && Fighting() && items.DekuMask && canPlay(items.SonataOfAwakening));
}

function SnowheadClear() {
    return (items.Bow >= 1 && items.GoronMask && items.SnowSmallKey >= 3 && items.FireArrow && items.Magic >= 1 && HasExplosives() && canPlay(items.GoronLullaby) && items.SnowBigKey && Fighting() && items.LensOfTruth);
}

function BayClear() {
    return (items.Bow >= 1 && items.ZoraMask && items.OceanSmallKey >= 1 && items.OceanBigKey && items.IceArrow && items.Magic >= 1 && canPlay(items.NewWaveBossaNova) && Fighting() && canPlay(items.EponasSong) && items.Hookshot);
}

function StoneClear() {
    return (EnterStoneTower() && items.StoneSmallKey >= 3 && CanUse(items.LightArrow) && items.StoneBigKey && items.GiantMask);
}

function EnterWoodfallTemple() {
    return (canPlay(items.SonataOfAwakening) && items.DekuMask && HasRangeAttack() && Fighting());
}

function EnterSnowheadTemple() {
    return (canPlay(items.GoronLullaby) && items.GoronMask && CanUse(items.LensOfTruth));
}

function EnterGreatBayTemple() {
    return (canPlay(items.EponasSong) && items.Hookshot && items.ZoraMask && items.ZoraEggs >= 7 && items.Magic >= 1);
}

function EnterIkana() {
    return (canPlay(items.EponasSong) && (items.GaroMask || items.GibdoMask) && items.Hookshot && CanUse(items.IceArrow));
}

function EnterStoneTower() {
    return (EnterIkana() && items.ZoraMask && items.GoronMask && canPlay(items.ElegyOfEmptiness));
}

function EnterIkanaCastle() {
    return (EnterIkana() && (HasBottle() && items.GibdoMask && CanUse(items.FireArrow)) || items.MirrorShield || CanUse(items.LightArrow));
}

function EnterMoon() {
    return items.OdolwaRemains && items.GohtRemains && items.GyorgRemains && items.TwinmoldRemains && canPlay(items.OathToOrder);
}


function TotalMasks(total) {
    var TotalMasks = 0;
    if (items.KeatonMask)       {TotalMasks++;}
    if (items.BunnyHood)        {TotalMasks++;}
    if (items.PostmanHat)       {TotalMasks++;}
    if (items.AllNightMask)     {TotalMasks++;}
    if (items.BlastMask)        {TotalMasks++;}
    if (items.StoneMask)        {TotalMasks++;}
    if (items.GreatFairyMask)   {TotalMasks++;}
    if (items.BremenMask)       {TotalMasks++;}
    if (items.DonGeroMask)      {TotalMasks++;}
    if (items.MaskOfScents)     {TotalMasks++;}
    if (items.RomaniMask)       {TotalMasks++;}
    if (items.TroupeLeaderMask) {TotalMasks++;}
    if (items.KafeiMask)        {TotalMasks++;}
    if (items.CouplesMask)      {TotalMasks++;}
    if (items.MaskOfTruth)      {TotalMasks++;}
    if (items.KamaroMask)       {TotalMasks++;}
    if (items.GibdoMask)        {TotalMasks++;}
    if (items.GaroMask)         {TotalMasks++;}
    if (items.CaptainsHat)      {TotalMasks++;}
    if (items.GiantMask)        {TotalMasks++;}
    if (items.FierceDeityMask)  {TotalMasks++;}
    
    if (TotalMasks >= total) {return true;}
    return false;
}

var areas = [
    {
        name: "North Clock Town",
        x: "87.0%",
        y: "56.0%",
        checklist: {
            'Keaton Quiz': { isAvailable: function() { return items.KeatonMask && piecelogic;}, },
            'Tree': { isAvailable: function() { return piecelogic;}, },
            'Old Lady': { isAvailable: function() { return Fighting();}},
            'Tingle Clock Town Map': { isAvailable: function() {return tinglelogic;}},
            'Tingle Woodfall Map': { isAvailable: function() {return tinglelogic;}},
            'Postbox': { isAvailable: function() {return items.PostmanHat && piecelogic;}},
            'Deku Playground (all 3 days)': { isAvailable: function() {return items.DekuMask && piecelogic;}},
        },
        isBeatable: function() {
            if (items.KeatonMask && items.PostmanHat && items.DekuMask) {
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
        name: "Clock Town Fairy Fountain",
        x: "88.5%",
        y: "57.5%",
        checklist: {
            'Clock Town Fairy (Deku)': { isAvailable: function() { return items.DekuMask && items.TownStrayFairy && greatfairylogic;}, },
            'Clock Town Fairy (Human)': { isAvailable: function() { return items.TownStrayFairy && greatfairylogic;}, },
        },
        isBeatable: function() {
            if (items.DekuMask && items.TownStrayFairy) {
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
        x: "0%",
        y: "0%",
        checklist: {
            'Chest': { isAvailable: function() { return true;}, },
            'Postbox': { isAvailable: function() { return items.PostmanHat && piecelogic;}, },
            'Postman Freedom': { isAvailable: function() { return items.LetterToMama && anjulogic;}, },
            'Gorman at Bar': { isAvailable: function() { return items.RomaniMask && items.DekuMask && items.GoronMask && items.ZoraMask && items.Ocarina && piecelogic;}, },
            'Aroma at Bar': { isAvailable: function() { return items.LetterToMama && items.KafeiMask && maskslogic;}, },
            'Honey & Darling (3 Days)': { isAvailable: function() { return (items.Bow >=1) && (items.Bombs >=1) && piecelogic;}, },
            'Treasure Chest Game': { isAvailable: function() { return items.GoronMask && piecelogic;}, },
            'Archery 1': { isAvailable: function() { return items.Bow >= 1;}, },
            'Archery 2': { isAvailable: function() { return items.Bow >= 1 && piecelogic;}, },
            'Mayor Reward': { isAvailable: function() { return items.CouplesMask && piecelogic;}, },
            'Aroma in Office': { isAvailable: function() { return maskslogic;}, },
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
        x: "0%",
        y: "0%",
        checklist: {
            'Reservation': { isAvailable: function() { return items.GoronMask && anjulogic;}, },
            'Toilet Hand': { isAvailable: function() { return (items.LetterToMama || items.LetterToKafei || items.LandDeed || items.SwampDeed || items.MountainDeed || items.OceanDeed) && piecelogic;}, },
            'Guest Room Chest': { isAvailable: function() { return items.RoomKey;}, },
            'Staff Room Chest': { isAvailable: function() { return true;}, },
            'Midnight Meeting': { isAvailable: function() { return items.KafeiMask && (items.DekuMask || items.RoomKey) && anjulogic;}, },
            'Anju and Kafei': { isAvailable: function() { return items.KafeiMask && items.LetterToKafei && items.PendantOfMemories && canPlay(items.EponasSong) && (items.GaroMask || items.GibdoMask) && items.Hookshot && Fighting() && anjulogic;}, },
            'Grandma Short Story': { isAvailable: function() { return items.AllNightMask && piecelogic;}, },
            'Grandma Long Story': { isAvailable: function() { return items.AllNightMask && piecelogic;}, },
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
        x: "%",
        y: "%",
        checklist: {
            'Rosa Sisters': { isAvailable: function() { return items.KamaroMask;}, },
            'Swordsman School': { isAvailable: function() { return items.Sword >= 1;}, },
            'Postman Game': { isAvailable: function() { return items.BunnyHood;}, },
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
        x: "%",
        y: "%",
        checklist: {
            'Scrub Trade': { isAvailable: function() { return scrubtradelogic && items.MoonsTear;}, },
            'Postbox': { isAvailable: function() { return items.PostmanHat;}, },
            'Clock Tower HP': { isAvailable: function() { return true;}, },
            'Straw Roof Chest': { isAvailable: function() { return items.Hookshot || (items.DekuMask && items.MoonsTear);}, },
            'Final Day Chest': { isAvailable: function() { return items.Hookshot || (items.DekuMask && items.MoonsTear);}, },
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
        x: "%",
        y: "%",
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
        x: "%",
        y: "%",
        checklist: {
            'Keaton Mask': { isAvailable: function() { return items.LetterToKafei;}, },
            'Pendant of Memories': { isAvailable: function() { return items.LetterToKafei;}, },
            'Guru Guru': { isAvailable: function() { return true;}, },
            'Stray Fairy': { isAvailable: function() { return true;}, },
            'Kafei': { isAvailable: function() { return items.LetterToKafei;}, },

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
        x: "%",
        y: "%",
        checklist: {
            'Kamaro': { isAvailable: function() { return canPlay(items.SongOfHealing);}, },
            'Underwater Chest': { isAvailable: function() { return items.ZoraMask;}, },
            'Grass Chest': { isAvailable: function() { return true;}, },
            'Stump Chest': { isAvailable: function() { return items.Hookshot || (items.MagicBean && HasBottle());}, },
            'Moons Tear': { isAvailable: function() { return items.DekuMask || (items.BombersNotebook && HasRangeAttack());}, },
            'Peahat Grotto Chest': { isAvailable: function() { return Fighting();}, },
            'Dodongo Grotto Chest': { isAvailable: function() { return Fighting();}, },
            'BioBaba Grotto HP': { isAvailable: function() { return items.ZoraMask && (items.Bombs >=1 || items.GoronMask);}, },
            'Pillar Grotto Chest': { isAvailable: function() { return true;}, },
            'Grass Grotto Chest': { isAvailable: function() { return true;}, },
            'Business Scrub': { isAvailable: function() { return items.Wallet >=1 && items.DekuMask || (items.BombersNotebook && HasRangeAttack());}, },
            'Colored Gossip Stones': { isAvailable: function() { return (items.Bombs >=1 || items.GoronMask) && ((items.SonataOfAwakening && items.DekuMask) || (items.GoronLullaby && items.GoronMask) || (items.NewWaveBossaNova && items.ZoraMask))  ;}, },
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
        x: "%",
        y: "%",
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
        x: "%",
        y: "%",
        checklist: {
            'Scrub Trade': { isAvailable: function() { return items.LandDeed && scrubtradelogic;}, },
            'Scrub Purchase': { isAvailable: function() { return items.DekuMask;}, },
            'Song of Soaring': { isAvailable: function() { return items.Ocarina;}, },
            'Tourist Center Roof': { isAvailable: function() { return items.DekuMask && items.LandDeed;}, },
            'Koume': { isAvailable: function() { return HasBottle();}, },
            'Pictograph Winner': { isAvailable: function() { return items.PictographBox;}, },
            'Boat Archery': { isAvailable: function() { return WoodfallClear() && HasBottle();}, },
            'Kotake': { isAvailable: function() { return true;}, },
            'Mushroom Sale': { isAvailable: function() { return HasBottle() && items.MaskOfScents;}, },
            'Spider House Grotto Chest': { isAvailable: function() { return items.DekuMask && (HasBottle() || (items.Bow >= 1) || ZoraMask || Hookshot || WoodfallClear());}, },
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
        x: "%",
        y: "%",
        checklist: {
            'West Garden HP': { isAvailable: function() { return CanGetToDekuPalace();}, },
            'Imprisoned Monkey': { isAvailable: function() { return CanGetToDekuPalace() && items.Ocarina && items.MagicBean;}, },
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
        x: "%",
        y: "%",
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
        x: "%",
        y: "%",
        checklist: {
            'Frog Choir': { isAvailable: function() { return WoodfallClear() && SnowheadClear() && BayClear() && items.DonGeroMask  && piecelogic;}, },
            'Hungry Goron': { isAvailable: function() { return items.GoronMask && items.Magic >= 1 && items.Bow >=1 && HasExplosives() && piecelogic;}, },
            'Waterfall Chest': { isAvailable: function() { return SnowheadClear() && CanUse(items.LensOfTruth);}, },
            'Darmani': { isAvailable: function() { return CanUse(items.LensOfTruth) && canPlay(SongOfHealing) && items.Bow >= 1 && HasExplosives() && transformmasklogic;}, },
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
        x: "50%",
        y: "20%",
        checklist: {
            'Underwater Ramp Chest': { isAvailable: function() { return SnowheadClear() && items.ZoraMask;}, },
            'Cave Chest': { isAvailable: function() { return SnowheadClear() && items.ZoraMask;}, },
            'Lullaby Intro': { isAvailable: function() { return HasExplosives() && items.GoronMask && (HasBottle() || CanUse(items.FireArrow));}, },
            'Tingle Snowhead Map': { isAvailable: function() { return items.Bow >= 1 && HasExplosives() && tinglelogic;}, },
            'Tingle Romani Ranch Map': { isAvailable: function() { return items.Bow >= 1 && HasExplosives() && tinglelogic;}, },
            'Goron Race': { isAvailable: function() { return SnowheadClear();}, },
            'Racetrack Grotto Chest': { isAvailable: function() { return HasExplosives() && items.MaskOfTruth && ((items.Hookshot && canPlay(items.ScarecrowSong) || GoronMask));}, },
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
        x: "50%",
        y: "25%",
        checklist: {
            'Powder Keg Challenge': { isAvailable: function() { return HasExplosives() && items.GoronMask && (SnowheadClear() || CanUse(items.FireArrow));}, },
            'Scrub Purchase': { isAvailable: function() { return HasExplosives() && items.Wallet >= 1 && items.GoronMask && items.Bombs >= 2;}, },
            'Scrub Trade': { isAvailable: function() { return HasExplosives() && items.DekuMask && items.SwampDeed && scrubtradelogic;}, },
            'Ledge HP': { isAvailable: function() { return HasExplosives() && items.DekuMask && items.SwampDeed && piecelogic;}, },
            'Lens Cave Chest': { isAvailable: function() { return HasExplosives() && CanUse(items.LensOfTruth);}, },
            'Lens Cave Rock Chest': { isAvailable: function() { return HasExplosives();}, },
            'Lens Cave Lens Chest': { isAvailable: function() { return HasExplosives();}, },
            'Goron Lullaby': { isAvailable: function() { return HasExplosives() && items.GoronMask && ((HasBottle() && CanUse(items.LensOfTruth)) || CanUse(items.FireArrow));}, },
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
        x: "50%",
        y: "30%",
        checklist: {
            'Tingle Milk Road Map': { isAvailable: function() { return HasRangeAttack() && tinglelogic;}, },
            'Tingle Great Bay Map': { isAvailable: function() { return HasRangeAttack() && tinglelogic;}, },
            'Gorman Race': { isAvailable: function() { return canPlay(items.EponasSong);}, },
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
        x: "%",
        y: "%",
        checklist: {
            'Alien Defense': { isAvailable: function() { return items.PowderKeg && items.GoronMask && items.Bow >= 1;}, },
            'Cremia Escort': { isAvailable: function() { return items.PowderKeg && items.GoronMask && items.Bow >= 1 && piecelogic;}, },
            'Romanis Game': { isAvailable: function() { return items.PowderKeg && items.GoronMask && items.Bow >= 1;}, },
            'Dog Race Winner': { isAvailable: function() { return items.MaskOfTruth && piecelogic;}, },
            'Doggy Racetrack Chest': { isAvailable: function() { return items.Hookshot;}, },
            'Grogs Chickens': { isAvailable: function() { return items.BremenMask && piecelogic;}, },
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
        x: "%",
        y: "%",
        checklist: {
            'Fisherman Game': { isAvailable: function() { return BayClear() && piecelogic;}, },
            'Ledge HP': { isAvailable: function() { return canPlay(items.EponasSong) && items.Hookshot && HasBottle() && items.MagicBean && piecelogic;}, },
            'Mikau': { isAvailable: function() { return canPlay(items.EponasSong) && canPlay(items.SongOfHealing) && transformmasklogic;}, },
            'Tingle Great Bay Map': { isAvailable: function() { return canPlay(items.EponasSong) && HasRangeAttack() && tinglelogic;}, },
            'Tingle Stone Tower Map': { isAvailable: function() { return canPlay(items.EponasSong) && HasRangeAttack() && tinglelogic;}, },
            'Baby Zoras': { isAvailable: function() { return canPlay(items.EponasSong) && HasBottle() && items.ZoraEggs >= 7;}, },
            'Lab Fish': { isAvailable: function() { return canPlay(items.EponasSong) && HasBottle() && piecelogic;}, },
            'Grotto Chest': { isAvailable: function() { return canPlay(items.EponasSong);}, },
            'Fisherman Photo': { isAvailable: function() { return canPlay(items.EponasSong) && items.ZoraMask && items.PictographBox;}, },
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
        x: "%",
        y: "%",
        checklist: {
            'Seahorse HP': { isAvailable: function() { return canPlay(items.EponasSong) && items.ZoraMask && items.Seahorse && items.Magic >= 1 && piecelogic;}, },
            'Upper Chest': { isAvailable: function() { return canPlay(items.EponasSong) && items.ZoraMask && items.Seahorse && items.Magic >= 1;}, },
            'Lower Chest': { isAvailable: function() { return canPlay(items.EponasSong) && items.ZoraMask && items.Seahorse && items.Magic >= 1;}, },
            'Zora Egg 1': { isAvailable: function() { return canPlay(items.EponasSong) && items.ZoraMask && items.Seahorse && items.Magic >= 1 && HasBottle();}, },
            'Zora Egg 2': { isAvailable: function() { return canPlay(items.EponasSong) && items.ZoraMask && items.Seahorse && items.Magic >= 1 && HasBottle();}, },
            'Zora Egg 3': { isAvailable: function() { return canPlay(items.EponasSong) && items.ZoraMask && items.Seahorse && items.Magic >= 1 && HasBottle();}, },
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
        x: "%",
        y: "%",
        checklist: {
            'Like Like HP': { isAvailable: function() { return canPlay(items.EponasSong) && items.ZoraMask && piecelogic;}, },
            'Ledge Chest (No Tree)': { isAvailable: function() { return canPlay(items.EponasSong) && items.Hookshot;}, },
            'Ledge Chest (Tree)': { isAvailable: function() { return canPlay(items.EponasSong) && items.Hookshot;}, },
            'Underwater Chest': { isAvailable: function() { return canPlay(items.EponasSong) && items.ZoraMask;}, },
            'Beaver Race 1': { isAvailable: function() { return canPlay(items.EponasSong) && items.ZoraMask && items.Hookshot && items.Magic >= 1;}, },
            'Beaver Race 2': { isAvailable: function() { return canPlay(items.EponasSong) && items.ZoraMask && items.Hookshot && items.Magic >= 1 && piecelogic;}, },
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
        x: "%",
        y: "%",
        checklist: {
            'Evan HP': { isAvailable: function() { return canPlay(items.EponasSong) && items.ZoraMask && piecelogic;}, },
            'Scrub Trade': { isAvailable: function() { return canPlay(items.EponasSong) && items.ZoraMask && items.GoronMask && items.MountainDeed;}, },
            'Scrub Purchase': { isAvailable: function() { return canPlay(items.EponasSong) && items.ZoraMask;}, },
            'Lulu Room HP': { isAvailable: function() { return canPlay(items.EponasSong) && items.ZoraMask && items.GoronMask && items.MountainDeed && piecelogic;}, },
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
        x: "%",
        y: "%",
        checklist: {
            'Road to Ikana Pillar Chest': { isAvailable: function() { return canPlay(items.EponasSong) && items.Hookshot;}, },
            'Road to Ikana Grotto Chest': { isAvailable: function() { return canPlay(items.EponasSong) && items.GoronMask;}, },
            'Captain Keeta Chest': { isAvailable: function() { return canPlay(items.EponasSong) && canPlay(items.SonataOfAwakening) && Fighting();}, },
            'Graveyard Grotto Chest': { isAvailable: function() { return canPlay(items.EponasSong) && HasExplosives() && items.MaskOfTruth;}, },
            'Day 1 Grave Bats Chest': { isAvailable: function() { return canPlay(items.EponasSong) && items.CaptainsHat && Fighting();}, },
            'Day 1 Grave Tablet': { isAvailable: function() { return canPlay(items.EponasSong) && items.CaptainsHat && Fighting();}, },
            'Day 2 Iron Knuckle Chest': { isAvailable: function() { return canPlay(items.EponasSong) && items.CaptainsHat && Fighting();}, },
            'Dampe Digging': { isAvailable: function() { return canPlay(items.EponasSong) && items.CaptainsHat && Fighting();}, },
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
        x: "%",
        y: "%",
        checklist: {
            'Ledge HP': { isAvailable: function() { return EnterIkana() && items.OceanDeed && items.DekuMask;}, },
            'Secret Shrine Grotto': { isAvailable: function() { return EnterIkana() && items.ZoraMask;}, },
            'Scrub Trade': { isAvailable: function() { return EnterIkana() && items.OceanDeed;}, },
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
        x: "%",
        y: "%",
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
        x: "%",
        y: "%",
        checklist: {
            'Left Inverted Chest': { isAvailable: function() { return EnterStoneTower() && CanUse(items.LightArrow) && items.MagicBean && (HasBottle() || canPlay(items.SongOfStorms));}, },
            'Center Inverted Chest': { isAvailable: function() { return EnterStoneTower() && CanUse(items.LightArrow) && items.MagicBean && (HasBottle() || canPlay(items.SongOfStorms));}, },
            'Right Inverted Chest': { isAvailable: function() { return EnterStoneTower() && CanUse(items.LightArrow) && items.MagicBean && (HasBottle() || canPlay(items.SongOfStorms));}, },
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
        x: "%",
        y: "%",
        checklist: {
            'Small Key Chest': { isAvailable: function() { return EnterWoodfallTemple();}, },
            'Bow Chest': { isAvailable: function() { return EnterWoodfallTemple() && items.SwampSmallKey >= 1;}, },
            'Boss Key Chest': { isAvailable: function() { return EnterWoodfallTemple() && items.SwampSmallKey >= 1;}, },
            'Map Chest': { isAvailable: function() { return EnterWoodfallTemple();}, },
            'Compass Chest': { isAvailable: function() { return EnterWoodfallTemple();}, },
            'Heart Container': { isAvailable: function() { return EnterWoodfallTemple() && items.SwampSmallKey >= 1 && items.SwampBigKey && items.Bow >= 1;}, },
            'Odolwa Remains': { isAvailable: function() { return EnterWoodfallTemple() && items.SwampSmallKey >= 1 && items.SwampBigKey && items.Bow >= 1;}, },
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
        x: "%",
        y: "%",
        checklist: {
            'Bridge Room Frozen Chest': { isAvailable: function() { return EnterSnowheadTemple() && CanUse(items.FireArrow);}, },
            'Map Chest': { isAvailable: function() { return EnterSnowheadTemple();}, },
            'Compass Chest': { isAvailable: function() { return EnterSnowheadTemple() && items.SnowSmallKey >= 1;}, },
            'Double Block Room Chest': { isAvailable: function() { return EnterSnowheadTemple();}, },
            'Icicle Room Chest': { isAvailable: function() { return EnterSnowheadTemple() && items.SnowSmallKey >= 1;}, },
            'Fire Arrow Chest': { isAvailable: function() { return EnterSnowheadTemple() && items.SnowSmallKey >= 2;}, },
            'Boss Key Chest': { isAvailable: function() { return EnterSnowheadTemple() && items.SnowSmallKey >= 3;}, },
            'Goht Remains': { isAvailable: function() { return EnterSnowheadTemple() && items.SnowSmallKey >= 3 && items.SnowBigKey && CanUse(items.FireArrow);}, },
            'Heart Container': { isAvailable: function() { return EnterSnowheadTemple() && items.SnowSmallKey >= 3 && items.SnowBigKey && CanUse(items.FireArrow);}, },
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
        x: "%",
        y: "%",
        checklist: {
            'Map Chest': { isAvailable: function() { return EnterGreatBayTemple();}, },
            'Compass Chest': { isAvailable: function() { return EnterGreatBayTemple();}, },
            'Small Key Chest': { isAvailable: function() { return EnterGreatBayTemple();}, },
            'Boss Key Chest': { isAvailable: function() { return EnterGreatBayTemple() && CanUse(items.FireArrow) && items.OceanSmallKey >= 1;}, },
            'Goht Remains': { isAvailable: function() { return EnterGreatBayTemple() && CanUse(items.FireArrow) && CanUse(items.IceArrow) && items.OceanSmallKey >= 1 && items.OceanBigKey;}, },
            'Heart Container': { isAvailable: function() { return EnterGreatBayTemple() && CanUse(items.FireArrow) && CanUse(items.IceArrow) && items.OceanSmallKey >= 1 && items.OceanBigKey;}, },
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
        x: "%",
        y: "%",
        checklist: {
            'Map Chest': { isAvailable: function() { return EnterStoneTower();}, },
            'Armos Room Chest': { isAvailable: function() { return EnterStoneTower() && HasExplosives() && (items.MirrorShield || CanUse(items.LightArrow));}, },
            'Bridge Switch Chest': { isAvailable: function() { return EnterStoneTower() && HasExplosives() && (items.MirrorShield || CanUse(items.LightArrow)) && items.StoneSmallKey >= 1;}, },
            'Compass Chest': { isAvailable: function() { return EnterStoneTower() && HasExplosives() && (items.MirrorShield || CanUse(items.LightArrow)) && items.StoneSmallKey >= 1;}, },
            'Light Arrow Chest': { isAvailable: function() { return EnterStoneTower() && HasExplosives() && (items.MirrorShield || CanUse(items.LightArrow)) && items.StoneSmallKey >= 2;}, },
            'Inverted Updraft Chest': { isAvailable: function() { return EnterStoneTower() && CanUse(items.LightArrow) && items.StoneSmallKey >= 2;}, },
            'Death Armos Chest': { isAvailable: function() { return EnterStoneTower() && CanUse(items.LightArrow) && items.StoneSmallKey >= 3;}, },
            'Big Key Chest': { isAvailable: function() { return EnterStoneTower() && CanUse(items.LightArrow) && items.StoneSmallKey >= 3;}, },
            'Twinmold Remains': { isAvailable: function() { return EnterStoneTower() && CanUse(items.LightArrow) && items.StoneSmallKey >= 4 && items.StoneBigKey;}, },
            'Heart Container': { isAvailable: function() { return EnterStoneTower() && CanUse(items.LightArrow) && items.StoneSmallKey >= 4 && items.StoneBigKey;}, },
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
        x: "%",
        y: "%",
        checklist: {
            'Exterior Log Chest': { isAvailable: function() { return canPlay(items.EponasSong) && items.ZoraMask && items.Magic >= 1;}, },
            'Exterior Sand Chest': { isAvailable: function() { return canPlay(items.EponasSong) && items.ZoraMask && items.Magic >= 1;}, },
            'Exterior Corner Chest': { isAvailable: function() { return canPlay(items.EponasSong) && items.ZoraMask && items.Magic >= 1;}, },
            'Maze Chest': { isAvailable: function() { return canPlay(items.EponasSong) && items.ZoraMask && items.GoronMask && items.Magic >= 1;}, },
            'Cage Shallow Chest': { isAvailable: function() { return canPlay(items.EponasSong) && items.ZoraMask && items.GoronMask && items.Magic >= 1;}, },
            'Cage Deep Chest': { isAvailable: function() { return canPlay(items.EponasSong) && items.ZoraMask && items.GoronMask && items.Magic >= 1;}, },
            'Cage HP': { isAvailable: function() { return canPlay(items.EponasSong) && items.ZoraMask && items.GoronMask && items.Magic >= 1;}, },
            'Interior Lower Chest': { isAvailable: function() { return canPlay(items.EponasSong) && items.ZoraMask && items.Hookshot && items.Magic >= 1;}, },
            'Interior Upper Chest': { isAvailable: function() { return canPlay(items.EponasSong) && items.ZoraMask && items.Hookshot && items.Magic >= 1;}, },
            'Invisible Soldier': { isAvailable: function() { return canPlay(items.EponasSong) && items.ZoraMask && CanUse(items.LensOfTruth) && HasBottle();}, },
            'Hookshot Chest': { isAvailable: function() { return canPlay(items.EponasSong) && items.ZoraMask && items.GoronMask && items.Bow >= 1 && items.Magic >= 1;}, },
            'Guard Room Chest': { isAvailable: function() { return canPlay(items.EponasSong) && items.ZoraMask && items.GoronMask && items.Magic >= 1 && (HasRangeAttack() || items.StoneMask);}, },
            'Barrel Maze Zora Egg': { isAvailable: function() { return canPlay(items.EponasSong) && items.ZoraMask && items.GoronMask && items.Magic >= 1 && items.Hookshot;}, },
            'Lava Room Zora Egg': { isAvailable: function() { return canPlay(items.EponasSong) && items.ZoraMask && items.GoronMask && items.Magic >= 1 && items.Hookshot;}, },
            'Guard Room Zora Egg': { isAvailable: function() { return canPlay(items.EponasSong) && items.ZoraMask && items.GoronMask && items.Magic >= 1 && items.Hookshot;}, },
            'Hookshot Room Zora Egg': { isAvailable: function() { return canPlay(items.EponasSong) && items.ZoraMask && items.GoronMask && items.Magic >= 1 && items.Hookshot;}, },
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
        x: "%",
        y: "%",
        checklist: {
            'Left Path Chest': { isAvailable: function() { return EnterIkana() && HasBottle() && items.GibdoMask && CanUse(items.LensOfTruth);}, },
            'Right Path Chest': { isAvailable: function() { return EnterIkana() && HasBottle() && items.GibdoMask && CanUse(items.FireArrow);}, },
            'Mirror Shield Chest': { isAvailable: function() { return EnterIkana() && HasBottle() && items.GibdoMask && CanUse(items.FireArrow);}, },
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
        x: "%",
        y: "%",
        checklist: {
            'Pillar HP': { isAvailable: function() { return EnterIkanaCastle() && items.DekuMask;}, },
            'Elegy of Emptiness': { isAvailable: function() { return EnterIkanaCastle() && items.DekuMask && items.MirrorShield && items.PowderKeg && items.GoronMask;}, },
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
        x: "%",
        y: "%",
        checklist: {
            'Deku Bonus HP': { isAvailable: function() { return EnterMoon() && items.DekuMask && TotalMasks(1) && moonitemlogic;}, },
            'Goron Bonus HP': { isAvailable: function() { return EnterMoon() && items.GoronMask && TotalMasks(2) && moonitemlogic;}, },
            'Zora Bonus HP': { isAvailable: function() { return EnterMoon() && items.ZoraMask && TotalMasks(3) && moonitemlogic;}, },
            'Link Garo Chest': { isAvailable: function() { return EnterMoon() && TotalMasks(4) && Fighting() && items.Hookshot && moonitemlogic;}, },
            'Link Iron Knuckle Chest': { isAvailable: function() { return EnterMoon() && TotalMasks(4) && Fighting() && items.Hookshot && moonitemlogic;}, },
            'Link Bonus HP': { isAvailable: function() { return EnterMoon() && TotalMasks(4) && Fighting() && items.Hookshot && items.Bombchu && items.Bow >= 1 && moonitemlogic;}, },
            'Fierce Deity Mask': { isAvailable: function() { return EnterMoon() && TotalMasks(21) && items.GoronMask && items.ZoraMask && items.DekuMask && Fighting() && items.Hookshot && items.Bombchu && items.Bow >= 1 && deitylogic;}, },
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
        x: "%",
        y: "%",
        checklist: {
            'Main Room Water Spider': { isAvailable: function() { return items.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Main Room Lower Left Soil': { isAvailable: function() { return items.DekuMask && HasRangeAttack() && Fighting() && HasBottle() && skullslogic;}, },
            'Main Room Lower Right Soil': { isAvailable: function() { return items.DekuMask && HasRangeAttack() && Fighting() && HasBottle() && skullslogic;}, },
            'Main Room Pillar': { isAvailable: function() { return items.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Main Room Jar': { isAvailable: function() { return items.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Main Room Upper Soil': { isAvailable: function() { return items.DekuMask && HasRangeAttack() && Fighting() && HasBottle() && skullslogic;}, },
            'Main Room Upper Pillar': { isAvailable: function() { return items.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Main Room Near Ceiling': { isAvailable: function() { return items.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Monument Crate 1': { isAvailable: function() { return items.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Monument Crate 2': { isAvailable: function() { return items.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Monument Lower Wall': { isAvailable: function() { return items.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Monument Torch': { isAvailable: function() { return items.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Monument Spider': { isAvailable: function() { return items.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Pot Room Jar': { isAvailable: function() { return items.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Pot Room Pot 1': { isAvailable: function() { return items.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Pot Room Pot 2': { isAvailable: function() { return items.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Pot Room Behind Vines': { isAvailable: function() { return items.DekuMask && HasRangeAttack() && Fighting() && (items.Sword >= 1 || items.GreatFairySword) && skullslogic;}, },
            'Pot Room Wall': { isAvailable: function() { return items.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Pot Room Beehive 1': { isAvailable: function() { return items.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Pot Room Beehive 2': { isAvailable: function() { return items.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Gold Room Pillar': { isAvailable: function() { return items.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Gold Room Beehive': { isAvailable: function() { return items.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Gold Room Wall': { isAvailable: function() { return items.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Gold Room Near Ceiling': { isAvailable: function() { return items.DekuMask && HasRangeAttack() && Fighting() && (items.Hookshot || items.ZoraMask) && skullslogic;}, },
            'Tree Room Tree 1': { isAvailable: function() { return items.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Tree Room Tree 2': { isAvailable: function() { return items.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Tree Room Tree 3': { isAvailable: function() { return items.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Tree Room Grass 1': { isAvailable: function() { return items.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Tree Room Grass 2': { isAvailable: function() { return items.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Tree Room Beehive': { isAvailable: function() { return items.DekuMask && HasRangeAttack() && Fighting() && skullslogic;}, },
            'Mask of Truth': { isAvailable: function() { return items.SwampSkulltulas >= 30;}, },
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
        x: "%",
        y: "%",
        checklist: {
            'Entrance Left Wall': { isAvailable: function() { return canPlay(items.EponasSong) && HasExplosives() && items.GoronMask && (items.Hookshot || items.ZoraMask) && skullslogic;}, },
            'Entrance Right Wall': { isAvailable: function() { return canPlay(items.EponasSong) && HasExplosives() && items.GoronMask && (items.Hookshot || items.ZoraMask) && skullslogic;}, },
            'Entrance Web': { isAvailable: function() { return canPlay(items.EponasSong) && HasExplosives() && items.GoronMask && (items.Hookshot || items.ZoraMask) && CanUse(items.FireArrow) && skullslogic;}, },
            'Second Room Ceiling Edge': { isAvailable: function() { return canPlay(items.EponasSong) && HasExplosives() && items.GoronMask && (items.Hookshot || items.ZoraMask) && skullslogic;}, },
            'Second Room Ceiling Plank': { isAvailable: function() { return canPlay(items.EponasSong) && HasExplosives() && items.GoronMask && (items.Hookshot || items.ZoraMask) && skullslogic;}, },
            'Second Room Jar': { isAvailable: function() { return canPlay(items.EponasSong) && HasExplosives() && items.GoronMask && (items.Hookshot || items.ZoraMask) && skullslogic;}, },
            'Second Room Webbed Hole': { isAvailable: function() { return canPlay(items.EponasSong) && HasExplosives() && items.GoronMask && (items.Hookshot || items.ZoraMask) && CanUse(items.FireArrow) && skullslogic;}, },
            'Second Room Webbed Pot': { isAvailable: function() { return canPlay(items.EponasSong) && HasExplosives() && items.GoronMask && (items.Hookshot || items.ZoraMask) && CanUse(items.FireArrow) && skullslogic;}, },
            'Second Room Upper Pot': { isAvailable: function() { return canPlay(items.EponasSong) && HasExplosives() && items.GoronMask && (items.Hookshot || items.ZoraMask) && skullslogic;}, },
            'Second Room Behind Skull 1': { isAvailable: function() { return canPlay(items.EponasSong) && HasExplosives() && items.GoronMask && (items.Hookshot || items.ZoraMask) && skullslogic;}, },
            'Second Room Behind Skull 2': { isAvailable: function() { return canPlay(items.EponasSong) && HasExplosives() && items.GoronMask && (items.Hookshot || items.ZoraMask) && skullslogic;}, },
            'Second Room Lower Pot': { isAvailable: function() { return canPlay(items.EponasSong) && HasExplosives() && items.GoronMask && (items.Hookshot || items.ZoraMask) && skullslogic;}, },
            'Library Behind Picture': { isAvailable: function() { return canPlay(items.EponasSong) && HasExplosives() && items.GoronMask && (items.Hookshot || items.ZoraMask) && skullslogic;}, },
            'Library Behind Cabinet': { isAvailable: function() { return canPlay(items.EponasSong) && HasExplosives() && items.GoronMask && (items.Hookshot || items.ZoraMask) && skullslogic;}, },
            'Library On Bookshelf': { isAvailable: function() { return canPlay(items.EponasSong) && HasExplosives() && items.GoronMask && (items.Hookshot || items.ZoraMask) && skullslogic;}, },
            'Library Ceiling Edge': { isAvailable: function() { return canPlay(items.EponasSong) && HasExplosives() && items.GoronMask && (items.Hookshot || items.ZoraMask) && skullslogic;}, },
            'Library Behind Bookcase 1': { isAvailable: function() { return canPlay(items.EponasSong) && HasExplosives() && items.GoronMask && (items.Hookshot || items.ZoraMask) && skullslogic;}, },
            'Library Behind Bookcase 2': { isAvailable: function() { return canPlay(items.EponasSong) && HasExplosives() && items.GoronMask && (items.Hookshot || items.ZoraMask) && skullslogic;}, },
            'Library Hole Behind Picture': { isAvailable: function() { return canPlay(items.EponasSong) && HasExplosives() && items.GoronMask && (items.Hookshot || items.ZoraMask) && skullslogic;}, },
            'Colored Skulls Ceiling Edge': { isAvailable: function() { return canPlay(items.EponasSong) && HasExplosives() && items.GoronMask && (items.Hookshot || items.ZoraMask) && skullslogic;}, },
            'Colored Skulls Chandelier 1': { isAvailable: function() { return canPlay(items.EponasSong) && HasExplosives() && items.GoronMask && (items.Hookshot || items.ZoraMask) && skullslogic;}, },
            'Colored Skulls Chandelier 2': { isAvailable: function() { return canPlay(items.EponasSong) && HasExplosives() && items.GoronMask && (items.Hookshot || items.ZoraMask) && skullslogic;}, },
            'Colored Skulls Chandelier 3': { isAvailable: function() { return canPlay(items.EponasSong) && HasExplosives() && items.GoronMask && (items.Hookshot || items.ZoraMask) && skullslogic;}, },
            'Colored Skulls Behind Picture': { isAvailable: function() { return canPlay(items.EponasSong) && HasExplosives() && items.GoronMask && (items.Hookshot || items.ZoraMask) && skullslogic;}, },
            'Colored Skulls Pot': { isAvailable: function() { return canPlay(items.EponasSong) && HasExplosives() && items.GoronMask && (items.Hookshot || items.ZoraMask) && skullslogic;}, },
            'Storage Web': { isAvailable: function() { return canPlay(items.EponasSong) && HasExplosives() && items.GoronMask && (items.Hookshot || items.ZoraMask) && CanUse(items.FireArrow) && skullslogic;}, },
            'Storage Crate': { isAvailable: function() { return canPlay(items.EponasSong) && HasExplosives() && items.GoronMask && (items.Hookshot || items.ZoraMask) && skullslogic;}, },
            'Storage Wall': { isAvailable: function() { return canPlay(items.EponasSong) && HasExplosives() && items.GoronMask && (items.Hookshot || items.ZoraMask) && skullslogic;}, },
            'Storage Barrel': { isAvailable: function() { return canPlay(items.EponasSong) && HasExplosives() && items.GoronMask && items.Hookshot && skullslogic;}, },
            'Storage Behind Crate': { isAvailable: function() { return canPlay(items.EponasSong) && HasExplosives() && items.GoronMask && (items.Hookshot || items.ZoraMask) && skullslogic;}, },
            'Wallet Upgrade': { isAvailable: function() { return items.SwampSkulltulas >= 30;}, },
            'Colored Skulls Chest': { isAvailable: function() {return canPlay(items.EponasSong) && HasExplosives() && items.Hookshot && items.Bow >= 1 && items.CaptainsHat;}}
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
        x: "%",
        y: "%",
        isAvailable: function() {
            if (items.Bombs >=1 && items.BombersNotebook){
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: 'Mystery Woods Grotto Chest',
        x: "%",
        y: "%",
        isAvailable: function() {
            return "available";
        },
    },
    {
        name: 'Woodfall Great Fairy',
        x: "%",
        y: "%",
        isAvailable: function() {
            if (items.SwampStrayFairy >= 15 && greatfairylogic) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: 'Road to Snowhead Grotto',
        x: "%",
        y: "%",
        isAvailable: function() {
            if (HasExplosives() && items.GoronMask && items.MaskOfTruth && items.Magic >= 1) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: 'Road to Snowhead Pillar HP',
        x: "%",
        y: "%",
        isAvailable: function() {
            if (piecelogic && HasExplosives() && items.GoronMask && items.MaskOfTruth && CanUse(items.LensOfTruth) && items.Hookshot && canPlay(items.ScarecrowSong)) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: 'Snowhead Great Fairy',
        x: "%",
        y: "%",
        isAvailable: function() {
            if (items.SnowStrayFairy >= 15 && greatfairylogic) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: 'Great Bay Great Fairy',
        x: "%",
        y: "%",
        isAvailable: function() {
            if (items.OceanStrayFairy >= 15 && greatfairylogic) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: 'Ikana Great Fairy',
        x: "%",
        y: "%",
        isAvailable: function() {
            if (items.StoneStrayFairy >= 15 && greatfairylogic) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: 'Oath to Order',
        x: "%",
        y: "%",
        isAvailable: function() {
            if (WoodfallClear() || SnowheadClear() || BayClear() || StoneClear()) {
                return "available";
            }
            return "unavailable";
        },
    },
];