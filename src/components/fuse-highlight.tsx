import { ProductType } from '@/types'
import Fuse from 'fuse.js'
import React from 'react'
// "matches": [
//    {
//      "indices": [
//        [
//          0,
//          2
//        ]
//      ],
//      "value": "fresa"
//    }
//  ],

type RangeTuple = [number, number]

// Finds `obj[path][to][key]` from `path.to.key`
const resolveAttribute = (obj: ProductType, key: string) =>
  key.split('.').reduce((prev, curr) => prev?.[curr], obj)

// Recursively builds JSX output adding `<mark>` tags around matches
const highlight = (value: string, indices: RangeTuple[] = [], i = 1) => {
  const pair = indices[indices.length - i]
  return !pair ? (
    value
  ) : (
    <>
      {highlight(value.substring(0, pair[0]), indices, i + 1)}
      <mark>{value.substring(pair[0], pair[1] + 1)}</mark>
      {value.substring(pair[1] + 1)}
    </>
  )
}

type Props = {
  hit: Fuse.FuseResult<ProductType>
  attribute: string
}
export function FuseHighLight({ hit, attribute }: Props) {
  const matches =
    typeof hit.item === 'string'
      ? hit.matches?.[0]
      : hit.matches?.find(m => m.key === attribute)
  const fallback =
    typeof hit.item === 'string'
      ? hit.item
      : resolveAttribute(hit.item, attribute)
  return highlight(matches?.value || fallback, matches?.indices)
}
