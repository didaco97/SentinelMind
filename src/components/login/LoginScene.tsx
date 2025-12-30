import { useEffect, useRef } from 'react';

export const LoginScene = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };
        resize();
        window.addEventListener('resize', resize);

        // Particle system
        interface Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            alpha: number;
        }

        const particles: Particle[] = [];
        const numParticles = 80;

        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * canvas.offsetWidth,
                y: Math.random() * canvas.offsetHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                alpha: Math.random() * 0.5 + 0.2
            });
        }

        let animationId: number;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

            // Draw connections
            ctx.strokeStyle = 'rgba(6, 182, 212, 0.1)';
            ctx.lineWidth = 0.5;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.globalAlpha = (120 - dist) / 120 * 0.3;
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }
            }

            // Draw particles
            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off edges
                if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(6, 182, 212, ${p.alpha})`;
                ctx.fill();
            }

            animationId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900/30"></div>

            {/* Animated grid */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                    animation: 'gridMove 20s linear infinite'
                }}
            ></div>

            {/* Particle canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
            />

            {/* Glow orbs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
    );
};
