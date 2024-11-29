import { createFileRoute } from "@tanstack/react-router";
import { ReactElement, useState } from "react";
import { useAuth } from "@/hooks/useAuth.ts";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Label } from "@/components/ui/label.tsx";
import { useToast } from "@/hooks/use-toast.ts";

export const Route = createFileRoute("/_auth/profile")({
  component: ProfilePage,
});

function ProfilePage(): ReactElement {
  const { user, update } = useAuth();
  const { toast } = useToast();
  const [initialUsername] = useState(user?.name);
  const [username, setUsername] = useState(user?.name);
  const [updatedUsername, setUpdatedUsername] = useState(username);
  if (!user)
    return (
      <div className="w-full p-20 justify-center items-center">
        <h2 className="font-semibold text-2xl">User dose not exists anymore</h2>
      </div>
    );
  return (
    <div className="max-w-wrapper-desktop xxl:px-0 px-4 mx-auto w-full">
      <div className="flex flex-col w-full items-center gap-4 px-12 py-20">
        <h2 className="font-bold text-2xl">Hi, {updatedUsername}</h2>
        <form
          className="flex flex-col w-full max-w-[300px] gap-4"
          onSubmit={async (formData) => {
            formData.preventDefault();
            const result = await update({
              userName: username ?? "",
              userId: user.id.toString(),
            });
            if (result) {
              toast({ title: "Successfully Updated" });
              setUpdatedUsername(username);
              return;
            }
            toast({ title: "Something went wrong", variant: "destructive" });
          }}
        >
          <Label htmlFor="username">Username:</Label>
          <Input
            id="username"
            value={username ?? ""}
            onChange={(event) => setUsername(event.target.value)}
          />
          <Label htmlFor="email">Email:</Label>
          <Input
            id="email"
            defaultValue={user?.email}
            disabled
            type="password"
            className="disabled:opacity-1"
          />
          <Button type="submit" disabled={initialUsername == username}>
            Update
          </Button>
        </form>
      </div>
    </div>
  );
}
