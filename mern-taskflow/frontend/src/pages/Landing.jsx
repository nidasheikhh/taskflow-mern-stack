import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

const steps = [
  {
    label: 'Capture',
    text: 'Drop a task in before it slips your mind — title, category, priority, done in seconds.',
  },
  {
    label: 'Sort',
    text: 'Move work across To Do, In Progress and Done as it actually happens, not as you planned it.',
  },
  {
    label: 'See',
    text: 'Watch your flow ring fill in as you close things out — momentum you can actually see.',
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-mist">
      <Navbar />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-20 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <p className="font-mono text-xs tracking-widest uppercase text-flow-600 mb-4">
            A calmer way to manage work
          </p>
          <h1 className="font-display text-4xl md:text-6xl leading-[1.05] font-semibold text-ink mb-6">
            Find your <span className="italic text-flow-600">flow</span>,
            <br /> one task at a time.
          </h1>
          <p className="text-flow-700 text-lg mb-8 max-w-md">
            TaskFlow is a focused task manager built for people who'd rather
            finish things than organize them. Capture work, move it forward,
            watch your progress take shape.
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/register"
              className="px-6 py-3 rounded-full bg-flow-700 text-white font-semibold hover:bg-ink transition-colors"
            >
              Start for free
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 rounded-full border border-flow-700 text-flow-700 font-semibold hover:bg-flow-100 transition-colors"
            >
              I already have an account
            </Link>
          </div>
        </div>

        {/* Signature element: animated flow ring showing a sample completion state */}
        <div className="flex justify-center md:justify-end">
          <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="flow-ring w-full h-full">
              <circle
                cx="100"
                cy="100"
                r="86"
                fill="none"
                stroke="#D7E8E3"
                strokeWidth="16"
              />
              <circle
                cx="100"
                cy="100"
                r="86"
                fill="none"
                stroke="#F5A524"
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 86}
                strokeDashoffset={2 * Math.PI * 86 * (1 - 0.68)}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="font-display text-5xl font-semibold text-ink">68%</span>
              <span className="font-mono text-xs uppercase tracking-widest text-flow-600 mt-1">
                this week's flow
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-24">
        <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink mb-10">
          Three moves. That's the whole system.
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={step.label}
              className="bg-white rounded-2xl p-7 border border-flow-100 task-card"
            >
              <span className="font-mono text-xs text-amber-500 tracking-widest">
                0{i + 1}
              </span>
              <h3 className="font-display text-xl font-semibold text-ink mt-3 mb-2">
                {step.label}
              </h3>
              <p className="text-flow-700 text-sm leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-flow-100 py-8">
        <p className="text-center text-sm text-flow-600 font-mono">
          Built with the MERN stack — MongoDB · Express · React · Node.js
        </p>
      </footer>
    </div>
  );
};

export default Landing;
