

class MyArray {
  constructor(...arg) {
    for (let i = 0; i < arg.length; i++) {
      this[i] = arg[i];
    }
    this.length = arg.length;
  }
  push(...arg) {
    for (let i = 0; i < arg.length; i++) {
      this[this.length] = arg[i];
      this.length += 1;
    }
    return this.length;
  }

  pop() {
    const deletedElem = this[this.length - 1];

    if (this.length === 0) {
      return undefined;
    }

    delete this[this.length - 1];
    this.length = this.length - 1;
    return deletedElem;
  }


  map(callback) {
    const mapArr = new MyArray();

    for (let i = 0; i < this.length; i++) {
      mapArr[i] = callback(this[i], i, this);
      mapArr.length += 1;
    }
    return mapArr;
  }
  sort(callback) {
    if (this.length === 1 && typeof callback === 'function') {
      for (let i = 0; i < this.length - 1; i++) {
        for (let j = 0; j < this.length - 1; j++) {
          if (!(callback(this[j], this[j + 1]) <= 0)) {
            const max = this[j];
            this[j] = this[j + 1];
            this[j + 1] = max;
          }
        }
      }
    } else if (this.length === 0) {
      for (let i = 0; i < this.length - 1; i++) {
        for (let j = 0; j < this.length - i; j++) {
          if (String(this[j]) > String(this[j + 1])) {
            const max = this[j];
            this[j] = this[j + 1];
            this[j + 1] = max;
          }
        }
      }
    }

    return this;
  }
  static from(...arg) {
    const arrFromed = new MyArray();

    if (arg.length === 1 && typeof arg[0] === 'string') {
      for (let i = 0; i < arg[0].length; i++) {
        arrFromed[i] = arg[0][i];
      }
      arrFromed.length = arg[0].length;
    } else {
      for (let i = 0; i < arg.length; i++) {
        arrFromed[i] = arg[i];
      }
      arrFromed.length = arg.length;
    }


    return arrFromed;
  }

  toString() {
    let str = String();

    if (this.length === 0 || this.length === undefined) {
      return str;
    }

    for (let i = 0; i < this.length; i++) {
      if (i === this.length - 1) {
        str += `${this[i]}`;
      }
      else {
        str += `${this[i]},`;
      }
    }
    return str;
  }

  reduce(callback, initialValue) {
    if (this.length === 0 && !initialValue) {
      throw new TypeError('arr\'s empty and without initialValue');
    } else if (this.length === 0 && initialValue) {
      return initialValue;
    } else if (this.length === 1 && !initialValue) {
      return this[0];
    }

    let acc = initialValue || initialValue !== undefined ? initialValue : this[0];
    let i = initialValue || initialValue !== undefined ? 0 : 1;

    for (i; i < this.length; i++) {
      acc = callback(acc, this[i], i, this);
    }
    return acc;
  }
  filter(callback, ...arg) {
    const arrFiltered = new MyArray();

    if (arg.length > 0 && typeof callback === 'function') {
      for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
          arrFiltered[i] = this[i];
          arrFiltered.length += 1;
        }
      }
    }

    return arrFiltered;
  }
  forEach(callback, ...arg) {
    if (arg.length > 0 && typeof callback === 'function') {
      for (let i = 0; i < this.length; i++) {
        this[i] = callback(this[i], i, this);
      }
    }
  }
}


export default MyArray;


