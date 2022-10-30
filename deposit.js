(async function(){
  function depositCash(){
    Ajax.remoteCall(
      'building_bank',
      'deposit',
      { town_id: Character.homeTown.town_id, amount: Character.money }
    );
  }
  async function statePlayerInHomeTown(){
    while(Character.position.x == Character.homeTown.x && Character.position.y == Character.homeTown.y)
      await TW_SF.sleep(0.1)
    statePlayerNotInHomeTown()
  }
  async function statePlayerNotInHomeTown(){
    while(Character.position.x != Character.homeTown.x || Character.position.y != Character.homeTown.y)
      await TW_SF.sleep(0.1)
    if(Character.money > 100)
      TW_SF.showMessage(TW_SF.getLocalString("moneyDeposit"),60,depositCash)
    statePlayerInHomeTown()
  }
})()
