import { useEffect, useState } from 'react'

import './App.css'

function App() {
  
  const numColumns = 100
  const [ cell, setCell ] = useState({})
  const [cellSize , setCellSize ] = useState(window.innerWidth / numColumns)
  const [numRow, setNumRow ] = useState(0)
  const [menuColorVisible, setMenuColorVisible ] = useState(false)
  const [ selectedColor, setSelectedColor] = useState("red")
  const [menuPosition, setMenuPosition ] = useState({ x: 0, y: 0 });
  const optionsColors = ["red", "blue", "green", "yellow", "purple"]
  const [drawing, setDrawing] = useState(false)
  

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


    const paintCell = (i) => {
      setCell((prevCells) => ({
        ...prevCells,
        [i]: selectedColor,
      }));
    };
  
    
    const handleRightClick = (e) => {
      e.preventDefault();
      setMenuPosition({ x: e.clientX, y: e.clientY });
      setMenuColorVisible(true);
    };
  
    
    const handleSelectedColor = (color) => {
      setSelectedColor(color);
      setMenuColorVisible(false);
    };
  
    
    const handleMouseDown = (e, i) => {
      if (e.button === 0) { 
        setDrawing(true);
        paintCell(i);
      }
    };
  
    
    const handleMouseUp = () => {
      setDrawing(false);
    };
  
    
    const handleMouseEnter = (i) => {
      if (drawing) {
        paintCell(i);
      }
    };

  return (
    <div
      style={{
        display: "grid",
        width: "100vw",
        height: "100vh",
        gridTemplateColumns: `repeat(${numColumns}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${numRow}, ${cellSize}px)`,
        overflow: "hidden"
      }}
      onMouseUp={handleMouseUp} 
    
    >
    {[...Array(numColumns * numRow)].map((_, i) => (
        <div
          key={i}
          onMouseDown={(e) => handleMouseDown(e, i)}
          onMouseEnter={() => handleMouseEnter(i)}
          onContextMenu={handleRightClick} 
          style={{
            width: cellSize,
            height: cellSize,
            backgroundColor: cell[i] || 'white',
            border: '1px solid #ccc',
          }}
        ></div>
      ))}
     { menuColorVisible && (
      <div style={{
        position: "absolute",
        top: `${menuPosition.y}px`,
        left: `${menuPosition.x}px`,
        background: "white",
        padding: "10px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius : "5px",
        display: "flex",
        gap : "5px",
      }}
      onMouseLeave= {() => setMenuColorVisible(false)}
      >

        {optionsColors.map((color) => (
          <div
          key={color}
          onClick={() => handleSelectedColor(color)}
          style={{
            width : "20px" ,
            height : "20PX",
            backgroundColor : color,
            cursor : "pointer",
            borderRadius : "5px",
            border: "1px solid black"
          }}>
          </div>
        ))}
      </div>
  )}    
    </div>
  )
}

export default App
