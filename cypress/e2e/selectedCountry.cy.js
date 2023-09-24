describe('selected country page user flow', () => {

    beforeEach(() => {
        cy.intercept('GET', 'https://date.nager.at/api/v3/AvailableCountries', {
        statusCode: 200,
        fixture: "countries"
        }).as('countriesData').visit('http://localhost:3000')
    
        cy.intercept('GET', 'https://date.nager.at/api/v3/PublicHolidays/2023/AD', {
        statusCode: 200,
        fixture: "AD"
        }).as('Andorra')

    })

    it('should get Andorra and show the header', () => {
        cy.wait(['@countriesData'])
        cy.get('.country-card').first().click()
        cy.wait(['@Andorra'])

        cy.location('pathname').should('eq', '/2023/AD')
        cy.get('header').should('exist')
        .contains('h1','Public Holidays')

        .get('.buttons').should('exist')
        .get('.buttons').children()
        .get(':nth-child(1)').contains('My Tracked Holidays')

        .get('.buttons').children()
        .get(':nth-child(2)').contains('Home')

        .get('.name-flag').contains('h2', 'Andorra')
        .get('img.country-flag').should('have.attr', 'src', 'https://www.countryflagicons.com/FLAT/64/AD.png')
        .get('img.country-flag').should('have.attr', 'alt', 'image of Andorra\'s flag')

        .get('.holiday-list').children().should('have.length', 14)
        .first().within(() => {
            cy.get('h3').should('contain', 'Country: Andorra')
            cy.get('h3').should('contain', "Holiday Name: New Year's Day")
            cy.get('h4').should('contain', "Local Name: Any nou")
            cy.get('h4').should('contain', "Date: 01/01/2023")
        })

        .get('.holiday-list').children().should('have.length', 14)
        .last().within(() => {
            cy.get('h3').should('contain', 'Country: Andorra')
            cy.get('h3').should('contain', "Holiday Name: St. Stephen's Day")
            cy.get('h4').should('contain', "Local Name: Sant Esteve")
            cy.get('h4').should('contain', "Date: 12/26/2023")
        })

    })

    it('should add tracked with button and show tracked/remove images and also click it to show the add image again', () => {
        cy.wait(['@countriesData'])
        cy.get('.country-card').first().click()
        cy.wait(['@Andorra'])

        cy.get('.holiday-list').children().last().within(() => {
            cy.get('img.add').click()
            .get('span').should('contain', 'Tracked')
            .get('span').should('contain', 'Remove')
            .get('span').click()
            .get('img.add').should('have.attr', 'src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYEAQAAAAa7ikwAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAACYktHRAAAqo0jMgAAAAlwSFlzAAAAYAAAAGAA8GtCzwAAAAd0SU1FB+cJFhMyNRpUZtMAAAN7SURBVEjHnZZLSJRRFMfP/WYqa7QRwkFdZIvIRfSwUhBqIEgj6CHULmppm+ixiApCJMiyB1mLoCKCcFOuehFCVkRF7SqKUjAKJm0mTLGHM1rn1+I0flM6NdPZfPeee+7/f8655577ieQosHMnxGLw4QM0NYFzsHEj3LkDnz/D16/w8CG6ZQs4lyuugevq1QBw4wZ0dACgXV2m6+6GkyfR48fh+XPTXb4MgUAeBCdOwPBwehMMDBjQqVPo1Kl+lIEANDebAwcO5E7AmTMQj9vY8+D7d4jHwfPGHdALF3z7a9dgaAidNs3LK1ciIhKNigQCIrduCZ6Hbt8ubu1acXV1dk7Tpwvnz4uEw+KqqoJ541NSIk5EJB4XF4mIHDokMnOmLba0iHR2ivv0yWyLinKMoLDQHz9+bN8VK5zr63MuHBa5eVPk0SPnQiHnXr8Wqakxm56ef+S+oMDybxXk6/v6QBVdtcrOoKYGjUZtrbzciuD+/X+AV1bC06cGdPQoOmXK+JpGo6AKP37A2bNQVgahELppE8Ri6Jcv6MKF2cF161a7PIkErFkzuQPr18O3b0yQ7m40naIJm0IhuHjR6vjuXSgv/2uUGgyiO3bAy5cG/uABWlKSxXjBAvTVK6vx5ubMm4gWFmaSoZEIFBf7jjkHu3dDKgVv30Jt7R/g27ZZuO/fw8qV/sbSUrSlBQYH0d5eX//kiaWwrQ2tqPBxqqvR3l4YHYW9e8E5gaoqC6+zE41EzHDePPTcOUgmLaJEIn2TjeDFC6uUVArGxqC9HV20yPaGw36/qqsTdPny9ASWLIFLlww0mbRxZWVmq/AJOjqgtNTSOTjon8G6dbB4sc0bGnwC3ryx78AAHDyYjsYAJyfw58XFsH8/9Pf/jtXQ4IkbGTEzzxPZtUtk9mznmpqcl0hIjuLc0JBzhw8Lc+YIjY0iY2PG/Asbli5Fg1n7EnrlyoQItKsr28MCnocuW5buttnrnBkz7BwA2tt9fVub6a5ezSzXvASdOxeePbOWcOTIn95AY+N43Wt1df4ExGLox49off04oR47BqdPw/z5ZlNba+/08HDmy5YjQTIJra1ofT1cv26NLZWCkRFrgLdvw4YN6J49VuZFRf9BkEpZrvv7rd7LymDWLNi3D969s7VfNvkT9PRYS9i8ebLw0WDQflvu3YN4PLOdZ8pPur1uCxwhIL0AAAAASUVORK5CYII=')
        })
    })

    it('should go back home with back button', () => {
        cy.visit('http://localhost:3000/2023/AD/')
        cy.get('img.back-button').click().location('pathname').should('eq', '/')
    })

    it('should navigate to correct pages when home and tracked buttons in header are clicked', () => {
        cy.get('.home-button').click().location('pathname').should('eq', '/')
        cy.get('.track-button').click().location('pathname').should('eq', '/trackedHolidays')
      })

    it('should display an error message for 500 error', () => {
        cy.intercept('GET', 'https://date.nager.at/api/v3/PublicHolidays/2023/AD', {
          statusCode: 500,
        })
        .visit('http://localhost:3000/2023/AD/nonsense')
        cy.get('img.error-photo').should('have.attr', 'src', 'https://images.wagwalkingweb.com/media/daily_wag/blog_articles/hero/1667345491.5716999/how-to-travel-with-a-dog-on-a-plane.png')
        cy.contains('h2', 'OH NO!')
        cy.get('.home-link').click()
          .url().should('eq', 'http://localhost:3000/')
    })
    
    it('should display an error message for 400 error', () => {
        cy.intercept('GET', 'https://date.nager.at/api/v3/PublicHolidays/2023/AD', {
          statusCode: 400,
        })
        .visit('http://localhost:3000/2023/AD/nonsense')
        cy.contains('h2', 'OH NO!')
        cy.get('img.error-photo').should('have.attr', 'src', 'https://images.wagwalkingweb.com/media/daily_wag/blog_articles/hero/1667345491.5716999/how-to-travel-with-a-dog-on-a-plane.png')
        cy.get('.home-link').click()
          .url().should('eq', 'http://localhost:3000/')
    })

})