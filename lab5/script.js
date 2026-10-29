(function () {
    const mainContent = document.getElementById("main-content");
    const catalogLink = document.getElementById("catalog-link");

    // Універсальна функція для виконання асинхронного GET-запиту через XMLHttpRequest (Ajax)
    function ajaxGetJson(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    callback(data);
                } else {
                    mainContent.innerHTML = `
                        <div class="alert alert-danger">
                            Помилка завантаження даних (${url}): статус ${xhr.status}
                        </div>`;
                }
            }
        };
        xhr.send(null);
    }

    // Функція завантаження та відображення списку категорій каталогу і блоку "Specials"
    function loadCatalog() {
        ajaxGetJson("categories.json", function (categories) {
            let html = `
                <div class="text-center mb-4">
                    <h2>Каталог товарів</h2>
                    <p class="text-muted">Оберіть категорію для перегляду асортименту або випробуйте удачу у розділі Specials</p>
                </div>
                <div class="row g-4">
            `;

            // Виведення карток-посилань для кожної категорії з categories.json
            categories.forEach(function (cat) {
                html += `
                    <div class="col-md-4">
                        <div class="card h-100 category-card border-primary" data-shortname="${cat.shortname}">
                            <div class="card-body text-center">
                                <h4 class="card-title text-primary">${cat.name}</h4>
                                <p class="card-text text-muted small">Код: ${cat.shortname}</p>
                                <p class="card-text">${cat.notes}</p>
                                <a href="#" class="btn btn-outline-primary mt-2">Переглянути категорію</a>
                            </div>
                        </div>
                    </div>
                `;
            });

            // Посилання на категорію "Specials" після переліку основних категорій
            html += `
                    <div class="col-12 mt-4">
                        <div class="card specials-card border-warning bg-warning-subtle" id="specials-link">
                            <div class="card-body text-center py-4">
                                <h3 class="card-title text-dark fw-bold">★ Specials (Спеціальна пропозиція) ★</h3>
                                <p class="card-text mb-2">Натисніть сюди, щоб відкрити випадкову категорію каталогу!</p>
                                <a href="#" class="btn btn-warning fw-semibold">Відкрити випадкову категорію</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            mainContent.innerHTML = html;

            // Прив'язка обробників кліку до кожної категорії
            const categoryCards = document.querySelectorAll(".category-card");
            categoryCards.forEach(function (card) {
                card.addEventListener("click", function (event) {
                    event.preventDefault();
                    const shortname = this.getAttribute("data-shortname");
                    loadCategoryItems(shortname);
                });
            });

            // Прив'язка обробника кліку до "Specials" (вибір випадкової категорії через Math.random())
            const specialsCard = document.getElementById("specials-link");
            specialsCard.addEventListener("click", function (event) {
                event.preventDefault();
                const randomIndex = Math.floor(Math.random() * categories.length);
                const randomCategory = categories[randomIndex];
                loadCategoryItems(randomCategory.shortname);
            });
        });
    }

    // Функція завантаження товарів конкретної категорії за її shortname
    function loadCategoryItems(shortname) {
        const fileUrl = `${shortname}.json`;

        ajaxGetJson(fileUrl, function (categoryData) {
            let html = `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h2 class="mb-1">${categoryData.categoryName}</h2>
                        <p class="text-muted mb-0">${categoryData.categoryNotes || ""}</p>
                    </div>
                    <button class="btn btn-secondary" id="back-to-catalog">← Назад до категорій</button>
                </div>
                <hr class="mb-4">
                <div class="row g-4">
            `;

            // Формування карток товарів (зображення 200x200, назва, опис, ціна)
            categoryData.items.forEach(function (item) {
                const imgUrl = `https://placehold.co/200x200/212529/ffffff?text=${encodeURIComponent(item.shortname)}`;

                html += `
                    <div class="col-md-6 col-lg-3">
                        <div class="card h-100 shadow-sm">
                            <div class="text-center pt-3">
                                <img src="${imgUrl}" alt="${item.name}" class="product-img rounded">
                            </div>
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${item.name}</h5>
                                <p class="card-text text-muted small mb-2">Артикул: ${item.shortname}</p>
                                <p class="card-text flex-grow-1">${item.description}</p>
                                <div class="mt-3 pt-2 border-top d-flex justify-content-between align-items-center">
                                    <span class="fs-5 fw-bold text-success">${item.price}</span>
                                    <span class="badge bg-secondary">ID: ${item.id}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });

            html += `</div>`;
            mainContent.innerHTML = html;

            // Кнопка повернення до списку категорій без перезавантаження сторінки
            document.getElementById("back-to-catalog").addEventListener("click", function () {
                loadCatalog();
            });
        });
    }

    // Обробник кліку на посилання «Каталог» у шапці сайту
    catalogLink.addEventListener("click", function (event) {
        event.preventDefault();
        loadCatalog();
    });

    // При першому завантаженні головної сторінки відображаємо каталог категорій
    document.addEventListener("DOMContentLoaded", function () {
        loadCatalog();
    });
})();
