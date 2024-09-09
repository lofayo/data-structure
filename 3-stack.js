class Stack {
    constructor() {
        this.dataSource = [];
        // 想要一个变量随着数组的更新而更新，那就得用Object.defineProperty(this, data, {set(){}})
        // 这也说明为什么响应式更新数据需要重新赋值，因为上面方法只能监听到赋值，而监听不到数据更新元素
        // this.length = 0;
    }
    push(element) {
        // 或许这种操作数组索引，相比于直接使用数组的方法更高（数组本身的方法应该也是这样实现的吧）
        // this.dataSource[this.length] = element;
        // this.length++;
        this.dataSource[this.dataSource.length] = element;
        return this.dataSource.length;
    }
    pop() {
        // 这样不好，即使出栈了，数组的内存空间未释放
        // if (this.length > 0) return this.dataSource[--this.length];
        if(this.dataSource.length) {
            const value = this.dataSource[this.dataSource.length - 1];
            this.dataSource.length--;
            return value;
        }
        return 'empty stack';
    }
    peak() {
        if (this.dataSource.length > 0) return this.dataSource[this.dataSource.length - 1];
        return 'empty stack';
    }
    getStack() {
        return this.dataSource;
    }
}

let stack = new Stack();
stack.push('fofo');
stack.push('lofayo');
stack.push('luofangyong');
stack.pop();
stack.pop();

console.log(stack.peak(), stack.getStack());