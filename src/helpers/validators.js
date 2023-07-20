/**
 * @file Домашка по FP ч. 1
 */

import {
  allPass,
  anyPass,
  compose,
  converge,
  count,
  equals,
  filter,
  gte,
  length,
  lte,
  not,
  prop,
  props,
  values,
} from 'ramda'

import { SHAPES } from '../constants'
import { __ } from 'ramda'

const shapes = values(SHAPES)
const shapesLength = length(shapes)
const getColors = props(shapes)

const equalFullLength = equals(shapesLength)
const isLengthEqualFullLength = compose(equalFullLength, length)

const getTriangleColor = prop('triangle')
const getSquareColor = prop('square')
const getCircleColor = prop('circle')
const getStarColor = prop('star')

const isWhite = equals('white')
const isRed = equals('red')
const isBlue = equals('blue')
const isOrange = equals('orange')
const isGreen = equals('green')

const getRedShapes = compose(filter(isRed), getColors)
const getGreenShapes = compose(filter(isGreen), getColors)
const getOrangeShapes = compose(filter(isOrange), getColors)
const getBlueShapes = compose(filter(isBlue), getColors)

const numberOfRedShapes = compose(length, getRedShapes)
const numberOfGreenShapes = compose(length, getGreenShapes)
const numberOfOrangeShapes = compose(length, getOrangeShapes)
const numberOfBlueShapes = compose(length, getBlueShapes)

const isGreaterOrEqualThan_3 = gte(__, 3)
const isGreaterOrEqualThan_2 = gte(__, 2)

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([
  compose(isWhite, getTriangleColor),
  compose(isWhite, getCircleColor),
  compose(isRed, getStarColor),
  compose(isGreen, getSquareColor),
])

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(
  isGreaterOrEqualThan_2,
  length,
  filter(isGreen, getColors)
)

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = converge(equals, [
  count(isRed, getColors),
  count(isBlue, getColors),
])

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([
  compose(isBlue, getCircleColor),
  compose(isOrange, getSquareColor),
  compose(isRed, getStarColor),
])

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = anyPass([
  compose(isGreaterOrEqualThan_3, numberOfRedShapes),
  compose(isGreaterOrEqualThan_3, numberOfGreenShapes),
  compose(isGreaterOrEqualThan_3, numberOfOrangeShapes),
  compose(isGreaterOrEqualThan_3, numberOfBlueShapes),
])

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([
  compose(equals(2), numberOfGreenShapes),
  compose(equals(1), numberOfRedShapes),
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
export const validateFieldN10 = allPass([
  compose(not, isWhite, getTriangleColor),
  compose(not, isWhite, getSquareColor),
  converge(equals, [getTriangleColor, getSquareColor]),
])
