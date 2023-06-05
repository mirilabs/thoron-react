class SortedArray extends Array {
  constructor(compareFn, items = []) {
    super(...items);
    
    this.compareFn = compareFn;
  }

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