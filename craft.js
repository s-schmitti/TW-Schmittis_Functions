(async function(){
    console.log("extended Crafting")
    await TW_SF.sleep(2)
    TW_SF.extendFunction(CharacterWindow.Crafting, "init", function(){
        for(let i = 0 ; i < document.getElementsByClassName("displayValue unselectable").length; i++){
            document.getElementsByClassName("displayValue unselectable")[i].onclick = function() {
                const amount = prompt(
                    (TW_SF.getLocalString("amount") + ': '),
                );
                console.log(amount)
                try {
                    this.parentElement.getElementsByClassName("butPlus")[0].remove()
                    this.parentElement.getElementsByClassName("butMinus")[0].remove()
                } catch(err) {}

                if( amount > 0 )
                    this.innerText = "" + amount + ""
            }
            document.getElementsByClassName("displayValue unselectable")[i].style += ";cursor:pointer"
        }
    });
})()

function ReceipeWatchDog(id){
    this.id = id;
    this.canCraft = function(){
        try {
            if(this.areEnoughItemsInInventory())
                return (Crafting.recipes[this.id].last_craft == null) || (Crafting.recipes[this.id].last_craft >= Crafting.recipes[this.id].blocktime);
        } catch (err) {}
        return false;
    }

    this.areEnoughItemsInInventory = function(){
        let result = true;
        Crafting.recipes[this.id].resources.forEach(function(ingredient){
            if(Bag.getItemCount(ingredient.item) < ingredient.count)
                result = false;
        })
        return result;
    }

    this.start = async function() {
        while(true){
            await TW_SF.sleep(10);
            if(this.canCraft()){
                TW_SF.showMessage(TW_SF.getLocalString("Crafting"), 3600)
                return;
            }
        }
    }
    this.start();
}

(async function() {
    CharacterWindow.open('crafting');
    CharacterWindow.window.destroy()
    if(Character.professionId == 1) { 
        new ReceipeWatchDog(52524000);
    }
    if(Character.professionId == 2){ 
        new ReceipeWatchDog(52523000);
    }
    if(Character.professionId == 3){
        new ReceipeWatchDog(52526000);
    }
    if(Character.professionId == 4){
        new ReceipeWatchDog(52525000);
    }
})();
