import Component from "./Component";

type UpdateFn = (dT: number) => void;

interface IUpdateFunction {
  update: UpdateFn;
}

class UpdateHandler extends Component implements IUpdateFunction {
  update: UpdateFn;

  constructor(fn: UpdateFn) {
    super();
    this.update = fn;
  }
}

export default UpdateHandler;