//Create the variables here. 
var dog, dogImage, happyDog;
var database, foods, foodStock;
var feedTime, lastFed;
var foodObj;

function preload(){
  //Load the images here. 
  dogImage = loadImage("dogImg.png");
  happyDog = loadImage("dogImg2.png");

}

function setup(){
  database = firebase.database();
  createCanvas(1000, 500);

  foodObj = new Food();

  dog = createSprite(800,220,150,150);
  dog.addImage(dogImage);
  dog.scale = 0.15;

  feed = createButton("Feed Drago!");
  feed.position(700,95);  
  feed.mousePressed(feedDog);

  addFood = createButton("Add More Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw(){
  background(46,139,87);

  feedTime = database.ref('feedTime')
  feedTime.on("value", function(data){
  lastFed = data.val();
  })

  fill(255);
  textSize(20);

  if(lastFed >= 12){
    text("Last Fed: " + lastFed%12 + " P.M.", 65, 40);
  }

  else if(lastFed === 0){
    text("Last Fed: 12 A.M.", 65, 40);
  }

  else{
    text("Last Fed:" + lastFed + " A.M", 65, 40);
  }

  foodObj.display();
  drawSprites();
}

function readStock(data){
  foods = data.val();
  foodObj.updateFoodStock(foods);
}

function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}

function addFoods(){
  foods+=1;
  foodObj.updateFoodStock(foodObj.getFoodStock() + 1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    Food:foods
  })
}