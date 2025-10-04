import { useState } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection"; // ← Add this import
import SimulationPanel from "@/components/SimulationPanel";
import OrbitalVisualization from "@/components/OrbitalVisualization";
import ImpactDataChart from "@/components/ImpactDataChart";
import MitigationStrategies from "@/components/MitigationStrategies";
import GameMode from "@/components/GameMode";
import EducationalContent from "@/components/EducationalContent";
import Footer from "@/components/Footer";

const Index = () => {
  const [simulationData, setSimulationData] = useState(null);
  const [asteroidParams, setAsteroidParams] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulationStart = (data) => {
    setIsSimulating(true);
    setSimulationData(data);
    // Auto-stop simulation after visualization completes
    setTimeout(() => setIsSimulating(false), 10000);
  };

  const handleParamsChange = (params) => {
    setAsteroidParams(params);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="relative">
        <HeroSection />
        
        {/* About Section - New Addition */}
        <AboutSection />
        
        {/* Simulation Section - Fully Responsive */}
        <section id="simulation" className="py-10 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
                <span className="bg-gradient-to-r from-quantum-blue via-stellar-cyan to-plasma-orange bg-clip-text text-transparent">
                  Asteroid Impact Simulator
                </span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
                Configure asteroid parameters and witness the potential consequences of cosmic impacts
              </p>
            </div>

            {/* Responsive Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              {/* Left Column - Simulation Panel */}
              <div className="lg:col-span-4 xl:col-span-4">
                <div className="sticky top-20 lg:top-24">
                  <SimulationPanel 
                    onSimulationComplete={handleSimulationStart}
                    onParamsChange={handleParamsChange}
                  />
                </div>
              </div>

              {/* Right Column - Visualizations */}
              <div className="lg:col-span-8 xl:col-span-8 space-y-6 lg:space-y-8">
                <OrbitalVisualization 
                  params={asteroidParams} 
                  isSimulating={isSimulating}
                />
                <ImpactDataChart data={simulationData} />
              </div>
            </div>
          </div>
        </section>

        {/* Other Sections - Enhanced Spacing */}
        <div className="space-y-16 sm:space-y-20 lg:space-y-24">
          <section id="mitigation">
            <MitigationStrategies asteroidParams={asteroidParams} />
          </section>
          <section id="gamified">
            <GameMode />
          </section>
          <section id="education">
            <EducationalContent />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;