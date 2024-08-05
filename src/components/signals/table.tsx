import { NoResultRow } from '@/components/no-result-row'
import { SignalDeleteFormButton, SignalEditFormButton } from '@/components/signals/signal-button'
import { fetchFilteredSignals } from '@/lib/data/signals'

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

export interface Props {
  currentPage: number
  query: string
}

export async function SignalsTable({ query, currentPage }: Props) {
  const signals = await fetchFilteredSignals(query, currentPage)
  const hasSignals = signals && signals.length > 0
  return (
    <div className="mt-4 overflow-x-auto">
      <Table className="table-sm table">
        <TableBody>
          {hasSignals ? (
            signals.map(signal => (
              <TableRow key={signal.id}>
                <TableCell>
                  <div className="h-12 w-12 ">
                    <img
                      alt={signal.title}
                      className="h-full w-full object-contain"
                      src={`https://res.cloudinary.com/tellsenales-cloud/image/upload/c_scale,w_40/${signal.public_id}.${signal.format}`}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="min-w-[250px]">{signal.title}</div>
                </TableCell>
                <TableCell>{signal.category}</TableCell>
                <TableCell>{signal.code.toUpperCase()}</TableCell>
                <TableCell>{signal.width}</TableCell>
                <TableCell>{signal.height}</TableCell>
                <TableCell>{signal.format}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <SignalEditFormButton item={signal} />
                    <SignalDeleteFormButton id={signal.id} publicId={signal.public_id} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <NoResultRow query={query} colSpan={7} />
          )}
        </TableBody>
      </Table>
    </div>
  )
}
