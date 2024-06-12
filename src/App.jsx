import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Builder from './pages/Builder';
import Authentication from './pages/Authentication';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';  // Import AuthProvider
import PrivateRoute from './component/PrivateRoute';  // Import PrivateRoute
import { Suspense } from 'react';
import NotFound from './pages/NotFound';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>  {/* Wrap your app with AuthProvider */}
        <Suspense fallback={<div>Loading...</div>}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/builder/*" element={<PrivateRoute element={<Builder />} />} />  {/* Protect Builder route */}
              <Route path="/auth" element={<Authentication />} />
              <Route path="*" element={<NotFound />} />
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
