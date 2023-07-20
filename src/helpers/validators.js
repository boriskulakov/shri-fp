/**
 * @file Домашка по FP ч. 1
 */

import {
  allPass,
  anyPass,
  compose,
  count,
  equals,
  filter,
  length,
  lte,
  not,
  prop,
  props,
  values,
} from 'ramda'

import {SHAPES, COLORS} from '../constants'

const shapes = values(SHAPES)
const shapesLength = length(shapes)
const getColors = props(shapes)

const getTriangleColor = prop('triangle')
const getSquareColor = prop('square')
const getCircleColor = prop('circle')
const getStarColor = prop('star')

const isWhite = equals('white')
const isRed = equals('red')
const isBlue = equals('blue')
const isOrange = equals('orange')
const isGreen = equals('green')

const isTrue = equals(true)

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([
  compose(isWhite, getTriangleColor),
  compose(isWhite, getCircleColor),
  compose(isRed, getStarColor),
  compose(isGreen, getSquareColor),
])

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (figures) => {
  return lte(2)(
    count(isTrue, [
      compose(isGreen, getTriangleColor)(figures),
      compose(isGreen, getCircleColor)(figures),
      compose(isGreen, getStarColor)(figures),
      compose(isGreen, getSquareColor)(figures),
    ])
  )
}

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (figures) => {
  return equals(
    count(isRed, getColors(figures)),
    count(isBlue, getColors(figures))
  )
}

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([
  compose(isBlue, getCircleColor),
  compose(isOrange, getSquareColor),
  compose(isRed, getStarColor),
])

const equalFullLength = equals(shapesLength)
const isLengthEqualFullLength = compose(equalFullLength, length)

const getRedShapes = compose(filter(isRed), getColors)
const getGreenShapes = compose(filter(isGreen), getColors)
const getOrangeShapes = compose(filter(isOrange), getColors)
const getWhiteShapes = compose(filter(isWhite), getColors)
const getBlueShapes = compose(filter(isBlue), getColors)
// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = anyPass([
  compose(equals(3), length, getRedShapes),
  compose(equals(3), length, getGreenShapes),
  compose(equals(3), length, getOrangeShapes),
  compose(equals(3), length, getBlueShapes),
  compose(isLengthEqualFullLength, getRedShapes),
  compose(isLengthEqualFullLength, getGreenShapes),
  compose(isLengthEqualFullLength, getOrangeShapes),
  compose(isLengthEqualFullLength, getWhiteShapes),
  compose(isLengthEqualFullLength, getBlueShapes),
])

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([
  compose(equals(2), length, getGreenShapes),
  compose(equals(1), length, getRedShapes),
  compose(isGreen, getTriangleColor),
])

// 7. Все фигуры оранжевые.
export const validateFieldN7 = compose(isLengthEqualFullLength, getOrangeShapes)

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = allPass([
  compose(not, isRed, getStarColor),
  compose(not, isWhite, getStarColor),
])

// 9. Все фигуры зеленые.
export const validateFieldN9 = compose(isLengthEqualFullLength, getGreenShapes)

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = (figures) => {
  return allPass([
    compose(not, isWhite, getTriangleColor),
    compose(not, isWhite, getSquareColor),
    compose(equals(getTriangleColor(figures)), getSquareColor),
  ])(figures)
}
