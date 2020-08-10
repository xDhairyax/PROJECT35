//Create variables here
var dog,happyDog,dogIMG;
var database;
var foods,foodStock;

var addFood,feedFood;
var fedTime,lastFed;
var foodObj;


function preload()
{
  //load images here
  dogIMG=loadImage("Dog.png");
  happyDog=loadImage("happydog.png");
}

function setup() {
  createCanvas(500,500);

  addFood=createButton("ADD FOOD");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feedFood=createButton("FEED PET");
  feedFood.position(700,95);
  feedFood.mousePressed(feedFoods);

  database=firebase.database();

  dog=createSprite(250,250);
dog.addImage(dogIMG);
dog.scale=0.2;

  foodStock=database.ref('food');
  foodStock.on("value",readStock);

  foodObj=new Food();
  
}


function draw() {  
background(209,159,102);

foodObj.display();

//if(keyWentDown(UP_ARROW)){
  //writeStock(foods);
  //dog.addImage(happyDog);
//dog.scale=0.2;
//}

//if(keyWentDown(32)){
 // writeStock(foods);
  //dog.addImage(dogIMG);
  //dog.scale=0.2;
//}
text("Food:"+foods,210,150);
//text("Press UP_ARROW key to swap the image",170,50);
//text("Press space key to swap the image",170,70);

fedTime=database.ref('feedTime');
fedTime.on("value",function(data){
  lastFed=data.val();
});


fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed :"+ lastFed%12 +"PM",350,30);
}else if(lastFed==0){
  text("Last Feed : 12 AM",350,30);
}else{
  text("Last Feed : "+ lastFed + "AM",350,30);
}

  drawSprites();
  //add styles here

}
  function readStock(data){
   foods=data.val();
  }

/*function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
database.ref('/').update({
  FOOD:x
})
}*/

function addFoods(){
  foods++
  database.ref('/').update({
    food:foods
  })

}

function feedFoods(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
  food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}

