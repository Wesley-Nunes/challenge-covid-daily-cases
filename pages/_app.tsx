import React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from '../src/lib/createEmotionCache'
import { DateProvider } from '../src/lib/context/dateContext'

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  return (
    <CacheProvider value={emotionCache}>
      <DateProvider>
        <Head>
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>
        <CssBaseline />
        <Component {...pageProps} />
      </DateProvider>
    </CacheProvider>
  )
}
