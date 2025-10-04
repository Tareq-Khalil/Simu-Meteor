import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { 
  Play, 
  RotateCcw, 
  AlertTriangle,
  ShieldAlert,
  Target,
  Activity,
  TrendingUp,
  Zap,
  Globe,
  Clock,
  Crosshair,
  ChevronRight,
  List,
  Gauge
} from "lucide-react";
import { simulateAsteroid, presets } from "@/services/api.js";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const SimulationPanel = forwardRef(({ onSimulationStart, onParamsChange }, ref) => {
  const [asteroidParams, setAsteroidParams] = useState({
    size: "100",
    velocity: "20",
    density: "2.5",
    composition: "rock",
    angle: "45"
  });

  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [simulationError, setSimulationError] = useState(""); // Added for user-facing errors
  const [isPresetDialogOpen, setIsPresetDialogOpen] = useState(false);

  // Animation refs
  const containerRef = useRef(null);
  const parametersPanelRef = useRef(null);
  const resultsRef = useRef(null);

  // Store asteroid params in localStorage for MitigationStrategies to access
  useEffect(() => {
    localStorage.setItem('meteoric-asteroid-params', JSON.stringify(asteroidParams));
  }, [asteroidParams]);

  // Initialize animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);

      // Parameters panel animation
      if (parametersPanelRef.current) {
        gsap.fromTo(parametersPanelRef.current, {
          opacity: 0,
          y: 30,
          scale: 0.98
        }, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.2
        });

        // Animate form fields
        const formFields = parametersPanelRef.current.querySelectorAll('.form-field');
        gsap.fromTo(formFields, {
          opacity: 0,
          x: -20
        }, {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.5
        });
      }

      // Add interactive effects
      setTimeout(addInteractiveEffects, 600);
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addInteractiveEffects = () => {
    // Button hover effects
    const buttons = document.querySelectorAll('.interactive-button');
    buttons.forEach((button) => {
      if (button.dataset.hoverInitialized) return;
      button.dataset.hoverInitialized = 'true';
      
      const handleMouseEnter = () => {
        if (!button.disabled) {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.2,
            ease: "power2.out"
          });
        }
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

    // Card hover effects
    const cards = document.querySelectorAll('.simulation-card');
    cards.forEach((card) => {
      if (card.dataset.hoverInitialized) return;
      card.dataset.hoverInitialized = 'true';
      
      const handleMouseEnter = () => {
        gsap.to(card, {
          scale: 1.02,
          y: -4,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    });

    // Preset card hover effects
    const presetCards = document.querySelectorAll('.preset-card');
    presetCards.forEach((card) => {
      if (card.dataset.hoverInitialized) return;
      card.dataset.hoverInitialized = 'true';
      
      const handleMouseEnter = () => {
        gsap.to(card, {
          scale: 1.05,
          y: -2,
          duration: 0.2,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          duration: 0.2,
          ease: "power2.out"
        });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    });

    // Input focus effects
    const inputs = document.querySelectorAll('.simulation-input');
    inputs.forEach((input) => {
      if (input.dataset.focusInitialized) return;
      input.dataset.focusInitialized = 'true';
      
      const handleFocus = () => {
        gsap.to(input.parentElement, {
          scale: 1.02,
          duration: 0.2,
          ease: "power2.out"
        });
      };

      const handleBlur = () => {
        gsap.to(input.parentElement, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out"
        });
      };

      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);
    });
  };

  // Animate results when they appear
  useEffect(() => {
    if (results && resultsRef.current) {
      gsap.fromTo(resultsRef.current, {
        opacity: 0,
        y: 40,
        scale: 0.95
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out"
      });

      // Animate result cards
      const resultCards = resultsRef.current.querySelectorAll('.result-card');
      gsap.fromTo(resultCards, {
        opacity: 0,
        y: 30,
        scale: 0.95
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.4)",
        delay: 0.3
      });

      // Animate metrics with counting effect
      const metrics = resultsRef.current.querySelectorAll('.metric-value');
      metrics.forEach((metric) => {
        const finalValue = metric.textContent;
        const numericValue = parseFloat(finalValue.replace(/[^0-9.]/g, ''));
        
        if (!isNaN(numericValue)) {
          gsap.fromTo(metric, {
            textContent: 0
          }, {
            textContent: numericValue,
            duration: 1.5,
            ease: "power2.out",
            delay: 0.5,
            snap: { textContent: 0.1 },
            onUpdate: function() {
              const currentValue = this.targets()[0].textContent;
              if (finalValue.includes('T')) {
                metric.textContent = parseFloat(currentValue).toFixed(1) + 'T';
              } else if (finalValue.includes('B')) {
                metric.textContent = parseFloat(currentValue).toFixed(1) + 'B';
              } else if (finalValue.includes('M')) {
                metric.textContent = parseFloat(currentValue).toFixed(1) + 'M';
              } else if (finalValue.includes('K')) {
                metric.textContent = parseFloat(currentValue).toFixed(1) + 'K';
              } else {
                metric.textContent = Math.round(currentValue);
              }
            }
          });
        }
      });
    }
  }, [results]);

  // Validate inputs
  const validateInputs = () => {
    const errors = {};
    const size = parseFloat(asteroidParams.size);
    const velocity = parseFloat(asteroidParams.velocity);
    const density = parseFloat(asteroidParams.density);
    const angle = parseFloat(asteroidParams.angle);

    if (size < 1 || size > 10000) errors.size = "Size must be between 1-10,000 meters";
    if (velocity < 1 || velocity > 100) errors.velocity = "Velocity must be between 1-100 km/s";
    if (density < 0.1 || density > 10) errors.density = "Density must be between 0.1-10 g/cm³";
    if (angle < 0 || angle > 90) errors.angle = "Angle must be between 0-90 degrees";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSimulate = async () => {
    setSimulationError("");
    if (!validateInputs()) return;

    setIsLoading(true);
    setProgress(0);
    
    const progressSteps = [
      { step: 10, text: "Initializing parameters..." },
      { step: 25, text: "Calculating trajectory..." },
      { step: 45, text: "Modeling atmospheric entry..." },
      { step: 65, text: "Computing impact dynamics..." },
      { step: 85, text: "Analyzing damage patterns..." },
      { step: 95, text: "Finalizing results..." }
    ];

    let currentStepIndex = 0;
    
    const progressInterval = setInterval(() => {
      if (currentStepIndex < progressSteps.length) {
        const targetProgress = progressSteps[currentStepIndex].step;
        setProgress(targetProgress);
        currentStepIndex++;
      }
    }, 400);

    try {
      await new Promise(resolve => setTimeout(resolve, 2500));
      const simulationData = await simulateAsteroid(asteroidParams);
      setResults(simulationData);
      onSimulationStart?.(simulationData);
      setProgress(100);

      // Set simulation complete flag for MitigationStrategies
      localStorage.setItem("meteoric-simulation-complete", "true");
      window.dispatchEvent(new Event("simulation-complete"));
    } catch (error) {
      setSimulationError(error.message || "Simulation failed. Please try again.");
      console.error("Simulation failed:", error);
    } finally {
      clearInterval(progressInterval);
      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 500);
    }
  };

  useEffect(() => {
    onParamsChange?.({
      ...asteroidParams,
      asteroidSize: asteroidParams.size,
      approachAngle: asteroidParams.angle
    });
  }, [asteroidParams, onParamsChange]);

  const handleReset = () => {
    localStorage.removeItem("meteoric-simulation-complete");
    setResults(null);
    setProgress(0);
    setValidationErrors({});
    setSimulationError("");
    setAsteroidParams({
      size: "100",
      velocity: "20", 
      density: "2.5",
      composition: "rock",
      angle: "45"
    });

    // Animate reset
    if (resultsRef.current) {
      gsap.to(resultsRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in"
      });
    }
  };

  const getThreatLevel = (magnitude) => {
    if (magnitude < 6) return { level: "Low", color: "bg-mission-green", textColor: "text-mission-green" };
    if (magnitude < 7) return { level: "Moderate", color: "bg-plasma-orange", textColor: "text-plasma-orange" };
    return { level: "Critical", color: "bg-destructive", textColor: "text-destructive" };
  };

  const getCompositionInfo = (composition) => {
    const info = {
      rock: { emoji: "🪨", description: "Stony asteroid", density: "2.0-3.5 g/cm³", color: "text-stellar-cyan", survival: "High" },
      metal: { emoji: "⚙️", description: "Metallic asteroid", density: "7.0-8.0 g/cm³", color: "text-muted-foreground", survival: "Very High" },
      ice: { emoji: "🧊", description: "Icy comet", density: "0.5-1.0 g/cm³", color: "text-stellar-cyan", survival: "Low" },
      mixed: { emoji: "🌑", description: "Mixed composition", density: "2.0-5.0 g/cm³", color: "text-plasma-orange", survival: "Moderate" }
    };
    return info[composition] || info.rock;
  };

  const getSizeThreat = (size) => {
    const sizeNum = parseInt(size);
    if (sizeNum < 25) return { level: "Atmospheric Burnup", color: "text-mission-green", description: "Burns up in atmosphere", icon: "🔥" };
    if (sizeNum < 140) return { level: "Local Damage", color: "text-plasma-orange", description: "Localized destruction", icon: "🏘️" };
    if (sizeNum < 1000) return { level: "Regional Threat", color: "text-destructive", description: "City-level devastation", icon: "🏙️" };
    return { level: "Global Event", color: "text-destructive", description: "Mass extinction event", icon: "🌍" };
  };

  const getVelocityInfo = (velocity) => {
    const vel = parseFloat(velocity);
    if (vel < 15) return { category: "Slow", color: "text-mission-green", description: "Below average impact velocity" };
    if (vel < 25) return { category: "Typical", color: "text-stellar-cyan", description: "Average asteroid velocity" };
    if (vel < 35) return { category: "Fast", color: "text-plasma-orange", description: "High-speed impact" };
    return { category: "Extreme", color: "text-destructive", description: "Exceptional velocity" };
  };
 
  const handlePresetClick = (presetParams) => {
    setAsteroidParams(presetParams);
    // Animate the panel to indicate a change
    if (parametersPanelRef.current) {
        gsap.fromTo(parametersPanelRef.current, { scale: 1 }, { scale: 1.01, duration: 0.2, yoyo: true, repeat: 1 });
    }
  };

  useImperativeHandle(ref, () => ({
    startSimulation: handleSimulate
  }));

  return (
    <div 
      ref={containerRef}
      className={`w-full max-w-full space-y-4 sm:space-y-6 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Parameters Panel */}
      <Card ref={parametersPanelRef} className="simulation-card bg-card/60 border-border/50 backdrop-blur-sm shadow-command">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-quantum">
                <ShieldAlert className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg sm:text-xl text-quantum-blue">Threat Analysis</span>
              </div>
            </div>
            
            {/* Real-time Threat Level Badge */}
            {asteroidParams.size && (
              <Badge className={`${getSizeThreat(asteroidParams.size).color.replace('text-', 'bg-')} text-white px-3 py-1 text-xs flex-shrink-0 flex items-center space-x-1`}>
                <span>{getSizeThreat(asteroidParams.size).icon}</span>
                <span>{getSizeThreat(asteroidParams.size).level}</span>
              </Badge>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-0">
          <Separator className="my-4" />
          <div className="space-y-3">
            <Label className="flex items-center space-x-2">
                <List className="w-4 h-4 text-quantum-blue" />
                <span className="font-medium text-sm">Presets</span>
            </Label>
            <div className="grid gap-2">
              <div className="flex w-">
                <Dialog open={isPresetDialogOpen} onOpenChange={setIsPresetDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="group w-full h-14 text-[15px] font-semibold rounded-2xl border border-border/60 bg-muted/20 backdrop-blur-md shadow-sm 
                             hover:shadow-lg hover:border-quantum-blue/60 hover:bg-quantum-blue/10 hover:text-quantum-blue 
                             focus:ring-2 focus:ring-quantum-blue/50 focus:outline-none
                             transition-all duration-300 ease-out active:scale-[0.98]"
                      onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.04, y: -2, duration: 0.25, ease: "power2.out" })}
                      onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.25, ease: "power2.out" })}
                    >
                      <span className="truncate">Select a Preset Scenario</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[650px] bg-card/80 backdrop-blur-xl border-quantum-blue/30 shadow-command">
                    <DialogHeader>
                      <DialogTitle className="text-quantum-blue flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-quantum-blue/20">
                          <List className="w-5 h-5" />
                        </div>
                        <span>Preset Scenarios</span>
                      </DialogTitle>
                      <DialogDescription>
                        Select a well-known historical impact event to load its parameters into the simulator.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 gap-3 pt-4">
                      {presets.map((preset) => (
                        <div
                          key={preset.name}
                          className="interactive-button group flex cursor-pointer items-center justify-between rounded-lg p-4 bg-muted/20 border border-border/50 transition-all duration-300 hover:border-quantum-blue/50 hover:bg-quantum-blue/10"
                          onClick={() => {
                            handlePresetClick(preset.params);
                            setIsPresetDialogOpen(false);
                          }}
                          onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.03, x: 5, duration: 0.2 })}
                          onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, x: 0, duration: 0.2 })}
                        >
                          <div className="flex flex-col items-start">
                            <div className="font-semibold text-foreground transition-colors duration-300 group-hover:text-quantum-blue">{preset.name}</div>
                            <p className="text-xs text-muted-foreground font-normal whitespace-normal">{preset.description}</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-quantum-blue" />
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </CardContent>
        
          
          <CardContent className="space-y-4 sm:space-y-6">
            {/* Size Input with Slider */}
            <div className="form-field space-y-3">
              <Label htmlFor="size" className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1 sm:space-y-0">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-plasma-orange" />
                  <span className="font-medium text-sm">Diameter (meters)</span>
                </div>
              </Label>
              
              <div className="space-y-2">
                <Slider
                  value={[parseInt(asteroidParams.size)]}
                  onValueChange={(value) => setAsteroidParams(prev => ({ ...prev, size: value[0].toString() }))}
                  max={1000}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1m</span>
                  <span className="font-mono text-quantum-blue text-sm">{asteroidParams.size}m</span>
                  <span>1000m</span>
                </div>
              </div>
              
              <Input
                id="size"
                type="number"
                min="1"
                max="10000"
                value={asteroidParams.size}
                onChange={(e) => setAsteroidParams(prev => ({ ...prev, size: e.target.value }))}
                className={`simulation-input bg-background/50 border-border/50 focus:border-quantum-blue h-10 sm:h-11 ${validationErrors.size ? 'border-destructive' : ''}`}
                placeholder="Enter diameter"
              />
              
              {simulationError && (
            <div className="mt-2 text-sm text-destructive flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4" />
              <span>{simulationError}</span>
            </div>
          )}
              
              <div className="p-3 bg-muted/20 rounded-lg border border-border/30">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Impact Classification:</span>
                  <span className={`font-medium ${getSizeThreat(asteroidParams.size).color}`}>
                    {getSizeThreat(asteroidParams.size).description}
                  </span>
                </div>
              </div>
            </div>

            {/* Velocity Input with Indicator */}
            <div className="form-field space-y-3">
              <Label htmlFor="velocity" className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-stellar-cyan" />
                  <span className="font-medium text-sm">Velocity (km/s)</span>
                </div>
                <Badge variant="outline" className={`text-xs ${getVelocityInfo(asteroidParams.velocity).color.replace('text-', 'border-')} ${getVelocityInfo(asteroidParams.velocity).color}`}>
                  {getVelocityInfo(asteroidParams.velocity).category}
                </Badge>
              </Label>
              
              <div className="space-y-2">
                <Slider
                  value={[parseFloat(asteroidParams.velocity)]}
                  onValueChange={(value) => setAsteroidParams(prev => ({ ...prev, velocity: value[0].toString() }))}
                  max={50}
                  min={5}
                  step={0.5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>5 km/s</span>
                  <span className="font-mono text-stellar-cyan text-sm">{asteroidParams.velocity} km/s</span>
                  <span>50 km/s</span>
                </div>
              </div>
              
              <Input
                id="velocity"
                type="number"
                min="1"
                max="100"
                step="0.1"
                value={asteroidParams.velocity}
                onChange={(e) => setAsteroidParams(prev => ({ ...prev, velocity: e.target.value }))}
                className={`simulation-input bg-background/50 border-border/50 focus:border-stellar-cyan h-10 sm:h-11 ${validationErrors.velocity ? 'border-destructive' : ''}`}
                placeholder="Impact velocity"
              />
              
              {validationErrors.velocity && (
                <p className="text-xs text-destructive flex items-center space-x-1">
                  <AlertTriangle className="w-3 h-3" />
                  <span>{validationErrors.velocity}</span>
                </p>
              )}
            </div>

            {/* Density and Angle Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-field space-y-2">
                <Label htmlFor="density" className="flex items-center space-x-2">
                  <Gauge className="w-4 h-4 text-mission-green" />
                  <span className="font-medium text-sm">Density (g/cm³)</span>
                </Label>
                <Input
                  id="density"
                  type="number"
                  min="0.1"
                  max="10"
                  step="0.1"
                  value={asteroidParams.density}
                  onChange={(e) => setAsteroidParams(prev => ({ ...prev, density: e.target.value }))}
                  className={`simulation-input bg-background/50 border-border/50 focus:border-mission-green h-10 sm:h-11 ${validationErrors.density ? 'border-destructive' : ''}`}
                  placeholder="Material density"
                />
                {validationErrors.density && (
                  <p className="text-xs text-destructive">{validationErrors.density}</p>
                )}
              </div>

              <div className="form-field space-y-2">
                <Label htmlFor="angle" className="flex items-center space-x-2">
                  <Crosshair className="w-4 h-4 text-plasma-orange" />
                  <span className="font-medium text-sm">Entry Angle (°)</span>
                </Label>
                <Input
                  id="angle"
                  type="number"
                  min="0"
                  max="90"
                  value={asteroidParams.angle}
                  onChange={(e) => setAsteroidParams(prev => ({ ...prev, angle: e.target.value }))}
                  className={`simulation-input bg-background/50 border-border/50 focus:border-plasma-orange h-10 sm:h-11 ${validationErrors.angle ? 'border-destructive' : ''}`}
                  placeholder="Impact angle"
                />
                {validationErrors.angle && (
                  <p className="text-xs text-destructive">{validationErrors.angle}</p>
                )}
              </div>
            </div>

            {/* Enhanced Composition Select */}
            <div className="form-field space-y-3">
              <Label htmlFor="composition" className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-stellar-cyan" />
                <span className="font-medium text-sm">Composition</span>
              </Label>
              <Select 
                value={asteroidParams.composition} 
                onValueChange={(value) => setAsteroidParams(prev => ({ ...prev, composition: value }))}
              >
                <SelectTrigger className="bg-background/50 border-border/50 focus:border-stellar-cyan h-10 sm:h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card/95 backdrop-blur-xl border-border">
                  <SelectItem value="rock">
                    <div className="flex items-center space-x-2">
                      <span>🪨</span>
                      <span>Rocky Asteroid</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="metal">
                    <div className="flex items-center space-x-2">
                      <span>⚙️</span>
                      <span>Metallic Asteroid</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="ice">
                    <div className="flex items-center space-x-2">
                      <span>🧊</span>
                      <span>Icy Comet</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="mixed">
                    <div className="flex items-center space-x-2">
                      <span>🌑</span>
                      <span>Mixed Composition</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              
              {/* Enhanced Composition Info */}
              <div className="p-4 bg-muted/20 rounded-lg border border-border/30">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{getCompositionInfo(asteroidParams.composition).emoji}</div>
                  <div className="flex-1">
                    <div className="font-medium text-quantum-blue mb-1">
                      {getCompositionInfo(asteroidParams.composition).description}
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-muted-foreground">Density Range:</span>
                        <div className="font-medium">{getCompositionInfo(asteroidParams.composition).density}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Survival Rate:</span>
                        <div className="font-medium">{getCompositionInfo(asteroidParams.composition).survival}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <Button 
                onClick={handleSimulate} 
                disabled={isLoading || Object.keys(validationErrors).length > 0}
                className="interactive-button flex-1 bg-gradient-quantum hover:shadow-command h-10 sm:h-12"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-background border-t-transparent mr-2" />
                    <span className="hidden sm:inline">Analyzing...</span>
                    <span className="sm:hidden">Analyzing</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    <span className="hidden sm:inline">Run Simulation</span>
                    <span className="sm:hidden">Simulate</span>
                  </>
                )}
              </Button>
              
              <Button 
                onClick={handleReset} 
                variant="outline" 
                className="interactive-button border-border h-10 sm:h-12 px-4 sm:px-6"
                disabled={isLoading}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>

            {/* Enhanced Loading Progress */}
            {isLoading && (
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Computing impact dynamics...</span>
                  <span className="font-mono text-quantum-blue">{progress.toFixed(0)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Activity className="w-3 h-3 animate-pulse" />
                  <span>Running physics simulation engine</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

      {/* Enhanced Results Section */}
      {results && (
        <div ref={resultsRef} className="space-y-4 sm:space-y-6">
          {/* Impact Summary */}
          <Card className="result-card simulation-card bg-card/60 border-border/50 backdrop-blur-sm shadow-command">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-plasma-orange to-destructive">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg sm:text-xl text-plasma-orange">Impact Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              {/* Key Metrics with Animation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="metric-card text-center p-4 bg-quantum-blue/10 rounded-lg border border-quantum-blue/20">
                  <div className="metric-value text-2xl sm:text-3xl font-bold text-quantum-blue mb-1">
                    {(results.kineticEnergy / 1e15).toFixed(1)}
                  </div>
                  <div className="text-sm text-muted-foreground">Petajoules</div>
                  <div className="text-xs text-quantum-blue mt-1">Kinetic Energy</div>
                </div>
                
                <div className="metric-card text-center p-4 bg-plasma-orange/10 rounded-lg border border-plasma-orange/20">
                  <div className="metric-value text-2xl sm:text-3xl font-bold text-plasma-orange mb-1">
                    {results.craterSize.toFixed(0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Kilometers</div>
                  <div className="text-xs text-plasma-orange mt-1">Crater Diameter</div>
                </div>
              </div>

              {/* Enhanced Detailed Metrics */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-muted/20 rounded-lg space-y-2 sm:space-y-0">
                  <div className="flex items-center space-x-3">
                    <Activity className="w-5 h-5 text-destructive" />
                    <div>
                      <div className="font-medium">Seismic Magnitude</div>
                      <div className="text-xs text-muted-foreground">Richter scale equivalent</div>
                    </div>
                  </div>
                  <Badge className={`${getThreatLevel(results.earthquakeMagnitude).color} text-white px-3 py-1`}>
                    {results.earthquakeMagnitude.toFixed(1)} - {getThreatLevel(results.earthquakeMagnitude).level}
                  </Badge>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-muted/20 rounded-lg space-y-2 sm:space-y-0">
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-stellar-cyan" />
                    <div>
                      <div className="font-medium">Tsunami Risk</div>
                      <div className="text-xs text-muted-foreground">Ocean impact potential</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-stellar-cyan text-stellar-cyan px-3 py-1">
                    {results.tsunamiRisk}
                  </Badge>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-muted/20 rounded-lg space-y-2 sm:space-y-0">
                  <div className="flex items-center space-x-3">
                    <Target className="w-5 h-5 text-mission-green" />
                    <div>
                      <div className="font-medium">Impact Location</div>
                      <div className="text-xs text-muted-foreground">Geographic region</div>
                    </div>
                  </div>
                  <span className="font-medium text-foreground px-3 py-1">
                    {results.impactLocation.region}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-muted/20 rounded-lg space-y-2 sm:space-y-0">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-plasma-orange" />
                    <div>
                      <div className="font-medium">Time to Impact</div>
                      <div className="text-xs text-muted-foreground">Detection to impact</div>
                    </div>
                  </div>
                  <Badge className="bg-plasma-orange/20 text-plasma-orange px-3 py-1" variant="outline">
                    {results.impactLocation.warningTime || 'Hours to days'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

         
        </div>
      )}
    </div>
  );
});

SimulationPanel.propTypes = {
  onSimulationComplete: PropTypes.func,
  onParamsChange: PropTypes.func
};

SimulationPanel.displayName = "SimulationPanel";

export default SimulationPanel;