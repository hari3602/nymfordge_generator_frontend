import React, { useState } from 'react';
import { Copy, Heart, ExternalLink, Check, X, Filter, Search } from 'lucide-react';
import { motion } from 'motion/react';
import type { NameResult } from '../../App';

type ResultsSectionProps = {
  results: NameResult[];
  onNameClick: (name: NameResult) => void;
};

export function ResultsSection({ results, onNameClick }: ResultsSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('brandability');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const handleCopy = (name: string, id: string) => {
    navigator.clipboard.writeText(name);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const isFullyAvailable = (result: NameResult) => {
    return Object.values(result.domains).some(v => v) && 
           Object.values(result.socials).some(v => v);
  };

  const filteredResults = results
    .filter((r) => r.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((r) => !onlyAvailable || isFullyAvailable(r))
    .sort((a, b) => {
      if (sortBy === 'brandability') return b.brandability - a.brandability;
      if (sortBy === 'shortest') return a.name.length - b.name.length;
      return 0;
    });

  return (
    <div>
      {/* Filters Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex items-center space-x-4 flex-1 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search names..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              />
            </div>

            {/* Only Available Toggle */}
            <button
              onClick={() => setOnlyAvailable(!onlyAvailable)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${
                onlyAvailable
                  ? 'bg-slate-100 border-slate-300 text-slate-900'
                  : 'bg-white border-gray-300 text-gray-600 hover:border-slate-300'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm whitespace-nowrap">Fully Available</span>
            </button>
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 bg-white cursor-pointer text-sm"
            >
              <option value="brandability">Brandability</option>
              <option value="shortest">Shortest Name</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredResults.length}</span> of{' '}
            <span className="font-semibold text-gray-900">{results.length}</span> results
          </p>
        </div>
      </div>

      {/* Results Table/Cards */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Brand Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Domain Availability
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Social Handles
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredResults.map((result, index) => (
                <motion.tr
                  key={result.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => onNameClick(result)}
                >
                  {/* Name */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(result.id);
                        }}
                        className="group"
                      >
                        <Heart
                          className={`w-5 h-5 transition-colors ${
                            favorites.has(result.id)
                              ? 'fill-red-500 text-red-500'
                              : 'text-gray-300 group-hover:text-red-400'
                          }`}
                        />
                      </button>
                      <span className="text-lg font-semibold text-gray-900">{result.name}</span>
                    </div>
                  </td>

                  {/* Domains */}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {Object.entries(result.domains).map(([ext, available]) => (
                        <div
                          key={ext}
                          className={`flex items-center space-x-1 px-2 py-1 rounded text-xs ${
                            available
                              ? 'bg-green-50 text-green-700'
                              : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          {available ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <X className="w-3 h-3" />
                          )}
                          <span>.{ext}</span>
                        </div>
                      ))}
                    </div>
                  </td>

                  {/* Socials */}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {Object.entries(result.socials).map(([platform, available]) => (
                        <div
                          key={platform}
                          className={`w-7 h-7 rounded-full flex items-center justify-center ${
                            available ? 'bg-green-100' : 'bg-gray-100'
                          }`}
                          title={platform}
                        >
                          {available ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <X className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                      ))}
                    </div>
                  </td>

                  {/* Score */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-slate-600 to-slate-800"
                          style={{ width: `${result.brandability}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {result.brandability}
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(result.name, result.id);
                        }}
                        className="p-2 text-gray-600 hover:text-slate-900 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Copy name"
                      >
                        {copiedId === result.id ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNameClick(result);
                        }}
                        className="p-2 text-gray-600 hover:text-slate-900 hover:bg-gray-100 rounded-lg transition-colors"
                        title="View details"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
