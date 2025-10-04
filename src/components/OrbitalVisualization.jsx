import React from 'react';
import { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Toggle } from "@/components/ui/toggle";
import { 
  Orbit,
  Play, 
  Zap, 
  Target, 
  RotateCw,
  Camera,
  Settings,
  Minimize,
  Maximize,
  Shield,
  Eye,
  Gauge
} from "lucide-react";

const OrbitalVisualization3D = ({ params, isSimulating, animationTime = 8000, showDebugInfo, setShowDebugInfo, onAnimationEnd, onRunSimulation }) => {

  const fullscreenContainerRef = useRef(null);

  const mountRef = useRef(null);

  const sceneRef = useRef(null);

  const rendererRef = useRef(null);

  const cameraRef = useRef(null);

  const asteroidRef = useRef(null);

  const trailRef = useRef(null);

  const animationRef = useRef(null);

  const earthRef = useRef(null);

  const explosionParticlesRef = useRef([]);

  const shockwaveRef = useRef(null);

  const atmosphereRef = useRef(null);

  const moonRef = useRef(null);

  const entryGlowRef = useRef(null);

  // OrbitControls instance
  const controlsRef = useRef(null);

  // Enhanced state management
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [cameraMode, setCameraMode] = useState('orbital'); // orbital, follow, cinematic
  const [qualityLevel, setQualityLevel] = useState(
    window.innerWidth < 768 ? 'medium' : 'high'
  ); // medium, high, ultra
  const [texturesLoaded, setTexturesLoaded] = useState(false);

  // State to track if the user is interacting with the canvas
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [inCanvasLoadingProgress, setInCanvasLoadingProgress] = useState(null);

  // Performance monitoring
  const [fps, setFps] = useState(60);
  const fpsCounterRef = useRef({ frames: 0, lastTime: Date.now() });

  // Track if simulation has already been started for current params
  const lastSimulationParamsRef = useRef(null);

  // Texture loading cache
  const texturesRef = useRef({});

  // Get responsive dimensions that perfectly fit the container
  const getResponsiveDimensions = useCallback(() => {
    if (!mountRef.current) return { width: 800, height: 600 };
    
    const container = mountRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width || container.clientWidth;
    const containerHeight = containerRect.height || container.clientHeight;
    
    // Use exact container dimensions to prevent gaps
    return { 
      width: Math.floor(containerWidth), 
      height: Math.floor(containerHeight) 
    };
  }, []);

  // Quality settings optimized for performance
  const getQualitySettings = useCallback(() => {
    const settings = {
       medium: {
        shadowMapSize: 1024,      
        particleCount: 200,       
        asteroidDetail: 3,        
        earthDetail: 32,          
        trailLength: 40,          
        explosionParticles: 25,   
        enableShadows: false,     
        antialiasing: false       
      },
      high: {
        shadowMapSize: 2048,
        particleCount: 1000,
        asteroidDetail: 5,
        earthDetail: 48,
        trailLength: 60,
        explosionParticles: 50,
        enableShadows: true,
        antialiasing: true
      },
      ultra: {
        shadowMapSize: 4096,
        particleCount: 2000,
        asteroidDetail: 6,
        earthDetail: 64,
        trailLength: 100,
        explosionParticles: 100,
        enableShadows: true,
        antialiasing: true
      }
    };
    
    // Auto-adjust quality based on device capabilities
    const isMobile = window.innerWidth < 768;
    
    if (isMobile && qualityLevel === 'ultra') return settings.high;
    
    return settings[qualityLevel] || settings.high;
  }, [qualityLevel]);

  // Realistic textures 
 const loadTextures = useCallback(() => {
  const basePath = import.meta.env.BASE_URL;

  return new Promise((resolve) => {
    const loader = new THREE.TextureLoader();
    
    const textures = {};
    let loadedCount = 0;
    const totalTextures = 8;

    const checkComplete = () => {
      loadedCount++;
      if (loadedCount === totalTextures) {
        Object.values(textures).forEach(texture => {
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          texture.anisotropy = 16;
        });
        texturesRef.current = textures;
        setTexturesLoaded(true);
        resolve(textures);
      }
    };

    // Prepending basePath to each texture path
    loader.load(
      `${basePath}textures/2k_earth_daymap.jpg`,
      (texture) => { textures.earthDay = texture; checkComplete(); },
      undefined,
      (error) => { console.warn('Earth daymap failed to load:', error); checkComplete(); }
    );

    loader.load(
      `${basePath}textures/2k_earth_nightmap.jpg`,
      (texture) => {
        textures.earthNight = texture;
        checkComplete();
      },
      undefined,
      (error) => {
        console.warn('Earth night map failed to load:', error);
        checkComplete();
      }
    );

    loader.load(
      `${basePath}textures/2k_earth_normal_map.jpg`,
      (texture) => { textures.earthNormal = texture; checkComplete(); },
      undefined,
      (error) => { console.warn('Earth normal map failed to load:', error); checkComplete(); }
    );

    loader.load(
      `${basePath}textures/2k_earth_specular_map.jpg`,
      (texture) => { textures.earthSpecular = texture; checkComplete(); },
      undefined,
      (error) => { console.warn('Earth specular map failed to load:', error); checkComplete(); }
    );

    loader.load(
      `${basePath}textures/2k_earth_clouds.jpg`,
      (texture) => { textures.earthClouds = texture; checkComplete(); },
      undefined,
      (error) => { console.warn('Earth clouds failed to load:', error); checkComplete(); }
    );
    
    loader.load(
      `${basePath}textures/2k_moon.jpg`,
      (texture) => { textures.moon = texture; checkComplete(); },
      undefined,
      (error) => { console.warn('Moon texture failed to load:', error); checkComplete(); }
    );
    
    loader.load(
      `${basePath}textures/2k_stars_milky_way.jpg`,
      (texture) => { textures.stars = texture; checkComplete(); },
      undefined,
      (error) => { console.warn('Stars texture failed to load:', error); checkComplete(); }
    );

    loader.load(
      `${basePath}textures/ground_0010_color_2k.jpg`,
      (texture) => {
        textures.asteroid = texture;
        checkComplete();
      },
      undefined,
      (error) => {
        console.warn('Asteroid texture failed to load:', error);
        checkComplete();
      }
    );
  });
}, []);

  // Enhanced scene initialization with proper texture loading
  const initializeScene = useCallback(async () => {
    if (!mountRef.current) return { scene: null, renderer: null, camera: null };

    const { width, height } = getResponsiveDimensions();
    const quality = getQualitySettings();

    // Clean up existing renderer
    if (rendererRef.current) {
      rendererRef.current.dispose();
      if (mountRef.current.contains(rendererRef.current.domElement)) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
    }

    // Load textures first and wait for completion
    const textures = await loadTextures();

    // Scene with proper space environment
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000011); // Dark space fallback

    // Professional camera setup
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 5000);
    camera.position.set(0, 80, 180);
    camera.lookAt(0, 0, 0);

    // Enhanced renderer with exact container fitting
    const renderer = new THREE.WebGLRenderer({ 
      antialias: quality.antialiasing,
      alpha: false,
      powerPreference: "high-performance",
      stencil: false,
      depth: true
    });
    
    renderer.setSize(width, height, false); // Prevent CSS styling
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = quality.enableShadows;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0; // Adjusted for better lighting
    
    // Ensure renderer canvas fits exactly
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    
    mountRef.current.appendChild(renderer.domElement);

    // MODIFICATION: Initialize OrbitControls for free navigation
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 45; // Prevent zooming inside the Earth
    controls.maxDistance = 600; // Prevent zooming too far out
    controls.enablePan = true;
    controlsRef.current = controls;

    // MODIFICATION: Add event listeners to detect user interaction to pause auto-rotation
    controls.addEventListener('start', () => setIsUserInteracting(true));
    controls.addEventListener('end', () => setIsUserInteracting(false));

    // Create realistic starscape sphere (NOT scene.background)
    if (textures.stars) {
      const starsGeometry = new THREE.SphereGeometry(2000, 64, 64);
      const starsMaterial = new THREE.MeshBasicMaterial({
        map: textures.stars,
        side: THREE.BackSide, // Render inside of sphere
        fog: false
      });
      const starSphere = new THREE.Mesh(starsGeometry, starsMaterial);
      scene.add(starSphere);
    }

    // Enhanced lighting setup for proper illumination
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3); // Increased ambient
    scene.add(ambientLight);

    // Main sun light (enhanced and properly positioned)
    const sunLight = new THREE.DirectionalLight(0xffffff, 3.0); // Increased intensity
    sunLight.position.set(200, 100, 100);
    if (quality.enableShadows) {
      sunLight.castShadow = true;
      sunLight.shadow.mapSize.width = quality.shadowMapSize;
      sunLight.shadow.mapSize.height = quality.shadowMapSize;
      sunLight.shadow.camera.near = 0.1;
      sunLight.shadow.camera.far = 1000;
      sunLight.shadow.camera.left = -300;
      sunLight.shadow.camera.right = 300;
      sunLight.shadow.camera.top = 300;
      sunLight.shadow.camera.bottom = -300;
      sunLight.shadow.bias = -0.0001;
    }
    scene.add(sunLight);

    // Additional fill lighting for better visibility
    const fillLight = new THREE.DirectionalLight(0x4a90e2, 0.8);
    fillLight.position.set(-100, -50, 150);
    scene.add(fillLight);

    // Rim light for atmospheric effect
    const rimLight = new THREE.DirectionalLight(0x6666aa, 0.5);
    rimLight.position.set(50, -100, -50);
    scene.add(rimLight);

    // Realistic Earth with FIXED materials (only after textures loaded)
    const earthGeometry = new THREE.SphereGeometry(30, quality.earthDetail, quality.earthDetail);
    
    const earthMaterial = new THREE.MeshPhongMaterial({ 
      map: textures.earthDay || null,           // Day texture
      normalMap: textures.earthNormal || null,
      specularMap: textures.earthSpecular || null,
      shininess: 100,
      specular: 0x111111,

      // Night Map
      emissiveMap: textures.earthNight || null, 
      emissive: new THREE.Color(0xffffff),      
      emissiveIntensity: 1.0                  
    });
    
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.position.set(0, 0, 0);
    if (quality.enableShadows) {
      earth.castShadow = true;
      earth.receiveShadow = true;
    }
    scene.add(earth);
    earthRef.current = earth;

    // Realistic cloud layer (only if texture loaded)
    if (textures.earthClouds) {
      const cloudsGeometry = new THREE.SphereGeometry(30.5, quality.earthDetail, quality.earthDetail);
      const cloudsMaterial = new THREE.MeshLambertMaterial({
        map: textures.earthClouds,
        transparent: true,
        opacity: 0.4,
        blending: THREE.NormalBlending // Changed from AdditiveBlending
      });
      const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
      earth.add(clouds);
    }

    // Multi-layered atmosphere (enhanced for realism)
    const atmosphereGeometry = new THREE.SphereGeometry(32, 32, 32);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x44aaff,
      transparent: true,
      opacity: 0.08,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    earth.add(atmosphere);
    atmosphereRef.current = atmosphere;

    // Outer atmosphere glow
    const outerAtmosphereGeometry = new THREE.SphereGeometry(36, 24, 24);
    const outerAtmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x2288dd,
      transparent: true,
      opacity: 0.03,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending
    });
    const outerAtmosphere = new THREE.Mesh(outerAtmosphereGeometry, outerAtmosphereMaterial);
    earth.add(outerAtmosphere);

    // Orbital reference grid
    const orbitGeometry = new THREE.RingGeometry(90, 91, 64);
    const orbitMaterial = new THREE.MeshBasicMaterial({
      color: 0x444466,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide
    });
    const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
    orbit.rotation.x = Math.PI / 2;
    scene.add(orbit);

    // FIXED Moon material (only color map, no bump map)
    const moonGeometry = new THREE.SphereGeometry(8, 32, 32);
    const moonMaterial = new THREE.MeshPhongMaterial({ 
      map: textures.moon || null, // ONLY use as color map
      shininess: 5,
      specular: 0x111111
      // REMOVED: bumpMap and bumpScale (these were causing black moon)
    });
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    // Sets initial position to be on the orbit ring (radius 90)
    moon.position.set(90, 0, 0); 
    if (quality.enableShadows) {
      moon.castShadow = true;
      moon.receiveShadow = true;
    }
    scene.add(moon);
    moonRef.current = moon; 

    // Enhanced particle stars for depth (reduced since we have background sphere)
    const particleStarsGeometry = new THREE.BufferGeometry();
    const particleStarsMaterial = new THREE.PointsMaterial({ 
      size: 1.2,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending
    });

    const starsVertices = [];
    const starsColors = [];
    
    for (let i = 0; i < quality.particleCount / 4; i++) { // Further reduced
      // Create realistic star distribution
      const radius = 800 + Math.random() * 1000;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      starsVertices.push(x, y, z);
      
      // Realistic star colors
      const starType = Math.random();
      if (starType < 0.6) {
        starsColors.push(0.9 + Math.random() * 0.1, 0.9 + Math.random() * 0.1, 1);
      } else if (starType < 0.85) {
        starsColors.push(1, 0.95, 0.8 + Math.random() * 0.2);
      } else {
        starsColors.push(1, 0.4 + Math.random() * 0.3, 0.2 + Math.random() * 0.2);
      }
    }
    
    if (starsVertices.length > 0) {
      particleStarsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
      particleStarsGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starsColors, 3));
      
      const particleStarField = new THREE.Points(particleStarsGeometry, particleStarsMaterial);
      scene.add(particleStarField);
    }

    // Add space debris for realism (reduced for performance)
    if (quality.particleCount > 1000) {
      for (let i = 0; i < 12; i++) {
        const debrisGeometry = new THREE.SphereGeometry(0.3 + Math.random() * 0.5, 6, 6);
        const debrisMaterial = new THREE.MeshBasicMaterial({ 
          color: 0x555555,
          transparent: true,
          opacity: 0.7
        });
        const debris = new THREE.Mesh(debrisGeometry, debrisMaterial);
        
        const distance = 60 + Math.random() * 80;
        const angle = Math.random() * Math.PI * 2;
        const height = (Math.random() - 0.5) * 40;
        
        debris.position.set(
          Math.cos(angle) * distance,
          height,
          Math.sin(angle) * distance
        );
        scene.add(debris);
      }
    }

    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    return { scene, renderer, camera };
  }, [getResponsiveDimensions, getQualitySettings, loadTextures]);

  // Enhanced asteroid creation with better materials
  const createAsteroid = useCallback((scene, params) => {
    if (!scene || !params) return null;

    const quality = getQualitySettings();
    const baseSize = parseFloat(params.asteroidSize || params.size) || 100;
    
    // This size is used for the geometry
    const size = Math.max(1.5, Math.min(20, baseSize / 12));
    
    // Composition-based realistic materials
    const asteroidTexture = texturesRef.current.asteroid;
    const materialProps = {
      map: asteroidTexture || null,
      shininess: 10,
      specular: 0x111111,
    };

    switch (params.composition) {
      case 'metal':
        materialProps.color = new THREE.Color(0x999999);
        materialProps.shininess = 150;
        materialProps.specular = new THREE.Color(0x777777);
        break;
      case 'ice':
        materialProps.color = new THREE.Color(0xaaddff);
        materialProps.shininess = 100;
        materialProps.specular = new THREE.Color(0xeeeeff);
        break;
      case 'mixed':
        materialProps.color = new THREE.Color(0xc2a892);
        break;
      case 'rock':
      default:
        break;
    }

    const material = new THREE.MeshPhongMaterial(materialProps);
    
    // STEP 1: Create a smooth sphere as the starting point (like the Earth).
    const geometry = new THREE.SphereGeometry(size, quality.earthDetail, quality.earthDetail);
    
    // STEP 2: Deform the sphere to create the final irregular, "crooked" shape.
    const positions = geometry.attributes.position;
    const vertex = new THREE.Vector3();
    
    for (let i = 0; i < positions.count; i++) {
      vertex.fromBufferAttribute(positions, i);
      
      const p = vertex.clone().normalize();
      const largeBumps = Math.sin(p.x * 3) * Math.sin(p.y * 4) * Math.sin(p.z * 5) * 0.4;
      const craters = Math.pow(Math.sin(p.x * 10) * Math.sin(p.y * 10), 2) * -0.2;
      const fineNoise = (Math.random() - 0.5) * 0.1;

      const deformation = 1.0 + largeBumps + craters + fineNoise;
      vertex.multiplyScalar(deformation);
      
      positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    
    positions.needsUpdate = true;
    geometry.computeVertexNormals();

    // STEP 3: Combine the final irregular shape and material into the asteroid object.
    const asteroid = new THREE.Mesh(geometry, material);
    if (quality.enableShadows) {
      asteroid.castShadow = true;
      asteroid.receiveShadow = true;
    }

    // Velocity-based atmospheric effects
    const velocity = parseFloat(params.velocity) || 20;
    if (velocity > 30) {
      const trailGeometry = new THREE.ConeGeometry(size / 4, size * 2.5, 6);
      const trailMaterial = new THREE.MeshBasicMaterial({
        color: 0xff3366,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
      });
      const trail = new THREE.Mesh(trailGeometry, trailMaterial);
      trail.position.z = size * 1.5;
      trail.rotation.x = Math.PI;
      asteroid.add(trail);
    }

    scene.add(asteroid);
    asteroidRef.current = asteroid;

    return asteroid;
  }, [getQualitySettings]);

  // Enhanced trail system
  const createTrail = useCallback((scene) => {
    if (!scene) return null;
    
    const trailMaterial = new THREE.LineBasicMaterial({
      color: 0xff6b35,
      transparent: true,
      opacity: 0.8,
      linewidth: 2,
      blending: THREE.AdditiveBlending
    });

    const trailGeometry = new THREE.BufferGeometry();
    const trailPoints = [];
    
    trailGeometry.setAttribute('position', new THREE.Float32BufferAttribute(trailPoints, 3));
    const trail = new THREE.Line(trailGeometry, trailMaterial);
    
    scene.add(trail);
    trailRef.current = trail;
    
    return trail;
  }, []);

  // Realistic trajectory calculation
  const calculateTrajectory = useCallback((params) => {
    if (!params) return { start: new THREE.Vector3(), end: new THREE.Vector3() };

    const angle = ((parseFloat(params.approachAngle || params.angle) || 45) * Math.PI) / 180;
    const velocity = parseFloat(params.velocity) || 20;
    const size = parseFloat(params.asteroidSize || params.size) || 100;
    
    // Start position based on detection range
    const startDistance = Math.max(250, size * 1.5 + velocity * 3);
    
    const start = new THREE.Vector3(
      Math.cos(angle) * startDistance,
      Math.sin(angle) * startDistance * 0.3,
      Math.sin(angle + Math.PI/4) * startDistance * 0.7
    );
    
    // Impact point with gravitational deflection
    const gravitationalBend = velocity < 25 ? 0.08 : 0.03;
    const end = new THREE.Vector3(
      Math.cos(angle + Math.PI + gravitationalBend) * 31,
      Math.sin(angle + Math.PI + gravitationalBend) * 15,
      Math.sin(angle + Math.PI + gravitationalBend/2) * 31
    );

    return { start, end };
  }, []);

  // Enhanced impact effects
// Enhanced impact effects with realistic debris and original components maintained
const showImpactEffect = useCallback(() => {
    if (!sceneRef.current || !earthRef.current || !params) return;

    const quality = getQualitySettings();
    const velocity = parseFloat(params?.velocity) || 20;
    const size = parseFloat(params?.asteroidSize || params?.size) || 100;

    // Calculate realistic explosion intensity
    const explosionIntensity = Math.min(8, (velocity * size) / 800);

    // Get impact position from asteroid or default to surface
    const impactPosition = asteroidRef.current ? 
        asteroidRef.current.position.clone() : 
        new THREE.Vector3(0, 0, 30);

    // ===== ORIGINAL EXPLOSION STAGES (Enhanced) =====
    const explosionStages = [
        { color: 0xffffff, size: 0.8, opacity: 1.0, delay: 0 },
        { color: 0xffcc44, size: 1.5, opacity: 0.9, delay: 100 },
        { color: 0xff6644, size: 2.2, opacity: 0.7, delay: 200 },
        { color: 0xcc3322, size: 3.0, opacity: 0.5, delay: 300 }
    ];

    // Create realistic explosion sequence with original structure but enhanced visuals
    explosionStages.forEach((stage, stageIndex) => {
        setTimeout(() => {
            // Create multiple particles for each stage for more volume
            const particlesInStage = Math.min(quality.explosionParticles * 2, 60);
            
            for (let i = 0; i < particlesInStage; i++) {
                // Vary particle sizes for realistic distribution
                const baseSize = stage.size * explosionIntensity * 0.5;
                const sizeVariation = baseSize * (0.3 + Math.random() * 0.7);
                
                const particleGeometry = new THREE.IcosahedronGeometry(
                    sizeVariation, 
                    Math.random() > 0.7 ? 1 : 0 
                );

                // Enhanced materials with realistic properties
                const particleMaterial = new THREE.MeshBasicMaterial({
                    color: stage.color,
                    transparent: true,
                    opacity: stage.opacity * (0.7 + Math.random() * 0.3),
                    blending: THREE.AdditiveBlending
                });

                const particle = new THREE.Mesh(particleGeometry, particleMaterial);

                // Position particles in realistic explosion pattern
                const angle = (i / particlesInStage) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
                const elevation = (Math.random() - 0.5) * Math.PI * 0.3; // -54° to +54°
                const radius = 35 + stageIndex * 8 + Math.random() * 15;
                
                particle.position.set(
                    impactPosition.x + Math.cos(angle) * Math.cos(elevation) * radius,
                    impactPosition.y + Math.sin(elevation) * radius * 0.6,
                    impactPosition.z + Math.sin(angle) * Math.cos(elevation) * radius
                );

                sceneRef.current.add(particle);
                explosionParticlesRef.current.push(particle);

                // Realistic particle physics
                const startTime = Date.now();
                const duration = 1200 + stageIndex * 400 + Math.random() * 800;
                
                // Initial velocity based on explosion force
                const initialVelocity = new THREE.Vector3(
                    (particle.position.x - impactPosition.x) * 0.02,
                    Math.abs(particle.position.y - impactPosition.y) * 0.015 + 0.1,
                    (particle.position.z - impactPosition.z) * 0.02
                );

                const animateParticle = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = elapsed / duration;
                    
                    if (progress < 1 && particle.parent) {
                        // Apply gravity and air resistance
                        initialVelocity.y -= 0.025; // Gravity
                        initialVelocity.multiplyScalar(0.988); // Air resistance
                        
                        particle.position.add(initialVelocity);
                        
                        // Rotation for realism
                        particle.rotation.x += 0.03;
                        particle.rotation.y += 0.02;
                        
                        // Fade based on original timing
                        particle.material.opacity = stage.opacity * (1 - progress) * (0.7 + Math.random() * 0.3);
                        
                        requestAnimationFrame(animateParticle);
                    } else {
                        // Cleanup
                        if (particle.parent) sceneRef.current.remove(particle);
                        const index = explosionParticlesRef.current.indexOf(particle);
                        if (index > -1) explosionParticlesRef.current.splice(index, 1);
                    }
                };
                animateParticle();
            }
        }, stage.delay);
    });

    // ===== REALISTIC DEBRIS FIELD (Enhanced original concept) =====
    // Create various types of realistic debris that fall around the sides
    const debrisTypes = [
        {
            name: 'large_chunks',
            count: Math.min(25, quality.explosionParticles / 2),
            sizeRange: [1.0, 3.0],
            material: {
                color: 0x6b4423,
                shininess: 15,
                specular: 0x333333
            },
            physics: {
                initialSpeed: [0.8, 2.2],
                gravity: 0.02,
                airResistance: 0.995,
                bounce: 0.3
            }
        },
        {
            name: 'medium_rocks',
            count: Math.min(40, quality.explosionParticles),
            sizeRange: [0.3, 1.2],
            material: {
                color: 0x8b6f47,
                shininess: 8,
                specular: 0x222222
            },
            physics: {
                initialSpeed: [1.2, 3.0],
                gravity: 0.018,
                airResistance: 0.992,
                bounce: 0.4
            }
        },
        {
            name: 'small_fragments',
            count: Math.min(60, quality.explosionParticles * 1.5),
            sizeRange: [0.1, 0.5],
            material: {
                color: 0xa0845a,
                shininess: 5,
                specular: 0x111111
            },
            physics: {
                initialSpeed: [2.0, 4.5],
                gravity: 0.015,
                airResistance: 0.988,
                bounce: 0.5
            }
        }
    ];

    debrisTypes.forEach(debrisType => {
        for (let i = 0; i < debrisType.count; i++) {
            // Create realistic debris geometry
            const size = debrisType.sizeRange[0] + 
                Math.random() * (debrisType.sizeRange[1] - debrisType.sizeRange[0]);
            
            const geometry = new THREE.IcosahedronGeometry(size, Math.floor(Math.random() * 2));
            
            // Deform geometry for realistic irregular shapes
            const positions = geometry.attributes.position;
            const vertex = new THREE.Vector3();
            
            for (let j = 0; j < positions.count; j++) {
                vertex.fromBufferAttribute(positions, j);
                const deformation = 1.0 + (Math.random() - 0.5) * 0.4;
                vertex.multiplyScalar(deformation);
                positions.setXYZ(j, vertex.x, vertex.y, vertex.z);
            }
            positions.needsUpdate = true;
            geometry.computeVertexNormals();

            // Apply material with color variation
            const material = new THREE.MeshPhongMaterial({
                color: new THREE.Color(debrisType.material.color).offsetHSL(
                    (Math.random() - 0.5) * 0.1, // Slight hue variation
                    (Math.random() - 0.5) * 0.2, // Saturation variation
                    (Math.random() - 0.5) * 0.3  // Lightness variation
                ),
                shininess: debrisType.material.shininess,
                specular: debrisType.material.specular
            });

            const debris = new THREE.Mesh(geometry, material);
            
            // Position debris realistically around impact
            const ejectionAngle = Math.random() * Math.PI * 2;
            const ejectionElevation = Math.random() * Math.PI * 0.4; // 0° to 72°
            const distance = 32 + Math.random() * 8; // Start just above Earth surface
            
            debris.position.set(
                Math.cos(ejectionAngle) * Math.cos(ejectionElevation) * distance,
                Math.sin(ejectionElevation) * distance,
                Math.sin(ejectionAngle) * Math.cos(ejectionElevation) * distance
            );

            // Add shadows if supported
            if (quality.enableShadows) {
                debris.castShadow = true;
                debris.receiveShadow = true;
            }

            sceneRef.current.add(debris);
            explosionParticlesRef.current.push(debris);

            // Calculate realistic initial velocity
            const speed = debrisType.physics.initialSpeed[0] + 
                Math.random() * (debrisType.physics.initialSpeed[1] - debrisType.physics.initialSpeed[0]);
            
            const velocity = new THREE.Vector3(
                (debris.position.x - impactPosition.x) * speed * 0.03,
                Math.max(0.5, Math.abs(debris.position.y - impactPosition.y) * speed * 0.02),
                (debris.position.z - impactPosition.z) * speed * 0.03
            );

            // Add some upward bias for realistic trajectory
            velocity.y += speed * 0.5;

            // Random rotation rates
            const rotationRate = new THREE.Vector3(
                (Math.random() - 0.5) * 0.1,
                (Math.random() - 0.5) * 0.1,
                (Math.random() - 0.5) * 0.1
            );

            const startTime = Date.now();
            const lifetime = 4000 + Math.random() * 6000; // 4-10 seconds

            const animateDebris = () => {
                const elapsed = Date.now() - startTime;
                const progress = elapsed / lifetime;

                if (progress < 1 && debris.parent) {
                    // Apply physics
                    velocity.y -= debrisType.physics.gravity;
                    velocity.multiplyScalar(debrisType.physics.airResistance);
                    debris.position.add(velocity.clone().multiplyScalar(0.016));
                    
                    // Apply rotation
                    debris.rotation.x += rotationRate.x;
                    debris.rotation.y += rotationRate.y;
                    debris.rotation.z += rotationRate.z;

                    // Ground collision detection
                    const distanceFromCenter = debris.position.length();
                    if (distanceFromCenter <= 30.5 && velocity.length() > 0.1) {
                        // Bounce off surface
                        const normal = debris.position.clone().normalize();
                        const velocityDotNormal = velocity.dot(normal);
                        
                        if (velocityDotNormal < 0) {
                            velocity.sub(normal.clone().multiplyScalar(
                                velocityDotNormal * (1 + debrisType.physics.bounce)
                            ));
                            
                            // Position just above surface
                            debris.position.copy(normal.multiplyScalar(30.6));
                        }
                    }

                    // Fade out in final 25% of lifetime
                    if (progress > 0.75) {
                        const fadeProgress = (progress - 0.75) / 0.25;
                        debris.material.opacity = 1 - fadeProgress;
                        debris.material.transparent = true;
                    }

                    requestAnimationFrame(animateDebris);
                } else {
                    // Cleanup
                    if (debris.parent) sceneRef.current.remove(debris);
                    const index = explosionParticlesRef.current.indexOf(debris);
                    if (index > -1) explosionParticlesRef.current.splice(index, 1);
                }
            };
            
            // Stagger debris animation starts
            setTimeout(() => {
                animateDebris();
            }, Math.random() * 300);
        }
    });

    // ===== ORIGINAL CAMERA SHAKE (Enhanced) =====
    if (cameraRef.current) {
        const shakeIntensity = Math.min(10, explosionIntensity * 2.5);
        
        // Create realistic shake pattern - strong initial shake that diminishes
        gsap.to(cameraRef.current.position, {
            x: `+=${(Math.random() - 0.5) * shakeIntensity}`,
            y: `+=${(Math.random() - 0.5) * shakeIntensity}`,
            z: `+=${(Math.random() - 0.5) * shakeIntensity}`,
            duration: 0.05,
            repeat: 20,
            yoyo: true,
            ease: "power2.inOut",
            // Gradually reduce intensity
            onUpdate: function() {
                const progress = this.progress();
                const damping = 1 - (progress * 0.8);
                this.vars.x = `+=${(Math.random() - 0.5) * shakeIntensity * damping}`;
                this.vars.y = `+=${(Math.random() - 0.5) * shakeIntensity * damping}`;
                this.vars.z = `+=${(Math.random() - 0.5) * shakeIntensity * damping}`;
            }
        });
    }

    // ===== ORIGINAL SHOCKWAVE (Enhanced with realism) =====
    const shockwaveGeometry = new THREE.RingGeometry(0.1, 1, 64); // Higher resolution
    const shockwaveMaterial = new THREE.MeshBasicMaterial({
        color: 0xffa500,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending
    });
    
    shockwaveRef.current = new THREE.Mesh(shockwaveGeometry, shockwaveMaterial);
    shockwaveRef.current.position.copy(impactPosition);
    shockwaveRef.current.lookAt(0, 0, 0);
    sceneRef.current.add(shockwaveRef.current);

    // Enhanced shockwave animation with realistic expansion
    gsap.to(shockwaveRef.current.scale, {
        x: 120, y: 120, z: 120,
        duration: 3.5,
        ease: "power1.out"
    });
    
    gsap.to(shockwaveRef.current.material, {
        opacity: 0,
        duration: 3.5,
        ease: "power2.out",
        onComplete: () => {
            if (shockwaveRef.current && sceneRef.current) {
                sceneRef.current.remove(shockwaveRef.current);
                shockwaveRef.current = null;
            }
        }
    });

    // ===== ORIGINAL ATMOSPHERE EFFECTS (Enhanced) =====
    if (atmosphereRef.current) {
        const originalOpacity = atmosphereRef.current.material.opacity;
        const originalColor = atmosphereRef.current.material.color.clone();
        
        // Realistic atmospheric compression and heating
        gsap.timeline()
            .to(atmosphereRef.current.material, {
                opacity: originalOpacity + 0.15,
                duration: 0.1,
                ease: "power2.out"
            })
            .to(atmosphereRef.current.material.color, {
                r: 1.0, g: 0.7, b: 0.4, // Heated atmosphere color
                duration: 0.2
            }, 0)
            .to(atmosphereRef.current.material, {
                opacity: originalOpacity + 0.08,
                duration: 0.8,
                ease: "power1.out"
            })
            .to(atmosphereRef.current.material, {
                opacity: originalOpacity,
                duration: 3.0,
                ease: "power2.out"
            })
            .to(atmosphereRef.current.material.color, {
                r: originalColor.r,
                g: originalColor.g,
                b: originalColor.b,
                duration: 4.0,
                ease: "power2.out"
            }, 1);
    }

    // ===== ADDITIONAL REALISTIC DUST EFFECTS =====
    // Create settling dust that falls more slowly
    setTimeout(() => {
        const dustCount = Math.min(80, quality.particleCount / 3);
        
        for (let i = 0; i < dustCount; i++) {
            const dustGeometry = new THREE.SphereGeometry(0.05 + Math.random() * 0.15, 4, 4);
            const dustMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(0.08, 0.3, 0.3 + Math.random() * 0.3),
                transparent: true,
                opacity: 0.4 + Math.random() * 0.3
            });
            
            const dust = new THREE.Mesh(dustGeometry, dustMaterial);
            
            // Start position above impact
            const angle = Math.random() * Math.PI * 2;
            const radius = 25 + Math.random() * 40;
            const height = 40 + Math.random() * 30;
            
            dust.position.set(
                Math.cos(angle) * radius,
                height,
                Math.sin(angle) * radius
            );
            
            sceneRef.current.add(dust);
            explosionParticlesRef.current.push(dust);
            
            // Slow settling motion
            const fallVelocity = -(0.3 + Math.random() * 0.4);
            const driftVelocity = new THREE.Vector3(
                (Math.random() - 0.5) * 0.2,
                0,
                (Math.random() - 0.5) * 0.2
            );
            
            const animateDust = () => {
                dust.position.y += fallVelocity * 0.016;
                dust.position.add(driftVelocity.clone().multiplyScalar(0.016));
                
                // Fade as it settles
                dust.material.opacity *= 0.999;
                
                if (dust.position.y > 20 && dust.material.opacity > 0.01) {
                    requestAnimationFrame(animateDust);
                } else {
                    if (dust.parent) sceneRef.current.remove(dust);
                    const index = explosionParticlesRef.current.indexOf(dust);
                    if (index > -1) explosionParticlesRef.current.splice(index, 1);
                }
            };
            
            setTimeout(() => animateDust(), Math.random() * 1000);
        }
    }, 500);

}, [getQualitySettings, params]);

  // Enhanced animation system
    const startAnimation = useCallback(() => {
    if (!sceneRef.current || !asteroidRef.current || !params) return;
    if (isPlaying) return;

    if (controlsRef.current) {
      controlsRef.current.enabled = false;
    }

    setIsPlaying(true);
    setCurrentTime(0);

    const { start, end } = calculateTrajectory(params);
    asteroidRef.current.position.copy(start);
    asteroidRef.current.visible = true;

    const velocity = parseFloat(params.velocity) || 20;
    const duration = Math.max(4000, animationTime / Math.max(1, velocity / 25));
    const startTime = Date.now();
    const originalCameraPos = cameraRef.current.position.clone();
    const earthRadius = 30;

    // Add back variables needed for trail and quality
    const trailPoints = [];
    const quality = getQualitySettings();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCurrentTime(progress * 100);

      const targetPosition = end.clone().normalize().multiplyScalar(earthRadius);
      const currentPos = start.clone().lerp(targetPosition, progress);
      asteroidRef.current.position.copy(currentPos);

      const rotationSpeed = 0.02 * (1 + velocity / 50);
      asteroidRef.current.rotation.x += rotationSpeed * 0.7;
      asteroidRef.current.rotation.y += rotationSpeed * 1.2;
      asteroidRef.current.rotation.z += rotationSpeed * 0.5;
      

      // --- ADDED BACK: Enhanced camera modes ---
      switch (cameraMode) {
        case 'follow':
          if (progress > 0.15 && progress < 0.95) { // Adjusted to follow closer to impact
            const followPos = currentPos.clone().add(new THREE.Vector3(50, 35, 80));
            cameraRef.current.position.lerp(followPos, 0.025);
            cameraRef.current.lookAt(currentPos);
          }
          break;
        case 'cinematic':
          if (progress < 0.25) {
            const widePos = new THREE.Vector3(0, 120, 250);
            cameraRef.current.position.lerp(widePos, 0.015);
            cameraRef.current.lookAt(currentPos);
          } else if (progress < 0.8) { // Adjusted timing
            const followPos = currentPos.clone().add(new THREE.Vector3(70, 25, 100));
            cameraRef.current.position.lerp(followPos, 0.03);
            cameraRef.current.lookAt(currentPos);
          } else {
            const closePos = new THREE.Vector3(15, 15, 60);
            cameraRef.current.position.lerp(closePos, 0.05);
            cameraRef.current.lookAt(0, 0, 0);
          }
          break;
        default: // orbital - no change needed
          break;
      }

      // --- ADDED BACK: Enhanced trail with fade effect ---
      if (progress > 0.03) {
        trailPoints.push(currentPos.x, currentPos.y, currentPos.z);
        const maxTrailLength = quality.trailLength;
        if (trailPoints.length > maxTrailLength * 3) {
          trailPoints.splice(0, 6);
        }
        if (trailRef.current) {
          trailRef.current.geometry.setAttribute('position', new THREE.Float32BufferAttribute(trailPoints, 3));
          trailRef.current.geometry.attributes.position.needsUpdate = true;
        }
      }

      const distanceToCenter = asteroidRef.current.position.length();
const altitude = distanceToCenter - earthRadius;

// Check if the asteroid is in the upper atmosphere and not already burning
if (altitude < 100 && !entryGlowRef.current) {
    // Create a bright, fiery point light attached to the asteroid
    const entryLight = new THREE.PointLight(0xffa500, 5, 60); // Orange color, high intensity, medium range
    asteroidRef.current.add(entryLight);
    entryGlowRef.current = entryLight; // Store the light in our ref

    // Make the asteroid material itself glow hot
    asteroidRef.current.material.emissive = new THREE.Color(0xffa500);
    gsap.to(asteroidRef.current.material, {
        emissiveIntensity: 2.5, // Make it glow very brightly
        duration: 1.0
    });
}
      let hasImpacted = distanceToCenter <= earthRadius;

      fpsCounterRef.current.frames++;
      const now = Date.now();
      if (now - fpsCounterRef.current.lastTime >= 1000) {
        setFps(fpsCounterRef.current.frames);
        fpsCounterRef.current.frames = 0;
        fpsCounterRef.current.lastTime = now;
      }

      if (progress >= 1 || hasImpacted) {
        setIsPlaying(false);
        showImpactEffect();

        if (entryGlowRef.current) {
      asteroidRef.current.remove(entryGlowRef.current);
      entryGlowRef.current = null;
      // Instantly turn off the material's glow
      asteroidRef.current.material.emissiveIntensity = 0;
  }
        asteroidRef.current.visible = false; 

        setTimeout(() => {
          const resetCamera = () => {
            cameraRef.current.position.lerp(originalCameraPos, 0.04);
            cameraRef.current.lookAt(0, 0, 0);
            if (cameraRef.current.position.distanceTo(originalCameraPos) > 3) {
              requestAnimationFrame(resetCamera);
            } else {
              if (controlsRef.current) {
                controlsRef.current.enabled = true;
              }
              onAnimationEnd?.();
            }
          };
          resetCamera();
        }, 1800);
      } else {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animate();
}, [params, animationTime, calculateTrajectory, showImpactEffect, cameraMode, getQualitySettings, isPlaying, onAnimationEnd]);

const handleInCanvasRunClick = () => {
    if (inCanvasLoadingProgress !== null) return; // Prevent multiple clicks

    let progress = 0;
    setInCanvasLoadingProgress(progress);

    const interval = setInterval(() => {
        progress += 5; // Increment progress
        setInCanvasLoadingProgress(progress);

        if (progress >= 100) {
            clearInterval(interval);
            // After loading is complete, run the actual simulation
            onRunSimulation?.();
            // Reset the loading state after a short delay
            setTimeout(() => setInCanvasLoadingProgress(null), 1000);
        }
    }, 80); // Adjust timing for a smooth ~1.6 second load time
};

  // Enhanced render loop with realistic Earth/cloud rotation
  useEffect(() => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;

    let frameId;
    
    const render = () => {
      // Earth rotation (24-hour cycle scaled down)
      if (earthRef.current) {
        earthRef.current.rotation.y += 0.0008;
        
        // Clouds rotate slightly faster for realism
        const clouds = earthRef.current.children.find(child => 
          child.material && child.material.map === texturesRef.current.earthClouds
        );
        if (clouds) {
          clouds.rotation.y += 0.001;
        }
      }

       if (moonRef.current) {
      const time = Date.now() * 0.0001; // Controls the speed of revolution
      const orbitRadius = 90;
      moonRef.current.position.x = Math.cos(time) * orbitRadius;
      moonRef.current.position.z = Math.sin(time) * orbitRadius;

       moonRef.current.rotation.y += 0.002; // Moon's own rotation
       }

      // MODIFICATION: Check for user interaction before auto-rotating
      if (isAutoRotate && !isUserInteracting && cameraRef.current && !isPlaying && cameraMode === 'orbital') {
        const radius = 180;
        const time = Date.now() * 0.0003;
        cameraRef.current.position.x = Math.cos(time) * radius;
        cameraRef.current.position.z = Math.sin(time) * radius;
        cameraRef.current.lookAt(0, 0, 0);
      }

      // MODIFICATION: Update controls on each frame for smooth damping
      if (controlsRef.current) {
        controlsRef.current.update();
      }

      rendererRef.current.render(sceneRef.current, cameraRef.current);
      frameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [isAutoRotate, isPlaying, cameraMode, isUserInteracting]);

  // Enhanced responsive resize handler
  const handleResize = useCallback(() => {
  if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;

  const { width, height } = getResponsiveDimensions();

  cameraRef.current.aspect = width / height;
  cameraRef.current.updateProjectionMatrix();
  rendererRef.current.setSize(width, height, false);

  if (width < 600 && qualityLevel === 'ultra') {
    setQualityLevel('high');
  }
}, [getResponsiveDimensions, qualityLevel]); // Added dependencies

useEffect(() => {
  const resizeObserver = new ResizeObserver(handleResize);
  if (mountRef.current) {
    resizeObserver.observe(mountRef.current);
  }
  window.addEventListener('resize', handleResize);

  return () => {
    resizeObserver.disconnect();
    window.removeEventListener('resize', handleResize);
  };
}, [handleResize]);

  // Initialize scene only after component mount
  useEffect(() => {
    const initScene = async () => {
      const result = await initializeScene();
      if (result.scene) {
        createTrail(result.scene);
      }
    };
    
    initScene();
    
    return () => {
      // MODIFICATION: Dispose of controls on component unmount
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      // Cleanup textures
      Object.values(texturesRef.current).forEach(texture => {
        if (texture.dispose) texture.dispose();
      });
    };
  }, [initializeScene, createTrail]);

  // Update asteroid when params change (only if textures loaded)
  useEffect(() => {
    if (!sceneRef.current || !params || !texturesLoaded) return;

    if (asteroidRef.current) {
      sceneRef.current.remove(asteroidRef.current);
    }

    createAsteroid(sceneRef.current, params);
    
    if (asteroidRef.current) {
      const { start } = calculateTrajectory(params);
      asteroidRef.current.position.copy(start);
    }
  }, [params, createAsteroid, calculateTrajectory, texturesLoaded]);

  // Fixed simulation trigger - prevent multiple runs
  useEffect(() => {
    if (!params || !texturesLoaded) return;

    // Create a unique identifier for current simulation parameters
    const currentParamsId = JSON.stringify({
      size: params.asteroidSize || params.size,
      velocity: params.velocity,
      composition: params.composition,
      angle: params.approachAngle || params.angle,
      isSimulating
    });

    // Only start animation if simulation is triggered and parameters have changed
    if (isSimulating && !isPlaying && currentParamsId !== lastSimulationParamsRef.current) {
      lastSimulationParamsRef.current = currentParamsId;
      startAnimation();
    }
    
    // Update the reference when simulation stops
    if (!isSimulating) {
      lastSimulationParamsRef.current = null;
    }
  }, [isSimulating, isPlaying, startAnimation, params, texturesLoaded]);

  // Utility functions
  const getCompositionColor = useCallback((composition) => {
    const colors = {
      rock: '#8b5cf6',
      metal: '#6b7280', 
      ice: '#22d3ee',
      mixed: '#f97316'
    };
    return colors[composition] || colors.rock;
  }, []);

  const getVelocityBadge = useCallback((velocity) => {
    const vel = parseFloat(velocity) || 20;
    if (vel < 15) return { color: 'bg-mission-green', text: 'SLOW' };
    if (vel < 30) return { color: 'bg-plasma-orange', text: 'MODERATE' };
    if (vel < 50) return { color: 'bg-destructive', text: 'FAST' };
    return { color: 'bg-destructive', text: 'EXTREME' };
  }, []);

  const getSizeThreat = useCallback((size) => {
    const sizeNum = parseInt(size);
    if (sizeNum < 25) return { level: "Atmospheric", color: "text-mission-green", icon: "🔥" };
    if (sizeNum < 140) return { level: "Local", color: "text-plasma-orange", icon: "🏘️" };
    if (sizeNum < 1000) return { level: "Regional", color: "text-destructive", icon: "🏙️" };
    return { level: "Global", color: "text-destructive", icon: "🌍" };
  }, []);

  const handleToggleFullscreen = () => {
  if (fullscreenContainerRef.current) { // Use the correct ref here
    if (!document.fullscreenElement) {
      fullscreenContainerRef.current.requestFullscreen().catch((err) => {
        alert(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }
};
// Add this useEffect hook
useEffect(() => {
  const onFullscreenChange = () => {
    setIsFullscreen(!!document.fullscreenElement);
    setTimeout(handleResize, 50); 
  };
  document.addEventListener('fullscreenchange', onFullscreenChange);
  return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
}, [handleResize]);


  return (
    <Card className="bg-card/60 backdrop-blur-xl border border-quantum-blue/30 shadow-command relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 right-4 w-16 h-16 sm:w-32 sm:h-32 bg-quantum-blue rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-4 left-4 w-12 h-12 sm:w-24 sm:h-24 bg-stellar-cyan rounded-full blur-2xl animate-float-gentle" />
      </div>

      <CardHeader className="relative z-10 pb-2 sm:pb-3 px-3 sm:px-6">
        <CardTitle className="flex flex-col space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="p-2 sm:p-3 rounded-xl bg-gradient-quantum shadow-command">
                <Orbit className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <span className="text-sm sm:text-base lg:text-lg font-bold text-quantum-blue tracking-wide">
                  ORBITAL SIMULATION
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 flex-wrap gap-1">
              <Badge 
                className="text-white border-0 text-xs flex-shrink-0"
                style={{ backgroundColor: getCompositionColor(params?.composition) }}
              >
                {params?.composition?.toUpperCase() || 'ROCK'}
              </Badge>
              {showDebugInfo && (
                <Badge variant="outline" className="text-xs text-mission-green border-mission-green/30">
                  {fps} FPS
                </Badge>
              )}
              <Badge variant="outline" className={`text-xs ${texturesLoaded ? 'text-mission-green border-mission-green/30' : 'text-plasma-orange border-plasma-orange/30'}`}>
                {texturesLoaded ? 'READY' : 'LOADING'}
              </Badge>
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 sm:space-y-4 relative z-10 px-3 sm:px-6 pb-4">
        {/* 3D Visualization Container - Fixed Sizing */}
        <div ref={fullscreenContainerRef} className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900 rounded-lg border border-quantum-blue/30 overflow-hidden shadow-inner">
         <div 
            ref={mountRef} 
            className="w-full h-full" 
            style={{ 
              height: isFullscreen 
                ? '100%' 
                : (window.innerWidth < 640 ? '320px' : window.innerWidth < 1024 ? '400px' : '480px')
            }}
          />

          {/* --- ADD THIS NEW BLOCK for the fullscreen Run button --- */}
      {isFullscreen && !isPlaying && (
  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
    <Button 
      onClick={handleInCanvasRunClick}
      className="interactive-button relative bg-gradient-quantum hover:shadow-command transition-all duration-300 h-12 w-48 px-6 group border-0 text-white font-semibold overflow-hidden"
      disabled={inCanvasLoadingProgress !== null}
    >
      {/* Background element for progress */}
      <div 
        className="absolute top-0 left-0 h-full bg-mission-green/50 transition-all duration-150"
        style={{ width: `${inCanvasLoadingProgress}%` }}
      />

      {/* Text and Icon */}
      <div className="relative z-10 flex items-center justify-center w-full">
        {inCanvasLoadingProgress !== null ? (
          <>
            <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin mr-2" />
            <span>Loading... {inCanvasLoadingProgress}%</span>
          </>
        ) : (
          <>
            <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            <span>Run Simulation</span>
          </>
        )}
      </div>
    </Button>
  </div>
)}
          
          {/* Enhanced Control Overlay */}
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex flex-col space-y-2">
            <div className="flex space-x-1 sm:space-x-2">

              

              <Toggle
                pressed={isAutoRotate}
                onPressedChange={setIsAutoRotate}
                className="bg-background/25 backdrop-blur-sm border-quantum-blue/30 w-8 h-8 sm:w-10 sm:h-10"
                size="sm"
              >
                <RotateCw className="w-3 h-3 sm:w-4 sm:h-4" />
              </Toggle>

              
              
              <Toggle
                pressed={showDebugInfo}
                onPressedChange={setShowDebugInfo}
                className="bg-background/25 backdrop-blur-sm border-quantum-blue/30 w-8 h-8 sm:w-10 sm:h-10"
                size="sm"
              >
                <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
              </Toggle>
            </div>
            
            <div className="flex space-x-1 sm:space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="bg-background/25 backdrop-blur-sm border border-quantum-blue/30 w-8 h-8 sm:w-10 sm:h-10 p-0"
                onClick={() => setCameraMode(cameraMode === 'orbital' ? 'follow' : 
                                          cameraMode === 'follow' ? 'cinematic' : 'orbital')}
              >
                <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
              
               <Toggle
                  pressed={isFullscreen}
                  onPressedChange={handleToggleFullscreen}
                  className="bg-background/25 backdrop-blur-sm border-quantum-blue/30 w-8 h-8 sm:w-10 sm:h-10"
                  size="sm"
                >
                  {isFullscreen ? <Minimize className="w-3 h-3 sm:w-4 sm:h-4" /> : <Maximize className="w-3 h-3 sm:w-4 sm:h-4" />}
                </Toggle>
            </div>
          </div>

          {/* Status Overlay */}
          <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 space-y-2">
            <div className="bg-background/25 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1 sm:py-2 border border-quantum-blue/20">
              <div className="text-xs text-white font-medium">
                {!texturesLoaded ? (
                  <span className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-plasma-orange rounded-full animate-pulse" />
                    <span className="hidden sm:inline">LOADING TEXTURES</span>
                    <span className="sm:hidden">LOADING</span>
                  </span>
                ) : isPlaying ? (
                  <span className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
                    <span className="hidden sm:inline">IMPACT SIMULATION</span>
                    <span className="sm:hidden">SIMULATING</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-mission-green rounded-full" />
                    <span className="hidden sm:inline">VISUALIZATION READY</span>
                    <span className="sm:hidden">READY</span>
                  </span>
                )}
              </div>
            </div>
            
            {showDebugInfo && (
              <div className="bg-background/25 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1 sm:py-2 border border-quantum-blue/20">
                <div className="text-xs text-white space-y-1">
                  <div>Camera: {cameraMode.toUpperCase()}</div>
                  <div>Quality: {qualityLevel.toUpperCase()}</div>
                  <div>FPS: {fps}</div>
                  <div>Textures: {texturesLoaded ? 'LOADED' : 'LOADING'}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Simplified Progress Display */}
        {isPlaying && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground font-medium">Simulation Progress</span>
              <span className="font-mono font-bold text-quantum-blue">
                {currentTime.toFixed(1)}%
              </span>
            </div>
            <Progress 
              value={currentTime} 
              className="h-2 sm:h-3 bg-muted/30"
            />
            <div className="text-xs text-center text-muted-foreground font-mono">
              T-{((100 - currentTime) / 100 * (animationTime / 1000)).toFixed(1)}s to impact
            </div>
          </div>
        )}

        {/* Enhanced Trajectory Information */}
        {params && (
          <div className="bg-gradient-to-r from-card/60 via-card/40 to-card/60 backdrop-blur-sm rounded-xl border border-quantum-blue/20 p-4 space-y-4">
            <div className="flex items-center space-x-2 mb-3">
              <Eye className="w-4 h-4 text-quantum-blue" />
              <span className="text-sm font-bold text-quantum-blue uppercase tracking-wide">Trajectory Analysis</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Entry Angle */}
              <div className="flex flex-col space-y-2 p-3 bg-plasma-orange/10 rounded-lg border border-plasma-orange/20">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-plasma-orange" />
                  <span className="text-xs font-medium text-plasma-orange uppercase">Entry Angle</span>
                </div>
                <div className="text-xl font-bold text-foreground">
                  {params.approachAngle || params.angle || '45'}°
                </div>
                <div className="text-xs text-muted-foreground">
                  Impact trajectory angle
                </div>
              </div>
              
              {/* Velocity */}
              <div className="flex flex-col space-y-2 p-3 bg-stellar-cyan/10 rounded-lg border border-stellar-cyan/20">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-stellar-cyan" />
                  <span className="text-xs font-medium text-stellar-cyan uppercase">Velocity</span>
                </div>
                <div className="text-xl font-bold text-foreground">
                  {params.velocity || '20'} km/s
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={`${getVelocityBadge(params.velocity).color} text-white text-xs`}>
                    {getVelocityBadge(params.velocity).text}
                  </Badge>
                </div>
              </div>
              
              {/* Object Classification */}
              <div className="flex flex-col space-y-2 p-3 bg-quantum-blue/10 rounded-lg border border-quantum-blue/20">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-quantum-blue" />
                  <span className="text-xs font-medium text-quantum-blue uppercase">Object</span>
                </div>
                <div className="text-lg font-bold text-foreground">
                  {params.asteroidSize || params.size || '100'}m
                </div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    className="text-white text-xs"
                    style={{ backgroundColor: getCompositionColor(params.composition) }}
                  >
                    {params.composition?.toUpperCase() || 'ROCKY'}
                  </Badge>
                  <Badge className={`${getSizeThreat(params.asteroidSize || params.size).color.replace('text-', 'bg-')} text-white text-xs`}>
                    {getSizeThreat(params.asteroidSize || params.size).level}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Threat Assessment */}
            <div className="p-3 bg-muted/10 rounded-lg border border-border/30">
              <div className="flex items-center space-x-2 mb-2">
                <Gauge className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground uppercase">Threat Assessment</span>
              </div>
              <div className="text-sm text-foreground">
                {getSizeThreat(params.asteroidSize || params.size).icon} {getSizeThreat(params.asteroidSize || params.size).level} impact threat with {getVelocityBadge(params.velocity).text.toLowerCase()} velocity approach
              </div>
            </div>
          </div>
        )}

        {/* Original Camera and Quality Controls - Compact Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Camera</label>
            <div className="grid grid-cols-3 gap-1">
              {['orbit', 'follow', 'cinematic'].map((mode) => (
                <Button
                  key={mode}
                  variant={cameraMode === mode ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCameraMode(mode)}
                  className={`text-xs h-8 ${cameraMode === mode ? 'bg-gradient-quantum' : ''}`}
                >
                  <span className="hidden sm:inline">{mode.toUpperCase()}</span>
                  <span className="sm:hidden">{mode.toUpperCase().slice(0, 6)}</span>
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Quality</label>
            <div className="grid grid-cols-3 gap-1">
              {['med', 'high', 'ultra'].map((quality) => (
                <Button
                  key={quality}
                  variant={qualityLevel === quality ? "default" : "outline"}
                  size="sm"
                  onClick={() => setQualityLevel(quality)}
                  disabled={window.innerWidth < 768 && quality !== 'medium'} // Add this line
                  className={`text-xs h-8 ${qualityLevel === quality ? 'bg-gradient-quantum' : ''}`}
                >
                  <span className="hidden sm:inline">{quality.toUpperCase()}</span>
                  <span className="sm:hidden">{quality.toUpperCase().slice(0, 5)}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

OrbitalVisualization3D.propTypes = {
  params: PropTypes.shape({
    asteroidSize: PropTypes.string,
    size: PropTypes.string,
    velocity: PropTypes.string,
    composition: PropTypes.string,
    approachAngle: PropTypes.string,
    angle: PropTypes.string
  }),
  isSimulating: PropTypes.bool,
  animationTime: PropTypes.number
};

export default OrbitalVisualization3D;