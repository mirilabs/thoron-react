import Entity from "./Entity";

interface IPosition {
  x: number;
  y: number;
}

interface IRectangle {
  width: number;
  height: number;
}

interface ISprite {
  url: string;
  image?: HTMLImageElement;
}

type IDraw = (ctx: CanvasRenderingContext2D, entity?: Entity) => void;

interface ICursorEvent extends IPosition {
  altKey: boolean,
  ctrlKey: boolean,
  shiftKey: boolean,
  movementX: number,
  movementY: number
}

type CursorEventHandler = (event: ICursorEvent) => void;
interface ICursorEventHandlers {
  onMouseDown: CursorEventHandler;
  onMouseMove: CursorEventHandler;
  onMouseUp: CursorEventHandler;
}

type ComponentSchema = {
  position: IPosition,
  rectangle: IRectangle,
  sprite: ISprite,
  draw: IDraw,
  cursorEvents: Partial<ICursorEventHandlers>
}

type ComponentSet = Partial<ComponentSchema>;
type ComponentId = keyof ComponentSchema;
type Component = ComponentSchema[ComponentId];

export {
  IPosition,
  IRectangle,
  ISprite,
  IDraw,
  ICursorEvent,
  CursorEventHandler,
  ICursorEventHandlers,
  ComponentSchema,
  ComponentSet,
  ComponentId,
  Component,
}