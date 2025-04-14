describe('Steam UI Tests', () => {
    it('Loads the main page', () => {
      cy.visit('https://store.steampowered.com');
      cy.get('#store_nav_area', { timeout: 10000 }).should('be.visible');
      cy.title().should('include', 'Steam');
    });
  
    it('Searches for Path of Exile 2', () => {
      cy.visit('https://store.steampowered.com');
      cy.get('#store_nav_search_term').type('Path of Exile 2{enter}');
      cy.get('.search_result_row').should('exist');
    });
  
    it('Opens game page and checks for Add to Cart', () => {
      cy.visit('https://store.steampowered.com');
      cy.get('#store_nav_search_term').type('Path of Exile 2{enter}');
      cy.get('.search_result_row').first().click();
      cy.get('body').then($body => {
        if ($body.find('.btn_addtocart').length > 0) {
          cy.get('.btn_addtocart').should('be.visible');
        } else {
          cy.log('Add to Cart not available for this product');
        }
      });
    });
  });