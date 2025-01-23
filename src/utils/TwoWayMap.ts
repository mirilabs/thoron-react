class TwoWayMap<K, V> {
  private forward: Map<K, V>;
  private backward: Map<V, K>;
  reverse: TwoWayMap<V, K>;

  constructor(
    iterable?: Iterable<readonly [K, V]>,
    reverse?: TwoWayMap<V, K>
  ) {
    this.forward = new Map(iterable);

    this.backward = new Map();
    for (const [key, value] of this.forward.entries()) {
      this.backward.set(value, key);
    }

    if (reverse === undefined)
      this.setReverse();
  }

  private setReverse() {
    this.reverse = new TwoWayMap(null, this);
    this.reverse.forward = this.backward;
    this.reverse.backward = this.forward;
  }

  get(key: K) {
    return this.forward.get(key);
  }

  set(key: K, value: V) {
    this.forward.set(key, value);
    this.backward.set(value, key);
  }
}

export default TwoWayMap;