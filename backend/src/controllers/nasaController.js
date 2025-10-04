import { fetchApod, fetchNeoFeed, fetchNeoById, fetchNeoBrowse, fetchRandomNeo } from '../services/nasaService.js';
import { mockLocations } from '../data/locations.js';
import axios from 'axios';

// --- Standard NASA API Endpoints ---

export const getApod = async (req, res) => {
  try {
    const data = await fetchApod();
    res.json(data);
  } catch (error) {
    res.status(503).json({
      error: 'NASA API is currently unavailable. Please try again later.',
      details: error.message
    });
  }
};

export const getNeoFeed = async (req, res) => {
  const { start_date, end_date } = req.query;
  try {
    const data = await fetchNeoFeed(start_date, end_date);
    res.json(data);
  } catch (error) {
    res.status(503).json({ error: error.message });
  }
};

export const getNeoById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchNeoById(id);
    res.json(data);
  } catch (error) {
    res.status(503).json({ error: error.message });
  }
};

export const getNeoBrowse = async (req, res) => {
  const { page } = req.query;
  try {
    const data = await fetchNeoBrowse(page);
    res.json(data);
  } catch (error) {
    res.status(503).json({ error: error.message });
  }
};

// --- Game Scenarios ---

export const getScenarios = (req, res) => {
  try {
    const scenarios = [
      {
        id: "scenario_1",
        name: "The Apophis Approach",
        description: "A 340m asteroid is on collision course with Earth. You have 2 years to act.",
        difficulty: "Medium",
        asteroid: {
          id: "2023-DZ2",
          name: "Apophis",
          size: 340,
          velocity: 7.42,
          density: 2.6,
          composition: "rock",
          discoveryDate: "2004-06-19",
          riskLevel: "medium"
        },
        timeLimit: 2,
        objectives: ["Prevent impact", "Minimize casualties", "Stay under budget"]
      },
      {
        id: "scenario_2",
        name: "City Killer",
        description: "A massive 800m metallic asteroid threatens a major population center.",
        difficulty: "Hard",
        asteroid: {
          id: "2022-AP7",
          name: "City Killer",
          size: 800,
          velocity: 15.3,
          density: 3.2,
          composition: "metal",
          discoveryDate: "2022-01-13",
          riskLevel: "high"
        },
        timeLimit: 1,
        objectives: ["Full deflection required", "Maximum efficiency", "International cooperation"]
      },
      {
        id: "scenario_3",
        name: "Ice Giant",
        description: "An icy comet fragment breaks apart, creating multiple smaller threats.",
        difficulty: "Easy",
        asteroid: {
          id: "2021-PDC",
          name: "Iceball",
          size: 150,
          velocity: 12.1,
          density: 1.8,
          composition: "ice",
          discoveryDate: "2021-04-30",
          riskLevel: "low"
        },
        timeLimit: 3,
        objectives: ["Handle multiple fragments", "Orbital mechanics mastery", "Resource optimization"]
      }
    ];

    res.json(scenarios);
  } catch (error) {
    res.status(503).json({ error: 'Failed to load scenarios' });
  }
};

// --- Random Scenario with NASA Data (SCALED DOWN) ---

export const getRandomScenario = async (req, res) => {
  try {
    const randomScenarios = [];
    const missionAdjectives = [
      "Urgent Response", "Critical Deflection", "Last-Minute Save",
      "Frontier Defense", "Operation Shield", "Celestial Challenge",
      "Deep Space Alert", "Impact Prevention", "Trajectory Shift", "Emergency Protocol"
    ];

    for (let i = 0; i < 3; i++) {
      const neo = await fetchRandomNeo();
      
      // Get raw diameter from NASA data
      const rawDiameter =
        neo.estimated_diameter?.meters?.estimated_diameter_max ||
        neo.estimated_diameter?.meters?.estimated_diameter_min ||
        300;
      
      // Scale down large asteroids to playable sizes (50-900m range)
      let diameter;
      if (rawDiameter > 1000) {
        // Very large asteroids: scale to 400-900m
        diameter = 400 + Math.floor(Math.random() * 500);
      } else if (rawDiameter > 500) {
        // Large asteroids: scale to 200-600m
        diameter = 200 + Math.floor(Math.random() * 400);
      } else if (rawDiameter > 200) {
        // Medium asteroids: scale to 100-400m
        diameter = 100 + Math.floor(Math.random() * 300);
      } else {
        // Small asteroids: keep original or set minimum 50m
        diameter = Math.max(50, Math.round(rawDiameter));
      }

      const rawVelocity = neo.close_approach_data?.[0]?.relative_velocity?.kilometers_per_second;
      const velocity = rawVelocity
        ? parseFloat(parseFloat(rawVelocity).toFixed(2))
        : 15.00;

      // Determine difficulty and risk based on SCALED diameter
      let level = "Easy";
      let riskLevel = "low";
      
      if (diameter < 150) {
        level = "Easy";
        riskLevel = "low";
      } else if (diameter < 400) {
        level = "Medium";
        riskLevel = "medium";
      } else {
        level = "Hard";
        riskLevel = "high";
      }

      const difficulty = level;
      const missionAdj = missionAdjectives[Math.floor(Math.random() * missionAdjectives.length)];
      const asteroidName = neo.name || "Unknown Object";
      const scenarioName = `${missionAdj}: ${asteroidName}`;

      randomScenarios.push({
        id: `nasa_${neo.id}_${i}`,
        name: scenarioName,
        description: `A near-Earth object (${asteroidName}) with an estimated diameter of ${diameter}m and velocity ${velocity} km/s is approaching Earth!`,
        difficulty,
        asteroid: {
          id: neo.id,
          name: asteroidName,
          size: diameter,
          velocity,
          density: 2.5,
          composition: "rock",
          discoveryDate: neo.orbital_data?.first_observation_date || "Unknown",
          riskLevel
        },
        timeLimit: 2,
        objectives: [
          "Analyze real NEO data",
          "Deflect the asteroid",
          "Minimize casualties"
        ]
      });
    }

    res.json(randomScenarios);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch NASA NEO data",
      details: error.message
    });
  }
};

// --- Mitigation Test (UPDATED THRESHOLDS) ---

export const testMitigation = (req, res) => {
  try {
    const { method, size, velocity } = req.body;
    const asteroidSize = Number(size);
    const asteroidVelocity = Number(velocity);
    let result;

    switch (method) {
      case "kinetic_impactor":
        result = {
          success: asteroidSize < 600,
          method: "Kinetic Impactor",
          energyRequired: Math.pow(asteroidSize, 2) * asteroidVelocity * 1e6,
          timeRequired: Math.max(1, asteroidSize / 50),
          successProbability: asteroidSize < 600 
            ? Math.max(0.70, 0.95 - (asteroidSize / 1200)) 
            : Math.max(0.1, 0.4 - (asteroidSize / 1000)),
          costEstimate: asteroidSize * asteroidVelocity * 1e6
        };
        break;
        
      case "gravity_tractor":
        result = {
          success: asteroidSize < 1200,
          method: "Gravity Tractor",
          energyRequired: Math.pow(asteroidSize, 1.5) * asteroidVelocity * 1e7,
          timeRequired: Math.max(5, asteroidSize / 20),
          successProbability: asteroidSize < 1200 
            ? Math.max(0.60, 0.90 - (asteroidSize / 1500)) 
            : Math.max(0.05, 0.5 - (asteroidSize / 500)),
          costEstimate: asteroidSize * asteroidVelocity * 2e6
        };
        break;
        
      case "nuclear_deflection":
        result = {
          success: asteroidSize < 2500,
          method: "Nuclear Deflection",
          energyRequired: Math.pow(asteroidSize, 1.8) * asteroidVelocity * 1e8,
          timeRequired: Math.max(0.5, asteroidSize / 100),
          successProbability: asteroidSize < 2500 
            ? Math.max(0.80, 0.98 - (asteroidSize / 4000)) 
            : Math.max(0.3, 0.7 - (asteroidSize / 2000)),
          costEstimate: asteroidSize * asteroidVelocity * 5e6
        };
        break;
        
      case "nuclear_device":
        result = {
          success: asteroidSize < 2500,
          method: "Nuclear Device",
          energyRequired: Math.pow(asteroidSize, 1.8) * asteroidVelocity * 1.5e8,
          timeRequired: Math.max(0.3, asteroidSize / 120),
          successProbability: asteroidSize < 2500 
            ? Math.max(0.78, 0.96 - (asteroidSize / 3500)) 
            : Math.max(0.25, 0.68 - (asteroidSize / 1500)),
          costEstimate: asteroidSize * asteroidVelocity * 7e6
        };
        break;
        
      case "laser_ablation":
        result = {
          success: asteroidSize < 300,
          method: "Laser Ablation",
          energyRequired: Math.pow(asteroidSize, 1.4) * asteroidVelocity * 2e7,
          timeRequired: Math.max(7, asteroidSize / 10),
          successProbability: asteroidSize < 300 
            ? Math.max(0.65, 0.92 - (asteroidSize / 400)) 
            : Math.max(0.01, 0.35 - (asteroidSize / 500)),
          costEstimate: asteroidSize * asteroidVelocity * 2.5e6
        };
        break;
        
      case "mass_driver":
        result = {
          success: asteroidSize >= 100 && asteroidSize <= 900,
          method: "Mass Driver",
          energyRequired: Math.pow(asteroidSize, 1.2) * asteroidVelocity * 1e7,
          timeRequired: Math.max(15, asteroidSize / 6),
          successProbability: (asteroidSize >= 100 && asteroidSize <= 900) 
            ? Math.max(0.55, 0.85 - Math.abs(asteroidSize - 500) / 800) 
            : Math.max(0.02, 0.25 - Math.abs(asteroidSize - 500) / 1000),
          costEstimate: asteroidSize * asteroidVelocity * 0.9e6
        };
        break;
        
      case "solar_concentrator":
        result = {
          success: asteroidSize < 700,
          method: "Solar Concentrator",
          energyRequired: Math.pow(asteroidSize, 1.6) * asteroidVelocity * 5e7,
          timeRequired: Math.max(5, asteroidSize / 15),
          successProbability: asteroidSize < 700 
            ? Math.max(0.60, 0.88 - (asteroidSize / 900)) 
            : Math.max(0.04, 0.4 - (asteroidSize / 700)),
          costEstimate: asteroidSize * asteroidVelocity * 1.2e6
        };
        break;
        
      case "ion_beam_shepherd":
        result = {
          success: asteroidSize < 550,
          method: "Ion Beam Shepherd",
          energyRequired: Math.pow(asteroidSize, 1.3) * asteroidVelocity * 8e6,
          timeRequired: Math.max(12, asteroidSize / 8),
          successProbability: asteroidSize < 550 
            ? Math.max(0.63, 0.90 - (asteroidSize / 700)) 
            : Math.max(0.02, 0.45 - (asteroidSize / 800)),
          costEstimate: asteroidSize * asteroidVelocity * 2e6
        };
        break;
        
      default:
        return res.status(400).json({ error: "Unknown mitigation method" });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --- Asteroid Simulation (now RANDOM location, not user-supplied) ---

export const simulateAsteroid = (req, res) => {
  try {
    const { size, velocity, density, composition, angle } = req.body;

    // Physics-based calculations
    const diameter = Number(size); // meters
    const radius = diameter / 2; // meters
    const densitySI = Number(density) * 1000; // g/cm³ to kg/m³
    const velocityMS = Number(velocity) * 1000; // km/s to m/s

    // Volume and Mass
    const volume = (4 / 3) * Math.PI * Math.pow(radius, 3); // m³
    const mass = volume * densitySI; // kg

    // Kinetic Energy (Joules)
    const kineticEnergy = 0.5 * mass * Math.pow(velocityMS, 2);

    // Impact angle factor (oblique reduces effect)
    const angleImpactFactor = Math.max(0.2, Math.sin(Number(angle) * Math.PI / 180)); // never <0.2

    // Crater size in km (empirical, depends on energy and angle)
    const craterSize = Math.max(
      0.1,
      Math.pow(kineticEnergy / 1e15, 0.25) * 2 * angleImpactFactor
    );

    // Earthquake magnitude (empirical)
    const earthquakeMagnitude = Math.min(9.5, 4 + Math.log10(Math.max(kineticEnergy, 1) / 1e15) * 0.7);

    // --- Location logic ---
    const location = mockLocations[Math.floor(Math.random() * mockLocations.length)];
    const isOceanImpact = location.type === "ocean" || (location.population === 0 && location.gdp === 0);

    // Tsunami risk
    let tsunamiRisk = "None";
    if (isOceanImpact && diameter > 50) {
      if (diameter > 500) tsunamiRisk = "Catastrophic";
      else if (diameter > 200) tsunamiRisk = "High";
      else tsunamiRisk = "Moderate";
    }

    // --- Damage estimates ---
    const cityArea = 1000; // km²
    const popDensity = location.population / cityArea; // people per km²

    // Affected area: scales with crater size (radius ~1.5x crater radius)
    const damageRadius = craterSize * 1.5; // km
    const affectedArea = Math.max(1, Math.round(Math.PI * Math.pow(damageRadius, 2))); // km²

    // Casualties: scales with pop density and area (urban: high, ocean: 0)
    let casualties = 0;
    if (!isOceanImpact && location.population > 0) {
      const expectedVictims = popDensity * affectedArea * 0.5 * angleImpactFactor; // 50% of affected area has people
      casualties = Math.round(Math.max(0, Math.min(expectedVictims, location.population)));
    }

    // Economic loss: GDP × affected area/urban area × severity
    let economicLoss = 0;
    if (!isOceanImpact && location.gdp > 0) {
      economicLoss = location.gdp * (affectedArea / cityArea) * (craterSize / 2);
      economicLoss = Math.min(economicLoss, location.gdp * 0.8);
    } else {
      economicLoss = kineticEnergy / 1e12 * 1e9; // fallback: $1B per terajoule
    }

    const impactLocation = { ...location, warningTime: "Hours to days" };
    const damage = {
      economicLoss: Number.isFinite(economicLoss) ? Math.round(economicLoss) : 0,
      casualties: Number.isFinite(casualties) ? casualties : 0,
      affectedArea: Number.isFinite(affectedArea) ? Math.round(affectedArea) : 1
    };

    res.json({
      kineticEnergy,
      craterSize,
      earthquakeMagnitude,
      tsunamiRisk,
      impactLocation,
      damage
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --- DYNAMIC EDUCATIONAL CONTENT ---

export const getDynamicEducationalContent = async (req, res) => {
  try {
    const apod = await fetchApod();

    const randomNeos = [];
    for (let i = 0; i < 2; i++) {
      randomNeos.push(await fetchRandomNeo());
    }

    let marsWeather = null;
    try {
      const resp = await axios.get('https://api.maas2.apollorion.com/');
      marsWeather = resp.data;
    } catch (e) {
      marsWeather = null;
    }

    const educationalSections = [
      {
        id: "apod",
        title: "Astronomy Picture of the Day",
        type: "image",
        imageUrl: apod.url,
        explanation: apod.explanation,
        date: apod.date,
        titleText: apod.title
      },
      {
        id: "neos",
        title: "Near-Earth Asteroid Facts",
        type: "facts",
        facts: randomNeos.map(neo => ({
          name: neo.name,
          diameter: Math.round(
            neo.estimated_diameter?.meters?.estimated_diameter_max ||
            neo.estimated_diameter?.meters?.estimated_diameter_min ||
            100
          ),
          velocity: neo.close_approach_data?.[0]?.relative_velocity?.kilometers_per_second
            ? parseFloat(neo.close_approach_data[0].relative_velocity.kilometers_per_second).toFixed(2)
            : "Unknown",
          approachDate: neo.close_approach_data?.[0]?.close_approach_date || "Unknown",
          absMagnitude: neo.absolute_magnitude_h,
          hazardous: !!neo.is_potentially_hazardous_asteroid
        }))
      },
      marsWeather && {
        id: "mars_weather",
        title: "Mars Weather Today",
        type: "weather",
        sol: marsWeather.sol,
        season: marsWeather.season,
        at: marsWeather.at ? marsWeather.at.av : null,
        temperature: marsWeather.min_temp && marsWeather.max_temp
          ? `${marsWeather.min_temp}°C to ${marsWeather.max_temp}°C`
          : marsWeather.at
            ? `${marsWeather.at.av}°C`
            : "N/A",
        pressure: marsWeather.pressure || marsWeather.pre || "N/A",
        sunrise: marsWeather.sunrise || "N/A",
        sunset: marsWeather.sunset || "N/A"
      }
    ].filter(Boolean);

    res.json(educationalSections);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dynamic educational content", details: error.message });
  }
};

// --- Mitigation Strategies ---

export const getMitigationStrategies = async (req, res) => {
  try {
    const strategies = [
      {
        id: "kinetic_impactor",
        name: "Kinetic Impactor",
        description: "A spacecraft is launched to collide with an asteroid, changing its speed and trajectory. Demonstrated by NASA's DART mission.",
        nasa_link: "https://www.nasa.gov/planetarydefense/dart/dart-news",
        icon: "🚀",
        demonstration: "DART impacted Dimorphos and altered its orbit."
      },
      {
        id: "gravity_tractor",
        name: "Gravity Tractor",
        description: "A spacecraft hovers near an asteroid for an extended period, using its own gravity to gradually pull the asteroid's path away from Earth.",
        nasa_link: "https://cneos.jpl.nasa.gov/pd/capabilities.html#gravitytractor",
        icon: "🛰️",
        demonstration: "Proposed for precise, controllable deflection."
      },
      {
        id: "nuclear_device",
        name: "Nuclear Device",
        description: "A nuclear explosion near or on an asteroid can vaporize material, providing a powerful push to alter its course.",
        nasa_link: "https://cneos.jpl.nasa.gov/pd/capabilities.html#nucleardeflection",
        icon: "☢️",
        demonstration: "Considered a last-resort option for large/late threats."
      },
      {
        id: "ion_beam_shepherd",
        name: "Ion Beam Shepherd",
        description: "A spacecraft fires a continuous ion beam at the asteroid to nudge it off course over time.",
        nasa_link: "https://www.nasa.gov/directorates/spacetech/niac/2015_phase_I_fellows_ion_beam_shepherd",
        icon: "🔋",
        demonstration: "Experimental; allows for fine adjustments."
      },
      {
        id: "solar_concentrator",
        name: "Solar Concentrator",
        description: "A large mirror focuses sunlight onto the asteroid, heating and vaporizing its surface to create thrust.",
        nasa_link: "https://www.nasa.gov/planetarydefense/overview",
        icon: "🔆",
        demonstration: "Theoretical; requires large space structures."
      }
    ];
    res.json(strategies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch mitigation strategies", details: error.message });
  }
};