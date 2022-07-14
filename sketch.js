var racetrack, racetrackimg
var car, carimg
var boundaryLeft, boundaryRight
var monsterimg, monsterGroup
var lives = 1
var PLAY = 1
var END = 0
var gamestate = PLAY
var gameOverimg, gameOver
var restartimg, restart
var distanceTravelled = 0

function preload() {
  racetrackimg = loadImage('Background-overlay.gif')
  carimg = loadImage('Car.gif')
  monsterimg = loadImage('Monster.gif')
  gameOverimg = loadImage('GameOver.jpg')
  restartimg = loadImage('restart button.gif')
}

function setup() {
  createCanvas(800, 800);
  racetrack = createSprite(400, 400)
  racetrack.addImage(racetrackimg)
  racetrack.scale = 3
  racetrack.velocityY = 5
  boundaryLeft = createSprite(40, 400, 20, 800)
  boundaryLeft.visible = false
  boundaryRight = createSprite(760, 400, 20, 800)
  boundaryRight.visible = false
  car = createSprite(400, 700)
  car.addImage(carimg)
  car.scale = 0.25
  monsterGroup = new Group()
  gameOver = createSprite(400, 300, 100, 100)
  gameOver.addImage(gameOverimg)
  gameOver.visible = false
  restart = createSprite(width / 2, 550, 50, 50)
  restart.addImage(restartimg)
  restart.visible = false
  restart.scale = 0.25
}

function draw() {
  background(51);
  if (gamestate === PLAY) {
    
    if (racetrack.y > 600) {
      racetrack.y = 400
    }
    if (keyDown(LEFT_ARROW)) {
      car.x = car.x - 5
    }
    if (keyDown(RIGHT_ARROW)) {
      car.x = car.x + 5
    }
    if (monsterGroup.isTouching(car)) {
      lives -= 1
      monsterGroup.destroyEach()
    }
    if (lives < 1) {
      gamestate = END
    }
    spawnMonsters()

  } else if (gamestate === END) {
    racetrack.velocityY = 0
    monsterGroup.setVelocityYEach(0)
    monsterGroup.destroyEach()
    gameOver.visible = true
    car.visible = false
    restart.visible = true
    if (mousePressedOver(restart)) {
      reset()
    }

  }
  car.collide(boundaryLeft)
  car.collide(boundaryRight)
  drawSprites();
}
function spawnMonsters() {
  if (frameCount % 50 === 0) {
    var monster = createSprite(Math.round(random(60, 740)), -10, 25, 25)
    monster.addImage(monsterimg)
    monster.velocityY = 7
    monster.scale = 0.25
    monsterGroup.add(monster)
    monster.lifetime = 170
  }
}
function reset() {
  gamestate = PLAY
  peopleCount = 0
  peopleSaved = 0
  foodBar = 0
  lives = 5
  car.visible = true
  gameOver.visible = false
  restart.visible = false
  racetrack.velocityY = 5
  distanceTravelled = 0
}