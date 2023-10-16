import { Board } from './types';

const defaultBoard9x9: Board[] = [];

const alphabet = 'abcdefghi';
const num = '123456789';

for (const a of alphabet) {
  for (const n of num) {
    const id = `${a}${n}`;
    const tileId = 'null';
    const tileType = 'null';

    defaultBoard9x9.push({ id, tileId, tileType });
  }
}

export default defaultBoard9x9;
