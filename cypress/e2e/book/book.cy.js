describe('Добавление и удаление книг из избранного', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.login('bropet@mail.ru', '123');
    });
  
    it('должен добавить книгу в избранное', () => {
      cy.addBookToFavorites();
      cy.get('@newBook').then(({ bookTitle }) => {
        cy.contains('.card-title', bookTitle).should('be.visible');
      });
    });
  
    it('должен удалить книгу из избранного', () => {
      cy.addBookToFavorites();
      cy.get('@newBook').then(({ bookTitle }) => {
        cy.removeBookFromFavorites(bookTitle);
        cy.contains('.card-title', bookTitle).should('not.exist');
      });
    });
  
    it('должен добавить книгу в избранное с помощью кнопки "Add to favorite"', () => {
      cy.addBookToFavorites(false);
      cy.get('@newBook').then(({ bookTitle }) => {
        cy.contains('.card-title', bookTitle).parent().parent().contains('Add to favorite').click();
        cy.contains('.card-title', bookTitle).should('be.visible');
      });
    });
  
    afterEach(() => {
      cy.get('@newBook').then(({ bookTitle }) => {
        cy.contains('.card-title', bookTitle).then(($el) => {
          if ($el.length > 0) {
            cy.removeBookFromFavorites(bookTitle);
          }
        });
      });
    });
  });