import React, { useState, useEffect } from 'react'
import axios from 'axios'
import API_URL from '../API_URL'
import { Iaccount } from '../interfaces'
import { Link } from "react-router-dom";
import AddAccount from '../components/AddAccount'
import Loading from '../components/Loading'

const Home: React.FC = () => {
  const [isAddAcountModalOpen, setIsAddAcountModalOpen] = useState<boolean>(false)
  const [accounts, setAccounts] = useState<Iaccount[]>([])
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAccounts = async () => {
    await axios.get(`${API_URL}/accounts`)
    .then(res => {
      setAccounts(res.data);
      setLoading(false);
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchAccounts()
  }, [])

  const accountsMap = accounts.map((account:Iaccount) => {
    return (
      <Link
        key={account._id}
        to={`/${account._id}`}
        className={`flex tracking-widest items-center justify-center w-60 h-20 mx-5 text-white ${account.banned ? 'bg-red-500' : 'bg-green-600'} rounded-lg cursor-pointer mt-5 shadow-inner hover:opacity-90 duration-100`}
      >
        {account.nickname}
      </Link>
    )
  })

  return (
    <div className='bg-gradient-to-b from-gray-900 to-gray-700 flex flex-col min-h-screen h-full text-gray-300 pb-10'>
      <div className='flex flex-col items-center mt-5'>
        <Link to="/" className='text-gray-300 text-3xl font-thin'>Account Tracker</Link>
        <hr className='border-gray-600 w-72 mt-4 mb-3' />
        <button
          onClick={() => setIsAddAcountModalOpen(true)}
          className='hover:opacity-70'
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
      {
        !loading ?
          <div className='mt-10 2xl:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mx-auto'>
            { accountsMap }
          </div>
        :
          <Loading />
      }
      {
        isAddAcountModalOpen ?
          <AddAccount
            setIsAddAcountModalOpen={setIsAddAcountModalOpen}
            fetchAccounts={fetchAccounts}
            accounts={accounts}
          />
        : null
      }
    </div>
  )
}

export default Home