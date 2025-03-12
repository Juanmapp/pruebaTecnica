import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App'

describe('App Component', () => {
  test('Pintar una celda al hacer click izquierdo', () => {
    render(<App />)
    const cell = screen.getAllByRole('cell')
    const firstCell = cell[0]

    fireEvent.mouseDown(firstCell)
    fireEvent.mouseUp(firstCell)

    expect(firstCell).toHaveStyle('background-color: rgb(255, 0, 0)')
  })

  test('renders grid correctly', () => {
    render(<App />)
    const gridElement = screen.getByRole('grid')
    expect(gridElement).toBeInTheDocument()
  })
})
