import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Play, 
  Trophy, 
  Target, 
  Clock, 
  Star,
  Zap,
  Shield,
  AlertTriangle,
  CheckCircle,
  RotateCcw,
  Award,
  Users,
  Flame,
  Activity,
  Settings,
  Rocket,
  Info,
  Sun,
  Satellite,
  SatelliteDish,
  Orbit,
  Sparkles,
  Dices,
} from "lucide-react";
import { getRandomScenario, getGameScenarios, testMitigation } from "@/services/api.js";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const GameMode = () => {
  const [scenarios, setScenarios] = useState([]);
  const [loadingRandom, setLoadingRandom] = useState(false);
  const [gameState, setGameState] = useState({
    scenario: null,
    isPlaying: false,
    timeRemaining: 0,
    score: 0,
    completedObjectives: [],
    selectedStrategy: null,
    missionStatus: 'pending'
  });
  const [selectedTab, setSelectedTab] = useState("scenarios");
  const [isLoaded, setIsLoaded] = useState(false);
  const [animatedScores, setAnimatedScores] = useState(new Set());
  const [testingStrategy, setTestingStrategy] = useState(false);

  // Animation refs
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const tabsRef = useRef(null);
  const scenariosGridRef = useRef(null);
  const missionControlRef = useRef(null);
  const strategyPanelRef = useRef(null);
  const leaderboardRef = useRef(null);

  useEffect(() => {
    loadScenarios();
    initializeAnimations();
  }, []);

  // Initialize animations
  const initializeAnimations = () => {
    const timer = setTimeout(() => {
      setIsLoaded(true);

      // Header animation
      if (headerRef.current) {
        gsap.fromTo(headerRef.current.children, {
          opacity: 0,
          y: 30
        }, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          delay: 0.2
        });
      }

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

      // Add interactive effects
      setTimeout(addInteractiveEffects, 600);
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  };

  // Interactive hover effects
  const addInteractiveEffects = () => {
    // Scenario card hover effects
    const scenarioCards = document.querySelectorAll('.scenario-card');
    scenarioCards.forEach((card) => {
      if (card.dataset.hoverInitialized) return;
      card.dataset.hoverInitialized = 'true';
      
      const icon = card.querySelector('.scenario-icon');
      const playButton = card.querySelector('.play-button');
      
      const handleMouseEnter = () => {
        gsap.to(card, {
          scale: 1.02,
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
        if (playButton) {
          gsap.to(playButton, {
            scale: 1.05,
            duration: 0.2,
            ease: "power2.out"
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
        if (playButton) {
          gsap.to(playButton, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out"
          });
        }
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    });

    // Strategy button hover effects
    const strategyButtons = document.querySelectorAll('.strategy-button');
    strategyButtons.forEach((button) => {
      if (button.dataset.hoverInitialized) return;
      button.dataset.hoverInitialized = 'true';
      
      const handleMouseEnter = () => {
        if (!button.disabled) {
          gsap.to(button, {
            scale: 1.05,
            y: -2,
            duration: 0.2,
            ease: "power2.out"
          });
        }
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

    // Leaderboard item hover effects
    const leaderboardItems = document.querySelectorAll('.leaderboard-item');
    leaderboardItems.forEach((item) => {
      if (item.dataset.hoverInitialized) return;
      item.dataset.hoverInitialized = 'true';
      
      const handleMouseEnter = () => {
        gsap.to(item, {
          scale: 1.02,
          x: 5,
          duration: 0.2,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(item, {
          scale: 1,
          x: 0,
          duration: 0.2,
          ease: "power2.out"
        });
      };

      item.addEventListener('mouseenter', handleMouseEnter);
      item.addEventListener('mouseleave', handleMouseLeave);
    });
  };

  // Animate tab content when switching
  useEffect(() => {
    const animateTabContent = () => {
      let contentRef = null;
      
      switch (selectedTab) {
        case "scenarios":
          contentRef = scenariosGridRef.current;
          break;
        case "mission":
          contentRef = missionControlRef.current;
          break;
        case "leaderboard":
          contentRef = leaderboardRef.current;
          break;
        default:
          return;
      }

      if (contentRef) {
        gsap.fromTo(contentRef, {
          opacity: 0,
          y: 20
        }, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        });

        // Animate child elements based on tab
        if (selectedTab === "scenarios") {
          const scenarioCards = contentRef.querySelectorAll('.scenario-card');
          gsap.fromTo(scenarioCards, {
            opacity: 0,
            y: 30,
            scale: 0.95
          }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.2
          });
        } else if (selectedTab === "leaderboard") {
          const leaderboardItems = contentRef.querySelectorAll('.leaderboard-item');
          gsap.fromTo(leaderboardItems, {
            opacity: 0,
            x: -20
          }, {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.2
          });
        }
      }
    };

    if (isLoaded) {
      animateTabContent();
      setTimeout(addInteractiveEffects, 300);
    }
  }, [selectedTab, isLoaded]);

  // Animate mission control elements
  useEffect(() => {
    if (gameState.scenario && missionControlRef.current) {
      const controlElements = missionControlRef.current.querySelectorAll('.mission-element');
      gsap.fromTo(controlElements, {
        opacity: 0,
        y: 20,
        scale: 0.95
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.4)"
      });
    }
  }, [gameState.scenario]);

  // Animate strategy panel
  useEffect(() => {
    if (gameState.isPlaying && strategyPanelRef.current) {
      const strategies = strategyPanelRef.current.querySelectorAll('.strategy-button');
      gsap.fromTo(strategies, {
        opacity: 0,
        scale: 0.8,
        y: 20
      }, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.4)",
        delay: 0.3
      });
    }
  }, [gameState.isPlaying]);

  // Animate score changes
  useEffect(() => {
    if (gameState.score > 0 && !animatedScores.has(gameState.score)) {
      const scoreElement = document.querySelector('.score-display');
      if (scoreElement) {
        gsap.fromTo(scoreElement, {
          scale: 1
        }, {
          scale: 1.2,
          duration: 0.2,
          ease: "power2.out",
          yoyo: true,
          repeat: 1
        });
        
        setAnimatedScores(prev => new Set([...prev, gameState.score]));
      }
    }
  }, [gameState.score, animatedScores]);

  // Animate mission status changes
  useEffect(() => {
    if (gameState.missionStatus !== 'pending') {
      const statusElement = document.querySelector('.mission-status');
      if (statusElement) {
        gsap.fromTo(statusElement, {
          opacity: 0,
          scale: 0.8,
          y: 20
        }, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: "back.out(1.4)"
        });
      }
    }
  }, [gameState.missionStatus]);

  // Pulse effect for critical timer
  useEffect(() => {
    if (gameState.timeRemaining < 30 && gameState.timeRemaining > 0) {
      const timerElement = document.querySelector('.critical-timer');
      if (timerElement) {
        gsap.to(timerElement, {
          scale: 1.1,
          duration: 0.5,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1
        });
      }
    }
  }, [gameState.timeRemaining]);

  // Game timer
  useEffect(() => {
    let interval;
    
    if (gameState.isPlaying && gameState.timeRemaining > 0) {
      interval = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        }));
      }, 1000);
    } else if (gameState.isPlaying && gameState.timeRemaining === 0) {
      handleTimeUp();
    }

    return () => clearInterval(interval);
  }, [gameState.isPlaying, gameState.timeRemaining]);

  const loadScenarios = async () => {
    try {
      const scenarioData = await getGameScenarios();
      setScenarios(scenarioData);
    } catch (error) {
      console.error("Failed to load scenarios:", error);
    }
  };

  const addRandomScenario = async () => {
    setLoadingRandom(true);
    try {
      const randomScenarios = await getRandomScenario();
      setScenarios(randomScenarios);
    } catch (err) {
      console.log("Error fetching random scenarios:", err);
    } finally {
      setLoadingRandom(false);
    }
  };

  const startScenario = (scenario) => {
    setGameState({
      scenario,
      isPlaying: true,
      timeRemaining: scenario.timeLimit * 60, // Convert minutes to seconds
      score: 0,
      completedObjectives: [],
      selectedStrategy: null,
      missionStatus: 'pending'
    });
    setSelectedTab("mission");
    setAnimatedScores(new Set());
  };

  const selectStrategy = (strategy) => {
    if (!gameState.isPlaying || testingStrategy) return;

    setGameState(prev => ({ ...prev, selectedStrategy: strategy }));
    
    // Animate strategy selection
    const selectedButton = document.querySelector(`[data-strategy="${strategy}"]`);
    if (selectedButton) {
      gsap.to(selectedButton, {
        scale: 1.1,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    }
    
    // Call backend API to test strategy
    setTimeout(() => {
      executeStrategy(strategy);
    }, 1000);
  };

  const executeStrategy = async (strategy) => {
    if (!gameState.scenario) return;

    setTestingStrategy(true);
    
    try {
      const { asteroid } = gameState.scenario;
      
      // Call backend API with asteroid parameters
      const result = await testMitigation(strategy, {
        size: asteroid.size,
        velocity: asteroid.velocity,
        density: asteroid.density || 2.5,
        composition: asteroid.composition || 'rock'
      });

      console.log('Backend result:', result);

      // Calculate score based on backend result
      let baseScore = 0;
      if (result.successProbability >= 0.8) {
        baseScore = 2000;
      } else if (result.successProbability >= 0.6) {
        baseScore = 1500;
      } else if (result.successProbability >= 0.4) {
        baseScore = 1000;
      } else if (result.successProbability >= 0.2) {
        baseScore = 500;
      } else {
        baseScore = 200;
      }

      // Time bonus
      const timeBonus = Math.floor(gameState.timeRemaining / 10) * 50;
      const totalScore = baseScore + timeBonus;

      // Determine success based on probability
      const success = result.success && result.successProbability >= 0.5;

      // Determine completed objectives based on success
      let objectivesCompleted = [];
      if (success) {
        // Complete objectives based on score
        if (totalScore >= 2000) {
          objectivesCompleted = gameState.scenario.objectives;
        } else if (totalScore >= 1500) {
          objectivesCompleted = gameState.scenario.objectives.slice(0, 2);
        } else {
          objectivesCompleted = [gameState.scenario.objectives[0]];
        }
      }

      setGameState(prev => ({
        ...prev,
        score: prev.score + totalScore,
        completedObjectives: [...prev.completedObjectives, ...objectivesCompleted],
        missionStatus: success ? 'success' : 'failure',
        isPlaying: false
      }));

    } catch (error) {
      console.error('Strategy execution failed:', error);
      // Fallback to failure if API call fails
      setGameState(prev => ({
        ...prev,
        score: prev.score + 100,
        missionStatus: 'failure',
        isPlaying: false
      }));
    } finally {
      setTestingStrategy(false);
    }
  };

  const handleTimeUp = () => {
    setGameState(prev => ({
      ...prev,
      missionStatus: 'failure',
      isPlaying: false
    }));
  };

  const resetGame = () => {
    // Animate reset
    const missionElements = document.querySelectorAll('.mission-element');
    gsap.to(missionElements, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setGameState({
          scenario: null,
          isPlaying: false,
          timeRemaining: 0,
          score: 0,
          completedObjectives: [],
          selectedStrategy: null,
          missionStatus: 'pending'
        });
        setSelectedTab("scenarios");
        setAnimatedScores(new Set());
      }
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-mission-green';
      case 'medium': return 'bg-plasma-orange';
      case 'hard': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return Shield;
      case 'medium': return Target;
      case 'hard': return Flame;
      default: return Star;
    }
  };

  const getRiskColor = (risk) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'text-mission-green';
      case 'medium': return 'text-plasma-orange';
      case 'high': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getScoreRating = (score) => {
    if (score >= 2000) return { rating: "Legendary", color: "text-quantum-blue", icon: Star };
    if (score >= 1500) return { rating: "Expert", color: "text-stellar-cyan", icon: Award };
    if (score >= 1000) return { rating: "Skilled", color: "text-mission-green", icon: Trophy };
    if (score >= 500) return { rating: "Novice", color: "text-plasma-orange", icon: Target };
    return { rating: "Trainee", color: "text-muted-foreground", icon: Shield };
  };

  return (
    <section 
      id="gamified" 
      ref={sectionRef}
      className={`px-4 sm:px-6 lg:px-8 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="max-w-7xl mx-auto">
        <div ref={tabsRef}>
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4 sm:space-y-6">
            <TabsList className="tabs-list grid w-full grid-cols-3 bg-card/60 border-border/50 backdrop-blur-sm h-auto p-1">
              <TabsTrigger 
                value="scenarios" 
                className="data-[state=active]:bg-gradient-quantum data-[state=active]:text-white text-xs sm:text-sm p-2 sm:p-3 h-10 sm:h-12"
              >
                <Rocket className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Scenarios</span>
                <span className="sm:hidden">Play</span>
              </TabsTrigger>
              <TabsTrigger 
                value="mission" 
                className="data-[state=active]:bg-gradient-quantum data-[state=active]:text-white text-xs sm:text-sm p-2 sm:p-3 h-10 sm:h-12" 
                disabled={!gameState.scenario}
              >
                <Activity className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Mission</span>
                <span className="sm:hidden">Game</span>
              </TabsTrigger>
              <TabsTrigger 
                value="leaderboard" 
                className="data-[state=active]:bg-gradient-quantum data-[state=active]:text-white text-xs sm:text-sm p-2 sm:p-3 h-10 sm:h-12"
              >
                <Trophy className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Leaderboard</span>
                <span className="sm:hidden">Ranks</span>
              </TabsTrigger>
            </TabsList>

            {/* Scenarios Tab */}
            <TabsContent value="scenarios">
              {/* Enhanced Random Scenario Button */}
              <Card className="mb-8 bg-gradient-to-br from-card/80 to-quantum-blue/5 border border-quantum-blue/30 backdrop-blur-xl shadow-command hover:shadow-glow transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-4 rounded-2xl bg-gradient-quantum shadow-glow">
                        <Dices className={`w-8 h-8 text-white ${loadingRandom ? 'animate-spin' : ''}`} />
                      </div>
                      <div className="text-left">
                        <h3 className="text-xl font-bold text-quantum-blue mb-1 flex items-center gap-2">
                          NASA Random Scenario Generator
                          <Sparkles className="w-5 h-5 text-stellar-cyan animate-pulse" />
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Get real near-Earth asteroid data from NASA database for authentic missions
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={addRandomScenario}
                      disabled={loadingRandom}
                      size="lg"
                      className="bg-gradient-quantum hover:shadow-glow transition-all duration-300 px-8 py-6 text-base font-semibold min-w-[200px] disabled:opacity-70"
                    >
                      {loadingRandom ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-background border-t-transparent mr-3" />
                          <span>Loading NASA Data...</span>
                        </>
                      ) : (
                        <>
                          <Dices className="w-5 h-5 mr-3" />
                          <span>Generate Scenario</span>
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div ref={scenariosGridRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {scenarios.map((scenario) => {
                  const DifficultyIcon = getDifficultyIcon(scenario.difficulty);
                  
                  return (
                    <Card 
                      key={scenario.id} 
                      className="scenario-card bg-card/60 border-border/50 backdrop-blur-sm shadow-command hover:shadow-glow transition-all duration-300 group"
                    >
                      <CardHeader className="pb-3 sm:pb-4">
                        <CardTitle className="flex flex-col space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="scenario-icon p-2 rounded-lg bg-gradient-quantum">
                                <DifficultyIcon className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <span className="text-lg font-bold text-quantum-blue">{scenario.name}</span>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {scenario.timeLimit} minute challenge
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Badge className={`${getDifficultyColor(scenario.difficulty)} text-white text-xs px-2 py-1`}>
                              {scenario.difficulty.toUpperCase()}
                            </Badge>
                            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span>{scenario.timeLimit}min</span>
                            </div>
                          </div>
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="p-3 bg-muted/20 rounded-lg border border-border/30">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {scenario.description}
                          </p>
                        </div>

                        {/* Asteroid Threat Info */}
                        <div className="p-4 bg-quantum-blue/10 rounded-lg border border-quantum-blue/20">
                          <h4 className="text-sm font-semibold mb-3 flex items-center text-quantum-blue">
                            <Target className="w-4 h-4 mr-2" />
                            Threat: {scenario.asteroid.name}
                          </h4>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div className="text-center p-2 bg-background/50 rounded border border-border/30">
                              <div className="text-lg font-bold text-quantum-blue">{scenario.asteroid.size}m</div>
                              <div className="text-xs text-muted-foreground">Diameter</div>
                            </div>
                            <div className="text-center p-2 bg-background/50 rounded border border-border/30">
                              <div className="text-lg font-bold text-plasma-orange">{scenario.asteroid.velocity}km/s</div>
                              <div className="text-xs text-muted-foreground">Velocity</div>
                            </div>
                          </div>

                          <div className="mt-3 flex items-center justify-between">
                            <div>
                              <span className="text-xs text-muted-foreground">Type: </span>
                              <span className="text-xs font-medium capitalize text-stellar-cyan">{scenario.asteroid.composition}</span>
                            </div>
                            <div>
                              <span className="text-xs text-muted-foreground">Risk: </span>
                              <span className={`text-xs font-bold capitalize ${getRiskColor(scenario.asteroid.riskLevel)}`}>
                                {scenario.asteroid.riskLevel}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Mission Objectives */}
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold flex items-center text-quantum-blue">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mission Objectives
                          </h4>
                          <div className="space-y-1">
                            {scenario.objectives.slice(0, 3).map((objective, objIndex) => (
                              <div key={objIndex} className="flex items-start space-x-2 text-xs">
                                <span className="text-stellar-cyan mt-0.5">•</span>
                                <span className="text-muted-foreground">{objective}</span>
                              </div>
                            ))}
                            {scenario.objectives.length > 3 && (
                              <div className="text-xs text-muted-foreground pl-4">
                                +{scenario.objectives.length - 3} more objectives...
                              </div>
                            )}
                          </div>
                        </div>

                        <Separator className="my-4" />

                        <Button
                          onClick={() => startScenario(scenario)}
                          className="play-button w-full bg-gradient-quantum hover:shadow-command transition-all duration-300 h-10 sm:h-12 group-hover:scale-105"
                        >
                          <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                          <span className="hidden sm:inline">Start Mission</span>
                          <span className="sm:hidden">Start</span>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* Mission Tab */}
            <TabsContent value="mission">
              {gameState.scenario ? (
                <div ref={missionControlRef} className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                  {/* Mission Control Panel */}
                  <Card className="mission-element lg:col-span-1 bg-card/60 border-border/50 backdrop-blur-sm shadow-command">
                    <CardHeader className="pb-3 sm:pb-4">
                      <CardTitle className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-gradient-quantum">
                          <Settings className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-lg text-quantum-blue">Mission Control</span>
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4 sm:space-y-6">
                      {/* Scenario Info */}
                      <div className="mission-element p-3 bg-muted/20 rounded-lg border border-border/30">
                        <h3 className="text-lg font-bold text-quantum-blue mb-2">{gameState.scenario.name}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {gameState.scenario.description}
                        </p>
                      </div>

                      {/* Critical Timer */}
                      <div className="mission-element space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-plasma-orange" />
                            <span>Time Remaining</span>
                          </span>
                          <span className={`critical-timer font-mono font-bold text-xl ${
                            gameState.timeRemaining < 30 ? 'text-destructive animate-pulse' : 
                            gameState.timeRemaining < 60 ? 'text-plasma-orange' : 'text-quantum-blue'
                          }`}>
                            {formatTime(gameState.timeRemaining)}
                          </span>
                        </div>
                        <Progress 
                          value={(gameState.timeRemaining / (gameState.scenario.timeLimit * 60)) * 100}
                          className="h-3"
                        />
                        {gameState.timeRemaining < 30 && (
                          <div className="text-xs text-destructive font-medium animate-pulse flex items-center space-x-2">
                            <AlertTriangle className="w-4 h-4" />
                            <span>Critical time remaining!</span>
                          </div>
                        )}
                      </div>

                      {/* Score Display */}
                      <div className="mission-element text-center p-4 bg-gradient-to-r from-quantum-blue/10 to-stellar-cyan/10 rounded-lg border border-quantum-blue/20">
                        <div className="score-display text-3xl font-bold text-quantum-blue mb-1">{gameState.score}</div>
                        <div className="text-sm text-muted-foreground">Mission Score</div>
                        <Badge className={`mt-2 ${getScoreRating(gameState.score).color.replace('text-', 'bg-')} text-white`}>
                          {getScoreRating(gameState.score).rating}
                        </Badge>
                      </div>

                      {/* Mission Objectives */}
                      <div className="mission-element space-y-3">
                        <h4 className="text-sm font-semibold text-quantum-blue flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mission Objectives
                        </h4>
                        <div className="space-y-2">
                          {gameState.scenario.objectives.map((objective, objIndex) => {
                            const isCompleted = gameState.completedObjectives.includes(objective);
                            return (
                              <div 
                                key={objIndex} 
                                className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-300 ${
                                  isCompleted ? 'bg-mission-green/10 border border-mission-green/20' : 'bg-muted/10 border border-border/30'
                                }`}
                              >
                                {isCompleted ? (
                                  <CheckCircle className="w-4 h-4 text-mission-green flex-shrink-0" />
                                ) : (
                                  <div className="w-4 h-4 rounded-full border-2 border-muted-foreground flex-shrink-0" />
                                )}
                                <span className={`text-sm ${
                                  isCompleted ? 'text-mission-green line-through' : 'text-muted-foreground'
                                }`}>
                                  {objective}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Mission Status */}
                      {gameState.missionStatus !== 'pending' && (
                        <div className={`mission-status mission-element p-4 rounded-lg border ${
                          gameState.missionStatus === 'success' 
                            ? 'border-mission-green/50 bg-mission-green/10' 
                            : 'border-destructive/50 bg-destructive/10'
                        }`}>
                          <div className="flex items-center space-x-3">
                            {gameState.missionStatus === 'success' ? (
                              <CheckCircle className="w-6 h-6 text-mission-green" />
                            ) : (
                              <AlertTriangle className="w-6 h-6 text-destructive" />
                            )}
                            <div>
                              <div className={`font-bold ${
                                gameState.missionStatus === 'success' ? 'text-mission-green' : 'text-destructive'
                              }`}>
                                {gameState.missionStatus === 'success' ? 'Mission Successful!' : 'Mission Failed!'}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {gameState.missionStatus === 'success' 
                                  ? 'Earth has been saved from the asteroid threat!'
                                  : 'The asteroid impact could not be prevented.'}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <Separator className="my-4" />

                      {/* Action Buttons */}
                      <Button
                        onClick={resetGame}
                        variant="outline"
                        className="w-full bg-gradient-quantum hover:shadow-command hover:scale-105 transition-all duration-300 h-10 sm:h-12 px-4 sm:px-6 font-semibold"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        New Mission
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Strategy Selection - IMPROVED LAYOUT */}
                  <Card className="mission-element lg:col-span-2 bg-card/60 border-border/50 backdrop-blur-sm shadow-command">
                    <CardHeader className="pb-3 sm:pb-4">
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-lg bg-gradient-quantum">
                            <Shield className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-lg text-quantum-blue">Defense Strategy Arsenal</span>
                        </div>
                        {gameState.isPlaying && (
                          <Badge variant="outline" className="border-stellar-cyan/30 text-stellar-cyan animate-pulse">
                            <Activity className="w-3 h-3 mr-1" />
                            7 Strategies Available
                          </Badge>
                        )}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="p-4 sm:p-6">
                      {gameState.isPlaying ? (
                        <div ref={strategyPanelRef} className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
                          {[
                            {
                              id: 'kinetic_impactor',
                              name: 'Kinetic Impactor',
                              icon: Rocket,
                              effectiveness: 'High for small',
                              time: 'Quick',
                              cost: 'Moderate',
                              color: 'text-plasma-orange',
                              gradientColor: 'from-plasma-orange to-stellar-cyan'
                            },
                            {
                              id: 'gravity_tractor',
                              name: 'Gravity Tractor',
                              icon: Orbit,
                              effectiveness: 'Gentle & precise',
                              time: 'Long',
                              cost: 'High fuel',
                              color: 'text-stellar-cyan',
                              gradientColor: 'from-stellar-cyan to-quantum-blue'
                            },
                            {
                              id: 'nuclear_deflection',
                              name: 'Nuclear',
                              icon: Zap,
                              effectiveness: 'Max power',
                              time: 'Fast',
                              cost: 'Very expensive',
                              color: 'text-destructive',
                              gradientColor: 'from-destructive to-plasma-orange'
                            },
                            {
                              id: 'laser_ablation',
                              name: 'Laser Ablation',
                              icon: Satellite,
                              effectiveness: 'Precise',
                              time: 'Long',
                              cost: 'High energy',
                              color: 'text-stellar-cyan',
                              gradientColor: 'from-stellar-cyan to-plasma-orange'
                            },
                            {
                              id: 'mass_driver',
                              name: 'Mass Driver',
                              icon: SatelliteDish,
                              effectiveness: 'Self-sustaining',
                              time: 'Very long',
                              cost: 'Complex',
                              color: 'text-muted-foreground',
                              gradientColor: 'from-muted-foreground to-stellar-cyan'
                            },
                            {
                              id: 'solar_concentrator',
                              name: 'Solar Mirror',
                              icon: Sun,
                              effectiveness: 'Solar powered',
                              time: 'Extended',
                              cost: 'Large mirrors',
                              color: 'text-yellow-400',
                              gradientColor: 'from-yellow-400 to-stellar-cyan'
                            },
                            {
                              id: 'ion_beam_shepherd',
                              name: 'Ion Beam',
                              icon: Zap,
                              effectiveness: 'Gradual push',
                              time: 'Moderate',
                              cost: 'Advanced',
                              color: 'text-quantum-blue',
                              gradientColor: 'from-quantum-blue to-mission-green'
                            }
                          ].map((strategy) => {
                            const Icon = strategy.icon;
                            const isSelected = gameState.selectedStrategy === strategy.id;
                            
                            return (
                              <Button
                                key={strategy.id}
                                data-strategy={strategy.id}
                                onClick={() => selectStrategy(strategy.id)}
                                disabled={!!gameState.selectedStrategy || gameState.missionStatus !== 'pending' || testingStrategy}
                                className={`strategy-button h-auto p-4 flex flex-col items-center justify-start space-y-3 transition-all duration-300 ${
                                  isSelected 
                                    ? 'bg-gradient-quantum shadow-glow scale-105 ring-2 ring-quantum-blue' 
                                    : 'bg-muted/20 hover:bg-muted/40 text-foreground hover:scale-105 border border-border/50 hover:shadow-command font-semibold hover:text-white'
                                }`}
                                variant={isSelected ? "default" : "outline"}
                              >
                                <div className={`p-3 rounded-xl ${isSelected ? 'bg-white/20' : `bg-gradient-to-br ${strategy.gradientColor}`} shadow-lg`}>
                                  <Icon className={`w-7 h-7 ${isSelected ? 'text-white' : 'text-white'}`} />
                                </div>
                                
                                <div className="text-center space-y-2 w-full">
                                  <div className="font-bold text-sm leading-tight">{strategy.name}</div>
                                  <div className="text-xs space-y-1 opacity-90">
                                    <div className="flex items-center justify-center space-x-1">
                                      <Star className="w-3 h-3 flex-shrink-0" />
                                      <span className="truncate text-xs">{strategy.effectiveness}</span>
                                    </div>
                                    <div className="flex items-center justify-center space-x-1">
                                      <Clock className="w-3 h-3 flex-shrink-0" />
                                      <span className="truncate text-xs">{strategy.time}</span>
                                    </div>
                                    <div className="flex items-center justify-center space-x-1">
                                      <Info className="w-3 h-3 flex-shrink-0" />
                                      <span className="truncate text-xs">{strategy.cost}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                {isSelected && (
                                  <Badge className="bg-white/20 text-white text-xs border-0 mt-2">
                                    {testingStrategy ? (
                                      <>
                                        <div className="animate-spin rounded-full h-3 w-3 border-2 border-white border-t-transparent mr-1" />
                                        Testing...
                                      </>
                                    ) : (
                                      <>
                                        <CheckCircle className="w-3 h-3 mr-1" />
                                        Selected
                                      </>
                                    )}
                                  </Badge>
                                )}
                              </Button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-center py-8 sm:py-12">
                          <div className="p-4 rounded-full bg-gradient-quantum w-fit mx-auto mb-6">
                            <Star className="w-12 h-12 sm:w-20 sm:h-20 text-white animate-pulse" />
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-quantum-blue mb-3">
                            {gameState.missionStatus === 'success' ? 'Mission Accomplished!' : 
                             gameState.missionStatus === 'failure' ? 'Mission Failed' : 
                             'Mission Complete'}
                          </h3>
                          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                            {gameState.missionStatus === 'success' ? 
                              'You successfully defended Earth from the asteroid threat!' :
                              'The asteroid impact could not be prevented. Try again with a different strategy.'}
                          </p>
                          
                          {gameState.missionStatus !== 'pending' && (
                            <div className="max-w-md mx-auto p-6 bg-muted/20 rounded-lg border border-border/50">
                              <div className="text-center mb-4">
                                <div className="text-4xl font-bold text-quantum-blue mb-2">
                                  {gameState.score}
                                </div>
                                <div className="text-sm text-muted-foreground mb-3">
                                  Final Score
                                </div>
                                <Badge className={`${getScoreRating(gameState.score).color.replace('text-', 'bg-')} text-white px-4 py-2`}>
                                  {getScoreRating(gameState.score).rating} Performance
                                </Badge>
                              </div>
                              
                              <div className="text-center">
                                <div className="text-sm text-muted-foreground">
                                  Objectives: {gameState.completedObjectives.length}/{gameState.scenario.objectives.length}
                                </div>
                                <Progress 
                                  value={(gameState.completedObjectives.length / gameState.scenario.objectives.length) * 100} 
                                  className="h-2 mt-2"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card className="bg-card/60 border-border/50 backdrop-blur-sm shadow-command">
                  <CardContent className="p-8 sm:p-12 text-center">
                    <div className="p-4 rounded-full bg-gradient-quantum w-fit mx-auto mb-6">
                      <Shield className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-quantum-blue mb-2">No Active Mission</h3>
                    <p className="text-muted-foreground mb-6">
                      Select a scenario from the Scenarios tab to begin your planetary defense mission.
                    </p>
                    <Button 
                      onClick={() => setSelectedTab("scenarios")}
                      className="bg-gradient-quantum hover:shadow-command"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Choose Scenario
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Leaderboard Tab */}
            <TabsContent value="leaderboard">
              <Card ref={leaderboardRef} className="bg-card/60 border-border/50 backdrop-blur-sm shadow-command">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-gradient-quantum">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg text-quantum-blue">Global Leaderboard</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Mock leaderboard data */}
                  {[
                    { rank: 1, name: "AsteroidHunter", score: 2850, missions: 12, icon: "🏆", color: "text-yellow-400" },
                    { rank: 2, name: "PlanetDefender", score: 2640, missions: 15, icon: "🥈", color: "text-gray-400" },
                    { rank: 3, name: "CosmicGuardian", score: 2420, missions: 8, icon: "🥉", color: "text-amber-600" },
                    { rank: 4, name: "SpaceVigilant", score: 2180, missions: 11, icon: "🌟", color: "text-quantum-blue" },
                    { rank: 5, name: "EarthProtector", score: 1950, missions: 9, icon: "🛡️", color: "text-mission-green" }
                  ].map((player) => (
                    <div key={player.rank} className="leaderboard-item flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border/30 hover:bg-muted/30 transition-all duration-300 hover:shadow-glow">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-2xl mb-1">{player.icon}</div>
                          <div className="text-xs text-muted-foreground">#{player.rank}</div>
                        </div>
                        <div>
                          <div className={`font-bold ${player.color}`}>{player.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {player.missions} missions completed
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-quantum-blue">{player.score.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">points</div>
                      </div>
                    </div>
                  ))}
                  
                  <Separator className="my-6" />
                  
                  <div className="text-center p-6 bg-gradient-to-r from-quantum-blue/10 to-stellar-cyan/10 rounded-lg border border-quantum-blue/20">
                    <div className="p-3 rounded-full bg-gradient-quantum w-fit mx-auto mb-4">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-bold text-quantum-blue mb-2">Join the Challenge!</h4>
                    <div className="text-sm text-muted-foreground">
                      Complete missions to earn points and climb the global rankings. 
                      Defend Earth and become a legendary planetary defender!
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default GameMode;