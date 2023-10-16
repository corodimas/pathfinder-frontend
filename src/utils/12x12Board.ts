import { Board } from './types';

const defaultBoard12x12: Board[] = [];

const alphabet = 'abcdefghijkl';
const num = '123456789abc';

for (const a of alphabet) {
  for (const n of num) {
    const id = `${a}${n}`;
    const tileId = 'null';
    const tileType = 'null';

    defaultBoard12x12.push({ id, tileId, tileType });
  }
}

export default defaultBoard12x12;
