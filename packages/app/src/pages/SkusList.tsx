import { ListEmptyState } from '#components/ListEmptyState'
import { ListItemSku } from '#components/ListItemSku'
import { instructions } from '#data/filters'
import { appRoutes } from '#data/routes'
import {
  EmptyState,
  PageLayout,
  Spacer,
  useResourceFilters,
  useTokenProvider
} from '@commercelayer/app-elements'
import { useLocation } from 'wouter'
import { navigate, useSearch } from 'wouter/use-location'

export function SkusList(): JSX.Element {
  const {
    canUser,
    dashboardUrl,
    settings: { mode }
  } = useTokenProvider()

  const queryString = useSearch()
  const [, setLocation] = useLocation()

  const { SearchWithNav, FilteredList } = useResourceFilters({
    instructions
  })

  if (!canUser('read', 'skus')) {
    return (
      <PageLayout title='SKUs' mode={mode}>
        <EmptyState title='You are not authorized' />
      </PageLayout>
    )
  }

  return (
    <PageLayout
      title='SKUs'
      mode={mode}
      gap='only-top'
      onGoBack={() => {
        window.location.href =
          dashboardUrl != null ? `${dashboardUrl}/hub` : '/'
      }}
    >
      <SearchWithNav
        queryString={queryString}
        onUpdate={(qs) => {
          navigate(`?${qs}`, {
            replace: true
          })
        }}
        onFilterClick={(queryString) => {
          setLocation(appRoutes.filters.makePath(queryString))
        }}
        hideFiltersNav={false}
      />

      <Spacer bottom='14'>
        <FilteredList
          type='skus'
          ItemTemplate={ListItemSku}
          query={{
            pageSize: 25,
            sort: {
              updated_at: 'desc'
            }
          }}
          emptyState={<ListEmptyState />}
        />
      </Spacer>
    </PageLayout>
  )
}
