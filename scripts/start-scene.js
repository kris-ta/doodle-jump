export class StartScene extends Phaser.Scene {
  constructor() {
    super("StartScene");
  }

  create() {
    this.createStartButton();
  }

  createStartButton() {
    this.startButton = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      "Play",
      {
        fontFamily: "Arial",
        fontSize: "80px",
      }
    );

    this.startButton
      .setOrigin(0.5)
      .setPadding(10)
      .setStyle({ color: "#EEC772" })
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => this.scene.start("MainScene"))
      .on("pointerover", () => this.startButton.setStyle({ color: "#E8A719" }))
      .on("pointerout", () => this.startButton.setStyle({ color: "#EEC772" }));
  }
}
