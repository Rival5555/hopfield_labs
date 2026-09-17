"use client";

import React, { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  radius: number;
}

interface AttractorFieldProps {
  className?: string;
  nodeCount?: number;
  connectionDistance?: number;
  opacity?: number;
  interactive?: boolean;
}

export function AttractorField({
  className = "",
  nodeCount = 42,
  connectionDistance = 140,
  opacity = 0.28,
  interactive = true,
}: AttractorFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Generate node field with attractor basins (Hopfield energy landscape)
    const attractors = [
      { x: width * 0.3, y: height * 0.4 },
      { x: width * 0.7, y: height * 0.4 },
      { x: width * 0.5, y: height * 0.65 },
    ];

    const nodes: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const basin = attractors[i % attractors.length];
      const angle = (i / nodeCount) * Math.PI * 2;
      const dist = 30 + Math.random() * 160;
      const targetX = basin.x + Math.cos(angle) * dist;
      const targetY = basin.y + Math.sin(angle) * dist;

      nodes.push({
        x: prefersReducedMotion ? targetX : Math.random() * width,
        y: prefersReducedMotion ? targetY : Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        targetX,
        targetY,
        radius: 1.75 + (i % 3 === 0 ? 0.75 : 0),
      });
    }

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null };
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Settle nodes toward attractor basin / energy minima
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (!prefersReducedMotion) {
          // Attractor spring force
          const dx = node.targetX - node.x;
          const dy = node.targetY - node.y;
          node.vx += dx * 0.0008;
          node.vy += dy * 0.0008;

          // Mouse perturbation
          if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
            const mdx = mouseRef.current.x - node.x;
            const mdy = mouseRef.current.y - node.y;
            const dist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (dist < 120 && dist > 0) {
              const force = (120 - dist) / 120;
              node.vx -= (mdx / dist) * force * 0.6;
              node.vy -= (mdy / dist) * force * 0.6;
            }
          }

          // Damping
          node.vx *= 0.96;
          node.vy *= 0.96;

          node.x += node.vx;
          node.y += node.vy;
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = i % 4 === 0 ? "rgba(0, 214, 164, 0.75)" : "rgba(79, 125, 255, 0.75)";
        ctx.fill();
      }

      // Draw 1px connection lines between close nodes
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.35;
            ctx.strokeStyle = `rgba(147, 156, 176, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [nodeCount, connectionDistance, interactive]);

  return (
    <div
      className={`relative w-full h-full pointer-events-auto overflow-hidden ${className}`}
      style={{
        opacity,
        maskImage:
          "radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 75%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 75%)",
      }}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
