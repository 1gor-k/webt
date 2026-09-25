// Вивід інструкції користувачеві при завантаженні сторінки
console.log(
`===================================================================
ІНСТРУКЦІЯ З ВИКОРИСТАННЯ ФУНКЦІЇ triangle()
===================================================================
Функція обчислює всі параметри прямокутного трикутника за двома елементами.

Синтаксис виклику:
  triangle(val1, "type1", val2, "type2")

Дозволені типи елементів:
  • "leg"            - катет
  • "hypotenuse"     - гіпотенуза
  • "adjacent angle" - прилеглий до катета кут (у градусах)
  • "opposite angle" - протилежний до катета кут (у градусах)
  • "angle"          - один з гострих кутів при заданій гіпотенузі (у градусах)

Сумісні комбінації аргументів (порядок довільний):
  1. "leg" + "leg"
  2. "leg" + "hypotenuse"
  3. "leg" + "adjacent angle"
  4. "leg" + "opposite angle"
  5. "hypotenuse" + "angle"

Приклади виклику:
  triangle(7, "leg", 18, "hypotenuse");
  triangle(60, "opposite angle", 5, "leg");
===================================================================`
);

function triangle(val1, type1, val2, type2) {
    const validTypes = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];

    // Перевірка типу переданих підписів (типів аргументів)
    if (typeof type1 !== "string" || typeof type2 !== "string") {
        console.log("Помилка: типи елементів повинні бути рядками. Будь ласка, перечитайте інструкцію.");
        return "failed";
    }

    const t1 = type1.trim().toLowerCase();
    const t2 = type2.trim().toLowerCase();

    // Перевірка на коректність назв типів
    if (!validTypes.includes(t1) || !validTypes.includes(t2)) {
        console.log("Помилка: вказано невідомий тип аргументу. Будь ласка, перечитайте інструкцію.");
        return "failed";
    }

    // Перевірка числових значень
    if (typeof val1 !== "number" || typeof val2 !== "number" || Number.isNaN(val1) || Number.isNaN(val2)) {
        return "Invalid input: arguments must be valid numbers";
    }

    // Перевірка на додатність аргументів
    if (val1 <= 0 || val2 <= 0) {
        return "Zero or negative input";
    }

    const has = (type) => t1 === type || t2 === type;
    const getVal = (type) => (t1 === type ? val1 : val2);

    const toRad = (deg) => (deg * Math.PI) / 180;
    const toDeg = (rad) => (rad * 180) / Math.PI;

    let a, b, c, alpha, beta;

    // 1. Катет і катет
    if (t1 === "leg" && t2 === "leg") {
        a = val1;
        b = val2;
        c = Math.hypot(a, b);
        alpha = toDeg(Math.atan(a / b));
        beta = 90 - alpha;
    }
    // 2. Катет і гіпотенуза
    else if (has("leg") && has("hypotenuse")) {
        const leg = getVal("leg");
        const hyp = getVal("hypotenuse");

        if (leg >= hyp) {
            return "Катет не може бути більшим за гіпотенузу або рівним їй";
        }

        a = leg;
        c = hyp;
        b = Math.sqrt(c * c - a * a);
        alpha = toDeg(Math.asin(a / c));
        beta = 90 - alpha;
    }
    // 3. Катет і прилеглий кут
    else if (has("leg") && has("adjacent angle")) {
        const leg = getVal("leg");
        const adjAngle = getVal("adjacent angle");

        if (adjAngle >= 90) {
            return "Кут повинен бути гострим (менше 90 градусів)";
        }

        // Нехай заданий катет - це a, тоді прилеглий до нього кут - це beta
        a = leg;
        beta = adjAngle;
        alpha = 90 - beta;
        b = a * Math.tan(toRad(beta));
        c = a / Math.cos(toRad(beta));
    }
    // 4. Катет і протилежний кут
    else if (has("leg") && has("opposite angle")) {
        const leg = getVal("leg");
        const oppAngle = getVal("opposite angle");

        if (oppAngle >= 90) {
            return "Кут повинен бути гострим (менше 90 градусів)";
        }

        // Нехай заданий катет - це a, тоді протилежний кут - це alpha
        a = leg;
        alpha = oppAngle;
        beta = 90 - alpha;
        b = a / Math.tan(toRad(alpha));
        c = a / Math.sin(toRad(alpha));
    }
    // 5. Гіпотенуза і гострий кут
    else if (has("hypotenuse") && has("angle")) {
        const hyp = getVal("hypotenuse");
        const ang = getVal("angle");

        if (ang >= 90) {
            return "Кут повинен бути гострим (менше 90 градусів)";
        }

        c = hyp;
        alpha = ang;
        beta = 90 - alpha;
        a = c * Math.sin(toRad(alpha));
        b = c * Math.cos(toRad(alpha));
    }
    // Несумісні типи
    else {
        console.log("Помилка: несумісна комбінація типів аргументів. Будь ласка, перечитайте інструкцію.");
        return "failed";
    }

    // Вивід результатів у консоль
    console.log(`a = ${a}`);
    console.log(`b = ${b}`);
    console.log(`c = ${c}`);
    console.log(`alpha = ${alpha}`);
    console.log(`beta = ${beta}`);

    return "success";
}
