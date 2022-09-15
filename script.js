import Tree from './Tree.js';

function createRandomArray(length = 50) {
  return Array(length).fill().map((_) => Math.round(Math.random() * 500));
}

const arr = createRandomArray(10);

const myTree = Tree(arr);

console.log("Tree is balanced?: ", myTree.isBalanced());
myTree.visualizeTree();
console.log("Level order: ", myTree.levelOrder());
console.log("Preorder: ", myTree.preOrder());
console.log("Postorder: ", myTree.postOrder());
console.log("Inorder: ", myTree.inOrder());

const newArr = createRandomArray(100);

newArr.forEach((v, i, a) => myTree.insertNode(v));

console.log("Tree is balanced?: ", myTree.isBalanced());
console.log("Rebalancing Tree...")
myTree.rebalance();
console.log("Tree Rebalanced!")
console.log("Tree is balanced?: ", myTree.isBalanced());
console.log("Level order: ", myTree.levelOrder());
console.log("Preorder: ", myTree.preOrder());
console.log("Postorder: ", myTree.postOrder());
console.log("Inorder: ", myTree.inOrder());
