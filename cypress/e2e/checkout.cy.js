/// <reference types= "cypress" />

Cypress.Commands.add("Login", (user, password) => {
  cy.get("#customer_menu_top > li > a").click();
  cy.get("#loginFrm_loginname").type(user);
  cy.get("#loginFrm_password").type(password);
  cy.get("#loginFrm > fieldset > .btn").click();
  cy.get(".logo > img").click();
});

Cypress.Commands.add("Add_To_Cart", (categoryName, skipitem) => {
  cy.get(`#${categoryName}`)
    .find(".thumbnail")
    .its("length")
    .then((count) => {
      cy.wrap(count);
      const c = count;

      for (let i = 0; i < c; i++) {
        if (i==skipitem) {
          continue;
        }else {

          cy.get(`#${categoryName}`).find(".thumbnail" ).eq(i).click();
          cy.get(".cart").click();
          cy.get(".logo > img").click();
        }

      }
    });
});

describe("checkout spec", () => {
  it("add four item from the home page to the cart and checkout", () => {
    cy.visit("https://www.automationteststore.com/");

    cy.Login("osama_yaseen97", "078oshm#@!");

    // cy.Add_To_Cart("featured",1);

    cy.Add_To_Cart("special",2);
    cy.get('.block_7 > .nav > .dropdown > .dropdown-toggle').click()
    cy.get('#cart_checkout1').click()
    cy.get('#checkout_btn').click()

    cy.get('.maintext').should('contain','Processed')
  });
});