import { BACKEND_URL, GET_URL_PATH } from "@/constants/backend";
import { Button } from "../ui/button";
import { useState } from "react";

export function Admin() {
  const [data, setData] = useState<any>(null);
  console.log(BACKEND_URL, GET_URL_PATH);
  const getURL = () => {
    fetch(`${BACKEND_URL}${GET_URL_PATH}`)
      .then(res => res.json())
      .then(data => {
        setData(data);
      });
  }

  return (
    <div className="max-w-xl mx-auto text-center py-10">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <Button onClick={getURL}>Get URL</Button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default Admin;


