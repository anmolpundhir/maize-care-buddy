import { ExternalLink, IndianRupee, FileText, ShieldCheck, Tractor } from "lucide-react";
import { Button } from "./ui/button";

const schemes = [
  {
    icon: IndianRupee,
    title: "PM-KISAN",
    subtitle: "Pradhan Mantri Kisan Samman Nidhi",
    description: "Direct income support of ₹6,000 per year to farmer families in three equal installments.",
    benefits: ["₹6,000/year", "Direct bank transfer", "All landholding farmers"],
    link: "https://pmkisan.gov.in",
    color: "bg-primary",
  },
  {
    icon: FileText,
    title: "Kisan Credit Card",
    subtitle: "KCC Scheme",
    description: "Easy credit for farmers at subsidized interest rates for crop production and maintenance.",
    benefits: ["Low interest 4%", "Insurance coverage", "Flexible repayment"],
    link: "https://pmkisan.gov.in/kcc",
    color: "bg-secondary",
  },
  {
    icon: ShieldCheck,
    title: "PMFBY",
    subtitle: "Pradhan Mantri Fasal Bima Yojana",
    description: "Comprehensive crop insurance against natural calamities, pests, and diseases at low premiums.",
    benefits: ["Low premium 2%", "Full coverage", "Quick claims"],
    link: "https://pmfby.gov.in",
    color: "bg-accent",
  },
  {
    icon: Tractor,
    title: "Soil Health Card",
    subtitle: "Soil Testing Scheme",
    description: "Free soil testing and personalized recommendations for fertilizers and nutrients.",
    benefits: ["Free testing", "Expert advice", "Better yields"],
    link: "https://soilhealth.dac.gov.in",
    color: "bg-primary",
  },
];

const GovernmentSchemes = () => {
  return (
    <section id="schemes" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Government Schemes for Farmers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access financial support, insurance, and benefits designed to help farmers succeed.
          </p>
        </div>

        {/* Schemes Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {schemes.map((scheme) => {
            const Icon = scheme.icon;
            return (
              <div
                key={scheme.title}
                className="group bg-card rounded-2xl p-6 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className={`w-14 h-14 ${scheme.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {scheme.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {scheme.subtitle}
                </p>
                <p className="text-sm text-foreground/80 mb-4 leading-relaxed">
                  {scheme.description}
                </p>

                {/* Benefits */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {scheme.benefits.map((benefit) => (
                    <span
                      key={benefit}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-md"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  asChild
                >
                  <a href={scheme.link} target="_blank" rel="noopener noreferrer">
                    Learn More
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            );
          })}
        </div>

        {/* Additional Help */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-muted rounded-2xl">
            <p className="text-foreground font-medium">
              Need help applying for these schemes?
            </p>
            <Button variant="secondary" asChild>
              <a href="#chat">
                Ask Our Assistant
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GovernmentSchemes;
