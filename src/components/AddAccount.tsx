import React, { useState } from 'react'
import axios from 'axios'
import API_URL from '../API_URL'
import { Iaccount } from '../interfaces'

interface Props {
  setIsAddAcountModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fetchAccounts: () => Promise<void>;
  accounts: Iaccount[];
}

const AddAccount: React.FC<Props> = ({ setIsAddAcountModalOpen, fetchAccounts, accounts }) => {
  const [nick, setNick] = useState<string>('')

  const addAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    accounts.forEach((account:Iaccount) => {
      if(account.nickname === nick) {
        return null
      }
    })

    const account:Iaccount = {
      nickname: nick,
      banned: false
    }

    await axios.post(`${API_URL}/accounts`, account)
    .then(res => {
      console.log(res)
      setIsAddAcountModalOpen(false)
      fetchAccounts()
    })
    .catch(err => console.log(err))
  }

  return (
    <>
      <div className='z-50 absolute top-0 left-0 flex justify-center items-center w-full h-screen'>
        <button
          onClick={() => setIsAddAcountModalOpen(false)}
          className='absolute top-2 right-2 text-white hover:opacity-70'
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <form onSubmit={addAccount} className='flex flex-col bg-gray-200 shadow-lg rounded-md p-6'>
          <input
            type="text"
            className='border-b border-gray-300 bg-gray-100 focus:bg-white bg-transparent focus:outline-none text-3xl text-center pb-1 rounded-lg shadow-md focus:shadow-lg placeholder:font-light text-gray-500'
            placeholder='Nickname'
            value={nick}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNick(e.target.value)}
            autoFocus={true}
            required
          />
          <input
            className='mt-4 cursor-pointer text-lg text-gray-500 bg-gray-100 hover:bg-white shadow-md w-32 mx-auto rounded-lg transition duration-100'
            type="submit"
            value="Dodaj konto"
          />
        </form>
      </div>
      <div className='z-1 absolute top-0 left-0 flex justify-center items-center w-full h-screen bg-black opacity-50'></div>
    </>
  )
}

export default AddAccount