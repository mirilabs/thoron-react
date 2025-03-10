import GameObject from "@/engine/GameObject";
import Vector2 from "@/engine/utils/Vector2";
import { Position } from "@/engine/components";
import DrawHandler from "@/engine/components/DrawHandler";
import Scene from "@/engine/Scene";
import MotionSequence from "@/engine/utils/MotionSequence";
import Camera from "@/engine/Camera";

const COLORS = {
  "player": "blue",
  "enemy": "red",
  "ally": "green"
}

const TEXT_SIZE = 36;
const Z_INDEX = 110;
const FADE_DURATION = 100;
const STATIC_DURATION = 800;

class PhaseChange extends GameObject {
  camera: Camera;

  constructor() {
    super();

    this.components = [
      new Position(0, 0),
      new DrawHandler((ctx) => {
        ctx.save();
        const { width, height } = ctx.canvas;
        const centerX = width / 2;
        const centerY = height / 2;

        // undo camera transform so this always renders in the center
        ctx.resetTransform();

        // background
        ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        ctx.fillRect(0, 0, width, height);

        // text
        ctx.font = `${TEXT_SIZE}px serif`;
        ctx.textAlign = "center";
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
        ctx.strokeText("Phase Change", centerX, centerY);
        ctx.fillStyle = "white";
        ctx.fillText("Phase Change", centerX, centerY);

        ctx.restore();
      }, Z_INDEX)
    ]
  }

  onInit(scene: Scene): void {
    this.camera = scene.camera;

    let { width, height } = scene.canvas;
    const position = this.entity.getComponent("position") as Position;
    position.moveTo(new Vector2(width / 2, height / 2));

    const path = new MotionSequence(this.entity);
    path
      // fade in
      .addMotion((progress) => {
        this.entity.getComponent("draw").opacity = progress;
      }, FADE_DURATION)
      // stay in place
      .wait(STATIC_DURATION)
      // fade out
      .addMotion((progress) => {
        this.entity.getComponent("draw").opacity = (1 - progress);
      }, FADE_DURATION)
      .start()
      // destroy entity
      .then(() => { this.destroy() });
  }
}

export default PhaseChange;