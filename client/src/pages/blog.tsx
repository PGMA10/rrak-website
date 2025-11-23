import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import type { BlogPost } from "@shared/schema";
import { marked } from "marked";
import DOMPurify from "dompurify";

function BlogList() {
  const { data: postsData, isLoading } = useQuery<{ success: boolean; data: BlogPost[] }>({
    queryKey: ["/api/blog-posts"],
  });

  const posts = postsData?.data || [];

  const formatDate = (date: string | Date | null | undefined) => {
    if (!date) return "No date";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground" data-testid="text-heading">
          Blog
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-description">
          Direct mail marketing tips, strategies, and insights for Alaska businesses.
        </p>
      </div>

      {isLoading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading posts...</p>
        </div>
      )}

      {!isLoading && posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
        </div>
      )}

      <div className="space-y-6">
        {posts.map((post) => (
          <a
            key={post.id}
            href={`/blog/${post.slug}`}
            className="block"
            data-testid={`link-post-${post.slug}`}
          >
            <Card className="hover-elevate active-elevate-2 transition-all duration-200">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2" data-testid={`text-post-title-${post.slug}`}>
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-base" data-testid={`text-post-excerpt-${post.slug}`}>
                      {post.excerpt}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}

function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug || "";

  const { data: postData, isLoading } = useQuery<{ success: boolean; data: BlogPost }>({
    queryKey: ["/api/blog-posts", slug],
    enabled: !!slug,
    queryFn: async () => {
      const response = await fetch(`/api/blog-posts/${slug}`);
      if (!response.ok) {
        throw new Error("Failed to fetch blog post");
      }
      return response.json();
    },
  });

  const post = postData?.data;

  const formatDate = (date: string | Date | null | undefined) => {
    if (!date) return "No date";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderMarkdown = (markdown: string) => {
    const html = marked.parse(markdown);
    return DOMPurify.sanitize(html as string);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-center text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Post Not Found</h1>
          <p className="text-muted-foreground">The blog post you're looking for doesn't exist.</p>
          <a href="/blog" className="inline-block text-primary hover:underline">
            ← Back to Blog
          </a>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <SEO
        title={post.title}
        description={post.excerpt}
      />
      
      <div className="mb-8">
        <a
          href="/blog"
          className="inline-flex items-center text-sm text-primary hover:underline mb-6"
          data-testid="link-back-to-blog"
        >
          ← Back to Blog
        </a>
        
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-post-title">
          {post.title}
        </h1>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
        </div>
      </div>

      <div
        className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-a:text-primary prose-li:text-foreground"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        data-testid="div-post-content"
      />
    </article>
  );
}

export default function Blog() {
  const [match] = useRoute("/blog/:slug");

  return (
    <div className="flex flex-col min-h-screen">
      {!match && (
        <SEO
          title="Marketing Insights Blog"
          description="Direct mail marketing tips, strategies, and insights for Alaska businesses. Learn how to grow your business with effective marketing campaigns in Anchorage and beyond."
        />
      )}
      
      <Header currentPage="blog" />

      <main className="flex-1">
        {match ? <BlogPost /> : <BlogList />}
      </main>

      <footer className="border-t bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4" data-testid="text-footer-heading-product">
                Product
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200" data-testid="link-footer-features">
                    Services
                  </a>
                </li>
                <li>
                  <a href="https://route-reach-ak-1-patrick575.replit.app" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200" data-testid="link-footer-pricing">
                    Reserve a Slot
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4" data-testid="text-footer-heading-company">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200" data-testid="link-footer-about">
                    About
                  </a>
                </li>
                <li>
                  <a href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200" data-testid="link-footer-blog">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4" data-testid="text-footer-heading-support">
                Support
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200" data-testid="link-footer-contact">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t">
            <p className="text-sm text-muted-foreground text-center" data-testid="text-copyright">
              © {new Date().getFullYear()} Route Reach AK. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
