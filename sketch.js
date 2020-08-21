var monkey, monkey_running, monkey_jumping;
var banana, bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var edges, score, gameState, PLAY, END;
var scene1, scene2, sceneImage;

function preload() {
  sceneImage = loadImage("forest.jpg");

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  monkey_jumping = loadAnimation("sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}

function setup() {
  createCanvas(600, 400);

  scene1 = createSprite(width / 2, height / 2, width, height);
  scene2 = createSprite(width * 1.5, height / 2, width, height);

  scene1.addImage(sceneImage);
  scene2.addImage(sceneImage);
  scene1.scale = 0.601;
  scene2.scale = 0.601;
  monkey = createSprite(75, 350, 30, 50);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("jumping", monkey_jumping);
  //monkey.velocityY=-5;
  monkey.scale = 0.1;
  edges = createEdgeSprites();
  bananaGroup = [];
  obstacleGroup = [];
  PLAY = 1;
  END = 0;
  gameState = PLAY;
  score = 0;
}

function draw() {
  background("white");

  if (gameState === PLAY) {
    scene1.velocityX = -2;
    scene2.velocityX = -2;
    score = score + 1;
    if (keyDown("space") && monkey.y > 360) {
      monkey.velocityY = -10;

    }
    if (scene1.x < -width / 2) {
      scene1.x = width / 2;
      scene2.x = width * 1.5;
    }
    monkey.velocityY = monkey.velocityY + 0.5;
    if (monkey.y < 350) {
      monkey.changeAnimation("jumping");

    } else {
      monkey.changeAnimation("running");
    }
    for (var i = 0; i < bananaGroup.length; i++) {
      if (monkey.isTouching(bananaGroup[i])) {
        bananaGroup[i].destroy();
        score = score + 50;
      }
    }
    for (var i = 0; i < obstacleGroup.length; i++) {
      if (monkey.isTouching(obstacleGroup[i])) {
        gameState = END;
      }
    }
    spawnBanana();
    spawnObstacles();
  }

  monkey.collide(edges);
  drawSprites();
  fill("white");
  text("Bananas: " + score, 425, 50);
  if (gameState === END) {
    scene1.velocityX = 0;
    scene2.velocityX = 0;
    for (var i = 0; i < bananaGroup.length; i++) {
      bananaGroup[i].velocityX = 0;
      bananaGroup[i].destroy();
    }
    for (var i = 0; i < obstacleGroup.length; i++) {
      obstacleGroup[i].velocityX = 0;
      obstacleGroup[i].destroy();
    }
    monkey.changeAnimation("jumping");
    monkey.velocityY = 0;
    fill("white");
    textSize(25);
    textAlign(CENTER);
    text("Game Over!", 300, 100);
    text("Press r to Reset", 300, 200);
    if (keyDown("r")) {
      gameState = PLAY;
    }
  }
}

function spawnBanana() {
  if (frameCount % 60 === 0) {
    banana = createSprite(width, 200, 40, 40);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.y = Math.round(random(225, 300));
    banana.lifetime = 202;
    bananaGroup.push(banana);
  }

}

function spawnObstacles() {
  if (frameCount % 100 === 0) {
    obstacle = createSprite(width, 380, 40, 40);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -6;
    obstacle.lifetime = 302
    obstacleGroup.push(obstacle);
  }

}