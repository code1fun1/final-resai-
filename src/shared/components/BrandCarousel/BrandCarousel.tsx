import { useState, useEffect } from 'react';
import styles from './BrandCarousel.module.css';

const FADE_MS = 400;
const SLIDE_INTERVAL_MS = 3000;

const SLIDES = [
  {
    image: '/image/slide-build.png',
    title: 'Build ',
    highlight: 'Faster',
    subtitle: 'Create ATS-ready resumes in minutes with AI'
  },
  {
    image: '/image/slide-matched.png',
    title: 'Get ',
    highlight: 'Matched',
    subtitle: 'Discover jobs suited to your skills instantly'
  },
  {
    image: '/image/slide-skills.png',
    title: 'Improve ',
    highlight: 'Skills',
    subtitle: 'Close skill gaps with curated learning paths',
    hasChips: true
  },
  {
    image: '/image/slide-selected.png',
    title: 'Get ',
    highlight: 'Selected',
    subtitle: 'Optimize your profile to increase interviews'
  },
  {
    image: '/image/slide-growth.png',
    title: 'Career ',
    highlight: 'Growth',
    subtitle: 'Close skill gaps with curated learning paths'
  }
];

const BrandCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => {
        setPrevIndex(current);
        return (current + 1) % SLIDES.length;
      });
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (prevIndex === null) return;
    const clear = setTimeout(() => setPrevIndex(null), FADE_MS);
    return () => clearTimeout(clear);
  }, [prevIndex]);

  const transitioning = prevIndex !== null;
  const textSlide = transitioning ? SLIDES[prevIndex!] : SLIDES[activeIndex];

  return (
    <div className={styles.footer}>
      <div className={styles.footerChild} />
      <div
        className={[
          styles.buildFasterParent,
          transitioning ? styles.imageHidden : styles.imageVisible
        ].join(' ')}
      >
        <h1 className={styles.buildFaster}>
          <span>{textSlide.title}</span>
          <span className={styles.faster}>{textSlide.highlight}</span>
        </h1>
        <div className={styles.createAtsReadyResumes}>{textSlide.subtitle}</div>
      </div>
      <div className={styles.vectorParent}>
        {SLIDES.map((_, i) => (
          <div key={i} className={i === activeIndex ? styles.frameChild : styles.frameItem} />
        ))}
      </div>
      <div className={styles.image1726Parent}>
        <img
          className={styles.image1727Icon}
          alt={SLIDES[activeIndex].highlight}
          src={SLIDES[activeIndex].image}
        />
        {prevIndex !== null && (
          <img
            className={[styles.image1727Icon, styles.imageFadeOut].join(' ')}
            alt={SLIDES[prevIndex].highlight}
            src={SLIDES[prevIndex].image}
          />
        )}
        {activeIndex === 2 && (
          <>
            <span className={`${styles.skillChip} ${styles.chipBranding}`}>Branding</span>
            <span className={`${styles.skillChip} ${styles.chipTeamWork}`}>Team work</span>
            <span className={`${styles.skillChip} ${styles.chipWebDesign}`}>Web design</span>
            <span className={`${styles.skillChip} ${styles.chipAdaptibility}`}>Adaptibility</span>
          </>
        )}
        <div className={styles.ellipseDiv} />
        {activeIndex === 0 && (
          <>
            <img className={styles.chipsIcon} alt="" src="/image/chips-2.png" />
            <img className={styles.chipsIcon2} alt="" src="/image/chips-1.png" />
          </>
        )}
        <img className={styles.logoIcon} alt="ResAI Logo" src="/image/ResAi-gold-Logo.png" />
      </div>
    </div>
  );
};

export default BrandCarousel;
