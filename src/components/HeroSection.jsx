import { Button } from "@/components/ui/button";
import { Shield, Target, Satellite, AlertTriangle, Globe } from "lucide-react";
import heroImage from "@/assets/hero-space.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
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
      <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-quantum-blue rounded-full animate-pulse-glow opacity-80" />
      <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-stellar-cyan rounded-full animate-pulse-glow opacity-60 animate-float-gentle" />
      <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-plasma-orange rounded-full animate-pulse-glow opacity-70" />
      <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-mission-green rounded-full animate-pulse-glow opacity-90" />

      {/* Professional Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 z-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Mission Status Badge - Fixed Positioning */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center space-x-3 bg-card/40 backdrop-blur-xl border border-quantum-blue/40 rounded-full px-6 py-3 shadow-command">
            <div className="w-3 h-3 bg-mission-green rounded-full animate-pulse shadow-command" />
            <span className="text-sm font-semibold text-quantum-blue tracking-wider uppercase">
              PLANETARY DEFENSE ACTIVE
            </span>
            <Satellite className="w-5 h-5 text-quantum-blue" />
          </div>
        </div>

        {/* Main Title - Natural Look Without Wave Effects */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-float">
          <span className="block text-blue-400 drop-shadow-lg mb-2"
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
          <span className="block text-cyan-400 drop-shadow-lg text-3xl md:text-5xl lg:text-6xl"
           style={{     
              filter: 'drop-shadow(0 0 20px rgba(96, 165, 250, 0.5))'
            }}
          >
            Defense Systems
          </span>
        </h1>


        {/* Professional Mission Statement */}
        <div className="mb-10 max-w-4xl mx-auto">
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real-time asteroid threat assessment, impact modeling, and defense strategy deployment. 
            Protecting Earth through cutting-edge space surveillance and mitigation technologies.
          </p>
        </div>

        {/* Professional Capability Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-12 max-w-5xl mx-auto">
          <div className="card-command rounded-xl p-6 hover:shadow-command hover:scale-105 transition-all duration-300 group">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-gradient-quantum rounded-xl shadow-command">
                <AlertTriangle className="w-8 h-8 text-white group-hover:animate-pulse-glow" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-3 text-quantum-blue">Threat Detection</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Advanced orbital mechanics and real-time impact trajectory analysis
            </p>
            <div className="mt-3 flex items-center justify-center space-x-2 text-xs text-quantum-blue/70">
              <div className="w-1 h-1 bg-quantum-blue rounded-full animate-pulse" />
              <span>AI-Powered Analytics</span>
            </div>
          </div>

          <div className="card-command rounded-xl p-6 hover:shadow-command hover:scale-105 transition-all duration-300 group">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-stellar-cyan to-quantum-blue rounded-xl shadow-command">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-3 text-stellar-cyan">Defense Protocols</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Kinetic impactors, gravity tractors, and nuclear deflection systems
            </p>
            <div className="mt-3 flex items-center justify-center space-x-2 text-xs text-stellar-cyan/70">
              <div className="w-1 h-1 bg-stellar-cyan rounded-full animate-pulse" />
              <span>Multi-Vector Response</span>
            </div>
          </div>

          <div className="card-command rounded-xl p-6 hover:shadow-command hover:scale-105 transition-all duration-300 group">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-gradient-plasma rounded-xl shadow-command">
                <Globe className="w-8 h-8 text-white group-hover:animate-pulse-glow" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-3 text-plasma-orange">Mission Control</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Real-time command center for planetary defense operations
            </p>
            <div className="mt-3 flex items-center justify-center space-x-2 text-xs text-plasma-orange/70">
              <div className="w-1 h-1 bg-plasma-orange rounded-full animate-pulse" />
              <span>24/7 Monitoring</span>
            </div>
          </div>
        </div>

        {/* Professional CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            size="lg" 
            className="btn-quantum text-lg px-8 py-4 h-auto shadow-command"
            onClick={() => document.getElementById('simulation')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Target className="w-5 h-5 mr-2" />
            Initialize Threat Analysis
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-quantum-blue/50 hover:text-quantum-blue hover:border-quantum-blue hover:bg-quantum-blue/10 text-lg px-8 py-4 h-auto backdrop-blur-sm shadow-command"
            onClick={() => document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Shield className="w-5 h-5 mr-2" />
            Access Intel Hub
          </Button>
        </div>

        {/* Mission Statistics */}
        
      </div>

      {/* Enhanced Parallax Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-quantum-blue/5 rounded-full blur-xl animate-float-gentle" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-stellar-cyan/5 rounded-full blur-2xl animate-rotate-slow" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-plasma-orange/3 rounded-full blur-3xl animate-pulse-glow" />
      </div>
    </section>
  );
};

export default HeroSection;