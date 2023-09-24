describe('home page user flow', () => {

    beforeEach(() => {
        cy.intercept('GET', 'https://date.nager.at/api/v3/AvailableCountries', {
        statusCode: 200,
        fixture: "countries"
    }).as('countriesData').visit('http://localhost:3000')
  })

  it('should have a header on page load', () => {
    cy.wait(['@countriesData'])
    cy.location('pathname').should('eq', '/')
    cy.get('header').should('exist')
      .contains('h1','Public Holidays')

      .get('.buttons').should('exist')
      .get('.buttons').children()
      .get(':nth-child(1)').contains('My Tracked Holidays')

      .get('.buttons').children()
      .get(':nth-child(2)').contains('Home')
  })

  it('should navigate to correct pages when home and tracked is clicked', () => {
    cy.get('.home-button').click().location('pathname').should('eq', '/')
    cy.get('.track-button').click().location('pathname').should('eq', '/trackedHolidays')
  })

  it('should display all countries names and their flags', () => {
    cy.wait(['@countriesData'])
    cy.get('.countries-container').find('.country-card').should('have.length', 6)

    cy.get('.countries-container').children()
        .get(':nth-child(1)')
        .contains('h2', 'Andorra')
        .get('img.AD-country-flag').should('have.attr', 'alt', 'image of Andorra\'s flag')
        .get('img.AD-country-flag').should('have.attr', 'src', 'https://www.countryflagicons.com/FLAT/64/AD.png')

    cy.get('.countries-container').children()
        .get(':nth-child(3)')
        .contains('h2', 'Egypt')
        .get('img.EG-country-flag').should('have.attr', 'alt', 'image of Egypt\'s flag')
        .get('img.EG-country-flag').should('have.attr', 'src', 'https://www.countryflagicons.com/FLAT/64/EG.png')
        
    cy.get('.countries-container').children()
        .get(':nth-child(6)')
        .contains('h2', 'Zimbabwe')
        .get('img.ZW-country-flag').should('have.attr', 'alt', 'image of Zimbabwe\'s flag')
        .get('img.ZW-country-flag').should('have.attr', 'src', 'https://www.countryflagicons.com/FLAT/64/ZW.png')
  })

  it('should update url to clicked country details', () => {
    cy.intercept('GET', 'https://date.nager.at/api/v3/PublicHolidays/2023/AD', {
        statusCode: 200,
    })
    cy.get('.country-card').first().click()
        .url().should('eq', 'http://localhost:3000/2023/AD')

    cy.intercept('GET', 'https://date.nager.at/api/v3/PublicHolidays/2023/ZW', {
        statusCode: 200,
    })
        cy.visit('http://localhost:3000')
        .get('.country-card').last().click()
        .url().should('eq', 'http://localhost:3000/2023/ZW')
  })

  it('should display an error message for 500 error', () => {
    cy.intercept('GET', 'https://date.nager.at/api/v3/AvailableCountries', {
      statusCode: 500,
    })
    cy.get('img.error-photo').should('have.attr', 'src', 'https://images.wagwalkingweb.com/media/daily_wag/blog_articles/hero/1667345491.5716999/how-to-travel-with-a-dog-on-a-plane.png')
    cy.contains('h2', 'OH NO!')
    cy.get('.home-link').click()
      .url().should('eq', 'http://localhost:3000/')
  })

  it('should display an error message for 400 error', () => {
    cy.intercept('GET', 'https://date.nager.at/api/v3/AvailableCountries', {
      statusCode: 400,
    })
    cy.contains('h2', 'OH NO!')
    cy.get('img.error-photo').should('have.attr', 'src', 'https://images.wagwalkingweb.com/media/daily_wag/blog_articles/hero/1667345491.5716999/how-to-travel-with-a-dog-on-a-plane.png')
    cy.get('.home-link').click()
      .url().should('eq', 'http://localhost:3000/')
  })

  it('should display an error message for 300 response', () => {
    cy.intercept('GET', 'https://date.nager.at/api/v3/AvailableCountries', {
    statusCode: 300,
    })
    cy.contains('h2', 'OH NO!')
    cy.get('img.error-photo').should('have.attr', 'src', 'https://images.wagwalkingweb.com/media/daily_wag/blog_articles/hero/1667345491.5716999/how-to-travel-with-a-dog-on-a-plane.png')
    cy.get('.home-link').click()
      .url().should('eq', 'http://localhost:3000/')
    })

})