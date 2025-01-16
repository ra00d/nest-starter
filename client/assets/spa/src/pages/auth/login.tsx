import { Input } from '../../components/ui/input';
import { Link, useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TLogin, loginInSchema } from '../../lib/schemas/login-schema';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../lib/api/auth';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useAuth } from '../../lib/stores/auth';

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const form = useForm<TLogin>({
    resolver: zodResolver(loginInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { isPending, mutate } = useMutation({
    mutationFn: (data: TLogin) => {
      return login(data);
    },
    onError: (error: AxiosError<any>) => {
      toast.error(
        error.response?.data?.message || 'Sorry something went wrong',
      );
    },
    onSuccess: (data) => {
      document.cookie = `XSRF-TOKEN=${data?.token}; SameSite='strict'`;
      setUser(data);
      navigate('/', {
        replace: true,
      });
    },
  });
  const onSubmit = (data: TLogin) => {
    mutate(data);
  };
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <Card className="mx-auto  max-w-md space-y-6">
        <CardContent>
          <div className="flex flex-col items-center space-y-2">
            <MountainIcon className="h-12 w-12 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Welcome back
            </h1>
            <p className="text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter your username" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Password</FormLabel>
                          <Link
                            to="#"
                            className="text-sm font-medium text-primary hover:underline"
                          >
                            Forgot password?
                          </Link>
                        </div>

                        <FormControl>
                          <Input
                            type="password"
                            {...field}
                            placeholder="Enter your password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                variant="ringHover"
                loading={isPending}
              >
                Sign in
              </Button>
            </form>
          </Form>
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link
              to="/sign-up"
              className="font-medium text-primary hover:underline"
            >
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
