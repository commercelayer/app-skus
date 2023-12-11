import { makeSku } from '#mocks'
import { Avatar, ListItem, StatusIcon, Text } from '@commercelayer/app-elements'
import type { Sku } from '@commercelayer/sdk'

interface Props {
  resource?: Sku
  isLoading?: boolean
  delayMs?: number
}

export function ListItemSku({ resource = makeSku() }: Props): JSX.Element {
  return (
    <ListItem
      tag='a'
      icon={
        <Avatar
          alt={resource.name}
          src={resource.image_url as `https://${string}`}
        />
      }
      alignItems='center'
      onClick={undefined}
    >
      <div>
        <Text tag='div' weight='semibold'>
          {resource.code}
        </Text>
        <Text tag='div' weight='medium' size='small' variant='info'>
          {resource.name}
        </Text>
      </div>
      <div>
        <StatusIcon name='caretRight' />
      </div>
    </ListItem>
  )
}
