// frontend/src/context/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Pastikan untuk mengimpor jwt-decode dengan benar

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    user: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log('Decoded user from token:', decoded.user);
        setAuth({ token, user: decoded.user });
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (err) {
        console.error('Invalid token:', err);
        localStorage.removeItem('token'); // Menghapus token jika tidak valid
        setAuth({ token: null, user: null });
        delete axios.defaults.headers.common['Authorization'];
      }
    } else {
      setAuth({ token: null, user: null });
      delete axios.defaults.headers.common['Authorization'];
    }
  }, []);

  const login = (token) => {
    try {
      const decoded = jwtDecode(token);
      console.log('Decoded user during login:', decoded.user);
      localStorage.setItem('token', token);
      setAuth({ token, user: decoded.user });
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (err) {
      console.error('Invalid token during login:', err);
      setAuth({ token: null, user: null });
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, user: null });
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; // Default export


// // frontend/src/context/AuthContext.js

// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode'; // Import jwt-decode

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({
//     token: localStorage.getItem('token'),
//     user: null,
//   });

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         console.log('Decoded user:', decoded.user);
//         setAuth({ token, user: decoded.user });
//         axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       } catch (err) {
//         console.error('Invalid token:', err);
//         localStorage.removeItem('token'); // Menghapus token jika tidak valid
//         setAuth({ token: null, user: null });
//         delete axios.defaults.headers.common['Authorization'];
//       }
//     } else {
//       setAuth({ token: null, user: null });
//       delete axios.defaults.headers.common['Authorization'];
//     }
//   }, []);

//   const login = (token) => {
//     try {
//       const decoded = jwtDecode(token);
//       console.log('Decoded user during login:', decoded.user);
//       localStorage.setItem('token', token);
//       setAuth({ token, user: decoded.user });
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     } catch (err) {
//       console.error('Invalid token during login:', err);
//       setAuth({ token: null, user: null });
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setAuth({ token: null, user: null });
//     delete axios.defaults.headers.common['Authorization'];
//   };

//   return (
//     <AuthContext.Provider value={{ auth, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export default AuthProvider; // Default export
