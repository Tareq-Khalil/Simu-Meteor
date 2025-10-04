import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Target, 
  Zap, 
  Shield, 
  Globe, 
  AlertTriangle, 
  Telescope,
  Rocket,
  Activity,
  Users,
  Lightbulb,
  CheckCircle,
  TrendingUp,
  Award,
  Code,
  Database,
  Cpu,
  Play,
  Calendar,
  Github,
  ExternalLink,
  Building,
  Layers
} from "lucide-react";
import heroImage from "@/assets/hero-space.jpg";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState("problem");
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation refs
  const heroRef = useRef(null);
  const projectBadgeRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const quickStatsRef = useRef(null);
  const ctaButtonsRef = useRef(null);
  const sectionHeaderRef = useRef(null);
  const tabsRef = useRef(null);
  const tabContentRef = useRef(null);

  const features = [
    {
      icon: Target,
      title: "Advanced Impact Analysis",
      description: "Sophisticated physics calculations model crater formation, seismic effects, and atmospheric interactions with scientific accuracy",
      color: "text-quantum-blue",
      bgColor: "bg-quantum-blue/10",
      borderColor: "border-quantum-blue/20"
    },
    {
      icon: Globe,
      title: "Global Impact Coverage",
      description: "Simulate asteroid impacts anywhere on Earth with real geographical data, population density, and infrastructure analysis",
      color: "text-stellar-cyan",
      bgColor: "bg-stellar-cyan/10", 
      borderColor: "border-stellar-cyan/20"
    },
    {
      icon: Zap,
      title: "Real-time Physics Engine",
      description: "Advanced computational models simulate atmospheric entry, fragmentation, and ground impact with realistic parameters",
      color: "text-plasma-orange",
      bgColor: "bg-plasma-orange/10",
      borderColor: "border-plasma-orange/20"
    },
    {
      icon: Shield,
      title: "Defense Strategy Planning",
      description: "Evaluate planetary defense options including kinetic impactors, gravity tractors, and nuclear deflection systems",
      color: "text-mission-green",
      bgColor: "bg-mission-green/10",
      borderColor: "border-mission-green/20"
    }
  ];

  const problemPoints = [
    {
      icon: AlertTriangle,
      title: "Increasing Asteroid Discoveries",
      stat: "3,000+",
      description: "New near-Earth asteroids discovered annually by automated survey systems",
      impact: "Growing catalog of potential threats requiring constant assessment"
    },
    {
      icon: Telescope,
      title: "Limited Public Understanding",
      stat: "90%",
      description: "Of potentially hazardous asteroids >1km have been found, but smaller city-killers remain undetected", 
      impact: "Public education needed on realistic asteroid threat levels"
    },
    {
      icon: Users,
      title: "Complex Decision Making",
      stat: "Billions",
      description: "Of people potentially affected by asteroid impacts, requiring coordinated international response",
      impact: "Need for accessible tools to understand impact scenarios and mitigation options"
    }
  ];

  const solutions = [
    {
      icon: Lightbulb,
      title: "Interactive Education Platform",
      description: "Comprehensive learning modules covering asteroid science, impact physics, and planetary defense strategies with hands-on simulations"
    },
    {
      icon: Activity,
      title: "Advanced Simulation Engine", 
      description: "Physics-based modeling using real data and peer-reviewed impact calculations for scientifically accurate results"
    },
    {
      icon: Shield,
      title: "Defense Strategy Analysis",
      description: "Detailed comparison of mitigation technologies with cost-effectiveness analysis and mission feasibility assessments"
    },
    {
      icon: Target,
      title: "Decision Support System",
      description: "Tools for policymakers and scientists to evaluate threat levels, response options, and resource allocation strategies"
    }
  ];

  const technicalSpecs = [
    {
      category: "Physics Engine",
      icon: Cpu,
      specs: [
        "Kinetic energy calculations using E = ½mv² with relativistic corrections",
        "Crater formation modeling based on Schmidt-Housen equations", 
        "Atmospheric entry simulation with ablation and fragmentation",
        "Seismic wave propagation using empirical scaling laws"
      ]
    },
    {
      category: "Data Integration",
      icon: Database,
      specs: [
        "JPL Small-Body Database for asteroid properties",
        "Earth population density and infrastructure data",
        "Historical impact crater database for validation",
        "Real-time orbital mechanics calculations"
      ]
    },
    {
      category: "User Experience",
      icon: Code,
      specs: [
        "Responsive React interface with Three.js 3D visualization",
        "Progressive Web App capabilities for mobile access",
        "Accessibility features for inclusive design",
        "Gamified learning modules for engagement"
      ]
    }
  ];

  const impactMetrics = [
    { label: "Educational Impact", value: "Comprehensive", description: "Multi-level learning from basic concepts to advanced physics" },
    { label: "Scientific Accuracy", value: "Peer-Reviewed", description: "Based on published impact research and validated data" },
    { label: "Public Engagement", value: "Interactive", description: "Hands-on exploration of planetary defense concepts" },
    { label: "Decision Support", value: "Evidence-Based", description: "Quantitative analysis for policy and planning decisions" }
  ];

  // Initialize animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);

      // Hero section animations
      if (heroRef.current) {
        const heroElements = [
          projectBadgeRef.current,
          titleRef.current,
          descriptionRef.current,
          quickStatsRef.current,
          ctaButtonsRef.current
        ].filter(Boolean);

        gsap.set(heroElements, { opacity: 0, y: 50 });

        const heroTimeline = gsap.timeline({ delay: 0.3 });

        heroTimeline
          .to(projectBadgeRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
          })
          .to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
          }, "-=0.4")
          .to(descriptionRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
          }, "-=0.6")
          .to(quickStatsRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "back.out(1.4)"
          }, "-=0.4")
          .to(ctaButtonsRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "back.out(1.7)"
          }, "-=0.2");
      }

      // REMOVED: Section header scroll animation to prevent glitch
      // The section header will appear normally without animation

      // Tabs animation
      if (tabsRef.current) {
        ScrollTrigger.create({
          trigger: tabsRef.current,
          start: "top 90%",
          onEnter: () => {
            gsap.fromTo(tabsRef.current.querySelector('.tabs-list'), {
              opacity: 0,
              scale: 0.95
            }, {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: "back.out(1.4)"
            });
          },
          once: true
        });
      }

      // Add hover effects
      const addInteractiveEffects = () => {
        // Card hover effects
        const cards = document.querySelectorAll('.interactive-card');
        cards.forEach((card) => {
          if (card.dataset.hoverInitialized) return;
          card.dataset.hoverInitialized = 'true';
          
          const icon = card.querySelector('.card-icon');
          
          const handleMouseEnter = () => {
            gsap.to(card, {
              scale: 1.05,
              y: -8,
              duration: 0.3,
              ease: "power2.out"
            });
            if (icon) {
              gsap.to(icon, {
                scale: 1.1,
                rotation: 5,
                duration: 0.3,
                ease: "back.out(1.7)"
              });
            }
          };

          const handleMouseLeave = () => {
            gsap.to(card, {
              scale: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out"
            });
            if (icon) {
              gsap.to(icon, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: "power2.out"
              });
            }
          };

          card.addEventListener('mouseenter', handleMouseEnter);
          card.addEventListener('mouseleave', handleMouseLeave);
        });

        // Button hover effects
        const buttons = document.querySelectorAll('.interactive-button');
        buttons.forEach((button) => {
          if (button.dataset.hoverInitialized) return;
          button.dataset.hoverInitialized = 'true';
          
          const handleMouseEnter = () => {
            gsap.to(button, {
              scale: 1.05,
              duration: 0.2,
              ease: "power2.out"
            });
          };

          const handleMouseLeave = () => {
            gsap.to(button, {
              scale: 1,
              duration: 0.2,
              ease: "power2.out"
            });
          };

          button.addEventListener('mouseenter', handleMouseEnter);
          button.addEventListener('mouseleave', handleMouseLeave);
        });
      };

      setTimeout(addInteractiveEffects, 800);
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Tab content animation when tab changes
  useEffect(() => {
    if (tabContentRef.current) {
      const content = tabContentRef.current.querySelector(`[data-state="active"]`);
      if (content) {
        gsap.fromTo(content, {
          opacity: 0,
          y: 20
        }, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        });

        // Animate cards within the active tab
        const tabCards = content.querySelectorAll('.tab-card');
        if (tabCards.length > 0) {
          gsap.fromTo(tabCards, {
            opacity: 0,
            y: 30,
            scale: 0.95
          }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: "power2.out",
            delay: 0.2
          });
        }
      }
    }
  }, [activeTab]);

  return (
    <div className={`min-h-screen w-full overflow-x-hidden transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-4 sm:pt-6">
        {/* Background Image with Enhanced Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Earth from space with approaching asteroid threat"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/80 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background/50" />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 sm:w-3 sm:h-3 bg-quantum-blue rounded-full animate-pulse-glow opacity-80" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 sm:w-2 sm:h-2 bg-stellar-cyan rounded-full animate-pulse-glow opacity-60 animate-float-gentle" />
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 sm:w-4 sm:h-4 bg-plasma-orange rounded-full animate-pulse-glow opacity-70" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5 z-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px sm:50px sm:50px'
          }} />
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Project Badge */}
          <div ref={projectBadgeRef} className="mb-6 sm:mb-8 flex justify-center opacity-100">
            <div className="inline-flex items-center space-x-3 bg-card/50 backdrop-blur-xl border border-quantum-blue/40 rounded-2xl px-6 sm:px-8 py-4 sm:py-5 shadow-command">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-quantum-blue rounded-full animate-pulse shadow-command" />
                <span className="text-sm sm:text-base font-bold text-quantum-blue tracking-wider uppercase">
                  Research Platform
                </span>
              </div>
              <div className="h-6 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
              <div className="flex items-center space-x-2">
                <Building className="w-4 h-4 sm:w-5 sm:h-5 text-stellar-cyan" />
                <span className="text-sm sm:text-base font-medium text-stellar-cyan">
                  Impact Laboratory
                </span>
              </div>
            </div>
          </div>

          {/* Title */}
          <div ref={titleRef} className="opacity-100">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              <span className="text-foreground">About </span>
              <span 
                className="bg-gradient-to-r from-quantum-blue via-stellar-cyan to-plasma-orange bg-clip-text text-transparent drop-shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #60a5fa 0%, #22d3ee 50%, #fb923c 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 20px rgba(96, 165, 250, 0.5))'
                }}
              >
                AstroGuard
              </span>
            </h1>
          </div>
          
          <div ref={descriptionRef} className="opacity-100">
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-6 sm:mb-8">
              Advanced impact simulation and defense analysis platform. 
              Bridging scientific research with practical understanding for 
              <span className="text-quantum-blue font-medium"> planetary protection</span>.
            </p>
          </div>

          {/* Quick Stats */}
          <div ref={quickStatsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 opacity-100">
            {[
              { number: "2025", label: "Platform Launch", icon: Calendar },
              { number: "Open Source", label: "Codebase", icon: Github },
              { number: "5+", label: "Core Modules", icon: Layers },
              { number: "Global", label: "Research Focus", icon: Globe }
            ].map((stat, index) => (
              <Card key={index} className="interactive-card bg-card/60 border-border/50 backdrop-blur-sm shadow-command transition-all duration-300">
                <CardContent className="p-4 text-center">
                  <div className="card-icon">
                    <stat.icon className="w-6 h-6 mx-auto mb-2 text-quantum-blue" />
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-quantum-blue">{stat.number}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Buttons */}
          <div ref={ctaButtonsRef} className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center opacity-100">
            <Link to="/simulation">
              <Button className="interactive-button w-full sm:w-auto bg-gradient-quantum hover:shadow-command transition-all duration-300 h-12 px-8 text-base font-semibold group">
                <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Launch Platform
              </Button>
            </Link>
            <Link to="https://github.com/MohammedAmin67/Meteor-Madness" target="_blank" rel="noopener noreferrer">
              <Button 
                variant="outline" 
                className="interactive-button w-full sm:w-auto border-2 border-quantum-blue/60 text-quantum-blue hover:text-white hover:bg-quantum-blue hover:border-quantum-blue h-12 px-8 text-base font-semibold group"
              >
                <Github className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                View Repository
                <ExternalLink className="w-3 h-3 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main About Content */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-background to-blue-950/10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header - NO SCROLL ANIMATION */}
          <div ref={sectionHeaderRef} className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center space-x-2 bg-quantum-blue/10 border border-quantum-blue/20 rounded-full px-4 py-2 mb-6">
              <Target className="w-4 h-4 text-quantum-blue" />
              <span className="text-sm font-semibold text-quantum-blue">PROJECT OVERVIEW</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-foreground">Advancing </span>
              <span 
                style={{
                  background: 'linear-gradient(135deg, #60a5fa 0%, #22d3ee 50%, #fb923c 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 10px rgba(96, 165, 250, 0.3))'
                }}
              >
                Planetary Defense
              </span>
              <span className="text-foreground"> Through Innovation</span>
            </h2>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Our advanced asteroid impact simulation platform combines cutting-edge physics modeling 
              with interactive education to enhance public understanding of cosmic threats and 
              <span className="text-quantum-blue font-medium"> planetary defense strategies</span>.
            </p>
          </div>

          {/* Main Content Tabs */}
          <div ref={tabsRef}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <TabsList className="tabs-list grid w-full grid-cols-2 lg:grid-cols-4 bg-card/60 border-border/50 backdrop-blur-sm h-auto p-1">
                <TabsTrigger 
                  value="problem" 
                  className="data-[state=active]:bg-gradient-quantum data-[state=active]:text-white text-sm p-3 h-12"
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">The Challenge</span>
                  <span className="sm:hidden">Problem</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="solution" 
                  className="data-[state=active]:bg-gradient-quantum data-[state=active]:text-white text-sm p-3 h-12"
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Our Solution</span>
                  <span className="sm:hidden">Solution</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="features" 
                  className="data-[state=active]:bg-gradient-quantum data-[state=active]:text-white text-sm p-3 h-12"
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Key Features</span>
                  <span className="sm:hidden">Features</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="impact" 
                  className="data-[state=active]:bg-gradient-quantum data-[state=active]:text-white text-sm p-3 h-12"
                >
                  <Award className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Project Impact</span>
                  <span className="sm:hidden">Impact</span>
                </TabsTrigger>
              </TabsList>

              <div ref={tabContentRef}>
                {/* Problem Statement Tab */}
                <TabsContent value="problem" className="space-y-8">
                  <Card className="tab-card bg-card/60 border-border/50 backdrop-blur-sm shadow-command">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-3">
                        <div className="card-icon p-3 rounded-lg bg-gradient-to-br from-destructive to-plasma-orange">
                          <AlertTriangle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <span className="text-2xl text-destructive">The Asteroid Threat Challenge</span>
                          <p className="text-sm text-muted-foreground font-normal mt-1">
                            Understanding the growing complexity of planetary defense
                          </p>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="space-y-8">
                      {/* Problem Statistics */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {problemPoints.map((point, index) => (
                          <Card key={index} className="tab-card interactive-card bg-destructive/5 border-destructive/20 backdrop-blur-sm transition-all duration-300">
                            <CardContent className="p-6">
                              <div className="flex items-start space-x-4">
                                <div className="card-icon p-3 rounded-lg bg-destructive/10">
                                  <point.icon className="w-6 h-6 text-destructive" />
                                </div>
                                <div className="flex-1">
                                  <div className="text-3xl font-bold text-destructive mb-2">{point.stat}</div>
                                  <h4 className="font-semibold text-foreground mb-2">{point.title}</h4>
                                  <p className="text-sm text-muted-foreground mb-3">{point.description}</p>
                                  <div className="p-3 bg-muted/30 rounded-lg border-l-4 border-destructive">
                                    <p className="text-sm font-medium text-foreground">{point.impact}</p>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      {/* Key Challenges */}
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-foreground flex items-center">
                          <Target className="w-5 h-5 mr-2 text-destructive" />
                          Critical Challenges in Planetary Defense
                        </h3>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="tab-card p-4 bg-muted/20 rounded-lg border border-border/30 hover:border-plasma-orange/30 transition-colors">
                              <h4 className="font-semibold text-plasma-orange mb-2 flex items-center">
                                <Telescope className="w-4 h-4 mr-2" />
                                Detection Gap
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                While large extinction-level asteroids are well-catalogued, smaller city-killer
                                asteroids (140m-1km) remain largely undetected. These pose significant regional
                                threats but receive less public attention.
                              </p>
                            </div>
                            
                            <div className="tab-card p-4 bg-muted/20 rounded-lg border border-border/30 hover:border-stellar-cyan/30 transition-colors">
                              <h4 className="font-semibold text-stellar-cyan mb-2 flex items-center">
                                <Users className="w-4 h-4 mr-2" />
                                Public Understanding
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                Complex physics and orbital mechanics make asteroid threats difficult for 
                                the general public to understand, limiting support for planetary defense 
                                initiatives and preparedness efforts.
                              </p>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="tab-card p-4 bg-muted/20 rounded-lg border border-border/30 hover:border-mission-green/30 transition-colors">
                              <h4 className="font-semibold text-mission-green mb-2 flex items-center">
                                <Shield className="w-4 h-4 mr-2" />
                                Limited Simulation Tools
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                Existing impact calculators often lack comprehensive environmental modeling, 
                                making it difficult to assess real-world consequences and plan appropriate 
                                response strategies.
                              </p>
                            </div>
                            
                            <div className="tab-card p-4 bg-muted/20 rounded-lg border border-border/30 hover:border-quantum-blue/30 transition-colors">
                              <h4 className="font-semibold text-quantum-blue mb-2 flex items-center">
                                <Globe className="w-4 h-4 mr-2" />
                                Decision Making Complexity
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                Policymakers need accessible tools to evaluate threat levels, mitigation 
                                costs, and international coordination requirements for effective planetary 
                                defense planning.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Call to Action */}
                      <div className="tab-card p-6 bg-gradient-to-r from-destructive/10 via-plasma-orange/10 to-quantum-blue/10 rounded-lg border border-destructive/20">
                        <div className="flex items-start space-x-4">
                          <div className="card-icon p-3 rounded-full bg-destructive/20">
                            <AlertTriangle className="w-6 h-6 text-destructive" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-destructive mb-2">
                              The Need for Innovation
                            </h4>
                            <p className="text-muted-foreground leading-relaxed">
                              These challenges demand innovative solutions that bridge the gap between 
                              complex scientific concepts and practical understanding. Our platform 
                              addresses these needs through interactive education, advanced simulation, 
                              and evidence-based decision support tools.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Solution Tab */}
                <TabsContent value="solution" className="space-y-8">
                  <Card className="tab-card bg-card/60 border-border/50 backdrop-blur-sm shadow-command">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-3">
                        <div className="card-icon p-3 rounded-lg bg-gradient-to-br from-quantum-blue to-stellar-cyan">
                          <Lightbulb className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <span className="text-2xl text-quantum-blue">Our Innovative Solution</span>
                          <p className="text-sm text-muted-foreground font-normal mt-1">
                            Comprehensive platform for asteroid threat education and analysis
                          </p>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="space-y-8">
                      {/* Solution Overview */}
                      <div className="tab-card p-6 bg-gradient-to-r from-quantum-blue/10 via-stellar-cyan/10 to-mission-green/10 rounded-lg border border-quantum-blue/20">
                        <h3 className="text-xl font-bold text-quantum-blue mb-4">Integrated Approach to Planetary Defense Education</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Our platform combines advanced physics simulation with interactive education to create 
                          a comprehensive tool for understanding asteroid threats. By making complex scientific 
                          concepts accessible through visualization and hands-on exploration, we bridge the gap 
                          between research and public understanding.
                        </p>
                      </div>

                      {/* Solution Components */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {solutions.map((solution, index) => (
                          <Card key={index} className="tab-card interactive-card bg-mission-green/5 border-mission-green/20 backdrop-blur-sm hover:shadow-command transition-all duration-300">
                            <CardContent className="p-6">
                              <div className="flex items-start space-x-4">
                                <div className="card-icon p-3 rounded-lg bg-gradient-to-br from-mission-green to-stellar-cyan">
                                  <solution.icon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-mission-green mb-2">{solution.title}</h4>
                                  <p className="text-sm text-muted-foreground leading-relaxed">
                                    {solution.description}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      {/* Technical Implementation */}
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-foreground flex items-center">
                          <Code className="w-5 h-5 mr-2 text-stellar-cyan" />
                          Technical Implementation
                        </h3>
                        
                        <div className="space-y-6">
                          {technicalSpecs.map((spec, index) => (
                            <Card key={index} className="tab-card bg-stellar-cyan/5 border-stellar-cyan/20 hover:shadow-command transition-all duration-300">
                              <CardContent className="p-6">
                                <div className="flex items-center space-x-3 mb-4">
                                  <div className="card-icon p-2 rounded-lg bg-stellar-cyan/20">
                                    <spec.icon className="w-5 h-5 text-stellar-cyan" />
                                  </div>
                                  <h4 className="font-bold text-stellar-cyan">{spec.category}</h4>
                                </div>
                                <div className="space-y-2">
                                  {spec.specs.map((item, i) => (
                                    <div key={i} className="flex items-start space-x-2">
                                      <CheckCircle className="w-4 h-4 text-mission-green mt-0.5 flex-shrink-0" />
                                      <span className="text-sm text-muted-foreground">{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Features Tab */}
                <TabsContent value="features" className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                      <Card 
                        key={index} 
                        className={`tab-card interactive-card ${feature.bgColor} ${feature.borderColor} backdrop-blur-sm shadow-command hover:shadow-glow transition-all duration-300`}
                      >
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-3">
                            <div className={`card-icon p-3 rounded-lg bg-gradient-to-br from-current to-transparent ${feature.color}`}>
                              <feature.icon className="w-6 h-6 text-white" />
                            </div>
                            <span className={`text-xl ${feature.color}`}>{feature.title}</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground leading-relaxed">
                            {feature.description}
                          </p>
                          
                          {/* Feature highlights based on type */}
                          <div className="mt-4 space-y-2">
                            {feature.title.includes("Impact Analysis") && (
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2 text-sm">
                                  <CheckCircle className="w-3 h-3 text-mission-green" />
                                  <span className="text-muted-foreground">Energy release calculations</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm">
                                  <CheckCircle className="w-3 h-3 text-mission-green" />
                                  <span className="text-muted-foreground">Crater formation modeling</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm">
                                  <CheckCircle className="w-3 h-3 text-mission-green" />
                                  <span className="text-muted-foreground">Seismic wave analysis</span>
                                </div>
                              </div>
                            )}
                            
                            {feature.title.includes("Global") && (
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2 text-sm">
                                  <CheckCircle className="w-3 h-3 text-mission-green" />
                                  <span className="text-muted-foreground">Worldwide impact locations</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm">
                                  <CheckCircle className="w-3 h-3 text-mission-green" />
                                  <span className="text-muted-foreground">Population density integration</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm">
                                  <CheckCircle className="w-3 h-3 text-mission-green" />
                                  <span className="text-muted-foreground">Infrastructure assessment</span>
                                </div>
                              </div>
                            )}
                            
                            {feature.title.includes("Physics") && (
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2 text-sm">
                                  <CheckCircle className="w-3 h-3 text-mission-green" />
                                  <span className="text-muted-foreground">Atmospheric entry simulation</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm">
                                  <CheckCircle className="w-3 h-3 text-mission-green" />
                                  <span className="text-muted-foreground">Fragmentation modeling</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm">
                                  <CheckCircle className="w-3 h-3 text-mission-green" />
                                  <span className="text-muted-foreground">3D trajectory visualization</span>
                                </div>
                              </div>
                            )}
                            
                            {feature.title.includes("Defense") && (
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2 text-sm">
                                  <CheckCircle className="w-3 h-3 text-mission-green" />
                                  <span className="text-muted-foreground">Kinetic impactor analysis</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm">
                                  <CheckCircle className="w-3 h-3 text-mission-green" />
                                  <span className="text-muted-foreground">Gravity tractor modeling</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm">
                                  <CheckCircle className="w-3 h-3 text-mission-green" />
                                  <span className="text-muted-foreground">Cost-effectiveness comparison</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Impact Tab */}
                <TabsContent value="impact" className="space-y-8">
                  <Card className="tab-card bg-card/60 border-border/50 backdrop-blur-sm shadow-command">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-3">
                        <div className="card-icon p-3 rounded-lg bg-gradient-to-br from-mission-green to-quantum-blue">
                          <Award className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <span className="text-2xl text-mission-green">Project Impact & Applications</span>
                          <p className="text-sm text-muted-foreground font-normal mt-1">
                            Real-world benefits and future potential
                          </p>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="space-y-8">
                      {/* Impact Metrics */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {impactMetrics.map((metric, index) => (
                          <Card key={index} className="tab-card interactive-card bg-quantum-blue/5 border-quantum-blue/20 text-center transition-all duration-300">
                            <CardContent className="p-6">
                              <div className="text-2xl font-bold text-quantum-blue mb-2">{metric.value}</div>
                              <div className="text-sm font-medium text-foreground mb-2">{metric.label}</div>
                              <div className="text-xs text-muted-foreground">{metric.description}</div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      {/* Real-world Applications */}
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-foreground flex items-center">
                          <TrendingUp className="w-5 h-5 mr-2 text-mission-green" />
                          Real-World Applications
                        </h3>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="tab-card p-4 bg-mission-green/10 rounded-lg border border-mission-green/20 hover:border-mission-green/40 transition-colors">
                              <h4 className="font-semibold text-mission-green mb-2">Educational Institutions</h4>
                              <p className="text-sm text-muted-foreground">
                                Universities and schools can use our platform to teach planetary science, 
                                physics, and space policy through interactive simulations and comprehensive 
                                educational materials.
                              </p>
                            </div>
                            
                            <div className="tab-card p-4 bg-stellar-cyan/10 rounded-lg border border-stellar-cyan/20 hover:border-stellar-cyan/40 transition-colors">
                              <h4 className="font-semibold text-stellar-cyan mb-2">Policy Makers</h4>
                              <p className="text-sm text-muted-foreground">
                                Government agencies can evaluate asteroid threats, assess mitigation costs, 
                                and develop evidence-based policies for planetary defense funding and 
                                international cooperation.
                              </p>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="tab-card p-4 bg-plasma-orange/10 rounded-lg border border-plasma-orange/20 hover:border-plasma-orange/40 transition-colors">
                              <h4 className="font-semibold text-plasma-orange mb-2">Research Community</h4>
                              <p className="text-sm text-muted-foreground">
                                Scientists can validate impact models, explore scenario parameters, and 
                                communicate research findings to broader audiences through accessible 
                                visualizations.
                              </p>
                            </div>
                            
                            <div className="tab-card p-4 bg-quantum-blue/10 rounded-lg border border-quantum-blue/20 hover:border-quantum-blue/40 transition-colors">
                              <h4 className="font-semibold text-quantum-blue mb-2">Public Engagement</h4>
                              <p className="text-sm text-muted-foreground">
                                Media organizations and science communicators can use our tools to create 
                                compelling content that accurately represents asteroid threats and 
                                planetary defense capabilities.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Future Vision */}
                      <div className="tab-card p-6 bg-gradient-to-r from-mission-green/10 via-quantum-blue/10 to-stellar-cyan/10 rounded-lg border border-mission-green/20">
                        <div className="flex items-start space-x-4">
                          <div className="card-icon p-3 rounded-full bg-mission-green/20">
                            <Rocket className="w-6 h-6 text-mission-green" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-mission-green mb-2">
                              Vision for the Future
                            </h4>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                              Our platform represents a step toward democratizing access to planetary defense 
                              knowledge. By making complex science accessible and engaging, we contribute to 
                              building a more informed society capable of supporting evidence-based decisions 
                              about cosmic threats.
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <Badge className="bg-mission-green text-white hover:bg-mission-green/80 transition-colors">Research Platform</Badge>
                              <Badge className="bg-stellar-cyan text-white hover:bg-stellar-cyan/80 transition-colors">Open Source</Badge>
                              <Badge className="bg-quantum-blue text-white hover:bg-quantum-blue/80 transition-colors">Educational Impact</Badge>
                              <Badge className="bg-plasma-orange text-white hover:bg-plasma-orange/80 transition-colors">Scientific Accuracy</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;