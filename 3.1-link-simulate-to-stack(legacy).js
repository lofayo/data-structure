/*
 * @Author: fangyong luo
 * @Date: 2023-04-27 08:08:23
 * @Description: 能这样嘛？我觉得应该是用链表去代替堆栈的底层数据结构，以提高堆的效率
 * 
 * 为什么要这样干？不是给自己找不痛快，跟自己过不去了吗？
 * 本身的栈性能很高，入栈、出栈都是操作索引，连查询都没有涉及到。
 * 而下面的用链表模拟栈，没有保存尾节点，加入元素都要查找，弹出也要查找
 */
// 用链表去模拟堆栈

class Link {
    constructor() {
        this.data = null;
    }
    push(value) {
        if(!this.data) {
            this.data = {value, next: null};
        } else {
            let finalNode = this.data;
            while(finalNode.next) {
                finalNode = finalNode.next;
            }
            finalNode.next = {value, next: null};
        }
    }
    pop() {
        if(!this.data) {
            return null;
        }
        let finalNode = this.data;
        while(finalNode.next) {
            finalNode = finalNode.next;
        }
        if(finalNode === this.data) {
            this.data = null;
            return finalNode;
        }
        let lastSecondNode = this.data;
        while(lastSecondNode.next) {
            if(lastSecondNode.next === finalNode) {
                lastSecondNode.next = null;
                return finalNode;
            }
            lastSecondNode = lastSecondNode.next;
        }
    }
}

const link = new Link();
link.push('fofo');
// link.push('lofayo');
// link.push('luofangyong');

console.log(link);
console.log(link.pop());
console.log(link);
