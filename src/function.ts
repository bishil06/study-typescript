// 함수 선언 -> 반환값 추론
function add(a: number, b: number) {
  return a + b;
}
console.log(add(1, 2));

// 선택적 매개변수
function log(msg: string, id?: string) {
  if (id) {
    console.log(id, msg);
  } else {
    console.log(msg);
  }
}
log('absdafdsaf', 'kieek');
log('sadfasfsaf');

// 기본매개변수
function log2(msg: string, id = 'no') {
  console.log(id, msg);
}
log('absdafdsaf', 'kieek');
log('sadfasfsaf');

// 나머지 매개변수
function sum(...numbers: number[]) {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3));

// call apply bind 함수 호출
console.log(add(10, 20));
console.log(add.apply(null, [10, 20]));
console.log(add.call(null, 10, 20));
console.log(add.bind(null, 10, 20)());

// this 타입 -> 컴파일 타임에서 this의 타입을 추론해서 에러를 발생
function fancyDate(this: Date) {
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

// 호출시그니처
type greet = (name: string) => string;
type LogType = (msg: string, userId?: string) => void;

const log3: LogType = (msg, userId = 'no') => {
  console.log(userId, msg);
};
log3('adsfasdf', 'dsssss');

// 문맥적 타입화
function times(f: (idx: number) => void, n: number) {
  for (let i = 0; i < n; i += 1) {
    f(i);
  }
}

times((n) => console.log(n), 5);

// 오버로드된 함수 타입
type Reservation = void;
type Reserve = {
  (from: Date, to: Date, destination: string): Reservation;
  (from: Date, destination: string): Reservation;
};

const reserve: Reserve = (
  from: Date,
  toOrDestination: Date | string,
  destination?: string
) => {
  if (toOrDestination instanceof Date && typeof destination === 'string') {
    console.log(from, toOrDestination, destination);
  } else if (typeof toOrDestination === 'string') {
    console.log(from, toOrDestination);
  }
};
reserve(new Date(), new Date(), 'abc');
reserve(new Date(), 'adfassafas');

type CreateElement = {
  (tag: 'a'): HTMLAnchorElement;
  (tag: 'canvas'): HTMLCanvasElement;
  (tag: 'table'): HTMLTableElement;
  (tag: 'string'): HTMLElement;
};

// 다형성
type Filter = {
  <T>(array: T[], f: (item: T) => boolean): T[];
};

const filter: Filter = (arr, fn) => {
  // arr 배열의 타입으로 T 타입을 추론합니다
  const result = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const v of arr) {
    if (fn(v)) result.push(v);
  }

  return result;
};

console.log(filter([1, 2, 3, 4, 5, 6], (n) => n % 2 === 0));
console.log(filter(['a', 'b', 'c'], (c) => c !== 'b'));

type MapType = {
  <T, U>(arr: T[], f: (item: T) => U): U[];
};

const map: MapType = (arr, fn) => {
  const result = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const v of arr) {
    result.push(fn(v));
  }

  return result;
};

console.log(map([1, 2, 3], (n) => `${n}`));
console.log(map(['1', '2', '3'], (c) => Number(c)));

const p = new Promise<number>((res) => {
  res(1234);
});
p.then((n) => console.log(n));

// 제네릭 타입 별칭
type MyEvent<T> = {
  target: T;
  type: string;
};

type buttonEvent = MyEvent<HTMLButtonElement>;

// 한정된 다형성
type TreeNode = {
  value: string;
};

type LeafNode = TreeNode & {
  isLeaf: true;
};

type InnerNode = TreeNode & {
  children: [TreeNode] | [TreeNode, TreeNode];
};

const a: TreeNode = {
  value: 'a',
};

const b: LeafNode = {
  value: 'b',
  isLeaf: true,
};

const c: InnerNode = {
  value: 'c',
  children: [b],
};

function mapNode<T extends TreeNode>(node: T, f: (value: string) => string): T {
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

type HasSides = {
  numberOfSides: number;
};

type SidesHaveLength = {
  sideLength: number;
};

function logPerimeter<Shape extends HasSides & SidesHaveLength>(
  s: Shape
): Shape {
  console.log(s.numberOfSides * s.sideLength);
  return s;
}

type Square = HasSides & SidesHaveLength;
const square: Square = {
  numberOfSides: 4,
  sideLength: 3,
};
const some = logPerimeter(square); // Square 타입

function call<T extends unknown[], R>(f: (...args: T) => R, ...args2: T): R {
  return f(...args2);
}

function fill(length: number, value: string): string[] {
  return Array.from({ length }, () => value);
}

console.log(call(fill, 10, 'a'));
// console.log(call(fill, 10, 'a', 1)); // 3개의 인수가 필요한데 4개를 가져왔습니다.ts(2554)
