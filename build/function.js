"use strict";
// 함수 선언 -> 반환값 추론
function add(a, b) {
    return a + b;
}
console.log(add(1, 2));
// 선택적 매개변수
function log(msg, id) {
    if (id) {
        console.log(id, msg);
    }
    else {
        console.log(msg);
    }
}
log('absdafdsaf', 'kieek');
log('sadfasfsaf');
// 기본매개변수
function log2(msg, id = 'no') {
    console.log(id, msg);
}
log('absdafdsaf', 'kieek');
log('sadfasfsaf');
// 나머지 매개변수
function sum(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3));
// call apply bind 함수 호출
console.log(add(10, 20));
console.log(add.apply(null, [10, 20]));
console.log(add.call(null, 10, 20));
console.log(add.bind(null, 10, 20)());
// this 타입 -> 컴파일 타임에서 this의 타입을 추론해서 에러를 발생
function fancyDate() {
    return `${this.getDate()}/${this.getMonth()}/${this.getFullYear()}`;
}
console.log(fancyDate.call(new Date()));
// console.log(fancyDate()); // The 'this' context of type 'void' is not assignable to method's 'this' of type 'Date'.
// 제너레이터함수
function* fibo() {
    // function fibo(): Generator<number, void, unknown>
    let a = 0;
    let b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}
const fiboGenerator = fibo();
console.log(fiboGenerator.next());
console.log(fiboGenerator.next());
console.log(fiboGenerator.next());
console.log(fiboGenerator.next());
console.log(fiboGenerator.next());
console.log(fiboGenerator.next());
// 이터레이터
const numberIter = {
    // const numberIter: {
    //   [Symbol.iterator](): Generator<number, void, unknown>;
    // }
    *[Symbol.iterator]() {
        for (let i = 0; i < 10; i += 1) {
            yield i;
        }
    },
};
console.log([...numberIter]);
const log3 = (msg, userId = 'no') => {
    console.log(userId, msg);
};
log3('adsfasdf', 'dsssss');
// 문맥적 타입화
function times(f, n) {
    for (let i = 0; i < n; i += 1) {
        f(i);
    }
}
times((n) => console.log(n), 5);
const reserve = (from, toOrDestination, destination) => {
    if (toOrDestination instanceof Date && typeof destination === 'string') {
        console.log(from, toOrDestination, destination);
    }
    else if (typeof toOrDestination === 'string') {
        console.log(from, toOrDestination);
    }
};
reserve(new Date(), new Date(), 'abc');
reserve(new Date(), 'adfassafas');
const filter = (arr, fn) => {
    // arr 배열의 타입으로 T 타입을 추론합니다
    const result = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const v of arr) {
        if (fn(v))
            result.push(v);
    }
    return result;
};
console.log(filter([1, 2, 3, 4, 5, 6], (n) => n % 2 === 0));
console.log(filter(['a', 'b', 'c'], (c) => c !== 'b'));
const map = (arr, fn) => {
    const result = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const v of arr) {
        result.push(fn(v));
    }
    return result;
};
console.log(map([1, 2, 3], (n) => `${n}`));
console.log(map(['1', '2', '3'], (c) => Number(c)));
const p = new Promise((res) => {
    res(1234);
});
p.then((n) => console.log(n));
const a = {
    value: 'a',
};
const b = {
    value: 'b',
    isLeaf: true,
};
const c = {
    value: 'c',
    children: [b],
};
function mapNode(node, f) {
    return {
        ...node,
        value: f(node.value), // T extends TreeNode 여야만 value를 읽는 행위가 안전해진다
    };
}
const a1 = mapNode(a, (_) => _.toUpperCase());
const b1 = mapNode(b, (_) => _.toUpperCase());
const c1 = mapNode(c, (_) => _.toUpperCase());
console.log(a1);
console.log(b1);
console.log(c1);
function logPerimeter(s) {
    console.log(s.numberOfSides * s.sideLength);
    return s;
}
const square = {
    numberOfSides: 4,
    sideLength: 3,
};
const some = logPerimeter(square); // Square 타입
function call(f, ...args2) {
    return f(...args2);
}
function fill(length, value) {
    return Array.from({ length }, () => value);
}
console.log(call(fill, 10, 'a'));
// console.log(call(fill, 10, 'a', 1)); // 3개의 인수가 필요한데 4개를 가져왔습니다.ts(2554)
