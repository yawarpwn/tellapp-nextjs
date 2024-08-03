interface Props {
  query: string
  colSpan: number
}
export function NoResultRow({ query, colSpan = 5 }: Props) {
  return (
    <tr>
      <td colSpan={colSpan}>
        <div className="flex min-h-[550px] items-center justify-center text-center">
          <p>
            No se encontraro resultados para <strong>{query}</strong>
          </p>
        </div>
      </td>
    </tr>
  )
}
