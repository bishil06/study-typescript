/* eslint-disable no-useless-constructor */
/* eslint-disable default-case */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */

// class 예제

type FileType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
type RankType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type ColorType = 'Black' | 'White';

class Position {
  // eslint-disable-next-line no-useless-constructor
  constructor(private file: FileType, private rank: RankType) {}

  distanceFrom(position: Position) {
    return {
      rank: Math.abs(position.rank - this.rank),
      file: Math.abs(position.file.charCodeAt(0) - this.file.charCodeAt(0)),
    };
  }
}

// 추상 클래스
abstract class Piece {
  protected position: Position;

  constructor(
    private readonly color: ColorType,
    file: FileType,
    rank: RankType
  ) {
    this.position = new Position(file, rank);
  }

  moveTo(position: Position) {
    this.position = position;
  }

  abstract camMoveTo(position: Position): boolean;
}

class King extends Piece {
  camMoveTo(position: Position) {
    const distance = this.position.distanceFrom(position);
    return distance.rank < 2 && distance.file < 2;
  }
}

class Game {
  private pieces = Game.makePieces();

  private static makePieces() {
    return [new King('White', 'E', 1)];
  }
}

const g = new Game();
console.log(g);

// this 타입
class MySet {
  // eslint-disable-next-line no-useless-constructor
  constructor(protected data: number[] = []) {}

  has(value: number): boolean {
    return this.data.some((n) => {
      if (n === value) return true;
      return false;
    });
  }

  add(value: number): this {
    this.data.push(value);
    return this;
  }
}

class MutableSet extends MySet {
  delete(value: number): boolean {
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

interface Food {
  calories: number;
  tasty: boolean;
}

interface Cake extends Food {
  sweet: boolean;
}

// 선언 합침
interface Cake {
  price: number;
}

const cake: Cake = {
  calories: 100,
  tasty: true,
  sweet: true,
  price: 10000,
};
console.log(cake);

interface Animal {
  eat(food: string): void;
  sleep(hours: number): void;
}

// 인터페이스 implements
class Cat implements Animal {
  eat(food: string) {
    console.info(food);
  }

  sleep(hours: number) {
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
function move(p: Person) {
  p.run();
}
move(new Person());
move(new Dog());

// 믹스인
type classConstructor<T> = new (...args: any[]) => T;

// eslint-disable-next-line @typescript-eslint/ban-types
function withEZDebug<C extends classConstructor<{ getDebugValue(): object }>>(
  Class: C
) {
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
  constructor(
    private id: number,
    private firstName: string,
    private lastName: string
  ) {}

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
  private constructor(private msg: string) {}

  static create(msg: string) {
    return new Message(msg);
  }
}

// const m = new Message('12313'); // 'Message' 클래스의 생성자는 private이며 클래스 선언 내에서만 액세스할 수 있습니다.ts(2673)
console.log(Message.create('123131'));

// 팩토리패턴 예제
// 타입별칭
type Shoe = {
  purpose: string;
};

class BalletFlat implements Shoe {
  purpose = 'dancing';
}

class Boot implements Shoe {
  purpose = 'woodcutting';
}

class Sneaker implements Shoe {
  purpose = 'walking';
}
// 팩토리
const Shoe = {
  // eslint-disable-next-line consistent-return
  create(type: 'balletFlat' | 'boot' | 'sneaker'): Shoe {
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
