
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

type UserRole = 'parent' | 'therapist' | 'admin' | 'child';

interface UserRoleContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  userPermissions: {
    canViewMedicine: boolean;
    canViewTherapist: boolean;
    canViewActivities: boolean;
    canViewProfile: boolean;
    canViewDocuments: boolean;
    canEditProfile: boolean;
  };
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

export const useUserRole = () => {
  const context = useContext(UserRoleContext);
  if (!context) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
};

export const UserRoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<UserRole>('parent');

  useEffect(() => {
    // Determine user role based on stored data or user metadata
    const storedRole = localStorage.getItem('userRole') as UserRole;
    if (storedRole) {
      setUserRole(storedRole);
    } else {
      // Default to parent role for new users
      setUserRole('parent');
      localStorage.setItem('userRole', 'parent');
    }
  }, [user]);

  const userPermissions = {
    parent: {
      canViewMedicine: true,
      canViewTherapist: true,
      canViewActivities: true,
      canViewProfile: true,
      canViewDocuments: true,
      canEditProfile: true,
    },
    therapist: {
      canViewMedicine: false,
      canViewTherapist: true,
      canViewActivities: true,
      canViewProfile: true,
      canViewDocuments: true,
      canEditProfile: true,
    },
    admin: {
      canViewMedicine: true,
      canViewTherapist: true,
      canViewActivities: true,
      canViewProfile: true,
      canViewDocuments: true,
      canEditProfile: true,
    },
    child: {
      canViewMedicine: false,
      canViewTherapist: false,
      canViewActivities: true,
      canViewProfile: false,
      canViewDocuments: false,
      canEditProfile: false,
    },
  };

  return (
    <UserRoleContext.Provider value={{
      userRole,
      setUserRole: (role: UserRole) => {
        setUserRole(role);
        localStorage.setItem('userRole', role);
      },
      userPermissions: userPermissions[userRole],
    }}>
      {children}
    </UserRoleContext.Provider>
  );
};
