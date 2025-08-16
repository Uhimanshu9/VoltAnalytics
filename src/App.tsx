import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Zap, ArrowDown } from 'lucide-react';
import Sidebar from './components/Sidebar';
import VoltageChart from './components/VoltageChart';
import DataTable from './components/DataTable';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorCard from './components/ErrorCard';
import { useVoltageData } from './hooks/useVoltageData';

function App() {
  const [activeSection, setActiveSection] = useState('chart');
  const { data, loading, error } = useVoltageData();


  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !data) {
    return <ErrorCard message={error || 'Failed to load data'} />;
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatNumber = (num: number, decimals = 2) => {
    return num.toFixed(decimals);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'chart':
        return <VoltageChart data={data} />;

      case 'peaks':
        return (
          <DataTable
            title="Local Peaks"
            data={data.peaks}
            icon={<TrendingUp className="w-6 h-6 text-green-500" />}
            columns={[
              {
                key: 'Timestamp',
                header: 'Timestamp',
                render: (value) => formatTimestamp(value),
              },
              {
                key: 'Voltages',
                header: 'Voltage (V)',
                render: (value) => (
                  <span className="font-semibold text-green-600">
                    {formatNumber(value)}
                  </span>
                ),
              },
            ]}
            emptyMessage="No voltage peaks detected"
          />
        );

      case 'lows':
        return (
          <DataTable
            title="Local Lows"
            data={data.lows}
            icon={<TrendingDown className="w-6 h-6 text-orange-500" />}
            columns={[
              {
                key: 'Timestamp',
                header: 'Timestamp',
                render: (value) => formatTimestamp(value),
              },
              {
                key: 'Voltages',
                header: 'Voltage (V)',
                render: (value) => (
                  <span className="font-semibold text-orange-600">
                    {formatNumber(value)}
                  </span>
                ),
              },
            ]}
            emptyMessage="No voltage lows detected"
          />
        );

      case 'below20':
        return (
          <DataTable
            title="Voltage < 20V Instances"
            data={data.below20}
            icon={<Zap className="w-6 h-6 text-red-500" />}
            columns={[
              {
                key: 'Timestamp',
                header: 'Timestamp',
                render: (value) => formatTimestamp(value),
              },
              {
                key: 'Voltages',
                header: 'Voltage (V)',
                render: (value) => (
                  <span className="font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">
                    {formatNumber(value)}
                  </span>
                ),
              },
            ]}
            emptyMessage="No voltage readings below 20V"
          />
        );

      case 'downward':
        return (
          <DataTable
            title="Downward Accelerations"
            data={data.downward_accel}
            icon={<ArrowDown className="w-6 h-6 text-purple-500" />}
            columns={[
              {
                key: 'Timestamp',
                header: 'Timestamp',
                render: (value) => formatTimestamp(value),
              },
              {
                key: 'Voltages',
                header: 'Voltage (V)',
                render: (value) => (
                  <span className="font-semibold">
                    {formatNumber(value)}
                  </span>
                ),
              },
              {
                key: 'Slope',
                header: 'Slope',
                render: (value) => (
                  <span className={`font-medium ${value < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {formatNumber(value, 3)}
                  </span>
                ),
              },
              {
                key: 'Acceleration',
                header: 'Acceleration',
                render: (value) => (
                  <span className={`font-medium ${value < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {formatNumber(value, 3)}
                  </span>
                ),
              },
            ]}
            emptyMessage="No downward accelerations detected"
          />
        );

      default:
        return <VoltageChart data={data} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <div className="ml-64 p-8">
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Voltage Analytics Dashboard</h1>
                <p className="text-gray-600 mt-1">
                  Real-time monitoring and analysis • {data?.timestamps?.length || 0} data points
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}

export default App;