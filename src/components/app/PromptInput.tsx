import React, { useState } from 'react';
import { Sparkles, ChevronDown } from 'lucide-react';

type PromptInputProps = {
  onGenerate: (prompt: string, industry: string, extensions: string[]) => void;
};

export function PromptInput({ onGenerate }: PromptInputProps) {
  const [prompt, setPrompt] = useState('');
  const [industry, setIndustry] = useState('saas');
  const [extensions, setExtensions] = useState(['.com', '.io']);

  const industries = [
    { value: 'saas', label: 'SaaS' },
    { value: 'ai', label: 'AI & ML' },
    { value: 'web3', label: 'Web3 & Crypto' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'creator', label: 'Creator Economy' },
    { value: 'fintech', label: 'Fintech' },
    { value: 'health', label: 'Health & Wellness' },
    { value: 'other', label: 'Other' },
  ];

  const extensionOptions = [
    { value: '.com', label: '.com' },
    { value: '.io', label: '.io' },
    { value: '.ai', label: '.ai' },
    { value: '.app', label: '.app' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt, industry, extensions);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <form onSubmit={handleSubmit}>
        {/* Main Prompt Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Describe your product, brand, or idea
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="E.g., An AI-powered design tool for startups that helps create brand identities in minutes..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none transition-all"
            rows={4}
          />
        </div>

        {/* Filters Row */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Industry Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Industry
            </label>
            <div className="relative">
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent bg-white cursor-pointer"
              >
                {industries.map((ind) => (
                  <option key={ind.value} value={ind.value}>
                    {ind.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Domain Extensions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Domain Extensions
            </label>
            <div className="flex flex-wrap gap-2">
              {extensionOptions.map((ext) => (
                <button
                  key={ext.value}
                  type="button"
                  onClick={() => {
                    if (extensions.includes(ext.value)) {
                      setExtensions(extensions.filter((e) => e !== ext.value));
                    } else {
                      setExtensions([...extensions, ext.value]);
                    }
                  }}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    extensions.includes(ext.value)
                      ? 'bg-slate-100 border-slate-300 text-slate-900'
                      : 'bg-white border-gray-300 text-gray-600 hover:border-slate-300'
                  }`}
                >
                  {ext.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          type="submit"
          disabled={!prompt.trim()}
          className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
        >
          <Sparkles className="w-5 h-5" />
          <span>Generate Names</span>
        </button>

        {/* Quick Tips */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-xs text-gray-500">Try:</span>
          {['Modern SaaS tool', 'AI assistant', 'Creator platform'].map((tip) => (
            <button
              key={tip}
              type="button"
              onClick={() => setPrompt(tip)}
              className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-slate-100 transition-colors"
            >
              {tip}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}
