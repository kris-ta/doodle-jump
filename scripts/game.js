import { StartScene } from "./start-scene.js";
import { MainScene } from "./main-scene.js";
import { GameOverScene } from "./game-over-scene.js";

const game = new Phaser.Game({
  scene: [StartScene, MainScene, GameOverScene],
  backgroundColor: "#333",
  physics: { default: "arcade" },
});
