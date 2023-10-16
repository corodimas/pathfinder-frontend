import React from 'react'
import { boardLeft } from '../../assets/home'
import { tileHolder } from '../../assets/home';
import Tile from '../Tile/Path/index';


const Tileholder = ({dataObject ,setFocusTile}) => {

    

  return (
    <div className=' relative z-10 '>
            <div className='absolute  w-full h-full flex flex-col '>
                <div  className='flex flex-col  items-center gap-1 mt-20 '>
                    <div className='relative'>
                        <div className=' absolute w-full h-full flex justify-center pt-2'>
                            {dataObject.straight.map((item) => ((item.boardId === 'null')?
                                <Tile id={item.id} key={item.id} direction={item.direction} boardSize={9} type={"straight"} path={item.path}  boardId={item.boardId} setFocusTile={setFocusTile}/> : null
                            ))}
                        
                        </div>
                        <img src={tileHolder} className='w-[6rem] h-[6rem]' draggable={false}/>
                    </div>
                    <div className='relative'>
                        <div className=' absolute w-full h-full flex justify-center pt-2'>
                            {dataObject.corner.map((item) => ((item.boardId === 'null')?
                                <Tile id={item.id} key={item.id} direction={item.direction} boardSize={9} type={"corner"} path={item.path} boardId={item.boardId} setFocusTile={setFocusTile}/>: null
                            ))}
                        </div>
                        <img src={tileHolder} className='w-[6rem] h-[6rem]' draggable={false}/>
                    </div>

                    <div className='relative'>
                        <div className=' absolute w-full h-full flex justify-center pt-2'>
                            {dataObject.oneway.map((item) => ((item.boardId === 'null')?
                                <Tile id={item.id} key={item.id} direction={item.direction} boardSize={9} type={"oneway"} path={item.path} boardId={item.boardId} setFocusTile={setFocusTile}/>:null
                            ))}
                        </div>
                        <img src={tileHolder} className='w-[6rem] h-[6rem]' draggable={false}/>
                    </div>

                    <div className='relative  '>
                        <div className=' absolute w-full h-full flex justify-center pt-2'>
                            {dataObject.tway.map((item) => ((item.boardId === 'null')?
                                <Tile id={item.id} key={item.id} direction={item.direction} boardSize={9} type={"tway"} path={item.path} boardId={item.boardId} setFocusTile={setFocusTile}/>:null
                            ))}
                        </div>
                        <img src={tileHolder} className='w-[6rem] h-[6rem]' draggable={false}/>
                    </div>

                    <div className='relative'>
                        <div className=' absolute w-full h-full flex justify-center pt-2'>
                            {dataObject.deadend.map((item) => ((item.boardId === 'null')?
                                <Tile id={item.id} key={item.id} direction={item.direction} boardSize={9} type={"deadend"} path={item.path} boardId={item.boardId} setFocusTile={setFocusTile}/>:null
                            ))}
                        </div>
                        <img src={tileHolder} className='w-[6rem] h-[6rem]' draggable={false}/>
                    </div>
                </div>
            </div>
            <img src={boardLeft} className='w-[20rem] pointer-events-auto ' draggable={false}/>
    </div>
  )
}

export default Tileholder