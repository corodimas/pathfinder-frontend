import { useState } from 'react'
import React from 'react'
import { background, island, button, buttonM, sprite, chicken1, chicken2 } from "../../assets/home"
import Flower from "../../components/Sprite/Flower"
import { useNavigate} from 'react-router-dom'
function Home() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate()
  return (
      <div style={{ backgroundImage: `url(${background})` }} className='w-full h-[100vh] flex justify-center items-center gap-[5rem] overflow-hidden animate-moving-background relative' >
        <div className="absolute z-10 top-[3.5rem] left-[4rem] leading-[10rem] drop-shadow-2xl select-none" >
          <div className='text-4xl text-[#6A8139] font-outline-2 '>WHEEL</div>
          <div className='text-[11.6rem] text-[#A4C263] font-outline-4 tracking-tight'>ROBOT</div>
          <div className='text-[5rem] text-[#A4C263] font-outline-4 leading-[8rem] tracking-widest'>SIMULATION</div>
          <div className='text-4xl text-[#6A8139] font-outline-2  leading-[2rem] '>WITH CUSTOMIZABLE PATHING</div>
        </div>
        <div className='relative'>
            <div className='absolute top-[100px] w-[900px] h-[460px] mt-[240px] ml-[540px]'>
              <div className=' z-20 ml-[770px]'>
              <Flower/>
              </div>
              <div className='z-20 mt-[170px]  animate-bounce w-[5rem]'>
                <img src={chicken2} />
              </div>
              <div className='z-10 ml-[450px] animate-bounce w-[5rem]'>
                <img src={chicken1} />
              </div>
            </div>
            <img src={island} className=' pr-[100px] z-10' />
        </div>
        <div className='absolute z-10 top-[47rem] left-[5.5rem] select-none'>
          <div className=' hover:scale-110 ml-1 cursor-pointer' onClick={()=>{navigate('playground')}}>
            <img src={buttonM} className='w-[30rem] pr-[90px]' />
            <p className='w-[34rem] pr-[140px] pt-[1.5rem] mt-[-9rem] text-center text-7xl text-[#90625D]' >PLAY</p>
          </div>
          <div className='flex '>
            <div className='hover:scale-110 cursor-pointer'>
              <img src={button} className='w-[12.3rem] mt-[2.5rem]' />
              <p className='ml-[2.6rem] text-4xl mt-[-5.5rem] text-[#461E19]'>EXIT</p>
            </div>
            <div className='hover:scale-110 cursor-pointer'>
              <img src={button} className='w-[12.3rem] mt-[2.5rem]' />
              <p className='ml-[3.5rem] text-4xl mt-[-5.5rem] text-[#461E19]' onClick={()=>{navigate('tutorial')}}>HOW</p>
            </div>
          </div>
        </div>
        
      </div>
  )
}

export default Home