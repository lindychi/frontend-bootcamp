import { createClient } from "@supabase/supabase-js";

// 백엔드 데이터 베이스 주소
const supabaseUrl = "https://ikulxdlskgdnpmyiynls.supabase.co";

// 백엔드 데이터 베이스 키
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey);
