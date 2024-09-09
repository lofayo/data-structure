/*
 * @Author: your name
 * @Date: 2020-01-28 21:25:35
 * @LastEditTime : 2020-02-03 09:15:45
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /data-structure/7-bst.js
 */

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
    show() {
        return this.data;
    }
}

/**
 * 理解：
 * 1、二叉树，将数据基于某种规则（不一定是单纯数字的比大小）插入到树中，并且这个数据也可以是更复杂的数据结构，因此它也可以承载很多具体的业务场景；
 * 2、好像这种拓展的数据结构更有适用场景；
 * 3、你会去想：什么情况会用到树结构呢？
 * 4、二叉树的难点：左序遍历、中序遍历、右序遍历？
 */
class BST {
    constructor() {
        this.root = null;
    }
    /**
     * @description: 1、将当前数字一个个与树节点比较，以找到正确的添加位置；2、添加的位置肯定是在末尾处，只是需要找到正确位置
     * @param {data} 
     * @return: undefined
     */
    add(data) {
        if (!data && data !== 0) return;
        const treeNode = new Node(data);
        if (!this.root) {
            this.root = treeNode;
            return;
        }
        // 一个引用指向当前节点，以供遍历，直到找到叶子节点
        let currentNode = this.root;
        while (currentNode) {
            if (data < currentNode.data) {
                if (!currentNode.left) {
                    currentNode.left = treeNode;
                    break;
                } 
                currentNode = currentNode.left;
            } else {
                if (!currentNode.right) {
                    currentNode.right = treeNode;
                    break;
                } 
                currentNode = currentNode.right;
            }
        }
    }
    /**
     * @description: find the minest node 
     * @param {null} 
     * @return: minest data or undefined
     */
    getMin() {
        let currentNode = this.root;
        if (!currentNode) return;
        while(currentNode.left){
            currentNode = currentNode.left;
        }
        return currentNode.data;
    }
    /**
     * @description: find the maxest node
     * @param {null} 
     * @return: maxest data or undefined
     */
    getMax() {
        let currentNode = this.root;
        if (!currentNode) return;
        while (currentNode.right) {
            currentNode = currentNode.right;
        }
        return currentNode.data;
    }
    /**
     * @description: show the data in order: left root right
     * @param {null} 
     * @return: order show element
     */
    inOrderShow() {
        const getDataByNode = (node) => {
            if(!node) return [];
            let leftData = getDataByNode(node.left);
            let rightData = getDataByNode(node.right);
            return [...leftData, node.data,...rightData];
        }
        return getDataByNode(this.root);
    }
    /**
     * @description: show the data in pre order: root left right
     * @param {null} 
     * @return: pre order show element
     */
    preOrderShow() {
        const getDataByNode = (node) => {
            if(!node) return [];
            let leftData = getDataByNode(node.left);
            let rightData = getDataByNode(node.right);
            return [node.data, ...leftData, ...rightData];
        }
        return getDataByNode(this.root);
    }
    /**
     * @description: show the data in back order: left right root
     * @param {null} 
     * @return: back order show element
     */
    backOrderShow() {
        const getDataByNode = (node) => {
            if(!node) return [];
            let leftData = getDataByNode(node.left);
            let rightData = getDataByNode(node.right);
            return [...leftData,...rightData, node.data];
        }
        return getDataByNode(this.root);
    }
    /**
     * @description: find the target node. The speed is so fast O(log(n))
     * @param {data} 
     * @return: null/target node
     */
    find(data) {
        let currentNode = this.root;
        if(!data || !currentNode) return;
        while(currentNode) {
            if(data < currentNode.data) {
                currentNode = currentNode.left;
                continue;
            }
            if(data > currentNode.data) {
                currentNode = currentNode.right;
                continue;
            }
            if(data === currentNode.data) {
                break;
            }
        }
        return currentNode;
    }  
    /**
     * @description: get the child count of node
     * @param {*} node
     * @return {*} count
     */    
    getNodeChildCount(node){
        if(!node) return 0;
        let count = 0;
        if(node.left) {
            count++;
        }
        if(node.right) {
            count++;
        }
        return count;
    }
    /**
     * @description: remove the data tree node, you should consider the be removed treeNode's child node number
     * @param {*} data
     * @return {*} the be removed tree node
     */    
    remove(data) {
        let currentNode = this.root;
        if(!data || !currentNode) return;
        // 1、找到目标节点和父节点
        let parentNode = currentNode;
        while(currentNode) {
            if(data < currentNode.data) {
                parentNode = currentNode;
                currentNode = currentNode.left;
                continue;
            }
            if(data > currentNode.data) {
                parentNode = currentNode;
                currentNode = currentNode.right;
                continue;
            }
            if(data === currentNode.data) {
                break;
            }
        }
        const targetNode = currentNode;
        if(!targetNode) return;
        // 2、获取目标节点的子节点数，以决定如何删除
        const childCount = this.getNodeChildCount(targetNode);
        // 2.1 如果子节点为0，直接将父节点的left 或right 指向null
        if(childCount === 0) {
            if(parentNode.left === targetNode) {
                parentNode.left = null;
            }
            if(parentNode.right === targetNode) {
                parentNode.right = null;
            }
        }
        // 2.2 如果子节点为1，直接将父节点的left 或right 指向这个子节点
        if(childCount === 1) {
            if(parentNode.left === targetNode) {
                parentNode.left = targetNode.left || targetNode.right;
            }
            if(parentNode.right === targetNode) {
                parentNode.right = targetNode.left || targetNode.right;
            }
        }
        // 2.3 如果子节点为2，找出目标节点左子树的最大值替换被删除的节点：左子树的最大节点从父节点删除，这个最大节点的左边是目标节点的left，右边是目标节点的right
        if(childCount === 2) {
            // 找出左子树最大节点
            const leftTargetNode = targetNode.left;
            let maxNode = leftTargetNode;
            let maxNodepParent = maxNode;
            while(maxNode && maxNode.right) {
                maxNodepParent = maxNode;
                maxNode = maxNode.right;
            }

            // 将左子树的最大节点从父节点删除
            maxNodepParent.right = null;
            // 设置左子树最大节点的子节点
            if(maxNode !== targetNode) {
                maxNode.left = targetNode.left;
                maxNode.right = targetNode.right;
            } else {
                
            }
            // 父节点指向最大节点
            if(parentNode === targetNode) {
                this.root = maxNode;
            } else {
                if(parentNode.left === targetNode) {
                    parentNode.left = maxNode;
                }
                if(parentNode.right === targetNode) {
                    parentNode.right = maxNode;
                }
            }

        }
        // 释放目标节点的指向
        targetNode.left = null;
        targetNode.right = null;
        return targetNode;
    }

}
const bst = new BST();
bst.add(5);
bst.add(3);
bst.add(7);
bst.add(1);
bst.add(0);
bst.add(2);
bst.add(4);
bst.add(6);
bst.add(8);
console.dir(bst, {depth: null, colors: true});
// console.log(bst.getMin(), bst.getMax(), bst.inOrderShow());
// console.log('inOrderShow', bst.inOrderShow());
// console.log('preOrderShow', bst.preOrderShow());
// console.log('backOrderShow', bst.backOrderShow());
// bst.remove(22);
// console.dir(bst, {depth: null, colors: true});
// bst.remove(16);
// console.dir(bst, {depth: null, colors: true});
bst.remove(3);
console.dir(bst, {depth: null, colors: true});