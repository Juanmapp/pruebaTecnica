import {  use, useEffect, useState } from 'react'

import './App.css'

function App() {
  
  const numColumns = 100
  const [ cell, setCell ] = useState({})
  const [cellSize , setCellSize] = useState(window.innerWidth / numColumns)
  const [numRow, setNumRow] = useState(0) 

  

  

    useEffect (() => {
      
      const updateGrid = () => {
        const newCellSize = window.innerWidth / numColumns
        setCellSize(newCellSize)
        setNumRow(Math.floor(window.innerHeight / newCellSize))
      } 
      updateGrid()
      window.addEventListener("resize", updateGrid)
      return () => window.removeEventListener("resize", updateGrid)

    }, [])


    const toggleCell = (i) => {
      setCell((prevCells) => ({
        ...prevCells,
        [i]: !prevCells[i],
      }));
    };



  return (
    <div 
    style={{
      display : "grid",
      width : "100vw",
      height : "100vh",
      gridTemplateColumns : `repeat(${numColumns}, ${cellSize}px)`,
      gridTemplateRows : `repeat(${numRow}, ${cellSize}px)`,
      overflow : "hidden"
    }}
    >
    {[...Array(numColumns * numRow)].map((e, i ) => (
      <div 
      onClick={() => toggleCell(i)} 
      style={{
        backgroundColor: cell[i] ? 'red' : 'white',
            border: '1px solid #ccc',
    }} key={i}></div>
    ))}
      
    </div>
  )
}

export default App
