"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { archiveProjects } from "./archive-projects";

const easeOut = [0.16, 1, 0.3, 1] as const;

const featuredProjects = [
  {
    number: "01",
    year: "2026.07",
    title: "乐事贵阳品牌馆",
    subtitle: "把地域文化转化为可感知的品牌体验",
    description:
      "从贵阳城市气质、饮食文化与年轻消费语境出发，完成品牌馆概念、空间视觉、互动装置与文创触点的系统设计。",
    role: ["前期创意", "概念方向", "空间效果图", "传播延展"],
    images: [
      ["/work/guiyang-space.webp", "乐事贵阳品牌馆空间设计效果图"],
      ["/work/guiyang-merch.webp", "乐事贵阳品牌馆文创与城市印章系统"],
      ["/work/guiyang-concept.webp", "乐事贵阳品牌馆概念视觉"],
      ["/work/lays-guiyang.webp", "乐事贵阳城市视觉设计"],
    ],
  },
  {
    number: "02",
    year: "2025.12",
    title: "百事长安城品牌馆",
    subtitle: "从三维视觉到开业传播的完整链路",
    description:
      "围绕建筑外观、内部动线、互动装置与夜景氛围完成三维可视化，并配合开业节点建立传播内容与品牌记忆。",
    role: ["Rhino 建模", "KeyShot 材质灯光", "效果图渲染", "开业传播"],
    images: [
      ["/work/pepsi-exterior.webp", "百事长安城品牌馆夜景外观"],
      ["/work/pepsi-landed.webp", "百事长安城品牌馆落地实景"],
      ["/work/pepsi-retail.webp", "百事零售体验与互动设计"],
    ],
  },
  {
    number: "03",
    year: "2026",
    title: "乐事傣族泼水节",
    subtitle: "把节日的热度变成可参与的品牌现场",
    description:
      "提取热带植物、地域纹样与泼水节的互动感，延展到主视觉、快闪空间、移动终端与可携带产品。",
    role: ["整合营销设计", "视觉系统", "互动玩法", "快闪空间"],
    images: [
      ["/work/lays-festival-kv.webp", "乐事傣族泼水节整合营销主视觉"],
      ["/work/lays-popup.webp", "乐事傣族泼水节快闪空间设计"],
    ],
  },
  {
    number: "04",
    year: "2026",
    title: "乐事 × 陕西联合",
    subtitle: "从包装到赛场的年轻化视觉系统",
    description:
      "以体育能量为核心，统一联名包装、球员物料、终端陈列、IP 角色与赛事传播，让合作资产在不同触点保持高识别度。",
    role: ["全案视觉", "包装设计", "IP 周边", "赛事传播"],
    images: [
      ["/work/lays-basketball.webp", "乐事与陕西联合联名项目主视觉"],
      ["/work/lays-mascot.webp", "乐事联名吉祥物与包装系统"],
      ["/hero-lays-union.webp", "乐事与陕西联合球迷整合传播视觉"],
      ["/work/portfolio-sports-pure.webp", "陕西联合赛事终端设计"],
      ["/work/portfolio-sports-pepsi.webp", "陕西联合赛事终端延展设计"],
    ],
  },
];

type GalleryProject = {
  title: string;
  type: string;
  images: string[];
  cover?: string;
};

const moreWorks: GalleryProject[] = [
  {
    title: "贵阳品牌馆概念",
    type: "概念与空间叙事",
    images: ["/work/guiyang-concept.webp", "/work/guiyang-space.webp", "/work/guiyang-merch.webp"],
  },
  {
    title: "佳得乐 × 凯尔特人",
    type: "运动零售体验",
    images: [
      "/work/gatorade-retail.webp",
      "/work/portfolio-brand-selection.webp",
      "/work/portfolio-activation-selection.webp",
    ],
  },
  {
    title: "乐事 FIFA 全球首发",
    type: "赛事整合传播",
    images: [
      "/work/lays-fifa.webp",
      "/work/portfolio-brand-selection.webp",
      "/work/portfolio-packaging-selection.webp",
    ],
  },
  {
    title: "华清宫限定包装",
    type: "文化联名包装",
    images: [
      "/work/cultural-packaging.webp",
      "/work/portfolio-huaqing-collab.webp",
      "/work/portfolio-packaging-selection.webp",
    ],
  },
  {
    title: "品牌活动与互动终端",
    type: "品牌活动 / 互动装置",
    images: [
      "/work/portfolio-activation-selection.webp",
      "/work/portfolio-brand-selection.webp",
      "/work/pepsi-retail.webp",
    ],
  },
  {
    title: "百事公仔盲盒",
    type: "收藏 IP 与包装",
    images: [
      "/work/pepsi-blindbox.webp",
      "/work/portfolio-blindbox-cover.webp",
      "/work/portfolio-blindbox-system.webp",
    ],
  },
  {
    title: "赛事终端视觉",
    type: "体育营销 / 终端体验",
    images: [
      "/work/portfolio-sports-pure.webp",
      "/work/portfolio-sports-pepsi.webp",
      "/hero-lays-union.webp",
    ],
  },
  {
    title: "贵阳城市视觉",
    type: "区域视觉与品牌触点",
    images: ["/work/lays-guiyang.webp", "/work/guiyang-concept.webp", "/work/guiyang-merch.webp"],
  },
  ...archiveProjects,
];

const process = [
  ["01", "Insight", "理解品牌目标、使用场景与文化语境"],
  ["02", "Ideation", "提取关键词、文化元素与视觉母题"],
  ["03", "System", "建立字体、色彩、图形与信息层级"],
  ["04", "Model", "Rhino 建模与 KeyShot 材质灯光验证"],
  ["05", "Apply", "深化包装、空间、装置与传播触点"],
  ["06", "Deliver", "整合效果图、提案与落地衔接"],
];

function WordsPullUp({ text, showAsterisk = false }: { text: string; showAsterisk?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const words = text.split(" ");

  return (
    <span ref={ref} className="words-pull-up" aria-label={text}>
      {words.map((word, index) => (
        <span className="word-mask" key={`${word}-${index}`} aria-hidden="true">
          <motion.span
            className="animated-word"
            initial={{ y: 28 }}
            animate={isInView ? { y: 0 } : { y: 28 }}
            transition={{ duration: 0.8, delay: index * 0.08, ease: easeOut }}
          >
            {word}
            {showAsterisk && index === words.length - 1 ? (
              <sup className="hero-asterisk">*</sup>
            ) : null}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function WordsPullUpMultiStyle({
  segments,
}: {
  segments: Array<{ text: string; className?: string }>;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const words = segments.flatMap((segment) =>
    segment.text.split(" ").map((word) => ({ word, className: segment.className })),
  );

  return (
    <span ref={ref} className="multi-style-words">
      {words.map(({ word, className }, index) => (
        <span className="word-mask" key={`${word}-${index}`}>
          <motion.span
            className={`animated-word ${className ?? ""}`}
            initial={{ y: 24 }}
            animate={isInView ? { y: 0 } : { y: 24 }}
            transition={{ duration: 0.75, delay: index * 0.055, ease: easeOut }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function AnimatedParagraph({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.25"],
  });

  return (
    <p className="about-body" ref={ref}>
      {Array.from(text).map((character, index, characters) => {
        const progress = index / Math.max(characters.length - 1, 1);
        return (
          <AnimatedLetter
            character={character}
            end={Math.min(progress + 0.12, 1)}
            key={`${character}-${index}`}
            progress={scrollYProgress}
            start={Math.max(progress - 0.08, 0)}
          />
        );
      })}
    </p>
  );
}

function AnimatedLetter({
  character,
  progress,
  start,
  end,
}: {
  character: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.16, 1]);
  return <motion.span style={{ opacity }}>{character}</motion.span>;
}

function RainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let drops: Array<{ x: number; y: number; length: number; speed: number; opacity: number }> = [];
    let ripples: Array<{ x: number; y: number; radius: number; opacity: number; speed: number }> = [];
    let lastAutoRipple = 0;
    let lastPointerRipple = 0;

    const makeDrop = (randomY = false) => ({
      x: Math.random() * width,
      y: randomY ? Math.random() * height : -40,
      length: 16 + Math.random() * 44,
      speed: 7 + Math.random() * 11,
      opacity: 0.08 + Math.random() * 0.24,
    });

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      drops = Array.from({ length: Math.min(78, Math.max(34, Math.floor(width / 20))) }, () => makeDrop(true));
    };

    const addRipple = (x: number, y: number, opacity = 0.24) => {
      ripples.push({ x, y, radius: 4, opacity, speed: 0.72 + Math.random() * 0.46 });
      if (ripples.length > 18) ripples.shift();
    };

    const addPointerRipple = (event: PointerEvent) => {
      const now = performance.now();
      if (event.type === "pointermove" && now - lastPointerRipple < 210) return;
      lastPointerRipple = now;
      addRipple(event.clientX, event.clientY, event.type === "pointerdown" ? 0.42 : 0.15);
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      context.lineWidth = 0.8;

      drops.forEach((drop, index) => {
        const gradient = context.createLinearGradient(drop.x, drop.y, drop.x - 8, drop.y + drop.length);
        gradient.addColorStop(0, "rgba(159, 199, 255, 0)");
        gradient.addColorStop(0.55, `rgba(159, 199, 255, ${drop.opacity})`);
        gradient.addColorStop(1, "rgba(159, 199, 255, 0)");
        context.strokeStyle = index % 17 === 0 ? `rgba(238, 35, 72, ${drop.opacity * 0.72})` : gradient;
        context.beginPath();
        context.moveTo(drop.x, drop.y);
        context.lineTo(drop.x - 8, drop.y + drop.length);
        context.stroke();

        drop.y += drop.speed;
        drop.x -= 0.7;
        if (drop.y > height + drop.length || drop.x < -30) {
          Object.assign(drop, makeDrop());
        }
      });

      if (time - lastAutoRipple > 1250) {
        addRipple(Math.random() * width, height * (0.22 + Math.random() * 0.7), 0.11 + Math.random() * 0.1);
        lastAutoRipple = time;
      }

      ripples.forEach((ripple) => {
        const rippleGradient = context.createLinearGradient(
          ripple.x - ripple.radius,
          ripple.y,
          ripple.x + ripple.radius,
          ripple.y,
        );
        rippleGradient.addColorStop(0, "rgba(130, 174, 255, 0)");
        rippleGradient.addColorStop(0.5, `rgba(174, 205, 255, ${ripple.opacity})`);
        rippleGradient.addColorStop(1, "rgba(130, 174, 255, 0)");
        context.strokeStyle = rippleGradient;
        context.lineWidth = 1;
        context.beginPath();
        context.ellipse(ripple.x, ripple.y, ripple.radius, ripple.radius * 0.34, 0, 0, Math.PI * 2);
        context.stroke();
        context.globalAlpha = 0.45;
        context.beginPath();
        context.ellipse(ripple.x, ripple.y, ripple.radius * 0.72, ripple.radius * 0.22, 0, 0, Math.PI * 2);
        context.stroke();
        context.globalAlpha = 1;
        ripple.radius += ripple.speed;
        ripple.opacity -= 0.0026;
      });
      ripples = ripples.filter((ripple) => ripple.opacity > 0 && ripple.radius < 190);

      frame = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointerdown", addPointerRipple, { passive: true });
    window.addEventListener("pointermove", addPointerRipple, { passive: true });
    frame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", addPointerRipple);
      window.removeEventListener("pointermove", addPointerRipple);
    };
  }, []);

  return <canvas className="rain-canvas" ref={canvasRef} aria-hidden="true" />;
}

function CursorAura() {
  const auraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const aura = auraRef.current;
    if (!aura || window.matchMedia("(pointer: coarse)").matches) return;

    const move = (event: PointerEvent) => {
      aura.style.setProperty("--cursor-x", `${event.clientX}px`);
      aura.style.setProperty("--cursor-y", `${event.clientY}px`);
      aura.dataset.visible = "true";
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return <div className="cursor-aura" ref={auraRef} aria-hidden="true" />;
}

function InteractivePortrait() {
  const portraitRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const portrait = portraitRef.current;
    if (!portrait || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const move = (event: PointerEvent) => {
      const horizontal = (event.clientX / window.innerWidth - 0.5) * 2;
      const vertical = (event.clientY / window.innerHeight - 0.5) * 2;
      portrait.style.setProperty("--look-x", `${horizontal * 7}px`);
      portrait.style.setProperty("--look-y", `${vertical * 5}px`);
      portrait.style.setProperty("--tilt-x", `${vertical * -2.2}deg`);
      portrait.style.setProperty("--tilt-y", `${horizontal * 3.6}deg`);
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <motion.figure
      className="interactive-portrait"
      ref={portraitRef}
      initial={{ opacity: 0, x: 48, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 1.15, delay: 0.18, ease: easeOut }}
    >
      <div className="portrait-halo" aria-hidden="true" />
      <div className="portrait-tilt-layer">
        <img
          src="/ip/ip-cover.webp"
          alt="冷蓝灯光下的红发三维人物形象"
          fetchPriority="high"
        />
        <div className="portrait-eyes" aria-hidden="true">
          <span className="portrait-eye portrait-eye-left"><i /></span>
          <span className="portrait-eye portrait-eye-right"><i /></span>
        </div>
        <span className="portrait-scanline" aria-hidden="true" />
      </div>
      <figcaption>
        <span>INTERACTIVE IP / 01</span>
        <strong>移动鼠标 · 目光随行</strong>
      </figcaption>
    </motion.figure>
  );
}

function AccentArtwork({
  src,
  alt,
  className,
  label,
}: {
  src: string;
  alt: string;
  className: string;
  label: string;
}) {
  return (
    <motion.figure
      className={`accent-artwork ${className}`}
      initial={{ opacity: 0, y: 46, rotate: -1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.95, ease: easeOut }}
    >
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      <figcaption>{label}</figcaption>
    </motion.figure>
  );
}

function GalleryModal({
  project,
  activeIndex,
  onClose,
  onIndexChange,
}: {
  project: GalleryProject | null;
  activeIndex: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}) {
  useEffect(() => {
    if (!project) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") {
        onIndexChange((activeIndex - 1 + project.images.length) % project.images.length);
      }
      if (event.key === "ArrowRight") {
        onIndexChange((activeIndex + 1) % project.images.length);
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, onClose, onIndexChange, project]);

  useEffect(() => {
    if (!project || project.images.length < 2) return;

    const nextImage = new Image();
    const previousImage = new Image();
    nextImage.src = project.images[(activeIndex + 1) % project.images.length];
    previousImage.src =
      project.images[(activeIndex - 1 + project.images.length) % project.images.length];
  }, [activeIndex, project]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="gallery-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} 项目图片`}
        >
          <motion.div
            className="gallery-shell"
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.35, ease: easeOut }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="gallery-topline">
              <div>
                <span>{project.type}</span>
                <h2>{project.title}</h2>
              </div>
              <button type="button" onClick={onClose} aria-label="关闭项目图片">
                <X size={20} />
              </button>
            </div>

            <div className="gallery-viewer">
              <AnimatePresence mode="wait">
                <motion.img
                  key={project.images[activeIndex]}
                  src={project.images[activeIndex]}
                  alt={`${project.title} 项目图 ${activeIndex + 1}`}
                  decoding="async"
                  initial={{ opacity: 0, x: 22 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -22 }}
                  transition={{ duration: 0.3, ease: easeOut }}
                />
              </AnimatePresence>
            </div>

            <div className="gallery-controls">
              <span>{String(activeIndex + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}</span>
              <div>
                <button
                  type="button"
                  onClick={() => onIndexChange((activeIndex - 1 + project.images.length) % project.images.length)}
                  aria-label="上一张图片"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => onIndexChange((activeIndex + 1) % project.images.length)}
                  aria-label="下一张图片"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: (typeof featuredProjects)[number];
  index: number;
  onOpen: (project: GalleryProject) => void;
}) {
  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, scale: 0.96, y: 24 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onOpen({
        title: project.title,
        type: project.subtitle,
        images: project.images.map(([src]) => src),
      })}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen({
            title: project.title,
            type: project.subtitle,
            images: project.images.map(([src]) => src),
          });
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`打开 ${project.title} 项目图片`}
    >
      <div className="project-card-head">
        <div>
          <span className="card-number">{project.number}</span>
          <span className="card-year">{project.year}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.subtitle}</p>
      </div>

      <div className="project-gallery">
        {project.images.map(([src, alt]) => (
          <figure className="full-image-frame" key={src}>
            <img src={src} alt={alt} loading="lazy" />
          </figure>
        ))}
      </div>

      <div className="project-card-foot">
        <p>{project.description}</p>
        <ul>
          {project.role.map((item) => (
            <li key={item}>
              <Check aria-hidden="true" size={14} strokeWidth={1.8} />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <span className="project-open-hint">点击查看完整项目 <ArrowRight size={14} /></span>
    </motion.article>
  );
}

const stormServices = [
  ["01", "品牌系统", "从概念策略、视觉母题到完整品牌触点，建立清晰而有记忆点的视觉语言。"],
  ["02", "三维建模", "使用 Rhino 与三维工具完成产品、空间和角色建模，让抽象创意变成可验证的真实形态。"],
  ["03", "渲染表现", "通过材质、灯光与场景气氛，制作具有电影质感的产品和空间视觉。"],
  ["04", "空间体验", "把品牌内容延展到快闪、展陈、互动装置与零售终端，形成完整现场体验。"],
  ["05", "整合传播", "围绕营销节点组织主视觉、包装、内容与线下应用，让创意在不同媒介保持一致。"],
];

const stormMarqueeImages = [
  "/work/guiyang-space.webp",
  "/work/lays-basketball.webp",
  "/work/pepsi-exterior.webp",
  "/work/lays-festival-kv.webp",
  "/work/guiyang-merch.webp",
  "/work/lays-fifa.webp",
  "/work/cultural-packaging.webp",
  "/work/pepsi-blindbox.webp",
  "/work/gatorade-retail.webp",
  "/work/lays-popup.webp",
  "/work/portfolio-brand-selection.webp",
  "/work/portfolio-activation-selection.webp",
  "/work/portfolio-packaging-selection.webp",
  "/work/portfolio-sports-pure.webp",
  "/ip/ip-purple.webp",
  "/ip/ip-moodboard.webp",
];

function stormMobileSource(src: string) {
  const parts = src.split("/").filter(Boolean);
  if (parts[0] === "work" && parts.length === 2) return `/mobile/work/${parts[1]}`;
  if (parts[0] === "ip" && parts.length === 2) return `/mobile/ip/${parts[1]}`;
  if (src === "/hero-lays-union.webp") return "/mobile/hero-lays-union.webp";
  return src;
}

function StormImage({
  src,
  alt,
  eager = false,
}: {
  src: string;
  alt: string;
  eager?: boolean;
}) {
  return (
    <picture className="storm-picture">
      <source media="(max-width: 700px)" srcSet={stormMobileSource(src)} />
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : "auto"}
      />
    </picture>
  );
}

function StormParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let previousTime = 0;
    let isMobile = false;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
      phase: number;
    }> = [];

    const createParticle = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * (isMobile ? 0.22 : 0.42),
      vy: -0.12 - Math.random() * (isMobile ? 0.28 : 0.48),
      size: 0.7 + Math.random() * (isMobile ? 1.3 : 2.1),
      alpha: 0.2 + Math.random() * 0.62,
      color: Math.random() > 0.78 ? "238, 45, 132" : "116, 169, 255",
      phase: Math.random() * Math.PI * 2,
    });

    const resize = () => {
      isMobile = window.innerWidth <= 700;
      const ratio = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.35);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = isMobile ? 30 : Math.min(96, Math.max(66, Math.floor(width / 18)));
      particles = Array.from({ length: count }, createParticle);
    };

    const draw = (time: number) => {
      const frameInterval = isMobile ? 1000 / 24 : 1000 / 60;
      if (time - previousTime < frameInterval) {
        frame = window.requestAnimationFrame(draw);
        return;
      }
      previousTime = time;
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "screen";

      if (!isMobile) {
        for (let first = 0; first < particles.length; first += 2) {
          for (let second = first + 2; second < particles.length; second += 2) {
            const dx = particles[first].x - particles[second].x;
            const dy = particles[first].y - particles[second].y;
            const distance = Math.hypot(dx, dy);
            if (distance < 112) {
              context.strokeStyle = `rgba(112, 162, 242, ${(1 - distance / 112) * 0.12})`;
              context.lineWidth = 0.45;
              context.beginPath();
              context.moveTo(particles[first].x, particles[first].y);
              context.lineTo(particles[second].x, particles[second].y);
              context.stroke();
            }
          }
        }
      }

      particles.forEach((particle) => {
        particle.phase += 0.018;
        particle.x += particle.vx + Math.sin(particle.phase) * 0.08;
        particle.y += particle.vy;
        if (particle.y < -18) particle.y = height + 18;
        if (particle.x < -18) particle.x = width + 18;
        if (particle.x > width + 18) particle.x = -18;

        const glow = 0.64 + Math.sin(particle.phase * 1.7) * 0.36;
        context.fillStyle = `rgba(${particle.color}, ${particle.alpha * glow})`;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
        if (!isMobile && particle.size > 1.7) {
          context.fillStyle = `rgba(${particle.color}, ${particle.alpha * 0.12})`;
          context.beginPath();
          context.arc(particle.x, particle.y, particle.size * 4.2, 0, Math.PI * 2);
          context.fill();
        }
      });

      context.globalCompositeOperation = "source-over";
      frame = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    frame = window.requestAnimationFrame(draw);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas className="storm-particle-canvas" ref={canvasRef} aria-hidden="true" />;
}

function StormRainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let lastRipple = 0;
    let lastShockwave = 0;
    let ripples: Array<{ x: number; y: number; radius: number; alpha: number; speed: number; flatten: number }> = [];
    let shockwaves: Array<{ x: number; y: number; radius: number; alpha: number; speed: number; flatten: number }> = [];

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      context.lineCap = "round";

      const horizon = height * 0.54;
      const groundGradient = context.createLinearGradient(0, horizon, 0, height);
      groundGradient.addColorStop(0, "rgba(92, 130, 190, 0)");
      groundGradient.addColorStop(0.35, "rgba(70, 106, 164, 0.025)");
      groundGradient.addColorStop(1, "rgba(139, 178, 232, 0.105)");
      context.fillStyle = groundGradient;
      context.fillRect(0, horizon, width, height - horizon);

      context.save();
      context.globalCompositeOperation = "screen";
      for (let sheen = 0; sheen < 5; sheen += 1) {
        const y = horizon + (height - horizon) * ((sheen + 1) / 6);
        const sheenGradient = context.createLinearGradient(0, y, width, y);
        sheenGradient.addColorStop(0, "rgba(139, 180, 240, 0)");
        sheenGradient.addColorStop(0.45, `rgba(139, 180, 240, ${0.018 + sheen * 0.006})`);
        sheenGradient.addColorStop(1, "rgba(139, 180, 240, 0)");
        context.strokeStyle = sheenGradient;
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(0, y);
        context.bezierCurveTo(width * 0.32, y - 3, width * 0.68, y + 3, width, y);
        context.stroke();
      }
      context.restore();

      if (time - lastRipple > 260) {
        const y = height * (0.57 + Math.random() * 0.4);
        ripples.push({
          x: width * (0.05 + Math.random() * 0.9),
          y,
          radius: 4,
          alpha: 0.28 + Math.random() * 0.2,
          speed: 0.9 + Math.random() * 1.2,
          flatten: 0.15 + ((y / height) - 0.5) * 0.3,
        });
        lastRipple = time;
      }

      if (time - lastShockwave > 1900) {
        const y = height * (0.66 + Math.random() * 0.24);
        shockwaves.push({
          x: width * (0.24 + Math.random() * 0.52),
          y,
          radius: 12,
          alpha: 0.72,
          speed: 4.2 + Math.random() * 1.6,
          flatten: 0.18 + ((y / height) - 0.58) * 0.26,
        });
        lastShockwave = time;
      }

      ripples.forEach((ripple) => {
        context.save();
        context.globalCompositeOperation = "screen";
        context.shadowColor = `rgba(123, 169, 241, ${ripple.alpha * 0.75})`;
        context.shadowBlur = 8;
        [1, 0.72, 0.42].forEach((ring, ringIndex) => {
          context.lineWidth = ringIndex === 0 ? 1.2 : 0.55;
          context.strokeStyle = `rgba(187, 215, 255, ${ripple.alpha * (1 - ringIndex * 0.2)})`;
          context.beginPath();
          context.ellipse(
            ripple.x,
            ripple.y,
            ripple.radius * ring,
            ripple.radius * ring * Math.max(0.11, ripple.flatten),
            0,
            0,
            Math.PI * 2,
          );
          context.stroke();
        });
        context.restore();
        ripple.radius += ripple.speed;
        ripple.alpha -= 0.012;
      });

      shockwaves.forEach((wave) => {
        context.save();
        context.globalCompositeOperation = "screen";
        context.shadowColor = `rgba(123, 159, 255, ${wave.alpha})`;
        context.shadowBlur = 26;
        const shockGradient = context.createLinearGradient(
          wave.x - wave.radius,
          wave.y,
          wave.x + wave.radius,
          wave.y,
        );
        shockGradient.addColorStop(0, "rgba(101, 86, 255, 0)");
        shockGradient.addColorStop(0.34, `rgba(89, 145, 255, ${wave.alpha * 0.72})`);
        shockGradient.addColorStop(0.52, `rgba(237, 242, 255, ${wave.alpha})`);
        shockGradient.addColorStop(0.7, `rgba(229, 31, 121, ${wave.alpha * 0.62})`);
        shockGradient.addColorStop(1, "rgba(229, 31, 121, 0)");
        context.strokeStyle = shockGradient;
        context.lineWidth = 2.4;
        context.beginPath();
        context.ellipse(wave.x, wave.y, wave.radius, wave.radius * wave.flatten, 0, 0, Math.PI * 2);
        context.stroke();
        context.lineWidth = 0.75;
        context.strokeStyle = `rgba(211, 226, 255, ${wave.alpha * 0.55})`;
        context.beginPath();
        context.ellipse(wave.x, wave.y, wave.radius * 0.82, wave.radius * wave.flatten * 0.78, 0, 0, Math.PI * 2);
        context.stroke();
        context.restore();
        wave.radius += wave.speed;
        wave.alpha -= 0.0125;
      });

      ripples = ripples.filter((ripple) => ripple.alpha > 0 && ripple.radius < 150);
      shockwaves = shockwaves.filter((wave) => wave.alpha > 0 && wave.radius < Math.max(width, 520) * 0.7);
      frame = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    frame = window.requestAnimationFrame(draw);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas className="storm-rain-canvas" ref={canvasRef} aria-hidden="true" />;
}

function StormMarquee() {
  const { scrollYProgress } = useScroll();
  const rowOneX = useTransform(scrollYProgress, [0, 1], [-620, 220]);
  const rowTwoX = useTransform(scrollYProgress, [0, 1], [120, -720]);
  const firstRow = stormMarqueeImages.slice(0, 6);
  const secondRow = stormMarqueeImages.slice(8, 14);

  const renderRow = (images: string[]) =>
    [...images, ...images].map((src, index) => (
      <figure className="storm-marquee-tile" key={`${src}-${index}`}>
        <StormImage src={src} alt="" />
      </figure>
    ));

  return (
    <section className="storm-marquee" aria-label="作品动态图廊">
      <motion.div className="storm-marquee-row" style={{ x: rowOneX }}>
        {renderRow(firstRow)}
      </motion.div>
      <motion.div className="storm-marquee-row" style={{ x: rowTwoX }}>
        {renderRow(secondRow)}
      </motion.div>
    </section>
  );
}

function StormProjectCard({
  project,
  index,
  total,
  onOpen,
}: {
  project: (typeof featuredProjects)[number];
  index: number;
  total: number;
  onOpen: (project: GalleryProject) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end end"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (total - index - 1) * 0.026]);
  const galleryProject = {
    title: project.title,
    type: project.subtitle,
    images: project.images.map(([src]) => src),
  };

  return (
    <div className="storm-project-slot" ref={cardRef}>
      <motion.article
        className="storm-project-card"
        style={{ scale, top: `${88 + index * 18}px` }}
      >
        <div className="storm-project-head">
          <span className="storm-project-number">{project.number}</span>
          <div>
            <p>{project.year} / SELECTED WORK</p>
            <h3>{project.title}</h3>
          </div>
          <button type="button" onClick={() => onOpen(galleryProject)}>
            查看项目 <ArrowRight size={16} />
          </button>
        </div>
        <button
          className="storm-project-images"
          type="button"
          onClick={() => onOpen(galleryProject)}
          aria-label={`打开 ${project.title} 项目图片`}
        >
          <span className="storm-project-left">
            {project.images.slice(0, 2).map(([src, alt]) => (
              <StormImage key={src} src={src} alt={alt} />
            ))}
          </span>
          <span className="storm-project-right">
            <StormImage
              src={(project.images[2] ?? project.images[0])[0]}
              alt={(project.images[2] ?? project.images[0])[1]}
            />
          </span>
        </button>
      </motion.article>
    </div>
  );
}

function StormPortfolio({ onOpen }: { onOpen: (project: GalleryProject) => void }) {
  return (
    <main className="storm-site">
      <StormParticleCanvas />
      <StormRainCanvas />
      <div className="storm-hud-overlay" aria-hidden="true">
        <span className="storm-hud-corner storm-hud-tl" />
        <span className="storm-hud-corner storm-hud-tr" />
        <span className="storm-hud-corner storm-hud-bl" />
        <span className="storm-hud-corner storm-hud-br" />
        <p className="storm-hud-status">SYSTEM / ONLINE <i /> PARTICLE FIELD 96</p>
        <p className="storm-hud-coords">34.3416° N / 108.9398° E</p>
      </div>
      <section className="storm-hero" id="storm-top">
        <nav className="storm-nav" aria-label="大雨版主导航">
          <a href="#storm-about">关于我</a>
          <a href="#storm-services">能力</a>
          <a href="#storm-projects">项目</a>
          <a href="#storm-contact">联系</a>
          <a className="storm-back-link" href="./">返回原版</a>
        </nav>
        <motion.h1
          data-text="HI, I'M JIALIN"
          initial={{ opacity: 0, y: 46 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeOut }}
        >
          HI, I&apos;M JIALIN
        </motion.h1>
        <div className="storm-kinetic-type" aria-hidden="true">
          <span>3D / BRAND / SPACE / EXPERIENCE</span>
          <span>3D / BRAND / SPACE / EXPERIENCE</span>
        </div>
        <div className="storm-energy-orbit" aria-hidden="true">
          <i /><i /><i />
        </div>
        <div className="storm-light-strike" aria-hidden="true" />
        <motion.div
          className="storm-hero-portrait"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.15, delay: 0.34, ease: easeOut }}
        >
          <StormImage src="/ip/ip-cover.webp" alt="田佳林的三维人物视觉形象" eager />
        </motion.div>
        <div className="storm-hero-bottom">
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.8, ease: easeOut }}
          >
            一名专注于品牌、空间、产品与三维视觉的设计师，用强烈而难忘的画面构建真实体验。
          </motion.p>
          <motion.a
            className="storm-contact-button"
            href="#storm-contact"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.56, duration: 0.8, ease: easeOut }}
          >
            CONTACT ME <ArrowRight size={18} />
          </motion.a>
        </div>
        <div className="storm-waterline" aria-hidden="true" />
      </section>

      <StormMarquee />

      <section className="storm-impact-statement" aria-label="设计宣言">
        <div className="storm-impact-visual" aria-hidden="true">
          <StormImage src="/ip/ip-moodboard.webp" alt="" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 70, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: easeOut }}
        >
          <p>IDEAS SHOULD NOT STAY FLAT</p>
          <h2>MAKE<br /><span>IT</span> REAL.</h2>
        </motion.div>
        <span className="storm-impact-index">TIAN JIALIN © 2026 / 3D CREATOR</span>
      </section>

      <section className="storm-about" id="storm-about">
        <AccentArtwork src="/mobile/ip/ip-white-hood.webp" alt="白色连帽三维人物" className="storm-decor storm-decor-one" label="" />
        <AccentArtwork src="/mobile/ip/ip-purple.webp" alt="紫色环境光三维人物" className="storm-decor storm-decor-two" label="" />
        <AccentArtwork src="/mobile/ip/ip-blue.webp" alt="蓝色轮廓光三维人物" className="storm-decor storm-decor-three" label="" />
        <AccentArtwork src="/mobile/ip/ip-closeup.webp" alt="三维人物面部细节" className="storm-decor storm-decor-four" label="" />
        <motion.div
          className="storm-about-copy"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: easeOut }}
        >
          <h2>ABOUT ME</h2>
          <AnimatedParagraph text="我是田佳林，一名产品设计师。我关注品牌如何在真实世界里被看见、被触碰，也被记住。工作跨越品牌视觉、空间体验、产品渲染与整合营销，并用三维工具把抽象概念变成可讨论、可验证、可落地的真实方案。" />
          <a className="storm-contact-button" href="#storm-contact">CONTACT ME <ArrowRight size={18} /></a>
        </motion.div>
      </section>

      <section className="storm-services" id="storm-services">
        <motion.h2
          initial={{ opacity: 0, y: 46 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: easeOut }}
        >
          SERVICES
        </motion.h2>
        <div className="storm-service-list">
          {stormServices.map(([number, title, description], index) => (
            <motion.article
              key={number}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.72, delay: index * 0.07, ease: easeOut }}
            >
              <span>{number}</span>
              <div><h3>{title}</h3><p>{description}</p></div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="storm-projects" id="storm-projects">
        <h2>PROJECTS</h2>
        <div className="storm-project-stack">
          {featuredProjects.map((project, index) => (
            <StormProjectCard
              key={project.number}
              project={project}
              index={index}
              total={featuredProjects.length}
              onOpen={onOpen}
            />
          ))}
        </div>
        <div className="storm-archive-heading">
          <span>FULL ARCHIVE / {String(moreWorks.length).padStart(2, "0")}</span>
          <h3>更多作品</h3>
        </div>
        <div className="storm-archive-grid">
          {moreWorks.map((work, index) => (
            <motion.button
              type="button"
              key={work.title}
              onClick={() => onOpen(work)}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: (index % 3) * 0.07, ease: easeOut }}
            >
              <figure><StormImage src={work.cover ?? work.images[0]} alt={work.title} /></figure>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h4>{work.title}</h4><p>{work.type}</p></div>
              <ArrowRight size={17} />
            </motion.button>
          ))}
        </div>
      </section>

      <footer className="storm-footer" id="storm-contact">
        <p>AVAILABLE FOR BRAND / SPACE / VISUAL COLLABORATION</p>
        <h2>LET&apos;S MAKE<br /><span>SOMETHING</span><br />UNFORGETTABLE.</h2>
        <a href="tel:+8613279403213">132 7940 3213 <ArrowRight /></a>
        <div><span>田佳林 / PRODUCT DESIGNER</span><a href="#storm-top">BACK TO TOP ↑</a></div>
      </footer>
    </main>
  );
}

export default function Home() {
  const [activeGallery, setActiveGallery] = useState<GalleryProject | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isStormVersion, setIsStormVersion] = useState(false);

  useEffect(() => {
    setIsStormVersion(new URLSearchParams(window.location.search).get("version") === "storm");
  }, []);

  function openGallery(project: GalleryProject) {
    setActiveImageIndex(0);
    setActiveGallery(project);
  }

  if (isStormVersion) {
    return (
      <>
        <StormPortfolio onOpen={openGallery} />
        <GalleryModal
          activeIndex={activeImageIndex}
          onClose={() => setActiveGallery(null)}
          onIndexChange={setActiveImageIndex}
          project={activeGallery}
        />
      </>
    );
  }

  return (
    <main className="portfolio-site">
      <RainCanvas />
      <CursorAura />
      <section className="cinematic-hero" id="top">
        <div className="hero-frame">
          <div className="noise-overlay" aria-hidden="true" />
          <div className="hero-gradient" aria-hidden="true" />
          <div className="hero-atmosphere" aria-hidden="true" />

          <nav className="nav-pill" aria-label="主导航">
            <a href="#about">个人简介</a>
            <a href="#work">精选作品</a>
            <a href="#process">设计方法</a>
            <a href="#contact">联系合作</a>
          </nav>

          <div className="hero-stage">
            <motion.div
              className="hero-intro"
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.08, ease: easeOut }}
            >
              <p className="hero-kicker">TIAN JIALIN · PRODUCT DESIGNER</p>
              <h1 className="hero-name">
                <span><WordsPullUp text="TIAN" /></span>
                <span><WordsPullUp text="JIALIN" showAsterisk /></span>
              </h1>
              <p className="hero-role">PRODUCT / SPATIAL / VISUAL</p>
              <p className="hero-description">
                田佳林，产品设计师。将品牌、空间、产品与三维视觉组织成可感知、可落地、可被记住的真实体验。
              </p>
              <div className="hero-actions">
                <a className="pill-button" href="#work">
                  查看作品
                  <span><ArrowRight aria-hidden="true" size={18} /></span>
                </a>
                <span className="hero-scroll-cue"><i /> SCROLL TO EXPLORE</span>
              </div>
            </motion.div>
            <InteractivePortrait />
          </div>

          <div className="hero-meta">
            <span>XI&apos;AN / CHINA · 34.3416° N</span>
            <span>SELECTED WORKS · 2023—2026 / VISUAL SYSTEM 01</span>
          </div>
        </div>
      </section>

      <div className="fluid-ribbon fluid-ribbon-top" aria-hidden="true">
        <div>
          <span>FORM FOLLOWS FEELING</span><i />
          <span>DESIGN IN MOTION</span><i />
          <span>FORM FOLLOWS FEELING</span><i />
          <span>DESIGN IN MOTION</span><i />
        </div>
      </div>

      <section className="about-section" id="about">
        <div className="about-layout section-glow">
          <div className="about-card">
            <p className="section-label">Product designer · China</p>
            <h2>
              <WordsPullUpMultiStyle
                segments={[
                  { text: "我是田佳林，" },
                  { text: "一名产品设计师。", className: "serif-italic" },
                  { text: "把产品、空间与视觉组织成真实体验。" },
                ]}
              />
            </h2>
            <AnimatedParagraph text="我关注品牌如何在真实世界里被看见、被触碰，也被记住。工作跨越品牌视觉、空间体验、产品渲染与整合营销，并习惯用三维工具把抽象概念快速变成可讨论、可验证的方案。" />

            <div className="about-stats">
              <div>
                <span>FOCUS</span>
                <strong>品牌 / 空间 / 产品 / AIGC</strong>
              </div>
              <div>
                <span>TOOLS</span>
                <strong>Rhino / KeyShot / PS / AI</strong>
              </div>
              <div>
                <span>APPROACH</span>
                <strong>策略 / 三维验证 / 落地</strong>
              </div>
            </div>
          </div>
          <div className="about-art-column">
            <AccentArtwork
              src="/ip/ip-white-hood.webp"
              alt="月光下的白色连帽三维人物"
              className="about-primary-art"
              label="CHARACTER STUDY / LIGHT 02"
            />
            <AccentArtwork
              src="/ip/ip-moodboard.webp"
              alt="红黑三维人物造型情绪板"
              className="about-moodboard-art"
              label="MOOD / FORM / ATTITUDE"
            />
          </div>
        </div>
      </section>

      <section className="work-section bg-noise" id="work">
        <div className="work-heading">
          <p className="section-label">Selected projects · 01—04</p>
          <h2>
            <WordsPullUpMultiStyle
              segments={[
                { text: "从概念策略到真实落地。" },
                { text: "为每个项目保留完整画面。", className: "muted-text" },
              ]}
            />
          </h2>
        </div>

        <div className="work-visual-divider section-glow">
          <AccentArtwork
            src="/ip/ip-purple.webp"
            alt="紫红环境光下的三维人物形象"
            className="work-purple-art"
            label="FORM STUDY / 03"
          />
          <div className="work-manifesto">
            <span>DESIGN AS EXPERIENCE</span>
            <p>策略定方向，三维定质感，视觉让故事真正发生。</p>
          </div>
        </div>

        <div className="featured-grid">
          {featuredProjects.map((project, index) => (
            <ProjectCard index={index} key={project.number} project={project} onOpen={openGallery} />
          ))}
        </div>

        <div className="fluid-ribbon fluid-ribbon-work" aria-hidden="true">
          <div>
            <span>BRAND</span><i />
            <span>SPACE</span><i />
            <span>PRODUCT</span><i />
            <span>AIGC</span><i />
            <span>BRAND</span><i />
            <span>SPACE</span><i />
          </div>
        </div>

        <div className="more-work-heading">
          <p className="section-label">More work · Complete frames</p>
          <h2>更多选作</h2>
        </div>

        <div className="more-work-grid">
          {moreWorks.map((work, index) => (
            <motion.article
              className="more-work-card"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, delay: (index % 4) * 0.08, ease: easeOut }}
              key={work.title}
              onClick={() => openGallery(work)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openGallery(work);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`打开 ${work.title} 项目图片`}
            >
              <figure className="more-image-frame">
                <img
                  src={work.cover ?? work.images[0]}
                  alt={work.title}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <div className="more-work-meta">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{work.title}</h3>
                  <p>{work.type} · {work.images.length} 张</p>
                </div>
                <ArrowRight size={16} aria-hidden="true" />
              </div>
            </motion.article>
          ))}
        </div>

        <div className="process-block" id="process">
          <div className="process-title">
            <p className="section-label">Design approach</p>
            <AccentArtwork
              src="/ip/ip-blue.webp"
              alt="蓝色轮廓光下手持眼镜的三维人物"
              className="process-character-art"
              label="PROCESS / OBSERVE CLOSELY"
            />
            <h2>
              清晰地想，
              <br />
              大胆地做。
            </h2>
          </div>
          <ol>
            {process.map(([number, title, description]) => (
              <li key={number}>
                <span>{number}</span>
                <strong>{title}</strong>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <footer id="contact">
        <div className="footer-heading-row section-glow">
          <div>
            <p className="section-label">Available for brand / space / visual collaboration</p>
            <h2>
              LET&apos;S <span>CREATE</span> NEXT.
            </h2>
          </div>
          <AccentArtwork
            src="/ip/ip-closeup.webp"
            alt="红发三维人物面部细节特写"
            className="footer-character-art"
            label="DETAIL / CHARACTER 05"
          />
        </div>
        <a className="contact-link" href="tel:+8613279403213">
          132 7940 3213
          <ArrowRight aria-hidden="true" />
        </a>
        <div className="footer-line">
          <span>田佳林 / PRODUCT DESIGNER</span>
          <span>期待下一次创造。</span>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </footer>
      <GalleryModal
        activeIndex={activeImageIndex}
        onClose={() => setActiveGallery(null)}
        onIndexChange={setActiveImageIndex}
        project={activeGallery}
      />
    </main>
  );
}
