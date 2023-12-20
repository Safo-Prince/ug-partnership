import Header from "../components/Header";
import Footer from "../components/Footer";
import AdminTable from "../components/AdminTable";
import axios from "axios";
import * as React from "react";

const baseURL = "http://197.255.126.63:3001/loginstatus";

{
  /* @ts-ignore */
}
export default function Administrator(props: any) {
  const [authStatus, setAuthStatus] = React.useState(null);
  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setAuthStatus(response.data);
    });
  });
  console.log(authStatus);
  if (authStatus == false) {
    history.pushState({ urlPath: "" }, "", "/login");
    window.location.reload();
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <AdminTable />
      <Footer />
    </div>
  );
}
