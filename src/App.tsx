import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, BrowserRouter, Link} from 'react-router-dom'

import Home from './page/Home/index'
import Tutorial from './page/Tutorial/index'
import Tutorial2 from './page/Tutorial2/index'
import Playground from './page/Playground/index'
import EndGame from './page/EndGame/index'

import BackgroundMusic from './assets/playground/background_music.mp3'

const route = () => {

  const audio = new Audio(BackgroundMusic)

  useEffect(() => {
    audio.loop = true
    audio.play()
    audio.volume = 0.25
  })


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/tutorial2" element={<Tutorial2 />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/endgame" element={<EndGame />} />
      </Routes>
    </BrowserRouter>
  )
}

export default route