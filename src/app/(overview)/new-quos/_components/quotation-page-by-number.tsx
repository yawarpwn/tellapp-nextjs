import { buttonVariants } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { EditIcon } from '@/icons'
import { fetchQuotationByNumber } from '@/lib/data/quotations'
import { formatDateToLocal, formatNumberToLocal } from '@/lib/utils'
import { getIgv } from '@/lib/utils'
import Link from 'next/link'
import { DeleteButton } from './delete-button'
import { DownloadAndShareButtons } from './download-and-share-buttons'
import { DuplicateButton } from './duplicate-button'
import { IsRegularButton } from './is-regular-button'
import { notFound } from 'next/navigation'
export async function QuotationPageByNumber({ number }: { number: number }) {
  const quotation = await fetchQuotationByNumber({ number })
  if (!quotation) {
    notFound()
  }

  const { formatedIgv, formatedTotal, formatedSubTotal } = getIgv(
    quotation.items,
  )

  return (
    <>
      <header className="flex justify-end gap-x-2">
        <div className="flex gap-2">
          <Link
            href={`/new-quos/${number}/update`}
            className={buttonVariants({ variant: 'secondary' })}
          >
            <EditIcon size={20} />
            <span className="ml-2 hidden lg:block">Editar</span>
          </Link>
          <DownloadAndShareButtons quotation={quotation} />
          <DuplicateButton showTrigger id={quotation.id} />
          <DeleteButton showTrigger id={quotation.id} />
          {quotation.customerId && (
            <IsRegularButton
              id={quotation.customerId}
              isRegular={Boolean(quotation.isRegularCustomer)}
              quotationNumber={quotation.number}
            />
          )}
        </div>
      </header>

      <div className="flex justify-end">
        <div className="text-right">
          <h2 className="text-2xl font-semibold md:text-3xl">Cotización</h2>
          <div className="mt-1 flex justify-end gap-1 text-xl text-yellow-500">
            <span>#</span>
            <span className="font-bold">{quotation.number}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold ">
            {quotation.company ?? 'SIN NOMBRE'}
          </h3>
          <address className="mt-2 not-italic text-muted-foreground ">
            {quotation.address}
          </address>
          <p className="mt-2 text-muted-foreground">
            {quotation.ruc ?? 'SIN RUC'}
          </p>
        </div>
        <div className="space-y-2 sm:text-right">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-1 sm:gap-2">
            <dl className="grid gap-x-3 sm:grid-cols-6">
              <dt className="col-span-3 font-semibold ">Fecha:</dt>
              <dd className="col-span-3 ">
                {formatDateToLocal(quotation.createdAt)}
              </dd>
            </dl>
            <dl className="grid gap-x-3 sm:grid-cols-6">
              <dt className="col-span-3 font-semibold ">Actualizado:</dt>
              <dd className="col-span-3 ">
                {quotation.updatedAt && formatDateToLocal(quotation.updatedAt)}
              </dd>
            </dl>

            <dl className="grid gap-x-3 sm:grid-cols-6">
              <dt className="col-span-3 font-semibold ">Tiempo de entrega:</dt>
              <dd className="col-span-3 ">{quotation.deadline} día(s)</dd>
            </dl>
            <dl className="grid gap-x-3 sm:grid-cols-6">
              <dt className="col-span-3 font-semibold ">Codición de Pago</dt>
              <dd className="col-span-3 ">
                {quotation.credit
                  ? `${quotation.credit} días`
                  : '50% Adelanto '}
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>DESCRIPCION</TableHead>
            <TableHead>U/M</TableHead>
            <TableHead>CANT</TableHead>
            <TableHead>P.BASE</TableHead>
            <TableHead>P.UNIT</TableHead>
            <TableHead>MONTO</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quotation.items.map(item => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="min-w-[250px]">{item.description}</div>
              </TableCell>
              <TableCell>{item.unit_size}</TableCell>
              <TableCell className="text-center">{item.qty}</TableCell>
              <TableCell className="text-center">
                {(item.price / 1.18).toFixed(4)}
              </TableCell>
              <TableCell>{formatNumberToLocal(item.price)}</TableCell>
              <TableCell className="text-right">
                {formatNumberToLocal(item.price * item.qty)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="justify-end" aria-colspan={6}>
          <TableRow>
            <TableCell colSpan={6}>
              <div className="flex justify-end gap-4">
                <span>Subtotal</span>
                <span className="w-[100px] text-right">{formatedSubTotal}</span>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={6}>
              <div className="flex justify-end gap-4">
                <span>Igv</span>
                <span className="w-[100px] text-right">{formatedIgv}</span>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={6}>
              <div className="flex justify-end gap-4">
                <span>Total</span>
                <span className="w-[100px] text-right">{formatedTotal}</span>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  )
}
