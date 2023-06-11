export class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOverScene");
  }

  create() {
    this.createGameOverText();
    this.createPlayAgainButton();
  }

  createGameOverText() {
    this.gameOverText = this.add
      .text(this.cameras.main.centerX, this.cameras.main.centerY, "Game Over", {
        fontFamily: "Arial",
        fontSize: "80px",
      })
      .setOrigin(0.5);
  }

  createPlayAgainButton() {
    this.playAgainButton = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.height - 200,
      "Play Again",
      {
        fontFamily: "Arial",
        fontSize: "80px",
      }
    );

    this.playAgainButton
      .setOrigin(0.5)
      .setPadding(10)
      .setStyle({ color: "#EEC772" })
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => this.scene.start("MainScene"))
      .on("pointerover", () =>
        this.playAgainButton.setStyle({ color: "#E8A719" })
      )
      .on("pointerout", () =>
        this.playAgainButton.setStyle({ color: "#EEC772" })
      );
  }
}
