import {
  Button,
  Grid,
  HookedForm,
  HookedInput,
  HookedInputCheckbox,
  HookedInputSelect,
  HookedInputTextArea,
  HookedValidationApiError,
  Section,
  Spacer,
  Text,
  useCoreSdkProvider
} from '@commercelayer/app-elements'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type UseFormSetError } from 'react-hook-form'
import { z } from 'zod'

import { useShippingCategoriesList } from '#hooks/useShippingCategoriesList'
import { fetchShippingCategories } from '#utils/fetchShippingCategories'

import type { ShippingCategory } from '@commercelayer/sdk'

const skuFormSchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  shippingCategory: z.string().min(1).or(z.undefined()),
  piecesPerPack: z.string().optional(),
  hsTariffNumber: z.string().optional(),
  doNotShip: z.boolean().optional(),
  doNotTrack: z.boolean().optional(),
  weight: z.string().length(0).or(z.undefined()).or(z.string().min(1)),
  unitOfWeight: z
    .string()
    .length(0)
    .or(z.undefined())
    .or(z.enum(['gr', 'lb', 'oz']))
})

export type SkuFormValues = z.infer<typeof skuFormSchema>

interface Props {
  defaultValues?: Partial<SkuFormValues>
  isSubmitting: boolean
  onSubmit: (
    formValues: SkuFormValues,
    setError: UseFormSetError<SkuFormValues>
  ) => void
  apiError?: any
}

export function SkuForm({
  defaultValues,
  onSubmit,
  apiError,
  isSubmitting
}: Props): JSX.Element {
  const methods = useForm<SkuFormValues>({
    defaultValues,
    resolver: zodResolver(skuFormSchema)
  })

  const { shippingCategories } = useShippingCategoriesList({})
  const unitsOfWeight = [
    { label: 'grams', value: 'gr' },
    { label: 'pounds', value: 'lb' },
    { label: 'ounces', value: 'oz' }
  ]

  /*
   * `isLoadingShippingCategories` is needed/wanted here because `isLoading` prop available from `useCoreApi` does not reflect with precision the fact that data is filled or not.
   * It might happen that `isLoading` is `false` and `shippingCategories` is still `undefined` for a while.
   */
  const isLoadingShippingCategories = shippingCategories === undefined

  return (
    <HookedForm
      {...methods}
      onSubmit={(formValues) => {
        onSubmit(formValues, methods.setError)
      }}
    >
      <Section title='Basic info'>
        <Spacer top='6' bottom='4'>
          <HookedInput
            name='name'
            label='Name'
            hint={{
              text: (
                <Text variant='info'>
                  Pick a name that helps you identify it.
                </Text>
              )
            }}
          />
        </Spacer>
        <Spacer top='6' bottom='4'>
          <HookedInput
            name='code'
            label='SKU code'
            hint={{
              text: (
                <Text variant='info'>
                  A unique code to identify the product variant.{' '}
                  <a
                    href='https://docs.commercelayer.io/core/v/api-reference/skus'
                    target='_blank'
                    rel='noreferrer'
                  >
                    Learn more.
                  </a>
                </Text>
              )
            }}
          />
        </Spacer>
        <Spacer top='6' bottom='12'>
          <Grid columns='auto'>
            <HookedInputTextArea
              name='description'
              label='Description'
              placeholder='A brief description'
              hint={{
                text: <Text variant='info'>Best suited for internal use.</Text>
              }}
            />
            <Spacer top='8' />
          </Grid>
        </Spacer>
      </Section>

      <Section title='Shipping info'>
        {!isLoadingShippingCategories && (
          <Spacer top='6' bottom='4'>
            <Select options={shippingCategories} />
          </Spacer>
        )}
        <Spacer top='6' bottom='12'>
          <Grid columns='auto' alignItems='end'>
            <HookedInput name='weight' label='Weight' />
            <HookedInputSelect
              name='unitOfWeight'
              initialValues={unitsOfWeight.map(({ value, label }) => ({
                value,
                label
              }))}
              pathToValue='value'
            />
          </Grid>
          <Spacer top='2'>
            <Text variant='info' size='small'>
              Used to automatically calculate shipping weight.
            </Text>
          </Spacer>
        </Spacer>
      </Section>

      <Section title='Additional info'>
        <Spacer top='6' bottom='4'>
          <HookedInput
            type='number'
            name='piecesPerPack'
            label='Pieces per pack'
            hint={{
              text: (
                <Text variant='info'>
                  Manage items with higher quantities per pack.
                </Text>
              )
            }}
          />
        </Spacer>
        <Spacer top='6' bottom='12'>
          <HookedInput
            name='hsTariffNumber'
            label='HS Code'
            hint={{
              text: (
                <Text variant='info'>
                  Used by customs authorities to identify products.
                </Text>
              )
            }}
          />
        </Spacer>
      </Section>

      <Section title='Options'>
        <Spacer top='4' bottom='4'>
          <Text variant='info' size='small'>
            Manage different scenarios, such as digital products with no
            shipments, or products with virtually unlimited stock.
          </Text>
        </Spacer>
        <Spacer top='6' bottom='2'>
          <HookedInputCheckbox name='doNotShip'>
            <Text weight='semibold' size='small'>
              Do not ship
            </Text>
          </HookedInputCheckbox>
        </Spacer>
        <Spacer top='2' bottom='12'>
          <HookedInputCheckbox name='doNotTrack'>
            <Text weight='semibold' size='small'>
              Do not track
            </Text>
          </HookedInputCheckbox>
        </Spacer>
      </Section>

      <Spacer top='14'>
        <Button
          type='submit'
          disabled={isSubmitting || isLoadingShippingCategories}
          className='w-full'
        >
          {defaultValues?.name != null && defaultValues.name.length === 0
            ? 'Create'
            : 'Update'}
        </Button>
        <HookedValidationApiError apiError={apiError} />
      </Spacer>
    </HookedForm>
  )
}

function Select({
  options
}: {
  options: ShippingCategory[]
}): JSX.Element | null {
  const { sdkClient } = useCoreSdkProvider()

  return (
    <HookedInputSelect
      label='Shipping category'
      name='shippingCategory'
      initialValues={options.map(({ id, name }) => ({
        value: id,
        label: name
      }))}
      isClearable
      pathToValue='value'
      loadAsyncValues={async (hint) => {
        const list = await fetchShippingCategories({ sdkClient, hint })
        return list.map(({ id, name }) => ({
          value: id,
          label: name
        }))
      }}
      hint={{
        text: (
          <Text variant='info'>
            Used to manage different{' '}
            <a
              href='https://docs.commercelayer.io/core/v/api-reference/shipping_methods'
              target='_blank'
              rel='noreferrer'
            >
              shipping methods
            </a>
            . Optional for 'Do not ship'.
          </Text>
        )
      }}
    />
  )
}
