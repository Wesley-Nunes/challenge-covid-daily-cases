import React from 'react'
import { GetStaticProps } from 'next'

import supabaseClient from '../lib/supabaseClient'

export const getStaticProps: GetStaticProps = async () => {
  let { data: covid_daily_cases, error } = await supabaseClient
    .from('covid_daily_cases')
    .select('*')
    .range(0, 9)

  if (error) {
    throw new Error(error.message)
  }

  return {
    props: {
      covid_daily_cases
    }
  }
}

const Home = ({ covid_daily_cases }): JSX.Element => (
  <>
    <h1>Covid Cases!</h1>
    <p>{JSON.stringify(covid_daily_cases)}</p>
  </>
)

export default Home
