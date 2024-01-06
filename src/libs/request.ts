import axios from "axios";

const request = axios.create({
  baseURL: "https://ikulxdlskgdnpmyiynls.supabase.co/functions/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrdWx4ZGxza2dkbnBteWl5bmxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQyNTY3NjYsImV4cCI6MjAxOTgzMjc2Nn0.4NtGIjqIkYId9VvF4XTlz_M2Im7H3CmNRgke9cG4DwQ",
  },
});

export default request;
