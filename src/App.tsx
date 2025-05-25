import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Components/routes/AppRoutes";
function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    // <div className="bg-gray-100">
    //   <Header />
    //   <Carruse />
    //   <Hero />
    //   <CardDetail />
    // </div>
  );
}

export default App;
