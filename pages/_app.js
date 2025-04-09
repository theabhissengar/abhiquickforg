import '../styles/globals.css';
import Layout from '../components/Layout';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Toaster position="top-right" />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp; 

