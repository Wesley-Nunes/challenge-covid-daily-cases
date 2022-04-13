import React from 'react'
import { NextPage, GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import { Container } from '@mui/material'

import supabaseClient from '../src/lib/supabaseClient'
import ApiData from '../src/lib/ApiData'
import DateSlider from '../src/components/DateSlider/DateSlider'
const WorldMap = dynamic(import('../src/components/WorldMap/WorldMap'), {
  ssr: false
})

const Home: NextPage = props => (
  <Container>
    <DateSlider dates={props['dates']} />
    <WorldMap covidData={props['covidData']} />
  </Container>
)

export const getStaticProps: GetStaticProps = async () => {
  const date = '2020-05-11'

  const { data: dates } = await supabaseClient
    .from('dates')
    .select('*')
    .order('dates', { ascending: true })

  const { data: covid_daily_cases } = await supabaseClient
    .from('covid_daily_cases')
    .select('*')
    .eq('date', date)

  const CovidApiData = new ApiData(covid_daily_cases)
  CovidApiData.extractCountries()
  const countries = CovidApiData.getCountries
  countries.forEach(country => CovidApiData.clean(country))
  const covidData = CovidApiData.getCleanData

  return {
    props: {
      dates,
      covidData
    }
  }
}

export default Home
