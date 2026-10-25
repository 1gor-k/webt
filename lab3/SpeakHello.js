// Загортаємо код бібліотеки в IIFE (Immediately Invoked Function Expression),
// щоб змінна speakWord залишилася локальною і не потрапила в глобальну область видимості.
(function (window) {
  var speakWord = "Hello";

  // Створюємо об'єкт helloSpeaker, через який буде доступний метод speak
  var helloSpeaker = {};

  helloSpeaker.speak = function (name) {
    console.log(speakWord + " " + name);
  };

  // Експортуємо об'єкт helloSpeaker у глобальний об'єкт window
  window.helloSpeaker = helloSpeaker;

})(window);
