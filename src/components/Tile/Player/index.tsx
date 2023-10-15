import React , {useEffect, useState} from 'react';
import {useDraggable} from '@dnd-kit/core';

import { SpriteAnimator } from 'react-sprite-animator'


const Playertile =(props) =>{
  const imgData = [{id:'down',src:playerFront},{id:'up',src:playerBack},{id:'left',src:playerLeft},{id:'right',src:playerRight}]
  const spirteData = [{id:'down',src:playerDownMove},{id:'up',src:playerUpMove},{id:'left',src:playerLeftMove},{id:'right',src:playerRightMove}]
  const spriteIdle = [{id:'down',src:playerDownIdle},{id:'up',src:playerUpIdle},{id:'left',src:playerLeftIdle},{id:'right',src:playerRightIdle}]
  
  const {attributes, listeners, setNodeRef, transform , isDragging} = useDraggable({
    id: props.id,
    data:
    {
      direction: props.direction,
      boardId: props.boardId,
      type: props.type,
    }
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : {transform: `translate3d(${props.position.x}rem, ${props.position.y}rem, 0)`}; 

  useEffect(() => {
    props.setFocusTile(isDragging)
  }, [isDragging])
  //<img src={imgData.find((item)=>item.id === props.direction)?.src} alt={props.type} className='w-full h-full'/>

  const handleScale = (boardSize) => {
    let size;
    if (boardSize === 9) size = 1.5;
    else if (boardSize === 6) size = 1;
    else if (boardSize === 12) size = 2;
    return size;
  }

  const handlePosition = (boardSize) => {
    let left;
    if (boardSize === 9) left = -1.25;
    else if (boardSize === 6) left = -2;
    else if (boardSize === 12) left = -1;
    return left;
  }

  return (

    <button ref={setNodeRef} style={style} {...listeners} {...attributes} className={`w-[4.5rem] h-[4.5rem] z-[20] object-contain relative ${!isDragging ? 'transition-transform transform translate-y-[-10px]' : ''}`}>
    <div style={{ position: 'absolute', top: '-0.5rem', left: `${handlePosition(props.boardSize)}rem` }}>
      <SpriteAnimator
        sprite={!props.isMove ? spriteIdle.find((item)=>item.id === props.direction)?.src:spirteData.find((item)=>item.id === props.direction)?.src}
        width={172}
        height={124}
        frameCount={16}
        wrapAfter={1}
        fps={4}
        scale={handleScale(props.boardSize)}
        direction={'horizontal'}
      />
    </div>
    
    </button>
  );
}

export default Playertile