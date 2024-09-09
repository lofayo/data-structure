/*
 * @Author: your name
 * @Date: 2020-01-21 06:40:00
 * @LastEditTime : 2020-01-21 07:26:22
 * @LastEditors  : Please set LastEditors
 * @Description: 双向链表还是很好使用，而且这些是基础类方法，得写的更优才好。
 * 
 * 双向链表应该很容易做排序吧？
 */

// 因为是双向链表，所以每个节点都会有两个属性
class Node {
    constructor(element) {
        this.element = element;
        this.prev = null;
        this.next = null;
    }
}


class DLinkList {
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
                curNode.prev = fragmentEnd;
                fragmentEnd = fragmentEnd.next;
            }
        }
        if(!this.head) {
            this.head = fragmentHead;
        }
        if(this.end) {
            this.end.next = fragmentHead;
            fragmentHead.prev = this.end;
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
            if(this.head) {
                this.head.prev = null;
            }
            result.next = null;
        }
        return result;
    }
    /**
     * @description: find the target node
     * @param {target} 
     * @return: target node or false
     */
    find(target) {
        if (!target) return false;
        let curNode = this.head;
        while (curNode && curNode.element !== target) {
            curNode = curNode.next;
        }
        return curNode;
    }
    /**
     * @description: insert the element after the target
     * @param {insertPos, insertElement} 
     * @return: true/false
     */
    insert(target, element) {
        if (!target || !element) return false;
        let targetNode = this.find(target);
        if (!targetNode) return false;
        let elementNode = new Node(element);
        let targetNodeNext = targetNode.next;
        if (targetNodeNext) {
            elementNode.next = targetNodeNext;
            targetNodeNext.prev = elementNode;
        }
        targetNode.next = elementNode;
        elementNode.prev = targetNode;

        if(targetNode === this.end) {
            this.end = elementNode;
        }

        return true;
    }
    /**
     * @description: 
     * @param {type} 
     * @return: 
     */
    delete(target) {
        if (!target) return false;
        let targetNode = this.find(target);
        if(!targetNode) return false;

        if(targetNode.prev) {
            // 考虑删除头结点
            targetNode.prev.next = targetNode.next;
        }
        if(targetNode.next) {
            // 考虑删除尾节点
            targetNode.next.prev = targetNode.prev;
        }

        if(targetNode === this.head) {
            this.head = targetNode.next;
        }

        if(targetNode === this.end) {
            this.end = targetNode.prev;
        }

        // 释放当前节点的内存
        targetNode.next = null;
        targetNode.prev = null;
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
    /**
     * @description: show all node in verse
     * @param {} 
     * @return: all node 
     */
    verseDisplay() {
        let endNode = this.end;
        let result = [];
        while (endNode) {
            result.push(endNode.element);
            endNode = endNode.prev;
        }
        return result;
    }
}

let dLinkList = new DLinkList();
dLinkList.add('fofo');
dLinkList.add('lofayo');
dLinkList.insert('lofayo', 'luofangyong');
dLinkList.delete('luofangyong');
dLinkList.delete('lofayo');
console.dir(dLinkList, {depth: null, colors: true});
console.log(dLinkList.display(), dLinkList.verseDisplay());