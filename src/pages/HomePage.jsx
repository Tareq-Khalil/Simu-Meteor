import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Rocket, 
  Shield, 
  Target, 
  Zap, 
  BookOpen, 
  Globe, 
  AlertTriangle,
  Activity,
  ChevronRight,
  Play,
  Info,
  Database,
  Cpu,
  Radar,
  Eye,
  Telescope,
  BarChart3,
  Settings,
  Calculator,
  Brain,
  Gamepad2,
  GraduationCap
} from "lucide-react";
import heroImage from "@/assets/hero-space.jpg";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentDataIndex, setCurrentDataIndex] = useState({
    simulation: 0,
    threat: 0,
    defense: 0,
    system: 0
  });

  // Animation refs
  const heroRef = useRef(null);
  const missionStatusRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const quickActionsRef = useRef(null);
  const ctaButtonsRef = useRef(null);
  const capabilitiesHeaderRef = useRef(null);
  const capabilitiesCardsRef = useRef(null);
  const dashboardHeaderRef = useRef(null);
  const dashboardCardsRef = useRef(null);
  const finalCtaRef = useRef(null);

  // Live feature sets for each card - focusing on website capabilities
  const liveFeatures = {
    simulation: [
      { 
        title: "Launch Simulation", 
        description: "Advanced impact modeling", 
        icon: Play, 
        feature: "Physics Engine",
        capability: "Real-time calculations",
        status: "Ready"
      },
      { 
        title: "3D Visualization", 
        description: "Orbital mechanics display", 
        icon: Eye, 
        feature: "Interactive View",
        capability: "Dynamic rendering",
        status: "Active"
      },
      { 
        title: "Impact Analysis", 
        description: "Damage assessment tools", 
        icon: BarChart3, 
        feature: "Data Modeling",
        capability: "Predictive analysis",
        status: "Available"
      },
      { 
        title: "Parameter Control", 
        description: "Asteroid customization", 
        icon: Settings, 
        feature: "User Interface",
        capability: "Full configuration",
        status: "Interactive"
      }
    ],
    threat: [
      { 
        title: "Threat Assessment", 
        description: "Risk evaluation system", 
        icon: AlertTriangle, 
        feature: "Detection Grid",
        capability: "Continuous scanning",
        status: "Monitoring"
      },
      { 
        title: "NEO Database", 
        description: "Astronomical catalog", 
        icon: Telescope, 
        feature: "Object Tracking",
        capability: "Comprehensive data",
        status: "Updated"
      },
      { 
        title: "Risk Calculator", 
        description: "Probability analysis", 
        icon: Calculator, 
        feature: "Assessment Tools",
        capability: "Mathematical modeling",
        status: "Operational"
      },
      { 
        title: "Early Warning", 
        description: "Detection algorithms", 
        icon: Radar, 
        feature: "Alert System",
        capability: "Real-time monitoring",
        status: "Scanning"
      }
    ],
    defense: [
      { 
        title: "Defense Planning", 
        description: "Mitigation strategies", 
        icon: Shield, 
        feature: "Strategy Library",
        capability: "Multiple approaches",
        status: "Ready"
      },
      { 
        title: "Mission Design", 
        description: "Deflection planning", 
        icon: Target, 
        feature: "Tactical Planning",
        capability: "Mission optimization",
        status: "Available"
      },
      { 
        title: "Technology Review", 
        description: "Defense systems analysis", 
        icon: Zap, 
        feature: "Tech Evaluation",
        capability: "Comprehensive testing",
        status: "Active"
      },
      { 
        title: "Global Coordination", 
        description: "International cooperation", 
        icon: Globe, 
        feature: "Network Interface",
        capability: "Multi-agency support",
        status: "Connected"
      }
    ],
    system: [
      { 
        title: "System Status", 
        description: "Platform monitoring", 
        icon: Activity, 
        feature: "Health Check",
        capability: "System diagnostics",
        status: "Optimal"
      },
      { 
        title: "Game Mode", 
        description: "Interactive scenarios", 
        icon: Gamepad2, 
        feature: "Mission Control",
        capability: "Gamified learning",
        status: "Available"
      },
      { 
        title: "Education Hub", 
        description: "Learning platform", 
        icon: GraduationCap, 
        feature: "Knowledge Base",
        capability: "Interactive lessons",
        status: "Accessible"
      },
      { 
        title: "AI Assistant", 
        description: "Intelligent guidance", 
        icon: Brain, 
        feature: "Smart Help",
        capability: "Context-aware support",
        status: "Online"
      }
    ]
  };

  // Cycle through features every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDataIndex(prev => ({
        simulation: (prev.simulation + 1) % liveFeatures.simulation.length,
        threat: (prev.threat + 1) % liveFeatures.threat.length,
        defense: (prev.defense + 1) % liveFeatures.defense.length,
        system: (prev.system + 1) % liveFeatures.system.length
      }));
    }, 4000);

    return () => clearInterval(interval);
  });

  // Animate card content changes
  useEffect(() => {
    const cards = document.querySelectorAll('.live-card-content');
    cards.forEach(card => {
      gsap.fromTo(card, {
        opacity: 0.8,
        scale: 0.98
      }, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      });
    });
  }, [currentDataIndex]);

  // Get current feature for each card
  const getCurrentFeature = (type) => {
    return liveFeatures[type][currentDataIndex[type]];
  };

  // Initialize animations
  useEffect(() => {
    // Set initial load state
    setIsLoaded(true);

    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      // Only set opacity to 0 if elements exist
      const heroElements = [
        missionStatusRef.current,
        titleRef.current,
        descriptionRef.current,
        ctaButtonsRef.current
      ].filter(Boolean);

      if (heroElements.length > 0) {
        gsap.set(heroElements, {
          opacity: 0,
          y: 50
        });

        // Create main timeline for hero section
        const heroTimeline = gsap.timeline({ delay: 0.2 });

        heroTimeline
          .to(missionStatusRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
          })
          .to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out"
          }, "-=0.5")
          .to(descriptionRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out"
          }, "-=0.8")
          .to(ctaButtonsRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "back.out(1.7)"
          }, "-=0.4");
      }

      // Quick Actions Animation - ONLY for Quick Actions
      if (quickActionsRef.current) {
        ScrollTrigger.create({
          trigger: quickActionsRef.current,
          start: "top 90%",
          onEnter: () => {
            gsap.fromTo(quickActionsRef.current.children, {
              opacity: 0,
              y: 40,
              scale: 0.98
            }, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              stagger: 0.08,
              ease: "power2.out"
            });
          },
          once: true
        });
      }

      // Add hover effects only
      const addCardHoverEffects = () => {
        const cards = document.querySelectorAll('.hover-card');
        cards.forEach((card) => {
          if (card.dataset.hoverInitialized) return;
          card.dataset.hoverInitialized = 'true';
          
          const icon = card.querySelector('.card-icon');
          
          const handleMouseEnter = () => {
            gsap.to(card, {
              scale: 1.02,
              y: -4,
              duration: 0.2,
              ease: "power2.out"
            });
            if (icon) {
              gsap.to(icon, {
                scale: 1.05,
                rotation: 2,
                duration: 0.2,
                ease: "power2.out"
              });
            }
          };

          const handleMouseLeave = () => {
            gsap.to(card, {
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

          card.addEventListener('mouseenter', handleMouseEnter);
          card.addEventListener('mouseleave', handleMouseLeave);
        });
      };

      setTimeout(addCardHoverEffects, 500);

    }, 100);

    // Cleanup
    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const platformFeatures = [
    {
      title: "Advanced Simulation",
      description: "Physics-based asteroid impact modeling with real data and scientific accuracy.",
      icon: Zap,
      href: "/simulation",
      color: "text-quantum-blue",
      bgColor: "bg-quantum-blue/10",
      borderColor: "border-quantum-blue/20",
      features: ["Real-time physics engine", "3D orbital visualization", "Impact damage analysis"],
      stats: "Professional-grade modeling"
    },
    {
      title: "Defense Strategies",
      description: "Comprehensive evaluation of planetary defense technologies and mission planning.",
      icon: Shield,
      href: "/defense",
      color: "text-mission-green",
      bgColor: "bg-mission-green/10",
      borderColor: "border-mission-green/20",
      features: ["Kinetic impactor modeling", "Gravity tractor analysis", "Nuclear deflection planning"],
      stats: "Multi-strategy analysis"
    },
    {
      title: "Mission Control",
      description: "Interactive command center for asteroid threat scenarios and response coordination.",
      icon: Target,
      href: "/mission-control",
      color: "text-plasma-orange",
      bgColor: "bg-plasma-orange/10",
      borderColor: "border-plasma-orange/20",
      features: ["Scenario planning", "Real-time decision support", "Crisis management"],
      stats: "Gamified scenarios"
    },
    {
      title: "Education Hub",
      description: "Comprehensive learning platform about asteroid science and planetary defense.",
      icon: BookOpen,
      href: "/education",
      color: "text-stellar-cyan",
      bgColor: "bg-stellar-cyan/10",
      borderColor: "border-stellar-cyan/20",
      features: ["Interactive lessons", "Scientific research", "Expert insights"],
      stats: "Educational modules"
    }
  ];

  const systemMetrics = [
    { label: "Simulation Engine", value: 98, status: "Optimal" },
    { label: "Data Integration", value: 95, status: "Good" },
    { label: "Defense Modeling", value: 97, status: "Excellent" },
    { label: "Education Platform", value: 100, status: "Perfect" }
  ];

  return (
    <div className={`min-h-screen w-full overflow-x-hidden transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Enhanced Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Earth from space with approaching asteroid threat"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/70 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/40" />
        </div>

        {/* Enhanced Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 sm:w-3 sm:h-3 bg-quantum-blue rounded-full animate-pulse-glow opacity-80" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 sm:w-2 sm:h-2 bg-stellar-cyan rounded-full animate-pulse-glow opacity-60 animate-float-gentle" />
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 sm:w-4 sm:h-4 bg-plasma-orange rounded-full animate-pulse-glow opacity-70" />
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-mission-green rounded-full animate-pulse-glow opacity-90" />

        {/* Professional Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-5 z-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px sm:50px sm:50px'
          }} />
        </div>

        {/* Enhanced Parallax Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-20 h-20 sm:w-32 sm:h-32 bg-quantum-blue/5 rounded-full blur-xl animate-float-gentle" />
          <div className="absolute bottom-20 right-10 w-24 h-24 sm:w-40 sm:h-40 bg-stellar-cyan/5 rounded-full blur-2xl animate-rotate-slow" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-64 sm:h-64 bg-plasma-orange/3 rounded-full blur-3xl animate-pulse-glow" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          
          {/* Enhanced Mission Status Header */}
          <div ref={missionStatusRef} className="mb-6 sm:mb-8 flex justify-center opacity-100">
            <div className="inline-flex items-center space-x-3 sm:space-x-5 bg-gradient-to-r from-card/50 via-card/60 to-card/50 backdrop-blur-2xl border border-quantum-blue/30 rounded-2xl px-6 sm:px-8 py-4 sm:py-5 shadow-command hover:shadow-glow transition-all duration-300">
              {/* Mission Status Indicator */}
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="w-3 h-3 bg-mission-green rounded-full animate-pulse shadow-command" />
                  <div className="absolute inset-0 w-3 h-3 bg-mission-green rounded-full animate-ping opacity-30" />
                </div>
                <span className="text-sm sm:text-base font-bold text-mission-green tracking-wider uppercase">
                  Mission Active
                </span>
              </div>

              {/* Divider */}
              <div className="h-6 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
              
              {/* Defense Status */}
              <div className="flex items-center space-x-2">
                <Shield 
                  className="w-4 h-4 sm:w-5 sm:h-5 text-quantum-blue" 
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(96, 165, 250, 0.6))',
                    animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                  }}
                />
                <span className="text-sm sm:text-base font-semibold text-quantum-blue">
                  Defense Systems Online
                </span>
              </div>

              {/* Divider */}
              <div className="h-6 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

              {/* Satellite Network Status */}
              <div className="flex items-center space-x-2">
                <Radar 
                  className="w-4 h-4 sm:w-5 sm:h-5 text-stellar-cyan" 
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.6))',
                    animation: 'spin 4s linear infinite'
                  }}
                />
                <span className="text-sm sm:text-base font-medium text-stellar-cyan">
                  Network Tracking
                </span>
              </div>
            </div>
          </div>

          {/* Main Title */}
          <div ref={titleRef} className="opacity-100">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 animate-float">
              <span className="block text-blue-400 drop-shadow-lg mb-1 sm:mb-2"
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
              <span className="block text-cyan-400 drop-shadow-lg text-2xl sm:text-3xl md:text-5xl lg:text-6xl"
               style={{     
                  filter: 'drop-shadow(0 0 20px rgba(96, 165, 250, 0.5))'
                }}
              >
                Impact Lab
              </span>
            </h1>
          </div>
            
          <div ref={descriptionRef} className="opacity-100">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-6 sm:mb-8 px-2">
              Advanced asteroid impact simulation platform for
              <span className="text-quantum-blue font-medium"> planetary defense research</span>, 
              education, and mission planning for global resilience and scientific advancement.
            </p>
          </div>

          {/* Dynamic Feature Cards - Original Size */}
          <div ref={quickActionsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12 px-2">
            {[
              { type: 'simulation', href: '/simulation', color: 'bg-quantum-blue' },
              { type: 'threat', href: '/education', color: 'bg-plasma-orange' },
              { type: 'defense', href: '/defense', color: 'bg-mission-green' },
              { type: 'system', href: '/about', color: 'bg-stellar-cyan' }
            ].map((config, index) => {
              const feature = getCurrentFeature(config.type);
              return (
                <Link key={index} to={config.href}>
                  <Card className="hover-card bg-card/60 border-border/50 backdrop-blur-sm hover:shadow-command transition-all duration-300 group cursor-pointer relative overflow-hidden h-full">
                    <CardContent className="live-card-content p-3 sm:p-6 text-center">
                      <div className={`card-icon w-8 h-8 sm:w-12 sm:h-12 ${config.color} rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-4 transition-transform shadow-command`}>
                        <feature.icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                      </div>
                      
                      <h3 className="font-semibold text-foreground mb-1 sm:mb-2 text-sm sm:text-base">{feature.title}</h3>
                      
                      {/* Feature Information */}
                      <div className="mb-2">
                        <div className="text-xs sm:text-sm font-medium text-quantum-blue">{feature.feature}</div>
                        <div className="text-xs text-muted-foreground">{feature.capability}</div>
                      </div>

                      {/* Status Badge */}
                      <div className="flex justify-center mb-2">
                        <Badge className="bg-mission-green/20 text-mission-green text-xs border-mission-green/30" variant="outline">
                          {feature.status}
                        </Badge>
                      </div>
                      
                      <p className="text-xs sm:text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* Primary CTA Buttons */}
          <div ref={ctaButtonsRef} className="text-center px-4 opacity-100">
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6 justify-center items-center">
              <Link to="/simulation" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-gradient-quantum hover:shadow-command transition-all duration-300 h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold group border-0">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Launch Simulation
                </Button>
              </Link>
              <Link to="/about" className="w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto border-2 border-quantum-blue/60 text-quantum-blue hover:text-white hover:bg-quantum-blue hover:border-quantum-blue h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold group transition-all duration-300"
                >
                  <Info className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Mission Briefing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Capabilities Section - NO SCROLL ANIMATIONS */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-background to-blue-950/10">
        <div className="max-w-7xl mx-auto">
          <div ref={capabilitiesHeaderRef} className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center space-x-2 bg-quantum-blue/10 border border-quantum-blue/20 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6">
              <Cpu className="w-3 h-3 sm:w-4 sm:h-4 text-quantum-blue" />
              <span className="text-xs sm:text-sm font-semibold text-quantum-blue">PLATFORM CAPABILITIES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6">
              <span className="text-foreground">Advanced </span>
              <span 
                className="bg-gradient-to-r from-quantum-blue to-stellar-cyan bg-clip-text text-transparent drop-shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #60a5fa 0%, #22d3ee 50%, #fb923c 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 10px rgba(96, 165, 250, 0.3))'
                }}
              >
                Defense Systems
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive tools for asteroid threat assessment, defense planning, and educational outreach.
            </p>
          </div>

          <div ref={capabilitiesCardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {platformFeatures.map((feature, index) => (
              <Link key={index} to={feature.href}>
                <Card className={`hover-card ${feature.bgColor} ${feature.borderColor} backdrop-blur-sm shadow-command hover:shadow-glow transition-all duration-300 group cursor-pointer h-full`}>
                  <CardHeader className="pb-3 sm:pb-6">
                    <CardTitle className="flex items-start sm:items-center space-x-3">
                      <div className={`card-icon p-2 sm:p-3 rounded-lg bg-gradient-to-br from-current to-transparent ${feature.color} shadow-command flex-shrink-0`}>
                        <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className={`text-lg sm:text-xl ${feature.color} font-semibold`}>{feature.title}</span>
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-quantum-blue group-hover:translate-x-1 transition-all flex-shrink-0" />
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {feature.stats}
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 sm:mb-4">
                      {feature.description}
                    </p>
                    <div className="space-y-1 sm:space-y-2">
                      {feature.features.map((item, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${feature.color.replace('text-', 'bg-')} flex-shrink-0`} />
                          <span className="text-xs sm:text-sm text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* System Status Dashboard - NO SCROLL ANIMATIONS */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-card/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div ref={dashboardHeaderRef} className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-quantum-blue">
              Mission Control Dashboard
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
              Real-time monitoring of platform systems and planetary defense readiness.
            </p>
          </div>

          <div ref={dashboardCardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* System Health */}
            <Card className="hover-card bg-card/60 border-border/50 backdrop-blur-sm shadow-command">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-mission-green/20 flex-shrink-0">
                    <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-mission-green" />
                  </div>
                  <span className="text-mission-green text-sm sm:text-base">System Health</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 pt-0">
                <div className="space-y-2 sm:space-y-3">
                  {systemMetrics.map((metric, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs sm:text-sm mb-1">
                        <span className="text-muted-foreground">{metric.label}</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-mission-green">{metric.value}%</span>
                          <Badge className="bg-mission-green/20 text-mission-green text-xs">
                            {metric.status}
                          </Badge>
                        </div>
                      </div>
                      <Progress value={metric.value} className="h-1.5 sm:h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Current Threat Level */}
            <Card className="hover-card bg-card/60 border-border/50 backdrop-blur-sm shadow-command">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-mission-green/20 flex-shrink-0">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-mission-green" />
                  </div>
                  <span className="text-mission-green text-sm sm:text-base">Threat Level</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <div className="text-4xl sm:text-6xl font-bold text-mission-green mb-2">LOW</div>
                <div className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                  No immediate asteroid threats detected.
                </div>
                <Badge className="bg-mission-green text-white mb-3 sm:mb-4">
                  All systems nominal
                </Badge>
                <div className="text-xs text-muted-foreground">
                  Status: Active Monitoring
                </div>
              </CardContent>
            </Card>

            {/* Platform Features */}
            <Card className="hover-card bg-card/60 border-border/50 backdrop-blur-sm shadow-command">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-quantum-blue/20 flex-shrink-0">
                    <Database className="w-4 h-4 sm:w-5 sm:h-5 text-quantum-blue" />
                  </div>
                  <span className="text-quantum-blue text-sm sm:text-base">Platform Features</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3 pt-0">
                {[
                  { label: "Simulation Engine", feature: "Physics-based modeling", status: "Active" },
                  { label: "Defense Analysis", feature: "Strategy evaluation", status: "Ready" },
                  { label: "Education Hub", feature: "Interactive learning", status: "Available" },
                  { label: "Mission Control", feature: "Scenario planning", status: "Online" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-xs sm:text-sm">
                    <div className="flex-1">
                      <div className="text-muted-foreground">{item.label}</div>
                      <div className="text-xs text-quantum-blue">{item.feature}</div>
                    </div>
                    <Badge variant="outline" className="text-xs text-mission-green border-mission-green/30">
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final Call to Action - NO SCROLL ANIMATIONS */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-background to-blue-950/10">
        <div className="max-w-4xl mx-auto text-center">
          <Card ref={finalCtaRef} className="bg-gradient-to-r from-quantum-blue/10 via-stellar-cyan/10 to-plasma-orange/10 border border-quantum-blue/20 backdrop-blur-sm shadow-command">
            <CardContent className="p-6 sm:p-8 lg:p-12">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="p-3 sm:p-4 rounded-full bg-gradient-quantum shadow-command">
                  <Globe className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-quantum-blue mb-3 sm:mb-4">
                Ready to Defend Earth?
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Join the mission to understand and prepare for asteroid threats. 
                Explore our advanced simulation platform and contribute to planetary defense research.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6 justify-center">
                <Link to="/simulation" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-gradient-quantum hover:shadow-command transition-all duration-300 h-10 sm:h-12 px-6 sm:px-8 group border-0">
                    <Rocket className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Start Mission
                  </Button>
                </Link>
                <Link to="/education" className="w-full sm:w-auto">
                  <Button 
                    variant="outline" 
                    className="w-full sm:w-auto border-2 border-quantum-blue/60 text-quantum-blue hover:text-white hover:bg-quantum-blue hover:border-quantum-blue h-10 sm:h-12 px-6 sm:px-8 group transition-all duration-300"
                  >
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Learn More
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default HomePage;