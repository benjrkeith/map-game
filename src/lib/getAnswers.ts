import allCountries from '../data.json'
import * as types from '../types'
import { isCountryVisible } from './isCountryVisible'

/**
Returns all valid answers for a given start country and viewBox.
Will optimistically return abnormally large countries so they can be checked
asyncronously later. 
*/
export function getAnswers(country: types.Country, viewBox: types.ViewBox) {
  return allCountries.filter(
    (c) => c.name !== country.name && isCountryVisible(c, viewBox),
  )
}
