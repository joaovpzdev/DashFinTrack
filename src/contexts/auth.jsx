import { useMutation } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useState } from 'react';

import { toast } from '../components/ui/sonner';
import api from '../lib/axios';

export const AuthContext = createContext({
  user: null,
  login: () => {},
  signup: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signupMutation = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (variables) => {
      const response = await api.post('/users', {
        firstName: variables.firstName,
        lastName: variables.lastName,
        email: variables.email,
        password: variables.password,
        passwordConfirmation: variables.passwordConfirmation,
        terms: variables.terms,
      });
      return response.data;
    },
  });
    const loginMutation = useMutation({
      mutationKey: ['login'],
      mutationFn: async (variables) => {
        const response = await api.post('/auth/login', {
          email: variables.email,
          password: variables.password,
        });
        return response.data;
      },
    });
  useEffect(() => {
    const init = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if (!accessToken && !refreshToken) return;
        const response = await api.get('/users/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        console.error('Error initializing user:', error);
      }
    };
    init();
  }, []);
  const signup = (data) => {
    signupMutation.mutate(data, {
      onSuccess: (createdUser) => {
        const accessToken = createdUser.tokens.accessToken;
        const refreshToken = createdUser.tokens.refreshToken;
        setUser(createdUser);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        toast.success('Conta criada com sucesso! Faça login para continuar.');
      },
      onError: () => {
        toast.error('Ocorreu um erro ao criar a conta. Tente novamente.');
      },
    });
  };
  const login = (data) => {
       loginMutation.mutate(data, {
         onSuccess: (loggedUser) => {
           const accessToken = loggedUser.tokens.accessToken;
           const refreshToken = loggedUser.tokens.refreshToken;
           localStorage.setItem('accessToken', accessToken);
           localStorage.setItem('refreshToken', refreshToken);
           setUser(loggedUser);
           toast.success('Login realizado com sucesso!');
         },
         onError: (error) => {
           console.error('Login failed:', error);
         },
       });
  }

   

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
