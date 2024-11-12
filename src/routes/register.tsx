import {
  createFileRoute,
  Link,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth.ts";
import { useToast } from "@/hooks/use-toast.ts";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Navigation } from "@/components/navigation.tsx";
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
import { registerSchema } from "@/lib/registerSchema.ts";

const fallback = "/profile" as const;

export const Route = createFileRoute("/register")({
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: fallback });
    }
  },
  component: Register,
});

function Register() {
  const { register, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const navigate = Route.useNavigate();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof registerSchema>) {
    const registerResult = await register(data);
    if (!registerResult) {
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
      return;
    }
    await router.navigate({ to: "/login" });
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: fallback });
    }
  }, [isAuthenticated]);

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
              name="userName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>User Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="johndoe123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex gap-2 justify-center">
              <p>Already have a profile?</p>
              <span className="text-blue-600 hover:text-blue-800 transition duration-300 hover:cursor-pointer">
                <Link to="/login">Login</Link>
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
