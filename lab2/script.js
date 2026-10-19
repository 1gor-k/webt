console.log("=== ЧАСТИНА 1: Робота з об'єктами та прототипами (без класів ES6) ===");

// ============================================================================
// Завдання 1.2.3 та 1.2.5: Створення об'єкта car1 через new Object() і метод drive
// ============================================================================
var car1 = new Object();
car1.color = "black";
car1.maxSpeed = 220;

car1.driver = new Object();
car1.driver.name = "Ігор Коваль";
car1.driver.category = "C";
car1.driver["personal limitations"] = "No driving at night";

car1.tuning = true;
car1["number of accidents"] = 0;

// Додавання методу drive до car1 (п. 1.2.5)
car1.drive = function () {
    console.log("I am not driving at night");
};

console.log("Об'єкт car1:", car1);
car1.drive(); // Демонстрація роботи методу drive для car1


// ============================================================================
// Завдання 1.2.4 та 1.2.6: Створення об'єкта car2 через літерал об'єкта і метод drive
// ============================================================================
var car2 = {
    color: "silver",
    maxSpeed: 195,
    driver: {
        name: "Ігор Коваль",
        category: "B",
        "personal limitations": null
    },
    tuning: false,
    "number of accidents": 2
};

// Додавання методу drive до car2 (п. 1.2.6)
car2.drive = function () {
    console.log("I can drive anytime");
};

console.log("Об'єкт car2:", car2);
car2.drive(); // Демонстрація роботи методу drive для car2


// ============================================================================
// Завдання 1.2.7 – 1.2.10: Конструктор Truck, prototype.AssignDriver та метод trip
// ============================================================================
function Truck(color, weight, avgSpeed, brand, model) {
    this.color = color;
    this.weight = weight;
    this.avgSpeed = avgSpeed;
    this.brand = brand;
    this.model = model;

    // Створення методу trip усередині конструктора (п. 1.2.9)
    this.trip = function () {
        if (!this.driver) {
            console.log("No driver assigned");
        } else {
            var nightText = this.driver.nightDriving
                ? "drives at night"
                : "does not drive at night";
            console.log(
                "Driver " + this.driver.name + " " +
                nightText + " and has " +
                this.driver.experience + " years of experience"
            );
        }
    };
}

// Створення методу AssignDriver через prototype (п. 1.2.8)
Truck.prototype.AssignDriver = function (name, nightDriving, experience) {
    this.driver = {
        name: name,
        nightDriving: nightDriving,
        experience: experience
    };
};

// Демонстрація роботи з двома об'єктами Truck (п. 1.2.10)
var truck1 = new Truck("white", 12000, 82.5, "Volvo", "FH16");
var truck2 = new Truck("blue", 10500, 78.3, "MAN", "TGX");

// Перевірка trip() до призначення водія
truck1.trip();

// Призначення водіїв (один їздить вночі, інший — ні)
truck1.AssignDriver("Ігор Коваль", true, 5);
truck2.AssignDriver("Ігор Коваль", false, 3);

// Демонстрація методу trip() для обох об'єктів
truck1.trip();
truck2.trip();


console.log("\n=== ЧАСТИНА 2: Класи ES6 та успадкування (завдання 1.2.12 – 1.2.24) ===");

// ============================================================================
// Завдання 1.2.12 – 1.2.15: Клас Square (квадрат)
// ============================================================================
class Square {
    constructor(a) {
        this.a = a;
    }

    static help() {
        console.log(
            "Square (Квадрат) — правильний чотирикутник, у якого всі чотири сторони рівні, а всі чотири кути прямі (по 90°)."
        );
    }

    length() {
        console.log(`Периметр (сума довжин сторін): ${4 * this.a}`);
    }

    square() {
        console.log(`Площа фігури: ${this.a ** 2}`);
    }

    info() {
        console.log(`--- Інформація про Square ---`);
        console.log(`Сторони: a = ${this.a}, a = ${this.a}, a = ${this.a}, a = ${this.a}`);
        console.log(`Кути: 90°, 90°, 90°, 90°`);
        this.length();
        this.square();
    }
}


// ============================================================================
// Завдання 1.2.16 – 1.2.17: Клас Rectangle (прямокутник), спадкоємець Square
// ============================================================================
class Rectangle extends Square {
    constructor(a, b) {
        super(a);
        this.b = b;
    }

    static help() {
        console.log(
            "Rectangle (Прямокутник) — чотирикутник, у якого всі кути прямі (по 90°), а протилежні сторони попарно рівні."
        );
    }

    length() {
        console.log(`Периметр (сума довжин сторін): ${2 * (this.a + this.b)}`);
    }

    square() {
        console.log(`Площа фігури: ${this.a * this.b}`);
    }

    info() {
        console.log(`--- Інформація про Rectangle ---`);
        console.log(`Сторони: a = ${this.a}, b = ${this.b}, a = ${this.a}, b = ${this.b}`);
        console.log(`Кути: 90°, 90°, 90°, 90°`);
        this.length();
        this.square();
    }
}


// ============================================================================
// Завдання 1.2.18 – 1.2.19 та 1.2.22: Клас Rhombus (ромб), спадкоємець Square
// Оскільки Parallelogram успадковується від Rectangle, для Rhombus визначено
// геттери та сеттери для кожної властивості (п. 1.2.22).
// ============================================================================
class Rhombus extends Square {
    constructor(a, alpha, beta) {
        super(a);
        this.alpha = alpha; // тупий кут
        this.beta = beta;   // гострий кут
    }

    // Геттери та сеттери для кожної властивості класу Rhombus (п. 1.2.22)
    get a() {
        return this._a;
    }
    set a(value) {
        this._a = value;
    }

    get alpha() {
        return this._alpha;
    }
    set alpha(value) {
        this._alpha = value;
    }

    get beta() {
        return this._beta;
    }
    set beta(value) {
        this._beta = value;
    }

    static help() {
        console.log(
            "Rhombus (Ромб) — паралелограм, у якого всі чотири сторони рівні, а протилежні кути попарно рівні (тупий кут alpha та гострий кут beta)."
        );
    }

    length() {
        console.log(`Периметр (сума довжин сторін): ${4 * this.a}`);
    }

    square() {
        const rad = (this.beta * Math.PI) / 180;
        const area = (this.a ** 2) * Math.sin(rad);
        console.log(`Площа фігури: ${area.toFixed(2)}`);
    }

    info() {
        console.log(`--- Інформація про Rhombus ---`);
        console.log(`Сторони: a = ${this.a}, a = ${this.a}, a = ${this.a}, a = ${this.a}`);
        console.log(`Кути: alpha = ${this.alpha}°, beta = ${this.beta}°, alpha = ${this.alpha}°, beta = ${this.beta}°`);
        this.length();
        this.square();
    }
}


// ============================================================================
// Завдання 1.2.20 – 1.2.21: Клас Parallelogram, спадкоємець Rectangle
// ============================================================================
class Parallelogram extends Rectangle {
    constructor(a, b, alpha, beta) {
        super(a, b);
        this.alpha = alpha; // тупий кут
        this.beta = beta;   // гострий кут
    }

    static help() {
        console.log(
            "Parallelogram (Паралелограм) — чотирикутник, у якого протилежні сторони попарно паралельні та рівні, а протилежні кути рівні."
        );
    }

    length() {
        console.log(`Периметр (сума довжин сторін): ${2 * (this.a + this.b)}`);
    }

    square() {
        const rad = (this.beta * Math.PI) / 180;
        const area = this.a * this.b * Math.sin(rad);
        console.log(`Площа фігури: ${area.toFixed(2)}`);
    }

    info() {
        console.log(`--- Інформація про Parallelogram ---`);
        console.log(`Сторони: a = ${this.a}, b = ${this.b}, a = ${this.a}, b = ${this.b}`);
        console.log(`Кути: alpha = ${this.alpha}°, beta = ${this.beta}°, alpha = ${this.alpha}°, beta = ${this.beta}°`);
        this.length();
        this.square();
    }
}

// Завдання 1.2.23: Виклик статичного методу help для кожного класу
Square.help();
Rectangle.help();
Rhombus.help();
Parallelogram.help();

// Завдання 1.2.24: Створення об'єктів та виклик методу info для кожного
const sq = new Square(5);
const rect = new Rectangle(8, 4);
const rhomb = new Rhombus(6, 120, 60);
const para = new Parallelogram(10, 5, 150, 30);

sq.info();
rect.info();
rhomb.info();
para.info();


console.log("\n=== ЧАСТИНА 3: Замикання та функції вищого порядку (завдання 1.2.25 – 1.2.31) ===");

// ============================================================================
// Завдання 1.2.25 – 1.2.26: Функція Triangular (зі значеннями за замовчуванням)
// ============================================================================
function Triangular(a = 3, b = 4, c = 5) {
    // Використання destructuring assignment (деструктуризуючого присвоювання)
    const { a: sideA, b: sideB, c: sideC } = { a, b, c };
    return { a: sideA, b: sideB, c: sideC };
}

const triDefault = Triangular();         // За замовчуванням (3, 4, 5)
const triSecond = Triangular(6, 8, 10);
const triThird = Triangular(5, 12, 13);

console.log("Трикутник 1 (за замовчуванням):", triDefault);
console.log("Трикутник 2:", triSecond);
console.log("Трикутник 3:", triThird);


// ============================================================================
// Завдання 1.2.27 – 1.2.28: Функція PiMultiplier
// ============================================================================
function PiMultiplier(multiplier) {
    return function () {
        return Math.PI * multiplier;
    };
}

const mulPiBy2 = PiMultiplier(2);
const mulPiBy2_3 = PiMultiplier(2 / 3);
const divPiBy2 = PiMultiplier(1 / 2);

console.log("π * 2 =", mulPiBy2());
console.log("π * (2/3) =", mulPiBy2_3());
console.log("π / 2 =", divPiBy2());


// ============================================================================
// Завдання 1.2.29 – 1.2.31: Функція Painter та фарбування тестових об'єктів
// ============================================================================
function Painter(color) {
    return function (obj) {
        if (obj && obj.type !== undefined) {
            console.log(`Color: ${color}, Type: ${obj.type}`);
        } else {
            console.log("No 'type' property occurred!");
        }
    };
}

// Створення функцій фарбування (п. 1.2.30)
const PaintBlue = Painter("Blue");
const PaintRed = Painter("Red");
const PaintYellow = Painter("Yellow");

// Тестові об'єкти з Таблиці 12 (п. 1.2.31)
const obj1 = {
    maxSpeed: 280,
    type: "Sportcar",
    color: "magenta"
};

const obj2 = {
    type: "Truck",
    "avg speed": 90,
    "load capacity": 2400
};

const obj3 = {
    maxSpeed: 180,
    color: "purple",
    isCar: true
};

console.log("--- Тестування на Об'єкті 1 (Sportcar) ---");
PaintBlue(obj1);
PaintRed(obj1);
PaintYellow(obj1);

console.log("--- Тестування на Об'єкті 2 (Truck) ---");
PaintBlue(obj2);
PaintRed(obj2);
PaintYellow(obj2);

console.log("--- Тестування на Об'єкті 3 (без властивості type) ---");
PaintBlue(obj3);
PaintRed(obj3);
PaintYellow(obj3);
