import { ReactNode } from 'react';
import { Heart } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'college-chatbot'
  );

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground shadow-warm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-display font-bold tracking-tight">
            College Inquiry Chatbot
          </h1>
          <p className="text-primary-foreground/80 mt-1">
            Get instant answers to all your college questions
          </p>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-muted/50 border-t border-border py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1.5">
            © {new Date().getFullYear()} College Inquiry Chatbot. Built with{' '}
            <Heart className="h-4 w-4 text-destructive fill-destructive" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
