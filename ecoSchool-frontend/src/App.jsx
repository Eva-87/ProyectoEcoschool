import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/layout/Footer";

import HomePage from "./pages/HomePage";
import ResiduosPage from "./pages/ResiduosPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">

        {/* CONTENIDO */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/residuos" element={<ResiduosPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </main>

        {/* FOOTER */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;