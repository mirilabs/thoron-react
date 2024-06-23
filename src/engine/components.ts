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

type ComponentSchema = {
    position: IPosition,
    rectangle: IRectangle,
    sprite: ISprite,
    draw: IDraw
}

export default ComponentSchema;
export {
    IPosition,
    IRectangle,
    ISprite,
    IDraw
}