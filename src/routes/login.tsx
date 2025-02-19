import {
  createFileRoute,
  Link,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import { ReactElement, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/lib/loginSchema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth.ts";
import { useToast } from "@/hooks/use-toast.ts";
import { Navigation } from "@/components/navigation.tsx";

const fallback = "/profile" as const;

export const Route = createFileRoute("/login")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect || fallback });
    }
  },
  component: Login,
});

function Login(): ReactElement {
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const navigate = Route.useNavigate();
  const search = Route.useSearch();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    const loginResult = await login(data);
    if (!loginResult) {
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    }
    await router.invalidate();
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: search.redirect || fallback });
    }
  }, [isAuthenticated, search.redirect]);

  return (
    <>
      <Navigation />
      <div className="min-h-screen flex justify-center items-center bg-gray-200">
        <Form {...form}>
          <form
            className="space-y-4 w-full max-w-[500px] rounded-md flex flex-col justify-center items-center bg-white p-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="johndoe@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex gap-2 justify-center">
              <p>Dont have a profile?</p>
              <span className="text-blue-600 hover:text-blue-800 transition duration-300 hover:cursor-pointer">
                <Link to="/register">Register Now</Link>
              </span>
            </div>
            <Button
              className="w-full flex"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {form.formState.isSubmitting ? "Please wait" : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
