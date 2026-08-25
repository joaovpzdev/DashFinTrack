import { protectedApi, publicApi } from '../lib/axios';

export const UserService = {
  /**
   * Cria um novo usuário no sistema.
   * @param {object} input
   * @param {string} input.firstName - Primeiro nome do usuário.
   * @param {string} input.lastName - Sobrenome do usuário.
   * @param {string} input.email - E-mail do usuário.
   * @param {string} input.password - Senha do usuário.
   * @param {string} input.passwordConfirmation - Confirmação da senha do usuário.
   * @param {boolean} input.terms - Aceitação dos termos de uso.
   * @returns {object} - Retorna um objeto com os dados do usuário criado e seus tokens.
   * @return {string} response.tokens - Retorna os tokens de acesso e refresh do usuário.
   */

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
  /**
   * Retorna os dados do usuário autenticado.
   * @returns {object} - Retorna um usuario autenticado com seus dados e tokens.
   */
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
