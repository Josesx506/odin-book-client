"use client"

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from "react";
import { DiGithubBadge } from "react-icons/di";
import "../styles/landingpage.css";
import Logo from "./Logo";
import ModalCntr from './forms/ModalCntr';
import SignIn from './auth/SignIn';

const LandingPage = () => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const canvasRef = useRef(null)
  const [particles, setParticles] = useState([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  function toggleSignIn(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setOpenModal(!openModal);
  }

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Initialize particles
  useEffect(() => {
    if (dimensions.width === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    canvas.width = dimensions.width
    canvas.height = dimensions.height

    // Helper function for Quadratic Bezier curve interpolation
    // B(t) = (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
    const getQuadraticBezierPoint = (p0, p1, p2, t) => {
      const x = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
      const y = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;
      return { x, y };
    };

    // Create J shape particles
    const createJParticles = (numParticlesMultiplier = 1) => { // Added multiplier
      const newParticles = []

      const jShapePoints = []
      const centerX = dimensions.width / 2
      const centerY = dimensions.height / 2.5
      const baseSize = Math.min(dimensions.width / 4, dimensions.height / 12) * 0.8; // Adjust base size for better fit

      // Define proportions relative to baseSize for the J
      const topStartX = centerX - baseSize * 0.1;
      const topEndX = centerX + baseSize * 0.4;
      const topY = centerY - baseSize * 0.5;

      const verticalLineX = centerX + baseSize * 0.2; // Slightly right for vertical part
      const verticalLineBottomY = centerY + baseSize * 0.2;

      const curveStartX = verticalLineX;
      const curveStartY = verticalLineBottomY;
      const curveEndX = centerX - baseSize * 0.25; // End of the bottom curve
      const curveEndY = centerY + baseSize * 0.4; // Deeper for the curve

      // ----- Generate points for the curvier J -----

      // 1. Top horizontal arm (can still be fairly straight for the top)
      const numTopPoints = 20 * numParticlesMultiplier; // More points for smoother
      for (let i = 0; i < numTopPoints; i++) {
        jShapePoints.push({
          x: topStartX + (topEndX - topStartX) * (i / (numTopPoints - 1)),
          y: topY
        });
      }

      // 2. Vertical stem
      const numVerticalPoints = 40 * numParticlesMultiplier; // More points
      for (let i = 0; i < numVerticalPoints; i++) {
        jShapePoints.push({
          x: verticalLineX,
          y: topY + (verticalLineBottomY - topY) * (i / (numVerticalPoints - 1))
        });
      }

      // 3. Bottom arc (Quadratic Bezier Curve)
      // P0: Start of the curve (bottom of the vertical stem)
      // P1: Control point (pulls the curve downwards and left)
      // P2: End of the curve
      const p0 = { x: curveStartX, y: curveStartY };
      const p1 = { x: centerX - baseSize * 0.06, y: centerY + baseSize * 0.9 }; // Adjust control point for desired curve
      const p2 = { x: curveEndX, y: curveEndY };

      const numCurvePoints = 30 * numParticlesMultiplier; // Significantly more points for the curve
      for (let i = 0; i <= numCurvePoints; i++) {
        const t = i / numCurvePoints;
        jShapePoints.push(getQuadraticBezierPoint(p0, p1, p2, t));
      }

      // Create particles for each point in the J shape
      jShapePoints.forEach((point) => {
        newParticles.push({
          x: Math.random() * dimensions.width, // Start particles randomly
          y: Math.random() * dimensions.height,
          size: Math.random() * 4 + 2,        // Slightly smaller particles for more density
          targetX: point.x,
          targetY: point.y,
          speed: Math.random() * 0.2 + 0.01, // Slower speed for smoother formation
          color: `rgba(36, 158, 240, ${Math.random() * 0.5 + 0.5})`,
        })
      })

      setParticles(newParticles)
    }

    createJParticles(5); // Call with multiplier for 5x particles
  }, [dimensions])

  // Animation loop (remains the same)
  useEffect(() => {
    if (particles.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        // Move particle toward target
        particle.x += (particle.targetX - particle.x) * particle.speed
        particle.y += (particle.targetY - particle.y) * particle.speed

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [particles])

  return (
    <div className="landing-container">
      <canvas ref={canvasRef} className="particle-canvas"></canvas>

      <div className="content-container">
        <div className="left-section">
          <Logo />
          <p className="tagline">Connect, Share, Engage</p>
          <p className="description">
            A modern social platform for authentic connections and meaningful conversations. Share your thoughts, follow
            interesting people, and join the community.
          </p>
        </div>

        <div className="right-section">
          <div className="auth-container">
            <h2>Join today</h2>
            <button className="btn btn-primary" onClick={() => router.push('/signin?with=github')}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6em' }}>
                <DiGithubBadge style={{ height: '1.4em', width: '1.4em' }} />
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>Sign up with GitHub</span>
              </div>
            </button>
            <button className="btn btn-secondary"><a href='/signup'>Create an Account</a></button>
            <p className="auth-info">
              Already have an account?
              <br />
              <a onClick={toggleSignIn} style={{ color: 'rgb(36, 158, 240)', fontWeight: '600' }} href="#" className="text-link">
                Sign In to Continue
              </a>
            </p>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Help</a>
        </div>
        <p className="copyright">&copy; Copyright {new Date().getFullYear()} J Corp. All rights reserved.</p>
      </footer>

      <ModalCntr onClose={toggleSignIn} open={openModal} >
        <div style={{ width: 'min(85vw, 410px)' }}>
          <SignIn showGithub={false} />
        </div>
      </ModalCntr>
    </div>
  )
}

export default LandingPage
