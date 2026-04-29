import React, { useRef, useEffect } from 'react';

const InteractiveGalaxy = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars = [];
    const numStars = 800; // Dense starfield
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width * 2 - width,
        y: Math.random() * height * 2 - height,
        z: Math.random() * width, // For 3D depth
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.5 + 0.1,
        // Mix of white, light blue, and light purple for galaxy feel
        color: `hsl(${Math.random() * 60 + 200}, 80%, ${Math.random() * 40 + 60}%)` 
      });
    }

    const animate = () => {
      // Trail effect for smooth motion
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(0, 0, width, height);
      
      // Smooth interpolation for mouse
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      const centerX = width / 2;
      const centerY = height / 2;

      stars.forEach(star => {
        // Move towards the viewer
        star.z -= star.speed * 2;
        
        // Reset if it passes the viewer
        if (star.z <= 0) {
          star.x = Math.random() * width * 2 - width;
          star.y = Math.random() * height * 2 - height;
          star.z = width;
        }

        // Calculate 2D position with field of view
        const fov = 350; 
        const scale = fov / (fov + star.z);
        
        // Apply interactive parallax based on mouse
        // Farther stars move less than closer stars
        const offsetX = targetX * (1 - star.z / width) * 1.5;
        const offsetY = targetY * (1 - star.z / width) * 1.5;

        // Project to 2D screen
        const x2d = star.x * scale + centerX + offsetX;
        const y2d = star.y * scale + centerY + offsetY;

        // Fade in from distance
        const alpha = Math.min(1, (width - star.z) / (width * 0.5));
        
        ctx.beginPath();
        ctx.arc(x2d, y2d, star.size * scale, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      requestAnimationFrame(animate);
    };

    let animationFrameId = requestAnimationFrame(animate);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e) => {
      mouseX = (e.clientX - width / 2) * 0.5;
      mouseY = (e.clientY - height / 2) * 0.5;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0, // Behind the content
        pointerEvents: 'none',
      }}
    />
  );
};

export default InteractiveGalaxy;
