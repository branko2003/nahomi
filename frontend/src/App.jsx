import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./ProtectedRoute";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { TaskFormPage } from "./pages/TaskFormPage";
import { LoginPage } from "./pages/LoginPage";
import { TasksPage } from "./pages/TasksPage";
import { TaskProvider } from "./context/TaskContext";
import { ClienteProvider } from "./context/ClienteContext";
import { ClienteFormPage } from "./pages/ClienteFormPage";
import { ClientesPage} from "./pages/ClientesPage";
import { TecnicoProvider } from "./context/TecnicoContext";
import { TecnicoFormPage } from "./pages/TecnicoFormPage";
import { TecnicoPage} from "./pages/TecnicosPage";
import { ReparacionProvider } from "./context/ReparacionContext";

import { ReparacionFormPage } from "./pages/ReparacionFormPage";


//import { ProfilePage} from "./pages/ProfilePage";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <ClienteProvider>
        <TecnicoProvider>
          <ReparacionProvider>
        <BrowserRouter>
          <main className="container content-container mx-auto px-10 md:px-0">
            <Navbar />
            <Routes>
              <Route path="/" element={<h1>HomePage</h1>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/add-reparacion" element={<ReparacionFormPage />} />
              <Route element={<ProtectedRoute />}>  
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/add-task" element={<TaskFormPage />} />
                <Route path="/tasks/:id" element={<TaskFormPage />} />
                <Route path="/profile" element={<h1>Profile</h1>} />
                <Route path="/clientes" element={<ClientesPage />} />
                <Route path="/add-cliente" element={<ClienteFormPage />} />
                <Route path="/clientes/:id" element={<ClienteFormPage />} />
                <Route path="/tecnicos" element={<TecnicoPage />} />
                <Route path="/add-tecnico" element={<TecnicoFormPage />} />
                <Route path="/tecnicos/:id" element={<TecnicoFormPage />} />
                

              </Route>
            </Routes>
          </main>
          
        </BrowserRouter>
        </ReparacionProvider>
        </TecnicoProvider>
        </ClienteProvider>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;