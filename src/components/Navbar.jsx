import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import logoFull from '../assets/onae logo OG.png';

const NAV_LINKS = [
  { path: '/work', label: 'Work' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

const DROPDOWN_LINKS = [
  {
    title: 'The studio',
    links: [
      { path: '/work', label: 'Work' },
      { path: '/about', label: 'About' },
      { path: '/contact', label: 'Contact' },
      { path: '/services', label: 'Services' },
    ]
  },
  {
    title: 'Find us online',
    links: [
      { path: 'https://www.instagram.com/onae_lighting?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', label: 'Instagram' },
      { path: 'https://www.linkedin.com/company/onae-lighting/', label: 'LinkedIn' },
    ]
  },
  {
    title: 'Get in touch',
    links: [
      { path: 'mailto:hello@onae.ae', label: 'hello@onae.ae' },
    ]
  }
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Close menu on scroll
  useEffect(() => {
    if (!menuOpen) return;
    
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setMenuOpen(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen]);

  return (
    <>
      <div className="fixed top-6 left-0 w-full z-[100] flex items-start justify-between px-6 md:px-12 pointer-events-none">
        
        {/* LEFT NAV BLOCK (White Curved Wrapper) */}
        <div className="pointer-events-auto flex flex-col p-1.5 bg-white/80 backdrop-blur-3xl rounded-2xl shadow-2xl">
          
          <div className="flex items-stretch">
            {/* Logo & Toggle Box */}
            <div className={`bg-[#050505] flex items-center justify-between px-4 py-3 relative z-50 transition-all duration-300 ${menuOpen ? 'w-[280px] md:w-[320px] rounded-t-xl' : 'gap-6 w-auto rounded-xl'}`}>
              <Link
                to="/"
                onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMenuOpen(false); }}
                className="flex items-center shrink-0 w-[70px] h-6 relative"
              >
                <img
                  src={logoFull}
                  alt="ONAÈ"
                  className="h-[100px] w-auto object-contain absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none max-w-none"
                />
              </Link>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex flex-col items-center justify-center w-6 h-6 gap-[4px] group"
              >
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  className="w-5 h-[1.5px] bg-white transition-all duration-300"
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -0.5 } : { rotate: 0, y: 0 }}
                  className="w-5 h-[1.5px] bg-white transition-all duration-300"
                />
              </button>
            </div>

            {/* Desktop Inline Links */}
            {!menuOpen && (
              <div className="hidden md:flex items-center gap-8 px-8">
                {NAV_LINKS.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`font-poppins text-[9px] uppercase tracking-[0.2em] transition-all duration-300 relative group
                      ${pathname === link.path ? 'text-black font-bold' : 'text-black/60 hover:text-black'}
                    `}
                  >
                    {link.label}
                    {pathname === link.path && (
                      <motion.span 
                        layoutId="activeDot"
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#DE3B2B] rounded-full"
                      />
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="w-[280px] md:w-[320px] bg-[#050505] rounded-b-xl overflow-hidden origin-top"
              >
                <div className="flex flex-col gap-10 p-8 border-t border-white/10">
                  {DROPDOWN_LINKS.map((section) => (
                    <div key={section.title} className="flex flex-col gap-4">
                      <h4 className="font-poppins text-white/50 text-[11px] uppercase tracking-widest font-semibold">
                        {section.title}
                      </h4>
                      <ul className="flex flex-col gap-3">
                        {section.links.map((link) => (
                          <li key={link.label}>
                            {link.path.startsWith('http') || link.path.startsWith('mailto') || link.path === '#' ? (
                              <a href={link.path} className="font-poppins text-[10px] uppercase tracking-[0.2em] text-white hover:text-[#DE3B2B] transition-colors">
                                {link.label}
                              </a>
                            ) : (
                              <Link
                                to={link.path}
                                onClick={() => setMenuOpen(false)}
                                className="font-poppins text-[10px] uppercase tracking-[0.2em] text-white hover:text-[#DE3B2B] transition-colors"
                              >
                                {link.label}
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  <div className="pt-6 mt-2 border-t border-white/10">
                    <p className="font-poppins text-[9px] uppercase tracking-[0.2em] text-white/40 leading-relaxed">
                      Dubai · Architectural Lighting<br/>
                      Specialising in immersive lighting experiences.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT ACTION BLOCK */}
        <div className="pointer-events-auto hidden md:flex items-center gap-4">
          <Link
            to="/contact"
            className="font-poppins text-[10px] uppercase tracking-[0.2em] text-white hover:text-[#DE3B2B] transition-colors flex items-center gap-2 border-b border-white/20 hover:border-[#DE3B2B] pb-1"
          >
            Get In Touch
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
        </div>

      </div>

      {/* Overlay for mobile to close menu when clicking outside */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm pointer-events-auto"
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
