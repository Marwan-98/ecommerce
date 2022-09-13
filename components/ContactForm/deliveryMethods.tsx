import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/outline'
import { classNames } from 'lib'
import { Dispatch, SetStateAction } from 'react'
import { DeliveryMethod } from 'types'

const DeliveryMethods = ({
  selectedDeliveryMethod,
  setSelectedDeliveryMethod,
  deliveryMethods,
}: {
  selectedDeliveryMethod: Object
  setSelectedDeliveryMethod: Dispatch<SetStateAction<DeliveryMethod>>
  deliveryMethods: DeliveryMethod[]
}) => {
  return (
    <div className="mt-10 border-t border-gray-200 pt-10">
      <RadioGroup
        value={selectedDeliveryMethod}
        onChange={setSelectedDeliveryMethod}
        name="delivery-method"
      >
        <RadioGroup.Label className="text-lg font-medium text-gray-900">
          Delivery method
        </RadioGroup.Label>

        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          {deliveryMethods.map((deliveryMethod) => (
            <RadioGroup.Option
              key={deliveryMethod.id}
              value={deliveryMethod}
              className={({ checked, active }) =>
                classNames(
                  checked ? 'border-transparent' : 'border-gray-300',
                  active ? 'ring-2 ring-indigo-500' : '',
                  'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                )
              }
            >
              {({ checked, active }) => (
                <>
                  <div className="flex flex-1">
                    <div className="flex flex-col">
                      <RadioGroup.Label
                        as="span"
                        className="block text-sm font-medium text-gray-900"
                      >
                        {deliveryMethod.title}
                      </RadioGroup.Label>
                      <RadioGroup.Description
                        as="span"
                        className="mt-1 flex items-center text-sm text-gray-500"
                      >
                        {deliveryMethod.turnaround}
                      </RadioGroup.Description>
                      <RadioGroup.Description
                        as="span"
                        className="mt-6 text-sm font-medium text-gray-900"
                      >
                        {deliveryMethod.price}
                      </RadioGroup.Description>
                    </div>
                  </div>
                  {checked ? (
                    <CheckCircleIcon
                      className="h-5 w-5 text-indigo-600"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div
                    className={classNames(
                      active ? 'border' : 'border-2',
                      checked ? 'border-indigo-500' : 'border-transparent',
                      'pointer-events-none absolute -inset-px rounded-lg'
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}

export default DeliveryMethods
