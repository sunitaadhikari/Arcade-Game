//Start position of the enemy
var ENEMY_X_START = -100;
//Farthest position enemies can move to the right of the screen
var ENEMY_MAX_X_BOUNDS = 500;
//Slowest posible speed of the enemy
var ENEMY_BASE_SPEED = 200;
//Unit the player moves upward and downward each time up/down arrows are pressed
var PLAYER_Y_MOVE_UNITS = 90;
//Unit the player moves right and left each time up/down arrows are pressed
var PLAYER_X_MOVE_UNITS = 100;
//Farthest position the player can move to the left of the screen
var PLAYER_LEFT_BOUNDS = 0;
//Farthest position the player can move to the right of the screen
var PLAYER_RIGHT_BOUNDS = 400;
//Farthest position the player can move to the top of the screen
var PLAYER_UP_BOUNDS = 10;
//Farthest position the player can move to the bottom of the screen
var PLAYER_DOWN_BOUNDS = 330;
//X coordinate where the player will be in the beginning of the game
var PLAYER_START_X = 200;

//Y coordinate where the player will be in the beginning of the game
var PLAYER_START_Y = PLAYER_DOWN_BOUNDS + PLAYER_Y_MOVE_UNITS;

/*Collision Offset is added to or subtracted from X and Y coordinates
 difference between the player and the enemy, while detecting collision. This is
 done to create a slight overlap between the player and the enemy, giving it a
 collision effect, which will then reset the game.*/
var COLLISION_OFFSET = 30;

//Y coordinates of the three stone block lanes where the enemies start their movement
var LANE_ONE_Y_CO = 74;

var LANE_TWO_Y_CO = 148;

var LANE_THREE_Y_CO = 222;

// This function returns a random lane's y coordinate. This is used when deploying the enemy to a certain lane in a random order.
function getRandomLanesYCo(){
	//These are the y coordinates of the first, second and third lane respectively
	var laneYCo = [LANE_ONE_Y_CO, LANE_TWO_Y_CO, LANE_THREE_Y_CO];

	//Return a random lane coordinate out of the 3 lanes.
	return laneYCo[Math.floor(Math.random() * 3)]
}

//This function returns a random speed constant. Since different enemy would need to move at different speed, in order to avoid making the game too predictable.
function getRandomSpeed(){
	return ENEMY_BASE_SPEED * (Math.floor(Math.random() * 2) + 1);
}

//Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = ENEMY_X_START;
    this.y = getRandomLanesYCo();
    this.speed = getRandomSpeed();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x > ENEMY_MAX_X_BOUNDS){
    	//Once the enemy has reached the end board's x-coordinate, we need to reset their x to the original start coordinate
    	this.x = ENEMY_X_START;
    	//Re-Assign a random lane and speed.
    	this.randomize();
    } else {
    	this.x += (dt * this.speed);
	}
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//This function randomizes the lane assignment and the speed of the enemy
Enemy.prototype.randomize = function(){
	this.y = getRandomLanesYCo();
	this.speed = getRandomSpeed();
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
	this.sprite = 'images/char-boy.png';
	this.x = PLAYER_START_X;
	//When the game initializes, the player starts at a lower y coordinate this is done to indicate to the user that either game has just begun or the player has just re-spawned after being killed.
	this.y = PLAYER_START_Y;
};

Player.prototype.update = function(dt){
	//This does not need to be defined for the player because player only responds to arrow keys input from the user. These moves have been handled in moveLeft, moveRight, moveUp and moveDown functions respectively.
}

Player.prototype.render = function(){
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.moveLeft = function(){
	if(this.x > PLAYER_LEFT_BOUNDS){
		this.x -= PLAYER_X_MOVE_UNITS;
	}
}

Player.prototype.moveRight = function(){
	if(this.x < PLAYER_RIGHT_BOUNDS){
		this.x += PLAYER_X_MOVE_UNITS;
	}
}

Player.prototype.moveUp = function(){
	if(this.y > PLAYER_UP_BOUNDS){
		this.y -= PLAYER_Y_MOVE_UNITS;
	}
}

Player.prototype.moveDown = function(){
	if(this.y < PLAYER_DOWN_BOUNDS){
		this.y += PLAYER_Y_MOVE_UNITS;
	}
}

Player.prototype.handleInput = function(key) {
	switch(key){
		case 'left':
			this.moveLeft();
			break;
		case 'right':
			this.moveRight();
			break;
		case 'up':
			this.moveUp();
			break;
		case 'down':
			this.moveDown();
			break;
		default:
			break;
	}
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();

var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

