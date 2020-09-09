describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Jon Dennis',
      username: 'jdfoto',
      password: 'jdfoto'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username')
        .type('jdfoto')
      cy.get('#password')
        .type('jdfoto')
      cy.get('#login-button')
        .click()

      cy.contains('Jon Dennis logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username')
        .type('jdfoto')
      cy.get('#password')
        .type('wrong')
      cy.get('#login-button')
        .click()

      cy.get('.notification')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Jon Dennis logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'jdfoto', password: 'jdfoto' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog')
        .click()
      cy.get('#title')
        .type('a blog created by cypress')
      cy.get('#author')
        .type('James Joyce')
      cy.get('#url')
        .type('http://www.website.com')

      cy.contains('create')
        .click()

      cy.get('.notification')
        .should('contain', 'a new blog a blog created by cypress by James Joyce added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.contains('a blog created by cypress')
    })
    describe.only('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'initial cypress beforeEach blog',
          author: 'Joe Blow',
          url: 'http://www.initialurl.com'
        })
      })

      it('User can like a blog', function() {
        cy.contains('view')
          .click()
        cy.contains('like')
          .click()

        cy.get('.notification')
          .should('contain', 'Like added to: initial cypress beforeEach blog')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid')
      })

    })
  })
})