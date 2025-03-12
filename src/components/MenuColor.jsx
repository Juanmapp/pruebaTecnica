import React from 'react'

const ColorMenu = ({ position, optionsColors, onSelectColor, onClose }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        background: 'white',
        padding: '10px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '5px',
        display: 'flex',
        gap: '5px'
      }}
      onMouseLeave={onClose}
    >
      {optionsColors.map((color) => (
        <div
          key={color}
          onClick={() => onSelectColor(color)}
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: color,
            cursor: 'pointer',
            borderRadius: '5px',
            border: '1px solid black'
          }}
        />
      ))}
    </div>
  )
}

export default ColorMenu
