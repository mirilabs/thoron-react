import { ComponentId } from "../components";
import System from "./System";

class UpdateSystem extends System {
  signature: Set<ComponentId> = new Set<ComponentId>([
    'update'
  ]);

  update(dT: number) {
    this.componentGroups.forEach(({ update }) => {
      update.update(dT);
    });
  }
}

export default UpdateSystem;