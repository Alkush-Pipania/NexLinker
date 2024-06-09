import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import { Suspense } from "react";
import Builder from "./pages/Builder";
import Authentication from "./pages/Authentication";
import {ReactQueryDevtools} from 'react-query/devtools'
import {QueryClient,QueryClientProvider} from 'react-query'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App(){
  const queryClient = new QueryClient();
return (
  <QueryClientProvider client={queryClient}>
    <Suspense fallback={<div>Loading...</div>}>
  <Router>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/builder/*" element={<Builder/>} />
      
      <Route path = "/auth" element = {<Authentication/>} />
    </Routes>
  </Router>
  </Suspense>
  <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
transition: Bounce/>
  <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
}

export default App;