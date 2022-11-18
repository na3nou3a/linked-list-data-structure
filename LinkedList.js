class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}
function defaultEquals(a, b) {
  return a === b;
}

class LinkedList {
  constructor(equalsFn = defaultEquals) {
    this.count = 0;
    this.head = null;
    this.equalsFn = equalsFn;
  }
  append(element) {
    const node = new Node(element);
    let pointer;
    if (this.isEmpty()) {
      this.head = node;
    } else {
      pointer = this.head;
      while (pointer.next != null) {
        // get last item
        pointer = pointer.next;
      }
      // and assign next to new element to make the link
      pointer.next = node;
    }
    this.count++;
  }
  prepend(element) {
    const node = new Node(element);
    if (this.isEmpty()) {
      this.head = node;
    } else {
      // get first item
      const pointer = this.head;
      this.head = node;
      this.head.next = pointer;
    }
    this.count++;
  }
  removeAt(index) {
    // check if index is valid
    if (index >= 0 && index < this.count) {
      let pointer = this.head;
      // removing first item
      if (index === 0) {
        this.head = pointer.next;
      } else {
        const previous = this.at(index - 1);
        pointer = previous.next;
        previous.next = pointer.next;
      }
      this.count--;
      return pointer.element;
    }
    // if index is not valid
    return undefined;
  }
  pop() {
    return this.removeAt(this.count - 1);
  }
  at(index) {
    // check if index is valid
    if (index >= 0 && index <= this.count) {
      let node = this.head;
      for (let i = 0; i < index && node !== null; i++) {
        node = node.next;
      }
      return node;
    }
    // if index is not valid
    return undefined;
  }
  insertAt(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element);
      if (index === 0) {
        // add on first position
        const pointer = this.head;
        node.next = pointer;
        this.head = node;
      } else {
        const previous = this.at(index - 1);
        const pointer = previous.next;
        node.next = pointer;
        previous.next = node;
      }
      this.count++; // update size of list
      return true;
    }
    //if index is not valid
    return false;
  }
  find(element) {
    let pointer = this.head;
    for (let i = 0; i < this.count && pointer !== null; i++) {
      if (this.equalsFn(element, pointer.element)) {
        return i;
      }
      pointer = pointer.next;
    }
    return -1;
  }
  remove(element) {
    const index = this.find(element);
    return this.removeAt(index);
  }
  size() {
    return this.count;
  }
  isEmpty() {
    return this.size() === 0;
  }
  head() {
    return this.head;
  }
  tail() {
    return this.at(this.count - 1);
  }
  contains(element) {
    if (!this.isEmpty()) {
      let pointer = this.head;
      for (let i = 0; i < this.count; i++) {
        if (this.equalsFn(element, pointer.element)) return true;
        pointer = pointer.next;
      }
    }
    return false;
  }
  toString() {
    if (this.isEmpty()) {
      return '';
    }
    let objString = `(${this.head.element}) -> `;
    let pointer = this.head.next;
    for (let i = 1; i < this.size() && pointer !== null; i++) {
      objString = `${objString} (${pointer.element}) -> `;
      pointer = pointer.next;
    }
    return `${objString} null`;
  }
}

const list = new LinkedList();
list.append(2);
list.append(3);
list.append(4);
list.prepend(1);
list.prepend(0);
list.append(5);
console.log(list.pop()); // returns 5
console.log(list.toString()); // returns (0) ->  (1) ->  (2) ->  (3) ->  (4) ->  null
console.log(list.size()); // returns 5
console.log(list.tail()); // returns { element: 4, next: null }
console.log(list.contains('you')); // returns false
console.log(list.contains(0)); // returns true
