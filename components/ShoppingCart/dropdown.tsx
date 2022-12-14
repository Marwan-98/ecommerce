import React from 'react'

type props = {
  values: string[] | number[]
  defaultValue?: string | number
  onChange: (value: string) => void
}
function Dropdown({ values, defaultValue, onChange }: props) {
  return (
    <select
      id="quantity"
      name="quantity"
      onChange={(e) => onChange(e.target.value)}
      className="rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
      defaultValue={defaultValue}
    >
      {values.map((i, idx) => {
        return (
          <option value={i} key={values[idx]}>
            {i}
          </option>
        )
      })}
    </select>
  )
}

export default Dropdown
