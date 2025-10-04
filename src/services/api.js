import axios from "axios";
export { presets } from "./mockApi";

// Use VITE_API_BASE from environment, fallback to /api for local dev
const BASE_URL = import.meta.env.VITE_API_BASE || "/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Asteroid Impact Simulation (POST /simulate)
export async function simulateAsteroid(params) {
  try {
    const { data } = await api.post("/simulate", params);
    return data;
  } catch (error) {
    throw new Error(
      `Simulation failed: ${error.response?.status} ${error.response?.data?.error || error.message}`
    );
  }
}

// Mitigation strategy testing (POST /mitigation)
export async function testMitigation(method, asteroidParams) {
  try {
    const { data } = await api.post("/mitigation", { method, ...asteroidParams });
    return data;
  } catch (error) {
    throw new Error(
      `Mitigation test failed: ${error.response?.status} ${error.response?.data?.error || error.message}`
    );
  }
}

// Get game scenarios (GET /scenarios)
export async function getGameScenarios() {
  try {
    const { data } = await api.get("/scenarios");
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to load scenarios");
  }
}

// Get NASA APOD (Astronomy Picture of the Day)
export async function getApod() {
  try {
    const { data } = await api.get("/apod");
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch NASA APOD");
  }
}

// Get NEO feed (Near-Earth Objects) for a date range
export async function getNeoFeed(start_date, end_date) {
  try {
    const { data } = await api.get("/neo/feed", {
      params: { start_date, end_date }
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch NEO feed");
  }
}

// Get individual NEO by NASA id
export async function getNeoById(id) {
  try {
    const { data } = await api.get(`/neo/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch NEO by ID");
  }
}

// Browse all NEOs (paginated)
export async function browseNeos(page = 1) {
  try {
    const { data } = await api.get("/neo/browse", {
      params: { page }
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to browse NEOs");
  }
}

// Get a random scenario (GET /random-scenario)
export async function getRandomScenario() {
  try {
    const { data } = await api.get("/random-scenario");
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch random scenario");
  }
}

// Get educational content (GET /educational-content)
export const getEducationalContent = async () => {
  try {
    const { data } = await api.get("/educational-content");
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to load educational content");
  }
};

// Get mitigation strategies (GET /mitigation-strategies)
export const getMitigationStrategies = async () => {
  try {
    const { data } = await api.get("/mitigation-strategies");
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch mitigation strategies");
  }
};

// export async function getImpactLocations() {
//   try {
//     const { data } = await api.get("/locations");
//     return data;
//   } catch (error) {
//     console.log(error);
//     throw new Error("Failed to fetch impact locations");
//   }
// }