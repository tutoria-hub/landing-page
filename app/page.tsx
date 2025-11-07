import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-black">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="flex flex-col items-center text-center space-y-8">
          <Badge variant="secondary" className="text-sm">
            New: OpenNext + Cloudflare
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
            Build Amazing Landing Pages with{" "}
            <span className="text-primary">shadcn/ui</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl">
            A beautifully designed landing page built with Next.js 15,
            shadcn/ui components, and deployed on Cloudflare Workers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <Input
              placeholder="Enter your email"
              type="email"
              className="flex-1"
            />
            <Button size="lg">Get Started</Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Features</h2>
          <p className="text-muted-foreground">Everything you need to ship fast</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Fast Performance</CardTitle>
              <CardDescription>
                Lightning-fast load times with Cloudflare Workers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Deploy globally in seconds with edge computing capabilities.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Beautiful UI</CardTitle>
              <CardDescription>
                Pre-built components with shadcn/ui
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Accessible, customizable components built with Radix UI and Tailwind CSS.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Type Safe</CardTitle>
              <CardDescription>
                Full TypeScript support out of the box
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Catch errors before they happen with TypeScript integration.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="max-w-3xl mx-auto bg-primary text-primary-foreground">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Ready to get started?</CardTitle>
            <CardDescription className="text-primary-foreground/80 text-lg">
              Start building your next project today
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              View Documentation
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10">
              Browse Components
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground border-t">
        <p>Built with Next.js, shadcn/ui, and deployed on Cloudflare Workers</p>
      </footer>
    </div>
  );
}
