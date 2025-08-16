import React from 'react';
import { BarChart3, TrendingUp, TrendingDown, Zap, ArrowDown } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const sections = [
    { id: 'chart', label: 'Chart', icon: BarChart3 },
    { id: 'peaks', label: 'Peaks', icon: TrendingUp },
    { id: 'lows', label: 'Lows', icon: TrendingDown },
    { id: 'below20', label: 'Voltage < 20', icon: Zap },
    { id: 'downward', label: 'Downward Accelerations', icon: ArrowDown },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white shadow-lg">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold text-blue-400">Voltage Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Real-time Analytics</p>
      </div>
      
      <nav className="mt-8">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-800 transition-colors ${
                activeSection === section.id 
                  ? 'bg-blue-600 border-r-4 border-blue-400' 
                  : ''
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {section.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;