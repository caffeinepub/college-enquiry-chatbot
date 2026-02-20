import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Bot } from 'lucide-react';
import type { ChatMessage as ChatMessageType } from '../hooks/useChat';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.sender === 'bot';

  return (
    <div
      className={`flex gap-3 mb-4 animate-fade-in ${
        isBot ? 'justify-start' : 'justify-end'
      }`}
    >
      {isBot && (
        <Avatar className="h-9 w-9 border-2 border-primary/20">
          <AvatarImage src="/assets/generated/chatbot-avatar.dim_80x80.png" alt="Bot" />
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Bot className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-soft ${
          isBot
            ? 'bg-card border border-border text-card-foreground rounded-tl-sm'
            : 'bg-primary text-primary-foreground rounded-tr-sm'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {message.text}
        </p>
        <span
          className={`text-xs mt-1 block ${
            isBot ? 'text-muted-foreground' : 'text-primary-foreground/70'
          }`}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>

      {!isBot && (
        <Avatar className="h-9 w-9 border-2 border-accent/20">
          <AvatarFallback className="bg-accent text-accent-foreground">
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
