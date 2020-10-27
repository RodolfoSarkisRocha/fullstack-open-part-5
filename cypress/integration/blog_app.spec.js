describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Rodolfo Sarkis',
      username: 'rodolfosarkis',
      password: 'Asdf1234!',
    };
    cy.request('POST', 'http://localhost:3001/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function () {
    cy.contains('Blog');
  });

  it('user can login', function () {
    cy.get('#username').type('rodolfosarkis');
    cy.get('#password').type('Asdf1234!');
    cy.get('#login-button').click();
    cy.contains('Logged in as Rodolfo Sarkis');
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('rodolfosarkis');
      cy.get('#password').type('Asdf1234!');
      cy.get('#login-button').click();
    });

    it('a new blog can be created', function () {
      cy.contains('New Blog').click();
      cy.get('#title').type('a blog created by cypress');
      cy.get('#author').type('cypress tests');
      cy.get('#url').type('www.test.com');
      cy.get('#submit-blog-button').click();
      cy.contains('a blog created by cypress');
    });
  });
});
