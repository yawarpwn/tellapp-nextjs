import { useDragAndDrop } from '@formkit/drag-and-drop/react'

export function DragAndDrop() {
  const [parent, tapes] = useDragAndDrop<HTMLUListElement, string>([
    'Depeche Mode',
    'Duran Duran',
    'Pet Shop Boys',
    'Kraftwerk',
    'Tears for Fears',
    'Spandau Ballet',
  ])
  return (
    <ul ref={parent}>
      {tapes.map(tape => (
        <li className="cassette" data-label={tape} key={tape}>
          {tape}
        </li>
      ))}
    </ul>
  )
}
