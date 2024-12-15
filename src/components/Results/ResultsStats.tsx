import { FileText, AlertTriangle, Clock, Activity } from 'lucide-react';

interface ResultsStatsProps {
  stats: {
    totalScans: number;
    averageConfidence: number;
    highSeverity: number;
    pendingReview: number;
  };
}

export default function ResultsStats({ stats }: ResultsStatsProps) {
  const statItems = [
    {
      label: 'Total Scans',
      value: stats.totalScans,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Average Confidence',
      value: `${stats.averageConfidence}%`,
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: 'High Severity Cases',
      value: stats.highSeverity,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      label: 'Pending Review',
      value: stats.pendingReview,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item) => (
        <div
          key={item.label}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
        >
          <div className="flex items-center">
            <div className={`${item.bgColor} p-3 rounded-lg`}>
              <item.icon className={`w-6 h-6 ${item.color}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{item.label}</p>
              <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}