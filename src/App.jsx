import { useEffect, useState } from 'react'
import useDrawing from './hooks/useDrawing'
import Grid from './components/Grid'
import MenuColor from './components/MenuColor'
import './App.css'

export default function App () {
  const numColumns = 100
  const menuColorWidth = 150
  const optionsColors = ['red', 'blue', 'green', 'yellow', 'purple']
  const [selectedColor, setSelectedColor] = useState('red')
  const [cellSize, setCellSize] = useState(window.innerWidth / numColumns)
  const [numRow, setNumRow] = useState(0)
  const [menuColorVisible, setMenuColorVisible] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })

  const { cell, handleMouseDown, handleMouseUp, handleMouseEnter } =
    useDrawing(numColumns, selectedColor)

  useEffect(() => {
    const updateGrid = () => {
      const newCellSize = window.innerWidth / numColumns
      setCellSize(newCellSize)
      setNumRow(Math.floor(window.innerHeight / newCellSize))
    }
    updateGrid()
    window.addEventListener('resize', updateGrid)
    return () => window.removeEventListener('resize', updateGrid)
  }, [])

  const handleRightClick = (e) => {
    e.preventDefault()
    if ((e.clientX + menuColorWidth) > window.innerWidth) {
      setMenuPosition({ x: (e.clientX - menuColorWidth), y: e.clientY })
    } else {
      setMenuPosition({ x: e.clientX, y: e.clientY })
    }
    setMenuColorVisible(true)
  }

  return (
    <div>
      <Grid
        numColumns={numColumns}
        numRow={numRow}
        cellSize={cellSize}
        cell={cell}
        handleMouseDown={handleMouseDown}
        handleMouseUp={handleMouseUp}
        handleMouseEnter={handleMouseEnter}
        handleRightClick={handleRightClick}
      />
      {menuColorVisible && (
        <MenuColor
          data-testid='color-menu'
          menuColorWidth={menuColorWidth}
          position={menuPosition}
          optionsColors={optionsColors}
          onSelectColor={setSelectedColor}
          onClose={() => setMenuColorVisible(false)}
        />
      )}
    </div>
  )
}
