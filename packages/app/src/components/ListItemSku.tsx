import { makeSku } from '#mocks'
import {
  Avatar,
  ListItem,
  StatusIcon,
  Text,
  navigateTo
} from '@commercelayer/app-elements'
import type { Sku } from '@commercelayer/sdk'
import type { FC } from 'react'
import { useLocation } from 'wouter'

interface Props {
  resource?: Sku
  isLoading?: boolean
  delayMs?: number
}

export const ListItemSku: FC<Props> = ({ resource = makeSku() }) => {
  const [, setLocation] = useLocation()

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
      {...navigateTo({
        setLocation,
        destination: {
          app: 'customers',
          resourceId: resource.id
        }
      })}
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
