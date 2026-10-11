"use client";

import { lazy, Suspense, useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import projectsData from "./exhibition-projects.json";
import "./exhibition.css";

type Project = (typeof projectsData)[number];
type Item = { src: string; title: string; subtitle: string; alt: string };
const CircularCarousel = lazy(() => import("./components/CircularCarousel.jsx")) as ComponentType<any>;
const FlexCarousel = lazy(() => import("./components/FlexCarousel.jsx")) as ComponentType<any>;
const CharacterViewer = lazy(() => import("./components/CharacterViewer.jsx"));
const categories = ["全部作品", "品牌空间", "联名与活动", "商业视觉", "包装与产品", "IP 与文创"];
const heroIds = ["lays-changan", "pepsi-changan", "lays-guiyang", "cat-ears", "union", "kaiyuan"];

function thumb(src: string, mobile: boolean) {
  return mobile ? `/mobile${src}` : src.replace(".webp", "-thumb.webp");
}

function Preview({ project }: { project: Project }) {
  return <picture><source media="(max-width: 700px)" srcSet={`/mobile${project.cover}`} /><img src={thumb(project.cover, false)} alt={project.title} loading="lazy" decoding="async" /></picture>;
}

export default function ExhibitionPortfolio({ onOpen }: { onOpen: (project: Project) => void }) {
  const [mobile, setMobile] = useState(false);
  const [category, setCategory] = useState("全部作品");
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [page, setPage] = useState(0);
  const [stageReady, setStageReady] = useState(false);
  const flexRef = useRef<HTMLDivElement>(null);
  const [heroActive, setHeroActive] = useState(0);

  useEffect(() => {
    document.title = "田佳林 / 四口 — 立体作品展厅";
    const query = window.matchMedia("(max-width: 700px)");
    const update = () => setMobile(query.matches); update();
    query.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setStageReady(true); observer.disconnect(); } }, { rootMargin: "180px" });
    if (flexRef.current) observer.observe(flexRef.current);
    return () => { query.removeEventListener("change", update); observer.disconnect(); };
  }, []);

  const filtered = useMemo(() => projectsData.filter(project => category === "全部作品" || project.category === category), [category]);
  const visible = filtered.slice(page * 6, page * 6 + 6);
  const current = visible[Math.min(active, visible.length - 1)];
  const heroProjects = useMemo(() => heroIds.map(id => projectsData.find(project => project.id === id)!).slice(0, mobile ? 3 : 6), [mobile]);
  const heroItems = useMemo(() => heroProjects.map(project => ({ src: thumb(project.cover, mobile), title: project.title, subtitle: project.category, alt: project.title })), [heroProjects, mobile]);
  const flexItems = useMemo<Item[]>(() => visible.map(project => ({ src: thumb(project.cover, mobile), title: project.title, subtitle: project.category, alt: project.title })), [visible.map(project => project.id).join("|"), mobile]);
  const pageCount = Math.ceil(filtered.length / 6);

  function changeCategory(value: string) { setCategory(value); setPage(0); setActive(0); }
  function changePage(value: number) { setPage((value + pageCount) % pageCount); setActive(0); }

  return (
    <main className="exhibition-site">
      <div className="exhibition-light" aria-hidden="true" /><div className="exhibition-grain" aria-hidden="true" />
      <header className="exhibition-nav">
        <a className="exhibition-logo" href="#exhibition-top">四口<span>SIKOU / 田佳林</span></a>
        <nav aria-label="作品展厅导航"><a href="#exhibition-work">作品展厅</a><a href="#exhibition-about">关于</a><a href="?version=storm">未来感版 ↗</a><a href="./">原版 ↗</a></nav>
      </header>

      <section className="exhibition-hero" id="exhibition-top">
        <div className="exhibition-eyebrow"><span><i /> INDEPENDENT DESIGNER</span><span>SELECTED WORKS / 2026</span></div>
        <h1>让想象<span>拥有形状。</span><em>Ideas, in motion.</em></h1>
        <div className="exhibition-hero-note"><p>田佳林 / 四口<br />商业视觉、品牌空间与产品设计</p><span>拖动作品，让灵感流转。<br />点击图片，进入完整项目。</span></div>
        <Suspense fallback={<div className="exhibition-loader" style={{ minHeight: 480 }}>正在构建立体角色…</div>}><CharacterViewer /></Suspense>
        <div className="exhibition-ring">
          <span className="exhibition-ring-label">01 / THE ORBIT</span>
          <Suspense fallback={<div className="exhibition-loader">正在展开作品轨道…</div>}>
            <CircularCarousel items={heroItems} preset="orbit" intro="assemble" cardWidth={mobile ? 290 : 380} aspectRatio={1.4} gap={mobile ? 16 : 28} speed={10} autoplay={playing ? "drift" : "off"} tilt={-12} depthFade={0.38} fadeColor="#090b10" captions={false} parallax={0.45} onChange={(index: number) => setHeroActive(index)} onItemClick={(_: Item, index: number) => onOpen(heroProjects[index])} />
          </Suspense>
          <div className="exhibition-orbit-glow" aria-hidden="true" />
        </div>
        <div className="exhibition-hero-bottom"><span>{String(heroActive + 1).padStart(2, "0")} / {String(heroProjects.length).padStart(2, "0")}</span><button onClick={() => onOpen(heroProjects[Math.min(heroActive, heroProjects.length - 1)])}>{heroProjects[Math.min(heroActive, heroProjects.length - 1)].title}<ArrowUpRight size={18} /></button><button className="exhibition-pause" onClick={() => setPlaying(!playing)} aria-label={playing ? "暂停作品轮播" : "播放作品轮播"}>{playing ? <Pause size={16} /> : <Play size={16} />}</button></div>
      </section>

      <div className="exhibition-ticker" aria-hidden="true"><div>{Array.from({ length: 4 }, (_, i) => <span key={i}>BRAND / SPACE / OBJECT / EXPERIMENT <b>✳</b> CONCEPT INTO REALITY <b>✳</b> </span>)}</div></div>

      <section className="exhibition-work" id="exhibition-work">
        <div className="exhibition-section-top"><span>02 / THE FLOW</span><span>DRAG TO EXPLORE</span></div>
        <div className="exhibition-work-heading"><h2>作品在流动。<em>Find your next perspective.</em></h2><p>从一个概念，到一个可被体验的现场。<br />选择分类，沿着作品继续探索。</p></div>
        <div className="exhibition-filters" role="group" aria-label="作品分类">{categories.map(value => <button key={value} aria-pressed={category === value} onClick={() => changeCategory(value)}>{value}<small>{value === "全部作品" ? projectsData.length : projectsData.filter(project => project.category === value).length}</small></button>)}</div>
        <div className="exhibition-flex" ref={flexRef}>
          <Suspense fallback={<div className="exhibition-loader">正在构建流动展厅…</div>}>
            {stageReady ? <FlexCarousel key={`${category}-${page}-${mobile}`} items={flexItems} preset="liquid" intro="bloom" fit="natural" cardHeight={mobile ? 0.45 : 0.54} gap={mobile ? 18 : 36} radius={4} bend={mobile ? 0.16 : 0.24} dispersion={mobile ? 0.12 : 0.24} liquid={0.6} squeeze={0.08} followCursor={!mobile} autoplay={playing} interval={5} captureWheel={false} captions={false} focusOnClick={false} onChange={(index: number) => setActive(index)} onSelect={(index: number) => onOpen(visible[index])} /> : <div className="exhibition-loader">作品展厅</div>}
          </Suspense>
          <span className="exhibition-flex-note">滑动或拖动探索 / 点选中央作品查看完整项目</span>
        </div>
        <div className="exhibition-focus-info" aria-live="polite"><div><span>{current.category} / {current.images.length} IMAGES</span><h3>{current.title}</h3><p>{current.description}</p></div><button onClick={() => onOpen(current)}>进入项目 <ArrowUpRight size={20} /></button></div>
        {pageCount > 1 && <div className="exhibition-pagination"><button onClick={() => changePage(page - 1)} aria-label="上一组作品"><ChevronLeft size={18} /></button><span>作品组 {page + 1} / {pageCount}</span><button onClick={() => changePage(page + 1)} aria-label="下一组作品"><ChevronRight size={18} /></button></div>}

        <div className="exhibition-index-top"><h3>PROJECT INDEX</h3><span>{filtered.length} 个项目 / 点击查看</span></div>
        <div className="exhibition-index">{filtered.map((project, index) => <button key={project.id} onClick={() => onOpen(project)} className="exhibition-index-row"><span className="exhibition-index-num">{String(index + 1).padStart(2, "0")}</span><div className="exhibition-index-image"><Preview project={project} /></div><div className="exhibition-index-name"><h4>{project.title}</h4><p>{project.category} <span>{project.images.length} 张图片</span></p></div><ArrowUpRight size={24} /></button>)}</div>
      </section>

      <section className="exhibition-about" id="exhibition-about"><span>03 / BEHIND THE FRAME</span><div><h2>先有判断，<br /><em>再让创意发生。</em></h2><p>我是田佳林，以“四口”记录我的设计实践。以产品设计背景为起点，探索商业视觉和品牌空间，关注创意如何从画面走入真实的使用场景。</p><p>效果图与概念提案保留其方案性质。AI 工具辅助设计，设计判断贯穿概念、视觉与制作尺度。</p><div className="exhibition-method"><span>01 场景与问题</span><span>02 概念与视觉</span><span>03 尺度与文件</span></div></div></section>
      <footer className="exhibition-footer"><div><span>LET’S MAKE SOMETHING REAL.</span><h2>下一次，<em>一起创造。</em></h2></div><a href="?version=storm#storm-contact">联系合作 <ArrowUpRight size={24} /></a><p>© 2026 田佳林 / 四口</p><a href="#exhibition-top">BACK TO TOP ↑</a></footer>
    </main>
  );
}
