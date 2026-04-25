import GameObject from "@/engine/GameObject";
import Vector2 from "@/engine/utils/Vector2";
import MotionSequence, { EASE } from "@/engine/utils/MotionSequence";
import { IGameConfig } from "@/game/Game";
import { AttackEvent } from "thoron";
import { Position } from "@/engine/components";
import DrawHandler from "@/engine/components/DrawHandler";

const INITIAL_TEXT_SIZE = 16;
const FINAL_TEXT_SIZE = 32;
const MAX_WIDTH = 100;
const FLOATING_OFFSET_SCALE = 0.5;
const STATIC_DURATION = 200; // (ms) 'appearing' state duration
const FLOAT_DURATION = 300; // (ms) 'floating up' state duration

class DamageNumber extends GameObject {
  config: IGameConfig;
  size: number = INITIAL_TEXT_SIZE;
  fillStyle: string;
  opacity: number = 1;
  value: string | number;
  text: string;

  constructor(origin: Vector2, value: string | number, config: IGameConfig) {
    super();

    const position = new Position(origin.x, origin.y);

    this.components = [
      position,
      new DrawHandler((ctx) => {
        ctx.save();

        ctx.globalAlpha = this.opacity;

        ctx.textAlign = "center";
        ctx.font = `${this.size}px sans-serif`;
        ctx.fillStyle = this.fillStyle;
        ctx.fillText(this.text, position.x, position.y, MAX_WIDTH);

        ctx.strokeStyle = "black";
        ctx.strokeText(this.text, position.x, position.y, MAX_WIDTH);

        ctx.restore();
      }, 75)
    ]

    this.value = value;
    this.config = config;
    this.setDrawAttributes();
  }

  setDrawAttributes(): void {
    if (typeof this.value === "number") {
      this.fillStyle = this.value > 0 ? "red" : "#7be784";
      this.text = Math.abs(this.value).toString();
    }
    else if (this.value === "MISS") {
      this.fillStyle = "gray";
      this.text = "MISS";
    }
    else if (this.value.includes("CRIT")) {
      this.fillStyle = "yellow";
      this.text = this.value;
    }
  }

  onInit(): void {
    let p0 = Vector2.copy(this.entity.getComponent("position"));
    let p1 = Vector2.copy(p0);
    let p2 = Vector2.scale(
      Vector2.UP,
      FLOATING_OFFSET_SCALE * this.config.tileWidth
    ).sum(p1);

    let path = new MotionSequence(this.entity);
    path.addMotion((progress) => {
      // move from p0 to p1
      this.setPosition(Vector2.lerp(p0, p1, progress));

      // increase text size
      this.size = INITIAL_TEXT_SIZE;
      this.size += progress * (FINAL_TEXT_SIZE - INITIAL_TEXT_SIZE);
    }, STATIC_DURATION, EASE.easeOutCubic);

    path.addMotion((progress) => {
      // move from p1 to p2
      this.setPosition(Vector2.lerp(p1, p2, progress));

      // fade away
      this.opacity = 1 - progress;
    }, FLOAT_DURATION);

    path.start().then(() => this.destroy());
  }

  setPosition(pos: Vector2) {
    this.entity.getComponent("position").moveTo(pos);
  }
}

export default DamageNumber;