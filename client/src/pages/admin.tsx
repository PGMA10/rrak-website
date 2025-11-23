import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Pencil, Trash2, Plus, Download } from "lucide-react";
import type { Lead, NewsletterSubscriber, PrintQuoteRequest, ConsultationBooking, SoloMailerWaitlist, LandingPagesWaitlist, EmailMarketingWaitlist, PrintMaterialsWaitlist, BlogPost, InsertBlogPost, CampaignSetting, InsertCampaignSetting } from "@shared/schema";

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

  const { data: soloMailerWaitlist } = useQuery<{ success: boolean; data: SoloMailerWaitlist[] }>({
    queryKey: ["/api/admin/solo-mailer-waitlist"],
  });

  const { data: landingPagesWaitlist } = useQuery<{ success: boolean; data: LandingPagesWaitlist[] }>({
    queryKey: ["/api/admin/landing-pages-waitlist"],
  });

  const { data: emailMarketingWaitlist } = useQuery<{ success: boolean; data: EmailMarketingWaitlist[] }>({
    queryKey: ["/api/admin/email-marketing-waitlist"],
  });

  const { data: printMaterialsWaitlist } = useQuery<{ success: boolean; data: PrintMaterialsWaitlist[] }>({
    queryKey: ["/api/admin/print-materials-waitlist"],
  });

  const { data: blogPosts } = useQuery<{ success: boolean; data: BlogPost[] }>({
    queryKey: ["/api/admin/blog-posts"],
  });

  const { data: campaignSettings } = useQuery<{ success: boolean; data: CampaignSetting }>({
    queryKey: ["/api/campaign-settings"],
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

  const handleExport = (exportType: string) => {
    const url = `/api/admin/export/${exportType}`;
    window.open(url, '_blank');
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
            <TabsList className="flex flex-wrap gap-2 w-full justify-start">
              <TabsTrigger value="leads" data-testid="tab-leads">
                Leads ({leads?.data?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="subscribers" data-testid="tab-subscribers">
                Subscribers ({subscribers?.data?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="quotes" data-testid="tab-quotes">
                Quotes ({quotes?.data?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="bookings" data-testid="tab-bookings">
                Consultations ({bookings?.data?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="solo-mailer" data-testid="tab-solo-mailer">
                Solo Mailer ({soloMailerWaitlist?.data?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="landing-pages" data-testid="tab-landing-pages">
                Landing Pages ({landingPagesWaitlist?.data?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="email-marketing" data-testid="tab-email-marketing">
                Email Marketing ({emailMarketingWaitlist?.data?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="print-materials" data-testid="tab-print-materials">
                Print Materials ({printMaterialsWaitlist?.data?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="blog-posts" data-testid="tab-blog-posts">
                Blog Posts ({blogPosts?.data?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="campaign-settings" data-testid="tab-campaign-settings">
                Campaign Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="leads" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
                  <CardTitle>Contact Form Submissions</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleExport('leads')}
                    data-testid="button-export-leads"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
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
                <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
                  <CardTitle>Newsletter Subscribers</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleExport('newsletter')}
                    data-testid="button-export-newsletter"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
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
                <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
                  <CardTitle>Print Quote Requests</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleExport('quotes')}
                    data-testid="button-export-quotes"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
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
                <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
                  <CardTitle>Consultation Bookings</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleExport('consultations')}
                    data-testid="button-export-consultations"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
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

            <TabsContent value="solo-mailer" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
                  <CardTitle>Solo Direct Mail Waitlist</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleExport('solo-mailer-waitlist')}
                    data-testid="button-export-solo-mailer"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Date</th>
                          <th className="text-left p-2">Name</th>
                          <th className="text-left p-2">Email</th>
                          <th className="text-left p-2">Business</th>
                          <th className="text-left p-2">Interests</th>
                        </tr>
                      </thead>
                      <tbody>
                        {soloMailerWaitlist?.data?.map((item) => (
                          <tr key={item.id} className="border-b" data-testid={`row-solo-mailer-${item.id}`}>
                            <td className="p-2 text-muted-foreground">{formatDate(item.createdAt)}</td>
                            <td className="p-2">{item.name || "-"}</td>
                            <td className="p-2">{item.email}</td>
                            <td className="p-2">{item.businessName || "-"}</td>
                            <td className="p-2">
                              {item.interestAreas && item.interestAreas.length > 0 
                                ? item.interestAreas.join(", ") 
                                : "-"}
                            </td>
                          </tr>
                        ))}
                        {(!soloMailerWaitlist?.data || soloMailerWaitlist.data.length === 0) && (
                          <tr>
                            <td colSpan={5} className="p-4 text-center text-muted-foreground">
                              No solo mailer waitlist signups yet
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="landing-pages" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
                  <CardTitle>Landing Pages Waitlist</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleExport('landing-pages-waitlist')}
                    data-testid="button-export-landing-pages"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Date</th>
                          <th className="text-left p-2">Name</th>
                          <th className="text-left p-2">Email</th>
                          <th className="text-left p-2">Business</th>
                          <th className="text-left p-2">Interests</th>
                        </tr>
                      </thead>
                      <tbody>
                        {landingPagesWaitlist?.data?.map((item) => (
                          <tr key={item.id} className="border-b" data-testid={`row-landing-pages-${item.id}`}>
                            <td className="p-2 text-muted-foreground">{formatDate(item.createdAt)}</td>
                            <td className="p-2">{item.name || "-"}</td>
                            <td className="p-2">{item.email}</td>
                            <td className="p-2">{item.businessName || "-"}</td>
                            <td className="p-2">
                              {item.interestAreas && item.interestAreas.length > 0 
                                ? item.interestAreas.join(", ") 
                                : "-"}
                            </td>
                          </tr>
                        ))}
                        {(!landingPagesWaitlist?.data || landingPagesWaitlist.data.length === 0) && (
                          <tr>
                            <td colSpan={5} className="p-4 text-center text-muted-foreground">
                              No landing pages waitlist signups yet
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="email-marketing" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
                  <CardTitle>Email Marketing Waitlist</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleExport('email-marketing-waitlist')}
                    data-testid="button-export-email-marketing"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Date</th>
                          <th className="text-left p-2">Name</th>
                          <th className="text-left p-2">Email</th>
                          <th className="text-left p-2">Business</th>
                          <th className="text-left p-2">Service Types</th>
                        </tr>
                      </thead>
                      <tbody>
                        {emailMarketingWaitlist?.data?.map((item) => (
                          <tr key={item.id} className="border-b" data-testid={`row-email-marketing-${item.id}`}>
                            <td className="p-2 text-muted-foreground">{formatDate(item.createdAt)}</td>
                            <td className="p-2">{item.name || "-"}</td>
                            <td className="p-2">{item.email}</td>
                            <td className="p-2">{item.businessName || "-"}</td>
                            <td className="p-2">
                              {item.serviceTypes && item.serviceTypes.length > 0 
                                ? item.serviceTypes.join(", ") 
                                : "-"}
                            </td>
                          </tr>
                        ))}
                        {(!emailMarketingWaitlist?.data || emailMarketingWaitlist.data.length === 0) && (
                          <tr>
                            <td colSpan={5} className="p-4 text-center text-muted-foreground">
                              No email marketing waitlist signups yet
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="print-materials" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
                  <CardTitle>Print Materials Waitlist</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleExport('print-materials-waitlist')}
                    data-testid="button-export-print-materials"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Date</th>
                          <th className="text-left p-2">Name</th>
                          <th className="text-left p-2">Email</th>
                          <th className="text-left p-2">Business</th>
                          <th className="text-left p-2">Material Types</th>
                          <th className="text-left p-2">Industry</th>
                          <th className="text-left p-2">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {printMaterialsWaitlist?.data?.map((item) => (
                          <tr key={item.id} className="border-b" data-testid={`row-print-materials-${item.id}`}>
                            <td className="p-2 text-muted-foreground">{formatDate(item.createdAt)}</td>
                            <td className="p-2">{item.name || "-"}</td>
                            <td className="p-2">{item.email}</td>
                            <td className="p-2">{item.businessName || "-"}</td>
                            <td className="p-2">
                              {item.materialTypes && item.materialTypes.length > 0 
                                ? item.materialTypes.join(", ") 
                                : "-"}
                            </td>
                            <td className="p-2">{item.industry || "-"}</td>
                            <td className="p-2">{item.quantity || "-"}</td>
                          </tr>
                        ))}
                        {(!printMaterialsWaitlist?.data || printMaterialsWaitlist.data.length === 0) && (
                          <tr>
                            <td colSpan={7} className="p-4 text-center text-muted-foreground">
                              No print materials waitlist signups yet
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="blog-posts" className="space-y-4">
              <BlogPostsTab posts={blogPosts?.data || []} />
            </TabsContent>

            <TabsContent value="campaign-settings" className="space-y-4">
              <CampaignSettingsTab settings={campaignSettings?.data} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

function BlogPostsTab({ posts }: { posts: BlogPost[] }) {
  const { toast } = useToast();
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/admin/blog-posts/${id}`, null);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog-posts"] });
      toast({
        title: "Blog post deleted",
        description: "The blog post has been deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Delete failed",
        description: error.message || "Failed to delete blog post",
        variant: "destructive",
      });
    },
  });

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleString();
  };

  const handleNewPost = () => {
    setEditingPost(null);
    setIsDialogOpen(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingPost(null);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
        <CardTitle>Blog Posts</CardTitle>
        <BlogPostDialog 
          post={editingPost} 
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) setEditingPost(null);
          }}
          trigger={
            <Button onClick={handleNewPost} data-testid="button-new-post">
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          }
        />
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Title</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Created</th>
                <th className="text-left p-2">Updated</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b" data-testid={`row-blog-post-${post.id}`}>
                  <td className="p-2">{post.title}</td>
                  <td className="p-2">
                    <Badge 
                      variant={post.published ? "default" : "secondary"}
                      data-testid={`badge-status-${post.id}`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </Badge>
                  </td>
                  <td className="p-2 text-muted-foreground">{formatDate(post.createdAt)}</td>
                  <td className="p-2 text-muted-foreground">{formatDate(post.updatedAt)}</td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditPost(post)}
                        data-testid={`button-edit-${post.id}`}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            data-testid={`button-delete-${post.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{post.title}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteMutation.mutate(post.id)}
                              data-testid="button-confirm-delete"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-muted-foreground">
                    No blog posts yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function BlogPostDialog({ 
  post, 
  open, 
  onOpenChange, 
  trigger 
}: { 
  post: BlogPost | null; 
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: React.ReactNode;
}) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<InsertBlogPost>>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    published: false,
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        published: post.published,
      });
    } else {
      setFormData({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        published: false,
      });
    }
  }, [post, open]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  const saveMutation = useMutation({
    mutationFn: async (data: Partial<InsertBlogPost>) => {
      const payload = {
        ...data,
        publishedAt: data.published ? new Date() : null,
      };
      
      if (post) {
        const res = await apiRequest("PATCH", `/api/admin/blog-posts/${post.id}`, payload);
        return res.json();
      } else {
        const res = await apiRequest("POST", "/api/admin/blog-posts", payload);
        return res.json();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog-posts"] });
      toast({
        title: post ? "Blog post updated" : "Blog post created",
        description: `The blog post has been ${post ? "updated" : "created"} successfully`,
      });
      onOpenChange(false);
    },
    onError: (error: any) => {
      toast({
        title: "Save failed",
        description: error.message || "Failed to save blog post",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.slug || !formData.excerpt || !formData.content) {
      toast({
        title: "Validation error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    saveMutation.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{post ? "Edit Blog Post" : "New Blog Post"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" data-testid="label-title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter post title"
              data-testid="input-title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug" data-testid="label-slug">Slug *</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
              placeholder="auto-generated-from-title"
              data-testid="input-slug"
            />
            <p className="text-xs text-muted-foreground">
              URL-friendly version of the title (lowercase, hyphens only)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt" data-testid="label-excerpt">Excerpt *</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
              placeholder="Brief summary of the post"
              rows={3}
              data-testid="input-excerpt"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" data-testid="label-content">Content (Markdown) *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
              placeholder="Write your post content in markdown..."
              rows={12}
              data-testid="input-content"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="published"
              checked={formData.published}
              onCheckedChange={(checked) => 
                setFormData((prev) => ({ ...prev, published: checked === true }))
              }
              data-testid="checkbox-published"
            />
            <Label htmlFor="published" className="cursor-pointer">
              Published
            </Label>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              data-testid="button-cancel"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={saveMutation.isPending}
              data-testid="button-save"
            >
              {saveMutation.isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function CampaignSettingsTab({ settings }: { settings?: CampaignSetting }) {
  const { toast } = useToast();
  const [deadlineDate, setDeadlineDate] = useState("");
  const [deadlineTime, setDeadlineTime] = useState("");

  useEffect(() => {
    if (settings?.deadlineDate) {
      const date = new Date(settings.deadlineDate);
      const dateStr = date.toISOString().split('T')[0];
      const timeStr = date.toTimeString().split(' ')[0].substring(0, 5);
      setDeadlineDate(dateStr);
      setDeadlineTime(timeStr);
    }
  }, [settings]);

  const updateMutation = useMutation({
    mutationFn: async (data: { deadlineDate: string }) => {
      const res = await apiRequest("PUT", "/api/admin/campaign-settings", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/campaign-settings"] });
      toast({
        title: "Campaign settings updated",
        description: "The countdown deadline has been updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update campaign settings",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!deadlineDate || !deadlineTime) {
      toast({
        title: "Validation error",
        description: "Please select both date and time",
        variant: "destructive",
      });
      return;
    }

    const dateTimeString = `${deadlineDate}T${deadlineTime}:00`;
    updateMutation.mutate({ deadlineDate: dateTimeString });
  };

  const formatDateTime = (date: Date | string) => {
    return new Date(date).toLocaleString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Countdown Timer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {settings?.deadlineDate && (
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground mb-1">Current Deadline</p>
            <p className="text-lg font-semibold" data-testid="text-current-deadline">
              {formatDateTime(settings.deadlineDate)}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="deadline-date" data-testid="label-deadline-date">Deadline Date *</Label>
              <Input
                id="deadline-date"
                type="date"
                value={deadlineDate}
                onChange={(e) => setDeadlineDate(e.target.value)}
                data-testid="input-deadline-date"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline-time" data-testid="label-deadline-time">Deadline Time *</Label>
              <Input
                id="deadline-time"
                type="time"
                value={deadlineTime}
                onChange={(e) => setDeadlineTime(e.target.value)}
                data-testid="input-deadline-time"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={updateMutation.isPending}
            data-testid="button-save-deadline"
          >
            {updateMutation.isPending ? "Saving..." : "Update Deadline"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
