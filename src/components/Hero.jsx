import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import logo from '../assets/logo.png';
import { InsideOutText, InsideOutElement } from './InsideOut.jsx';

// Brand color palette (same as About page)
const COLORS = {
  red:      '#DE3B2B',
  navy:     '#194688',
  blue:     '#34A0E7',
  offwhite: '#F5F2ED',
  gray:     '#999999',
};

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const { scrollY } = useScroll();

  // Text scrolls up and fades out as user scrolls
  const textY = useTransform(scrollY, [0, window.innerHeight], [0, -window.innerHeight]);
  const textOpacity = useTransform(scrollY, [0, window.innerHeight * 0.5], [1, 0]);

  // Orb parallax positions
  const yOrb1 = useTransform(scrollY, [0, window.innerHeight], ['0%', '40%']);
  const yOrb2 = useTransform(scrollY, [0, window.innerHeight], ['0%', '-40%']);

  // Orb 1: red → blue → offwhite as you scroll
  const orb1Color = useTransform(
    scrollY,
    [0, window.innerHeight * 0.5, window.innerHeight],
    [COLORS.red, COLORS.blue, COLORS.offwhite]
  );

  // Orb 2: navy → red → blue as you scroll
  const orb2Color = useTransform(
    scrollY,
    [0, window.innerHeight * 0.5, window.innerHeight],
    [COLORS.navy, COLORS.red, COLORS.blue]
  );

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    // Sticky so background stays in place as projects scroll over it
    <section
      id="hero"
      className="sticky top-0 w-full h-[100dvh] min-h-[600px] overflow-hidden bg-black z-0"
    >
      {/* ── Animated Orb Background (same as About page) ────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-black" />

        {/* Orb 1 — top left, color shifts on scroll */}
        <motion.div
          style={{ y: yOrb1, backgroundColor: orb1Color }}
          className="absolute top-[10%] left-[5%] w-[60vw] h-[60vw] rounded-full mix-blend-screen filter blur-[120px] md:blur-[180px] opacity-60 will-change-transform transform-gpu"
        />

        {/* Orb 2 — bottom right, color shifts on scroll */}
        <motion.div
          style={{ y: yOrb2, backgroundColor: orb2Color }}
          className="absolute bottom-[10%] right-[5%] w-[55vw] h-[55vw] rounded-full mix-blend-screen filter blur-[140px] md:blur-[200px] opacity-50 will-change-transform transform-gpu"
        />

        {/* Grain overlay for texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
        />
      </div>

      {/* ── Text Content ──────────────────────────────────────── */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6"
      >
        {/* Logo mark */}
        <motion.div
          layoutId="onae-logo"
          transition={{ layout: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } }}
          className="w-16 h-16 md:w-20 md:h-20 mb-10 flex items-center justify-center"
        >
          <img
            src={logo}
            alt="ONAÈ mark"
            className="w-full h-full object-contain animate-pulse-slow"
          />
        </motion.div>

        {/* Animated headline */}
        {loaded && (
          <h1
            className="font-poppins font-bold text-white text-center leading-[1.1] md:leading-none flex justify-center"
            style={{ fontSize: 'clamp(1.8rem, 8vw, 7.5rem)' }}
          >
            <InsideOutText text="Sculpted Light." delay={0.1} />
          </h1>
        )}

        {/* Subheadline */}
        <InsideOutElement delay={0.6} className="text-center">
          <p className="font-redhat text-[#999] mt-6 tracking-[0.15em] md:tracking-[0.2em] uppercase text-[10px] md:text-base max-w-[280px] md:max-w-none">
            Architectural lighting consultancy.&nbsp;&nbsp;Dubai.
          </p>
        </InsideOutElement>

        {/* Red accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={loaded ? { scaleX: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-12 h-[2px] bg-[#DE3B2B] mt-8 origin-center"
        />
      </motion.div>

      {/* ── Corner coords ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        style={{ opacity: textOpacity }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 right-8 z-20 hidden md:block"
      >
        <p className="font-poppins text-[10px] tracking-[0.2em] text-[#555] rotate-90 origin-right">
          25.2048° N, 55.2708° E
        </p>
      </motion.div>
    </section>
  );
}

export default Hero;
