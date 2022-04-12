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
    <DateSlider />
    <WorldMap covidData={props['covidData']} />
  </Container>
)

export const getStaticProps: GetStaticProps = async () => {
  const date = '2021-03-22'
  const { data: covid_daily_cases, error } = await supabaseClient
    .from('covid_daily_cases')
    .select('*')
    .eq('date', date)

  if (error) {
    throw new Error(error.message)
  }

  const CovidApiData = new ApiData(covid_daily_cases)
  CovidApiData.extractCountries()
  const countries = CovidApiData.getCountries
  countries.forEach(country => CovidApiData.clean(country))
  const covidData = CovidApiData.getCleanData

  return {
    props: {
      covidData
    }
  }
}

export default Home
