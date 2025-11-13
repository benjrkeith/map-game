import allCountries from '../data.json'
import * as types from '../types'
import { isCountryVisible } from './isCountryVisible'

// SampleCount > 800, too expensive to do in sync
export const SPECIAL_CASES = ['CA', 'CN', 'GL', 'ID', 'RU', 'US']

/**
 * Returns a list of answers that were optimistically given but are actually
 * incorrect and need removing from the list. Expensive check due to the size
 * of each country so needs to be done async.
 */
export async function getIncorrectAnswers(viewBox: types.ViewBox) {
  return allCountries
    .filter((c) => SPECIAL_CASES.includes(c.id))
    .filter((c) => !isCountryVisible(c, viewBox, true))
    .map((c) => c.name)
}
