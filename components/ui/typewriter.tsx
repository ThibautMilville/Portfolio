'use client';
import React, { useEffect, useState } from 'react';

interface TypewriterProps {
  words: string[];
  loop?: boolean;
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
  className?: string;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  words,
  loop = true,
  typingSpeed = 80,
  deletingSpeed = 40,
  pause = 1500,
  className = '',
}) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentWord = words[wordIndex % words.length];

    if (isDeleting) {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setText(currentWord.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
        setTyping(false);
        timeout = setTimeout(() => setTyping(true), 300);
      }
    } else if (charIndex < currentWord.length) {
      timeout = setTimeout(() => {
        setText(currentWord.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, typingSpeed);
    } else {
      if (loop || wordIndex < words.length - 1) {
        setTyping(false);
        timeout = setTimeout(() => {
          setIsDeleting(true);
          setTyping(true);
        }, pause);
      }
    }
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, words, typing, typingSpeed, deletingSpeed, pause, loop]);

  useEffect(() => {
    if (typing) return;
    // Pause before next action
  }, [typing]);

  return (
    <span className={`inline-block ${className}`}>
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
}; 