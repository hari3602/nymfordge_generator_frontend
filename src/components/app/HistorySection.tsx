import React from 'react';
import type { HistoryItem } from '../../App';

type Props = {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
};

export function HistorySection({ history, onSelect }: Props) {
  if (history.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-12">
        No history yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {history.map(item => (
        <div
          key={item.id}
          onClick={() => onSelect(item)}
          className="bg-white border rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition"
        >
          <p className="font-medium text-gray-900">
            {item.prompt}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {new Date(item.createdAt).toLocaleString()}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {item.results.length} names generated
          </p>
        </div>
      ))}
    </div>
  );
}
