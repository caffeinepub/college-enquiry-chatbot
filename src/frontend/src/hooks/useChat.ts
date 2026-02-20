import { useState, useCallback } from 'react';
import { useAskQuestion } from './useQueries';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function useChat(collegeId: bigint | null) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      text: "Hello! I'm here to help you with your college inquiries. Ask me anything about admissions, courses, campus life, fees, scholarships, and more!",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);

  const askQuestionMutation = useAskQuestion();

  const sendMessage = useCallback(
    async (question: string) => {
      if (!question.trim() || collegeId === null) return;

      // Add user message
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        text: question,
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);

      try {
        // Call backend
        const response = await askQuestionMutation.mutateAsync({
          question,
          collegeId,
        });

        // Add bot response
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: response.answer,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        // Add error message
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: 'Sorry, I encountered an error processing your question. Please try again.',
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    },
    [collegeId, askQuestionMutation]
  );

  return {
    messages,
    sendMessage,
    isLoading: askQuestionMutation.isPending,
    error: askQuestionMutation.error,
  };
}
