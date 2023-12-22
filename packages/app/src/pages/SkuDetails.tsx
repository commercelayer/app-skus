import {
  Button,
  Dropdown,
  DropdownItem,
  EmptyState,
  PageLayout,
  ResourceTags,
  SkeletonTemplate,
  Spacer,
  goBack,
  useTokenProvider
} from '@commercelayer/app-elements'
import { Link, useLocation, useRoute } from 'wouter'

import { SkuDescription } from '#components/SkuDescription'
import { SkuInfo } from '#components/SkuInfo'
import { appRoutes } from '#data/routes'
import { useSkuDetails } from '#hooks/useSkuDetails'
import { isMockedId } from '#mocks'
import type { FC } from 'react'

export const SkuDetails: FC = () => {
  const {
    settings: { mode },
    canUser
  } = useTokenProvider()

  const [, setLocation] = useLocation()
  const [, params] = useRoute<{ skuId: string }>(appRoutes.details.path)

  const skuId = params?.skuId ?? ''

  const { sku, isLoading, error } = useSkuDetails(skuId)

  if (error != null) {
    return (
      <PageLayout
        title='Skus'
        navigationButton={{
          onClick: () => {
            setLocation(appRoutes.list.makePath())
          },
          label: 'SKUs',
          icon: 'arrowLeft'
        }}
        mode={mode}
      >
        <EmptyState
          title='Not authorized'
          action={
            <Link href={appRoutes.list.makePath()}>
              <Button variant='primary'>Go back</Button>
            </Link>
          }
        />
      </PageLayout>
    )
  }

  const pageTitle = sku.name

  const contextMenuEdit = canUser('update', 'skus') && (
    <DropdownItem
      label='Edit'
      onClick={() => {
        setLocation(appRoutes.edit.makePath(skuId))
      }}
    />
  )

  const contextMenu = <Dropdown dropdownItems={<>{contextMenuEdit}</>} />

  return (
    <PageLayout
      mode={mode}
      title={
        <SkeletonTemplate isLoading={isLoading}>{pageTitle}</SkeletonTemplate>
      }
      description={
        <SkeletonTemplate isLoading={isLoading}>{sku.code}</SkeletonTemplate>
      }
      navigationButton={{
        onClick: () => {
          goBack({
            setLocation,
            defaultRelativePath: appRoutes.list.makePath()
          })
        },
        label: 'SKUs',
        icon: 'arrowLeft'
      }}
      actionButton={contextMenu}
      scrollToTop
      gap='only-top'
    >
      <SkeletonTemplate isLoading={isLoading}>
        <Spacer bottom='4'>
          {!isMockedId(sku.id) && (
            <Spacer top='6'>
              <ResourceTags
                resourceType='skus'
                resourceId={sku.id}
                overlay={{ title: 'Edit tags', description: pageTitle }}
                onTagClick={(tagId) => {
                  setLocation(appRoutes.list.makePath(`tags_id_in=${tagId}`))
                }}
              />
            </Spacer>
          )}
          <Spacer top='14'>
            <SkuDescription sku={sku} />
          </Spacer>
          <Spacer top='14'>
            <SkuInfo sku={sku} />
          </Spacer>
        </Spacer>
      </SkeletonTemplate>
    </PageLayout>
  )
}
