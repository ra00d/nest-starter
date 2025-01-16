import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '../../components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { signUp } from '../../lib/api/auth';
import { TSignUp, signUpSchema } from '../../lib/schemas/login-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

export default function SignUpPage() {
  const navigate = useNavigate();
  const form = useForm<TSignUp>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      passwordConfirmation: '',
    },
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ['sign-up'],
    mutationFn: (data: TSignUp) => signUp(data),
    onSuccess: () => {
      navigate('/login', {
        replace: true,
      });
    },
  });
  const handleSubmit = (data: TSignUp) => {
    mutate(data);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh bg-background">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Card>
            <CardHeader>
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">Create an Account</h1>
                <p className="text-muted-foreground">
                  Join our platform and start building your dream project.
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="max-w-md w-full space-y-6 px-4 md:px-0">
                <div>
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <FormField
                        name="name"
                        control={form.control}
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                    <div className="grid gap-2">
                      <FormField
                        name="email"
                        control={form.control}
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>email</FormLabel>
                              <FormControl>
                                <Input {...field} type="email" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />{' '}
                    </div>
                    <div className="grid gap-2">
                      <FormField
                        name="password"
                        control={form.control}
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>password</FormLabel>
                              <FormControl>
                                <Input {...field} type="password" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                    <div className="grid gap-2">
                      <FormField
                        name="passwordConfirmation"
                        control={form.control}
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>confirm password</FormLabel>
                              <FormControl>
                                <Input {...field} type="password" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button loading={isPending} type="submit" className="w-full">
                Sign Up
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
