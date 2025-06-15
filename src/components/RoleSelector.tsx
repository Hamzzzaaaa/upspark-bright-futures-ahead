
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, UserCheck, Shield, Heart } from 'lucide-react';
import { useUserRole } from '@/contexts/UserRoleContext';

const RoleSelector = () => {
  const { userRole, setUserRole } = useUserRole();

  const roles = [
    {
      id: 'parent' as const,
      name: 'Parent/Guardian',
      icon: Heart,
      description: 'Full access to all features',
      color: 'text-pink-400',
    },
    {
      id: 'therapist' as const,
      name: 'Therapist',
      icon: UserCheck,
      description: 'Professional therapy features',
      color: 'text-blue-400',
    },
    {
      id: 'child' as const,
      name: 'Child',
      icon: User,
      description: 'Activities and games only',
      color: 'text-green-400',
    },
    {
      id: 'admin' as const,
      name: 'Administrator',
      icon: Shield,
      description: 'Complete system access',
      color: 'text-purple-400',
    },
  ];

  return (
    <Card className="bold-card mb-8">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-black text-white">Switch View</CardTitle>
        <p className="text-lg font-bold text-white opacity-90">
          Experience different perspectives of the app
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {roles.map((role) => (
            <Button
              key={role.id}
              onClick={() => setUserRole(role.id)}
              variant={userRole === role.id ? "default" : "outline"}
              className={`p-4 h-auto flex flex-col items-center space-y-2 ${
                userRole === role.id 
                  ? 'bold-button' 
                  : 'border-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              <role.icon className={`w-6 h-6 ${role.color}`} />
              <div className="text-center">
                <div className="font-black text-sm">{role.name}</div>
                <div className="font-bold text-xs opacity-80">{role.description}</div>
              </div>
            </Button>
          ))}
        </div>
        <div className="text-center mt-4">
          <p className="text-sm font-bold text-gray-300">
            Current view: <span className="text-primary font-black">
              {roles.find(r => r.id === userRole)?.name}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoleSelector;
