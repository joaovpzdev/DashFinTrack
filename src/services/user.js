import { protectedApi, publicApi } from '../lib/axios';

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
    return {
      id: response.data.id,
      email: response.data.email,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
        tokens: response.data.tokens,
    };
  },
  login: async (input) => {
    const response = await publicApi.post('/auth/login', {
      email: input.email,
      password: input.password,
    });
    return {
        id: response.data.id,
        email: response.data.email,
        firstName: response.data.first_name,
        lastName: response.data.last_name,
        tokens: response.data.tokens,
    };
  },
  me: async () => {
    const response = await protectedApi.get('/users/me');
    return {
      id: response.data.id,
      email: response.data.email,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      tokens: response.data.tokens,
    };
  },
};
