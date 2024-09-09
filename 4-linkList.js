/*
 * @Author: your name
 * @Date: 2020-01-17 08:04:23
 * @LastEditTime : 2024-05-07 08:35:33
 * @Description: 
 * 1、链表主要是对标数组，优势在于插入和移除元素时。不需要实现所有功能，实现主要功能即可
 * 2、单向列表在删除元素时显得别扭，因为还要找到它的前一个元素，所以后面才有双向链表，直接一个属性关联着；
 * 
 * 对于链表的操作，多注意解开节点，重新赋值引用
 */
class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

class LinkList {
    constructor() {
        this.head = null;
        this.end = null;
    }
    /**
     * @description: add nodes to the end, and can support adding many once
     * @param {} 
     * @return: 
     */
    add(...elements) {
        let fragmentHead = null;
        let fragmentEnd = null;
        for(let element of elements) {
            const curNode = new Node(element);
            if(!fragmentHead) {
                fragmentHead = curNode;
                fragmentEnd = curNode;
            } else {
                fragmentEnd.next = curNode;
                fragmentEnd = fragmentEnd.next;
            }
        }
        if(!this.head) {
            this.head = fragmentHead;
        }
        if(this.end) {
            this.end.next = fragmentHead;
        }
        this.end = fragmentEnd;
    }
    /**
     * @description: remove the first node
     * @return {*} the first node or null
     */    
    shift() {
        let result = null;
        if(this.head) {
            result = this.head;
            this.head = this.head.next;
            result.next = null;
        }
        return result;
    }
    /**
     * @description: find the target node
     * @param {target} 
     * @return: target node or null
     */
    find(target) {
        if (!target || !this.head) return null;
        let curNode = this.head;
        while (curNode && curNode.element !== target) {
            curNode = curNode.next;
        }
        return curNode;
    }
    /**
     * @description: insert element after the target into linkList
     * @param {target, element} 
     * @return: true/false
     */
    insert(target, element) {
        if (!target || !element) return false;
        const targetNode = this.find(target);
        if (!targetNode) return false;
        const elementNode = new Node(element);
        const targetNextNode = targetNode.next;
        targetNode.next = elementNode;
        elementNode.next = targetNextNode;
        
        if(targetNode === this.end) {
            this.end = elementNode;
        }
        return true
    }
    /**
     * @description: delete the target node
     * @param {target} 
     * @return: the target node or false
     */
    delete(target) {
        if (!target) return false;
        const targetNode = this.find(target);
        if (!targetNode) return false;
        let targetPrevNode = null;
        let curNode = this.head;
        while (curNode && curNode.next && !targetPrevNode) {
            if (curNode.next.element !== target) {
                curNode = curNode.next;
            } else {
                targetPrevNode = curNode;
            }
        }
        if(targetPrevNode) {
            targetPrevNode.next = targetNode.next;
        }

        if(targetNode === this.end) {
            this.end = targetPrevNode;
        }

        if(targetNode === this.head) {
            this.head = targetNode.next;
        }

        targetNode.next = null;
        return targetNode;
    }
    /**
     * @description: show all node in the linkList
     * @param {} 
     * @return: all node 
     */
    display() {
        let curNode = this.head;
        let result = [];
        while (curNode) {
            result.push(curNode.element);
            curNode = curNode.next;
        }
        return result;
    }

}

const linkList = new LinkList();
linkList.add('lofayo', 'fofo', 1);
linkList.insert(1, 'luofangyong');
linkList.delete('luofangyong');
console.dir(linkList, {depth: null, colors: true});
console.log(linkList.display())

exports.LinkList = LinkList;