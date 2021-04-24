import { Layer, Rect } from 'react-konva'

export const Board = () => {
  return (
    <Layer listening={false}>
      <Rect x={1} y={1} width={200} height={200} stroke="blue" />
    </Layer>
  )
}
