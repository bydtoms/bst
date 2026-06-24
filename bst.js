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

    }

    previousNode = node;

    if (node.data > value && node.left !== null) {
      return this.insert(value, node.left, previousNode);
    } else if (node.data < value && node.right !== null) {
      return this.insert(value, node.right, previousNode);
    } else {
      return false;
    }
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

const exampleTree = new Tree([
  1, 7, 4, 23, 2, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
]);
prettyPrint(exampleTree.root);
const tree = new Tree([7, 4, 23, 2, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(tree.root);
console.log(tree.insert(1));
prettyPrint(tree.root);
