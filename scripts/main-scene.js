class MainScene {
  highestBaguetteY = 0;
  distanceBetweenBaguettes = 150;

  // This function is called once - it loads sprites
  preload() {
    this.load.image("guy", "images/guy.png");
    this.load.image("baguette", "images/baguette.png");
  }

  // This function is called once - it adds sprites to the scene,
  // sets up the camera, etc.
  create() {
    this.createGuy();
    this.generateStartingBaguette();
    this.setupCamera();
    this.createScoreText();

    this.arrow = this.input.keyboard.createCursorKeys();
  }

  // This function is called repeatedly in a loop - it's responsible
  // for moving the character, detect where it is, etc.
  update() {
    // Move guy to the right if the right arrow button is pressed
    if (this.arrow.right.isDown) {
      this.guy.x += 10;
    }

    // Move guy to the left if the left arrow button is pressed
    if (this.arrow.left.isDown) {
      this.guy.x -= 10;
    }

    // Put guy on the left of the scene if he crosses the right border
    if (this.guy.x > this.cameras.main.width) {
      this.guy.x = 0;
    }

    // Put guy on the right of the scene if he cross the left border
    if (this.guy.x < 0) {
      this.guy.x = this.cameras.main.width;
    }

    // Give guy velocity to move upwards when he touches a platform
    if (this.guy.body.touching.down) {
      this.guy.setVelocityY(-700);
    }

    // Check if the guy is lower than the camera view
    const cameraBottomBoundary =
      this.cameras.main.height + this.cameras.main.scrollY;

    if (this.guy.y > cameraBottomBoundary) {
      this.gameOver();
    }

    // Generete a new baguette as soon as the highest baguette is within the view of the camera
    if (this.highestBaguetteY > this.cameras.main.scrollY) {
      this.generateNextBaguette();
    }

    if (!this.gameEnded) {
      this.updateScoreText();
    }
  }

  // Setting up the camera
  setupCamera() {
    this.cameras.main.startFollow(this.guy);
    this.cameras.main.setLerp(0, 1); // x = don't follow the guy, y = follow the guy with the specific speed
    this.cameras.main.setDeadzone(0, 400);
    this.cameras.main.setFollowOffset(0, 220);
  }

  // Creating the guy
  createGuy() {
    this.guy = this.physics.add.sprite(
      this.cameras.main.centerX,
      this.cameras.main.height - 200,
      "guy"
    );

    this.guy.displayWidth = 60;
    this.guy.displayHeight = 60;
    this.guy.setGravityY(800);
    this.guy.body.checkCollision.up = false;
  }

  // Creating a baguette on the specified position
  createBaguette(positionX, positionY) {
    const baguette = this.physics.add.sprite(positionX, positionY, "baguette");

    baguette.displayWidth = 170;
    baguette.displayHeight = 25;
    baguette.setImmovable();

    this.physics.add.collider(this.guy, baguette);

    return baguette;
  }

  // Generate a new baguette a bit higher than the current highest baguette
  generateNextBaguette() {
    const randomPositionX = Math.random() * this.cameras.main.width;

    const baguette = this.createBaguette(
      randomPositionX,
      this.highestBaguetteY - this.distanceBetweenBaguettes
    );

    this.highestBaguetteY = baguette.y;
  }

  // Create a starting baguette in the center of the screen
  generateStartingBaguette() {
    const positionY = this.cameras.main.height - 30;
    const startingBaguette = this.createBaguette(
      this.cameras.main.centerX,
      positionY
    );

    this.highestBaguetteY = startingBaguette.y;
  }

  gameOver() {
    this.cameras.main.setFollowOffset(0, -100);
    this.guy.body.checkCollision.down = false;
    this.gameEnded = true;

    this.gameOverText = this.add.text(
      this.cameras.main.centerX - 130,
      this.cameras.main.centerY,
      "Game Over",
      {
        fontFamily: "Arial",
        fontSize: "50px",
      }
    );
    this.gameOverText.scrollFactorY = 0;
  }

  createScoreText() {
    this.scoreText = this.add.text(10, 10, "Score: 0", {
      fontFamily: "Arial",
      fontSize: "20px",
    });
    this.scoreText.scrollFactorY = 0;
  }

  updateScoreText() {
    const score =
      this.cameras.main.scrollY > 0
        ? 0
        : Math.round(Math.abs(this.cameras.main.scrollY)) - 9;
    this.scoreText.setText(`Score: ${score}`);
  }
}
