// Mock API service for Meteor Madness
// This will be replaced with real backend calls later


export const mockAsteroids = [
  {
    id: "2023-DZ2",
    name: "Apophis",
    size: 340,
    velocity: 7.42,
    density: 2.6,
    composition: "rock",
    discoveryDate: "2004-06-19",
    riskLevel: "medium"
  },
  {
    id: "2022-AP7",
    name: "City Killer",
    size: 1500,
    velocity: 15.3,
    density: 3.2,
    composition: "metal",
    discoveryDate: "2022-01-13",
    riskLevel: "high"
  },
  {
    id: "2021-PDC",
    name: "Iceball",
    size: 800,
    velocity: 12.1,
    density: 1.8,
    composition: "ice",
    discoveryDate: "2021-04-30",
    riskLevel: "low"
  }
];

// Mock impact locations
// In src/services/mockApi.js

const mockLocations = [
  // === OCEANS & SEAS ===
  { region: "North Pacific Ocean", lat: 40.0, lng: -160.0 },
  { region: "Mariana Trench, Pacific", lat: 11.3, lng: 142.2 },
  { region: "North Atlantic Ocean", lat: 50.0, lng: -35.0 },
  { region: "Sargasso Sea, Atlantic", lat: 28.0, lng: -66.0 },
  { region: "South Pacific Ocean", lat: -40.0, lng: -130.0 },
  { region: "South Atlantic Ocean", lat: -25.0, lng: -20.0 },
  { region: "Indian Ocean", lat: -15.0, lng: 75.0 },
  { region: "Arctic Ocean", lat: 85.0, lng: 0.0 },
  { region: "Southern Ocean (Antarctic)", lat: -75.0, lng: 100.0 },
  { region: "Mediterranean Sea", lat: 38.0, lng: 18.0 },
  { region: "Caribbean Sea", lat: 14.5, lng: -75.0 },
  { region: "South China Sea", lat: 16.0, lng: 115.0 },
  { region: "Gulf of Mexico", lat: 25.0, lng: -90.0 },
  { region: "Coral Sea, Australia", lat: -15.0, lng: 150.0 },
  { region: "Arabian Sea", lat: 15.0, lng: 65.0 },
  { region: "Bay of Bengal", lat: 15.0, lng: 88.0 },
  { region: "Laccadive Sea", lat: 8.0, lng: 75.0 },

  // === ASIA ===
  // South India
  { region: "Hyderabad, India", lat: 17.4, lng: 78.5 },
  { region: "Bengaluru, India", lat: 12.9, lng: 77.6 },
  { region: "Chennai, India", lat: 13.1, lng: 80.3 },
  { region: "Kochi, India", lat: 9.9, lng: 76.3 },
  { region: "Visakhapatnam, India", lat: 17.7, lng: 83.3 },
  { region: "Western Ghats, India", lat: 10.0, lng: 77.0 },
  { region: "Deccan Plateau, India", lat: 17.0, lng: 76.0 },
  // Rest of Asia
  { region: "Tokyo, Japan", lat: 35.7, lng: 139.7 },
  { region: "Shanghai, China", lat: 31.2, lng: 121.5 },
  { region: "Beijing, China", lat: 39.9, lng: 116.4 },
  { region: "Mumbai, India", lat: 19.1, lng: 72.9 },
  { region: "New Delhi, India", lat: 28.6, lng: 77.2 },
  { region: "Jakarta, Indonesia", lat: -6.2, lng: 106.8 },
  { region: "Dubai, UAE", lat: 25.3, lng: 55.3 },
  { region: "Siberian Tundra, Russia", lat: 68.0, lng: 105.0 },
  { region: "Himalayas, Nepal", lat: 28.0, lng: 86.9 },

  // === NORTH AMERICA ===
  { region: "New York City, USA", lat: 40.7, lng: -74.0 },
  { region: "Los Angeles, USA", lat: 34.1, lng: -118.2 },
  { region: "Mexico City, Mexico", lat: 19.4, lng: -99.1 },
  { region: "Toronto, Canada", lat: 43.7, lng: -79.4 },
  { region: "Rocky Mountains, USA", lat: 39.7, lng: -105.5 },

  // === SOUTH AMERICA ===
  { region: "Sao Paulo, Brazil", lat: -23.6, lng: -46.6 },
  { region: "Buenos Aires, Argentina", lat: -34.6, lng: -58.4 },
  { region: "Andes Mountains, Peru", lat: -11.8, lng: -75.0 },
  { region: "Amazon Rainforest, Brazil", lat: -3.1, lng: -60.0 },

  // === EUROPE ===
  { region: "London, UK", lat: 51.5, lng: -0.1 },
  { region: "Paris, France", lat: 48.9, lng: 2.3 },
  { region: "Moscow, Russia", lat: 55.8, lng: 37.6 },
  { region: "Rome, Italy", lat: 41.9, lng: 12.5 },
  { region: "The Alps, Switzerland", lat: 46.8, lng: 8.2 },

  // === AFRICA ===
  { region: "Lagos, Nigeria", lat: 6.5, lng: 3.4 },
  { region: "Cairo, Egypt", lat: 30.0, lng: 31.2 },
  { region: "Johannesburg, South Africa", lat: -26.2, lng: 28.0 },
  { region: "Sahara Desert, Algeria", lat: 25.0, lng: 3.0 },
  { region: "Congo Rainforest", lat: 0.5, lng: 22.0 },

  // === AUSTRALIA & OCEANIA ===
  { region: "Sydney, Australia", lat: -33.9, lng: 151.2 },
  { region: "Australian Outback", lat: -25.0, lng: 135.0 },
  { region: "New Zealand Alps", lat: -43.5, lng: 170.5 },

  // === REMOTE & EXTREME LOCATIONS ===
  { region: "Antarctica", lat: -82.0, lng: 0.0 },
  { region: "Greenland Ice Sheet", lat: 72.0, lng: -40.0 },
  { region: "Gobi Desert, Mongolia", lat: 44.0, lng: 103.0 }
];

export const getAsteroidData = async (id) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const asteroid = mockAsteroids.find(a => a.id === id);
  if (!asteroid) {
    throw new Error("Asteroid not found");
  }
  
  return asteroid;
};

export const simulateAsteroid = async (params) => {
  // Simulate API processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const size = parseFloat(params.size);
  const velocity = parseFloat(params.velocity);
  const density = parseFloat(params.density);
  const angle = parseFloat(params.angle);
  
  // Calculate kinetic energy: KE = 0.5 * mass * velocity^2
  const volume = (4/3) * Math.PI * Math.pow(size/2, 3); // sphere volume in m³
  const mass = volume * density * 1000; // kg (density converted from g/cm³)
  const velocityMS = velocity * 1000; // convert km/s to m/s
  const kineticEnergy = 0.5 * mass * Math.pow(velocityMS, 2); // joules
  
  // Calculate crater size (empirical formula with angle factor)
  const angleImpactFactor = Math.sin(angle * Math.PI / 180); // Convert to radians and get impact efficiency
  const craterSize = Math.pow(kineticEnergy / 1e15, 0.25) * 2 * angleImpactFactor; // rough approximation in km
  
  // Calculate earthquake magnitude (rough correlation)
  const earthquakeMagnitude = Math.min(9.5, 4 + Math.log10(kineticEnergy / 1e15) * 0.7);
  
  // Determine tsunami risk
  const location = mockLocations[Math.floor(Math.random() * mockLocations.length)];
  const isOceanImpact = location.region.includes("Ocean");
  let tsunamiRisk = "None";
  
  if (isOceanImpact && size > 50) {
    if (size > 500) tsunamiRisk = "Catastrophic";
    else if (size > 200) tsunamiRisk = "High";
    else tsunamiRisk = "Moderate";
  }
  
  // Calculate damage estimates (angle affects impact severity)
  const baseCasualties = Math.pow(size, 1.5) * Math.pow(velocity, 0.5) * 20 * angleImpactFactor;
  const casualties = Math.floor(baseCasualties * (isOceanImpact ? 0.1 : 1));

  const economicLoss = kineticEnergy / 1e12 * 1e9; // rough $5B per petajoule
  const affectedArea = Math.PI * Math.pow(craterSize * 3, 2); // damage radius ~3x crater radius

  return {
    kineticEnergy,
    craterSize,
    earthquakeMagnitude,
    tsunamiRisk,
    impactLocation: location,
    damage: {
      casualties,
      economicLoss,
      affectedArea
    }
  };
};

export const testMitigation = async (method, asteroidParams) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const size = parseFloat(asteroidParams.size);
  const velocity = parseFloat(asteroidParams.velocity);
  
  let result;
  
  switch (method) {
    case "kinetic_impactor":
      result = {
        success: size < 500,
        method: "Kinetic Impactor",
        energyRequired: Math.pow(size, 2) * velocity * 1e6, // joules
        timeRequired: Math.max(1, size / 50), // years
        successProbability: Math.max(0.1, 0.9 - (size / 1000)),
        costEstimate: size * velocity * 1e6 // USD
      };
      break;
      
    case "gravity_tractor":
      result = {
        success: size < 300,
        method: "Gravity Tractor",
        energyRequired: Math.pow(size, 1.5) * velocity * 1e7,
        timeRequired: Math.max(5, size / 20),
        successProbability: Math.max(0.05, 0.7 - (size / 500)),
        costEstimate: size * velocity * 2e6
      };
      break;
      
    case "nuclear_deflection":
      result = {
        success: size < 1000,
        method: "Nuclear Deflection",
        energyRequired: Math.pow(size, 1.8) * velocity * 1e8,
        timeRequired: Math.max(0.5, size / 100),
        successProbability: Math.max(0.3, 0.95 - (size / 2000)),
        costEstimate: size * velocity * 5e6
      };
      break;
      
    default:
      throw new Error("Unknown mitigation method");
  }
  
  return result;
};

export const getGameScenarios = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return [
    {
      id: "scenario_1",
      name: "The Apophis Approach",
      description: "A 340m asteroid is on collision course with Earth. You have 2 years to act.",
      difficulty: "Medium",
      asteroid: mockAsteroids[0],
      timeLimit: 2,
      objectives: ["Prevent impact", "Minimize casualties", "Stay under budget"]
    },
    {
      id: "scenario_2", 
      name: "City Killer",
      description: "A massive 1.5km metallic asteroid threatens a major population center.",
      difficulty: "Hard",
      asteroid: mockAsteroids[1],
      timeLimit: 1,
      objectives: ["Full deflection required", "Maximum efficiency", "International cooperation"]
    },
    {
      id: "scenario_3",
      name: "Ice Giant",
      description: "An icy comet fragment breaks apart, creating multiple smaller threats.",
      difficulty: "Easy",
      asteroid: mockAsteroids[2],
      timeLimit: 3,
      objectives: ["Handle multiple fragments", "Orbital mechanics mastery", "Resource optimization"]
    }
  ];
};

export const presets = [
    {
        name: "Chelyabinsk Event",
        params: { size: "20", velocity: "19", density: "3.5", composition: "rock", angle: "20" },
        description: "A 20-meter meteor that exploded over Russia in 2013, injuring over 1,500 people from its shockwave."
    },
    {
        name: "Tunguska Event",
        params: { size: "60", velocity: "15", density: "0.8", composition: "ice", angle: "45" },
        description: "A ~60m object that flattened 2,000 sq km of Siberian forest in 1908 without creating a crater."
    },
    {
        name: "Chicxulub Impactor",
        params: { size: "10000", velocity: "25", density: "2.8", composition: "rock", angle: "60" },
        description: "The 10km asteroid that led to a mass extinction event and ended the age of dinosaurs 66 million years ago."
    },
];

