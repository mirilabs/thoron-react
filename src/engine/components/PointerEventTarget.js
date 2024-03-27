import Node from "../Node";
import Rectangle from "./Rectangle";

// function withPointerEvents() {
//   this.withEventHandlers({
//     onInit() {
//       this.onMouseDown = this.onMouseDown.bind(this);
//       this.onMouseMove = this.onMouseMove.bind(this);
//       this.onMouseUp = this.onMouseUp.bind(this);

//       this.pointerEvents = this.getScene().pointerEvents;
//       this.pointerEvents.on('mousedown', this.onMouseDown);
//       this.pointerEvents.on('mousemove', this.onMouseMove);
//       this.pointerEvents.on('mouseup', this.onMouseUp);
//     },
    
//     onDestroy() {
//       this.pointerEvents.off('mousedown', this.onMouseDown);
//       this.pointerEvents.off('mousemove', this.onMouseMove);
//       this.pointerEvents.off('mouseup', this.onMouseUp);
//     }
//   });

//   this.addChild(new PointerEventComponent());
//   return this;
// }

class PointerEventTarget extends Node {
  constructor(ent) {
    super();
    
    this.rect = ent.getComponent(Rectangle);
  }

  onInit(scene) {
    // bind to scene.pointerEventHandler
  }
}

export default PointerEventTarget;