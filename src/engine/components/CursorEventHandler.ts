import { IVector2 } from "engine/utils/Vector2";
import Component from "./Component";

interface ICursorEvent extends IVector2 {
  altKey: boolean,
  ctrlKey: boolean,
  shiftKey: boolean,
  delta: IVector2
}

type CursorEventCallback = (event: ICursorEvent) => void;

interface ICursorEventHandler {
  onMouseDown?: CursorEventCallback;
  onMouseMove?: CursorEventCallback;
  onMouseUp?: CursorEventCallback;
}

class CursorEventHandler extends Component implements ICursorEventHandler {
  onMouseDown?: CursorEventCallback;
  onMouseMove?: CursorEventCallback;
  onMouseUp?: CursorEventCallback;

  constructor(eventHandlers: ICursorEventHandler) {
    super();
    this.onMouseDown = eventHandlers.onMouseDown;
    this.onMouseMove = eventHandlers.onMouseMove;
    this.onMouseUp = eventHandlers.onMouseUp;
  }
}

export default CursorEventHandler;
export {
  ICursorEvent,
  ICursorEventHandler,
  CursorEventCallback
}