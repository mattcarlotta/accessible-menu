import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import CollapsibleMenu from '../components/CollapsibleMenu'
import Instructions from '../components/Instructions'
import SummaryInstructions from '../components/SummaryInstructions'
import SummaryMenu from '../components/SummaryMenu'

const infoOptions = [
  { href: '/our-story/', title: 'Our Story' },
  { href: '/learn/', title: 'Learn' },
  { href: '/reviews/', title: 'Reviews' }
]

const shopOptions = [
  { href: '/icontinence/', title: 'Incontinence' },
  { href: '/personal-care/', title: 'Personal Care' },
  { href: '/nutrition/', title: 'Nutrition' }
]

const helpOptions = [
  { href: '/privacy/', title: 'Privacy' },
  { href: '/terms-conditions/', title: 'Terms & Conditions' },
  { href: '/sitemap/', title: 'Sitemap' }
]

const Home: NextPage = () => {
  const [viewInstructions, setViewInstructions] = useState(false)
  const [viewSummaryInstructions, setViewSummaryInstructions] = useState(false)

  const toggleViewInstructions = () => {
    setViewInstructions((p) => !p)
  }

  const toggleSummaryInstructions = () => {
    setViewSummaryInstructions((p) => !p)
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-8">
      <Head>
        <title>Mobile Footer Menu Examples</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-8">
        <h1 className="text-7xl text-center">Mobile Footer Menu Examples</h1>
        <hr className="my-8" />
        <h2 className="text-center text-5xl mb-8">Role=&quot;Menu&quot;</h2>
        <button
          type="button"
          className="block p-2 mt-2 bg-primary-500 text-white mx-auto w-48"
          onClick={toggleViewInstructions}
        >
          {viewInstructions ? 'Close' : 'View'} Instructions
        </button>
        {viewInstructions && <Instructions />}
        <CollapsibleMenu title="Info" options={infoOptions} />
        <CollapsibleMenu title="Shop" options={shopOptions} />
        <CollapsibleMenu title="Help" options={helpOptions} defaultOpen />
        <hr className="my-8" />
        <h2 className="text-center text-5xl mb-8">Details Summary</h2>
        <button
          type="button"
          className="block p-2 mt-2 bg-primary-500 text-white mx-auto w-48"
          onClick={toggleSummaryInstructions}
        >
          {viewSummaryInstructions ? 'Close' : 'View'} Instructions
        </button>
        {viewSummaryInstructions && <SummaryInstructions />}
        <SummaryMenu title="Info" options={infoOptions} />
        <SummaryMenu title="Shop" options={shopOptions} />
        <SummaryMenu title="Help" options={helpOptions} defaultOpen />
      </main>
    </div>
  )
}

export default Home
