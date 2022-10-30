(function(){

  function isLongTimerActiveNow(){
    return new Date(Premium.endTimes.character * 1000) > new Date(new Date() -1  + 1000 * 60 * 60);
}

async function checkBuffs() {
    let request = await fetch(document.baseURI.split('#')[0] + "?window=character&mode=ajax_get_buffs", {
        "credentials": "include",
        "headers": {
            "User-Agent": navigator.userAgent,
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "Accept-Language": "de,en-US;q=0.7,en;q=0.3",
            "X-Requested-With": "XMLHttpRequest",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin"
        },
        "referrer": document.baseURI.split('#')[0],
        "method": "POST",
        "mode": "cors"
    });
    let response = await request.json();
    if(response.msg.items.weapon_hand != "left_arm"){
        showMessage("kein Fortkampfbuff eingenommen")
        playSound();
        await sleep(10)
        if(!isLongTimerActiveNow())
            showMessage("kein Char-PA aktiv")
    }
}

async function monitorFortBattles(){
    while(true){
        try {
            if(!document.getElementsByClassName("timer")[0].innerText.includes("h"))
                checkBuffs()
        } catch(err) {
        }
        await sleep(600)
    }
}
})
