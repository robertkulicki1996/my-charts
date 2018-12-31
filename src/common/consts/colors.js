import { random } from 'lodash';

export const colors = [
  '#3308EB',
  '#EB1E64',
  '#EB0808',
  '#EB7E08',
  '#EBDB08',
  '#73EB08',
  '#08EB13',
  '#0AEBC5',
  '#0ABDEB',
  '#7D0AEB',
  '#C80AEB',
  '#EB0AB2',
  '#EB0A5E'
];

export function getRandomColor() {
  return colors[random(0, colors.length)];
}