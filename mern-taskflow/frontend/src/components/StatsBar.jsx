import React from 'react';

const StatsBar = ({ stats }) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const rate = stats?.completionRate ?? 0;
  const offset = circumference * (1 - rate / 100);

  return (
    <div className="bg-white rounded-2xl border border-flow-100 p-6 md:p-8 grid md:grid-cols-[auto,1fr] gap-8 items-center">
      <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
        <svg viewBox="0 0 160 160" className="flow-ring w-full h-full">
          <circle cx="80" cy="80" r={radius} fill="none" stroke="#D7E8E3" strokeWidth="14" />
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="#F5A524"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="font-display text-3xl font-semibold text-ink">{rate}%</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-flow-600">
            flow
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <p className="font-display text-3xl font-semibold text-ink">{stats?.total ?? 0}</p>
          <p className="text-xs font-mono uppercase tracking-widest text-flow-600 mt-1">
            Total
          </p>
        </div>
        <div>
          <p className="font-display text-3xl font-semibold text-ink">{stats?.todo ?? 0}</p>
          <p className="text-xs font-mono uppercase tracking-widest text-flow-600 mt-1">
            To Do
          </p>
        </div>
        <div>
          <p className="font-display text-3xl font-semibold text-ink">
            {stats?.inProgress ?? 0}
          </p>
          <p className="text-xs font-mono uppercase tracking-widest text-flow-600 mt-1">
            In Progress
          </p>
        </div>
        <div>
          <p className="font-display text-3xl font-semibold text-amber-500">
            {stats?.done ?? 0}
          </p>
          <p className="text-xs font-mono uppercase tracking-widest text-flow-600 mt-1">
            Done
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
