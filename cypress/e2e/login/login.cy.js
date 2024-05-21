describe('Checking element display and login on the website', () => {
  beforeEach(() => {
    cy.visit('/'); // Используем базовый URL
  });

  it('должен выполнить проверку отображения элемента и входа на сайт с правильными данными', () => {
    cy.checkElementVisibility('.text-light > .ml-2');
    cy.login('bropet@mail.ru', '123');
    cy.contains('.pt-2', 'Добро пожаловать bropet@mail.ru').should('be.visible');
  });

  it('должен показать ошибку при вводе неправильных данных', () => {
    cy.checkElementVisibility('.text-light > .ml-2');
    cy.login('wrong@mail.ru', 'wrongpassword');
    cy.contains('Неправильая почта или пароль').should('be.visible');
  });

  it('должен показать всплывающее окно с сообщением "Заполните это поле." при пустом пароле', () => {
    cy.checkElementVisibility('.text-light > .ml-2');
    cy.get('.ml-auto > .ml-2').click();
    cy.inputData('#mail', 'bropet@mail.ru');
    cy.get('form > .ml-2').click();
    cy.get('#pass').then(($input) => {
      expect($input[0].validationMessage).to.eq('Заполните это поле.');
    });
  });

  it('должен показать всплывающее окно с сообщением "Заполните это поле." при пустой электронной почте', () => {
    cy.checkElementVisibility('.text-light > .ml-2');
    cy.get('.ml-auto > .ml-2').click();
    cy.inputData('#pass', '123');
    cy.get('form > .ml-2').click();
    cy.get('#mail').then(($input) => {
      expect($input[0].validationMessage).to.eq('Заполните это поле.');
    });
  });
});