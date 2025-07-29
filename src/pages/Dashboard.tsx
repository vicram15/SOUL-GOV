import { StatsCard } from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Baby, 
  MapPin, 
  TrendingUp, 
  Heart,
  IdCard,
  School,
  AlertTriangle
} from "lucide-react";
import heroDashboard from "@/assets/hero-dashboard.jpg";

export default function Dashboard() {
  return (
    <div className="space-y-8 p-6">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden">
        <img 
          src={heroDashboard} 
          alt="Child Impact Dashboard" 
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/50 flex items-center">
          <div className="max-w-2xl mx-auto text-center text-primary-foreground px-6">
            <h1 className="text-4xl font-bold mb-4">Child Impact Hub</h1>
            <p className="text-xl opacity-90">
              Comprehensive platform for child welfare management across India
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Button variant="secondary" size="lg">
                <TrendingUp className="w-5 h-5 mr-2" />
                View Reports
              </Button>
              <Button variant="outline" size="lg" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                <MapPin className="w-5 h-5 mr-2" />
                Regional Map
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Children Registered"
          value="24,847"
          subtitle="Across all states"
          icon={Baby}
          trend={{ value: 8.2, isPositive: true }}
          variant="child-care"
        />
        <StatsCard
          title="Active Volunteers"
          value="1,256"
          subtitle="Verified & KYC complete"
          icon={Users}
          trend={{ value: 12.5, isPositive: true }}
          variant="volunteer"
        />
        <StatsCard
          title="Districts Covered"
          value="487"
          subtitle="Out of 766 total"
          icon={MapPin}
          trend={{ value: 4.1, isPositive: true }}
          variant="success"
        />
        <StatsCard
          title="CSR Contributions"
          value="₹2.4Cr"
          subtitle="This financial year"
          icon={Heart}
          trend={{ value: 18.7, isPositive: true }}
          variant="default"
        />
      </div>

      {/* Quick Actions & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Users className="w-6 h-6" />
                <span>Add Volunteer</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Baby className="w-6 h-6" />
                <span>Register Child</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <School className="w-6 h-6" />
                <span>School Matching</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <IdCard className="w-6 h-6" />
                <span>ID Verification</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-secondary" />
              Priority Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 rounded-lg border border-secondary/20 bg-secondary-soft">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-sm">ID Verification Pending</p>
                    <p className="text-xs text-muted-foreground">147 children missing Aadhaar</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 rounded-lg border border-volunteer/20 bg-success-soft">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-volunteer rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-sm">KYC Incomplete</p>
                    <p className="text-xs text-muted-foreground">23 volunteers require verification</p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-destructive/20 bg-destructive/5">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-sm">School Assignment</p>
                    <p className="text-xs text-muted-foreground">89 children need school placement</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                action: "New child registered",
                detail: "Priya Sharma, Age 8, registered in Uttar Pradesh by volunteer V-2847",
                time: "2 hours ago",
                type: "child"
              },
              {
                action: "Volunteer verification completed",
                detail: "Rajesh Kumar from Mumbai district completed KYC verification",
                time: "4 hours ago",
                type: "volunteer"
              },
              {
                action: "School assignment successful",
                detail: "15 children assigned to Government Primary School, Bangalore",
                time: "6 hours ago",
                type: "school"
              },
              {
                action: "CSR contribution received",
                detail: "₹2.5L received from TechCorp Foundation for education initiative",
                time: "1 day ago",
                type: "csr"
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg border">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'child' ? 'bg-child-care' :
                  activity.type === 'volunteer' ? 'bg-volunteer' :
                  activity.type === 'school' ? 'bg-success' :
                  'bg-primary'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.detail}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}