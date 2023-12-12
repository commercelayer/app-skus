import { makeSku } from '#mocks'
import type { Sku } from '@commercelayer/sdk'
import type { FC } from 'react'

interface Props {
  sku: Sku
}

export const SkuImage: FC<Props> = ({ sku = makeSku() }) => {
  if (sku.image_url == null) return <></>
  return (
    <img
      width={96}
      height={96}
      alt={sku.name}
      src={sku.image_url as `https://${string}`}
      className='border object-contain object-center rounded border-gray-100'
    />
  )
}
