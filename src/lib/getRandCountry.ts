import allCountries from '../data.json'

const MIN_COUNTRY_SIZE = 2

/** Return a random country with an area greater than the minimum. */
export function getRandCountry() {
  const filteredCountries = allCountries.filter((c) => {
    const { x, y } = c.bounds
    return (x.max - x.min) * (y.max - y.min) >= MIN_COUNTRY_SIZE
  })

  const randIdx = Math.floor(Math.random() * filteredCountries.length)
  return filteredCountries[randIdx]

  // const c = allCountries.find((c) => c.name === 'Cameroon')
  // if (!c) throw new Error()
  // return c
}
