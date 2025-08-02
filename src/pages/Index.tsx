import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Baby, Map, School, ShieldCheck, Heart, BarChart3, ArrowRight, User, MapPin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/Layout";
import Dashboard from "./Dashboard";
import heroImage from "@/assets/hero-dashboard.jpg";

const Index = () => {
  const { user, profile } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4 py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
                    Transforming Lives Through
                    <span className="text-primary block">Digital Inclusion</span>
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-lg">
                    SOUL Platform: Empowering states to identify, track, and support out-of-school children with comprehensive data management and analysis tools.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/auth">
                    <Button size="lg" className="text-lg px-8">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="text-lg px-8">
                    Learn More
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <img
                  src={heroImage}
                  alt="SOUL Platform Dashboard"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Comprehensive Platform Features</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                From data collection to analysis, our platform provides everything needed to support out-of-school children
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Baby,
                  title: "Child Data Management",
                  description: "Comprehensive tracking and management of out-of-school children data"
                },
                {
                  icon: Users,
                  title: "Volunteer Coordination",
                  description: "Efficiently manage and coordinate volunteers across different regions"
                },
                {
                  icon: Map,
                  title: "Geographic Mapping",
                  description: "Visual mapping and geographic analysis of education gaps"
                },
                {
                  icon: School,
                  title: "School Directory",
                  description: "Complete database of educational institutions and their capabilities"
                },
                {
                  icon: ShieldCheck,
                  title: "Identity Management",
                  description: "Secure identity verification and documentation tracking"
                },
                {
                  icon: BarChart3,
                  title: "Analytics & Reports",
                  description: "Detailed insights and reporting for data-driven decisions"
                }
              ].map((feature, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <feature.icon className="h-12 w-12 text-primary mb-4" />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }
  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};

export default Index;
