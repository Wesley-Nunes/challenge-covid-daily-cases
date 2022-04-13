import React, { useState } from 'react'
import { Box, Slider } from '@mui/material'

const DateSlider = ({ dates }): JSX.Element => {
  const [value, setValue] = useState<number>(0)
  const handleChange = (event: Event, newValue: number): void => {
    setValue(newValue as number)
  }
  const valuetext = (value: number): string => {
    const date = Object.values(dates[value])[0]
    const [year, month, day] = (date as string).split('-')
    return `${day}/${month}/${year}`
  }
  const marks = [
    { value: 0, label: 'Maio/2020' },
    { value: 9, label: 'Setembro/2020' },
    { value: 17, label: 'Janeiro/2021' },
    { value: 26, label: 'Maio/2021' },
    { value: 35, label: 'Setembro/2021' },
    { value: 44, label: 'Janeiro/2022' }
  ]

  return (
    <Box sx={{ width: 1024, paddingY: 8 }}>
      <Slider
        aria-label='Date'
        value={value}
        onChange={handleChange}
        getAriaValueText={valuetext}
        valueLabelFormat={valuetext}
        valueLabelDisplay='on'
        marks={marks}
        min={0}
        max={44}
        step={1}
      />
    </Box>
  )
}

export default DateSlider
