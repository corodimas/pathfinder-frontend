import { Board } from './types';

const defaultBoard6x6: Board[] = [];

const alphabet = 'abcdef';
const num = '123456';

for (const a of alphabet) {
  for (const n of num) {
    const id = `${a}${n}`;
    const tileId = 'null';
    const tileType = 'null';

    defaultBoard6x6.push({ id, tileId, tileType });
  }
}

export default defaultBoard6x6;
