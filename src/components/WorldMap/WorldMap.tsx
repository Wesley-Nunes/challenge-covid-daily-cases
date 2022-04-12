import React from 'react'
import Plot from 'react-plotly.js'

import IData from '../../interfaces/IData'

const unpack = (data, prop) => data.map(item => item[prop])

const WorldMap = ({ covidData }: { covidData: Array<IData> }): JSX.Element => (
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

export default WorldMap
