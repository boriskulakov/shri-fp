/**
 * @file Домашка по FP ч. 1
 */

import {
  allPass,
  anyPass,
  compose,
  converge,
  equals,
  filter,
  gte,
  length,
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
const isAll = compose(equalFullLength, length)

const getTriangleColor = prop('triangle')
const getSquareColor = prop('square')
const getCircleColor = prop('circle')
const getStarColor = prop('star')

const isWhite = equals('white')
const isRed = equals('red')
const isBlue = equals('blue')
const isOrange = equals('orange')
const isGreen = equals('green')

const isNotWhite = compose(not, isWhite)
const isNotRed = compose(not, isRed)

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

/** 
 * Здесь и далее я использую связку
 * *проверитьЦвет + получитьЦветФигуры*
 * я решил, что создавать 24 функции ради цветов, это слишком
 * особенно, если рассмтаривать это как общий подход
 * то в других задачах может быть еще больше комбинаций
 * тогда только количество функций для описания комбинаций
 * будет больше чем весь этот файл
 * не уверен, что это позволяет упростить код, разве что избавляет
 * от функции compose
 * 
 * мне кажется используемая связка достаточно понятна и лаконична
 * 
 * если бы стал менять на отдельные функции сделал бы так:
 * const isCircleRed = compose(isRed, getCircleColor)
**/

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([
  compose(isRed, getStarColor),
  compose(isGreen, getSquareColor),
  compose(isWhite, getCircleColor),
  compose(isWhite, getTriangleColor),
])

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(
  isGreaterOrEqualThan_2,
  numberOfGreenShapes
)

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = converge(equals, [
  numberOfRedShapes,
  numberOfBlueShapes,
])

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([
  compose(isBlue, getCircleColor),
  compose(isRed, getStarColor),
  compose(isOrange, getSquareColor),
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
  compose(isGreen, getTriangleColor),
  compose(equals(1), numberOfRedShapes),
  compose(equals(2), numberOfGreenShapes),
])

// 7. Все фигуры оранжевые.
export const validateFieldN7 = compose(isAll, getOrangeShapes)

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = allPass([
  compose(isNotRed, getStarColor),
  compose(isNotWhite, getStarColor),
])

// 9. Все фигуры зеленые.
export const validateFieldN9 = compose(isAll, getGreenShapes)

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = allPass([
  compose(isNotWhite, getTriangleColor),
  compose(isNotWhite, getSquareColor),
  converge(equals, [getTriangleColor, getSquareColor]),
])
