import * as types from '../types'
import { getAnswers } from './getAnswers'
import { SPECIAL_CASES } from './getIncorrectAnswers'
import { getRandCountry } from './getRandCountry'
import { getViewBox } from './getViewBox'

export function init() {
  const ZOOM_STEP = 20
  const MIN_ANSWERS = 4 + SPECIAL_CASES.length
  const MAX_ANSWERS = 10 + SPECIAL_CASES.length

  let zoom = 0
  let iterations = 0
  let viewBox: types.ViewBox, answers: types.Country[]
  const startCountry = getRandCountry()

  do {
    viewBox = getViewBox(startCountry, zoom)
    answers = getAnswers(startCountry, viewBox)
    zoom += answers.length < MIN_ANSWERS ? ZOOM_STEP : -ZOOM_STEP
  } while (
    (answers.length < MIN_ANSWERS || answers.length > MAX_ANSWERS) &&
    iterations++ < 10
  )

  return { startCountry, viewBox, answers }
}
