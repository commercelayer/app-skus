import {
  A,
  Button,
  EmptyState,
  useTokenProvider
} from '@commercelayer/app-elements'
import { Link } from 'wouter'

export function ListEmptyState(): JSX.Element {
  const { canUser } = useTokenProvider()

  if (canUser('create', 'skus')) {
    return (
      <EmptyState
        title='No SKUs yet!'
        description='Create your first SKU'
        action={
          <Link href='#'>
            <Button variant='primary'>New SKU</Button>
          </Link>
        }
      />
    )
  }

  return (
    <EmptyState
      title='No SKUs yet!'
      description={
        <div>
          <p>Add a SKU with the API, or use the CLI.</p>
          <A
            target='_blank'
            href='https://docs.commercelayer.io/core/v/api-reference/skus'
            rel='noreferrer'
          >
            View API reference.
          </A>
        </div>
      }
    />
  )
}
