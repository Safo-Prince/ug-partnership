import Header from "../components/Header";
import Footer from "../components/Footer";
import AdminTable from "../components/AdminTable";
import axios from "axios";
import * as React from "react";
import Hero from "../components/Hero";

const baseURL = "https://partnerships.ug.edu.gh/loginstatus";

{
  /* @ts-ignore */
}
/* @ts-ignore */
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
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero  />
      <AdminTable />
      <Footer />
    </div>
  );
}
