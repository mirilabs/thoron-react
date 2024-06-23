import ComponentMap from "../ComponentMap";
import Scene from "../Scene";

class System {
    scene: Scene;
    
    constructor(scene: Scene) {
        this.scene = scene;
    }

    get componentMap(): ComponentMap {
        return this.scene.componentMap;
    }
}

export default System;