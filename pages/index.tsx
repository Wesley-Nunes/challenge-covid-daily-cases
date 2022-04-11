import React from 'react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'

const WorldMap = dynamic(import('../components/WorldMap/WorldMap'), {
  ssr: false
})

const Home: NextPage = () => (
  <>
    <WorldMap />
  </>
)

export default Home
