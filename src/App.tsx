import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createContext } from 'react'
import Menu from './Components/Menu'
import Game from './Components/Game'

export const MemoryGame = createContext<any>(null)

function App() {

  const [Theme, setTheme] = useState<boolean>(true)
  const [playerNum, setPlayerNum] = useState<number>(1)
  const [grid , setGrid] = useState<boolean>(true)
  
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Menu/>
    },
    {
      path:"/:game",
      element:<Game />
    }

  ])

  return (
    <>
      <MemoryGame.Provider value={{
        Theme,
        setTheme,
        playerNum,
        setPlayerNum,
        grid,
        setGrid
      }}>
        <RouterProvider  router={router} /> 
      </MemoryGame.Provider>
    </>
  )
}

export default App
