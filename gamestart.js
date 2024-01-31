window.onload = function () {
    const startButton = document.getElementById("start-button");
    
    startButton.addEventListener("click", function () {
      startGame();
    });
  
    function startGame() {
      console.log("start game");
    }
  };

  class Screen{
    constructor(){
        
        this.screenElement = null;
        this.createScreenElement();
    }
    createScreenElement(){
        // step1: create the player element
        this.screenElement = document.createElement("div");
        // step2: add content or modify
        this.screenElement.setAttribute("id", "screen");
        this.screenElement.style.backgroundColor= 
        this.playerElement.style.width = this.width + "vw"
        this.playerElement.style.height = this.height + "vh"
        this.playerElement.style.left = this.positionX + "vw";
        this.playerElement.style.bottom = this.positionY + "vh";
        
        
    }