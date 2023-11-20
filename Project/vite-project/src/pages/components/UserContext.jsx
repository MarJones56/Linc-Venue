import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Initialize user from localStorage or set it to null if not present
    const storedUser = localStorage.getItem('user2');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    // Fetch user data only if user is not present
    if (!user) {
      axios.get('http://localhost:5000/profile').then(({ data }) => {
        setUser(data);

        // Store the user data in localStorage
        localStorage.setItem('user2', JSON.stringify(data));
      });
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
