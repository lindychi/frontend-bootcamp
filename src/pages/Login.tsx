import { supabase } from "../libs/supabase";
import React from "react";

type Props = {};

export default function Login({}: Props) {
  const handleGoogleLogin = async () => {
    let { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <div className="flex flex-col items-center p-1">
      로그인 페이지
      <button className="bg-state-600 " onClick={handleGoogleLogin}>
        구글 로그인
      </button>
    </div>
  );
}
