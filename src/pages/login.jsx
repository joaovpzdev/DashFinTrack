import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import { Input } from '../components/ui/input';
import PasswordInput from '../components/ui/password-inputs';
import { toast } from '../components/ui/sonner';
import api from '../lib/axios';

const loginSchema = z.object({
  email: z
    .string()
    .email({
      message: 'O e-mail é inválido!',
    })
    .trim()
    .min(1, {
      message: 'O e-mail é obrigatório!',
    }),
  password: z.string().trim().min(6, {
    message: 'A senha deve ter no mínimo 6 caracteres!',
  }),
});

const LoginPage = () => {
  const [user, setUser] = useState(null);
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
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  useEffect(() => {
    const init = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      if (!accessToken && !refreshToken) return;
      try {
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

  const handleSubmit = (data) => {
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
  };
  if (user) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
        <Card className="w-[500px]">
          <CardHeader>
            <CardTitle>Login realizado com sucesso!</CardTitle>
            <CardDescription>Você já está logado.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Card className="w-[500px]">
            <CardHeader>
              <CardTitle>Faça Login</CardTitle>
              <CardDescription>
                Entre com sua conta inserindo os seus dados abaixo!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu e-mail" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Digite sua senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full">Fazer login</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">Ainda não possui uma conta?</p>
        <Button variant="link" asChild>
          <Link to="/signup">Crie sua conta!</Link>
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
