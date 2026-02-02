import React from 'react';
import { Sparkles, History, CreditCard, User } from 'lucide-react';

type AppHeaderProps = {
  view: 'generator' | 'history';
  onChangeView: (view: 'generator' | 'history') => void;
};


export function AppHeader({ view, onChangeView }: AppHeaderProps) {
  const navItems = [
      {
        icon: Sparkles,
        label: 'Generator',
        view: 'generator' as const,
        type: 'internal'  as const,
      },
      {
        icon: History,
        label: 'History',
        view: 'history' as const,
        type: 'internal'  as const,
      },
      {
        icon: CreditCard,
        label: 'Pricing',
        href: 'https://yourdomain.com/pricing',
        type: 'external'  as const,
      },
    

  ];

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-xl font-bold text-gray-900">NymFordge</span>
            </a>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive =
                  item.type === 'internal' && item.view === view;

                if (item.type === 'external') {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="text-sm">{item.label}</span>
                    </a>
                  );
                }

                return (
                  <button
                    key={item.label}
                    onClick={() => onChangeView(item.view)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-slate-100 text-slate-900'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 text-sm text-gray-700 hover:text-slate-900 transition-colors">
              Upgrade to Pro
            </button>
            <button className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center text-white hover:shadow-md transition-shadow">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
