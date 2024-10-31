import { createFileRoute } from "@tanstack/react-router";
import { ReactElement } from "react";
import { useAuth } from "@/hooks/useAuth.ts";
import { Input } from "@/components/ui/input.tsx";

export const Route = createFileRoute("/_auth/profile")({
  component: ProfilePage,
});

function ProfilePage(): ReactElement {
  const { user } = useAuth();
  return (
    <div className="max-w-wrapper-desktop xxl:px-0 px-4 mx-auto w-full">
      <div className="flex flex-col w-full gap-4 px-12 py-20">
        <h2 className="font-bold text-2xl">Hi, {user?.name}</h2>
        <div className="flex gap-2 items-center">
          Email:
          <Input
            defaultValue={user?.email}
            disabled
            type="password"
            className="disabled:opacity-1 max-w-fit"
          />
        </div>
      </div>
    </div>
  );
}
