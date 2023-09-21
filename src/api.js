export function getCountries() {
    return fetch(`https://date.nager.at/api/v3/AvailableCountries`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Trailer not found.')
      }
      return response.json()
    })    
    .then(data => console.log(data))
  }

  export function getCountryHolidays() {
    return fetch(`https://date.nager.at/api/v3/PublicHolidays/2023/US`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Country not found.')
      }
      return response.json()
    })    
    .then(data => console.log(data))
  } 


//   export function getCountryFlag() {
//     return fetch(`https://flagsapi.com/BE/flat/64.png`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Trailer not found.')
//       }
//       return response.json()
//     })    
//     .then(data => console.log(data))
//   } 