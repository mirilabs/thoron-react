class SortedArray<T> extends Array<T> {
  compareFn: (a: T, b: T) => number;

  constructor(compareFn = null, ...items: T[]) {
    super(...items);
    this.compareFn = compareFn ?? SortedArray.MIN;
    super.sort(compareFn);
  }

  static MIN(a: any, b: any) { return a - b }
  static MAX(a: any, b: any) { return b - a }

  sort() {
    return super.sort(this.compareFn);
  }

  add(...items: T[]) {
    items.forEach(newItem => {
      let targetIndex = this.findIndex(
        item => this.compareFn(item, newItem) > 0
      );
      if (targetIndex < 0) targetIndex = this.length;

      this.splice(targetIndex, 0, newItem);
    })
  }
}

export default SortedArray;