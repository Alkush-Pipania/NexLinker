import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Builder from './pages/Builder';
import Authentication from './pages/Authentication';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';  
import PrivateRoute from './component/PrivateRoute'; 
import { Suspense } from 'react';
import NotFound from './pages/NotFound';
import Findpeer from '../src/pages/Findpeer';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient} >
      <AuthProvider> 
        <Suspense fallback={<div>Loading...</div>}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/builder/*" element={<PrivateRoute element={<Builder />} />} />  {/* Protect Builder route */}
              <Route path="/auth" element={<Authentication />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/find_peer" element={<Findpeer />} />
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
        />
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
