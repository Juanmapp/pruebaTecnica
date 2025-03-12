import React from 'react';

const Grid = ({ numColumns, numRow, cellSize, cell, handleMouseDown, handleMouseUp, handleMouseEnter, handleRightClick }) => {
  return (
    <div
      role="grid"
      style={{
        display: 'grid',
        width: '100vw',
        height: '100vh',
        gridTemplateColumns: `repeat(${numColumns}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${numRow}, ${cellSize}px)`,
        overflow: 'hidden',
      }}
      onMouseUp={handleMouseUp}
    >
      {[...Array(numColumns * numRow)].map((_, i) => (
        <div
        role="cell"
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
    </div>
  );
};

export default Grid;
