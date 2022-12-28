import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import SideBar from '../components/sidebar'
import Feed from '../components/feed'
import Modal from '../components/modal'
import axios from 'axios'
import { getProviders, getSession, useSession } from "next-auth/react";
import WidgetsN from './api/jsonWidget'
import Widgets from '../components/widgets'
import UserWidgets from './api/userWidget'
import { useEffect, useState } from 'react'
import Login from '../components/login'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import MobileMenu from '../components/mobilemenu'

export default function Home({ providers }) {
  const [isOpen, setIsOpen] = useRecoilState(modalState)
  const { data: session } = useSession()

  if (!session) return <Login providers={providers} />
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Twitter-Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/Twitter-logo.svg" />
      </Head>
      <main className='h-[400px] flex max-w-[1500px] mx-auto min-h-screen'>
        <SideBar />
        <Feed />
        <Widgets WidgetsN={WidgetsN} UserWidgets={UserWidgets} />
        {isOpen && <Modal />}
        <MobileMenu />
      </main>
    </div>

  )
}

export async function getServerSideProps(context) {

  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      providers,
      session,
    },
  };
}