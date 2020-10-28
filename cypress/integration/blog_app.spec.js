import { initialBlogs } from '../../src/utils/testHelper';
import utils from '../../src/utils/utils';

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Rodolfo Sarkis Rocha',
      username: 'rodolfosarkisrocha',
      password: 'Asdf1234!',
    };
    const secondUser = {
      name: 'Aparecida Helena',
      username: 'aparecidahelena',
      password: 'Asdf1234!',
    };
    cy.request('POST', 'http://localhost:3001/api/users', secondUser);
    cy.request('POST', 'http://localhost:3001/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function () {
    cy.contains('Blog');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('rodolfosarkisrocha');
      cy.get('#password').type('Asdf1234!');
      cy.get('#login-button').click();
      cy.contains('Logged in as Rodolfo Sarkis Rocha');
    });
    it('fails with wrong credentials', function () {
      cy.get('#username').type('rodolfosarkisrocha');
      cy.get('#password').type('ffffffff!');
      cy.get('#login-button').click();
      cy.contains('Wrong username or password').should(
        'have.css',
        'color',
        'rgb(255, 26, 26)'
      );
    });
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('rodolfosarkisrocha');
      cy.get('#password').type('Asdf1234!');
      cy.get('#login-button').click();

      cy.contains('New Blog').click();
      cy.get('#title').type('a blog created by cypress');
      cy.get('#author').type('cypress tests');
      cy.get('#url').type('www.test.com');
      cy.get('#submit-blog-button').click();
    });

    it('a new blog can be created', function () {
      cy.contains('a blog created by cypress');
    });

    it('user can like a blog', function () {
      cy.contains('View details').click();
      cy.contains('Likes: 0');
      cy.contains('Like!').click();
      cy.contains('Likes: 1');
    });

    it('user can delete a blog', function () {
      cy.contains('View details').click();
      cy.contains('Remove').click();
      cy.contains('a blog created by cypress').should('not.exist');
    });

    it('different user can\'t delete a blog', function () {
      cy.contains('Logout').click();
      cy.get('#username').type('aparecidahelena');
      cy.get('#password').type('Asdf1234!');
      cy.get('#login-button').click();
      cy.contains('View details').click();
      cy.contains('Remove').click();
      cy.contains('a blog created by cypress');
    });

    it('blogs are ordered by the number of likes', function () {
      cy.request({
        method: 'POST',
        url: 'http://localhost:3001/api/blogs',
        body: initialBlogs[0],
        headers: { Authorization: utils.getUserToken() },
      });
      cy.request({
        method: 'POST',
        url: 'http://localhost:3001/api/blogs',
        body: initialBlogs[1],
        headers: { Authorization: utils.getUserToken() },
      });
      cy.request({
        method: 'POST',
        url: 'http://localhost:3001/api/blogs',
        body: initialBlogs[2],
        headers: { Authorization: utils.getUserToken() },
      });
      cy.request({
        method: 'POST',
        url: 'http://localhost:3001/api/blogs',
        body: initialBlogs[3],
        headers: { Authorization: utils.getUserToken() },
      });
      cy.reload();

      cy.request('GET', 'http://localhost:3001/api/blogs').then((response) => {
        response.body.forEach((element, index) => {
          if (index < response.body.length - 1) {
            expect(element.likes).to.be.greaterThan(
              response.body[index + 1].likes
            );
          }
        });
      });
    });
  });
});
