import { makeSku } from '#mocks'
import { Spacer, Text } from '@commercelayer/app-elements'
import type { Sku } from '@commercelayer/sdk'
import type { FC } from 'react'
import { SkuImage } from './SkuImage'

interface Props {
  sku: Sku
}

export const SkuDescription: FC<Props> = ({ sku = makeSku() }) => {
  return (
    <div className='border-t border-b'>
      <Spacer top='6' bottom='6'>
        <div className='flex items-center gap-6'>
          <SkuImage sku={sku} />
          <Text variant='info'>{sku.description}</Text>
        </div>
      </Spacer>
    </div>
  )
}
