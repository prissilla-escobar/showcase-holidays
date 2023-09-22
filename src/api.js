export async function getCountries() {
    let Url = 'https://date.nager.at/api/v3/AvailableCountries'
    try {
        const response = await fetch(Url)
        return (response.json())
    }
    catch(error) {
        return error
    }
}


// export function getCountries() {
//     return fetch(`https://date.nager.at/api/v3/AvailableCountries`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Country not found.')
//       }
//       return response.json()
//     })
//   }

  export function getCountryHolidays(countryCode) {
    return fetch(`https://date.nager.at/api/v3/PublicHolidays/2023/${countryCode}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Country not found.')
      }
      return response.json()
    })
  } 

//   export async function getCountryHolidays(countryCode) {
//     let Url = `https://date.nager.at/api/v3/PublicHolidays/2023/${countryCode}`
//     try {
//         const response = await fetch(Url)
//         return (response.json())
//     }
//     catch(error) {
//         return error
//     }
// }
