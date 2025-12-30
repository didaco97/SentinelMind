import { useEffect, useRef, useState, useMemo } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';

// Type for our random arcs
interface ArcData {
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
    color: string | string[];
}

export const CyberGlobe = () => {
    const globeEl = useRef<GlobeMethods | undefined>(undefined);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    // Handle resize to keep globe responsive
    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight
                });
            }
        };

        // Initial sizing
        updateDimensions();

        // Observer for robust resizing
        const resizeObserver = new ResizeObserver(() => {
            updateDimensions();
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => resizeObserver.disconnect();
    }, []);

    // Generate random "threat" data
    const arcsData = useMemo(() => {
        const N = 20; // Number of active threats
        return [...Array(N).keys()].map(() => ({
            startLat: (Math.random() - 0.5) * 180,
            startLng: (Math.random() - 0.5) * 360,
            endLat: (Math.random() - 0.5) * 180,
            endLng: (Math.random() - 0.5) * 360,
            // Mix of Cyan (Monitoring) and Red (Threat)
            color: Math.random() > 0.6 ? ['rgba(255,0,0,0.5)', 'rgba(255,0,0,1)'] : ['rgba(0,255,255,0.5)', 'rgba(0,255,255,1)']
        }));
    }, []);

    useEffect(() => {
        // Auto-rotate
        if (globeEl.current) {
            globeEl.current.controls().autoRotate = true;
            globeEl.current.controls().autoRotateSpeed = 0.6;
            // Disable zoom/pan for a consistent "Dashboard" background feel
            globeEl.current.controls().enableZoom = false;
        }
    }, [dimensions]); // Re-apply when dimensions change/globe remounts

    return (
        <div ref={containerRef} className="w-full h-full bg-black relative overflow-hidden flex items-center justify-center">
            {/* Background Gradient for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#0f172a_0%,_#000_100%)] z-0 pointer-events-none opacity-80"></div>

            {dimensions.width > 0 && (
                <Globe
                    ref={globeEl}
                    width={dimensions.width}
                    height={dimensions.height}
                    backgroundColor="rgba(0,0,0,0)"

                    // Realistic Earth Textures
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                    bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"

                    // Visual Styling
                    atmosphereColor="#3a86ff" // Blueish atmosphere
                    atmosphereAltitude={0.25}

                    // Arcs (Threats)
                    arcsData={arcsData}
                    arcColor="color"
                    arcDashLength={0.4}
                    arcDashGap={2}
                    arcDashInitialGap={() => Math.random()}
                    arcDashAnimateTime={2000}
                    arcStroke={0.5}

                    // Add some rings for "scanned" effect
                    ringsData={[{ lat: 0, lng: 0, maxR: 1000, propagationSpeed: 5, repeatPeriod: 500 }]} // Just a dummy ring to init system if needed, or remove

                    // Interaction
                    enablePointerInteraction={false} // Keep it as a focused visual
                />
            )}

            {/* Overlay Stats - Kept from original */}
            <div className="absolute bottom-10 left-10 z-30 space-y-2 pointer-events-none">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-xs text-red-500 font-mono tracking-wider">CRITICAL THREATS DETECTED</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                    <span className="text-xs text-cyan-500 font-mono tracking-wider">GLOBAL MONITORING ACTIVE</span>
                </div>
            </div>

            {/* Title Overlay similar to image */}
            <div className="absolute top-10 right-10 z-30 text-right pointer-events-none">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
                    GLOBAL THREAT MAP
                </h2>
                <p className="text-[10px] text-cyan-500/50 font-mono mt-1">
                    LIVE RELAY // SECTOR 7
                </p>
            </div>
        </div>
    );
};
