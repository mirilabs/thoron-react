class SortedArray extends Array {
  constructor(compareFn = null, ...items) {
    super(...(items.sort(compareFn)));
    this.compareFn = compareFn || SortedArray.MIN;
  }

  static MIN(a, b) { return a - b }
  static MAX(a, b) { return b - a }

  sort() {
    return super.sort(this.compareFn);
  }

  add(...items) {
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