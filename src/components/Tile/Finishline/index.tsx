import React , {useEffect} from 'react';
import {useDraggable} from '@dnd-kit/core';

import { finishline  } from '../../../assets/playground';

const Playertile =(props) =>{
  const imgData = [{id:'up',src:finishline},{id:'down',src:finishline},{id:'left',src:finishline},{id:'right',src:finishline}]
  const {attributes, listeners, setNodeRef, transform , isDragging} = useDraggable({
    id: props.id,
    data:
    {
      direction: props.durection,
      path: props.path,
      boardId: props.boardId,
      type: props.type,
    }
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined; 

  const handleSize = (boardSize) => {
    let size; 
    if (boardSize === 9) size = 4.5;
    else if (boardSize === 6) size = 6.75;
    else if (boardSize === 12) size = 3.375;
    return size;
  }

  useEffect(() => {
    props.setFocusTile(isDragging)
  }, [isDragging])
  
  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes} className={`w-[${handleSize(props.boardSize)}rem] h-[${handleSize(props.boardSize)}rem] z-[50]`}>
      <img src={imgData.find((item)=>item.id === props.direction)?.src} alt={props.type} className='w-full h-full'/>
    </button>
  );
}

export default Playertile