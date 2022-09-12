import { RadioGroup } from '@headlessui/react'
import { classNames } from 'lib'
import { Dispatch, SetStateAction } from 'react'
import { Color, Product } from 'types'

const productColors = ({
  findProduct,
  selectedColor,
  setSelectedColor,
}: {
  findProduct: Product
  selectedColor: Color
  setSelectedColor: Dispatch<SetStateAction<Color>>
}) => {
  return (
    <form className="mt-10">
      <div>
        <h3 className="text-sm font-medium text-gray-900">Color</h3>
        <RadioGroup
          value={selectedColor}
          onChange={setSelectedColor}
          className="mt-4"
        >
          <RadioGroup.Label className="sr-only">
            Choose a color
          </RadioGroup.Label>
          <div className="flex items-center space-x-3">
            {findProduct?.colors.map((color) => (
              <RadioGroup.Option
                key={color.name}
                value={color}
                className={({ active, checked }) =>
                  classNames(
                    color.selectedClass,
                    active && checked ? 'ring ring-offset-1' : '',
                    !active && checked ? 'ring-2' : '',
                    'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                  )
                }
              >
                <RadioGroup.Label as="span" className="sr-only">
                  {color.name}
                </RadioGroup.Label>
                <span
                  aria-hidden="true"
                  className={classNames(
                    color.class,
                    'h-8 w-8 rounded-full border border-black border-opacity-10'
                  )}
                />
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </form>
  )
}

export default productColors
