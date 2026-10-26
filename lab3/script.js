// Загортаємо основний скрипт в IIFE, щоб масив names не виходив у глобальну область видимості
(function () {
  var names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];


  // ОСНОВНЕ ЗАВДАННЯ (п. 1.2.2):
  // Якщо ім'я починається з літери 'j' або 'J' -> "Good Bye SomeName",
  // інакше -> "Hello SomeName".
  console.log(" Основне завдання (відбір за першою літерою імені 'J' або 'j')");

  for (var i = 0; i < names.length; i++) {
    // Отримуємо першу літеру імені за допомогою charAt(0) і зводимо її до нижнього регістру
    var firstLetter = names[i].charAt(0).toLowerCase();

    if (firstLetter === "j") {
      byeSpeaker.speak(names[i]);
    } else {
      helloSpeaker.speak(names[i]);
    }
  }

  // Селекція імен за сумою ASCII-кодів літер та порівняння із порогом (450).
  console.log("\n Додатковий функціонал: відбір за сумою ASCII-кодів літер імені");
  console.log("Анотація підходу: для кожного імені обчислюється сума ASCII-кодів усіх його символів (метод charCodeAt).");
  console.log("Якщо сума перевищує поріг 450 — виводиться 'Good Bye', якщо менша або дорівнює 450 — 'Hello'.\n");

  var asciiThreshold = 450;

  for (var j = 0; j < names.length; j++) {
    var currentName = names[j];
    var asciiSum = 0;

    // Підрахунок суми ASCII-кодів літер поточного імені
    for (var k = 0; k < currentName.length; k++) {
      asciiSum += currentName.charCodeAt(k);
    }

    console.log("Ім'я: " + currentName + " | Сума ASCII-кодів: " + asciiSum);

    if (asciiSum > asciiThreshold) {
      byeSpeaker.speak(currentName);
    } else {
      helloSpeaker.speak(currentName);
    }
  }
})();
