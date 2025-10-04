import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { 
  Github, 
  Mail, 
  ExternalLink, 
  Heart,
  Shield,
  Activity,
  ArrowUpRight,
  Satellite,
  Code,
  Telescope,
  Rocket,
  Database,
  Monitor,
  Star,
  Globe
} from "lucide-react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const footerRef = useRef(null);
  const contentRef = useRef(null);

  const currentYear = new Date().getFullYear();

  const externalResources = [
    { 
      name: "NASA DART Mission", 
      href: "https://dart.jhuapl.edu/", 
      icon: Rocket,
      description: "Double Asteroid Redirection Test mission data"
    },
    { 
      name: "ESA Hera Mission", 
      href: "https://www.esa.int/hera", 
      icon: Satellite,
      description: "Post-impact asteroid assessment program"
    },
    { 
      name: "JPL Asteroid Watch", 
      href: "https://eyes.nasa.gov/apps/asteroids/", 
      icon: Telescope,
      description: "Real-time near-Earth object tracking"
    },
    { 
      name: "NASA NEO Program", 
      href: "https://www.nasa.gov/planetarydefense/", 
      icon: Shield,
      description: "Planetary Defense Coordination Office"
    }
  ];

  const technologies = [
    { name: "React", icon: Code },
    { name: "GSAP", icon: Activity },
    { name: "WebGL", icon: Monitor },
    { name: "APIs", icon: Database }
  ];

  const projectHighlights = [
    {
      icon: Star,
      title: "Educational Focus",
      description: "Interactive learning platform for asteroid science"
    },
    {
      icon: Globe,
      title: "Real Data",
      description: "Powered by NASA and ESA mission data"
    },
    {
      icon: Shield,
      title: "Defense Ready",
      description: "Comprehensive planetary protection strategies"
    }
  ];

  // Initialize animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);

      if (footerRef.current) {
        ScrollTrigger.create({
          trigger: footerRef.current,
          start: "top 90%",
          onEnter: () => {
            // Animate main content sections
            if (contentRef.current) {
              const sections = contentRef.current.querySelectorAll('.footer-section');
              gsap.fromTo(sections, {
                opacity: 0,
                y: 30
              }, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out"
              });
            }

            // Animate resource links
            const resourceLinks = footerRef.current.querySelectorAll('.resource-link');
            gsap.fromTo(resourceLinks, {
              opacity: 0,
              x: -20
            }, {
              opacity: 1,
              x: 0,
              duration: 0.4,
              stagger: 0.1,
              ease: "power2.out",
              delay: 0.3
            });
          },
          once: true
        });
      }

      // Add interactive hover effects
      setTimeout(addInteractiveEffects, 600);
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addInteractiveEffects = () => {
    // Resource link hover effects
    const resourceLinks = document.querySelectorAll('.resource-link');
    resourceLinks.forEach((link) => {
      if (link.dataset.hoverInitialized) return;
      link.dataset.hoverInitialized = 'true';
      
      const icon = link.querySelector('.resource-icon');
      
      const handleMouseEnter = () => {
        gsap.to(link, {
          scale: 1.02,
          y: -2,
          duration: 0.2,
          ease: "power2.out"
        });
        if (icon) {
          gsap.to(icon, {
            scale: 1.1,
            rotation: 5,
            duration: 0.2,
            ease: "power2.out"
          });
        }
      };

      const handleMouseLeave = () => {
        gsap.to(link, {
          scale: 1,
          y: 0,
          duration: 0.2,
          ease: "power2.out"
        });
        if (icon) {
          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.2,
            ease: "power2.out"
          });
        }
      };

      link.addEventListener('mouseenter', handleMouseEnter);
      link.addEventListener('mouseleave', handleMouseLeave);
    });

    // Social button hover effects
    const socialButtons = document.querySelectorAll('.social-button');
    socialButtons.forEach((button) => {
      if (button.dataset.hoverInitialized) return;
      button.dataset.hoverInitialized = 'true';
      
      const handleMouseEnter = () => {
        gsap.to(button, {
          scale: 1.1,
          y: -2,
          duration: 0.2,
          ease: "back.out(1.7)"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(button, {
          scale: 1,
          y: 0,
          duration: 0.2,
          ease: "power2.out"
        });
      };

      button.addEventListener('mouseenter', handleMouseEnter);
      button.addEventListener('mouseleave', handleMouseLeave);
    });

    // Highlight card hover effects
    const highlightCards = document.querySelectorAll('.highlight-card');
    highlightCards.forEach((card) => {
      if (card.dataset.hoverInitialized) return;
      card.dataset.hoverInitialized = 'true';
      
      const handleMouseEnter = () => {
        gsap.to(card, {
          scale: 1.05,
          duration: 0.2,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out"
        });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    });
  };

  return (
    <footer 
      ref={footerRef}
      className={`bg-card/60 border-t border-border/50 backdrop-blur-sm relative overflow-hidden transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Simple Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-48 h-48 bg-gradient-to-br from-quantum-blue to-stellar-cyan rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-plasma-orange to-mission-green rounded-full blur-2xl" />
      </div>

      <div ref={contentRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-8">
          
          {/* Brand & Enhanced Info Section */}
          <div className="footer-section space-y-6">
            {/* Brand Header */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-quantum rounded-xl flex items-center justify-center shadow-command">
                <Satellite className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-quantum-blue">
                  Impact Lab
                </span>
                <div className="text-sm text-muted-foreground font-medium">
                  Created by AstroVision
                </div>
              </div>
            </div>

            {/* Project Highlights */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-quantum-blue uppercase tracking-wider">Project Highlights</h4>
              <div className="grid grid-cols-1 gap-3">
                {projectHighlights.map((highlight, index) => (
                  <div 
                    key={index}
                    className="highlight-card flex items-center space-x-3 p-3 bg-muted/10 hover:bg-muted/20 rounded-lg border border-border/30 transition-all duration-300"
                  >
                    <div className="p-2 bg-quantum-blue/10 rounded-lg">
                      <highlight.icon className="w-4 h-4 text-quantum-blue" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">{highlight.title}</div>
                      <div className="text-xs text-muted-foreground">{highlight.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies Used */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-quantum-blue uppercase tracking-wider">Built With</h4>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <Badge 
                    key={index}
                    variant="outline" 
                    className="border-border/50 text-muted-foreground bg-muted/20 hover:bg-muted/30 transition-colors text-xs"
                  >
                    <tech.icon className="w-3 h-3 mr-1" />
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Project Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-quantum-blue/10 rounded-lg border border-quantum-blue/20">
                <div className="text-lg font-bold text-quantum-blue">4</div>
                <div className="text-xs text-muted-foreground">Modules</div>
              </div>
              <div className="text-center p-3 bg-stellar-cyan/10 rounded-lg border border-stellar-cyan/20">
                <div className="text-lg font-bold text-stellar-cyan">100%</div>
                <div className="text-xs text-muted-foreground">Open Source</div>
              </div>
            </div>
          </div>

          {/* Scientific Resources */}
          <div className="footer-section space-y-6">
            <h3 className="text-lg font-bold text-stellar-cyan flex items-center">
              <div className="p-1 rounded-lg bg-stellar-cyan/10 mr-3">
                <ExternalLink className="w-5 h-5 text-stellar-cyan" />
              </div>
              Scientific Sources
            </h3>
            
            <p className="text-sm text-muted-foreground">
              Data and research from leading space agencies and astronomical organizations
            </p>

            <div className="space-y-3">
              {externalResources.map((resource, index) => (
                <a 
                  key={index}
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resource-link block p-4 bg-muted/10 hover:bg-muted/20 rounded-lg border border-border/30 hover:border-stellar-cyan/30 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="resource-icon p-2 bg-stellar-cyan/10 rounded-lg group-hover:bg-stellar-cyan/20 transition-colors">
                        <resource.icon className="w-4 h-4 text-stellar-cyan" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-foreground group-hover:text-stellar-cyan transition-colors">
                          {resource.name}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {resource.description}
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-stellar-cyan transition-colors" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-section border-t border-border/30 pt-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-6">
              <p className="text-muted-foreground text-sm flex items-center">
                © {currentYear} Meteor Madness. Crafted with 
                <Heart className="w-4 h-4 mx-2 text-red-500 animate-pulse" />
                for scientific education.
              </p>        
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-3">
              <span className="text-xs text-muted-foreground mr-2">Connect:</span>
              <a 
                href="https://github.com/MohammedAmin67/Meteor-Madness" 
                target="_blank"
                rel="noopener noreferrer"
                className="social-button text-muted-foreground hover:text-quantum-blue transition-all duration-300 p-3 hover:bg-quantum-blue/10 rounded-xl border border-border/30 hover:border-quantum-blue/30"
                aria-label="GitHub Repository"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="mailto:mohammed.amin67@example.com" 
                className="social-button text-muted-foreground hover:text-plasma-orange transition-all duration-300 p-3 hover:bg-plasma-orange/10 rounded-xl border border-border/30 hover:border-plasma-orange/30"
                aria-label="Contact Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Compact Mission Statement */}
          <div className="text-center mt-6 pt-4 border-t border-border/30">
            <p className="text-sm font-medium text-quantum-blue mb-1">
              Advancing Planetary Defense Through Interactive Education
            </p>
            <p className="text-xs text-muted-foreground">
              An educational platform for asteroid impact simulation and defense strategy analysis.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;