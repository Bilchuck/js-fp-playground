// GENERAL
const log = x => {
    console.log(x);
    return x;
}
const square = x => x * x;
const EQ = Symbol(`EQ`);
const LT = Symbol(`LT`);
const RT = Symbol(`RT`);
const compare = (x, y) => x === y 
    ? EQ
    : x < y ? LT : RT;

// CONS
const cons = (a,b) => f => f(a,b);

const cdr = cons => cons((a,b) => b);

const cat = cons => cons((a,b) => a);

console.log(`cdr(cons(1,2)) === 2 | ${cdr(cons(1,2)) === 2} | ${cdr(cons(1,2))}`);
console.log(`cat(cons(1,2)) === 2 | ${cat(cons(1,2)) === 1} | ${cat(cons(1,2))}`);

// LIST

const LIST_END = Symbol(`LIST_END`);

const list = el => cons(el, LIST_END);

const list_push = (el, list) => cons(el, list);

const list_show = list => `[${fn_list_show(list)}]`;

const fn_list_show = list => cdr(list) === LIST_END 
    ? `${cat(list)}`
    : `${cat(list).toString()}, ${fn_list_show(cdr(list))}`;

const map = (fn, list) => {
    return cdr(list) === LIST_END 
        ? cons(fn(cat(list)), LIST_END)
        : cons(fn(cat(list)), map(fn, cdr(list)));
}

const list_log = list => log(list_show(list));

// LIST TEST
console.log(`==========`);
console.log(`LIST TESTS`);
console.log(`==========`);
const b = list_push(3,list_push(2,list(1)));
console.log(`displayed list | ${list_show(b)}`);
const c = map(square, b);
console.log(`mapped list by square | ${list_show(c)}`);

// TREE
const TREE_END = Symbol(`TREE_END`);
const create_tree = (x, l = TREE_END, r = TREE_END) => f => f(x, l, r);

const tree_value = tree => tree((x, l, r) => x);
const tree_left  = tree => tree((x, l, r) => l);
const tree_right = tree => tree((x, l, r) => r);

const tree_add = (el, tree) => tree === TREE_END 
    ? create_tree(el)
    : tree_add_search(el, tree);

const tree_add_search = (el, tree) => {
    switch (compare(el, tree_value(tree))) {
        case EQ: return tree;
        case LT: return create_tree(
            tree_value(tree),
            tree_add(el, tree_left(tree)),
            tree_right(tree)
        );
        case RT: return create_tree(
            tree_value(tree),
            tree_left(tree),
            tree_add(el, tree_right(tree))
        );
    }
}

const tree_search = (el, tree) => tree === TREE_END
    ? false
    : tree_search_fn(el, tree);

const tree_search_fn = (el, tree) => {
    switch (compare(el, tree_value(tree))) {
        case EQ: return true;
        case LT: return tree_search(el, tree_left(tree));
        case RT: return tree_search(el, tree_right(tree));
    }
}
const arr = [];
for (let i = 1; i <= 100; i++) {
    arr.push(i);
}
// arr = [1..100]
let tree = create_tree(0);
for (const n of arr) {
    tree = tree_add(n, tree);
}
// tree [0..100]
console.log(`tree_search(25, tree) | ${tree_search(25, tree)}`);
console.log(`tree_search(101, tree) | ${tree_search(10125, tree)}`);
