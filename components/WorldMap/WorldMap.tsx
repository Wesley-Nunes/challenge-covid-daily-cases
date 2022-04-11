import React from 'react'
import Plot from 'react-plotly.js'

const WorldMap = (): JSX.Element => (
  <Plot
    data={[{ type: 'choropleth', locationmode: 'country names' }]}
    layout={{
      title: 'Casos Diários de Covid-19 pelo Mundo',
      height: 768,
      width: 1024
    }}
  />
)

export default WorldMap
