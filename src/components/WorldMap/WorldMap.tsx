import React, { useEffect, useState } from 'react'
import Plot from 'react-plotly.js'

import ApiData from '../../lib/ApiData'
import { useDate } from '../../lib/context/dateContext'
import supabaseClient from '../../lib/supabaseClient'

const unpack = (data, prop) => data.map(item => item[prop])

const WorldMap = () => {
  const [data, setData] = useState([])
  const { date } = useDate()
  const CovidApiData = new ApiData(data)
  CovidApiData.extractCountries()
  const countries = CovidApiData.getCountries
  countries.forEach(country => CovidApiData.clean(country))
  const covidData = CovidApiData.getCleanData

  useEffect(() => {
    async function requestApi() {
      const { data: covid_daily_cases } = await supabaseClient
        .from('covid_daily_cases')
        .select('*')
        .eq('date', date)

      setData(covid_daily_cases)
    }
    requestApi()
  }, [date])

  return (
    <Plot
      data={[
        {
          type: 'choropleth',
          locationmode: 'country names',
          locations: unpack(covidData, 'location'),
          z: unpack(covidData, 'num_sequences_total'),
          text: unpack(covidData, 'hover'),
          hovertemplate:
            '<i>País</i>: <b>%{location}</b><br><br>' +
            '<i>Variantes</i>: <b>%{text}</b><br><br>' +
            '<b>Total: %{z}</b>'
        }
      ]}
      layout={{
        title: 'Casos Diários de Covid-19 pelo Mundo',
        height: 768,
        width: 1024
      }}
    />
  )
}

export default WorldMap
