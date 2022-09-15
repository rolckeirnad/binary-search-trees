# TOP - Binary Search Trees
We built a balanced BST for this [assignment](https://www.theodinproject.com/lessons/javascript-binary-search-trees).

To use we can create a Tree passing in an array 
```JavaScript
import Tree from './Tree.js';
const myTree = Tree(arr);
```
We can access to following methods:

* `buildTree(array)` - Create a new tree from the passed in array. 
* `getTree()` - Returns the actual tree from root node.
* `visualizeTree()` - Shows actual tree structure in console.
* `insertNode(value)` - Insert a new node with the passed in value.
* `deleteNode(value)` - Delete a node which contains the passed in value.
* `find(value)` - Find and returns a node which contains the passed in value.
* `levelOrder(function)` - Applies a passed in function to every node in level order. If function is omited, returns an array with all the data nodes values in level order.
* `preOrder()` - Applies a passed in function to every node in depth-first preorder. Return an array with all the data nodes values if no function is passed.
* `inOrder()` - Applies a passed in function to every node in depth-first inorder. Return an array with all the data nodes values if no function is passed.
* `postOrder()` - Applies a passed in function to every node in depth-first postorder. Return an array with all the data nodes values if no function is passed.
* `height(node)` - Returns the max height from node.
* `depth(node)` - Returns the depth of passed in node.
* `isBalanced()` - Returns a boolean indicating if tree is balanced or not.
* `rebalance()` - Rebalance the actual tree.

You can run the example script using Node: 
```bash
node script.js
```