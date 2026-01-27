import React, { useState } from 'react';
import { AppHeader } from './components/app/AppHeader';
import { PromptInput } from './components/app/PromptInput';
import { ResultsSection } from './components/app/ResultsSection';
import { NameDetailDrawer } from './components/app/NameDetailDrawer';
import { EmptyState } from './components/app/EmptyState';
import { LoadingState } from './components/app/LoadingState';

export type NameResult = {
  id: string;
  name: string;
  domains: {
    com: boolean;
    io: boolean;
    ai: boolean;
    app: boolean;
  };
  socials: {
    instagram: boolean;
    twitter: boolean;
    linkedin: boolean;
    tiktok: boolean;
  };
  explanation: string;
  brandability: number;
};

export default function App() {
  const [results, setResults] = useState<NameResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedName, setSelectedName] = useState<NameResult | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleGenerate = async (prompt: string, industry: string, preferredExtensions: string[]) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock results
    const mockResults: NameResult[] = [
      {
        id: '1',
        name: 'Brandify',
        domains: { com: true, io: true, ai: false, app: true },
        socials: { instagram: true, twitter: true, linkedin: true, tiktok: false },
        explanation: 'A blend of "brand" and "simplify", perfect for a SaaS product that makes branding easier.',
        brandability: 95,
      },
      {
        id: '2',
        name: 'Namescape',
        domains: { com: false, io: true, ai: true, app: true },
        socials: { instagram: false, twitter: true, linkedin: true, tiktok: true },
        explanation: 'Combines "name" with "landscape", suggesting a vast space of naming possibilities.',
        brandability: 88,
      },
      {
        id: '3',
        name: 'Nymly',
        domains: { com: true, io: true, ai: true, app: true },
        socials: { instagram: true, twitter: true, linkedin: true, tiktok: true },
        explanation: 'A playful, modern take on "namely", easy to pronounce and memorable.',
        brandability: 92,
      },
      {
        id: '4',
        name: 'Brandbase',
        domains: { com: true, io: false, ai: true, app: true },
        socials: { instagram: true, twitter: false, linkedin: true, tiktok: true },
        explanation: 'Suggests a foundational platform for brand building and naming.',
        brandability: 85,
      },
      {
        id: '5',
        name: 'Namora',
        domains: { com: true, io: true, ai: true, app: false },
        socials: { instagram: true, twitter: true, linkedin: true, tiktok: true },
        explanation: 'A unique, pronounceable name with a modern, tech-forward feel.',
        brandability: 90,
      },
    ];
    
    setResults(mockResults);
    setLoading(false);
  };

  const handleNameClick = (name: NameResult) => {
    setSelectedName(name);
    setDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PromptInput onGenerate={handleGenerate} />
        
        <div className="mt-8">
          {loading ? (
            <LoadingState />
          ) : results.length > 0 ? (
            <ResultsSection 
              results={results} 
              onNameClick={handleNameClick}
            />
          ) : (
            <EmptyState />
          )}
        </div>
      </main>

      <NameDetailDrawer
        name={selectedName}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}
