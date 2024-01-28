import React, { useEffect } from "react";

import { supabase } from "../../libs/supabase";

type Props = {};

export default function Login({}: Props) {
  const handleGoogleLogin = async () => {
    let { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <div className="flex flex-col items-center">
      로그인 페이지
      <button
        className=" bg-slate-600 border-slate-300 text-white"
        onClick={handleGoogleLogin}
      >
        구글 로그인
      </button>
      o0o
    </div>
  );
}
