import React from 'react';
import { boardRight, treeBerry, tree, button } from '../../assets/home';

const Sizechanger = ({ onSelectSize }) => {
  return (
    <div className='relative select-none'>
      <div className='absolute left-[35%] top-1/2 transform -translate-x-[20%] -translate-y-[70%] select-none'>
        <div className='relative select-none'>
          <button onClick={() => onSelectSize(6)} className='absolute top-10 left-7 pointer-events-auto hover:translate-y-[-3px] duration-100 active:opacity-70 active:hover:translate-y-[3px] hover:cursor-pointer'>
            <h1 className='absolute top-1/2 left-1/2 transform -translate-x-[50%] -translate-y-[80%] text-white text-xl'>6x6</h1>
            <img src={button} className='w-[10rem] pointer-events-auto' draggable={false} />
          </button>
          <img src={tree} className='pointer-events-auto' draggable={false} />
        </div>
        <div className='relative select-none'>
          <button onClick={() => onSelectSize(9)} className='absolute top-10 left-7 pointer-events-auto hover:translate-y-[-3px] duration-100 active:opacity-70 active:hover:translate-y-[3px] hover:cursor-pointer'>
            <h1 className='absolute top-1/2 left-1/2 transform -translate-x-[50%] -translate-y-[80%] text-white text-xl'>9x9</h1>
            <img src={button} className='w-[10rem] pointer-events-auto' draggable={false} />
          </button>
          <img src={tree} className='pointer-events-auto' draggable={false} />
        </div>
        <div className='relative select-none'>
          <button onClick={() => onSelectSize(12)} className='absolute top-10 left-7 pointer-events-auto hover:translate-y-[-3px] duration-100 active:opacity-70 active:hover:translate-y-[3px] hover:cursor-pointer'>
            <h1 className='absolute top-1/2 left-1/2 transform -translate-x-[50%] -translate-y-[80%] text-white text-xl select-none'>12x12</h1>
            <img src={button} className='w-[10rem] pointer-events-auto' draggable={false} />
          </button>
          <img src={treeBerry} className='pointer-events-auto' draggable={false} />
        </div>
      </div>
      <img src={boardRight} className='w-[20rem] pointer-events-auto' draggable={false} />
    </div>
  );
};

export default Sizechanger;
