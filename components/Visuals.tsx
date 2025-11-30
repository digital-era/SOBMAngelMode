import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const eitData = Array.from({ length: 50 }, (_, i) => ({
  time: i,
  impedance: 50 + Math.sin(i * 0.2) * 20 + Math.random() * 5,
  conductivity: 30 + Math.cos(i * 0.2) * 15 + Math.random() * 3
}));

const brainwaveData = Array.from({ length: 60 }, (_, i) => ({
  time: i,
  alpha: i > 30 ? 40 + Math.random() * 10 : 20 + Math.random() * 5, // Relaxation increases
  beta: i > 30 ? 20 + Math.random() * 5 : 50 + Math.random() * 15, // Stress decreases
}));

export const EITChart: React.FC = () => {
  return (
    <div className="h-48 w-full mt-4 bg-slate-900/50 rounded-lg p-2 border border-slate-700">
      <h4 className="text-xs font-mono text-neon-blue mb-2 pl-2">REAL-TIME EIT IMPEDANCE MAP</h4>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={eitData}>
          <defs>
            <linearGradient id="colorImp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="time" hide />
          <YAxis hide />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '12px' }} 
            itemStyle={{ color: '#e2e8f0' }}
          />
          <Area type="monotone" dataKey="impedance" stroke="#06b6d4" fillOpacity={1} fill="url(#colorImp)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const BCIChart: React.FC = () => {
  return (
    <div className="h-48 w-full mt-4 bg-slate-900/50 rounded-lg p-2 border border-slate-700">
      <h4 className="text-xs font-mono text-neon-purple mb-2 pl-2">NEURAL FEEDBACK LOOP (ALPHA/BETA)</h4>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={brainwaveData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="time" hide />
          <YAxis hide domain={[0, 80]} />
          <Tooltip 
             contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '12px' }} 
          />
          <Line type="monotone" dataKey="beta" stroke="#f43f5e" strokeWidth={2} dot={false} name="Beta (Stress)" />
          <Line type="monotone" dataKey="alpha" stroke="#10b981" strokeWidth={2} dot={false} name="Alpha (Flow)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};