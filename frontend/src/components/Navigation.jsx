import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Shield, Target, Zap, BookOpen, Satellite, Rocket, Info, Home } from "lucide-react";
import gsap from 'gsap';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();

  // Animation refs
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const desktopNavRef = useRef(null);
  const mediumNavRef = useRef(null);
  const mobileButtonRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const navItems = [
    { name: "Home", href: "/", icon: Home, path: "/" },
    { name: "About", href: "/about", icon: Info, path: "/about" },
    { name: "Simulation", href: "/simulation", icon: Zap, path: "/simulation" },
    { name: "Defense", href: "/defense", icon: Shield, path: "/defense" },
    { name: "Mission Control", href: "/mission-control", icon: Target, path: "/mission-control" },
    { name: "Education", href: "/education", icon: BookOpen, path: "/education" },
  ];

  // Initialize animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);

      // Initial load animations
      if (navRef.current) {
        gsap.set(navRef.current, { y: -100, opacity: 0 });
        gsap.to(navRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.2
        });
      }

      // Logo animation
      if (logoRef.current) {
        gsap.set(logoRef.current.children, { scale: 0, rotation: -180 });
        gsap.to(logoRef.current.children, {
          scale: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 0.5
        });
      }

      // Desktop nav items animation
      if (desktopNavRef.current) {
        gsap.set(desktopNavRef.current.children, { x: 50, opacity: 0 });
        gsap.to(desktopNavRef.current.children, {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.8
        });
      }

      // Medium nav items animation
      if (mediumNavRef.current) {
        gsap.set(mediumNavRef.current.children, { scale: 0, rotation: 180 });
        gsap.to(mediumNavRef.current.children, {
          scale: 1,
          rotation: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "back.out(1.4)",
          delay: 0.8
        });
      }

      // Mobile button animation
      if (mobileButtonRef.current) {
        gsap.set(mobileButtonRef.current.children, { x: 30, opacity: 0 });
        gsap.to(mobileButtonRef.current.children, {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          delay: 1
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Mobile menu animations
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isOpen) {
        gsap.set(mobileMenuRef.current, { autoAlpha: 1 });
        gsap.fromTo(mobileMenuRef.current.querySelector('.mobile-backdrop'), 
          { opacity: 0 },
          { opacity: 1, duration: 0.3 }
        );
        gsap.fromTo(mobileMenuRef.current.querySelector('.mobile-panel'), 
          { y: -100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
        );

        // Animate menu items
        const menuItems = mobileMenuRef.current.querySelectorAll('.mobile-nav-item');
        gsap.set(menuItems, { x: 50, opacity: 0 });
        gsap.to(menuItems, {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
          delay: 0.2
        });
      } else {
        gsap.to(mobileMenuRef.current.querySelector('.mobile-backdrop'), 
          { opacity: 0, duration: 0.2 }
        );
        gsap.to(mobileMenuRef.current.querySelector('.mobile-panel'), 
          { y: -50, opacity: 0, duration: 0.3, ease: "power2.in" }
        );
        gsap.to(mobileMenuRef.current, {
          autoAlpha: 0,
          duration: 0.3,
          delay: 0.1
        });
      }
    }
  }, [isOpen]);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
        
        // Animate navbar background change
        if (navRef.current) {
          gsap.to(navRef.current, {
            backgroundColor: scrolled ? 'rgba(var(--background), 0.95)' : 'rgba(var(--background), 0.8)',
            backdropFilter: scrolled ? 'blur(24px)' : 'blur(16px)',
            borderColor: scrolled ? 'rgba(var(--border), 1)' : 'rgba(var(--border), 0.5)',
            boxShadow: scrolled ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' : 'none',
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  // Reset scroll position and close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('nav')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const isActivePage = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleNavClick = () => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  const handleMobileToggle = () => {
    setIsOpen(!isOpen);
  };

  // Enhanced nav item hover animations
  const handleNavItemHover = (element, isEntering) => {
    if (!element) return;
    
    const icon = element.querySelector('svg');
    
    if (isEntering) {
      gsap.to(element, {
        scale: 1.05,
        duration: 0.2,
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
    } else {
      gsap.to(element, {
        scale: 1,
        duration: 0.2,
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
    }
  };

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-xl border-b border-border shadow-command' 
          : 'bg-background/80 backdrop-blur-lg border-b border-border/50'
      } ${!isLoaded ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Enhanced Professional Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={handleNavClick}
            ref={logoRef}
            onMouseEnter={(e) => handleNavItemHover(e.currentTarget, true)}
            onMouseLeave={(e) => handleNavItemHover(e.currentTarget, false)}
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-quantum rounded-xl flex items-center justify-center transition-all duration-300 group-hover:shadow-command">
              <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-lg" />
              <div className="absolute inset-0 bg-gradient-to-r from-stellar-cyan/20 to-transparent rounded-xl animate-pulse-glow"></div>
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="text-sm font-bold tracking-[0.1em] sm:tracking-[0.15em] text-stellar-cyan uppercase leading-none opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                <span className="hidden xs:inline">IMPACT LAB</span>
                <span className="xs:hidden">IMPACT LAB</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div ref={desktopNavRef} className="flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePage(item.path);
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={handleNavClick}
                    onMouseEnter={(e) => handleNavItemHover(e.currentTarget, true)}
                    onMouseLeave={(e) => handleNavItemHover(e.currentTarget, false)}
                    className={`relative flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
                      isActive 
                        ? 'text-quantum-blue bg-quantum-blue/10 shadow-command border border-quantum-blue/30' 
                        : 'text-foreground hover:text-quantum-blue hover:bg-card/50 border border-transparent hover:border-quantum-blue/20'
                    }`}
                  >
                    <Icon 
                    style={{
                    filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.3))',
                    transform: isActive ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
                  }}
                    className={`w-4 h-4 transition-all duration-300`} />
                    <span className="hidden xl:inline">{item.name}</span>
                    
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-quantum-blue rounded-full shadow-command" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Medium screens navigation */}
          <div className="hidden md:flex lg:hidden items-center space-x-1">
            <div ref={mediumNavRef} className="flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePage(item.path);
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={handleNavClick}
                    onMouseEnter={(e) => handleNavItemHover(e.currentTarget, true)}
                    onMouseLeave={(e) => handleNavItemHover(e.currentTarget, false)}
                    className={`relative flex items-center justify-center w-10 h-10 rounded-lg text-sm font-medium transition-all duration-300 group ${
                      isActive 
                        ? 'text-quantum-blue bg-quantum-blue/10 shadow-command border border-quantum-blue/30' 
                        : 'text-foreground hover:text-quantum-blue hover:bg-card/50 border border-transparent hover:border-quantum-blue/20'
                    }`}
                    title={item.name}
                  >
                    <Icon 
                    style={{
                    filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.3))',
                    transform: isActive ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
                  }}
                    className={`w-4 h-4 transition-all duration-300`} />
                    
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-quantum-blue rounded-full shadow-command" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <div ref={mobileButtonRef} className="flex items-center space-x-2">
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="hover:bg-card/50 border border-transparent hover:border-quantum-blue/20 w-10 h-10 p-0"
                  onMouseEnter={(e) => handleNavItemHover(e.currentTarget, true)}
                  onMouseLeave={(e) => handleNavItemHover(e.currentTarget, false)}
                >
                  <Satellite className="w-4 h-4 text-foreground" />
                </Button>
                <Badge className="absolute -top-1 -right-1 w-3 h-3 p-0 bg-mission-green animate-pulse" />
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMobileToggle}
                onMouseEnter={(e) => handleNavItemHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleNavItemHover(e.currentTarget, false)}
                className="hover:bg-card/50 transition-all duration-300 border border-transparent hover:border-quantum-blue/20 w-10 h-10 p-0"
              >
                <div className="relative w-5 h-5">
                  <Menu className={`absolute inset-0 w-5 h-5 transition-all duration-300 text-foreground ${
                    isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                  }`} />
                  <X className={`absolute inset-0 w-5 h-5 transition-all duration-300 text-foreground ${
                    isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                  }`} />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div 
        ref={mobileMenuRef}
        className="md:hidden fixed inset-0 invisible opacity-0"
        style={{ willChange: 'auto' }}
      >
        <div 
          className="mobile-backdrop absolute inset-0 bg-background/90 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
        
        <div className="mobile-panel absolute top-16 left-0 right-0 bg-card/95 backdrop-blur-xl border-b border-border">
          <div className="px-4 py-6 space-y-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActivePage(item.path);
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={handleNavClick}
                  onMouseEnter={(e) => handleNavItemHover(e.currentTarget, true)}
                  onMouseLeave={(e) => handleNavItemHover(e.currentTarget, false)}
                  className={`mobile-nav-item w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left font-medium transition-all duration-300 transform border ${
                    isActive 
                      ? 'text-quantum-blue bg-quantum-blue/10 shadow-command border-quantum-blue/30' 
                      : 'text-foreground hover:text-quantum-blue hover:bg-muted/50 border-transparent hover:border-quantum-blue/20'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    isActive ? 'bg-quantum-blue/20 shadow-command' : 'bg-muted/50'
                  }`}>
                    <Icon 
                    style={{
                    filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.3))',
                    transform: isActive ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
                  }}
                    className={`w-4 h-4`} />
                  </div>
                  <div className="flex-1">
                    <div className="text-base">{item.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {item.name === 'Home' && 'Mission control dashboard'}
                      {item.name === 'About' && 'Project overview & mission'}
                      {item.name === 'Simulation' && 'Asteroid impact modeling'}
                      {item.name === 'Defense' && 'Planetary protection protocols'}
                      {item.name === 'Mission Control' && 'Interactive command center'}
                      {item.name === 'Education' && 'Research & intelligence'}
                    </div>
                  </div>
                  
                  {isActive && (
                    <div className="ml-auto">
                      <div className="w-2 h-2 bg-quantum-blue rounded-full shadow-command" />
                    </div>
                  )}
                </Link>
              );
            })}
            
            <div className="border-t border-border/50 my-4" />
            
            <div className="px-4 py-2">
              <div className="text-xs font-semibold text-quantum-blue uppercase tracking-wider mb-2">
                Mission Status
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-mission-green rounded-full animate-pulse" />
                <span className="text-muted-foreground">NASA Space Apps Challenge Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @media (min-width: 475px) {
          .xs\\:inline {
            display: inline;
          }
          .xs\\:hidden {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navigation;