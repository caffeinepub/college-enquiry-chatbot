import { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import type { ChatMessage as ChatMessageType } from '../hooks/useChat';

interface ChatInterfaceProps {
  messages: ChatMessageType[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export function ChatInterface({
  messages,
  onSendMessage,
  isLoading,
  disabled,
}: ChatInterfaceProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-card rounded-2xl shadow-warm border border-border overflow-hidden">
      <div className="bg-primary text-primary-foreground px-6 py-4 border-b border-primary/20">
        <h2 className="text-lg font-semibold">College Inquiry Assistant</h2>
        <p className="text-sm text-primary-foreground/80">
          Ask me anything about our college
        </p>
      </div>

      <ScrollArea className="flex-1 p-6" ref={scrollRef}>
        <div className="space-y-1">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border bg-muted/30">
        <ChatInput onSend={onSendMessage} isLoading={isLoading} disabled={disabled} />
      </div>
    </div>
  );
}
