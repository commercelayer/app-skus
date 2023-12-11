import { makeSku } from '#mocks'
import { ListDetailsItem, Section, Text } from '@commercelayer/app-elements'
import type { Sku } from '@commercelayer/sdk'

interface Props {
  sku: Sku
}

export function SkuInfo({ sku = makeSku() }: Props): JSX.Element {
  return (
    <Section title='Info'>
      <ListDetailsItem label='Shipping category' childrenAlign='right'>
        <Text tag='div' weight='semibold' className='capitalize'>
          {sku.shipping_category?.name}
        </Text>
      </ListDetailsItem>
      <ListDetailsItem label='Weight' childrenAlign='right'>
        {sku.weight != null && sku.weight > 0 ? (
          <Text tag='div' weight='semibold' className='capitalize'>
            {sku.weight} {sku.unit_of_weight}
          </Text>
        ) : null}
      </ListDetailsItem>
      <ListDetailsItem label='Shipping' childrenAlign='right'>
        {sku.do_not_ship != null && sku.do_not_ship ? (
          <Text tag='div' weight='semibold' className='capitalize'>
            {sku.do_not_ship ? 'Do not ship' : ''}
          </Text>
        ) : null}
      </ListDetailsItem>
      <ListDetailsItem label='Tracking' childrenAlign='right'>
        {sku.do_not_track != null && sku.do_not_track ? (
          <Text tag='div' weight='semibold' className='capitalize'>
            {sku.do_not_track ? 'Do not track' : ''}
          </Text>
        ) : null}
      </ListDetailsItem>
      <ListDetailsItem label='Pieces per pack' childrenAlign='right'>
        {sku.pieces_per_pack != null && sku.pieces_per_pack > 0 ? (
          <Text tag='div' weight='semibold' className='capitalize'>
            {sku.pieces_per_pack} {sku.pieces_per_pack > 1 ? 'pieces' : 'piece'}
          </Text>
        ) : null}
      </ListDetailsItem>
    </Section>
  )
}
