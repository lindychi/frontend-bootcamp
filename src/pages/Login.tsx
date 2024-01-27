import React, { useEffect } from 'react'
import { supabase } from '../libs/supabase'

type Props = {}

export const Login = (props: Props) => {

    const handleGoogleLogin = async () =>{
        let { data, error } = await supabase.auth.signInWithOAuth({
          provider: "google"
        })
      }

      
  return (
    <div className='flex flex-col justify-center items-center text-xl'>
    로그인페이지
    <button 
    className='w-fit bg-yellow-500' 
    onClick={handleGoogleLogin}>
      로그인
      </button>
  </div>
  )
}