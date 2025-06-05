'use client';
import React, { useState, useEffect } from 'react';
import { getRandomQuote, getRandomQuoteByCategory, getAllCategories } from '../quote';

const QuoteCard = ({ cardBg = 'bg-white', refreshInterval = 30000, darkMode = false }) => {
  const [currentQuote, setCurrentQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const textPrimary = darkMode ? "text-slate-200" : "text-gray-800";
  const textSecondary = darkMode ? "text-slate-400" : "text-gray-600";
  const textAccent = darkMode ? "text-slate-300" : "text-gray-700";
  const borderColor = darkMode ? "border-slate-700" : "border-gray-200";

  // Get a new random quote
  const refreshQuote = () => {
    setIsLoading(true);
    const newQuote = getRandomQuote();
    setCurrentQuote(newQuote);
    setIsLoading(false);
  };

  // Get quote by specific category
  const getQuoteByCategory = (category) => {
    setIsLoading(true);
    const newQuote = getRandomQuoteByCategory(category);
    setCurrentQuote(newQuote);
    setIsLoading(false);
  };

  // Initialize with random quote
  useEffect(() => {
    refreshQuote();
  }, []);

  // Auto-refresh quote at specified interval
  useEffect(() => {
    if (refreshInterval > 0) {
      const interval = setInterval(refreshQuote, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [refreshInterval]);

  if (isLoading || !currentQuote) {
    return (
      <div className={`rounded-xl shadow-md p-2 sm:p-3 md:p-4 border ${cardBg} flex flex-col transition-colors duration-300 h-full min-h-[120px] sm:min-h-[150px] overflow-hidden`}>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-gray-500 text-xs sm:text-sm">Loading quote...</div>
        </div>
      </div>
    );
  }

  // Dynamic text sizing based on quote length and screen size
  const getQuoteTextSize = () => {
    const quoteLength = currentQuote.text.length;
    if (quoteLength < 50) {
      return "text-xs sm:text-sm md:text-base lg:text-lg";
    } else if (quoteLength < 100) {
      return "text-xs sm:text-sm md:text-base";
    } else if (quoteLength < 150) {
      return "text-xs sm:text-sm";
    } else {
      return "text-xs";
    }
  };
 
  return (
    <div className={`rounded-xl p-2 sm:p-3 md:p-4  ${cardBg} flex flex-col transition-colors duration-300 h-full min-h-[120px] sm:min-h-[150px] overflow-hidden group hover:shadow-lg`}>
      {/* Header with category badge and refresh button */}

      <div className={`flex justify-center items-center mb-2 sm:mb-3 mx-4 mt-8 text-sm sm:text-base md:text-lg lg:text-xl font-semibold  ${textPrimary}`}>Good saying</div>

      {/* Quote content */}
      <div className="flex-1 flex flex-col justify-center overflow-hidden w-full">
        <blockquote className={`${textPrimary} ${getQuoteTextSize()} leading-tight sm:leading-relaxed mb-2 sm:mb-3 overflow-hidden flex-1 flex items-center w-full`}>
          <div className="w-full px-1">
            <span className={`text-lg ${textSecondary} leading-none`}>"</span>
            <span className="break-words hyphens-auto">{currentQuote.text}</span>
            <span className={`text-lg ${textSecondary} leading-none`}>"</span>
          </div>
        </blockquote>

        <footer className="w-[90%] px-6 ">
          <cite className={`${textAccent} text-xs sm:text-sm font-medium not-italic block text-right w-full overflow-hidden`}>
            <div className="break-words hyphens-auto max-w-full mr-4">
              — {currentQuote.author}
            </div>
          </cite>
        </footer>
      </div>
    </div>
  );
};

export default QuoteCard;