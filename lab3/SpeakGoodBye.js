// Загортаємо код бібліотеки в IIFE для ізоляції змінної speakWord
(function (window) {
  var speakWord = "Good Bye";

  // Створюємо об'єкт byeSpeaker, через який буде доступний метод speak
  var byeSpeaker = {};

  byeSpeaker.speak = function (name) {
    console.log(speakWord + " " + name);
  };

  // Експортуємо об'єкт byeSpeaker у глобальний об'єкт window
  window.byeSpeaker = byeSpeaker;

})(window);
