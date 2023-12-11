import { makeSku } from '#mocks'
import { Spacer, Text } from '@commercelayer/app-elements'
import type { Sku } from '@commercelayer/sdk'
import { SkuImage } from './SkuImage'

interface Props {
  sku: Sku
}

export function SkuDescription({ sku = makeSku() }: Props): JSX.Element {
  return (
    <div className='border-t border-b'>
      <Spacer top='4' bottom='4'>
        <div className='flex items-center gap-6'>
          <SkuImage sku={sku} />
          <Text variant='info' size='small'>
            {sku.description}
          </Text>
        </div>
      </Spacer>
    </div>
  )
}
