async function sleep(s) {
    await new Promise(r => setTimeout(r, 1 + s * 1000));
}

let functionCollection = (function(){
    function TW_SF() {
        this.languages = ""
        this.lang = "en"
        this.getLocalString = function(item){
            return item;
        };
        
        this.sleep = async function sleep(s) {
            await new Promise(r => setTimeout(r, 1 + s * 1000));
        }

        this.showMessage = async function (str,duration,callback){
            if(duration == undefined)
                duration = 12
            let a = "";
            a = new west.gui.Dialog(str)
            a.setY(100)
            a.setX(500);
            a.show();
            a.setBlockGame(false);
            a.addButton(this.getLocalString("close"), function(){})
	    if(typeof callback == "function")
	    	a.addButton(this.getLocalString("ok"),callback())
            await this.sleep(3+duration);
            a.hide();
        }
        this.playSound = async function(){
            new Notification("");
            await this.sleep(0.5);
            let audio = new Audio("https://www.myinstants.com/media/sounds/sirene_1.mp3");
            audio.loop = false;
            audio.play();
            await this.sleep(50);
        }
        this.loadScript = function(scriptUrl){
            (function(document, tag) {
                let scriptTag = document.createElement(tag),
                    firstScriptTag = document.getElementsByTagName(tag)[0];
                scriptTag.src = scriptUrl;
                firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);
            }(document, 'script'));
        }
        this.extendFunction = function(object,functionName,additionalFunction){
            let store = object[functionName];
            object[functionName] = function (){
                store();
                (async function(){
                    await sleep(0.3);
                    additionalFunction();
                })()
            }
        }
        
    }

    let instance;

    return {
        getTW_SF: function(){
            if (!instance) {
                instance = new TW_SF();
                delete instance.constructor;
            }
            return instance;
        }
    };
})();
let TW_SF = functionCollection.getTW_SF();

(async function(){
    let request = await fetch("https://s-schmitti.github.io/TW-Schmittis_Functions/language.json")
    let response = await request.json()
    TW_SF.languages = response;
    TW_SF.lang = Game.locale.split("_")[0];

    TW_SF.getLocalString = function(item){
      if(this.languages[item][this.lang]==undefined)
        return this.languages[item]["en"]
      return this.languages[item][this.lang]
    }
})();

(function(){
    fetch("https://s-schmitti.github.io/TW-Schmittis_Functions/scripts.csv")
        .then(response => response.text())
        .then(result => {console.log(result); result.split(",").forEach(function(file){
	        if(!file.includes("schmitti.user.js") && file != "main.js"){
				console.log(file)
		        TW_SF.loadScript("https://s-schmitti.github.io/TW-Schmittis_Functions/" + file)
			}
        })
    })
})();
