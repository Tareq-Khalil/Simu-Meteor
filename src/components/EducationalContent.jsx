import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Telescope,
  Shield,
  ChevronRight,
  Lightbulb,
  Calculator,
  Info,
  Atom,
  PlayCircle,
  GraduationCap,
  Target,
  Activity,
  Rocket,
  ExternalLink,
  Sun,
  Thermometer,
  Wind,
  Cloud,
  Sparkles,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getEducationalContent } from "../services/api.js";

gsap.registerPlugin(ScrollTrigger);

const EducationalContent = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoaded, setIsLoaded] = useState(false);
  const [educationalSections, setEducationalSections] = useState([]);
  const [loadingContent, setLoadingContent] = useState(true);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const tabsRef = useRef(null);
  const overviewGridRef = useRef(null);
  const topicNavRef = useRef(null);
  const contentDisplayRef = useRef(null);
  const featuresRef = useRef(null);

  // --- STATIC SECTIONS FOR TABS (unchanged) ---
  const staticSections = {
    science: {
      title: "Asteroid Science",
      icon: Telescope,
      color: "text-stellar-cyan",
      gradient: "from-stellar-cyan to-quantum-blue",
      bgColor: "bg-stellar-cyan/10",
      borderColor: "border-stellar-cyan/20",
      topics: [
        {
          id: "composition",
          title: "Asteroid Composition",
          level: "Beginner",
          estimatedTime: "5 min read",
          content: `Asteroids are rocky, metallic, or icy remnants left over from the early formation of our solar system about 4.6 billion years ago.

**Main Asteroid Types:**

• **C-type (Carbonaceous)**: Dark, carbon-rich asteroids
  - Most common type (~75% of known asteroids)
  - Low reflectivity (albedo 3-9%)
  - Rich in water and organic compounds
  - Examples: Ceres, Mathilde

• **S-type (Silicaceous)**: Stony asteroids  
  - Silicon and nickel-iron composition (~17%)
  - Moderate reflectivity (albedo 10-22%)
  - Common in inner asteroid belt
  - Examples: Itokawa, Eros

• **M-type (Metallic)**: Metal-rich asteroids
  - Mostly nickel-iron composition (~8%)
  - High reflectivity and density
  - Potentially valuable for space mining
  - Examples: Psyche, Kleopatra

**Impact on Earth Defense:**
The composition directly affects impact dynamics. Metallic asteroids are denser and cause more damage per unit size, while icy asteroids may fragment more easily in Earth's atmosphere, potentially reducing surface damage but creating atmospheric effects.`,
          keyFacts: [
            "Over 1.3 million asteroids larger than 1km have been catalogued",
            "Most asteroids orbit in the Main Belt between Mars and Jupiter",
            "Asteroid 16 Psyche contains enough metals to be worth $10,000 quadrillion",
            "C-type asteroids may contain up to 20% water by mass"
          ],
          applications: [
            "Understanding composition helps predict deflection effectiveness",
            "Material properties affect fragmentation during atmospheric entry",
            "Composition analysis guides space mining mission planning"
          ]
        },
        {
          id: "orbits",
          title: "Orbital Mechanics",
          level: "Intermediate",
          estimatedTime: "8 min read",
          content: `Asteroid orbits follow Kepler's laws of planetary motion, discovered in the early 1600s. Understanding these principles is crucial for predicting impact trajectories and planning deflection missions.

**Kepler's Three Laws:**

1. **Law of Ellipses**: Asteroid orbits are elliptical with the Sun at one focus
2. **Law of Equal Areas**: Asteroids sweep equal areas in equal time periods
3. **Harmonic Law**: Orbital period squared is proportional to semi-major axis cubed

**Key Orbital Elements:**

• **Semi-major axis (a)**: Defines the size of the orbit
• **Eccentricity (e)**: How elliptical the orbit is (0 = circle, 1 = parabola)
• **Inclination (i)**: Tilt relative to Earth's orbital plane
• **Argument of periapsis (ω)**: Orientation of closest approach
• **Longitude of ascending node (Ω)**: Where orbit crosses Earth's plane
• **Mean anomaly (M)**: Position of asteroid in its orbit at a given time

**Near-Earth Asteroid Classifications:**

• **Apollo asteroids**: Cross Earth's orbit (semi-major axis > 1 AU)
• **Aten asteroids**: Orbits mostly inside Earth's (semi-major axis < 1 AU)  
• **Amor asteroids**: Approach but don't cross Earth's orbit
• **Atira asteroids**: Orbits entirely inside Earth's orbit

**Potentially Hazardous Objects (PHOs)** are asteroids larger than 140m that come within 0.05 AU (7.5 million km) of Earth's orbit - about 19.5 times the distance to the Moon.`,
          keyFacts: [
            "Over 31,000 near-Earth asteroids have been discovered",
            "About 2,300 are classified as Potentially Hazardous Objects",
            "The closest approach ever recorded was 2020 VT4 at just 370 km altitude",
            "Orbital periods of near-Earth asteroids range from 0.3 to 4+ years"
          ],
          applications: [
            "Precise orbit determination enables impact prediction decades in advance",
            "Orbital mechanics calculations guide spacecraft trajectory planning",
            "Understanding resonances helps predict long-term orbital evolution"
          ]
        },
        {
          id: "discovery",
          title: "Discovery & Tracking",
          level: "Beginner",
          estimatedTime: "6 min read",
          content: `Modern asteroid discovery relies on sophisticated ground and space-based telescopes that continuously survey the sky for moving objects.

**Discovery Timeline:**
• **1801**: First asteroid Ceres discovered by Giuseppe Piazzi
• **1930s**: Photographic surveys begin systematic search
• **1990s**: Digital CCD cameras revolutionize detection
• **2000s**: Dedicated NEO survey programs established
• **2010s**: Space-based infrared telescopes deployed
• **2020s**: AI and machine learning accelerate discovery

**Major Survey Programs:**

• **LINEAR (US)**: Discovers ~65% of near-Earth asteroids
• **NEOWISE (Space)**: Infrared detection and size/composition characterization  
• **Catalina Sky Survey (US)**: High-productivity ground survey
• **ATLAS (Hawaii)**: Early warning system for imminent impactors
• **ESA Space Situational Awareness**: European detection network

**Detection Challenges:**
• Asteroids reflect only 3-20% of sunlight (very dark)
• Most dangerous ones approach from Sun's direction
• Small asteroids detected only hours before potential impact
• Atmospheric interference affects ground-based observations
• Need multiple observations to confirm orbital trajectory

**Future Detection Systems:**
• **NEO Surveyor (2028)**: Dedicated space-based infrared telescope
• **Rubin Observatory (2025)**: Revolutionary ground-based survey capability
• **Enhanced radar systems**: Better characterization of discovered objects`,
          keyFacts: [
            "New near-Earth asteroids are discovered almost daily",
            "Current discovery rate: ~3,000 new NEAs per year",
            "It takes 3+ observations over several days to confirm an orbit",
            "NEOWISE has characterized sizes of 1,000+ near-Earth asteroids"
          ],
          applications: [
            "Early detection enables deflection mission planning",
            "Continuous tracking refines impact probability calculations",
            "Characterization data informs mitigation strategy selection"
          ]
        }
      ]
    },
    physics: {
      title: "Impact Physics",
      icon: Atom,
      color: "text-plasma-orange",
      gradient: "from-plasma-orange to-destructive",
      bgColor: "bg-plasma-orange/10",
      borderColor: "border-plasma-orange/20",
      topics: [
        {
          id: "energy",
          title: "Kinetic Energy & Impact",
          level: "Advanced",
          estimatedTime: "10 min read",
          content: `The devastating effects of asteroid impacts come from the enormous kinetic energy released during collision with Earth.

**Fundamental Energy Equation:**
**KE = ½mv²**

Where:
• m = mass of asteroid (kg)
• v = impact velocity (m/s)
• KE = kinetic energy (Joules)

**Critical Relationships:**

1. **Velocity Dominance**: Energy increases with the **square** of velocity
   - A 20 km/s asteroid has 4× more energy than a 10 km/s asteroid of same size
   - Typical Earth impact velocities: 11-72 km/s

2. **Mass Scaling**: Proportional to volume (and thus diameter cubed)
   - A 200m asteroid has 8× more mass than a 100m asteroid
   - Mass also depends on density (varies 2-8 g/cm³)

3. **Impact Angle Effects**: Steeper angles deliver more energy to ground
   - 90° (vertical): Maximum energy transfer to surface
   - 45°: Optimal angle for crater formation
   - <30°: Significant atmospheric interaction, potential ricochet

**Energy Release Mechanisms:**

• **Shock Wave Formation**: Instantaneous compression creates high-pressure waves
• **Excavation**: Material ejected from crater at supersonic speeds  
• **Vaporization**: Extreme temperatures vaporize impactor and target rock
• **Seismic Energy**: Ground motion propagates as earthquake waves
• **Thermal Radiation**: Intense heat pulse ignites fires over vast areas

**Crater Formation Process:**
1. **Contact & Compression** (microseconds): Initial shock wave formation
2. **Excavation** (seconds): Material ejected, transient crater formed  
3. **Modification** (minutes): Crater walls collapse, central peak rebounds
4. **Final Crater**: Stable structure with diameter 10-20× impactor size

**Scaling Laws:**
• Simple craters: <2-4 km diameter (depending on gravity/target)
• Complex craters: Central peaks, terraced walls, multiple rings
• Multi-ring basins: >200 km diameter, multiple concentric rings`,
          keyFacts: [
            "Chicxulub impactor (66 Mya) released energy equivalent to 100 million megatons TNT",
            "A 1 km asteroid impact releases energy of 100,000 Hiroshima bombs",
            "Impact velocities on Earth range from 11 km/s (minimum) to 72 km/s (maximum)",
            "Ocean impacts can generate tsunamis with waves >100m high"
          ],
          applications: [
            "Energy calculations predict crater size and damage radius",
            "Velocity analysis helps determine optimal deflection strategies",
            "Understanding scaling laws guides planetary defense planning"
          ]
        },
        {
          id: "atmosphere",
          title: "Atmospheric Entry Effects",
          level: "Intermediate",
          estimatedTime: "7 min read",
          content: `Earth's atmosphere provides our first line of defense against smaller asteroids through heating, ablation, and fragmentation processes.

**Atmospheric Entry Physics:**

**1. Initial Contact (~120 km altitude)**
• Atmospheric pressure: 10⁻⁷ Earth surface pressure
• Initial heating begins due to compression
• Meteor trail becomes visible

**2. Ablation Phase (80-40 km altitude)**
• Surface material vaporizes and strips away
• Creates bright fireball visible for hundreds of km
• Mass loss rate proportional to velocity³

**3. Fragmentation (40-20 km altitude)**
• Thermal and aerodynamic stresses exceed material strength
• Asteroid breaks into multiple fragments
• Each fragment creates its own trail

**4. Terminal Explosion/Airburst**
• Rapid fragmentation releases remaining kinetic energy
• Creates powerful atmospheric blast wave
• Can cause significant ground damage without surface impact

**Size-Dependent Outcomes:**

• **<1m**: Complete atmospheric burnup, harmless meteors
• **1-25m**: Mostly destroyed, small fragments may survive
  - Example: Chelyabinsk meteor (2013, ~20m) - airburst at 30 km
• **25-140m**: Partial survival, regional damage possible
  - Example: Tunguska event (1908, ~60m) - airburst flattened 2,000 km²
• **140m-1km**: Survive to impact, cause regional devastation
• **>1km**: Minimal atmospheric effect, global consequences

**Material Strength Effects:**
• **Weak (rubble pile)**: Fragments easily, multiple airbursts
• **Moderate (fractured rock)**: Breaks apart at 20-40 km altitude  
• **Strong (solid metal)**: Survives to lower altitudes, ground impact likely

**Atmospheric Protection Statistics:**
• Earth's atmosphere intercepts ~15,000 tons of meteoric material annually
• >99% burns up completely before reaching the surface
• Atmosphere effectively shields against objects <25m diameter`,
          keyFacts: [
            "Earth's atmosphere stops approximately 40 meteors per day >1 meter in size",
            "The Chelyabinsk meteor injured 1,500 people despite exploding 30 km up",
            "Atmospheric entry heating can reach temperatures >3,000°C",
            "Strong metallic asteroids are 10× more likely to survive atmospheric entry"
          ],
          applications: [
            "Atmospheric modeling predicts airburst altitudes and ground effects",
            "Understanding fragmentation helps assess casualty risks",
            "Entry physics guide early warning system development"
          ]
        }
      ]
    },
    defense: {
      title: "Planetary Defense",
      icon: Shield,
      color: "text-mission-green",
      gradient: "from-mission-green to-stellar-cyan",
      bgColor: "bg-mission-green/10",
      borderColor: "border-mission-green/20",
      topics: [
        {
          id: "detection",
          title: "Detection & Tracking Systems",
          level: "Beginner",
          estimatedTime: "6 min read",
          content: `Early detection forms humanity's first and most critical line of defense against asteroid threats. Modern detection systems combine ground-based telescopes with space-based assets to continuously monitor the skies.

**Ground-Based Detection Systems:**

• **LINEAR (Lincoln Near-Earth Asteroid Research)**
  - Location: New Mexico, USA
  - Discovers ~65% of all near-Earth asteroids
  - Uses 1-meter telescope with sensitive CCD cameras
  - Automated detection software processes thousands of images nightly

• **Catalina Sky Survey**
  - Location: Arizona, USA  
  - Most productive NEO discovery program
  - Multiple telescopes scanning large sky areas
  - Responsible for >45% of new NEO discoveries

• **ATLAS (Asteroid Terrestrial-impact Last Alert System)**
  - Hawaii-based early warning network
  - Designed to detect city-killer asteroids weeks before impact
  - Can spot 140m asteroids 3 weeks out, 40m objects 1 week out

**Space-Based Assets:**

• **NEOWISE Mission**
  - Infrared space telescope in polar orbit
  - Detects asteroid thermal emissions, not just reflected light
  - Can determine size and composition
  - Has characterized 1,000+ near-Earth asteroids

**Detection Challenges:**

• **Brightness**: Asteroids reflect only 3-20% of sunlight
• **Solar Blind Spot**: Most dangerous asteroids approach from Sun's direction
• **Size vs Distance**: Small nearby objects vs large distant ones
• **Orbital Uncertainty**: Need multiple observations over weeks to confirm trajectory
• **Weather**: Ground-based telescopes affected by atmospheric conditions

**Next-Generation Systems:**

• **NEO Surveyor (Launch 2028)**
  - Dedicated space-based infrared telescope
  - Will discover 2/3 of remaining undiscovered NEOs >140m
  - Better size and composition characterization

• **Rubin Observatory (First Light 2025)**
  - 8.4-meter ground-based telescope in Chile
  - Will image entire visible sky every 3 nights
  - Expected to discover millions of new objects`,
          keyFacts: [
            "Over 90% of potentially hazardous asteroids >1 km have been found",
            "Only ~40% of potentially hazardous asteroids >140m have been discovered",
            "New near-Earth asteroids are discovered at a rate of ~8 per day",
            "It takes a minimum of 3 observations over several days to confirm an orbit"
          ],
          applications: [
            "Early detection enables decades of advance warning for deflection missions",
            "Continuous tracking refines impact probability predictions",
            "Characterization data informs optimal mitigation strategy selection"
          ]
        },
        {
          id: "deflection",
          title: "Deflection Technologies",
          level: "Advanced",
          estimatedTime: "12 min read",
          content: `Multiple proven and experimental technologies exist to deflect threatening asteroids, each optimized for different scenarios and asteroid characteristics.

**1. Kinetic Impactor Technology**

**Principle**: High-speed spacecraft collision transfers momentum to change asteroid velocity

**DART Mission Success (2022)**:
• Target: Dimorphos (160m moonlet of asteroid Didymos)
• Impact velocity: 6.14 km/s
• Result: Changed orbital period by 32 minutes (11.5× minimum success threshold)
• Proved kinetic impactor concept at realistic scale

**Advantages**:
• Proven technology with successful demonstration
• Relatively simple and cost-effective
• Immediate effect - no long mission duration required
• Precise targeting possible with modern guidance systems

**Limitations**:
• Single-use system
• Effectiveness decreases with asteroid size
• Creates debris cloud that could pose secondary hazard
• Requires early detection (minimum 5-10 years warning)

**Optimal Scenarios**: Small to medium asteroids (50-500m), 5+ years warning time

**2. Gravity Tractor Technology**

**Principle**: Spacecraft hovers near asteroid, using gravitational attraction to slowly pull it off course

**Technical Implementation**:
• Station-keeping near asteroid using ion propulsion
• Gravitational force proportional to spacecraft mass
• Deflection accumulates over months to decades
• Can "fine-tune" deflection with extreme precision

**Advantages**:
• No contact required - works on any asteroid composition
• Highly controllable - can stop/reverse deflection if needed
• No debris creation
• Can be combined with other methods

**Limitations**:
• Extremely slow - requires decades of warning time
• Massive fuel requirements for long-duration missions
• Complex navigation and station-keeping
• Spacecraft mass severely limits deflection capability

**Optimal Scenarios**: Small asteroids with 20+ years warning, precision trajectory adjustments

**3. Nuclear Deflection Technology**

**Principle**: Nuclear explosion near (not on) asteroid surface vaporizes material, creating thrust

**Technical Approach**:
• Detonate nuclear device 100-1000m from asteroid surface
• X-ray radiation instantly vaporizes surface material
• Expanding vapor cloud provides deflection impulse
• Standoff distance prevents fragmentation

**Advantages**:
• Highest energy density available to humanity
• Effective against largest asteroids (>1 km)
• Rapid deployment possible
• Scalable yield (kiloton to megaton range)

**Limitations**:
• Risk of fragmenting asteroid into multiple threats
• Complex international legal and political challenges
• Radiation effects on spacecraft systems
• Public perception and safety concerns

**Optimal Scenarios**: Large asteroids (>500m), short warning times (<5 years), last resort

**4. Experimental Concepts**

**Ion Beam Shepherd**:
• Spacecraft uses focused ion beam to gradually push asteroid
• Extremely precise control possible
• Very slow but highly accurate

**Solar Concentrator**:
• Large mirror focuses sunlight to vaporize asteroid surface
• Uses solar energy instead of nuclear
• Requires very long mission duration

**Mass Driver**:
• Robotic system mines asteroid material and ejects it as propellant
• Self-sustaining deflection over years
• Complex technology requiring asteroid landing

**Deflection Scaling Laws**:
• Deflection ∝ (delivered energy) / (asteroid mass)
• Earlier intervention requires exponentially less energy
• Velocity change of 1 cm/s applied 10 years before impact = 1000 km miss distance`,
          keyFacts: [
            "DART changed Dimorphos orbit by 32 minutes with 6.14 km/s impact",
            "A 1 cm/s velocity change 10 years before impact results in 1000 km miss distance",
            "Nuclear deflection could handle asteroids up to several kilometers in diameter",
            "Gravity tractor requires 10-100× more spacecraft mass than kinetic impactor"
          ],
          applications: [
            "Strategy selection depends on asteroid size, composition, and warning time",
            "Multiple techniques may be combined for maximum effectiveness",
            "Backup plans essential given mission failure possibilities"
          ]
        }
      ]
    }
  };

  // --- END STATIC SECTIONS ---

  // Animation & GSAP useEffects (unchanged)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      if (headerRef.current) {
        gsap.fromTo(headerRef.current.children, {
          opacity: 0, y: 30
        }, {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out", delay: 0.2
        });
      }
      if (tabsRef.current) {
        ScrollTrigger.create({
          trigger: tabsRef.current,
          start: "top 90%",
          onEnter: () => {
            gsap.fromTo(tabsRef.current.querySelector('.tabs-list'), {
              opacity: 0, scale: 0.95
            }, {
              opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.4)"
            });
          },
          once: true
        });
      }
      setTimeout(addInteractiveEffects, 600);
    }, 100);
    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addInteractiveEffects = () => {
    const educationCards = document.querySelectorAll('.education-card');
    educationCards.forEach((card) => {
      if (card.dataset.hoverInitialized) return;
      card.dataset.hoverInitialized = 'true';
      const icon = card.querySelector('.education-icon');
      const exploreButton = card.querySelector('.explore-button');
      const handleMouseEnter = () => {
        gsap.to(card, { scale: 1.02, y: -8, duration: 0.3, ease: "power2.out" });
        if (icon) {
          gsap.to(icon, { scale: 1.1, rotation: 5, duration: 0.3, ease: "back.out(1.7)" });
        }
        if (exploreButton) {
          gsap.to(exploreButton, { scale: 1.05, duration: 0.2, ease: "power2.out" });
        }
      };
      const handleMouseLeave = () => {
        gsap.to(card, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" });
        if (icon) {
          gsap.to(icon, { scale: 1, rotation: 0, duration: 0.3, ease: "power2.out" });
        }
        if (exploreButton) {
          gsap.to(exploreButton, { scale: 1, duration: 0.2, ease: "power2.out" });
        }
      };
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    });
  };

  useEffect(() => {
    if (selectedTopic && contentDisplayRef.current) {
      gsap.fromTo(contentDisplayRef.current, {
        opacity: 0, y: 30, scale: 0.98
      }, {
        opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out"
      });
      const contentSections = contentDisplayRef.current.querySelectorAll('.content-section');
      gsap.fromTo(contentSections, {
        opacity: 0, y: 20
      }, {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out", delay: 0.2
      });
    }
  }, [selectedTopic]);

  useEffect(() => {
    setLoadingContent(true);
    getEducationalContent()
      .then(data => {
        setEducationalSections(data);
        setLoadingContent(false);
      })
      .catch(() => setLoadingContent(false));
  }, []);

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-mission-green/90 hover:bg-mission-green';
      case 'Intermediate': return 'bg-plasma-orange/90 hover:bg-plasma-orange';
      case 'Advanced': return 'bg-destructive/90 hover:bg-destructive';
      default: return 'bg-muted';
    }
  };

  const getLevelIcon = (level) => {
    switch (level) {
      case 'Beginner': return '🟢';
      case 'Intermediate': return '🟡';
      case 'Advanced': return '🔴';
      default: return '⚪';
    }
  };

  const handleExploreSection = (sectionKey) => {
    setActiveTab(sectionKey);
    const firstTopic = staticSections[sectionKey].topics[0];
    if (firstTopic) setSelectedTopic(firstTopic.id);
  };

  const handleTopicSelect = (topicId) => {
    setSelectedTopic(topicId);
  };

  if (loadingContent) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-stellar-cyan/30 border-t-stellar-cyan rounded-full animate-spin" />
          <Sparkles className="w-6 h-6 text-stellar-cyan absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>
        <span className="text-lg font-medium text-foreground animate-pulse">Loading Educational Content...</span>
      </div>
    );
  }

  return (
    <section
      id="education"
      ref={sectionRef}
      className={`px-4 sm:px-6 lg:px-8 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="max-w-7xl mx-auto">    
        <div ref={tabsRef}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            {/* Enhanced Tab Navigation */}
            <TabsList className="tabs-list grid w-full grid-cols-2 lg:grid-cols-4 bg-card/80 border border-border/50 backdrop-blur-xl rounded-xl h-auto p-2 gap-2 shadow-command">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-gradient-quantum data-[state=active]:text-white data-[state=active]:shadow-glow text-sm font-medium p-3 h-14 rounded-lg transition-all duration-300"
              >
                <GraduationCap className="w-5 h-5 mr-2" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger 
                value="science" 
                className="data-[state=active]:bg-gradient-quantum data-[state=active]:text-white data-[state=active]:shadow-glow text-sm font-medium p-3 h-14 rounded-lg transition-all duration-300"
              >
                <Telescope className="w-5 h-5 mr-2" />
                <span>Science</span>
              </TabsTrigger>
              <TabsTrigger 
                value="physics" 
                className="data-[state=active]:bg-gradient-quantum data-[state=active]:text-white data-[state=active]:shadow-glow text-sm font-medium p-3 h-14 rounded-lg transition-all duration-300"
              >
                <Atom className="w-5 h-5 mr-2" />
                <span>Physics</span>
              </TabsTrigger>
              <TabsTrigger 
                value="defense" 
                className="data-[state=active]:bg-gradient-quantum data-[state=active]:text-white data-[state=active]:shadow-glow text-sm font-medium p-3 h-14 rounded-lg transition-all duration-300"
              >
                <Shield className="w-5 h-5 mr-2" />
                <span>Defense</span>
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab - Enhanced Grid Layout */}
            <TabsContent value="overview" className="space-y-10">
              {/* Dynamic Content Cards */}
              <div
                ref={overviewGridRef}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {educationalSections.slice(0, 3).map((section, idx) => {
                  if (section.type === "image") {
                    return (
                      <Card key={`apod${idx}`} className="education-card bg-card/80 border border-stellar-cyan/30 shadow-command hover:shadow-glow transition-all duration-300 backdrop-blur-sm group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-stellar-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <CardHeader className="pb-4 relative z-10">
                          <CardTitle className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-stellar-cyan/10 border border-stellar-cyan/30">
                              <Telescope className="w-5 h-5 text-stellar-cyan" />
                            </div>
                            <span className="font-bold text-lg text-foreground">{section.title}</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 relative z-10">
                          <div className="relative rounded-xl overflow-hidden border-2 border-stellar-cyan/20 group-hover:border-stellar-cyan/40 transition-colors duration-300">
                            <img 
                              src={section.imageUrl} 
                              alt={section.titleText} 
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <h3 className="font-bold text-base text-foreground line-clamp-2">{section.titleText}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-4 leading-relaxed">
                            {section.explanation}
                          </p>
                          <div className="flex items-center justify-between pt-2">
                            <Badge className="bg-plasma-orange/90 text-white border-0 shadow-sm">
                              {section.date}
                            </Badge>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-stellar-cyan hover:text-stellar-cyan hover:bg-stellar-cyan/10"
                              onClick={() => window.open('https://apod.nasa.gov/apod/', '_blank')}
                            >
                              <ExternalLink className="w-4 h-4 mr-2" /> 
                              View Full
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  }
                  
                  if (section.type === "facts") {
                    return (
                      <Card key={`facts${idx}`} className="education-card bg-card/80 border border-plasma-orange/30 shadow-command hover:shadow-glow transition-all duration-300 backdrop-blur-sm group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-plasma-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <CardHeader className="pb-4 relative z-10">
                          <CardTitle className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-plasma-orange/10 border border-plasma-orange/30">
                              <Atom className="w-5 h-5 text-plasma-orange" />
                            </div>
                            <span className="font-bold text-lg text-foreground">{section.title}</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 relative z-10">
                          {section.facts.slice(0, 3).map((fact, i) => (
                            <div 
                              key={i} 
                              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                                fact.hazardous 
                                  ? 'bg-destructive/10 border-destructive/30 hover:border-destructive/50 hover:bg-destructive/15' 
                                  : 'bg-muted/30 border-border/30 hover:border-border/50 hover:bg-muted/40'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold text-sm text-foreground truncate flex-1">
                                  {fact.name}
                                </span>
                                {fact.hazardous && (
                                  <Badge className="bg-destructive/90 text-white border-0 shadow-sm ml-2">
                                    Hazardous
                                  </Badge>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Thermometer className="w-3 h-3" />
                                  <strong>{fact.diameter}m</strong>
                                </span>
                                <span className="flex items-center gap-1">
                                  <Wind className="w-3 h-3" />
                                  <strong>{fact.velocity}km/s</strong>
                                </span>
                                <span className="flex items-center gap-1">
                                  <Badge variant="outline" className="text-xs border-border/30">
                                    {fact.approachDate}
                                  </Badge>
                                </span>
                              </div>
                            </div>
                          ))}
                          <Separator className="my-4" />
                          <Button 
                            className="w-full bg-gradient-quantum hover:shadow-glow transition-all duration-300"
                            onClick={() => window.open("https://cneos.jpl.nasa.gov/ca/", "_blank")}
                          >
                            <PlayCircle className="w-4 h-4 mr-2" /> 
                            Try Simulation
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  }
                  
                  if (section.type === "weather") {
                    return (
                      <Card key={`mars${idx}`} className="education-card bg-gradient-to-br from-card/80 to-mission-green/5 border border-mission-green/30 shadow-command hover:shadow-glow transition-all duration-300 backdrop-blur-sm group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-mission-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <CardHeader className="pb-4 relative z-10">
                          <CardTitle className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-mission-green/10 border border-mission-green/30">
                              <Cloud className="w-5 h-5 text-mission-green" />
                            </div>
                            <span className="font-bold text-lg text-foreground">{section.title}</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 relative z-10">
                          <div className="text-center py-4">
                            <div className="text-6xl mb-3 animate-pulse">🪐</div>
                            <div className="text-xl font-bold text-foreground mb-1">
                              Sol {section.sol}
                            </div>
                            <div className="text-sm text-muted-foreground capitalize">
                              {section.season && `${section.season} Season`}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg border border-border/30">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-muted-foreground text-xs">
                                <Thermometer className="w-4 h-4" />
                                <span>Temperature</span>
                              </div>
                              <div className="font-semibold text-sm text-foreground">{section.temperature}</div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-muted-foreground text-xs">
                                <Wind className="w-4 h-4" />
                                <span>Pressure</span>
                              </div>
                              <div className="font-semibold text-sm text-foreground">{section.pressure}</div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-muted-foreground text-xs">
                                <Sun className="w-4 h-4" />
                                <span>Sunrise</span>
                              </div>
                              <div className="font-semibold text-sm text-foreground">{section.sunrise}</div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-muted-foreground text-xs">
                                <Sun className="w-4 h-4" />
                                <span>Sunset</span>
                              </div>
                              <div className="font-semibold text-sm text-foreground">{section.sunset}</div>
                            </div>
                          </div>

                          <Button
                            className="w-full bg-gradient-quantum hover:shadow-glow transition-all duration-300"
                            onClick={() => window.open('https://mars.nasa.gov/insight/weather/', '_blank')}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" /> 
                            NASA Mars Weather
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  }
                  return null;
                })}

                {/* Static Category Cards */}
                {Object.entries(staticSections).map(([key, section]) => {
                  const Icon = section.icon;
                  return (
                    <Card 
                      key={key} 
                      className="education-card bg-card/80 border border-border/50 shadow-command hover:shadow-glow transition-all duration-300 backdrop-blur-sm group overflow-hidden"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                      <CardHeader className="pb-4 relative z-10">
                        <CardTitle className="flex items-center gap-3">
                          <div className={`education-icon p-3 rounded-xl bg-gradient-to-br ${section.gradient} shadow-lg`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <span className="font-bold text-lg text-foreground">{section.title}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 relative z-10">
                        <div className="space-y-2">
                          {section.topics.map((topic) => (
                            <div 
                              key={topic.id} 
                              className="flex items-center justify-between p-3 bg-muted/20 hover:bg-muted/40 rounded-lg border border-border/30 hover:border-border/50 transition-all duration-300"
                            >
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                <BookOpen className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                <span className="text-sm font-medium text-foreground truncate">
                                  {topic.title}
                                </span>
                              </div>
                              <Badge className={`${getLevelColor(topic.level)} text-white border-0 shadow-sm flex-shrink-0 ml-2`}>
                                {getLevelIcon(topic.level)}
                              </Badge>
                            </div>
                          ))}
                        </div>
                        
                        <Separator className="my-4" />
                        
                        <Button
                          className="explore-button w-full bg-gradient-quantum hover:shadow-glow transition-all duration-300 group-hover:scale-[1.02]"
                          onClick={() => handleExploreSection(key)}
                        >
                          Explore Topics
                          <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Enhanced Learning Features Section */}
              <Card className="bg-card/80 border border-border/50 backdrop-blur-xl shadow-command">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-gradient-quantum shadow-lg">
                      <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl text-quantum-blue">Learning Features</span>
                  </CardTitle>
                </CardHeader>
                <CardContent ref={featuresRef}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="feature-card p-6 bg-gradient-to-br from-stellar-cyan/10 to-transparent rounded-xl border-2 border-stellar-cyan/20 hover:border-stellar-cyan/40 transition-all duration-300 group">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-stellar-cyan/10">
                          <Target className="w-6 h-6 text-stellar-cyan" />
                        </div>
                        <h4 className="font-bold text-lg text-stellar-cyan">Interactive Content</h4>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Engage with comprehensive materials covering asteroid detection,
                        orbital mechanics, and impact physics with real-world examples.
                      </p>
                    </div>
                    
                    <div className="feature-card p-6 bg-gradient-to-br from-plasma-orange/10 to-transparent rounded-xl border-2 border-plasma-orange/20 hover:border-plasma-orange/40 transition-all duration-300 group">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-plasma-orange/10">
                          <Activity className="w-6 h-6 text-plasma-orange" />
                        </div>
                        <h4 className="font-bold text-lg text-plasma-orange">Progressive Learning</h4>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Topics are organized by difficulty level from beginner to advanced,
                        allowing you to build knowledge systematically.
                      </p>
                    </div>
                    
                    <div className="feature-card p-6 bg-gradient-to-br from-mission-green/10 to-transparent rounded-xl border-2 border-mission-green/20 hover:border-mission-green/40 transition-all duration-300 group">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-mission-green/10">
                          <Rocket className="w-6 h-6 text-mission-green" />
                        </div>
                        <h4 className="font-bold text-lg text-mission-green">Practical Applications</h4>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Learn how scientific principles apply to real planetary defense
                        missions and current space agency initiatives.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Quick Facts Section */}
              <Card className="bg-card/80 border border-border/50 backdrop-blur-xl shadow-command">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-gradient-quantum shadow-lg">
                      <Info className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl text-quantum-blue">Did You Know?</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-gradient-to-br from-stellar-cyan/10 to-transparent rounded-xl border-2 border-stellar-cyan/20 hover:border-stellar-cyan/40 transition-all duration-300 group">
                      <div className="text-4xl font-bold text-stellar-cyan mb-3 group-hover:scale-110 transition-transform">
                        31,000+
                      </div>
                      <div className="text-base font-semibold text-foreground mb-2">
                        Near-Earth Asteroids Discovered
                      </div>
                      <div className="text-sm text-muted-foreground leading-relaxed">
                        NASA automated systems discover about 3,000 new objects annually
                      </div>
                    </div>
                    
                    <div className="text-center p-6 bg-gradient-to-br from-plasma-orange/10 to-transparent rounded-xl border-2 border-plasma-orange/20 hover:border-plasma-orange/40 transition-all duration-300 group">
                      <div className="text-4xl font-bold text-plasma-orange mb-3 group-hover:scale-110 transition-transform">
                        66 MYA
                      </div>
                      <div className="text-base font-semibold text-foreground mb-2">
                        Chicxulub Impact Event
                      </div>
                      <div className="text-sm text-muted-foreground leading-relaxed">
                        Created 180km crater, ending the age of dinosaurs and reshaping evolution
                      </div>
                    </div>
                    
                    <div className="text-center p-6 bg-gradient-to-br from-mission-green/10 to-transparent rounded-xl border-2 border-mission-green/20 hover:border-mission-green/40 transition-all duration-300 group">
                      <div className="text-4xl font-bold text-mission-green mb-3 group-hover:scale-110 transition-transform">
                        2026
                      </div>
                      <div className="text-base font-semibold text-foreground mb-2">
                        Hera Mission Arrival
                      </div>
                      <div className="text-sm text-muted-foreground leading-relaxed">
                        ESA follow-up mission to study the DART impact site and validate deflection models
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Individual Section Tabs: Science, Physics, Defense */}
            {Object.entries(staticSections).map(([key, section]) => (
              <TabsContent key={key} value={key} className="space-y-6">
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                  {/* Enhanced Topic Navigation */}
                  <Card 
                    ref={topicNavRef} 
                    className="xl:col-span-1 bg-card/80 border border-border/50 backdrop-blur-xl shadow-command h-fit sticky top-6"
                  >
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${section.gradient} shadow-lg`}>
                          <section.icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl text-quantum-blue">{section.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {section.topics.map((topic) => (
                        <Button
                          key={topic.id}
                          variant={selectedTopic === topic.id ? "default" : "ghost"}
                          className={`topic-button w-full justify-start h-auto p-4 text-left transition-all duration-300 rounded-lg ${
                            selectedTopic === topic.id 
                              ? 'bg-gradient-quantum shadow-glow scale-[1.02]' 
                              : 'hover:bg-muted/40 hover:scale-[1.01]'
                          }`}
                          onClick={() => handleTopicSelect(topic.id)}
                        >
                          <div className="flex-1 space-y-2">
                            <div className={`font-semibold text-sm ${selectedTopic === topic.id ? 'text-white' : 'text-foreground'}`}>
                              {topic.title}
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge className={`${getLevelColor(topic.level)} text-white border-0 shadow-sm text-xs`}>
                                {getLevelIcon(topic.level)} {topic.level}
                              </Badge>
                              <div className={`text-xs flex items-center gap-1 ${selectedTopic === topic.id ? 'text-white/80' : 'text-muted-foreground'}`}>
                                <BookOpen className="w-3 h-3" />
                                <span>{topic.estimatedTime}</span>
                              </div>
                            </div>
                          </div>
                        </Button>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Enhanced Content Display */}
                  <div className="xl:col-span-3">
                    {selectedTopic ? (() => {
                      const topic = section.topics.find(t => t.id === selectedTopic);
                      if (!topic) return null;
                      return (
                        <Card 
                          ref={contentDisplayRef} 
                          className="bg-card/80 border border-border/50 backdrop-blur-xl shadow-command"
                        >
                          <CardHeader className="pb-6 border-b border-border/50">
                            <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                              <span className="text-2xl text-quantum-blue">{topic.title}</span>
                              <div className="flex flex-wrap items-center gap-2">
                                <Badge className={`${getLevelColor(topic.level)} text-white border-0 shadow-sm px-3 py-1.5`}>
                                  {getLevelIcon(topic.level)} {topic.level}
                                </Badge>
                                <Badge variant="outline" className="border-quantum-blue/30 text-quantum-blue">
                                  <BookOpen className="w-3 h-3 mr-1" />
                                  {topic.estimatedTime}
                                </Badge>
                              </div>
                            </CardTitle>
                          </CardHeader>
                          
                          <CardContent className="space-y-6 pt-6">
                            {/* Main Content */}
                            <div className="content-section prose prose-invert max-w-none">
                              <div className="text-foreground whitespace-pre-line leading-relaxed text-base">
                                {topic.content}
                              </div>
                            </div>

                            {/* Key Facts Section */}
                            <div className={`content-section p-6 rounded-xl border-2 ${section.bgColor} ${section.borderColor} hover:border-opacity-60 transition-all duration-300`}>
                              <h4 className={`font-bold text-lg mb-4 flex items-center ${section.color}`}>
                                <div className={`p-2 rounded-lg ${section.bgColor} mr-3`}>
                                  <Info className="w-5 h-5" />
                                </div>
                                Key Facts
                              </h4>
                              <div className="space-y-3">
                                {topic.keyFacts.map((fact, factIndex) => (
                                  <div key={factIndex} className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                                    <span className={`mt-0.5 flex-shrink-0 font-bold ${section.color}`}>•</span>
                                    <span className="text-sm text-foreground/90 leading-relaxed">{fact}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Applications Section */}
                            {topic.applications && (
                              <div className="content-section p-6 bg-gradient-to-br from-quantum-blue/10 to-transparent rounded-xl border-2 border-quantum-blue/20 hover:border-quantum-blue/40 transition-all duration-300">
                                <h4 className="font-bold text-lg mb-4 flex items-center text-quantum-blue">
                                  <div className="p-2 rounded-lg bg-quantum-blue/10 mr-3">
                                    <PlayCircle className="w-5 h-5" />
                                  </div>
                                  Real-World Applications
                                </h4>
                                <div className="space-y-3">
                                  {topic.applications.map((application, appIndex) => (
                                    <div key={appIndex} className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                                      <span className="text-quantum-blue mt-0.5 flex-shrink-0 font-bold">→</span>
                                      <span className="text-sm text-foreground/90 leading-relaxed">{application}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            <Separator className="my-6" />

                            {/* Action Section */}
                            <div className="content-section space-y-4">
                              <h4 className="font-bold text-lg text-quantum-blue flex items-center gap-2">
                                <Sparkles className="w-5 h-5" />
                                Continue Learning
                              </h4>
                              <div className="flex flex-wrap gap-3">
                                <Button
                                  className="bg-gradient-quantum hover:shadow-glow transition-all duration-300"
                                  onClick={() => {
                                    const simulationSection = document.getElementById('simulation');
                                    if (simulationSection) {
                                      simulationSection.scrollIntoView({ behavior: 'smooth' });
                                    }
                                  }}
                                >
                                  <Calculator className="w-4 h-4 mr-2" />
                                  Try Simulation
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })() : (
                      <Card className="bg-card/80 border border-border/50 backdrop-blur-xl shadow-command">
                        <CardContent className="p-12 text-center space-y-6">
                          <div className={`p-6 rounded-2xl bg-gradient-to-br ${section.gradient} w-fit mx-auto shadow-glow`}>
                            <section.icon className="w-20 h-20 text-white animate-pulse" />
                          </div>
                          <div className="space-y-3">
                            <h3 className="text-2xl font-bold text-quantum-blue">{section.title}</h3>
                            <p className="text-muted-foreground text-lg max-w-md mx-auto">
                              Select a topic from the navigation to dive deep into {section.title.toLowerCase()}
                            </p>
                          </div>
                          <Button
                            onClick={() => setSelectedTopic(section.topics[0].id)}
                            className="bg-gradient-quantum hover:shadow-glow transition-all duration-300 px-8 py-6 text-base"
                          >
                            <BookOpen className="w-5 h-5 mr-2" />
                            Start Learning
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default EducationalContent;