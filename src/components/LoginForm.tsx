import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";
import "../styles/Loginform.css";

  const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  {/* @ts-ignore */}
  const [loginError, setLoginError] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        setLoginError(false);
        setIsLoading(false);
        navigate('/admin');
      } else {
        setLoginError(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // ... (imports)

  return (
    <div className="w-full flex justify-center items-center flex-grow background-image">
      <div className="w-full px-6 mx-2 sm:mx-0 sm:w-[30%] sm:bg-[#ECECEC] sm:rounded sm:shadow-md border borders-stone-300 py-20">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <img className="mx-auto" src={logo} alt="Your Company" />
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
          <form onSubmit={(e) => onSubmit(e)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={credentials.email}  // Bind value to state
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={credentials.password}  // Bind value to state
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#153D6D] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#345176] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading ? <div className="spinner"></div> : <span>Sign in</span>}
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
