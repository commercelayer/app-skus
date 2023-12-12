import {
  Button,
  EmptyState,
  PageLayout,
  ResourceTags,
  SkeletonTemplate,
  Spacer,
  goBack,
  useTokenProvider
} from '@commercelayer/app-elements'
import { Link, useLocation, useRoute } from 'wouter'

import { ScrollToTop } from '#components/ScrollToTop'
import { SkuDescription } from '#components/SkuDescription'
import { SkuInfo } from '#components/SkuInfo'
import { appRoutes } from '#data/routes'
import { useSkuDetails } from '#hooks/useSkuDetails'
import { isMockedId } from '#mocks'
import type { FC } from 'react'

export const SkuDetails: FC = () => {
  const {
    settings: { mode }
  } = useTokenProvider()
  const [, setLocation] = useLocation()
  const [, params] = useRoute<{ skuId: string }>(appRoutes.details.path)

  const skuId = params?.skuId ?? ''

  const { sku, isLoading, error } = useSkuDetails(skuId)

  if (error != null) {
    return (
      <PageLayout
        title='Skus'
        onGoBack={() => {
          setLocation(appRoutes.list.makePath())
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

  return (
    <PageLayout
      mode={mode}
      title={
        <SkeletonTemplate isLoading={isLoading}>{pageTitle}</SkeletonTemplate>
      }
      description={
        <SkeletonTemplate isLoading={isLoading}>{sku.code}</SkeletonTemplate>
      }
      onGoBack={() => {
        goBack({
          setLocation,
          defaultRelativePath: appRoutes.list.makePath()
        })
      }}
      gap='only-top'
    >
      <ScrollToTop />
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
