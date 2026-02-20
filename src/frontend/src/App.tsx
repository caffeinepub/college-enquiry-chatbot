import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ChatPage from './pages/ChatPage';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="min-h-screen bg-background">
      <ChatPage />
    </div>
  );
}

export default App;
