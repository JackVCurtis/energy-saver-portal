import React from 'react';
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUpRight, Zap, DollarSign, TrendingDown, BarChart3 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import PageTransition from '@/components/layout/PageTransition';

const Dashboard = () => {
  // Sample data for the bar chart
  const energyData = [
    { name: 'Jan', usage: 400 },
    { name: 'Feb', usage: 300 },
    { name: 'Mar', usage: 200 },
    { name: 'Apr', usage: 278 },
    { name: 'May', usage: 189 },
    { name: 'Jun', usage: 239 },
  ];

  // Chart configuration for BarChart
  const chartConfig = {
    usage: {
      label: "Energy Usage",
      color: "#3498db",
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          
          {/* Energy usage chart */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Energy Usage</h2>
            <div className="bg-card rounded-lg p-4 shadow">
              <ChartContainer config={chartConfig} className="h-80">
                <BarChart data={energyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="usage" fill="var(--color-usage)" />
                </BarChart>
              </ChartContainer>
            </div>
          </div>
          
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Energy Usage
                </CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,406 kWh</div>
                <p className="text-xs text-muted-foreground">
                  +2.5% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Estimated Cost
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$245.89</div>
                <p className="text-xs text-muted-foreground">
                  +4.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Potential Savings
                </CardTitle>
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$42.50</div>
                <p className="text-xs text-muted-foreground">
                  Based on usage patterns
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Recommendations */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Reduce Standby Power</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    Unplug devices when not in use to save up to 10% on your electricity bill.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Learn More <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Optimize Thermostat</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    Adjust your thermostat by 1-2 degrees to save up to 5% on heating and cooling costs.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Learn More <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Usage breakdown */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Usage Breakdown</h2>
            <Tabs defaultValue="daily">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="daily">Daily</TabsTrigger>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
                <Button variant="outline" size="sm">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </div>
              <TabsContent value="daily" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Daily Energy Consumption</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Your highest usage occurs between 6-8pm. Consider shifting some activities to off-peak hours.
                    </p>
                    <div className="h-[200px] bg-muted/30 rounded-md flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">Detailed usage chart will appear here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="weekly" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Energy Consumption</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Your usage is highest on weekends. Consider running major appliances during weekday off-peak hours.
                    </p>
                    <div className="h-[200px] bg-muted/30 rounded-md flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">Weekly usage chart will appear here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="monthly" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Energy Consumption</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Your usage has decreased by 5% compared to last month. Keep up the good work!
                    </p>
                    <div className="h-[200px] bg-muted/30 rounded-md flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">Monthly usage chart will appear here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
