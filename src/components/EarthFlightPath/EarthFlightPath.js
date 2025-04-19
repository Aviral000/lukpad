import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background: #000;
  z-index: 1;
`;

const InfoPanel = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 20px;
  border-radius: 10px;
  font-family: 'Dancing Script', cursive;
  z-index: 100;
`;

const Title = styled.h2`
  font-family: 'Pacifico', cursive;
  color: #ff6b6b;
  margin: 0 0 10px 0;
`;

const Distance = styled.div`
  font-size: 1.5rem;
  color: #ffb4b4;
  margin-top: 10px;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: 'Dancing Script', cursive;
  font-size: 2rem;
  z-index: 200;
`;

export const EarthFlightPath = () => {
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Camera position
    camera.position.z = 3;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 1.5;
    controls.maxDistance = 5;

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Earth Group (this will contain the earth and all markers/paths)
    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    // Earth
    const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
    const textureLoader = new THREE.TextureLoader();
    
    // Load textures
    const earthTexture = textureLoader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg',
      () => setLoading(false),
      undefined,
      (error) => {
        console.error('Error loading texture:', error);
        setLoading(false);
      }
    );
    
    const earthBumpMap = textureLoader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg'
    );
    
    const earthSpecularMap = textureLoader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg'
    );

    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpMap: earthBumpMap,
      bumpScale: 0.05,
      specularMap: earthSpecularMap,
      specular: new THREE.Color('grey')
    });

    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earthGroup.add(earth); // Add earth to the group

    // Atmosphere
    const atmosphereGeometry = new THREE.SphereGeometry(1.1, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.8 - dot(vNormal, vec3(0, 0, 1.0)), 4.0);
          gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true
    });

    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    earthGroup.add(atmosphere); // Add atmosphere to the group

    // Flight path coordinates
    const bengaluruCoords = { lat: 12.9716, lon: 77.5946 };
    const cebuCoords = { lat: 10.3157, lon: 123.8854 };

    // Convert lat/lon to 3D coordinates
    function latLonToVector3(lat, lon, radius = 1) {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);

      const x = -radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);

      return new THREE.Vector3(x, y, z);
    }

    const bengaluruVector = latLonToVector3(bengaluruCoords.lat, bengaluruCoords.lon);
    const cebuVector = latLonToVector3(cebuCoords.lat, cebuCoords.lon);

    // Create markers for cities
    const markerGeometry = new THREE.SphereGeometry(0.02, 16, 16);
    const bengaluruMarker = new THREE.Mesh(
      markerGeometry,
      new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
    bengaluruMarker.position.copy(bengaluruVector);
    earthGroup.add(bengaluruMarker); // Add marker to the group

    const cebuMarker = new THREE.Mesh(
      markerGeometry,
      new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
    cebuMarker.position.copy(cebuVector);
    earthGroup.add(cebuMarker); // Add marker to the group

    // Create flight path (curved path along the Earth's surface)
    const curvePoints = [];
    const curvePointsCount = 100;
    for (let i = 0; i <= curvePointsCount; i++) {
      const t = i / curvePointsCount;
      const point = new THREE.Vector3().lerpVectors(bengaluruVector, cebuVector, t);
      point.normalize().multiplyScalar(1.02); // Slightly above the surface
      curvePoints.push(point);
    }

    const spline = new THREE.CatmullRomCurve3(curvePoints);
    const flightPathGeometry = new THREE.TubeGeometry(spline, 100, 0.003, 8, false);
    const flightPathMaterial = new THREE.MeshBasicMaterial({ color: 0xffb4b4 });
    const flightPath = new THREE.Mesh(flightPathGeometry, flightPathMaterial);
    earthGroup.add(flightPath); // Add flight path to the group

    // Create airplane
    const airplaneGeometry = new THREE.ConeGeometry(0.01, 0.03, 8);
    const airplaneMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const airplane = new THREE.Mesh(airplaneGeometry, airplaneMaterial);
    earthGroup.add(airplane); // Add airplane to the group

    // Calculate distance (Great Circle Distance)
    function calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371; // Earth's radius in km
      const φ1 = lat1 * Math.PI / 180;
      const φ2 = lat2 * Math.PI / 180;
      const Δφ = (lat2 - lat1) * Math.PI / 180;
      const Δλ = (lon2 - lon1) * Math.PI / 180;

      const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

      return (R * c).toFixed(0);
    }

    const distance = calculateDistance(bengaluruCoords.lat, bengaluruCoords.lon, cebuCoords.lat, cebuCoords.lon);

    // Animation
    let t = 0;
    const animate = () => {
      requestAnimationFrame(animate);

      // Animate airplane along path
      t += 0.002;
      if (t > 1) t = 0;
      
      const position = spline.getPointAt(t);
      airplane.position.copy(position);
      
      // Orient airplane along path
      const tangent = spline.getTangentAt(t);
      const axis = new THREE.Vector3(0, 1, 0);
      airplane.quaternion.setFromUnitVectors(axis, tangent.normalize());

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      earthGeometry.dispose();
      earthMaterial.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      markerGeometry.dispose();
      flightPathGeometry.dispose();
      flightPathMaterial.dispose();
      airplaneGeometry.dispose();
      airplaneMaterial.dispose();
    };
  }, []);

  return (
    <Container ref={containerRef}>
      {loading && (
        <LoadingOverlay>
          Loading Earth...
        </LoadingOverlay>
      )}
      <InfoPanel>
        <Title>Our Love Spans Continents</Title>
        <div>Bengaluru, India ➔ Tacloban City, Philippines</div>
        <Distance>Distance: ~5,143 km</Distance>
        <div style={{ marginTop: '10px', color: '#888', fontSize: '0.9rem' }}>
          Yet our hearts know no distance
        </div>
      </InfoPanel>
    </Container>
  );
};
