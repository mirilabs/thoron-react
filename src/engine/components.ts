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

type CursorEventHandler = (isTarget: boolean, x?: number, y?: number) => null;
interface ICursorEventHandler {
    onMouseDown: CursorEventHandler;
    onMouseMove: CursorEventHandler;
    onMouseUp: CursorEventHandler;
}

type ComponentSchema = {
    position: IPosition,
    rectangle: IRectangle,
    sprite: ISprite,
    draw: IDraw,
    cursorEvents: ICursorEventHandler
}

export default ComponentSchema;
export {
    IPosition,
    IRectangle,
    ISprite,
    IDraw,
    ICursorEventHandler
}