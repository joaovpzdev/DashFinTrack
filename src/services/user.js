import { publicApi } from '../lib/axios';

export const UserService = {
    signup: async (input) => {
        const response = await publicApi.post('/users', {
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        password: input.password,
        passwordConfirmation: input.passwordConfirmation,
        terms: input.terms,
      });
      return response.data;
    },
    login: async (input) => {
       const response = await publicApi.post('/auth/login', {
        email: input.email,
        password: input.password,
      });
      return response.data;
    },
}