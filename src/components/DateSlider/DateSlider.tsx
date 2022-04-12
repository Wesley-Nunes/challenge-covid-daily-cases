import React, { useState } from 'react'
import { Box, Slider } from '@mui/material'

const getNumbersOfDays = (num: number): number =>
  num <= 30 ? num : getNumbersOfDays(num - 30)

const fixDateFormat = (num: number): string =>
  `${num}`.length === 1 ? `0${num}` : `${num}`

const DateSlider = (): JSX.Element => {
  const [value, setValue] = useState<number>(130)
  const handleChange = (event: Event, newValue: number): void => {
    setValue(newValue as number)
  }
  const marks = [
    { value: 121, label: 'Maio/2020' },
    { value: 231, label: 'Setembro/2020' },
    { value: 361, label: 'Janeiro/2021' },
    { value: 481, label: 'Maio/2021' },
    { value: 591, label: 'Setembro/2021' },
    { value: 721, label: 'Janeiro/2022' }
  ]
  const valuetext = (value: number): string => {
    const year = value > 360 ? '2021' : '2020'
    const daysInYear = year === '2021' ? value - 360 : value
    const month = Math.ceil(daysInYear / 30)
    const days = getNumbersOfDays(daysInYear)

    // Format To Context
    // `${year}-${fixDateFormat(month)}-${fixDateFormat(days)}`

    return `${fixDateFormat(days)}/${fixDateFormat(month)}/${year}`
  }

  return (
    <Box sx={{ width: 1024, paddingY: 8 }}>
      <Slider
        aria-label='Date'
        getAriaValueText={valuetext}
        valueLabelFormat={valuetext}
        valueLabelDisplay='on'
        value={value}
        onChange={handleChange}
        marks={marks}
        min={130}
        max={720}
        step={1}
      />
    </Box>
  )
}

export default DateSlider
