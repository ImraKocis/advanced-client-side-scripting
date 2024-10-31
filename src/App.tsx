import { AuthProvider } from "@/auth.tsx";
import { InnerApp } from "@/InnerApp.tsx";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <InnerApp />
      </div>
    </AuthProvider>
  );
}

export default App;
