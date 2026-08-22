import { Link } from 'react-router';

import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Input } from '../components/ui/input';

const SignupPage = () => {
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center gap-3">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle> Crie sua conta </CardTitle>
          <CardDescription>Insira seus dados logo abaixo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Nome" />
          <Input placeholder="Sobrenome" />
          <Input placeholder="Email" />
          <Input type="password" placeholder="Senha" />
        </CardContent>
        <CardFooter>
          <Button className="w-full"> Criar Conta </Button>
        </CardFooter>
      </Card>
      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">Já possui uma conta?</p>
        <Button variant="link" asChild>
          <Link to="/login">Realize o Login</Link>
        </Button>
      </div>
    </div>
  );
};
export default SignupPage;
