import * as React from 'react';
{/* @ts-ignore */}
import Header from "../components/Header";
{/* @ts-ignore */}
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
{/* @ts-ignore */}
import Hero from "../components/Hero";

const Login: React.FC = () => {
  return (
    <div className=" flex flex-col h-screen">
      {/* <Header /> */}
      {/* <Hero /> */}
      <LoginForm />
      {/* <Footer /> */}
    </div>
  );
};

export default Login;
