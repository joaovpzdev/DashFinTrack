import { Link } from 'react-router-dom';

import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';
import { Input } from '../components/ui/input';
import PasswordInput from '../components/ui/password-inputs';

const SignupPage = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Crie sua conta</CardTitle>
          <CardDescription>Insira seus dados logo abaixo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Nome" />
          <Input placeholder="Sobrenome" />
          <Input placeholder="Email" />
          <PasswordInput />
          <PasswordInput placeholder="Confirme a senha" />

          <div className="flex items-top space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-muted-foreground opacity-75 text-xs"
            >
              Ao clicar em &#34;Criar Conta&#34;, você concorda {' '}
              <a href="#" className="text-white underline">
                com os termos e condições de política de privacidade.
              </a>
            </label>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Criar Conta</Button>
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
