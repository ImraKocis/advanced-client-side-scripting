import { useAuth } from "@/hooks/useAuth.ts";
import { ReactElement } from "react";
import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import { Route } from "@/routes/_auth.tsx";
import { Button } from "@/components/ui/button.tsx";

const publicRoutes: Array<{ name: string; route: string }> = [
  {
    name: "Home",
    route: "/",
  },
];

const protectedRoutes: Array<{ name: string; route: string }> = [
  {
    name: "Profile",
    route: "/profile",
  },
];

function Navigation(): ReactElement {
  const { isAuthenticated } = useAuth();
  const routerState = useRouterState();
  const router = useRouter();
  const navigate = Route.useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      auth.logout().then(() => {
        router.invalidate().finally(() => {
          navigate({ to: "/" });
        });
      });
    }
  };

  return (
    <nav className="w-full py-6 border-b bg-gray-300 rounded-b-xl shadow-sm">
      <div className="max-w-wrapper-desktop mx-auto flex justify-between items-center xxl:px-0 px-4">
        <div className="flex gap-3">
          {publicRoutes.map(({ route, name }, index) => (
            <Link
              className={
                route === routerState.location.pathname ? "font-semibold" : ""
              }
              key={index}
              to={route}
            >
              {name}
            </Link>
          ))}
          {isAuthenticated
            ? protectedRoutes.map(({ route, name }, index) => (
                <Link
                  className={
                    route === routerState.location.pathname
                      ? "font-semibold"
                      : ""
                  }
                  key={index}
                  to={route}
                >
                  {name}
                </Link>
              ))
            : null}
        </div>
        {isAuthenticated ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <Button>
            <Link to="/login">Login</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}

export { Navigation };
