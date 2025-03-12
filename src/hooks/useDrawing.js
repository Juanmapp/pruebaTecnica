import { useState, useCallback } from 'react'

const useDrawing = (numColumns, selectedColor) => {
  const [cell, setCell] = useState({})
  const [drawing, setDrawing] = useState(false)

  const paintCell = useCallback(
    (i) => {
      setCell((prevCell) => ({
        ...prevCell,
        [i]: selectedColor
      }))
    },
    [selectedColor]
  )

  const handleMouseDown = (e, i) => {
    if (e.button === 0) {
      setDrawing(true)
      paintCell(i)
    }
  }

  const handleMouseUp = () => {
    setDrawing(false)
  }

  const handleMouseEnter = (i) => {
    if (drawing) paintCell(i)
  }

  return {
    cell,
    handleMouseDown,
    handleMouseUp,
    handleMouseEnter
  }
}

export default useDrawing
