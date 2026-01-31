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
  brandability: number;
  explanation?: string;

  domains?: {
    domain: string;
    extension: string;
  }[];

  socials?: {
    platform: string;
    handle: string;
    available: boolean;
  }[];
};

export default function App() {
  const [results, setResults] = useState<NameResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedName, setSelectedName] = useState<NameResult | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerLoading, setDrawerLoading] = useState(false);
  const [selectedExtensions, setSelectedExtensions] = useState<string[]>([]);



 const handleGenerate = async (
  prompt: string,
  industry: string,
  preferredExtensions: string[]
) => {
  setLoading(true);
  setResults([]);
  setSelectedExtensions(preferredExtensions);
  try {
    const response = await fetch("http://localhost:8000/generate-names", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        industry,
        extensions: preferredExtensions,
      }),
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    setResults(data.results);
  } catch (error) {
    console.error(error);
    alert("Something went wrong while generating names.");
  } finally {
    setLoading(false);
  }
};


  const handleNameClick = async (name: NameResult) => {
  // 1️⃣ Open drawer instantly
  setDrawerOpen(true);
  setDrawerLoading(true);
  setSelectedName(name);

  try {
    // 2️⃣ Call backend
    const response = await fetch("http://localhost:8000/check-availability", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.name,
        extensions: selectedExtensions,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch availability");
    }

    const data = await response.json();

    // 3️⃣ Merge backend response
    setSelectedName(prev =>
      prev
        ? {
            ...prev,
            domains: data.domains,
            socials: data.socials,
          }
        : prev
    );
  } catch (error) {
    console.error(error);
  } finally {
    // 4️⃣ Stop loading
    setDrawerLoading(false);
  }
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
        loading={drawerLoading}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}
