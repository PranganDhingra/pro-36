var dog,happydog;
var database,foodS,foodStock;
var dogImg1,dogImg2;
var button1 , button2;
var fedTime;
var readState,gameState;
var food;
var c;


function preload()
{

  dogImg1=loadImage("dogImg.png");
  dogImg2=loadImage("dogImg1.png")
  
}

function setup() {

  database=firebase.database();
  createCanvas(950, 500);

  dog = createSprite(850,250,20,20);
  dog.addImage(dogImg1);
  dog.scale=0.2;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  food= new Food();

  fedTime=database.ref('FeedTime');
  fedTime.on('value',function(data){
    lastFed=data.val();
  });
  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  });
  

  var button1 = createButton('Feed the dog ');
  button1.position(750, 300);
  button1.mousePressed(feedDog);

  var button2=createButton('Add food');
  button2.position(850,300);
  button2.mousePressed(addFood);

  var c=createButton('Continue');
  c.position(1150,150);
 
  var input = createInput("Write your dog name here");
  input.position(1050,100);
  
  c.mousePressed(function(){
    input.hide();
    c.hide();

    var name = input.value();
    
    
    var greeting = createElement('h3');
    greeting.html("Your dog " + name + " is here , feed him" )
    greeting.position(876, 372)
  });
  
}


function draw() { 

  currentTime = hour();

  background(rgb(255, 184, 162));

  dog.display();
  food.display();

  drawSprites();

  textSize(20);
  fill(46,139,87);
  text("Food Remaining: "+foodS,170,100);
  
  if(fedTime>=12)
        {
        
        fill("green");
        textSize(15); 
        text("Last Fed : "+ fedTime%12 + " PM", 170,70);
        }
        else if(fedTime==0)
        {
        
            fill("green");
            textSize(15); 
             text("Last Fed : 12 AM",170,70);
        }
        else
        {
        
            fill("green");
            textSize(15); 
            text("Last Fed : "+ fedTime + " AM", 170,70);
        }

}
function readStock(data){
  foodS = data.val();
  food.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(dogImg2);
  
   foodS--
   database.ref('/').update({
   Food:foodS
  })
  fedTime=hour();
  }

function addFood(){
  dog.addImage(dogImg1);
foodS++
database.ref('/').update({
  Food:foodS
})
}
