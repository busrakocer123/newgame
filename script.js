class Player {
    constructor(){
        this.width = 10;
        this.height = 30;
        this.positionX = 50;
        this.positionY = 0;
        this.score=null;
        this.playerElement = null;
        this.createPlayerElement();
    }
    createPlayerElement(){
       
        this.playerElement = document.createElement("div");
        
        this.playerElement.setAttribute("id", "player");
        this.playerElement.style.width = this.width + "vw"
        this.playerElement.style.height = this.height + "vh"
        this.playerElement.style.left = this.positionX + "vw";
        this.playerElement.style.bottom = this.positionY + "vh";
        
        
        const gamePlace = document.getElementById("gamePlace");
        gamePlace.appendChild(this.playerElement);
    }
    increaseScore() {
        this.score++;
        console.log("Score: " + this.score);
        return this.score; }
    
    moveLeft() {
        if (this.positionX > 0) {
            this.positionX= this.positionX-5;
            this.playerElement.style.left = this.positionX + "vw";
        }
    }
    
    moveRight() {
        if (this.positionX + this.width < 100) {
            this.positionX=this.positionX+5;
            this.playerElement.style.left = this.positionX + "vw";
        }
    }
}
class Obstacle {
    constructor(){
        this.width = 10;
        this.height = 15;
        this.positionX = Math.floor(Math.random() * (100 - this.width + 1)); // random number between 0 and (100 - this.width)
        this.positionY = 100;
        this.images = [
            "./images/i1.png",
            "./images/i2.png",
            "./images/i3.png",
            "./images/i4.png",
            "./images/i5.png",
           /* "./images/insect2.png",
            "./images/insect3.png",
            "./images/insect4.png",
            "./images/insect5.png",*/
            
            
            
        ];
        this.imageSrc = this.getRandomImage();
        
        this.obstacleElement = null;
        this.createObstacleElement();
    }

    getRandomImage() {
        const randomIndex = Math.floor(Math.random() * this.images.length);
        return this.images[randomIndex];
    }
    createObstacleElement() {
        
        this.obstacleElement = document.createElement("div");
        this.obstacleElement.style.width=  this.width +"vw" ;
        this.obstacleElement.style.height= this.height+ "vh" ;
        this.obstacleElement.style.bottom=this.positionY +"vh";
        this.obstacleElement.style.left=  this.positionX + "vw";
        // step2: add content or modify
        this.obstacleElement.setAttribute("class", "obstacle");
       const obstacleImage = document.createElement("img");
        obstacleImage.src = this.imageSrc;
        obstacleImage.style.width = this.width +"vw" ;
        obstacleImage.style.height = this.height+ "vh" ;

        this.obstacleElement.appendChild(obstacleImage);

       const gamePlace = document.getElementById("gamePlace");
        gamePlace.appendChild(this.obstacleElement);
    }
    moveDown(){
        this.positionY--;
        this.obstacleElement.style.bottom = this.positionY + "vh"; 
    }
}

class Point {
    constructor(){
        this.width = 10;
        this.height = 15;
        
        this.positionX = Math.floor(Math.random() * (100 - this.width + 1)); // random number between 0 and (100 - this.width)
        this.positionY = 100;
        this.images = [
            "./images/milk2.png",
            "./images/cookie.png",
           
        ];
        this.imageSrc = this.getRandomImage();
        this.score=0;
        
        this.pointElement = null;
        this.createPointElement();
    }

        increaseScore() {
            this.score++;
            console.log("Score: " + this.score);
            return this.score;
    }

    getRandomImage() {
        const randomIndex = Math.floor(Math.random() * this.images.length);
        return this.images[randomIndex];
    }

     createPointElement() { 
        
        this.pointElement = document.createElement("div");
      
        this.pointElement.setAttribute("class", "point");
        
        this.pointElement.style.width=  this.width +"vw" ;
        this.pointElement.style.height= this.height+ "vh" ;
        this.pointElement.style.bottom=this.positionY +"vh";
        this.pointElement.style.left=  this.positionX + "vw";
        const pointImage = document.createElement("img");
        pointImage.src = this.imageSrc;
        pointImage.style.width = this.width +"vw" ;
        pointImage.style.height = this.height+ "vh" ;

        this.pointElement.appendChild(pointImage);

        const gamePlace = document.getElementById("gamePlace");
        gamePlace.appendChild(this.pointElement);

    }
    moveDown(){
        this.positionY--;
        this.pointElement.style.bottom = this.positionY + "vh"; 
    }

    removePoint() {
        this.pointElement.parentNode.removeChild(this.pointElement);
    }

}

class Result{
    constructor(){
        this.width = 10;
        this.height = 10;
        this.positionX = 0;
        this.positionY = 90;
        this.resultElement = null;
        this.score= null;
        this.createResultElement();
       }  
        createResultElement(){

            
                
            this.resultElement = document.createElement("div");
               
            this.resultElement.setAttribute("id", "result");
            this.resultElement.style.width = this.width + "vw"
            this.resultElement.style.height = this.height + "vh"
            this.resultElement.style.left = this.positionX + "vw";
            this.resultElement.style.bottom = this.positionY + "vh";
                
                
            const gamePlace = document.getElementById("gamePlace");
            gamePlace.appendChild(this.resultElement);

            }

            showResult(score){
                 this.resultElement.innerHTML = "Score: " + score;

            }

        }

const player = new Player();
const obstacles = []; 
const points = [];
const result = new Result();

 function startGameFunction(){    
    
document.getElementById("startButton").style.display = "none";   



setInterval(() => {
    
    const newObstacle = new Obstacle();
    obstacles.push(newObstacle);

    const newPoint = new Point();
    points.push(newPoint);

}, 3000);

setInterval(() => {
    obstacles.forEach((obstacleInstance) => {
        obstacleInstance.moveDown();

        if (
            player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
            player.positionX + player.width > obstacleInstance.positionX &&
            player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
            player.positionY + player.height > obstacleInstance.positionY
        ) {
            console.log("game over");
            location.href = "gameover.html";
        }
    });

    points.forEach((pointInstance, index) => {
        pointInstance.moveDown();

        if (
            player.positionX < pointInstance.positionX + pointInstance.width &&
            player.positionX + player.width > pointInstance.positionX &&
            player.positionY < pointInstance.positionY + pointInstance.height &&
            player.positionY + player.height > pointInstance.positionY
        ) {
            console.log("point collected");
            player.increaseScore(); // Oyuncunun skorunu artır
            points.splice(index, 1); // Toplanan puanı listeden kaldır
            result.showResult(player.score); 
            pointInstance.removePoint();
        }
    });
}, 30);

document.addEventListener("keydown", (e) => {
    if (e.code === 'ArrowLeft') {
        player.moveLeft();
    } else if (e.code === 'ArrowRight') {
        player.moveRight();
    }
});

 }

document.getElementById("startButton").addEventListener("click", startGameFunction );


// function startGame() {
    
//     document.getElementById("startButton").style.display = "none";

    
//     console.log("Game started!");
// }

 
/*

class button {
    constructor(){
        this.width = 20;
        this.height = 10;
        this.positionX = 50;
        this.positionY = 0;
        this.buttonElement = null;
        this.createButtonElement();
    }
    createButtonElement(){
        
        this.buttonElement = document.createElement("div");
        // step2: add content or modify
        this.buttonElement.setAttribute("id", "button");
        this.buttonElement.style.width = this.width + "vw"
        this.buttonElement.style.height = this.height + "vh"
        this.buttonElement.style.left = this.positionX + "vw";
        this.buttonElement.style.bottom = this.positionY + "vh";
        
        //step3: append to the dom: `parentElm.appendChild()`
        const gamePlace = document.getElementById("gamePlace");
        gamePlace.appendChild(this.playerElement); */