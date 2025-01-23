class SortedArray<T> extends Array<T> {
  compareFn: (a: T, b: T) => number;

  constructor(compareFn: (a: T, b: T) => number) {
    super();
    this.compareFn = compareFn ?? SortedArray.MIN;
  }

  static MIN(a: any, b: any) { return a - b }
  static MAX(a: any, b: any) { return b - a }

  sort() {
    return super.sort(this.compareFn);
  }

  private _addItem(newItem: T) {
    let targetIndex = this.findIndex(
      item => this.compareFn(item, newItem) > 0
    );
    if (targetIndex < 0) targetIndex = this.length;

    this.splice(targetIndex, 0, newItem);
  }

  add(...items: T[]) {
    items.forEach(item => this._addItem(item));
  }
}

export default SortedArray;