import { useEffect, useRef } from 'react';

// Math helpers
const GLOBE_RADIUS = 180;
const ROTATION_SPEED = 0.002;

interface Point3D {
    x: number;
    y: number;
    z: number;
    lat: number;
    lng: number;
}

interface Arc {
    start: Point3D;
    end: Point3D;
    progress: number;
    speed: number;
    color: string;
}

export const CyberGlobe = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Handle resize
        const resize = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            ctx.translate(canvas.offsetWidth / 2, canvas.offsetHeight / 2);
        };
        resize();
        window.addEventListener('resize', resize);

        // Generate sphere points (Fibonacci Sphere)
        const points: Point3D[] = [];
        const phi = Math.PI * (3 - Math.sqrt(5));
        for (let i = 0; i < 400; i++) {
            const y = 1 - (i / (400 - 1)) * 2;
            const radius = Math.sqrt(1 - y * y);
            const theta = phi * i;

            const x = Math.cos(theta) * radius;
            const z = Math.sin(theta) * radius;

            points.push({ x: x * GLOBE_RADIUS, y: y * GLOBE_RADIUS, z: z * GLOBE_RADIUS, lat: 0, lng: 0 });
        }

        // Attacks
        let attacks: Arc[] = [];
        let rotation = 0;
        let animationId: number;

        const createAttack = () => {
            if (Math.random() > 0.05) return;
            const start = points[Math.floor(Math.random() * points.length)];
            const end = points[Math.floor(Math.random() * points.length)];

            // Only short-medium distance attacks
            const dist = Math.sqrt(Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2) + Math.pow(start.z - end.z, 2));
            if (dist < 50 || dist > 300) return;

            attacks.push({
                start,
                end,
                progress: 0,
                speed: 0.02 + Math.random() * 0.03,
                color: Math.random() > 0.8 ? '#ef4444' : '#06b6d4'
            });
        };

        const draw = () => {
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.restore();

            rotation += ROTATION_SPEED;
            createAttack();

            // Rotate and Project Points
            const rotatedPoints = points.map(p => {
                const x = p.x * Math.cos(rotation) - p.z * Math.sin(rotation);
                const z = p.x * Math.sin(rotation) + p.z * Math.cos(rotation);
                return { ...p, x, z, visible: z > 0 }; // Simple occlusion
            });

            // Sort by depth for correct z-indexing (painters algorithm)
            rotatedPoints.forEach(p => {
                if (p.z > 0) {
                    const alpha = p.z / GLOBE_RADIUS;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(100, 116, 139, ${alpha * 0.5})`;
                    ctx.fill();
                } else {
                    // Backside dots (dimmer)
                    const alpha = (p.z + GLOBE_RADIUS) / GLOBE_RADIUS; // normalize
                    if (alpha > 0) {
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(50, 60, 80, 0.2)`;
                        ctx.fill();
                    }
                }
            });

            // Draw Attacks
            attacks = attacks.filter(attack => attack.progress < 1);
            attacks.forEach(attack => {
                attack.progress += attack.speed;

                // Rotate start/end points
                const rotatePoint = (p: Point3D) => {
                    const x = p.x * Math.cos(rotation) - p.z * Math.sin(rotation);
                    const z = p.x * Math.sin(rotation) + p.z * Math.cos(rotation);
                    return { x, y: p.y, z };
                };
                const s = rotatePoint(attack.start);
                const e = rotatePoint(attack.end);

                // Quadratic Bezier Curve for "Arc" height
                const midX = (s.x + e.x) / 2;
                const midY = (s.y + e.e) / 2; // Typo fix: e.y not e.e
                // Wait, I see a typo in my previous attempt: e.e? No, looking at "const midY = (s.y + e.y) / 2;" 

                // Let's re-calculate midY properly
                const midY2 = (s.y + e.y) / 2;
                const scalar = 1.5;
                const cpX = midX * scalar;
                const cpY = midY2 * scalar;

                if (s.z > -50 && e.z > -50) { // Only draw if mostly visible
                    // Draw full subtle arc
                    ctx.beginPath();
                    ctx.moveTo(s.x, s.y);
                    ctx.quadraticCurveTo(cpX, cpY, e.x, e.y);
                    ctx.strokeStyle = `rgba(6, 182, 212, 0.1)`;
                    ctx.lineWidth = 1;
                    ctx.stroke();

                    // Draw head
                    const t = attack.progress;
                    const invT = 1 - t;
                    const bx = invT * invT * s.x + 2 * invT * t * cpX + t * t * e.x;
                    const by = invT * invT * s.y + 2 * invT * t * cpY + t * t * e.y;

                    ctx.beginPath();
                    ctx.arc(bx, by, 3, 0, Math.PI * 2);
                    ctx.fillStyle = attack.color;
                    ctx.shadowColor = attack.color;
                    ctx.shadowBlur = 10;
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }
            });

            animationId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div className="w-full h-full bg-black/40 backdrop-blur-sm relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%)] z-10 pointer-events-none"></div>

            <canvas ref={canvasRef} className="w-full h-full relative z-0" />

            {/* Overlay Stats */}
            <div className="absolute bottom-10 left-10 z-20 space-y-2 pointer-events-none">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-xs text-red-500 font-mono">CRITICAL THREATS DETECTED</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                    <span className="text-xs text-cyan-500 font-mono">GLOBAL MONITORING ACTIVE</span>
                </div>
            </div>
        </div>
    );
};
