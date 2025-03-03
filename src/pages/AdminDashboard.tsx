
import React from 'react';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/layout/Navbar';
import { RequireAdmin } from '@/contexts/AuthContext';

const AdminDashboard = () => {
  return (
    <RequireAdmin>
      <PageTransition>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          
          <main className="flex-1 container mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage users and system settings</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-card border rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">User Management</h2>
                <p className="text-muted-foreground mb-4">
                  View and manage user accounts and permissions
                </p>
              </div>
              
              <div className="bg-card border rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">System Settings</h2>
                <p className="text-muted-foreground mb-4">
                  Configure application settings and parameters
                </p>
              </div>
              
              <div className="bg-card border rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Analytics</h2>
                <p className="text-muted-foreground mb-4">
                  View system-wide analytics and reports
                </p>
              </div>
            </div>
          </main>
        </div>
      </PageTransition>
    </RequireAdmin>
  );
};

export default AdminDashboard;
