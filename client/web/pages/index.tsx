import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Red-Binder</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <Link href={'/'}> Red-Binder</Link>
        <Link href={'/login'}> Login</Link>
        <Link href={'/signup'}> Signup</Link>
        <Link href={'/dashboard'}> dashboard</Link>

      </header>

      <main>
       asdfasdf
      </main>

      <footer>
      asdfasdf
      </footer>
    </div>
  )
}

export default Home
