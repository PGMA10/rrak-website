import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Lead, NewsletterSubscriber, PrintQuoteRequest, ConsultationBooking } from "@shared/schema";

export default function Admin() {
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  // Check if already authenticated
  const { data: authStatus, isLoading: authLoading } = useQuery<{ success: boolean; isAuthenticated: boolean }>({
    queryKey: ["/api/admin/status"],
  });

  const loginMutation = useMutation({
    mutationFn: async (password: string) => {
      const res = await apiRequest("POST", "/api/admin/login", { password });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/status"] });
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Login failed",
        description: error.message || "Invalid password",
        variant: "destructive",
      });
    },
  });

  const handleLogin = () => {
    if (!password) {
      toast({
        title: "Password required",
        description: "Please enter a password",
        variant: "destructive",
      });
      return;
    }
    loginMutation.mutate(password);
  };

  if (authLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-muted/20">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!authStatus?.isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-muted/20">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Admin Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              disabled={loginMutation.isPending}
              data-testid="input-password"
            />
            <Button 
              onClick={handleLogin} 
              className="w-full"
              disabled={loginMutation.isPending}
              data-testid="button-login"
            >
              {loginMutation.isPending ? "Logging in..." : "Login"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <AdminDashboard />;
}

function AdminDashboard() {
  const { toast } = useToast();

  const { data: leads } = useQuery<{ success: boolean; data: Lead[] }>({
    queryKey: ["/api/admin/leads"],
  });

  const { data: subscribers } = useQuery<{ success: boolean; data: NewsletterSubscriber[] }>({
    queryKey: ["/api/admin/newsletter-subscribers"],
  });

  const { data: quotes } = useQuery<{ success: boolean; data: PrintQuoteRequest[] }>({
    queryKey: ["/api/admin/quote-requests"],
  });

  const { data: bookings } = useQuery<{ success: boolean; data: ConsultationBooking[] }>({
    queryKey: ["/api/admin/consultation-bookings"],
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/admin/logout", {});
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/status"] });
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
    },
  });

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <header className="sticky top-0 z-50 backdrop-blur-sm bg-background/80 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-16 md:h-20">
            <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <a href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Back to Site
              </a>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
                data-testid="button-logout"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="leads" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="leads" data-testid="tab-leads">
                Leads ({leads?.data?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="subscribers" data-testid="tab-subscribers">
                Subscribers ({subscribers?.data?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="quotes" data-testid="tab-quotes">
                Quote Requests ({quotes?.data?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="bookings" data-testid="tab-bookings">
                Consultations ({bookings?.data?.length || 0})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="leads" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Form Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Date</th>
                          <th className="text-left p-2">Name</th>
                          <th className="text-left p-2">Email</th>
                          <th className="text-left p-2">Phone</th>
                          <th className="text-left p-2">Business</th>
                          <th className="text-left p-2">Interest</th>
                          <th className="text-left p-2">Message</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leads?.data?.map((lead) => (
                          <tr key={lead.id} className="border-b" data-testid={`row-lead-${lead.id}`}>
                            <td className="p-2 text-muted-foreground">{formatDate(lead.createdAt)}</td>
                            <td className="p-2">{lead.name}</td>
                            <td className="p-2">{lead.email}</td>
                            <td className="p-2">{lead.phone || "-"}</td>
                            <td className="p-2">{lead.businessName || "-"}</td>
                            <td className="p-2">{lead.serviceInterest || "-"}</td>
                            <td className="p-2 max-w-xs truncate">{lead.message || "-"}</td>
                          </tr>
                        ))}
                        {(!leads?.data || leads.data.length === 0) && (
                          <tr>
                            <td colSpan={7} className="p-4 text-center text-muted-foreground">
                              No leads yet
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subscribers" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Newsletter Subscribers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Date</th>
                          <th className="text-left p-2">Email</th>
                          <th className="text-left p-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subscribers?.data?.map((sub) => (
                          <tr key={sub.id} className="border-b" data-testid={`row-subscriber-${sub.id}`}>
                            <td className="p-2 text-muted-foreground">{formatDate(sub.subscribedAt)}</td>
                            <td className="p-2">{sub.email}</td>
                            <td className="p-2">{sub.status}</td>
                          </tr>
                        ))}
                        {(!subscribers?.data || subscribers.data.length === 0) && (
                          <tr>
                            <td colSpan={3} className="p-4 text-center text-muted-foreground">
                              No subscribers yet
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="quotes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Print Quote Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Date</th>
                          <th className="text-left p-2">Name</th>
                          <th className="text-left p-2">Email</th>
                          <th className="text-left p-2">Phone</th>
                          <th className="text-left p-2">Material</th>
                          <th className="text-left p-2">Quantity</th>
                          <th className="text-left p-2">Timeline</th>
                        </tr>
                      </thead>
                      <tbody>
                        {quotes?.data?.map((quote) => (
                          <tr key={quote.id} className="border-b" data-testid={`row-quote-${quote.id}`}>
                            <td className="p-2 text-muted-foreground">{formatDate(quote.createdAt)}</td>
                            <td className="p-2">{quote.name}</td>
                            <td className="p-2">{quote.email}</td>
                            <td className="p-2">{quote.phone || "-"}</td>
                            <td className="p-2">{quote.materialType || "-"}</td>
                            <td className="p-2">{quote.quantity || "-"}</td>
                            <td className="p-2">{quote.timeline || "-"}</td>
                          </tr>
                        ))}
                        {(!quotes?.data || quotes.data.length === 0) && (
                          <tr>
                            <td colSpan={7} className="p-4 text-center text-muted-foreground">
                              No quote requests yet
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Consultation Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Date</th>
                          <th className="text-left p-2">Name</th>
                          <th className="text-left p-2">Email</th>
                          <th className="text-left p-2">Phone</th>
                          <th className="text-left p-2">Service Type</th>
                          <th className="text-left p-2">Preferred Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings?.data?.map((booking) => (
                          <tr key={booking.id} className="border-b" data-testid={`row-booking-${booking.id}`}>
                            <td className="p-2 text-muted-foreground">{formatDate(booking.createdAt)}</td>
                            <td className="p-2">{booking.name}</td>
                            <td className="p-2">{booking.email}</td>
                            <td className="p-2">{booking.phone || "-"}</td>
                            <td className="p-2">{booking.serviceType || "-"}</td>
                            <td className="p-2">{booking.preferredTime || "-"}</td>
                          </tr>
                        ))}
                        {(!bookings?.data || bookings.data.length === 0) && (
                          <tr>
                            <td colSpan={6} className="p-4 text-center text-muted-foreground">
                              No consultation bookings yet
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
