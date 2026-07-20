export type ArchiveProject = {
  title: string;
  type: string;
  cover: string;
  images: string[];
};

function imageSequence(slug: string, count: number) {
  return Array.from({ length: count }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    return `/work/archive/${slug}/${slug}-${number}.webp`;
  });
}

function project(title: string, type: string, slug: string, count: number): ArchiveProject {
  return {
    title,
    type,
    cover: `/work/archive/${slug}/${slug}-01-thumb.webp`,
    images: imageSequence(slug, count),
  };
}

export const archiveProjects: ArchiveProject[] = [
  project("陕西城市文创", "城市文化 / 文创 / IP", "city-culture", 24),
  project("长安有乐事", "唐风 IP / 品牌活动", "changan-lays", 13),
  project("乐事贵阳城市项目", "区域营销 / 空间 / 零售", "guiyang-lays", 8),
  project("百事长安城与饮品激活", "终端 / 快闪 / 整合传播", "pepsi-activation", 22),
  project("乐事 × 陕西联合", "体育营销 / 联名视觉", "lays-union", 14),
  project("佳得乐篮球激活", "运动零售 / 空间体验", "gatorade", 9),
  project("包装与零售视觉", "包装 / 陈列 / 平面", "packaging-retail", 15),
  project("作品集精选版式", "Portfolio / Case Study", "portfolio-layout", 19),
  project("AOMA 珠宝视觉", "珠宝海报 / 视觉设计", "aoma-jewelry", 2),
];
