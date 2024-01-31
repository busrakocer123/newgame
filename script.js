class Player {
    constructor(){
        this.width = 20;
        this.height = 10;
        this.positionX = 50;
        this.positionY = 0;
        this.playerElement = null;
        this.createPlayerElement();
    }
    createPlayerElement(){
        // step1: create the player element
        this.playerElement = document.createElement("div");
        // step2: add content or modify
        this.playerElement.setAttribute("id", "player");
        this.playerElement.style.width = this.width + "vw"
        this.playerElement.style.height = this.height + "vh"
        this.playerElement.style.left = this.positionX + "vw";
        this.playerElement.style.bottom = this.positionY + "vh";
        
        //step3: append to the dom: `parentElm.appendChild()`
        const gamePlace = document.getElementById("gamePlace");
        gamePlace.appendChild(this.playerElement);
    }
    
    moveLeft() {
        if (this.positionX > 0) {
            this.positionX--;
            this.playerElement.style.left = this.positionX + "vw";
        }
    }
    
    moveRight() {
        if (this.positionX + this.width < 100) {
            this.positionX++;
            this.playerElement.style.left = this.positionX + "vw";
        }
    }
}
class Obstacle {
    constructor(){
        this.width = 20;
        this.height = 10;
        this.positionX = Math.floor(Math.random() * (100 - this.width + 1)); // random number between 0 and (100 - this.width)
        this.positionY = 100;
        this.images = [
            "image1",
            "image2",
            
            "image10"
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
        // step1: create the element
        this.obstacleElement = document.createElement("div");
        this.obstacleElement.style.width=  this.width +"vw" ;
        this.obstacleElement.style.height= this.height+ "vh" ;
        this.obstacleElement.style.bottom=this.positionY +"vh";
        this.obstacleElement.style.left=  this.positionX + "vw";
        // step2: add content or modify
        this.obstacleElement.setAttribute("class", "obstacle");
       /* const obstacleImage = document.createElement("img");
        obstacleImage.src = this.imageSrc;
        obstacleImage.style.width = "10%";
        obstacleImage.style.height = "10%";*/

        //this.obstacleElement.appendChild(obstacleImage);

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
        this.width = 20;
        this.height = 10;
        this.positionX = Math.floor(Math.random() * (100 - this.width + 1)); // random number between 0 and (100 - this.width)
        this.positionY = 100;
        this.images = [
            "image1",
            "image2",
            
            "path/to/image10.png"
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
        const pointImage = document.createElement("img");
        pointImage.src = this.imageSrc;
        pointImage.style.width = "10%";
        pointImage.style.height = "10%";

        this.pointElement.appendChild(pointImage);

        const gamePlace = document.getElementById("gamePlace");
        gamePlace.appendChild(this.pointElement);

    }
    moveDown(){
        this.positionY--;
        this.pointElement.style.bottom = this.positionY + "vh"; 
    }
}

class Result{
    constructor(){
        this.width = 10;
        this.height = 10;
        this.positionX = 0;
        this.positionY = 100;
        this.resultElement = null;
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
            pointInstance.increaseScore(); // Puanı artırma
            points.splice(index, 1); // Toplanan puanı listeden kaldır
            result.showResult(player.score);
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



document.getElementById("startButton").addEventListener("click", startGame);


function startGame() {
    
    document.getElementById("startButton").style.display = "none";

    
    console.log("Game started!");
}
