
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  description: string;
  icon?: string;
  lucideIcon?: LucideIcon;
  gradient?: string;
  href: string;
}

const DashboardCard = ({ title, description, icon, lucideIcon: LucideIconComponent, gradient = "from-blue-500 to-purple-600", href }: DashboardCardProps) => {
  const handleClick = () => {
    window.location.href = href;
  };

  return (
    <Card 
      className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 bold-card"
      onClick={handleClick}
    >
      <CardContent className="p-0">
        <div className={`bg-gradient-to-r ${gradient} p-4 sm:p-6 rounded-t-xl`}>
          {icon && (
            <div className="text-4xl sm:text-5xl mb-2">{icon}</div>
          )}
          {LucideIconComponent && (
            <LucideIconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-white mb-2" />
          )}
          <h3 className="text-xl sm:text-2xl font-black text-white">{title}</h3>
        </div>
        <div className="p-3 sm:p-4 rounded-b-xl">
          <p className="font-black text-white text-base sm:text-lg">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
