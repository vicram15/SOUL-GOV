import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export type UserRole = 'super_admin' | 'state_admin' | 'district_admin' | 'auditor' | 'csr_partner' | 'volunteer';

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  state?: string;
  district?: string;
  roles: UserRole[];
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
  canAccess: (requiredRoles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const logAccessAttempt = async (resource: string, success: boolean) => {
    if (user) {
      try {
        // TODO: Enable after migration is executed
        // await supabase.from('access_logs').insert({
        //   user_id: user.id,
        //   resource,
        //   success,
        //   ip_address: 'unknown',
        //   user_agent: navigator.userAgent
        // });
        console.log('Access attempt:', { resource, success });
      } catch (error) {
        console.error('Failed to log access attempt:', error);
      }
    }
  };

  const fetchProfile = async (userId: string) => {
    try {
      // TODO: Enable after migration is executed
      // For now, create a default profile with proper email
      const userEmail = user?.email || '';
      setProfile({
        id: userId,
        email: userEmail,
        full_name: user?.user_metadata?.full_name || userEmail.split('@')[0],
        state: undefined,
        district: undefined,
        roles: ['super_admin'] // Default role for testing
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      setProfile(null);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        await logAccessAttempt('login', false);
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        await logAccessAttempt('login', true);
        toast({
          title: "Welcome back!",
          description: "You have been successfully logged in."
        });
      }
      
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName
          }
        }
      });
      
      if (error) {
        toast({
          title: "Registration Failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Registration Successful",
          description: "Please check your email to verify your account."
        });
      }
      
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await logAccessAttempt('logout', true);
      await supabase.auth.signOut();
      setProfile(null);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out."
      });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const hasRole = (role: UserRole): boolean => {
    return profile?.roles.includes(role) ?? false;
  };

  const hasAnyRole = (roles: UserRole[]): boolean => {
    return roles.some(role => hasRole(role));
  };

  const canAccess = (requiredRoles: UserRole[]): boolean => {
    if (!profile || !user) return false;
    if (requiredRoles.length === 0) return true; // No roles required
    return hasAnyRole(requiredRoles);
  };

  const value = {
    user,
    session,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    hasRole,
    hasAnyRole,
    canAccess
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}