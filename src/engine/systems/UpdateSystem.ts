import { ComponentId } from "../components";
import System from "./System";

class UpdateSystem extends System {
  signature: Set<ComponentId> = new Set([
    'update'
  ]);

  update(dT: number) {
    this.componentSets.forEach(({ update }) => {
      update(dT);
    });
  }
}

export default UpdateSystem;