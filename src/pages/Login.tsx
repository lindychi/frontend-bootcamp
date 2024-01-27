import React, { useEffect } from 'react'
import { supabase } from '../libs/supabase';

type Props = {}

export default function Login({}: Props) {
  const handleGoogleLogin = async () => {
    let { data, error} = await supabase.auth.signInWithOAuth({
      provider : "google",
    });
  };





    return(
      <div>
      <div className="flex flex-col items-center">로그인페이지
        <button
          className="bg-gray-300 py-1 px-3 rounded-sm"
          onClick={handleGoogleLogin}>
          구글 로그인
        </button>
      </div>
        </div>
      )
}