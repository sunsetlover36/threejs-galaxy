export const getRandomPos = ({ randomness, randomnessPower, radius }) =>
  Math.pow(Math.random(), randomnessPower) *
  (Math.random() < 0.5 ? 1 : -1) *
  randomness *
  radius;
