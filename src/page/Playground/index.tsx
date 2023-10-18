import React, { useState , useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import {background,restartButton,tutorialButton,startButton, board} from '../../assets/home'

import {DndContext} from '@dnd-kit/core';

import Board  from '../../components/Board/index'
import Tileholder from '../../components/Tileholder';
import Sizechanger from '../../components/Sizechanger';

import {StraightTile,Corner,Deadend,Tway,Oneway ,Player,Finishline , Defaulttile} from '../../utils/types'
import defaultBoard9x9 from '../../utils/defaultBoard';
import defaultBoard6x6 from '../../utils/6x6Board';
import defaultBoard12x12 from '../../utils/12x12Board';
import { set } from 'mongoose';

import stepSound from '../../assets/playground/step_sound.wav'

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
      path: [],
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
      path: ["down"],
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
    direction: "down",
    tileType: 'player',
  }
]


const defaultFinishline: Finishline[] = [
  {
    id: 'f1',
    boardId: 'null',
    direction: "up",
    path:["up","down","left","right"],
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
  const [boardSize, setBoardSize] = useState(9);
  const dataObject = {straight: straight, corner: corner,deadend: deadend, tway: tway, oneway: oneway,player: player , finishline: finishline, defaulttile: defaulttile}  
  const dataArray = [straight, corner, deadend, tway,  oneway]
  const [position, setPosition] = useState({x:0,y:0});
  let startingBoard = {};
  const data = [];
  const stack = [{id:'z',pathTaken:[]},]; //stack for backtracking
  const onewayStack = [];
  const tileTypeMap = {
    straight: { state: straight, setState: setStraight },
    corner: { state: corner, setState: setCorner },
    tway: { state: tway, setState: setTway },
    deadend: { state: deadend, setState: setDeadend },
    oneway: { state: oneway, setState: setOneway },
    player: { state: player, setState: setPlayer },
    finishline: { state: finishline, setState: setFinishline },
  };
  const rotationDirection = {
    straight: {'up':['up','down'],'left':['left','right'],'down':['up','down'],'right':['left','right']},
    corner: {'up':['up','left'],'left':['left','down'],'down':['down','right'],'right':['right','up']},
    tway: {'up':['up','left','down'],'left':['left','down','right'],'down':['down','right','up'],'right':['right','up','left']},
    oneway: {'up':['down'],'left':['right'],'down':['up'],'right':['left']},
    player: {'up':['up'],'left':['left'],'down':['down'],'right':['right']},
    finishline: {'up':['up','down','left','right'],'left':['up','down','left','right'],'down':['up','down','left','right'],'right':['up','down','left','right']}
  }

  


  //StateMangement Section
  const [focusTile,setFocusTile] = useState(false)
  const [selectedTile,setSelectedTile] = useState(null)
  const [resetting,setResetting] = useState(true)
  const [lockDown, setLockDown] = useState(false)
  const [isMove, setIsMove] = useState(false)
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
      if(previousTileData)
      {
        previousTileData.tileId = 'null';
        previousTileData.tileType = 'null';
      }
      if(currentTileData)
      {
        currentTileData.tileId = active.id;
        currentTileData.tileType = active.data.current.type;
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
          handleIncreaseTile(active);
        }
        
      }
      
    }
    else
    {
        const [activeArray, setActiveArray] = typesMap[active.data.current.type];
        const currentData = activeArray.find((item) => item.id === active.id);
        const newData = activeArray.filter((item) => item.id !== active.id);

        if(currentData.boardId === 'null') {; return;}
        if(active.data.current.type === 'player' || active.data.current.type === 'finishline' || active.data.current.type === 'oneway'){
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
  if (active.data.current.type === 'player' || active.data.current.type === 'finishline' || active.data.current.type === 'oneway')  return;
  if (active.data.current.boardId !== 'null') return;
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

  if(boardSize === 9) setBoardData(defaultBoard9x9);
  if(boardSize === 6) setBoardData(defaultBoard6x6);
  if(boardSize === 12) setBoardData(defaultBoard12x12);

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
  startingBoard = {};
  data.length = 0;
  setResetting(false);
 
}

const handleMove = async(input) =>
{
  setIsMove(true)
  const playerBoard = player[0].boardId;
  if(playerBoard === 'null') return;
  const ypos = Array.from(playerBoard)[0].charCodeAt(0) 
  const xpos = Array.from(playerBoard)[1].charCodeAt(0)
  if(input === 'up')
  {
    setPosition({x:position.x,y:position.y-4.5})
    player[0].direction = 'up'
    setTimeout(() => {
      player[0].boardId = (String.fromCharCode(ypos-1)+String.fromCharCode(xpos))
      setPosition({x:0,y:0})
      
    }, 250);
    
  }
  else if(input === 'down')
  {
    setPosition({x:position.x,y:position.y+4.5})
    player[0].direction = 'down'
    setTimeout(() => {
      player[0].boardId = (String.fromCharCode(ypos+1)+String.fromCharCode(xpos))
      setPosition({x:0,y:0})
    }, 250);
  }
  else if(input === 'left')
  {
    setPosition({x:position.x-4.5,y:position.y})
    player[0].direction = 'left'
    setTimeout(() => {
      player[0].boardId = (String.fromCharCode(ypos)+String.fromCharCode(xpos-1))
      setPosition({x:0,y:0})
    }, 250);
  }
  else if(input === 'right')
  {
    setPosition({x:position.x+4.5,y:position.y})
    player[0].direction = 'right'
    setTimeout(() => {
      player[0].boardId = (String.fromCharCode(ypos)+String.fromCharCode(xpos+1))
      setPosition({x:0,y:0})
    }, 250);
  }
  playMoveSound();

}

const handleInput = async (textInput) => {
  for (const item of textInput) {
    await new Promise<void>((resolve) => {
      setTimeout(async () => {
        await handleMove(item);
        resolve();
      }, 500);
    });
  }
};


const initializeStart = async() => {
  
  const playerBoard = player[0].boardId;
  const ypos = Array.from(playerBoard)[0].charCodeAt(0) 
  const xpos = Array.from(playerBoard)[1].charCodeAt(0)
  if (player[0].direction === 'up') {
      const board = boardData.find((item) => item.id === String.fromCharCode(ypos-1)+String.fromCharCode(xpos))
      const { state } = tileTypeMap[board.tileType];
      const item = state.find((item) => item.id === board?.tileId);
      if(item.path.includes('down'))
      {
        data.push('up')
        startingBoard = board;
      }
      else
      {
        data.push('nopath');
      }
  }
  else if (player[0].direction === 'down') {
    const board = boardData.find((item) => item.id === String.fromCharCode(ypos+1)+String.fromCharCode(xpos))
    const { state } = tileTypeMap[board.tileType];
    const item = state.find((item) => item.id === board?.tileId);
    if(item.path.includes('up'))
    {
      data.push('down')
      startingBoard = board;
    }
    else
    {
      data.push('nopath');
    }

  }
  else if (player[0].direction === 'left') {
    const board = boardData.find((item) => item.id === String.fromCharCode(ypos)+String.fromCharCode(xpos-1))
    const { state } = tileTypeMap[board.tileType];
    const item = state.find((item) => item.id === board?.tileId);
    if(item.path.includes('right'))
    {
      data.push('left')
      startingBoard = board;
    }
    else
    {
      data.push('nopath');
    }
  }
  else if (player[0].direction === 'right') {
    const board = boardData.find((item) => item.id === String.fromCharCode(ypos)+String.fromCharCode(xpos+1))
    const { state } = tileTypeMap[board.tileType];
    const item = state.find((item) => item.id === board?.tileId);
    if(item.path.includes('left'))
    {
      data.push('right')
      startingBoard = board;
    }
    else
    {
      data.push('nopath');
    }
  }
}

const handleFinish = async () => {
  if(player[0].boardId === 'null') {
    alert("player is not place yet"); return;
  }
  else if(finishline[0].boardId === 'null') {
    alert("finishline is not place yet"); return;
  }
  try{
  setLockDown(true);
  data.length = 0;
  await initializeStart();
  let count = 0;
  async function calculateAndCheckPath() {
    await calculatePath();
    count++;
    if(count >= 1000)
    {
      return false;
    }
    return (data[data.length - 1] !== 'finish' && data[data.length - 1] !== 'gameover') ;
  }
  while (await calculateAndCheckPath()) {}

  await handleInput(data);
  const text = {'finish':'YOU WIN','gameover':'YOU LOSE'}
  alert(text[data[data.length - 1]])
  handleReset();
  navigate('/endgame')
  setLockDown(false)
  }
  catch(err)
  {
    alert("you place something illegal on the board \n -Player direction is not correctly \n -There is no tile in front of character")
    navigate('/endgame')
  }
}

const calculatePath = async () => {
  if(data[data.length-1] === 'gameover') {alert("Gameover Bruh"); return}
  const tileId = startingBoard.tileId;
  const tileType = startingBoard.tileType;
  const { state } = tileTypeMap[tileType];
  const playerBoard = startingBoard.id;
  const ypos = Array.from(playerBoard)[0].charCodeAt(0) 
  const xpos = Array.from(playerBoard)[1].charCodeAt(0)
  const item = state.find((item) => item.id === tileId);
  const path = item.path;
  const possibleWay = {'up':'down', 'down':'up', 'left':'right', 'right':'left'}


  const checkGameOver = () => {
    if(stack[stack.length -1].id === 'z')
    {
      data.push('gameover');
    }
    else{
      goBack();
    }
  }

  const goBack = () =>
  {
    if (data[data.length-1] === 'up') {
      const board = boardData.find((item) => item.id === String.fromCharCode(ypos+1)+String.fromCharCode(xpos))
      if(board?.tileId !== 'null')
      {
        const { state } = tileTypeMap[board.tileType];
        const item = state.find((item) => item.id === board?.tileId);
        if(item.path.includes('up'))
        {
          data.push('down')
          startingBoard = board;
        }
        else
        {
          data.push('nopath');
        }
        }
      else
      {
        data.push('nopath');
      }
      }
      else if (data[data.length-1] === 'down') {
        const board = boardData.find((item) => item.id === String.fromCharCode(ypos-1)+String.fromCharCode(xpos))
        if(board?.tileId !== 'null')
        {
          const { state } = tileTypeMap[board.tileType];
          const item = state.find((item) => item.id === board?.tileId);
          if(item.path.includes('down'))
          {
            data.push('up')
            startingBoard = board;
          }
          else
          {
            data.push('nopath');
          }
        }
        else
        {
          data.push('nopath');
        }
      }
      else if (data[data.length-1] === 'left') {
        const board = boardData.find((item) => item.id === String.fromCharCode(ypos)+String.fromCharCode(xpos+1))
        if(board?.tileId !== 'null')
        {
          const { state } = tileTypeMap[board.tileType];
          const item = state.find((item) => item.id === board?.tileId);
          if(item.path.includes('left'))
          {
            data.push('right')
            startingBoard = board;
          }
          else
          {
            data.push('nopath');
          }
        }
        else
        {
          data.push('nopath');
        }
      }
      else if (data[data.length-1] === 'right') {
        const board = boardData.find((item) => item.id === String.fromCharCode(ypos)+String.fromCharCode(xpos-1))
        if(board?.tileId !== 'null')
        {
          const { state } = tileTypeMap[board.tileType];
          const item = state.find((item) => item.id === board?.tileId);
          if(item.path.includes('right'))
          {
            data.push('left')
            startingBoard = board;
          }
          else
          {
            data.push('nopath');
          }
        }
        else
        {
          data.push('nopath');
        }
      }
  }

  if (item.tileType === 'straight') {
      if (data[data.length-1] === 'up') {
        const board = boardData.find((item) => item.id === String.fromCharCode(ypos-1)+String.fromCharCode(xpos))
        if(board?.tileId !== 'null')
        {
          const { state } = tileTypeMap[board.tileType];
          const item = state.find((item) => item.id === board?.tileId);
          if(item.path.includes('down'))
          {
            data.push('up')
            startingBoard = board;
          }
          else
          {
            checkGameOver();
          }
        }
        else
        {
          checkGameOver();
        }
      }
      else if (data[data.length-1] === 'down') {
        const board = boardData.find((item) => item.id === String.fromCharCode(ypos+1)+String.fromCharCode(xpos))
        if(board?.tileId !== 'null')
        {
          const { state } = tileTypeMap[board.tileType];
          const item = state.find((item) => item.id === board?.tileId);
          if(item.path.includes('up'))
          {
            data.push('down')
            startingBoard = board;
          }
          else
          {
            checkGameOver();
          }
        }
        else
        {
          checkGameOver();
        }
      }
      else if (data[data.length-1] === 'left') {
        const board = boardData.find((item) => item.id === String.fromCharCode(ypos)+String.fromCharCode(xpos-1))
        if(board?.tileId !== 'null')
        {
          const { state } = tileTypeMap[board.tileType];
          const item = state.find((item) => item.id === board?.tileId);
          if(item.path.includes('right'))
          {
            data.push('left')
            startingBoard = board;
          }
          else
          {
            checkGameOver();
          }
        }
        else
        {
          checkGameOver();
        }
      }
      else if (data[data.length-1] === 'right') {
        const board = boardData.find((item) => item.id === String.fromCharCode(ypos)+String.fromCharCode(xpos+1))
        if(board?.tileId !== 'null')
        {
          const { state } = tileTypeMap[board.tileType];
          const item = state.find((item) => item.id === board?.tileId);
          if(item.path.includes('left'))
          {
            data.push('right')
            startingBoard = board;
          }
          else
          {
            checkGameOver();
          }
        }
        else
        {
          checkGameOver();
        }
      }
  }

  else if(item.tileType === 'corner')
  {
    const tile = state.find((item) => item.id === tileId);
    const path = tile.path;
    const possiblePath = path.filter((item) => item !== possibleWay[data[data.length-1]]);
      if(possiblePath[0] === 'right')
    {
        const board = boardData.find((item) => item.id === String.fromCharCode(ypos)+String.fromCharCode(xpos+1))
        if(board === undefined || board.tileId === 'null') {checkGameOver(); return;};
        const {state} = tileTypeMap[board.tileType];
        const item = state.find((item) => item.id === board?.tileId);
        if(item.path.includes('left'))
        {
          data.push('right')
          startingBoard = board;
        }
        else
        {
          checkGameOver();
        }
      }
      else if(possiblePath[0] === 'left')
      {
        const board = boardData.find((item) => item.id === String.fromCharCode(ypos)+String.fromCharCode(xpos-1))
        if(board === undefined  || board.tileId === 'null') {checkGameOver(); return;};
        const {state} = tileTypeMap[board.tileType];
        const item = state.find((item) => item.id === board?.tileId);
        if(item.path.includes('right'))
        {
          data.push('left')
          startingBoard = board;
        }
        else
        {
          checkGameOver();
        }
      }
      else if(possiblePath[0] === 'up')
      {
        const board = boardData.find((item) => item.id === String.fromCharCode(ypos-1)+String.fromCharCode(xpos))
        if(board === undefined  || board.tileId === 'null') {checkGameOver(); return;};
        const {state} = tileTypeMap[board.tileType];
        const item = state.find((item) => item.id === board?.tileId);
        if(item.path.includes('down'))
        {
          data.push('up')
          startingBoard = board;
        }
        else
        {
          checkGameOver();
        }
      }
      else if(possiblePath[0] === 'down')
      {
        const board = boardData.find((item) => item.id === String.fromCharCode(ypos+1)+String.fromCharCode(xpos))
        if(board === undefined  || board.tileId === 'null') {checkGameOver(); return;};
        const {state} = tileTypeMap[board.tileType];
        const item = state.find((item) => item.id === board?.tileId);
        if(item.path.includes('up'))
        {
          data.push('down')
          startingBoard = board;
        }
        else
        {
          checkGameOver();
        }
      }
  }

  else if (item.tileType === 'oneway') 
  {
    const thereIsWay = stack.some(item=> item.id !== 'z' && item.pathTaken.length !== 3)
    const oppsiteWay = {'up':'down', 'down':'up', 'left':'right', 'right':'left'}
    if(!thereIsWay)
    {
      onewayStack.pop();
      stack.splice(2);
      if (data[data.length-1] === 'up') {
      const board = boardData.find((item) => item.id === String.fromCharCode(ypos-1)+String.fromCharCode(xpos))
      if(board?.tileId !== 'null')
      {
        const { state } = tileTypeMap[board.tileType];
        const item = state.find((item) => item.id === board?.tileId);
        if(item.path.includes('down'))
        {
          data.push('up')
          startingBoard = board;
        }
        else
        {
          data.push('gameover');
        }
        }
      else
      {
        data.push('gameover');
      }
      }
      else if (data[data.length-1] === 'down') {
        const board = boardData.find((item) => item.id === String.fromCharCode(ypos+1)+String.fromCharCode(xpos))
        if(board?.tileId !== 'null')
        {
          const { state } = tileTypeMap[board.tileType];
          const item = state.find((item) => item.id === board?.tileId);
          if(item.path.includes('up'))
          {
            data.push('down')
            startingBoard = board;
          }
          else
          {
            data.push('gameover');
          }
        }
        else
        {
          data.push('gameover');
        }
      }
      else if (data[data.length-1] === 'left') {
        const board = boardData.find((item) => item.id === String.fromCharCode(ypos)+String.fromCharCode(xpos-1))
        if(board?.tileId !== 'null')
        {
          const { state } = tileTypeMap[board.tileType];
          const item = state.find((item) => item.id === board?.tileId);
          if(item.path.includes('right'))
          {
            data.push('left')
            startingBoard = board;
          }
          else
          {
            data.push('gameover');
          }
        }
        else
        {
          data.push('gameover');
        }
      }
      else if (data[data.length-1] === 'right') {
        const board = boardData.find((item) => item.id === String.fromCharCode(ypos)+String.fromCharCode(xpos+1))
        if(board?.tileId !== 'null')
        {
          const { state } = tileTypeMap[board.tileType];
          const item = state.find((item) => item.id === board?.tileId);
          if(item.path.includes('left'))
          {
            data.push('right')
            startingBoard = board;
          }
          else
          {
            data.push('gameover');
          }
        }
        else
        {
          data.push('gameover');
        }
      }
    }
    else
    {
      onewayStack.push(item.tileId);
      goBack();
    }

  }

  else if (item.tileType === 'tway')
  {
    const tile = state.find((item) => item.id === tileId);
    const path = tile.path;
    const oppositeWay = {'up':'down', 'down':'up', 'left':'right', 'right':'left'}
    if(!stack.some(item=> item.id === tileId))
    {
      stack.push({id:tileId, pathTaken: [oppositeWay[data[data.length-1]]]});
    }
    else
    {
      const stackItem = stack.find(item => item.id === tileId);
      const possiblePath = path.filter((item) => !stackItem.pathTaken.includes(item));

      if(possiblePath.length === 0)
      {
          const thereIsWay = stack.some(item=> item.id !== 'z' && item.pathTaken.length !== 3)
          const thereIsOneway = onewayStack.length !== 0;
          if(thereIsWay)
          {
            const onlypath = stackItem.pathTaken[0];
            if(onlypath === 'right')
    {
        const board = boardData.find((item) => item.id === String.fromCharCode(ypos)+String.fromCharCode(xpos+1))
        if(board === undefined || board.tileId === 'null') {data.push('nopath'); return;};
        const {state} = tileTypeMap[board.tileType];
        const item = state.find((item) => item.id === board?.tileId);
        if(item.path.includes('left'))
        {
          data.push('right')
          startingBoard = board;
        }
        else
        {
          data.push('nopath');
        }
            }
            else if(onlypath === 'left')
            {
              const board = boardData.find((item) => item.id === String.fromCharCode(ypos)+String.fromCharCode(xpos-1))
              if(board === undefined  || board.tileId === 'null') {data.push('nopath'); return;};
              const {state} = tileTypeMap[board.tileType];
              const item = state.find((item) => item.id === board?.tileId);
              if(item.path.includes('right'))
              {
                data.push('left')
                startingBoard = board;
              }
              else
              {
                data.push('nopath');
              }
            }
            else if(onlypath === 'up')
            {
              const board = boardData.find((item) => item.id === String.fromCharCode(ypos-1)+String.fromCharCode(xpos))
              if(board === undefined  || board.tileId === 'null') {data.push('nopath'); return;};
              const {state} = tileTypeMap[board.tileType];
              const item = state.find((item) => item.id === board?.tileId);
              if(item.path.includes('down'))
              {
                data.push('up')
                startingBoard = board;
              }
              else
              {
                data.push('nopath');
              }
            }
            else if(onlypath === 'down')
            {
              const board = boardData.find((item) => item.id === String.fromCharCode(ypos+1)+String.fromCharCode(xpos))
              if(board === undefined  || board.tileId === 'null') {data.push('nopath'); return;};
              const {state} = tileTypeMap[board.tileType];
              const item = state.find((item) => item.id === board?.tileId);
              if(item.path.includes('up'))
              {
                data.push('down')
                startingBoard = board;
              }
              else
              {
                data.push('nopath');
              }
            }
          }
          else if(thereIsOneway)
          {
            let onlypath;
            if(stack[1] === stackItem)
            {
              onlypath = stackItem.pathTaken[1];
              
            }
            else
            {
              onlypath = stackItem.pathTaken[0];
            }
            
            if(onlypath === 'right')
    {
        const board = boardData.find((item) => item.id === String.fromCharCode(ypos)+String.fromCharCode(xpos+1))
        if(board === undefined || board.tileId === 'null') {data.push('nopath'); return;};
        const {state} = tileTypeMap[board.tileType];
        const item = state.find((item) => item.id === board?.tileId);
        if(item.path.includes('left'))
        {
          data.push('right')
          startingBoard = board;
        }
        else
        {
          data.push('nopath');
        }
            }
            else if(onlypath === 'left')
            {
              const board = boardData.find((item) => item.id === String.fromCharCode(ypos)+String.fromCharCode(xpos-1))
              if(board === undefined  || board.tileId === 'null') {data.push('nopath'); return;};
              const {state} = tileTypeMap[board.tileType];
              const item = state.find((item) => item.id === board?.tileId);
              if(item.path.includes('right'))
              {
                data.push('left')
                startingBoard = board;
              }
              else
              {
                data.push('nopath');
              }
            }
            else if(onlypath === 'up')
            {
              const board = boardData.find((item) => item.id === String.fromCharCode(ypos-1)+String.fromCharCode(xpos))
              if(board === undefined  || board.tileId === 'null') {data.push('nopath'); return;};
              const {state} = tileTypeMap[board.tileType];
              const item = state.find((item) => item.id === board?.tileId);
              if(item.path.includes('down'))
              {
                data.push('up')
                startingBoard = board;
              }
              else
              {
                data.push('nopath');
              }
            }
            else if(onlypath === 'down')
            {
              const board = boardData.find((item) => item.id === String.fromCharCode(ypos+1)+String.fromCharCode(xpos))
              if(board === undefined  || board.tileId === 'null') {data.push('nopath'); return;};
              const {state} = tileTypeMap[board.tileType];
              const item = state.find((item) => item.id === board?.tileId);
              if(item.path.includes('up'))
              {
                data.push('down')
                startingBoard = board;
              }
              else
              {
                data.push('nopath');
              }
            }
            
          }
          else 
          {
            data.push('gameover');
          }
          return;
      }
      if(possiblePath[0] === 'right')
   {
      const board = boardData.find((item) => item.id === String.fromCharCode(ypos)+String.fromCharCode(xpos+1))
      if(board === undefined || board.tileId === 'null') {stackItem.pathTaken.push(possiblePath[0]); return;};
      const {state} = tileTypeMap[board.tileType];
      const item = state.find((item) => item.id === board?.tileId);
      if(item.path.includes('left'))
      {
        data.push('right')
        startingBoard = board;
      }
      }
      else if(possiblePath[0] === 'left')
      {
        const board = boardData.find((item) => item.id === String.fromCharCode(ypos)+String.fromCharCode(xpos-1))
        if(board === undefined  || board.tileId === 'null') {stackItem.pathTaken.push(possiblePath[0]); return;};
        const {state} = tileTypeMap[board.tileType];
        const item = state.find((item) => item.id === board?.tileId);
        if(item.path.includes('right'))
        {
          data.push('left')
          startingBoard = board;
        }
      }
      else if(possiblePath[0] === 'up')
      {
        const board = boardData.find((item) => item.id === String.fromCharCode(ypos-1)+String.fromCharCode(xpos))
        if(board === undefined  || board.tileId === 'null') {stackItem.pathTaken.push(possiblePath[0]); return;};
        const {state} = tileTypeMap[board.tileType];
        const item = state.find((item) => item.id === board?.tileId);
        if(item.path.includes('down'))
        {
          data.push('up')
          startingBoard = board;
        }
      }
      else if(possiblePath[0] === 'down')
      {
        const board = boardData.find((item) => item.id === String.fromCharCode(ypos+1)+String.fromCharCode(xpos))
        if(board === undefined  || board.tileId === 'null') {stackItem.pathTaken.push(possiblePath[0]); return;};
        const {state} = tileTypeMap[board.tileType];
        const item = state.find((item) => item.id === board?.tileId);
        if(item.path.includes('up'))
        {
          data.push('down')
          startingBoard = board;
        }
      }
      stackItem.pathTaken.push(possiblePath[0]);
    }

  }




  else if(item.tileType === 'deadend')
  {
    const oppsiteWay = {'up':'down', 'down':'up', 'left':'right', 'right':'left'}
    if(stack[stack.length -1].id === 'z') 
    {
      data.push('gameover');
    }
    else
    {
      if (data[data.length-1] === 'up') {
        const board = boardData.find((item) => item.id === String.fromCharCode(ypos+1)+String.fromCharCode(xpos))
        if(board?.tileId !== 'null')
        {
          const { state } = tileTypeMap[board.tileType];
          const item = state.find((item) => item.id === board?.tileId);
          if(item.path.includes('up'))
          {
            data.push('down')
            startingBoard = board;
          }
          else
          {
            data.push('nopath');
          }
          }
        else
        {
          data.push('nopath');
        }
        }
        else if (data[data.length-1] === 'down') {
          const board = boardData.find((item) => item.id === String.fromCharCode(ypos-1)+String.fromCharCode(xpos))
          if(board?.tileId !== 'null')
          {
            const { state } = tileTypeMap[board.tileType];
            const item = state.find((item) => item.id === board?.tileId);
            if(item.path.includes('down'))
            {
              data.push('up')
              startingBoard = board;
            }
            else
            {
              data.push('nopath');
            }
          }
          else
          {
            data.push('nopath');
          }
        }
        else if (data[data.length-1] === 'left') {
          const board = boardData.find((item) => item.id === String.fromCharCode(ypos)+String.fromCharCode(xpos+1))
          if(board?.tileId !== 'null')
          {
            const { state } = tileTypeMap[board.tileType];
            const item = state.find((item) => item.id === board?.tileId);
            if(item.path.includes('left'))
            {
              data.push('right')
              startingBoard = board;
            }
            else
            {
              data.push('nopath');
            }
          }
          else
          {
            data.push('nopath');
          }
        }
        else if (data[data.length-1] === 'right') {
          const board = boardData.find((item) => item.id === String.fromCharCode(ypos)+String.fromCharCode(xpos-1))
          if(board?.tileId !== 'null')
          {
            const { state } = tileTypeMap[board.tileType];
            const item = state.find((item) => item.id === board?.tileId);
            if(item.path.includes('right'))
            {
              data.push('left')
              startingBoard = board;
            }
            else
            {
              data.push('nopath');
            }
          }
          else
          {
            data.push('nopath');
          }
        }
    }
  }
  else if(item.tileType === 'finishline')
  {
    data.push('finish');
  }
}

const handleSize = (size) => {
  handleReset();
  if (size === 9) {
    setBoardData(defaultBoard9x9);
    setBoardSize(9);
  }
  if (size === 6) {
    setBoardData(defaultBoard6x6);
    setBoardSize(6);
  }
  if (size === 12){
    setBoardData(defaultBoard12x12);
    setBoardSize(12);
  } 
}

const playMoveSound = () => {
  const audio = new Audio(stepSound);
  audio.play();
}



  if(resetting)
  {
    return (
      <h1>Loading</h1>
    )
  }

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}  >
      <div className='relative'>
      <div style={{ backgroundImage: `url(${background})` }} className='w-full h-[100vh] flex justify-center items-center gap-[5rem] overflow-hidden animate-moving-background' >
          <Tileholder dataObject={dataObject} setFocusTile={setFocusTile} />
          <Board dataObject={dataArray} boardSize={boardSize} boardData={boardData} setFocusTile={setFocusTile} player={player} finishline={finishline} defaultTile={defaultTile} position={position} isMove={isMove}/>
          <Sizechanger onSelectSize={handleSize}/>
          <div className=' absolute flex bottom-1 w-[30rem] justify-center items-center '>
            <img src={tutorialButton} className='w-[8rem] pointer-events-auto hover:translate-y-[-3px] duration-100 active:opacity-70 active:hover:translate-y-[3px]  [clip-path:circle(40%_at_50%_50%)]' draggable={false} onClick={()=>{navigate('/tutorial')}}/>
            <img src={startButton} className='w-[12rem] pointer-events-auto hover:translate-y-[-3px] duration-100   active:opacity-70 active:hover:translate-y-[3px] [clip-path:circle(38%_at_50%_50%)]' draggable={false} onClick={handleFinish}/>
            <img src={restartButton} className='w-[8rem] pointer-events-auto hover:translate-y-[-3px] duration-100 active:opacity-70 active:hover:translate-y-[3px] [clip-path:circle(40%_at_50%_50%)]' draggable={false} onClick={handleReset} />
          </div>
          <h1 className={`absolute top-10 text-[4rem] duration-200 transform transition-opacity ${focusTile ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-0'}`}>
            Press Q or E to rotate
          </h1>
          {lockDown && <div className='bg-transparent absolute w-full h-full z-[1000]'></div>}
          </div>
      </div>  
      
    </DndContext>

  )
}
export default index