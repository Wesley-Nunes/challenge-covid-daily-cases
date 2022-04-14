import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import { Container } from '@mui/material'

import supabaseClient from '../src/lib/supabaseClient'
import DateSlider from '../src/components/DateSlider/DateSlider'

const WorldMap = dynamic(import('../src/components/WorldMap/WorldMap'), {
  ssr: false
})

const Home: NextPage = props => {
  return (
    <Container>
      <DateSlider dates={props['dates']} />
      <WorldMap />
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: dates } = await supabaseClient
    .from('dates')
    .select('*')
    .order('dates', { ascending: true })

  return {
    props: {
      dates
    }
  }
}

export default Home
