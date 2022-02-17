import React, { useEffect, useState } from 'react'
import axios from 'axios'
import API_URL from '../API_URL'
import { ItimeToUnban } from '../interfaces'
import { useNavigate } from 'react-router-dom'

interface IProps {
  timeInSeconds: number;
  setTimeInSeconds: React.Dispatch<React.SetStateAction<number>>;
  toggleBanAccount: () => Promise<void>;
}

const CountDownTimer: React.FC<IProps> = ({ timeInSeconds, setTimeInSeconds, toggleBanAccount }) => {
  const [time, setTime] = useState<ItimeToUnban>()

    const tick = () => {
      if(timeInSeconds !== 0) {
        let data = {
          days: Math.trunc(((timeInSeconds / 60) / 60) / 24),
          hours: Math.trunc(((timeInSeconds / 60) / 60) % 24),
          minutes: Math.trunc((timeInSeconds / 60 ) % 60),
          seconds: Math.trunc(timeInSeconds % 60),
        }

        setTime(data)
        setTimeInSeconds(timeInSeconds-1)

      } else {
        toggleBanAccount()
      }
    };

    useEffect(() => {
      const timerId = setInterval(() => tick(), 1000);
      return () => clearInterval(timerId);
    }, [timeInSeconds]);

    return (
      <p className='text-8xl'>
        {
          time ?
            `${time!.days ? time!.days.toString().padStart(2, '0') + ':' : ''}${time!.hours.toString().padStart(2, '0')}:${time!.minutes.toString().padStart(2, '0')}:${time!.seconds.toString().padStart(2, '0')}`
          :
            <p className='animate-pulse'>--:--:--</p>
        }
      </p>
    );
}

export default CountDownTimer;