/* 梅西耶天体数据 —— 图片均摄于个人天文摄影项目
 * fits: 原始 FITS 文件下载链接（百度网盘上传前暂用占位地址） */
const FITS_URL = "www.zzz.com";

const MESSIER = [
  {
    file: "M1",
    name: "M1 蟹状星云",
    en: "Crab Nebula",
    type: "超新星遗迹",
    constellation: "金牛座",
    distance: "约 6,500 光年",
    desc: "公元 1054 年超新星爆发留下的遗迹，中国宋代天文学家曾记录这颗「天关客星」。星云内部有一颗高速自转的脉冲星，正以每秒约 30 圈的速度扫射辐射束。"
  },
  {
    file: "M3",
    name: "M3 球状星团",
    en: "Globular Cluster",
    type: "球状星团",
    constellation: "猎犬座",
    distance: "约 34,000 光年",
    desc: "北天最明亮的球状星团之一，包含约 50 万颗恒星，年龄超过 80 亿年。是研究恒星演化的经典目标。"
  },
  {
    file: "M4",
    name: "M4 球状星团",
    en: "Globular Cluster",
    type: "球状星团",
    constellation: "天蝎座",
    distance: "约 7,200 光年",
    desc: "距离地球最近的球状星团之一，因位于心宿二附近且结构较松散，在小型望远镜中即可分辨出部分恒星。"
  },
  {
    file: "M5",
    name: "M5 球状星团",
    en: "Globular Cluster",
    type: "球状星团",
    constellation: "巨蛇座",
    distance: "约 24,500 光年",
    desc: "已知最古老的球状星团之一，年龄接近 130 亿年，核心高度密集，拥有大量变星。"
  },
  {
    file: "M6",
    name: "M6 蝴蝶星团",
    en: "Butterfly Cluster",
    type: "疏散星团",
    constellation: "天蝎座",
    distance: "约 1,600 光年",
    desc: "因恒星排列形似蝴蝶而得名，成员星多为明亮的蓝白色年轻恒星，是夏季银河中的亮丽目标。"
  },
  {
    file: "M8",
    name: "M8 礁湖星云",
    en: "Lagoon Nebula",
    type: "发射星云",
    constellation: "人马座",
    distance: "约 4,100 光年",
    desc: "银河系中最壮观的恒星形成区之一，星云内部有被暗带分隔的明亮核心，中心藏着一颗激发整个星云的电离星。"
  },
  {
    file: "M10",
    name: "M10 球状星团",
    en: "Globular Cluster",
    type: "球状星团",
    constellation: "蛇夫座",
    distance: "约 14,300 光年",
    desc: "结构较松散的球状星团，在低倍率下呈现明显的颗粒感，位于蛇夫座与天蝎座交界附近。"
  },
  {
    file: "M11",
    name: "M11 野鸭星团",
    en: "Wild Duck Cluster",
    type: "疏散星团",
    constellation: "盾牌座",
    distance: "约 6,200 光年",
    desc: "已知最密集的疏散星团之一，数百颗恒星排列成 V 形，形似飞行中的野鸭群。"
  },
  {
    file: "M13",
    name: "M13 武仙座大球状星团",
    en: "Hercules Globular Cluster",
    type: "球状星团",
    constellation: "武仙座",
    distance: "约 22,000 光年",
    desc: "北半球最著名的球状星团，肉眼在暗空下即可隐约看见，包含数十万颗恒星，1974 年曾向该星团发送阿雷西博信息。"
  },
  {
    file: "M16",
    name: "M16 鹰状星云",
    en: "Eagle Nebula",
    type: "发射星云",
    constellation: "巨蛇座",
    distance: "约 5,700 光年",
    desc: "著名的「创生之柱」所在地，哈勃望远镜的经典照片即拍摄于此。星云中大量年轻恒星正在气体柱内孕育诞生。"
  },
  {
    file: "M17",
    name: "M17 欧米伽星云",
    en: "Omega Nebula",
    type: "发射星云",
    constellation: "人马座",
    distance: "约 5,000 光年",
    desc: "又称天鹅星云，是银河系最明亮、质量最大的恒星形成区之一，形似希腊字母 Ω 或天鹅的脖颈。"
  },
  {
    file: "M20",
    name: "M20 三叶星云",
    en: "Trifid Nebula",
    type: "发射星云",
    constellation: "人马座",
    distance: "约 4,100 光年",
    desc: "因三条暗尘埃带将明亮部分切割成三片而得名。它同时包含红色的发射星云、蓝色的反射星云和暗星云，色彩层次丰富。"
  },
  {
    file: "M24",
    name: "M24 人马座星云",
    en: "Sagittarius Star Cloud",
    type: "银河星云/星场",
    constellation: "人马座",
    distance: "约 10,000 光年",
    desc: "其实并非星云，而是银河系核球方向上一段异常清澈、恒星密集的区域，透过尘埃带窥见银河深处的繁星。"
  },
  {
    file: "M29",
    name: "M29 疏散星团",
    en: "Open Cluster",
    type: "疏散星团",
    constellation: "天鹅座",
    distance: "约 4,000 光年",
    desc: "位于天鹅座银河带中的小型疏散星团，成员星较少但明亮，被周围稠密的星场所环绕。"
  },
  {
    file: "M31-32-110",
    name: "M31 仙女座大星系（含 M32、M110）",
    en: "Andromeda Galaxy",
    type: "旋涡星系",
    constellation: "仙女座",
    distance: "约 250 万光年",
    desc: "距离银河系最近的大型旋涡星系，也是肉眼可见的最遥远天体。画面中同时可见其两个伴星系 M32（下方）与 M110（左上）。"
  },
  {
    file: "M33",
    name: "M33 三角座星系",
    en: "Triangulum Galaxy",
    type: "旋涡星系",
    constellation: "三角座",
    distance: "约 270 万光年",
    desc: "本星系群第三大星系，正面朝向地球，旋臂中散布着大量粉红色的电离氢区和明亮年轻星团。"
  },
  {
    file: "M34",
    name: "M34 疏散星团",
    en: "Open Cluster",
    type: "疏散星团",
    constellation: "英仙座",
    distance: "约 1,500 光年",
    desc: "位于英仙座的明亮疏散星团，成员星分布较分散，双筒望远镜中即可欣赏到数十颗恒星。"
  },
  {
    file: "M35",
    name: "M35 疏散星团",
    en: "Open Cluster",
    type: "疏散星团",
    constellation: "双子座",
    distance: "约 2,800 光年",
    desc: "双子座足部的著名星团，拥有数百颗恒星。在其附近还可找到更遥远、更致密的 NGC 2158。"
  },
  {
    file: "M36",
    name: "M36 疏散星团",
    en: "Open Cluster",
    type: "疏散星团",
    constellation: "御夫座",
    distance: "约 4,100 光年",
    desc: "御夫座三个著名星团之一，恒星排列较为整齐，包含多颗明亮的蓝白色主序星。"
  },
  {
    file: "M37",
    name: "M37 疏散星团",
    en: "Open Cluster",
    type: "疏散星团",
    constellation: "御夫座",
    distance: "约 4,500 光年",
    desc: "御夫座三星团中最富丽的一个，拥有约 500 颗恒星并含多颗红巨星，核心区域格外密集。"
  },
  {
    file: "M38",
    name: "M38 疏散星团",
    en: "Open Cluster",
    type: "疏散星团",
    constellation: "御夫座",
    distance: "约 4,200 光年",
    desc: "形状近似十字或希腊字母 π，与 M36 同处御夫座星团群中，年龄约 2.2 亿年。"
  },
  {
    file: "M39",
    name: "M39 疏散星团",
    en: "Open Cluster",
    type: "疏散星团",
    constellation: "天鹅座",
    distance: "约 800 光年",
    desc: "距离较近的大范围疏散星团，成员星稀疏明亮，在双筒望远镜中呈现三角形轮廓。"
  },
  {
    file: "M40",
    name: "M40 双星",
    en: "Winnecke 4",
    type: "双星",
    constellation: "大熊座",
    distance: "约 500 光年",
    desc: "梅西耶星表中唯一一个并非星团的目标——一对光学双星。当年梅西耶为核查此前的误报而将其收录。"
  },
  {
    file: "M41",
    name: "M41 疏散星团",
    en: "Open Cluster",
    type: "疏散星团",
    constellation: "大犬座",
    distance: "约 2,300 光年",
    desc: "位于天狼星正南方的明亮星团，约含 100 颗恒星，中央有一颗醒目的橙红色巨星。"
  },
  {
    file: "M42-43",
    name: "M42 猎户座大星云（含 M43）",
    en: "Orion Nebula",
    type: "发射星云",
    constellation: "猎户座",
    distance: "约 1,344 光年",
    desc: "夜空中最明亮的弥漫星云，肉眼可见于猎户座腰带下方。这里是离地球最近的大质量恒星形成区，右上角的小片为 M43（德梅兰星云）。"
  },
  {
    file: "M44",
    name: "M44 蜂巢星团",
    en: "Beehive Cluster",
    type: "疏散星团",
    constellation: "巨蟹座",
    distance: "约 577 光年",
    desc: "又称鬼星团，古人即知其存在。星团成员星逾千颗，在暗空下肉眼呈现为一小片朦胧光斑。"
  },
  {
    file: "M45",
    name: "M45 昴星团",
    en: "Pleiades",
    type: "疏散星团",
    constellation: "金牛座",
    distance: "约 444 光年",
    desc: "最著名的疏散星团，中国古称「昴宿」，日本称「昴」。明亮蓝白色恒星被淡淡的反射星云包裹，如同钻石洒在夜空。"
  },
  {
    file: "M46",
    name: "M46 疏散星团",
    en: "Open Cluster",
    type: "疏散星团",
    constellation: "船尾座",
    distance: "约 5,400 光年",
    desc: "一个古老而密集的疏散星团，前景恰好叠加着行星状星云 NGC 2438，形成星团与星云同框的难得景象。"
  },
  {
    file: "M47",
    name: "M47 疏散星团",
    en: "Open Cluster",
    type: "疏散星团",
    constellation: "船尾座",
    distance: "约 1,600 光年",
    desc: "明亮而松散的星团，包含数十颗蓝白色恒星，是船尾座中易于观测的目标。"
  },
  {
    file: "M48",
    name: "M48 疏散星团",
    en: "Open Cluster",
    type: "疏散星团",
    constellation: "长蛇座",
    distance: "约 1,500 光年",
    desc: "约含 80 颗成员星的中等规模星团，分布均匀，在小型望远镜中呈现柔和的光斑。"
  },
  {
    file: "M51",
    name: "M51 涡状星系",
    en: "Whirlpool Galaxy",
    type: "旋涡星系",
    constellation: "猎犬座",
    distance: "约 2,300 万光年",
    desc: "人类最早确认具有旋涡结构的星系之一，正与伴星系 NGC 5195 发生引力相互作用，旋臂因此被拉伸得格外清晰。"
  },
  {
    file: "M52",
    name: "M52 疏散星团",
    en: "Open Cluster",
    type: "疏散星团",
    constellation: "仙后座",
    distance: "约 4,600 光年",
    desc: "仙后座的富星团，约含 200 颗恒星，其中几颗红巨星为星团增添了温暖的色彩。"
  },
  {
    file: "M53",
    name: "M53 球状星团",
    en: "Globular Cluster",
    type: "球状星团",
    constellation: "后发座",
    distance: "约 58,000 光年",
    desc: "后发座中明亮的球状星团，距离遥远且结构紧密，核心区域难以分解。"
  },
  {
    file: "M58",
    name: "M58 棒旋星系",
    en: "Barred Spiral Galaxy",
    type: "棒旋星系",
    constellation: "室女座",
    distance: "约 6,800 万光年",
    desc: "室女座星系团成员，拥有明显的中央棒状结构与对称旋臂，是梅西耶星表中最早被识别出旋涡结构的星系之一。"
  },
  {
    file: "M59-60",
    name: "M59 与 M60 椭圆星系",
    en: "Elliptical Galaxies",
    type: "椭圆星系",
    constellation: "室女座",
    distance: "约 6,000 万光年",
    desc: "同框的两位室女座星系团成员。M60 是其中较大者，其附近还隐约可见更暗的 NGC 4647。"
  },
  {
    file: "M61",
    name: "M61 旋涡星系",
    en: "Spiral Galaxy",
    type: "旋涡星系",
    constellation: "室女座",
    distance: "约 5,250 万光年",
    desc: "室女座星系团中较明亮的旋涡星系，正面朝向地球，旋臂上散布着大量恒星形成区。"
  },
  {
    file: "M63",
    name: "M63 向日葵星系",
    en: "Sunflower Galaxy",
    type: "旋涡星系",
    constellation: "猎犬座",
    distance: "约 2,700 万光年",
    desc: "因旋臂结构如向日葵花瓣般细密而得名，是 M51 星系群的重要成员，拥有大量絮状恒星形成区。"
  },
  {
    file: "M64",
    name: "M64 黑眼星系",
    en: "Black Eye Galaxy",
    type: "旋涡星系",
    constellation: "后发座",
    distance: "约 1,700 万光年",
    desc: "因明亮核心前横亘着一片浓密暗尘埃带、形似一只黑色的眼睛而得名。其内外盘气体旋转方向相反，暗示它曾吞并过另一个星系。"
  },
  {
    file: "M66",
    name: "M66 旋涡星系",
    en: "Spiral Galaxy",
    type: "旋涡星系",
    constellation: "狮子座",
    distance: "约 3,600 万光年",
    desc: "狮子座三重星系中最大最亮的一员，因与邻近星系引力互动，旋臂结构略显不对称。"
  },
  {
    file: "M67",
    name: "M67 疏散星团",
    en: "Open Cluster",
    type: "疏散星团",
    constellation: "巨蟹座",
    distance: "约 2,700 光年",
    desc: "已知最古老的疏散星团之一，年龄约 40 亿年，与太阳年龄相仿，是研究类太阳恒星演化的宝贵样本。"
  },
  {
    file: "M74",
    name: "M74 幻影星系",
    en: "Phantom Galaxy",
    type: "旋涡星系",
    constellation: "双鱼座",
    distance: "约 3,200 万光年",
    desc: "一个近乎完美正面朝向的「宏大设计」旋涡星系，旋臂极为对称舒展，但表面亮度很低，观测颇具挑战。"
  },
  {
    file: "M78",
    name: "M78 反射星云",
    en: "Reflection Nebula",
    type: "反射星云",
    constellation: "猎户座",
    distance: "约 1,600 光年",
    desc: "猎户座中最大的反射星云，尘埃颗粒将附近年轻恒星的蓝光散射开来，呈现幽蓝色调。"
  },
  {
    file: "M81-82",
    name: "M81 波德星系与 M82 雪茄星系",
    en: "Bode's & Cigar Galaxies",
    type: "旋涡/不规则星系",
    constellation: "大熊座",
    distance: "约 1,200 万光年",
    desc: "一对著名的互动星系。M81 拥有优美的旋臂，M82 则因强烈恒星形成活动而被称为星暴星系，侧向呈现雪茄状。"
  },
  {
    file: "M85",
    name: "M85 透镜状星系",
    en: "Lenticular Galaxy",
    type: "透镜状星系",
    constellation: "后发座",
    distance: "约 6,000 万光年",
    desc: "后发座星系团中最靠北的成员，形态介于椭圆星系与旋涡星系之间，几乎看不到旋臂结构。"
  },
  {
    file: "M87",
    name: "M87 椭圆星系",
    en: "Virgo A",
    type: "椭圆星系",
    constellation: "室女座",
    distance: "约 5,350 万光年",
    desc: "室女座星系团的中心巨星系，也是人类首次拍到黑洞影像（事件视界望远镜，2019 年）的宿主星系，其核心喷流可延伸数千光年。"
  },
  {
    file: "M88-91",
    name: "M88 与 M91 旋涡星系",
    en: "Spiral Galaxies",
    type: "旋涡星系",
    constellation: "后发座 / 室女座",
    distance: "约 5,000–6,000 万光年",
    desc: "同框的两位旋涡星系。M88 旋臂细密，M91 则拥有明显的中央棒结构，二者均为室女座星系团成员。"
  },
  {
    file: "M92",
    name: "M92 球状星团",
    en: "Globular Cluster",
    type: "球状星团",
    constellation: "武仙座",
    distance: "约 26,700 光年",
    desc: "武仙座中的另一个明亮球状星团，常被 M13 的光芒掩盖，但其核心同样高度密集、星点璀璨。"
  },
  {
    file: "M94",
    name: "M94 鳄鱼眼星系",
    en: "Cat's Eye Galaxy",
    type: "旋涡星系",
    constellation: "猎犬座",
    distance: "约 1,600 万光年",
    desc: "拥有异常明亮的致密核心和一圈活跃的恒星形成环，中心区域形似鳄鱼的眼睛，是研究星系核环结构的经典对象。"
  },
  {
    file: "M95-96",
    name: "M95 与 M96 旋涡星系",
    en: "Spiral Galaxies",
    type: "旋涡星系",
    constellation: "狮子座",
    distance: "约 3,300 万光年",
    desc: "狮子座 I 星系群的两位主要成员。M95 具有明显的中央棒与环形结构，M96 则是正面朝向的旋涡星系。"
  },
  {
    file: "M96-105",
    name: "M105 与 M96 星系",
    en: "Galaxies",
    type: "椭圆/旋涡星系",
    constellation: "狮子座",
    distance: "约 3,300–3,800 万光年",
    desc: "M105 为巨大的椭圆星系，与旋涡星系 M96 同处一片天区，是狮子座星系群中亮丽的星系对。"
  },
  {
    file: "M97-108",
    name: "M97 猫头鹰星云与 M108 冲浪板星系",
    en: "Owl Nebula & Surfboard Galaxy",
    type: "行星状星云 / 旋涡星系",
    constellation: "大熊座",
    distance: "约 2,000 / 4,500 万光年",
    desc: "一近一远、形态迥异的目标。M97 是形似猫头鹰面孔的行星状星云，侧向的 M108 则像一块细长的冲浪板，二者在广角画面中同框。"
  },
  {
    file: "M99",
    name: "M99 风车星系",
    en: "Coma Pinwheel Galaxy",
    type: "旋涡星系",
    constellation: "后发座",
    distance: "约 5,000 万光年",
    desc: "室女座星系团中一个几乎完全正面朝向的旋涡星系，旋臂不对称，是星系团内高速运动的成员。"
  },
  {
    file: "M101",
    name: "M101 风车星系",
    en: "Pinwheel Galaxy",
    type: "旋涡星系",
    constellation: "大熊座",
    distance: "约 2,100 万光年",
    desc: "夜空中最壮观的正面旋涡星系之一，直径接近银河系的两倍，旋臂上点缀着数千个恒星形成区。"
  },
  {
    file: "M104",
    name: "M104 草帽星系",
    en: "Sombrero Galaxy",
    type: "透镜状/旋涡星系",
    constellation: "室女座",
    distance: "约 2,900 万光年",
    desc: "因侧向盘面与中央巨大核球组合形似墨西哥草帽而得名。赤道尘埃带清晰锐利，核心异常明亮。"
  },
  {
    file: "M106",
    name: "M106 旋涡星系",
    en: "Spiral Galaxy",
    type: "旋涡星系",
    constellation: "猎犬座",
    distance: "约 2,400 万光年",
    desc: "一个活动星系核（赛弗特星系），其核心正在猛烈吞噬物质并向外喷射水分子脉泽，旋臂结构舒展。"
  },
  {
    file: "M109",
    name: "M109 棒旋星系",
    en: "Barred Spiral Galaxy",
    type: "棒旋星系",
    constellation: "大熊座",
    distance: "约 8,300 万光年",
    desc: "大熊座中明亮的棒旋星系，中央棒状结构显著，旋臂上可见多个恒星形成区。"
  }
];
