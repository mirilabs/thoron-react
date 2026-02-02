import Position from "./Position";
import Rectangle from "./Rectangle";
import Sprite from "./Sprite";
import UpdateFunction from "./UpdateHandler";
import DrawHandler from "./DrawHandler";
import CursorEventHandler from "./CursorEventHandler";
import TwoWayMap from "@/utils/TwoWayMap";

const COMPONENTS = {
  position: Position,
  rectangle: Rectangle,
  sprite: Sprite,
  update: UpdateFunction,
  draw: DrawHandler,
  cursorEvents: CursorEventHandler
} as const;

const COMPONENT_ID_MAP = new TwoWayMap(Object.entries(COMPONENTS));

type ComponentTypes = {
  [K in keyof typeof COMPONENTS]: InstanceType<typeof COMPONENTS[K]>
};

type ComponentId = keyof ComponentTypes;
type AnyComponent = ComponentTypes[ComponentId];

function getComponentId(c: AnyComponent): ComponentId {
  const ComponentClass = Object.getPrototypeOf(c).constructor;
  return COMPONENT_ID_MAP.reverse.get(ComponentClass) as ComponentId;
}

export {
  ComponentTypes,
  ComponentId,
  AnyComponent,
  getComponentId,
  
  Position,
  Rectangle,
  Sprite,
  UpdateFunction,
  DrawHandler,
  CursorEventHandler
}