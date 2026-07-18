const projects = [
  {
    number: "01",
    year: "2026.07",
    status: "落地项目",
    title: "乐事贵阳品牌馆",
    subtitle: "把地域文化转化为可感知的品牌体验",
    description:
      "从贵阳城市气质、饮食文化与年轻消费语境出发，完成品牌馆概念、空间视觉、互动装置与文创触点的系统设计。",
    role: "前期创意 · 概念方向 · 空间效果图 · 传播延展",
    image: "/work/guiyang-space.webp",
    imageAlt: "乐事贵阳品牌馆空间设计效果图",
    detailImage: "/work/guiyang-merch.webp",
    detailAlt: "乐事贵阳品牌馆文创与城市印章系统",
    tone: "project--sand",
  },
  {
    number: "02",
    year: "2025.12",
    status: "落地项目",
    title: "百事长安城品牌馆",
    subtitle: "从三维视觉到开业传播的完整链路",
    description:
      "围绕建筑外观、内部动线、互动装置与夜景氛围完成三维可视化，并配合开业节点建立传播内容与品牌记忆。",
    role: "Rhino 建模 · KeyShot 材质灯光 · 效果图渲染 · 开业传播",
    image: "/work/pepsi-exterior.webp",
    imageAlt: "百事长安城品牌馆夜景外观",
    detailImage: "/work/pepsi-landed.webp",
    detailAlt: "百事长安城品牌馆落地实景",
    tone: "project--blue",
  },
  {
    number: "03",
    year: "2026",
    status: "落地项目",
    title: "乐事傣族泼水节",
    subtitle: "把节日的热度变成可参与的品牌现场",
    description:
      "提取热带植物、地域纹样与泼水节的互动感，延展到主视觉、快闪空间、移动终端与可携带产品。",
    role: "整合营销设计 · 视觉系统 · 互动玩法 · 快闪空间",
    image: "/work/lays-festival-kv.webp",
    imageAlt: "乐事傣族泼水节整合营销主视觉",
    detailImage: "/work/lays-popup.webp",
    detailAlt: "乐事傣族泼水节快闪空间设计",
    tone: "project--green",
  },
  {
    number: "04",
    year: "2026",
    status: "品牌系统",
    title: "乐事 × 陕西联合",
    subtitle: "从包装到赛场的年轻化视觉系统",
    description:
      "以体育能量为核心，统一联名包装、球员物料、终端陈列、IP 角色与赛事传播，让合作资产在不同触点保持高识别度。",
    role: "全案视觉 · 包装设计 · IP 周边 · 赛事传播",
    image: "/work/lays-basketball.webp",
    imageAlt: "乐事与陕西联合联名项目主视觉",
    detailImage: "/work/lays-mascot.webp",
    detailAlt: "乐事联名吉祥物与包装系统",
    tone: "project--red",
  },
];

const selectedWorks = [
  {
    title: "佳得乐 × 凯尔特人",
    type: "运动零售体验",
    image: "/work/gatorade-retail.webp",
    alt: "佳得乐篮球运动零售终端设计",
  },
  {
    title: "乐事 FIFA 全球首发",
    type: "赛事整合传播",
    image: "/work/lays-fifa.webp",
    alt: "乐事 FIFA 全球首发传播视觉",
  },
  {
    title: "华清宫限定包装",
    type: "文化联名包装",
    image: "/work/cultural-packaging.webp",
    alt: "华清宫文化联名限定包装设计",
  },
  {
    title: "百事生爽上头",
    type: "零售体验与互动",
    image: "/work/pepsi-retail.webp",
    alt: "百事品牌零售体验设计",
  },
  {
    title: "百事盲盒",
    type: "收藏 IP 与包装",
    image: "/work/pepsi-blindbox.webp",
    alt: "百事角色盲盒包装设计",
  },
  {
    title: "贵阳城市视觉",
    type: "区域视觉与品牌触点",
    image: "/work/lays-guiyang.webp",
    alt: "乐事贵阳区域视觉设计",
  },
];

const process = [
  ["01", "Insight", "理解品牌目标、使用场景与文化语境"],
  ["02", "Ideation", "提取关键词、文化元素与视觉母题"],
  ["03", "System", "建立字体、色彩、图形与信息层级"],
  ["04", "Model", "Rhino 建模与 KeyShot 材质灯光验证"],
  ["05", "Apply", "深化包装、空间、装置与传播触点"],
  ["06", "Deliver", "整合效果图、提案与落地衔接"],
];

export default function Home() {
  return (
    <main>
      <div className="availability-bar">
        <span>AVAILABLE FOR BRAND / SPACE / VISUAL COLLABORATION</span>
        <span>BASED IN CHINA · 2026</span>
      </div>

      <header className="site-header">
        <a className="monogram" href="#top" aria-label="返回首页">
          TJL<span>®</span>
        </a>
        <nav aria-label="主导航">
          <a href="#work">作品</a>
          <a href="#approach">方法</a>
          <a href="#about">关于</a>
        </nav>
        <a className="header-contact" href="#contact">
          联系合作 <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">TIAN JIALIN / PRODUCT DESIGNER</p>
          <h1>
            DESIGN
            <br />
            BEYOND
            <br />
            THE FRAME<span className="hero-dot">.</span>
          </h1>
          <div className="hero-intro">
            <p>
              我是田嘉林，一名产品设计师。
              <br />
              将产品、空间与视觉组织成真实体验。
            </p>
            <a href="#work">查看精选作品 ↓</a>
          </div>
        </div>
        <div className="hero-visual">
          <img
            src="/work/guiyang-space.webp"
            alt="乐事贵阳品牌馆空间设计"
            fetchPriority="high"
          />
          <div className="hero-visual-label">
            <span>SELECTED WORKS</span>
            <span>2023—2026</span>
          </div>
        </div>
      </section>

      <section className="discipline-strip" aria-label="专业领域">
        <span>BRAND</span>
        <span>SPACE</span>
        <span>AIGC</span>
        <span>3D</span>
      </section>

      <section className="statement">
        <p className="section-index">00 / PROFILE</p>
        <p className="statement-lead">
          设计不止是一种外观，
          <br />
          而是把功能、文化与品牌意图，
          <br />
          组织成<span>可被理解、使用和记住</span>的体验。
        </p>
        <div className="statement-meta">
          <p>从概念策略到三维验证，再到真实落地与传播延展。</p>
          <div>
            <span>RHINO</span>
            <span>KEYSHOT</span>
            <span>PHOTOSHOP</span>
            <span>ILLUSTRATOR</span>
            <span>AIGC</span>
          </div>
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="section-heading">
          <p className="section-index">01 / SELECTED WORKS</p>
          <h2>落地项目</h2>
          <p>品牌体验 · 空间视觉 · 三维表达 · 整合传播</p>
        </div>

        <div className="project-list">
          {projects.map((project) => (
            <article className={`project ${project.tone}`} key={project.number}>
              <div className="project-topline">
                <span>{project.number}</span>
                <span>{project.status}</span>
                <span>{project.year}</span>
              </div>
              <div className="project-copy">
                <h3>{project.title}</h3>
                <p className="project-subtitle">{project.subtitle}</p>
                <p className="project-description">{project.description}</p>
                <p className="project-role">
                  <span>MY ROLE</span>
                  {project.role}
                </p>
              </div>
              <div className="project-media project-media--main">
                <img src={project.image} alt={project.imageAlt} loading="lazy" />
              </div>
              <div className="project-media project-media--detail">
                <img
                  src={project.detailImage}
                  alt={project.detailAlt}
                  loading="lazy"
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="selected-section">
        <div className="section-heading section-heading--compact">
          <p className="section-index">02 / MORE WORK</p>
          <h2>更多选作</h2>
        </div>
        <div className="selected-grid">
          {selectedWorks.map((work, index) => (
            <article className="selected-card" key={work.title}>
              <div className="selected-image">
                <img src={work.image} alt={work.alt} loading="lazy" />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3>{work.title}</h3>
              <p>{work.type}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="approach-section" id="approach">
        <div className="approach-intro">
          <p className="section-index">03 / DESIGN APPROACH</p>
          <h2>
            从一个想法，
            <br />
            到可落地的系统。
          </h2>
          <p>
            三维不只是表现工具，也是设计验证语言。通过结构、材质、光影与场景关系，让概念更清楚，让协作更高效。
          </p>
        </div>
        <ol className="process-list">
          {process.map(([number, title, description]) => (
            <li key={number}>
              <span>{number}</span>
              <strong>{title}</strong>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="about-section" id="about">
        <p className="section-index">04 / ABOUT</p>
        <div className="about-grid">
          <h2>
            清晰地想，
            <br />
            大胆地做。
          </h2>
          <div className="about-copy">
            <p>
              我关注品牌如何在真实世界里被看见、被触碰，也被记住。工作跨越品牌视觉、空间体验、产品渲染与整合营销，并习惯用三维工具把抽象概念快速变成可讨论、可验证的方案。
            </p>
            <dl>
              <div>
                <dt>FOCUS</dt>
                <dd>品牌 / 空间 / 产品 / AIGC</dd>
              </div>
              <div>
                <dt>TOOLS</dt>
                <dd>Rhino / KeyShot / PS / AI</dd>
              </div>
              <div>
                <dt>EXPERIENCE</dt>
                <dd>2023—2026 Selected Works</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <footer id="contact">
        <p className="section-index">05 / CONTACT</p>
        <p className="footer-kicker">LET&apos;S CREATE NEXT.</p>
        <a className="footer-phone" href="tel:+8613279403213">
          132 7940 3213 <span aria-hidden="true">↗</span>
        </a>
        <div className="footer-bottom">
          <span>田嘉林 / PRODUCT DESIGNER</span>
          <span>期待下一次创造。</span>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </footer>
    </main>
  );
}
