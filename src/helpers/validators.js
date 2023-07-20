/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import {
  allPass,
  anyPass,
  compose,
  count,
  equals,
  filter,
  gte,
  keys,
  length,
  lte,
  not,
  or,
  prop,
  propEq,
  props,
  values,
} from 'ramda'

export const SHAPES = {
  TRIANGLE: 'triangle',
  SQUARE: 'square',
  CIRCLE: 'circle',
  STAR: 'star',
}

export const COLORS = {
  RED: 'red',
  BLUE: 'blue',
  ORANGE: 'orange',
  GREEN: 'green',
  WHITE: 'white',
}

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
export const validateFieldN1 = (figures) => {
  console.log(compose(isWhite, getTriangleColor)(figures))

  return allPass([
    compose(isWhite, getTriangleColor),
    compose(isWhite, getCircleColor),
    compose(isRed, getStarColor),
    compose(isGreen, getSquareColor),
  ])(figures)
}

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
export const validateFieldN4 = (figures) => {
  return allPass([
    compose(isBlue, getCircleColor),
    compose(isOrange, getSquareColor),
    compose(isRed, getStarColor),
  ])(figures)
}

const equalFullLength = equals(shapesLength)
const isLengthEqualFullLength = compose(equalFullLength, length)

const getRedShapes = compose(filter(isRed), getColors)
const getGreenShapes = compose(filter(isGreen), getColors)
const getOrangeShapes = compose(filter(isOrange), getColors)
const getWhiteShapes = compose(filter(isWhite), getColors)
const getBlueShapes = compose(filter(isBlue), getColors)
// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = (figures) => {
  // console.log(
  //   // anyPass([
  //   //   compose(equalLength, filter(isRed), getColors),
  //   //   compose(equalLength, filter(isGreen), getColors),
  //   //   compose(equalLength, filter(isOrange), getColors),
  //   //   compose(equalLength, filter(isWhite), getColors),
  //   compose(or(equalFullLength, equals(3)), length, getOrangeShapes)(figures),
  //   compose(length, getOrangeShapes)(figures)
  //   // ])(figures)
  // )

  return anyPass([
    compose(equals(3), length, getRedShapes),
    compose(equals(3), length, getGreenShapes),
    compose(equals(3), length, getOrangeShapes),
    compose(equals(3), length, getBlueShapes),
    compose(isLengthEqualFullLength, getRedShapes),
    compose(isLengthEqualFullLength, getGreenShapes),
    compose(isLengthEqualFullLength, getOrangeShapes),
    compose(isLengthEqualFullLength, getWhiteShapes),
    compose(isLengthEqualFullLength, getBlueShapes),
  ])(figures)
}

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = (figures) => {
  return allPass([
    compose(equals(2), length, getGreenShapes),
    compose(equals(1), length, getRedShapes),
    compose(isGreen, getTriangleColor),
  ])(figures)
}

// 7. Все фигуры оранжевые.
export const validateFieldN7 = (figures) => {
  return compose(isLengthEqualFullLength, getOrangeShapes)(figures)
}

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = (figures) => {
  return allPass([
    compose(not, isRed, getStarColor),
    compose(not, isWhite, getStarColor),
  ])(figures)
}

// 9. Все фигуры зеленые.
export const validateFieldN9 = (figures) => {
  return compose(isLengthEqualFullLength, getGreenShapes)(figures)
}

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = (figures) => {
  return allPass([
    compose(not, isWhite, getTriangleColor),
    compose(not, isWhite, getSquareColor),
    compose(equals(getTriangleColor(figures)), getSquareColor),
  ])(figures)
}
