import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/layout/Navbar";
import ErrorBoundary from "./components/common/ErrorBoundary";
function App() {
  return (
    <ErrorBoundary>
      <Navbar />
      <AppRoutes />
    </ErrorBoundary>
  );
}

export default App;
