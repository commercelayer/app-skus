import { makeSku } from '#mocks'
import type { Sku } from '@commercelayer/sdk'

interface Props {
  sku: Sku
}

export function SkuImage({ sku = makeSku() }: Props): JSX.Element {
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
