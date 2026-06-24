class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    const sortedArr = [...new Set(array.sort((a, b) => a - b))];
    this.root = this.#buildTree(sortedArr, 0, sortedArr.length - 1);
  }

  #buildTree(arr, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const root = new Node(arr[mid]);

    root.left = this.#buildTree(arr, start, mid - 1);
    root.right = this.#buildTree(arr, mid + 1, end);

    return root;
  }

  includes(value, node = this.root) {
    if (node === null) return false;

    if (node.data === value) return true;

    if (node.data > value && node.left !== null) {
      return this.includes(value, node.left);
    } else if (node.data < value && node.right !== null) {
      return this.includes(value, node.right);
    } else {
      return false;
    }
  }

  insert(value) {
    if (this.includes(value)) {
      console.log("Value already exists in the tree");
      return;
    }

    this.root = this.#insertHelper(value);
  }

  #insertHelper(value, node = this.root) {
    if (node === null) return new Node(value);

    if (value < node.data) {
      node.left = this.#insertHelper(value, node.left);
    } else {
      node.right = this.#insertHelper(value, node.right);
    }
    return node;
  }

  #getSuccessor(curr) {
    curr = curr.right;
    while (curr !== null && curr.left !== null) {
      curr = curr.left;
    }
    return curr;
  }

  deleteItem(value, node = this.root) {
    if (node === null) {
      return node;
    }

    if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
    } else if (value < node.data) {
      node.left = this.deleteItem(value, node.left);
    } else {
      if (node.left === null) {
        return node.right;
      }

      if (node.right === null) {
        return node.left;
      }

      const successor = this.#getSuccessor(node);
      node.data = successor.data;
      node.right = this.deleteItem(node.right, successor.data);
    }
    return node;
  }

  #isFunction(func) {
    if (typeof func !== "function") {
      throw new Error("You must provide a callback function.");
    }
  }

  levelOrderForEach(callback) {
    this.#isFunction(callback);

    const queue = [];

    queue.push(this.root);

    while (queue.length > 0) {
      const current = queue.shift();
      callback(current.data);

      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }
    }
  }

  preOrderForEach(callback, node = this.root) {
    this.#isFunction(callback);

    if (node === null) return;

    callback(node.data);
    this.preOrderForEach(callback, node.left);
    this.preOrderForEach(callback, node.right);
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};
