import React from 'react';
import {useDroppable} from '@dnd-kit/core';

const Droppable = (props) => {
  const {isOver, setNodeRef, active} = useDroppable({
    id: props.id,
    data:
    {
      tileId: props.tileId,
      tileType: props.tileType,
    }
  });
  let type = '';

  if (active && active.data && active.data.current) {
    type = active.data.current.type;
  }

  const handleSize = (boardSize) => {
    let size; 
    if (boardSize === 9) size = 4.5;
    else if (boardSize === 6) size = 6.75;
    else if (boardSize === 12) size = 3.375;
    return size;
  }

  const style = {
    backgroundColor: !isOver
      ? (('acegik'.includes(props.id[0]) && ['1', '3', '5', '7', '9', 'b'].includes(props.id.slice(1))) ||
          ('bdfhjl'.includes(props.id[0]) && ['2', '4', '6', '8', 'a', 'c'].includes(props.id.slice(1)))
        ? 'rgba(0, 0, 0, 0.2)'
        : 'rgba(0, 0, 0, 0.25)'
      )
      : props.tileId === 'null'
      ? 'rgba(0, 255, 0, 0.1)'
      : 'rgba(255, 0, 0, 0.5)',
    width: `${handleSize(props.boardSize)}rem`,
    height: `${handleSize(props.boardSize)}rem`,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children} 
    </div>
  );
}
export default Droppable
