import React, { useState , useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import {background,restartButton,tutorialButton,startButton} from '../../assets/home'

import {DndContext} from '@dnd-kit/core';

import Board  from '../../components/Board/index'
import Tileholder from '../../components/Tileholder';
import Sizechanger from '../../components/Sizechanger';

import {StraightTile,Corner,Deadend,Tway,Oneway ,Player,Finishline , Defaulttile} from '../../utils/types'
import defaultBoard9x9 from '../../utils/defaultBoard';
import defaultBoard6x6 from '../../utils/6x6Board';
import { defaultBoard12x12 } from '../../utils/12x12Board';

const defaultStraight: StraightTile[] = [
  {
      id: 's1',
      boardId: 'null',
      direction: "up",
      path: ["up","down"],
      tileType: 'straight'
  }, 
]

const defaultCorner: Corner[] = [
  {
      id: 'l1',
      boardId: 'null',
      direction: "up",
      path: ["up","left"],
      tileType: 'corner',
  }, 
]



const defaultDeadend: Deadend[] = [
  {
      id: 'd1',
      boardId: 'null',
      direction: "up",
      path: ["none"],
      tileType: 'deadend',
  }, 
]

const defaultTway: Tway[] = [
  {
      id: 't1',
      boardId: 'null',
      direction: "up",
      path: ["up","left","down"],
      tileType: 'tway',
  }, 
]

const defaultOneway: Oneway[] = [
  {
      id: 'o1',
      boardId: 'null',
      direction: "up",
      path: ["up"],
      tileType: 'oneway',
  }, 

]

const defaultTile : Defaulttile[] = [
  {
    id: 'df1',
    boardId: 'null',
    content: "up",
    tileType: 'defaulttile',
  },
  {
    id: 'df2',
    boardId: 'null',
    content: "up",
    tileType: 'defaulttile',
  }
]


const defaultPlayer: Player[] = [
  {
    id: 'p1',
    boardId: 'null',
    direction: "up",
    tileType: 'player',
  }
]


const defaultFinishline: Finishline[] = [
  {
    id: 'f1',
    boardId: 'null',
    content: "up",
    tileType: 'finishline',
  }
]

const index = () => {
  //Data Section
  const [straight, setStraight] = useState<StraightTile[]>(defaultStraight);
  const [corner, setCorner] = useState<Corner[]>(defaultCorner);
  const [deadend, setDeadend] = useState<Deadend[]>(defaultDeadend);
  const [tway, setTway] = useState<Tway[]>(defaultTway);
  const [oneway, setOneway] = useState<Oneway[]>(defaultOneway);
  const [defaulttile, setDefaulttile] = useState<Defaulttile[]>(defaultTile);
  const [player, setPlayer] = useState<Player[]>(defaultPlayer);
  const [finishline,setFinishline] = useState<Finishline[]>(defaultFinishline);
  const [boardData, setBoardData] = useState(defaultBoard9x9);
  const dataObject = {straight: straight, corner: corner,deadend: deadend, tway: tway, oneway: oneway,player: player , finishline: finishline, defaulttile: defaulttile}  
  const dataArray = [straight, corner, deadend, tway,  oneway]
  const [position, setPosition] = useState({x:0,y:0});
  


  //StateMangement Section
  const [focusTile,setFocusTile] = useState(false)
  const [selectedTile,setSelectedTile] = useState(null)
  const [resetting,setResetting] = useState(true)
  const navigate = useNavigate()




  //Function Section
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (focusTile) {
        if(event.key === 'e')
        {
          //Rotate Right
          handleRotateTile(selectedTile)
        }
        else if (event.key === 'q')
        {
          //Rotate Left
          handleRotateTile(selectedTile)
        }
      }
    };
    if (focusTile) {
      window.addEventListener('keydown', handleKeyPress);
    } else {
      window.removeEventListener('keydown', handleKeyPress);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [focusTile]);

  useEffect(() => {
    handleReset();
  }, []);


const handleRotateTile = (active) => {
    const tileTypeMap = {
      straight: { state: straight, setState: setStraight },
      corner: { state: corner, setState: setCorner },
      tway: { state: tway, setState: setTway },
      oneway: { state: oneway, setState: setOneway },
      player: { state: player, setState: setPlayer },
    };
    const rotationDirection = {straight: {'up':['up','down'],'left':['left','right'],'down':['up','down'],'right':['left','right']},corner: {'up':['up','left'],'left':['left','down'],'down':['down','right'],'right':['right','up']},tway: {'up':['up','left','down'],'left':['left','down','right'],'down':['down','right','up'],'right':['right','up','left']},oneway: {'up':['up'],'left':['left'],'down':['down'],'right':['right']},player: {'up':['up'],'left':['left'],'down':['down'],'right':['right']}}
    const { type } = active.data.current;
    if(type === 'finishline' || type === 'defaulttile' || type === 'deadend') return;
    const { state, setState } = tileTypeMap[type];
    const item = state.find((item) => item.id === active.id);
    const directionMap = { up: 'right', right: 'down', down: 'left', left: 'up' };
    item.direction = directionMap[item.direction];
    item.path = rotationDirection[type][item.direction];
    
    setState([...state]);
  }

const handleDragEnd = (event) => {
    const { over, active } = event;
    const typesMap = {
      straight: [straight, setStraight],
      corner: [corner, setCorner],
      deadend: [deadend, setDeadend],
      tway: [tway, setTway],
      oneway: [oneway, setOneway],
      player: [player, setPlayer ],
      finishline: [finishline, setFinishline],
      defaulttile: [defaulttile, setDefaulttile]
    };
    
      const currentTileData = boardData.find((item) => item.id === over?.id);
      const previousTileData = boardData.find((item) => item.id === active.data.current.boardId);
      if(currentTileData)
      {
        currentTileData.tileId = active.id;
        currentTileData.tileType = active.data.current.type;
      }
      if(previousTileData)
      {
        previousTileData.tileId = 'null';
        previousTileData.tileType = 'null';
      }
      
    if(over)
    {
      if (over.data.current.tileId === 'null')
      {
        if(active.data.current.type === 'player' || active.data.current.type === 'finishline')
        {
          if(active.data.current.type === 'player')
          {
            defaulttile[0].boardId = over.id;
          }
          else
          {
            defaulttile[1].boardId = over.id;
          }
          const [activeArray, setActiveArray] = typesMap[active.data.current.type];
          const activeIndex = activeArray.findIndex((item) => item.id === active.id);
          activeArray[activeIndex].boardId = over?.id || 'null';
          handleIncreaseTile(active);
        }
        else
        {
          const [activeArray, setActiveArray] = typesMap[active.data.current.type];
          const activeIndex = activeArray.findIndex((item) => item.id === active.id);
          activeArray[activeIndex].boardId = over?.id || 'null';
          console.log('test')
          console.log(activeArray[activeIndex])
          handleIncreaseTile(active);
        }
        
      }
      
    }
    else
    {
        const [activeArray, setActiveArray] = typesMap[active.data.current.type];
        const currentData = activeArray.find((item) => item.id === active.id);
        const newData = activeArray.filter((item) => item.id !== active.id);

        if(currentData.boardId === 'null') return;
        if(active.data.current.type === 'player' || active.data.current.type === 'finishline'){
          if(active.data.current.type === 'player')
          {
            defaulttile[0].boardId = 'null';
          }
          else
          {
            defaulttile[1].boardId = 'null';
          }
          currentData.boardId = 'null';
          return;
        }
        else
        {
          setActiveArray([...newData]);
        }
        
    }
    
    setFocusTile(false);
  };


const handleIncreaseTile = (active) => {
  if (active.data.current.type === 'player' || active.data.current.tpye === 'finishline') return;
  if (active.data.current.boardId !== 'null') return;
  const tileTypeMap = {
    straight: { state: straight, setState: setStraight },
    corner: { state: corner, setState: setCorner },
    deadend: { state: deadend, setState: setDeadend },
    tway: { state: tway, setState: setTway },
    oneway: { state: oneway, setState: setOneway },
    player: { state: player, setState: setPlayer },
    finishline: { state: finishline, setState: setFinishline },
    defaulttile: { state: defaulttile, setState: setDefaulttile }
  };

  const pathArray ={straight: ["up","down"],corner: ["up","left"],deadend: ["none"],tway: ["up","left","down"],oneway: ["up"],player: ["up"],finishline: ["up"],defaulttile: ["up"]}
  const { type } = active.data.current;
  const { state, setState } = tileTypeMap[type];
  const id = (state[state.length-1].id)
  const matches = parseInt(id.match(/\d+/g)[0])
  const newTile = {
    id: `${type.charAt(0)}${matches + 1}`,
    boardId: 'null',
    direction: "up",
    path: pathArray[type],
    tileType: type
  };
  setState([...state, newTile]);
  
}

const handleDragStart = (event) => {
  const { active } = event;
  console.log(active)
  setSelectedTile(active);
}

const handleReset = () => {
  setStraight(defaultStraight);
  setCorner(defaultCorner);
  setDeadend(defaultDeadend);
  setTway(defaultTway);
  setOneway(defaultOneway);
  setPlayer(defaultPlayer);
  setFinishline(defaultFinishline);
  setBoardData(defaultBoard9x9);
  setDefaulttile(defaultTile);
  dataObject.straight = defaultStraight;
  dataObject.corner = defaultCorner;
  dataObject.deadend = defaultDeadend;
  dataObject.tway = defaultTway;
  dataObject.oneway = defaultOneway;
  dataObject.player = defaultPlayer;
  dataObject.finishline = defaultFinishline;
  dataObject.defaulttile = defaultTile;

  setFocusTile(false);
  setSelectedTile(null);
  dataArray.forEach((item) => {
    item.forEach((item) => {
      item.boardId = 'null';
    })
  })
  boardData.forEach((item) => {
    item.tileId = 'null';
    item.tileType = 'null';
  })

  player[0].boardId = 'null';
  defaulttile[0].boardId = 'null';
  defaulttile[1].boardId = 'null';
  finishline[0].boardId = 'null';
  setResetting(false);
 
}

const handleMove = async(input) =>
{
  const playerBoard = player[0].boardId;
  if(playerBoard === 'null') return;
  const ypos = Array.from(playerBoard)[0].charCodeAt(0) 
  const xpos = Array.from(playerBoard)[1].charCodeAt(0)
  console.log(ypos,xpos)
  if(input === 'up')
  {
    setPosition({x:position.x,y:position.y-4.5})
    player[0].content = 'up'
    setTimeout(() => {
      player[0].boardId = (String.fromCharCode(ypos-1)+String.fromCharCode(xpos))
      setPosition({x:0,y:0})
      
    }, 250);
    
  }
  else if(input === 'down')
  {
    setPosition({x:position.x,y:position.y+4.5})
    player[0].content = 'down'
    setTimeout(() => {
      player[0].boardId = (String.fromCharCode(ypos+1)+String.fromCharCode(xpos))
      setPosition({x:0,y:0})
    }, 250);
  }
  else if(input === 'left')
  {
    setPosition({x:position.x-4.5,y:position.y})
    player[0].content = 'left'
    setTimeout(() => {
      player[0].boardId = (String.fromCharCode(ypos)+String.fromCharCode(xpos-1))
      setPosition({x:0,y:0})
    }, 250);
  }
  else if(input === 'right')
  {
    setPosition({x:position.x+4.5,y:position.y})
    player[0].content = 'right'
    setTimeout(() => {
      player[0].boardId = (String.fromCharCode(ypos)+String.fromCharCode(xpos+1))
      setPosition({x:0,y:0})
    }, 250);
  }

}

const handleInput = async (textInput) => {
  const input = textInput.split(',');
  for (const item of input) {
    await new Promise<void>((resolve) => {
      setTimeout(async () => {
        await handleMove(item);
        resolve();
      }, 500);
    });
  }
};


const calculatePath = () => {
  const data =[]
  const playerBoard = player[0].boardId;
  const finishlineBoard = finishline[0].boardId;
  const ypos = Array.from(playerBoard)[0].charCodeAt(0) 
  const xpos = Array.from(playerBoard)[1].charCodeAt(0)
  if (player[0].content === 'up') {
      const tile = boardData.find((item) => item.id === String.fromCharCode(ypos-1)+String.fromCharCode(xpos))
      if (tile?.tileType == 'straight')
      {
        data.push('up');
      }
  }
  console.log(data)
}



  if(resetting)
  {
    return (
      <h1>Loading</h1>
    )
  }

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}  >
      <div style={{ backgroundImage: `url(${background})` }} className='w-full h-[100vh] flex justify-center items-center gap-[5rem] overflow-hidden animate-moving-background' >
          <Tileholder dataObject={dataObject} setFocusTile={setFocusTile} />
          <Board dataObject={dataArray} boardData={boardData} setFocusTile={setFocusTile} player={player} finishline={finishline} defaultTile={defaultTile} position={position}/>
          <Sizechanger/>
          <div className=' absolute flex bottom-1 w-[30rem] justify-center items-center '>
            <img src={tutorialButton} className='w-[8rem] pointer-events-auto hover:translate-y-[-3px] duration-100 active:opacity-70 active:hover:translate-y-[3px]  [clip-path:circle(40%_at_50%_50%)]' draggable={false} onClick={()=>{navigate('/tutorial')}}/>
            <img src={startButton} className='w-[12rem] pointer-events-auto hover:translate-y-[-3px] duration-100   active:opacity-70 active:hover:translate-y-[3px] [clip-path:circle(38%_at_50%_50%)]' draggable={false} onClick={calculatePath}/>
            <img src={restartButton} className='w-[8rem] pointer-events-auto hover:translate-y-[-3px] duration-100 active:opacity-70 active:hover:translate-y-[3px] [clip-path:circle(40%_at_50%_50%)]' draggable={false} onClick={handleReset} />
          </div>
          <h1 className={`absolute top-10 text-[4rem] duration-200 transform transition-opacity ${focusTile ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-0'}`}>
            Press Q or E to rotate
          </h1>
      </div>  
      
      </DndContext>

  )
}
export default index