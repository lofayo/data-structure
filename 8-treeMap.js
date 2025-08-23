/*
 * @Author: fangyong luo
 * @Date: 2020-11-15 11:27:55
 * @Description: 
 * 1、深度遍历与广度遍历，真的有必要如此研究吗？真正在查找元素方面，也只是你单方面决定是深度搜索还是广度搜索，并没有实际的优化意义
 */

// 测试深层树的遍历，来看它到底是深度遍历，还是广度遍历
const tree = [
    {
        key:'1', 
        children: [
            {
                key: '1-1',
                children: []
            },
            {
                key: '1-2',
                children: []
            },
            {
                key: '1-3',
                children: []
            },
            {
                key: '1-4',
                children: []
            }
        ]
    },
    {
        key:'2', 
        children: [
            {
                key: '2-1',
                children: []
            },
            {
                key: '2-2',
                children: []
            },
            {
                key: '2-3',
                children: []
            },
            {
                key: '2-4',
                children: []
            }
        ]
    },
    {
        key:'3', 
        children: [
            {
                key: '3-1',
                children: []
            },
            {
                key: '3-2',
                children: []
            },
            {
                key: '3-3',
                children: []
            },
            {
                key: '3-4',
                children: []
            }
        ]
    },
    {
        key:'4', 
        children: [
            {
                key: '4-1',
                children: []
            },
            {
                key: '4-2',
                children: []
            },
            {
                key: '4-3',
                children: []
            },
            {
                key: '4-4',
                children: []
            }
        ]
    }
];

const loopTree = (tree) => {
    for(let item of tree) {
        const {key, children} = item;
        console.log(key);
        loopTree(children);
    }
}

// loopTree(tree);
// js即使是单线程，针对树的搜索也是深度优先的。
// 深度遍历和js单线程有什么关系，它是单纯的js执行，每次要让代码从上到下依次执行完成才行

// 深度优先查找树节点
const findNodeByIdWithDeep = (tree, id) => {
    for(let item of tree) {
        const {key, children} = item;
        // 这里的log，可以确定循环遍历找到后是否断掉
        console.log(key);
        if(key === id) {
            return item;
        }
        // 其实你会想到，深层次循环遍历，若是找到，得要断掉循环
        const childrenSearchResult = findNodeByIdWithDeep(children, id);
        if(childrenSearchResult) return childrenSearchResult;
    }
}

// 广度优先查找树节点
const findNodeByIdWithWidth = (tree, id) => {
    const childrens = [];
    for(let item of tree) {
        const {key, children} = item;
        // 这里的log，可以确定循环遍历找到后是否断掉
        console.log(key);
        if(key === id) {
            return item;
        }
        childrens.push(...children);
    }
    if(childrens.length) {
        return findNodeByIdWithWidth(childrens, id);
    }
}

// findNodeByIdWithDeep(tree, '2-1');
console.log('----------------------------')
findNodeByIdWithWidth(tree, '2-2');

// 2025.08.03
// 1、之前就能想到这个点，还是很有前瞻性。的确，特别是对于树形结构，查找到节点后的断掉，很有必要，对于代码里就是简简单单一句return；
// 2、一般的递归调用，都是对数据的处理，还没有见过对数据的查找；
// 3、函数的嵌套调用，就是这样一层层调用下去，如果每一层都有返回值，最开始的函数能拿到第一百层的结果的；
