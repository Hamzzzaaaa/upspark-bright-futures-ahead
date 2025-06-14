
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  onClick: () => void;
}

const DashboardCard = ({ title, description, icon: Icon, gradient, onClick }: DashboardCardProps) => {
  return (
    <Card 
      className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 bold-card"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className={`bg-gradient-to-r ${gradient} p-6 rounded-t-xl`}>
          <Icon className="w-8 h-8 text-white mb-2" />
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <div className="p-4 rounded-b-xl">
          <p className="text-gray-200 font-medium">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
