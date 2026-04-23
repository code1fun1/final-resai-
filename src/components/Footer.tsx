import { FunctionComponent, useState, useEffect } from "react";
import styles from "./Footer.module.css";

export type FooterType = {
  className?: string;
};

const FADE_MS = 400;
const SLIDE_INTERVAL_MS = 3000;

const SLIDES = [
  {
    image: "./image-1727@2x.png",
    title: "Build ",
    highlight: "Faster",
    subtitle: "Create ATS-ready resumes in minutes with AI",
  },
  {
    image: "./Rectangle@2x.png",
    title: "Get ",
    highlight: "Matched",
    subtitle: "Discover jobs suited to your skills instantly",
  },
  {
    image: "./image-slide3@2x.png",
    title: "Improve ",
    highlight: "Skills",
    subtitle: "Close skill gaps with curated learning paths",
  },
  {
    image: "./image-slide4@2x.png",
    title: "Get ",
    highlight: "Selected",
    subtitle: "Optimize your profile to increase interviews",
  },
  {
    image: "./image-slide5@2x.png",
    title: "Career ",
    highlight: "Growth",
    subtitle: "Close skill gaps with curated learning paths",
  },
];

const Footer: FunctionComponent<FooterType> = ({ className = "" }) => {
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
    <div className={[styles.footer, className].join(" ")}>
      <div className={styles.footerChild} />
      <div
        className={[
          styles.buildFasterParent,
          transitioning ? styles.imageHidden : styles.imageVisible,
        ].join(" ")}
      >
        <h1 className={styles.buildFaster}>
          <span>{textSlide.title}</span>
          <span className={styles.faster}>{textSlide.highlight}</span>
        </h1>
        <div className={styles.createAtsReadyResumes}>{textSlide.subtitle}</div>
      </div>
      <div className={styles.vectorParent}>
        {SLIDES.map((_, i) => (
          <div
            key={i}
            className={i === activeIndex ? styles.frameChild : styles.frameItem}
          />
        ))}
      </div>
      <div className={styles.image1726Parent}>
        {/* Incoming image — always visible underneath */}
        <img
          className={styles.image1727Icon}
          alt=""
          src={SLIDES[activeIndex].image}
        />
        {/* Outgoing image — fades out on top */}
        {prevIndex !== null && (
          <img
            className={[styles.image1727Icon, styles.imageFadeOut].join(" ")}
            alt=""
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
          <img
            className={styles.chipsIcon}
            loading="lazy"
            alt=""
            src="./Chips1@2x.png"
          />
        )}
        {activeIndex === 0 && (
          <img
            className={styles.chipsIcon2}
            loading="lazy"
            alt=""
            src="./Chips@2x.png"
          />
        )}
        <img
          className={styles.logoIcon}
          loading="lazy"
          alt=""
          src="./Logo@2x.png"
        />
      </div>
    </div>
  );
};

export default Footer;
