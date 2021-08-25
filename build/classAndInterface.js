"use strict";
/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
class Position {
    // eslint-disable-next-line no-useless-constructor
    constructor(file, rank) {
        this.file = file;
        this.rank = rank;
    }
    distanceFrom(position) {
        return {
            rank: Math.abs(position.rank - this.rank),
            file: Math.abs(position.file.charCodeAt(0) - this.file.charCodeAt(0)),
        };
    }
}
// 추상 클래스
class Piece {
    constructor(color, file, rank) {
        this.color = color;
        this.position = new Position(file, rank);
    }
    moveTo(position) {
        this.position = position;
    }
}
class King extends Piece {
    camMoveTo(position) {
        const distance = this.position.distanceFrom(position);
        return distance.rank < 2 && distance.file < 2;
    }
}
class Game {
    constructor() {
        this.pieces = Game.makePieces();
    }
    static makePieces() {
        return [new King('White', 'E', 1)];
    }
}
const g = new Game();
console.log(g);
// this 타입
class MySet {
    // eslint-disable-next-line no-useless-constructor
    constructor(data = []) {
        this.data = data;
    }
    has(value) {
        return this.data.some((n) => {
            if (n === value)
                return true;
            return false;
        });
    }
    add(value) {
        this.data.push(value);
        return this;
    }
}
class MutableSet extends MySet {
    delete(value) {
        let result = false;
        this.data = this.data.filter((n) => {
            if (n === value) {
                result = true;
                return false;
            }
            return true;
        });
        return result;
    }
}
const s = new MySet();
s.add(1).add(2).add(3);
console.log(s); // MySet { data: [ 1, 2, 3 ] }
const ms = new MutableSet();
ms.add(1).add(2).add(3); // this 반환타입을 통해 MySet 타입이 아니라 MutableSet 타입이 반환되었다
ms.delete(2);
console.log(ms); // MutableSet { data: [ 1, 3 ] }
const cake = {
    calories: 100,
    tasty: true,
    sweet: true,
    price: 10000,
};
console.log(cake);
// 인터페이스 implements
class Cat {
    eat(food) {
        console.info(food);
    }
    sleep(hours) {
        console.info(hours);
    }
}
const cat = new Cat();
cat.eat('fish');
cat.sleep(12);
class Person {
    run() {
        console.log('2leg');
    }
}
class Dog {
    run() {
        console.log('4leg');
    }
}
// ts 는 class 를 구조를 기준으로 비교한다
function move(p) {
    p.run();
}
move(new Person());
move(new Dog());
function withEZDebug(Class) {
    return class extends Class {
        debug() {
            const Name = this.constructor.name;
            const Value = this.getDebugValue();
            console.log(Name, Value);
        }
    };
}
// HardToDebugUser 클래스에 상속없이 debug 기능을 추가
class HardToDebugUser {
    constructor(id, firstName, lastName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    getDebugValue() {
        return {
            id: this.id,
            name: `${this.firstName} ${this.lastName}`,
        };
    }
}
const User = withEZDebug(HardToDebugUser);
const user = new User(3, 'emma', 'dasfasfas');
user.debug();
// final class 흉내내기
class Message {
    constructor(msg) {
        this.msg = msg;
    }
    static create(msg) {
        return new Message(msg);
    }
}
// const m = new Message('12313'); // 'Message' 클래스의 생성자는 private이며 클래스 선언 내에서만 액세스할 수 있습니다.ts(2673)
console.log(Message.create('123131'));
class BalletFlat {
    constructor() {
        this.purpose = 'dancing';
    }
}
class Boot {
    constructor() {
        this.purpose = 'woodcutting';
    }
}
class Sneaker {
    constructor() {
        this.purpose = 'walking';
    }
}
// 팩토리
const Shoe = {
    create(type) {
        switch (type) {
            case 'balletFlat':
                return new BalletFlat();
            case 'boot':
                return new Boot();
            case 'sneaker':
                return new Sneaker();
        }
    },
};
console.log(Shoe.create('boot'));
console.log(Shoe.create('balletFlat'));
