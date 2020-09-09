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
})