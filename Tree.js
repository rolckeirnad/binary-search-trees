const Node = (data) => {
  return {
    data,
    left: null,
    right: null,
  }
};

const Tree = (array) => {
  let root = null;
  if (array) buildTree(array);

  function buildTree(arr) {
    const sortedArr = mergeSort(arr);
    const singleValuesArr = removeDuplicates(sortedArr);
    const length = singleValuesArr.length;
    root = setTree(singleValuesArr, 0, length - 1);
    return root;
  }

  function setTree(arr, start, end) {
    if (start > end) return null;
    const middle = parseInt((start + end) / 2);
    const rootNode = Node(arr[middle]);
    rootNode.left = setTree(arr, start, middle - 1);
    rootNode.right = setTree(arr, middle + 1, end);
    return rootNode;
  };

  function getTree() {
    return root;
  }

  const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };

  const visualizeTree = () => prettyPrint(root);

  function insertNode(value) {
    // If no value passed in
    if (value === undefined) return null;
    // If there's already a value in the tree
    const exists = find(root, value) ? true : false;
    if (exists) return null;
    root = addNode(root, value);
  }

  function addNode(node, value) {
    if (node === null) {
      node = Node(value);
      return node;
    } else if (value < node.data) {
      node.left = addNode(node.left, value);
    } else if (value > node.data) {
      node.right = addNode(node.right, value);
    }
    return node;
  }

  function deleteNode(value) {
    if (value === undefined) return null;
    let parentNode = getParentNode(root, value);
    let node;
    if (parentNode) {
      node = value < parentNode.data ? parentNode.left : parentNode.right;
    } else {
      node = root;
    }
    // Node is leaf
    if (node.left === null && node.right === null) {
      if (parentNode.left && value === parentNode.left.data) parentNode.left = null;
      else if (value === parentNode.right.data) parentNode.right = null;
    } else if (node.left && node.right) { // Node has two children
      let subTree = node.right;
      while (subTree.left !== null) {
        subTree = subTree.left;
      }
      const newData = subTree.data;
      deleteNode(newData)
      node.data = newData;
    } else { // Node has only one child
      let childNode = node.left ? node.left : node.right;
      if (parentNode.left && value === parentNode.left.data) parentNode.left = childNode;
      else if (value === parentNode.right.data) parentNode.right = childNode;
    }
  }

  function find(value) {
    return searchValue(root, value);
  }

  function levelOrder(fn = null) {
    if (root === null) return [];
    const queue = [];
    queue.push(root);
    const dataArray = [];
    while (queue.length !== 0) {
      const actual = queue.shift();
      if (fn) fn(actual);
      else dataArray.push(actual.data);
      if (actual.left) queue.push(actual.left);
      if (actual.right) queue.push(actual.right);
    }
    if (fn === null) return dataArray;
  }

  function preOrder(fn = null, node = root, array = []) {
    if (node == null) return [];
    if (fn) fn(node);
    else array.push(node.data);
    preOrder(fn, node.left, array);
    preOrder(fn, node.right, array);
    if (fn === null) return array;
  }

  function inOrder(fn = null, node = root, array = []) {
    if (node == null) return [];
    inOrder(fn, node.left, array);
    if (fn) fn(node);
    else array.push(node.data);
    inOrder(fn, node.right, array);
    if (fn === null) return array;
  }

  function postOrder(fn = null, node = root, array = []) {
    if (node == null) return;
    postOrder(fn, node.left, array);
    postOrder(fn, node.right, array);
    if (fn) fn(node);
    else array.push(node.data);
    if (fn === null) return array;
  }

  function height(node) {
    let heightLeft = node.left ? height(node.left) + 1 : 0;
    let heightRight = node.right ? height(node.right) + 1 : 0;
    console.log("Node: ", node.data, "Left: ", heightLeft, "Right: ", heightRight);
    return heightLeft > heightRight ? heightLeft : heightRight;
  }

  function depth(searchNode, actualNode = root) {
    let depthLeft = actualNode.left && searchNode.data < actualNode.data ? depth(searchNode, actualNode.left) + 1 : 0;
    let depthRight = actualNode.right && searchNode.data > actualNode.data ? depth(searchNode, actualNode.right) + 1 : 0;
    console.log("Node: ", actualNode, "Left: ", depthLeft, "Right: ", depthRight);
    return depthLeft > depthRight ? depthLeft : depthRight;
  }

  function isBalanced() {
    return checkBalance() ? true : false;
  }
  // It must check balance on every node, if all are true then is balanced
  function checkBalance(node = root) {
    if (node === null) return 0;
    let heightLeft = checkBalance(node.left);
    let heightRight = checkBalance(node.right);
    let levelDifference = Math.abs(heightLeft - heightRight);
    let nodeIsUnbalanced = (heightLeft === false || heightRight === false || levelDifference > 1) ? true : false;
    if (nodeIsUnbalanced) return false;
    return heightLeft > heightRight ? heightLeft + 1 : heightRight + 1;
  }

  function rebalance() {
    const sortedArr = inOrder();
    buildTree(sortedArr);
    visualizeTree();
  }

  function getParentNode(node, value) {
    if (node === null) return null;
    if (value === node.data) return null; // Root
    if (value < node.data && node.left) {
      return value === node.left.data ? node : getParentNode(node.left, value);
    } else if (value > node.data && node.right) {
      return value === node.right.data ? node : getParentNode(node.right, value);
    }
  }

  function searchValue(value, node = root) {
    if (node === null) return null;
    if (value === node.data) {
      return node;
    } else if (value < node.data) {
      return searchValue(value, node.left);
    } else if (value > node.data) {
      return searchValue(value, node.right);
    }
    return null;
  }

  function removeDuplicates(arr) {
    return arr.filter((v, i, a) => a.indexOf(v) === i);
  }

  function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    let left;
    let right;
    if (arr.length > 1) {
      const middle = parseInt(arr.length / 2);
      const leftArr = arr.slice(0, middle);
      left = mergeSort(leftArr);
      const rightArr = arr.slice(middle);
      right = mergeSort(rightArr);
    }
    // Merge
    let merged = [];
    while (left.length != 0 && right.length != 0) {
      left[0] < right[0] ? merged.push(left.shift()) : merged.push(right.shift());
    }
    if (left.length == 0) return [...merged, ...right];
    else return [...merged, ...left];
  }

  return {
    buildTree,
    getTree,
    visualizeTree,
    insertNode,
    deleteNode,
    find,
    levelOrder,
    preOrder,
    inOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
};

export default Tree;
