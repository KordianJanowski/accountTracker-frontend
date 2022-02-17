import React, { useState, useEffect } from 'react'
import axios from 'axios'
import API_URL from '../API_URL'
import { useNavigate, useParams } from 'react-router-dom'
import { Iaccount } from '../interfaces'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
import CountDownTimer from '../components/CountDownTimer'

const AccountProfile: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate()
  const [account, setAccount] = useState<Iaccount>();
  const [bannedTo, setBannedTo] = useState<string>();
  const [showDeleteAccountConfirm, setShowDeleteAccountConfirm] = useState<boolean>(false);
  const [showAddBanPanel, setShowAddBanPanel] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [timeInSeconds, setTimeInSeconds] = useState<number>(0)

  const fetchAccount = async () => {
    await axios.get(`${API_URL}/accounts/${params.id}`)
    .then(res => {
      setAccount(res.data);
      setLoading(false);
    })
  }

  const toggleBanAccount = async () => {
    await axios.put(`${API_URL}/accounts/${params.id}`, {
      banned: !account?.banned,
      bannedTo
    })
    .then(() => navigate('/'))
  }

  const deleteAccount = async () => {
    await axios.delete(`${API_URL}/accounts/${params.id}`)
    .then(() => navigate('/'))
  }

  useEffect(() => {
    fetchAccount()
  }, [])

  useEffect(() => {
    if(account?.banned) {
      setTimeInSeconds((Date.parse(account?.bannedTo!) - Date.parse(new Date().toString()))/1000)
    }
  }, [account])


  return (
    <div className='bg-gradient-to-b from-gray-900 to-gray-700 flex flex-col min-h-screen h-full text-gray-300 pb-10'>
      <div className='flex flex-col items-center mt-5'>
        <Link to="/" className='text-gray-300 text-3xl font-thin'>Account Tracker</Link>
      </div>
        {
          account && !loading ?
            <div className='mt-10 2xl:mt-20 flex flex-col items-center'>
              <h1 className={`text-6xl pb-2 px-10 border-b border-gray-600 ${account.banned ? 'text-red-500' : 'text-green-500'}`}>{account.nickname}</h1>
              {
                account.banned ?
                  <div className='my-14'>
                    <p className='text-center text-xl'>{ account.bannedTo?.replace(/[T]/ig, ' ').slice(0,16) }</p>
                    <CountDownTimer
                      timeInSeconds={timeInSeconds}
                      setTimeInSeconds={setTimeInSeconds}
                      toggleBanAccount={toggleBanAccount}
                    />
                  </div>
                : null
              }
              {
                !account.banned ?
                  !showAddBanPanel ?
                    <button onClick={() => setShowAddBanPanel(true)} className='mt-8 mb-4 px-8 py-3 bg-gray-600 rounded-lg text-2xl'>Dodaj bana</button>
                  :
                    <>
                      <button
                        onClick={() => {
                          setShowAddBanPanel(false)
                          setBannedTo('')
                        }}
                        className='mt-8 mb-4 px-8 py-3 bg-gray-600 rounded-lg text-2xl'
                      >
                        Anuluj
                      </button>
                      <label>ban do:</label>
                      <input
                        type="datetime-local"
                        value={bannedTo}
                        onChange={(e) => setBannedTo(e.target.value)}
                        className='mb-8 border-b text-white focus:bg-transparent border-gray-300 bg-gray-100 focus:bg-white bg-transparent focus:outline-none text-3xl text-center pb-1 rounded-lg shadow-md focus:shadow-lg placeholder:font-light'
                      />
                      <button
                        onClick={toggleBanAccount}
                        disabled={bannedTo === ''}
                        className={`mb-8 px-8 py-3 text-white rounded-lg text-2xl ${!bannedTo ? 'bg-gray-600 cursor-not-allowed' : 'bg-red-500'}`}
                      >
                        Zatwierdź
                      </button>
                    </>
                :
                  <>
                    <button
                      onClick={toggleBanAccount}
                      disabled={bannedTo === ''}
                      className={`mt-5 mb-4 px-8 py-3 text-white bg-green-600 rounded-lg text-2xl`}
                    >
                      Anuluj bana
                    </button>
                  </>
              }
              {
                !showAddBanPanel ?
                  !showDeleteAccountConfirm ?
                    <button onClick={() => setShowDeleteAccountConfirm(true)} className='px-8 py-3 bg-red-500 text-white rounded-lg text-2xl'>Usuń konto</button>
                    :
                    <>
                      <button onClick={deleteAccount} className='px-8 py-3 bg-red-500 text-white rounded-lg text-2xl'>Jesteś pewien?</button>
                      <button onClick={() => setShowDeleteAccountConfirm(false)} className='mt-1'>Anuluj</button>
                    </>
                : null
              }
            </div>
          :
            <Loading />
        }
    </div>
  )
}

export default AccountProfile