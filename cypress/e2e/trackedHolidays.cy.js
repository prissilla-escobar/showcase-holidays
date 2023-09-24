describe('selected country page user flow', () => {

    beforeEach(() => {
        cy.intercept('GET', 'https://date.nager.at/api/v3/AvailableCountries', {
        statusCode: 200,
        fixture: "countries"
        }).as('countriesData').visit('http://localhost:3000')

        cy.intercept('GET', 'https://date.nager.at/api/v3/PublicHolidays/2023/ZW', {
        statusCode: 200,
        fixture: "ZW"
        }).as('Zimbabwe')
    })

    it('should show the header', () => {
        cy.wait(['@countriesData'])
        cy.get('.country-card').last().click()
        cy.wait(['@Zimbabwe'])

        cy.location('pathname').should('eq', '/2023/ZW')
        cy.get('header').should('exist')
        .contains('h1','Public Holidays')

        .get('.buttons').should('exist')
        .get('.buttons').children()
        .get(':nth-child(1)').contains('My Tracked Holidays')

        .get('.buttons').children()
        .get(':nth-child(2)').contains('Home')
    })

    it('should show no tracked holidays when there are no tracked holidays', () => {
        cy.visit('http://localhost:3000/trackedHolidays')
        .get('.no-tracked').contains('h2', 'You do not have any tracked holidays.')
    })

    it('should show tracked holidays', () => {
        cy.wait(['@countriesData'])
        cy.get('.country-card').last().click()
        cy.wait(['@Zimbabwe'])

        cy.get('.holiday-list').children().last().within(() => {
            cy.get('img.add').click()
        })
        cy.get('.holiday-list').children().first().within(() => {
            cy.get('img.add').click()
        })

        cy.get('.track-button').click()
        cy.get('.tracked-container').children().should('have.length', 2)
        .first().within(() => {
            cy.get('h2').should('contain', 'Zimbabwe')
            cy.get('h3').should('contain', "Holiday Name: St. Stephen's Day")
            cy.get('h4').should('contain', "Local Name: Boxing Day")
            cy.get('h4').should('contain', "Date: 12/26/2023")
        })

        cy.get('.tracked-container').children().last().within(() => {
            cy.get('h2').should('contain', 'Zimbabwe')
            cy.get('h3').should('contain', "Holiday Name: New Year's Day")
            cy.get('h4').should('contain', "Local Name: New Year's Day")
            cy.get('h4').should('contain', "Date: 01/01/2023")
        })
    })

    it('should remove card from tracked page with x button', () => {
        cy.wait(['@countriesData'])
        cy.get('.country-card').last().click()
        cy.wait(['@Zimbabwe'])

        cy.get('.holiday-list').children().last().within(() => {
            cy.get('img.add').click()
        })
        cy.get('.holiday-list').children().first().within(() => {
            cy.get('img.add').click()
        })
        cy.get('.track-button').click()

        cy.get('.tracked-container').children().last().within(() => {
            cy.get('img.close').click()
        })
    })

    it('should navigate home when home or logo are clicked', () => {
        cy.visit('http://localhost:3000/trackedHolidays')
        cy.get('.home-button').click().location('pathname').should('eq', '/')
        cy.get('.track-button').click().location('pathname').should('eq', '/trackedHolidays')
        cy.get('h1').click().location('pathname').should('eq', '/')
    })

})