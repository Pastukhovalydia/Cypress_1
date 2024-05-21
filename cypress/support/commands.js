const faker = require('faker');

Cypress.Commands.add('setBaseUrl', (url) => {
    Cypress.config('baseUrl', url);
});

Cypress.Commands.add('login', (email, password) => {
    cy.visit('/'); // Используем базовый URL
    cy.get('.ml-auto > .ml-2').click(); // Нажимаем на кнопку входа
    if (email) {
        cy.inputData('#mail', email); // Вводим электронную почту, если указана
    }
    if (password) {
        cy.inputData('#pass', password); // Вводим пароль, если указан
    }
    cy.get('form > .ml-2').click(); // Нажимаем на кнопку входа
});

Cypress.Commands.add('checkElementVisibility', (selector) => {
    cy.get(selector).should('be.visible');
});

Cypress.Commands.add('inputData', (selector, value) => {
    cy.get(selector).type(value);
});

Cypress.Commands.add('addBookToFavorites', (checkFavorite = true) => {
    const bookTitle = faker.lorem.words(); // Генерируем случайное название книги
    const description = faker.lorem.sentence();
    const authors = faker.name.findName();

    cy.get('.p-0 > .btn').click(); // Нажимаем на кнопку добавления книги
    cy.get('.modal-title').should('be.visible'); // Проверяем, что модальное окно для добавления книги отобразилось
    cy.get('#title').type(bookTitle); // Вводим название книги
    cy.get('#description').type(description); // Вводим описание книги
    cy.get('#authors').type(authors); // Вводим автора книги
    if (checkFavorite) {
        cy.get('.form-check-label').click(); // Устанавливаем чекбокс
    }
    cy.get('form > .ml-2').click(); // Нажимаем кнопку добавления книги

    cy.wrap({ bookTitle, description, authors }).as('newBook'); // Сохраняем данные книги в alias
});

Cypress.Commands.add('removeBookFromFavorites', (title) => {
    cy.contains('.card-title', title)
        .parents('.card-body')
        .siblings('.card-footer')
        .find('.btn')
        .click(); // Нажимаем на кнопку удаления книги из избранного
});