/* eslint-disable max-len */
'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  let arrMen = people.filter(man => man.sex === 'm');

  if (century > 0) {
    arrMen = arrMen.filter(man => Math.ceil(man.died / 100) === century);
  }

  const menAges = arrMen.map(man => man.died - man.born);

  const sumAges = menAges.reduce((sum, x) => sum + x, 0);

  const averAge = sumAges / menAges.length;

  return (averAge);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let arrWomen = people.filter(woman => woman.sex === 'f');

  if (withChildren) {
    arrWomen = arrWomen.filter(woman => people.some(person => person.mother === woman.name) === true);
  }

  const womenAges = arrWomen.map(woman => woman.died - woman.born);

  const sumAges = womenAges.reduce((sum, x) => sum + x, 0);

  const averAge = sumAges / womenAges.length;

  return (averAge);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  let arrWomen = people.filter(woman => woman.sex === 'f');
  const arrMen = people.filter(man => man.sex === 'm');

  arrWomen = arrWomen.filter(woman => people.some(person => person.mother === woman.name) === true);

  const womenAges = [];

  if (onlyWithSon) {
    for (const mother of arrWomen) {
      for (const person of arrMen) {
        if (mother.name === person.mother) {
          womenAges.push(person.born - mother.born);
        }
      }
    }

    return (womenAges.reduce((sum, x) => sum + x, 0) / womenAges.length);
  }

  for (const mother of arrWomen) {
    for (const person of people) {
      if (mother.name === person.mother) {
        womenAges.push(person.born - mother.born);
      }
    }
  }

  return (womenAges.reduce((sum, x) => sum + x, 0) / womenAges.length);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
