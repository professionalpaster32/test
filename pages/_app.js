import '../styles/global.css'; // Corrected import to match 'global.css'
import { AuthProvider } from '../context/AuthContext'; // Corrected import path/filename

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
