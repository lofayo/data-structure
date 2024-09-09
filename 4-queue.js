/*
 * @Author: fangyong luo
 * @Date: 2022-06-14 08:24:56
 * @Description: 队列原理
 * 1、先进先出，借助数组实现，当然很简单，可在性能方面并不是最优；
 * 2、你想着用链表去模拟队列，那也不是最优，出队可能快一点，但是入队需要从前到后遍历，亦不是最优；
 * （基础数据结构可以是链表，而且链表可以记录头结点和尾结点，这样应用到队列里就是最快了）
 * 3、这里就会想到一个问题，并没有绝对最优的方式，只有针对不同场景不同的解决方式；
 * （先不用考虑使用时的性能，首先是在实际生活中多多用起来这些数据结构）
 */
const {LinkList} = require('./4-linkList');
class Queue {
  constructor() {
    this.dataLinkList = new LinkList();
  }
  enqueue(element) {
    this.dataLinkList.add(element);
  }
  dequeue() {
    return this.dataLinkList.shift();
  }
  getQueue() {
    return this.dataLinkList.display();
  }
}

const queue = new Queue();
queue.enqueue('fofo');
queue.enqueue('lofayo');
queue.enqueue('luofangyong');
console.log(queue.getQueue(), 1);

queue.dequeue();
console.log(queue.getQueue(), 2);