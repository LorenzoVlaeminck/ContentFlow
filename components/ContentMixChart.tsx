import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartData } from '../types';

interface Props {
  data: ChartData[];
  isDarkMode?: boolean;
}

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];

const ContentMixChart: React.FC<Props> = ({ data, isDarkMode = false }) => {
  return (
    <div className="w-full h-72 bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-800 flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-300">
       {/* Background accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-bl-full -z-0"></div>
      
      <h4 className="relative z-10 text-xs font-bold text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-widest text-center">Effort Allocation</h4>
      <ResponsiveContainer width="100%" height="100%" className="relative z-10">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            cornerRadius={6}
            stroke={isDarkMode ? '#0f172a' : '#fff'} // Match background for separation
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
                borderRadius: '12px', 
                border: isDarkMode ? '1px solid #334155' : 'none', 
                backgroundColor: isDarkMode ? '#1e293b' : '#fff',
                color: isDarkMode ? '#f1f5f9' : '#1e293b',
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                padding: '8px 12px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                fontWeight: '600'
            }}
            itemStyle={{ color: isDarkMode ? '#f1f5f9' : '#1e293b' }}
          />
          <Legend 
            iconSize={8} 
            iconType="circle"
            wrapperStyle={{ 
                fontSize: '11px', 
                fontWeight: '500', 
                color: isDarkMode ? '#94a3b8' : '#64748b', 
                paddingTop: '10px' 
            }} 
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ContentMixChart;