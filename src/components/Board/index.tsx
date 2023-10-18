import React from 'react';
import Droppable from '../Block/index';
import {new_board,tileHolder} from '../../assets/home';
import Tile from '../Tile/Path/index';
import Playertile from '../Tile/Player';
import Finishline from '../Tile/Finishline';
import {playerDownMove,playerLeftMove,playerUpMove,playerRightMove , playerDownIdle,playerLeftIdle,playerRightIdle,playerUpIdle} from '../../assets/test'

export const Board =({dataObject,boardSize,boardData,setFocusTile,player, finishline, defaultTile ,position,isMove}) =>{

  const playerImage = {down:playerDownMove,up:playerUpMove,left:playerLeftMove,right:playerRightMove}
  const playerIdle = {down:playerDownIdle,up:playerUpIdle,left:playerLeftIdle,right:playerRightIdle}
  return (
    <div className=' relative'>
      
      <div className='absolute  w-full h-full '>
          <div className='flex justify-between h-full flex-col '>
            <div className='flex justify-center items-center'> 
            <div className='flex items-center justify-center flex-wrap gap-10'>
              <div className={`grid ${(boardSize === 9) && 'grid-cols-9'} ${(boardSize === 6) && 'grid-cols-6'} ${(boardSize === 12) && 'grid-cols-12'} mt-[50px]`}>
                  {boardData.map((boardItem ,index) => (
                    <Droppable id={boardItem.id} index={index} tileId={boardItem.tileId} tileType={boardItem.tileType} boardSize={boardSize}>
                      <div className='relative'>
                      {dataObject.map((item) => (
                        item.map((iitem)=> ((iitem.boardId === boardItem.id)? 
                        <Tile id={iitem.id} key={iitem.id} direction={iitem.direction} path={iitem.path} type={iitem.tileType}  boardId={iitem.boardId} setFocusTile={setFocusTile}/> : null
                      ))))}
                      {defaultTile.map((item) => ((item.boardId === boardItem.id)? <Tile id={item.id} key={item.id} boardSize={boardSize} content={item.content} type={item.tileType}  boardId={item.boardId} setFocusTile={setFocusTile}/> : null))}
                      <div className='absolute top-0'>
                        <div className='absolute'>
                        {player.map((item) => ((item.boardId === boardItem.id)? <Playertile id={item.id} key={item.id} boardSize={boardSize} direction={item.direction} type={"player"}  boardId={item.boardId} setFocusTile={setFocusTile} position={position} isMove={isMove}/> : null))}
                        </div>
                        {finishline.map((item) => ((item.boardId === boardItem.id)? <Finishline id={item.id} key={item.id} direction={item.direction} path={item.path} type={"finishline"}  boardId={item.boardId} setFocusTile={setFocusTile}/> : null))}
                      </div>
                      </div>
                    </Droppable>
                  ))}
                </div>
            </div>
            </div>
            <div className='flex justify-between mx-32 mb-10'> 
              <div className='relative'>
                <div className='absolute left-[0.7rem]'>
                  {player.map((item) => ((item.boardId === 'null')?<Playertile id={item.id} boardSize={9} key={item.id} direction={item.direction} type={"player"} boardId={item.boardId} setFocusTile={setFocusTile} position={position} isMove={isMove} />: null ))}
                </div>
                <img src={tileHolder} className='w-[6rem] draggable={false} '/>
              </div>
              <div className='relative'>
                <div className='absolute'>
                  {finishline[0].boardId == 'null' ? <Finishline id={'f1'} key={'f1'} direction={'up'} path={['up','right','down','left']} type={"finishline"}  boardId={finishline[0].boardId} setFocusTile={setFocusTile}/> : null}
                </div>
                <img src={tileHolder} className='w-[6rem] draggable={false} '/>
              </div>
            </div>
          </div>
      </div>
      <img src={new_board} className='w-[65rem] pointer-events-auto' draggable={false}/>
      </div>
);
};
export default Board