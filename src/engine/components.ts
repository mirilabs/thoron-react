import Entity from "./Entity";

// COMPONENTS

interface Vector2 {
  x: number;
  y: number;
}

interface Rectangle {
  width: number;
  height: number;
}

interface Sprite {
  url: string;
  image?: HTMLImageElement;
  preprocess?: (ctx: CanvasRenderingContext2D) => void;
}

type DrawFn = (ctx: CanvasRenderingContext2D, entity?: Entity) => void;

interface CursorEvent extends Vector2 {
  altKey: boolean,
  ctrlKey: boolean,
  shiftKey: boolean,
  movementX: number,
  movementY: number
}

type CursorEventHandler = (event: CursorEvent) => void;
interface CursorEventHandlers {
  onMouseDown: CursorEventHandler;
  onMouseMove: CursorEventHandler;
  onMouseUp: CursorEventHandler;
}

// SCHEMA

type ComponentSchema = {
  position: Vector2,
  velocity: Vector2,
  rectangle: Rectangle,
  sprite: Sprite,
  draw: DrawFn,
  cursorEvents: Partial<CursorEventHandlers>
}

type ComponentSet = Partial<ComponentSchema>;
type ComponentId = keyof ComponentSchema;
type Component = ComponentSchema[ComponentId];

export {
  Vector2,
  Rectangle,
  Sprite,
  DrawFn,
  CursorEvent,
  CursorEventHandler,
  CursorEventHandlers,
  ComponentSchema,
  ComponentSet,
  ComponentId,
  Component,
}