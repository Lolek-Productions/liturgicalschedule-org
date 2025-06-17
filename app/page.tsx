import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";
import { ArrowRight, Check, Star, Users, Calendar, BookOpen, Church, Shield, Clock, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

// This ensures the page is dynamically rendered due to cookie usage
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Home() {

  const features = [
    {
      icon: Calendar,
      title: "Liturgical Calendar Management",
      description:
        "Complete liturgical calendar with feast days, seasons, and proper readings according to Church guidelines.",
    },
    {
      icon: Users,
      title: "Minister Scheduling",
      description:
        "Effortlessly schedule lectors, ushers, extraordinary ministers, and all liturgical roles with automated reminders.",
    },
    {
      icon: BookOpen,
      title: "Scripture Readings Manager",
      description:
        "Organize daily and Sunday readings with preparation notes, ensuring nothing is missed or incomplete.",
    },
    {
      icon: Church,
      title: "Mass Planning Tools",
      description:
        "Comprehensive planning for each celebration including music, environment, and special requirements.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description:
        "Built with parish privacy in mind, ensuring your liturgical data is safe and accessible when you need it.",
    },
    {
      icon: Clock,
      title: "Time-Saving Automation",
      description: "Reduce planning time by 75% with automated scheduling, reminders, and liturgical season tracking.",
    },
  ]

  const testimonials = [
    {
      name: "Fr. Michael Rodriguez",
      role: "Pastor, St. Mary's Parish",
      content:
        "This system has transformed how we plan our liturgies. What used to take hours now takes minutes, and nothing falls through the cracks anymore.",
      rating: 5,
    },
    {
      name: "Sister Catherine Walsh",
      role: "Liturgy Coordinator, Holy Family Church",
      content:
        "The scripture readings manager is incredible. Our lectors are better prepared, and we never have missing assignments anymore.",
      rating: 5,
    },
    {
      name: "Deacon Robert Thompson",
      role: "St. Joseph's Parish",
      content:
        "Finally, a system designed by people who understand Catholic liturgy. It follows proper Church guidelines and makes planning a joy.",
      rating: 5,
    },
  ]


  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>Liturgical Schedule</Link>
            </div>
            <AuthButton />
          </div>
        </nav>

        {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4" variant="secondary">
              Trusted by 500+ Catholic Parishes
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Streamline Your Parish
              <span className="text-primary block">Liturgical Planning</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              The complete solution for Catholic parishes to manage liturgical celebrations, minister scheduling, and
              scripture readings with reverence and efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="text-lg px-8">
                Start Free 30-Day Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Schedule Demo
              </Button>
            </div>
            <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-600" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-600" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-600" />
                <span>Full support included</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything Your Parish Needs for Liturgical Excellence
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Designed specifically for Catholic liturgy, following proper Church guidelines and traditions.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary/20 transition-colors">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Reduce Planning Time by 75%</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Stop juggling spreadsheets, phone calls, and paper schedules. Liturgy Schedule brings everything together in
                one intuitive system designed specifically for Catholic parishes.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Automated Minister Reminders</h3>
                    <p className="text-muted-foreground">
                      Ministers receive automatic notifications about their assignments
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Liturgical Calendar Integration</h3>
                    <p className="text-muted-foreground">
                      Proper readings and seasonal requirements automatically populated
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Comprehensive Reporting</h3>
                    <p className="text-muted-foreground">
                      Generate detailed reports for parish leadership and planning
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Before Liturgy Schedule</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>📋 Multiple spreadsheets and documents</p>
                    <p>📞 Countless phone calls and emails</p>
                    <p>❌ Missed assignments and confusion</p>
                    <p>⏰ Hours spent on coordination</p>
                  </div>
                </div>
                <Separator />
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2 text-primary">After Liturgy Schedule</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>✅ Everything in one organized system</p>
                    <p>🔔 Automatic notifications and reminders</p>
                    <p>📅 Never miss an assignment again</p>
                    <p>⚡ Minutes instead of hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by Parish Leaders Everywhere</h2>
            <p className="text-xl text-muted-foreground">
              See what pastors, liturgy coordinators, and deacons are saying about Liturgy Schedule.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardDescription className="text-base italic">&ldquo;{testimonial.content}&rdquo;</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Heart className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Parish Liturgy Planning?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join hundreds of Catholic parishes who have already streamlined their liturgical planning with Liturgy Schedule.
              Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated on Liturgical Planning</h3>
            <p className="text-muted-foreground mb-6">
              Get tips, best practices, and updates on Catholic liturgy planning delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input placeholder="Enter your email" type="email" className="flex-1" />
              <Button>Subscribe</Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Church className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">Liturgy Schedule</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering Catholic parishes with modern liturgical planning tools while honoring sacred traditions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Demo
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Training
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Community
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Liturgical Schedule. All rights reserved.</p>
            <ThemeSwitcher />
            <p>Made with ❤️ for the Catholic Church</p>
          </div>
        </div>
      </footer>
      </div>
    </main>
  );
}
