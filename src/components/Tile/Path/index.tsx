import React , {useEffect} from 'react';
import {useDraggable} from '@dnd-kit/core';

import { deadEnd,straight,leftCorner,oneWay,rightCorner,tWay ,playerFront ,defaultTile } from '../../../assets/playground';

const Tile =(props) =>{
  const imgData = [{id:'deadend',src:deadEnd},{id:'straight',src:straight},{id:'corner',src:leftCorner},{id:'oneway',src:oneWay},{id:'tway',src:tWay},{id:'player',src:playerFront},{id:'defaulttile',src:defaultTile}]
  const {attributes, listeners, setNodeRef, transform , isDragging} = useDraggable({
    id: props.id,
    data:
    {
      direction: props.direction,
      path:props.path,
      boardId: props.boardId,
      type: props.type,
    }
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined; 

  const handleSize = (boardSize) => {
    let size; 
    if (boardSize === 9) size = 3.75;
    else if (boardSize === 6) size = 5.625;
    else if (boardSize === 12) size = 2.8125;
    else if (boardSize === 0) size = 4.5;
    return size;
  }

  useEffect(() => {
    props.setFocusTile(isDragging)
  }, [isDragging])

  const direction = [{ id: 'up', rotate: 'rotate-0',},{ id: 'right', rotate: 'rotate-90',},{ id: 'down', rotate: 'rotate-180',},{ id: 'left', rotate: 'rotate-[-90deg]',},]

  const element = direction.find((item)=>item.id === props.direction)?.rotate

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes} className={`w-[${handleSize(props.boardSize)}rem] h-[${handleSize(props.boardSize)}rem] z-[50]`}>
      <img src={imgData.find((item)=>item.id === props.type)?.src} alt={props.type} className={`w-full h-full ${element}`}/>
    </button>
    
  );
}

export default Tile