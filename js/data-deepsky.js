/* 非梅西耶深空天体数据 —— 个人天文摄影项目
 * fits: 原始 FITS 文件下载链接（百度网盘上传前暂用占位地址，见 data.js 的 FITS_URL） */
const DEEPSKY = [
  {
    file: "IC1396",
    name: "IC 1396 象鼻星云",
    en: "Elephant's Trunk Nebula",
    type: "发射星云",
    constellation: "仙王座",
    distance: "约 2,400 光年",
    desc: "仙王座中一片广阔的恒星形成区，内部被年轻恒星的辐射与星风雕刻出著名的「象鼻」暗尘埃柱，柱内仍在孕育新恒星。"
  },
  {
    file: "IC1848",
    name: "IC 1848 灵魂星云",
    en: "Soul Nebula",
    type: "发射星云",
    constellation: "仙后座",
    distance: "约 7,500 光年",
    desc: "与心脏星云（IC 1805）相邻的大型恒星形成区，因形似侧卧的人形而被称为「灵魂」。星云内部散布着多个年轻星团。"
  },
  {
    file: "IC2118",
    name: "IC 2118 女巫头星云",
    en: "Witch Head Nebula",
    type: "反射星云",
    constellation: "波江座",
    distance: "约 1,000 光年",
    desc: "一片被参宿七（Rigel）的蓝光照亮的反射星云，尘埃云轮廓酷似女巫的侧脸，因此得名。整体呈现幽冷的蓝色调。"
  },
  {
    file: "IC342",
    name: "IC 342 隐藏星系",
    en: "Hidden Galaxy",
    type: "旋涡星系",
    constellation: "鹿豹座",
    distance: "约 1,100 万光年",
    desc: "一个正面朝向地球的大型旋涡星系，因位于银河系盘面尘埃之后而被严重遮蔽，故称「隐藏星系」。"
  },
  {
    file: "IC405",
    name: "IC 405 火焰星星云",
    en: "Flaming Star Nebula",
    type: "发射/反射星云",
    constellation: "御夫座",
    distance: "约 1,500 光年",
    desc: "由炽热的逃逸星 AE Aurigae 照亮并激发的星云，氢气体发出红光、尘埃反射蓝光，明暗交织如跳动的火焰。"
  },
  {
    file: "IC410",
    name: "IC 410 蝌蚪星云",
    en: "Tadpole Nebula",
    type: "发射星云",
    constellation: "御夫座",
    distance: "约 12,000 光年",
    desc: "星云中心是年轻星团 NGC 1893，其辐射塑造出两条著名的「蝌蚪」状尘埃柱，柱头明亮、尾部朝外，是恒星形成活动的标志。"
  },
  {
    file: "IC434",
    name: "IC 434 马头星云",
    en: "Horsehead Nebula",
    type: "暗星云/发射星云",
    constellation: "猎户座",
    distance: "约 1,375 光年",
    desc: "猎户座中极具辨识度的暗星云，浓密尘埃在后方发射星云红光的衬托下勾勒出马头轮廓，是天文摄影的经典目标。"
  },
  {
    file: "IC443",
    name: "IC 443 水母星云",
    en: "Jellyfish Nebula",
    type: "超新星遗迹",
    constellation: "双子座",
    distance: "约 5,000 光年",
    desc: "一颗超新星爆发后留下的遗迹，膨散的丝状气体形似漂浮的水母。它与 M1 蟹状星云同为著名的超新星遗迹。"
  },
  {
    file: "LDN1289",
    name: "LDN 1289 暗星云",
    en: "Dark Nebula",
    type: "暗星云",
    constellation: "仙王座",
    distance: "约 1,000 光年",
    desc: "仙王座尘埃带中的一片暗星云，浓密的尘埃遮蔽了后方银河星光，在繁星背景中呈现为轮廓柔和的暗弱空域。"
  },
  {
    file: "NGC1499",
    name: "NGC 1499 加州星云",
    en: "California Nebula",
    type: "发射星云",
    constellation: "英仙座",
    distance: "约 1,000 光年",
    desc: "一条狭长的发射星云，形状酷似美国加利福尼亚州的地图，被英仙座 ξ 星的辐射电离而发出暗弱的红光。"
  },
  {
    file: "NGC188",
    name: "NGC 188 北极星团",
    en: "Polaris Cluster",
    type: "疏散星团",
    constellation: "仙王座",
    distance: "约 5,400 光年",
    desc: "靠近北极星方向的古老疏散星团，年龄约 65 亿年，是已知最古老的疏散星团之一。"
  },
  {
    file: "NGC2175",
    name: "NGC 2175 猴头星云",
    en: "Monkey Head Nebula",
    type: "发射星云/星团",
    constellation: "猎户座",
    distance: "约 6,400 光年",
    desc: "猎户座中一片明亮的恒星形成区，被年轻星团照亮，尘埃与气体的组合在影像中形似一只猴子的面孔。"
  },
  {
    file: "NGC2237",
    name: "NGC 2237 玫瑰星云",
    en: "Rosette Nebula",
    type: "发射星云",
    constellation: "麒麟座",
    distance: "约 5,200 光年",
    desc: "麒麟座中巨大的发射星云，中心星团的星风将气体吹出空洞，整体形似一朵盛开的玫瑰，红瓣绿芯层次分明。"
  },
  {
    file: "NGC4435",
    name: "NGC 4435 透镜状星系",
    en: "The Eyes Galaxy",
    type: "透镜状星系",
    constellation: "室女座",
    distance: "约 5,200 万光年",
    desc: "室女座星系团成员，与邻近的 NGC 4438 组成著名的「双眼星系」。其形态平滑，缺少明显的旋臂结构。"
  },
  {
    file: "NGC6888",
    name: "NGC 6888 眉月星云",
    en: "Crescent Nebula",
    type: "发射星云",
    constellation: "天鹅座",
    distance: "约 5,000 光年",
    desc: "由沃尔夫–拉叶星 WR 136 抛出的星风与早先喷发的物质碰撞形成的壳层星云，形如一弯新月。"
  },
  {
    file: "NGC6960",
    name: "NGC 6960 面纱星云·西段",
    en: "Western Veil Nebula",
    type: "超新星遗迹",
    constellation: "天鹅座",
    distance: "约 2,400 光年",
    desc: "面纱星云（天鹅座 Loop）的西侧部分，又称「女巫的扫帚」。约一万年前超新星爆发的激波仍在电离并照亮这些纤细的丝状气体。"
  },
  {
    file: "NGC6995",
    name: "NGC 6995 面纱星云·东段",
    en: "Eastern Veil Nebula",
    type: "超新星遗迹",
    constellation: "天鹅座",
    distance: "约 2,400 光年",
    desc: "面纱星云东侧明亮的丝状结构，与 NGC 6960 同属一个古老超新星遗迹，交织的发光气体如轻纱般铺展在星空。"
  },
  {
    file: "NGC7023",
    name: "NGC 7023 鸢尾花星云",
    en: "Iris Nebula",
    type: "反射星云",
    constellation: "仙王座",
    distance: "约 1,300 光年",
    desc: "一片被年轻恒星照亮的反射星云，尘埃散射出柔和的蓝色光晕，中心暗尘埃勾勒出花瓣般的结构，宛如盛开的鸢尾花。"
  },
  {
    file: "NGC7293",
    name: "NGC 7293 螺旋星云",
    en: "Helix Nebula",
    type: "行星状星云",
    constellation: "宝瓶座",
    distance: "约 650 光年",
    desc: "距离地球最近的行星状星云之一，是类太阳恒星临终时抛出的气体外壳，正面朝向地球，形似一只凝视苍穹的「上帝之眼」。"
  },
  {
    file: "NGC7331",
    name: "NGC 7331 飞马座星系",
    en: "NGC 7331",
    type: "旋涡星系",
    constellation: "飞马座",
    distance: "约 4,000 万光年",
    desc: "飞马座中一个明亮的旋涡星系，形态与银河系相似，只是略微倾斜，旋臂与中央尘埃带清晰可见。"
  },
  {
    file: "NGC869",
    name: "NGC 869 英仙座 h 星团",
    en: "h Persei",
    type: "疏散星团",
    constellation: "英仙座",
    distance: "约 7,500 光年",
    desc: "英仙座「双星团」中较亮的一员，与 NGC 884 相邻。年轻的蓝白色恒星密集排列，肉眼在暗空下即可分辨为一团朦胧光斑。"
  },
  {
    file: "SH2-157",
    name: "SH2-157 龙虾爪星云",
    en: "Lobster Claw Nebula",
    type: "发射星云",
    constellation: "仙后座",
    distance: "约 11,000 光年",
    desc: "仙后座中一片暗弱的发射星云，氢气体结构形似一只龙虾的巨爪，常与邻近的 NGC 7538 恒星形成区一同出现在广角影像中。"
  },
  {
    file: "SH2-273",
    name: "SH2-273 锥状星云区域",
    en: "Cone Nebula Region",
    type: "发射星云",
    constellation: "麒麟座",
    distance: "约 2,500 光年",
    desc: "包围圣诞树星团（NGC 2264）的广阔电离氢区，其中暗尘埃锥状结构与明亮的狐狸皮星云交相辉映，是冬季星空中的经典目标。"
  }
];
