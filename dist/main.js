document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    history.replaceState(null, '', link.getAttribute('href'));
  });
});

// Keep the ongoing rally study visible on the homepage without opening its case page.
const rallyWipLink = document.querySelector('[data-wip-project]');
const rallyWipDialog = document.querySelector('#rally-wip-dialog');
if (rallyWipLink && rallyWipDialog instanceof HTMLDialogElement) {
  rallyWipLink.addEventListener('click', (event) => {
    event.preventDefault();
    rallyWipDialog.showModal();
  });
  rallyWipDialog.addEventListener('click', (event) => {
    if (event.target === rallyWipDialog) rallyWipDialog.close();
  });
}

// Keep project references after the next-project panel on every case-study page.
document.querySelectorAll('.references-section, .workplace-references-section').forEach((section) => {
  const nextProject = section.parentElement?.querySelector(':scope > .case-next');
  if (nextProject) nextProject.after(section);
});

// Give every project navigator a prominent Chinese label with the English index below it.
document.querySelectorAll('.case-next > span').forEach((label) => {
  const nextCase = label.textContent.match(/NEXT CASE\s*\/\s*(\d+)/i);
  if (nextCase) {
    label.innerHTML = `下一个项目<small>NEXT CASE / ${nextCase[1]}</small>`;
  } else if (/BACK TO WORK/i.test(label.textContent)) {
    label.innerHTML = '返回作品<small>BACK TO WORK</small>';
  }
});

// Place the research matrix after the stakeholder-system analysis and before strategy.
const santanderResearch = document.querySelector('.santander-page .research-analysis');
if (santanderResearch) {
  const researchCardTitles = new Map([
    ['车辆在哪里？', '车辆获取边界'],
    ['供需如何匹配？', '供需匹配机制'],
    ['便利由谁承担成本？', '便利性的运营成本'],
    ['不确定时如何补救？', '不确定性的补救机制']
  ]);
  santanderResearch.querySelectorAll('.case-card h3').forEach((heading) => {
    const replacement = researchCardTitles.get(heading.textContent.trim());
    if (replacement) heading.textContent = replacement;
  });
}
document.querySelectorAll('.santander-page .note').forEach((note) => {
  if (note.textContent.includes('竞品框架用于比较服务机制和设计取舍')) note.remove();
});

const santanderResearchSection = santanderResearch?.closest('.case-section');
if (santanderResearchSection && !document.querySelector('.research-scope')) {
  const researchScope = document.createElement('section');
  researchScope.className = 'research-scope';
  researchScope.innerHTML = '<header><span>研究范围 / SCOPE</span><h3>先说明证据从哪里来</h3></header><div class="research-scope-grid"><article><b>研究方法</b><p>桌面资料研究、竞品机制比较、用户旅程梳理、服务系统与利益相关者分析。</p></article><article><b>证据边界</b><p>页面结论主要来自公开资料与团队分析，用于提出概念方向；尚未替代真实用户测试与运营数据验证。</p></article><article><b>我的角色</b><p>聚焦研究框架整理、系统关系归纳、机会矩阵、方案逻辑与风险表达；项目由 5 人团队共同完成。</p></article></div>';
  santanderResearchSection.querySelector('.evidence-strip')?.after(researchScope);
}

if (santanderResearchSection && !document.querySelector('.santander-competitor-swot')) {
  const competitorHeading = [...santanderResearchSection.querySelectorAll('.research-subhead')].find((heading) => heading.textContent.includes('竞品比较'));
  const competitorCopy = competitorHeading?.nextElementSibling;
  if (competitorCopy?.tagName === 'P') {
    const competitorSwot = document.createElement('figure');
    competitorSwot.className = 'santander-competitor-swot';
    competitorSwot.innerHTML = '<div class="competitor-swot-scroll"><img src="images/santander-competitor-swot.png" alt="Brompton Bike Hire、Lime 与 Santander Cycles 的 SWOT 竞品分析，对比三种服务的优势、劣势、机会与威胁" loading="lazy"></div><figcaption><span>竞品分析 / COMPETITOR SWOT</span><p>统一比较三种租赁模式的服务优势、内部限制与外部发展条件；其中机会与威胁为团队基于服务机制形成的战略分析。</p></figcaption>';
    competitorCopy.after(competitorSwot);
  }
}

if (santanderResearchSection && !document.querySelector('.santander-service-comparison')) {
  const competitorSwot = santanderResearchSection.querySelector('.santander-competitor-swot');
  if (competitorSwot) {
    const serviceComparison = document.createElement('figure');
    serviceComparison.className = 'santander-competitor-swot santander-service-comparison';
    serviceComparison.innerHTML = '<div class="competitor-swot-scroll"><img src="images/santander-service-model-comparison.png" alt="Brompton Bike Hire、Lime 与 Santander Cycles 的服务机制对比，涵盖使用场景、取还车方式、可用性、调度、用户与运营工作以及核心体验风险" loading="lazy"></div><figcaption><span>服务机制对比 / SERVICE MODEL COMPARISON</span><p>用一致维度比较三种模式如何分配取还车边界、调度责任与用户工作，并把竞品差异连接到本项目的方案启发。</p></figcaption>';
    competitorSwot.before(serviceComparison);
  }
}

const santanderStrategy = document.querySelector('.santander-page .innovation-matrix-figure')?.closest('.case-section');
if (santanderStrategy) {
  const directionHeading = [...santanderStrategy.querySelectorAll('.research-subhead')].find((heading) => heading.textContent.includes('两个相互补充的方案方向'));
  if (directionHeading) {
    const directionCopy = directionHeading.nextElementSibling;
    directionHeading.remove();
    if (directionCopy?.tagName === 'P') directionCopy.remove();
  }

  const implementationHeading = [...santanderStrategy.querySelectorAll('.research-subhead')].find((heading) => heading.textContent.includes('实施不是一次 App 更新'));
  if (implementationHeading) {
    const implementationCopy = implementationHeading.nextElementSibling;
    implementationHeading.remove();
    if (implementationCopy?.tagName === 'P') implementationCopy.remove();
  }
  santanderStrategy.querySelector('.case-quote')?.remove();

  const innovationCaption = santanderStrategy.querySelector('.innovation-matrix-figure figcaption p');
  if (innovationCaption) innovationCaption.textContent = '顺路调度需要用户、运营与支付系统共同参与；溢出还车区还需要地方管理与空间审批。两者推动服务从封闭的内部优化，走向更开放的跨主体协作。矩阵位置为团队的战略判断，并非量化测量。';
}

if (santanderResearch && !document.querySelector('.santander-problem-matrix')) {
  const stakeholderSection = document.querySelector('.santander-page .stakeholder-section');
  const stakeholderNumber = stakeholderSection?.querySelector('.section-number');
  const stakeholderHeading = stakeholderSection?.querySelector('.case-content > h2');
  if (stakeholderNumber) stakeholderNumber.textContent = '03 / SYSTEM SYNTHESIS';
  if (stakeholderHeading) stakeholderHeading.innerHTML = '从系统关系，<br>找到可介入的问题<span class="red-mark">.</span>';

  const synthesisBridge = document.createElement('div');
  synthesisBridge.className = 'synthesis-bridge';
  synthesisBridge.innerHTML = '<span>研究综合 / SYNTHESIS</span><h3>从“谁共同维持服务”，进入“哪里需要改变”</h3><p>利益相关者分析明确了服务责任的分布；结合行程中的无车、满桩、安全顾虑和信息不确定性，团队进一步把系统限制整理为问题、机会与可能的介入方向。</p>';

  const matrixFigure = document.createElement('figure');
  matrixFigure.className = 'santander-problem-matrix';
  matrixFigure.innerHTML = '<div class="matrix-scroll"><img src="images/santander-problem-opportunity-matrix.png" alt="Santander Cycles 问题机会矩阵，将六类研究洞察连接到问题差距、机会领域、可能创新以及客户与企业价值" loading="lazy"></div><figcaption><span>研究归纳图 / PROBLEM–OPPORTUNITY MATRIX</span><p>将骑行需求、安全顾虑、车辆与车桩可用性、游客导航和维护体验，转化为可比较的问题、机会与方案方向。图中骑行规模用于说明伦敦整体出行背景，不等同于 Santander Cycles 单一服务数据。</p></figcaption>';
  (stakeholderSection || santanderResearch.closest('.case-section') || santanderResearch.parentElement).append(synthesisBridge, matrixFigure);

  const innovationIdeas = document.createElement('section');
  innovationIdeas.className = 'possible-innovations';
  innovationIdeas.setAttribute('aria-labelledby', 'possible-innovations-title');
  innovationIdeas.innerHTML = '<header><span>机会发散 / POSSIBLE INNOVATIONS</span><h3 id="possible-innovations-title">从问题矩阵延伸出的可能创新</h3><p>先保留多个可能方向，再用同一组标准进行筛选；发散并不等于每个想法都进入最终方案。</p></header><div class="innovation-idea-grid"><article><b>01</b><span>预测与调度</span><h4>AI 需求预测</h4><p>根据站点、时段、天气与历史使用变化预测车辆和空位需求，帮助运营团队提前安排再分配。</p></article><article class="featured"><b>02</b><span>最终深化方向</span><h4>A → B 顺路优惠</h4><p>当系统准备把车辆从 A 调往 B 时，向相同行程的用户提供折扣或骑行积分，把真实出行转化为调度能力。</p></article><article><b>03</b><span>出发与归还</span><h4>车辆／车桩预约</h4><p>允许用户在限定时间内预留车辆或目的地空位，并设置清晰的超时、取消与公平使用规则。</p></article><article><b>04</b><span>实时信息</span><h4>智能可用性预测</h4><p>不只显示当前数量，也呈现短时间内的可用趋势、可信度与附近替代站点，减少扑空和绕行。</p></article><article><b>05</b><span>途中支持</span><h4>更安全的路线引导</h4><p>优先推荐自行车道、低车流道路和更易理解的路口选择，为用户提供判断依据，但不替代基础设施改善。</p></article><article><b>06</b><span>陌生用户</span><h4>游客友好导航</h4><p>把借还规则、价格、推荐骑行路线与地标串联成分步引导，降低初次使用和跨语言理解成本。</p></article><article><b>07</b><span>维护闭环</span><h4>快速故障报告</h4><p>用户可通过车号、照片和问题类型快速报修；系统同步车辆状态，避免故障车辆继续被推荐。</p></article><article class="featured"><b>08</b><span>最终深化方向</span><h4>指定溢出还车区</h4><p>当实体车桩已满时，App 引导用户进入经过审批的地理围栏区域，在清晰边界内完成归还。</p></article></div><p class="innovation-caveat">进入最终深化不代表方案已经成立；调度准确性、优惠公平性、空间审批、防盗能力与无障碍影响仍需通过试点验证。</p>';
  const strategyInnovationFigure = santanderStrategy?.querySelector('.innovation-matrix-figure');
  if (strategyInnovationFigure) strategyInnovationFigure.before(innovationIdeas);
  else (santanderStrategy?.querySelector('.case-content') || matrixFigure.parentElement).append(innovationIdeas);

  const decisionMatrix = document.createElement('figure');
  decisionMatrix.className = 'decision-matrix-figure';
  decisionMatrix.innerHTML = '<div class="decision-matrix-scroll"><img src="images/santander-decision-matrix.png" alt="Santander Cycles 决策矩阵，按照用户价值、系统价值、实施可行性、风险可控性与策略契合度比较八个可能方案" loading="lazy"></div><figcaption><span>方案评估 / DECISION MATRIX</span><p>团队在研究讨论中采用 1–5 分量表，按用户价值、系统价值、实施可行性、风险可控性与策略契合度进行加权比较。评分用于支持方案收敛，是基于现有资料形成的共同判断，并非企业运营数据或试点测量结果。</p></figcaption>';
  innovationIdeas.after(decisionMatrix);

  const selectionSummary = document.createElement('section');
  selectionSummary.className = 'selection-summary';
  selectionSummary.innerHTML = '<header><span>方案筛选 / CONVERGENCE</span><h3>为什么最终选择这两个方向</h3><p>团队以用户价值、系统价值、实施可行性、风险可控性和策略契合度五项加权标准比较机会。两项方案分别回应“车辆在哪里”和“到站能否还车”，共同覆盖一次行程的起点与终点。</p></header><div class="selection-grid"><article><b>顺路调度优惠</b><p><strong>选择原因：</strong>同时改善用户价格体验与车辆分布效率，并能在现有骑行流程上叠加。</p><p><strong>关键依赖：</strong>实时需求预测、路线核验、支付规则和运营协同。</p></article><article><b>指定溢出还车区</b><p><strong>选择原因：</strong>直接减少满桩导致的绕行和归还失败，为高峰期提供有限弹性。</p><p><strong>关键依赖：</strong>空间审批、车辆自锁、地理围栏、巡检和无障碍管理。</p></article></div>';
  decisionMatrix.after(selectionSummary);

  const finalSolutionsIntro = document.createElement('section');
  finalSolutionsIntro.className = 'final-solutions-intro';
  finalSolutionsIntro.innerHTML = '<span>最终概念 / SELECTED CONCEPTS</span><div><h3>把两个方向放进真实行程</h3><p>第一个方案介入出发前的车辆再分配，第二个方案处理到站后的满桩情况；两张流程图展示的是待验证的概念体验，而不是已经上线的产品功能。</p></div>';

  const incentiveFlow = document.createElement('figure');
  incentiveFlow.className = 'route-incentive-flow';
  incentiveFlow.innerHTML = '<div class="route-flow-scroll"><img src="images/santander-route-incentive-flow.png" alt="A 到 B 顺路调度优惠用户流程：App 推送优惠，路线匹配的用户正常骑行并在 B 站归还，获得优惠价格" loading="lazy"></div><figcaption><span>概念用户流程 / ROUTE-MATCHED INCENTIVE</span><p>把既有的车辆调度需求转化为用户可选择的顺路优惠：用户完成日常行程，系统同时完成车辆再分配。<strong>预期价值（待验证）：</strong>降低部分人工调度压力，并为路线匹配的用户减少骑行费用。</p></figcaption>';
  const strategySection = document.querySelector('.santander-page .innovation-matrix-figure')?.closest('.case-section');
  const valueSection = [...document.querySelectorAll('.santander-page .case-section')].find((section) => section.querySelector('.section-number')?.textContent.includes('05 / VALUE'));
  const conceptSection = document.createElement('section');
  conceptSection.className = 'case-section selected-concepts-section';
  conceptSection.innerHTML = '<span class="section-number">05 / SELECTED CONCEPTS</span><div class="case-content"></div>';
  (strategySection || stakeholderSection)?.after(conceptSection);
  conceptSection.querySelector('.case-content').append(finalSolutionsIntro, incentiveFlow);

  const incentiveChallenges = document.createElement('section');
  incentiveChallenges.className = 'solution-challenges';
  incentiveChallenges.innerHTML = '<header><h3>顺路调度优惠的挑战与缺点</h3></header><div class="challenge-grid"><article><b>匹配准确性</b><p>优惠依赖可靠的需求预测与实时车辆分布。判断错误可能把车辆调往新的低需求区域，反而加剧失衡。</p></article><article><b>激励套利与核验</b><p>需要防止虚假定位、重复领取或未完成指定路线却获得优惠，并建立异常订单的申诉机制。</p></article><article><b>成本与公平性</b><p>折扣会减少单次收入，也更有利于路线灵活的用户；需明确优惠上限、适用时段及无法参与者的公平边界。</p></article><article><b>跨团队执行</b><p>运营调度、App、支付、客服和数据团队必须共享实时状态，否则推送、结算与现场车辆可能不一致。</p></article></div>';
  incentiveFlow.after(incentiveChallenges);

  const overflowReturnFlow = document.createElement('figure');
  overflowReturnFlow.className = 'route-incentive-flow overflow-return-flow';
  overflowReturnFlow.innerHTML = '<div class="route-flow-scroll"><img src="images/santander-overflow-return-flow.png" alt="满桩情况下的指定区域还车流程：用户到达 B 站后发现车桩已满，App 指引地面虚线范围内的指定还车区并确认归还成功" loading="lazy"></div><figcaption><span>概念用户流程 / OVERFLOW RETURN ZONE</span><p>当实体车桩已满时，App 将用户引导至站点旁的指定虚线区域，使归还流程能够继续，同时保持车辆停放边界清晰。<strong>预期价值（待验证）：</strong>减少满桩后的绕行与归还失败，但会增加空间管理、防盗和巡检责任。</p></figcaption>';
  incentiveChallenges.after(overflowReturnFlow);

  const overflowChallenges = document.createElement('section');
  overflowChallenges.className = 'solution-challenges';
  overflowChallenges.innerHTML = '<header><h3>虚线还车区的挑战与缺点</h3></header><div class="challenge-grid"><article><b>被盗与损坏风险</b><p>车辆若没有实体车桩锁定，防盗能力可能下降；需要车辆自锁、告警、保险和快速巡检共同补足。</p></article><article><b>地面空间竞争</b><p>指定区域会占用有限的路侧或人行空间，必须避开盲道、出入口、消防通道，并保留轮椅与行人通行宽度。</p></article><article><b>跨部门协商</b><p>落地可能涉及地方议会、TfL、土地或物业所有者、道路管理与运营团队，审批和责任划分会增加时间成本。</p></article><article><b>定位误差与争议</b><p>高楼密集区域的 GPS 可能误判用户是否停在范围内，需要地面标识、蓝牙或照片核验及清晰的申诉流程。</p></article><article><b>容量与回收压力</b><p>虚线区域本身也可能被停满；运营方仍需及时把车辆重新入桩或调走，否则会形成新的堆积点。</p></article></div>';
  overflowReturnFlow.after(overflowChallenges);

  const enterprisePilotNote = document.createElement('p');
  enterprisePilotNote.className = 'enterprise-pilot-note';
  enterprisePilotNote.innerHTML = '<strong>项目边界：</strong>团队负责提出设计方案；后续试点、资源配置与实施决策由相关企业和运营方负责。本项目团队不参与试点执行，也不掌握当前的具体进度与结果。';
  overflowChallenges.after(enterprisePilotNote);

  if (valueSection) {
    const valueNumber = valueSection.querySelector('.section-number');
    if (valueNumber) valueNumber.textContent = '06 / VALUE & LIMITS';
  }
  const referencesNumber = document.querySelector('.santander-page .references-section .section-number');
  if (referencesNumber) referencesNumber.textContent = '07 / REFERENCES';
}

const santanderValueSection = [...document.querySelectorAll('.santander-page .case-section')].find((section) => section.querySelector('.section-number')?.textContent.includes('VALUE & LIMITS'));
if (santanderValueSection) {
  const valueHeading = santanderValueSection.querySelector('h2');
  if (valueHeading) valueHeading.innerHTML = '价值、风险与<br>下一步验证<span class="red-mark">.</span>';
  const valueIntro = santanderValueSection.querySelector('.case-content > p:not(.note)');
  if (valueIntro) valueIntro.textContent = '项目的价值不在于增加更多功能，而是让一次骑行的前后环节与后台响应连续起来：顺路优惠尝试把用户行程转化为调度能力，溢出还车区尝试为高峰满桩提供有限弹性。两者也会把新的责任带给预测、支付、空间管理、防盗和一线运营。';

  if (!santanderValueSection.querySelector('.closing-reflection')) {
    const reflection = document.createElement('div');
    reflection.className = 'closing-reflection';
    reflection.innerHTML = '<article><span>01 / LEARNING</span><h3>体验可靠性来自系统接续</h3><p>借得到、骑得走和还得了必须连续成立；界面信息只有与车辆、空间和运营行动一致时才有价值。</p></article><article><span>02 / DESIGN PRINCIPLE</span><h3>邀请用户参与，但不转移负担</h3><p>激励可以帮助调度，弹性空间可以缓解满桩，但选择必须自愿，失败时仍应提供清晰、可用的替代路径。</p></article><article><span>03 / LIMITATION</span><h3>当前结论仍待真实数据验证</h3><p>现有判断主要来自公开资料与团队分析，尚未通过真实用户测试和运营数据验证，因此只作为方案假设与策略建议。</p></article>';
    const note = santanderValueSection.querySelector('.note');
    note?.before(reflection);
  }
  santanderValueSection.querySelector('.note')?.remove();
}

// Project-entry transition: assemble the original logo, then rotate twice.
(() => {
  const projectPages = new Set(['workplace.html', 'santander.html', 'radioed.html', 'bus.html', 'dissertation.html']);
  const projectThemes = {
    'workplace.html': { background: '#06181b', logo: '#9bea32', text: '#c1ccca' },
    'santander.html': { background: '#fff0ed', logo: '#ef4042', text: '#76595a' },
    'radioed.html': { background: '#009edb', logo: '#ffffff', text: '#ffffff' },
    'bus.html': { background: '#253449', logo: '#f3b64a', text: '#e8edf4' },
    'dissertation.html': { background: '#1e3037', logo: '#b9eaf0', text: '#dce8e8' }
  };
  const criticalProjectImages = {
    'workplace.html': ['images/home-workplace.webp'],
    'santander.html': ['images/santander-hero.webp'],
    'bus.html': ['images/home-bus.webp']
  };
  const projectWarmups = new Map();
  const warmProject = (destination) => {
    if (projectWarmups.has(destination.href)) return projectWarmups.get(destination.href);
    const destinationPage = destination.pathname.split('/').pop();
    const imageRequests = (criticalProjectImages[destinationPage] || []).map((src) => new Promise((resolve) => {
      const image = new Image();
      image.decoding = 'async';
      image.onload = image.onerror = resolve;
      image.src = src;
    }));
    const documentRequest = /^https?:$/.test(destination.protocol)
      ? fetch(destination.href, { cache: 'force-cache', credentials: 'same-origin' }).then(() => undefined, () => undefined)
      : Promise.resolve();
    const warmup = Promise.allSettled([documentRequest, ...imageRequests]);
    projectWarmups.set(destination.href, warmup);
    return warmup;
  };

  document.querySelectorAll('a[href]').forEach((link) => {
    const destination = new URL(link.href, location.href);
    const destinationPage = destination.pathname.split('/').pop();
    if (!projectPages.has(destinationPage)) return;
    const startWarmup = () => warmProject(destination);
    link.addEventListener('pointerenter', startWarmup, { once: true, passive: true });
    link.addEventListener('focus', startWarmup, { once: true });
    link.addEventListener('touchstart', startWarmup, { once: true, passive: true });
  });
  let entering = false;
  let overlay;
  const reset = () => {
    entering = false;
    overlay?.remove();
    overlay = undefined;
  };
  window.addEventListener('pageshow', reset);

  document.addEventListener('click', async (event) => {
    const link = event.target.closest?.('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const destination = new URL(link.href, location.href);
    const current = new URL(location.href);
    const destinationPage = destination.pathname.split('/').pop();
    if (destination.origin !== current.origin || destination.pathname.slice(0, destination.pathname.lastIndexOf('/')) !== current.pathname.slice(0, current.pathname.lastIndexOf('/')) || !projectPages.has(destinationPage) || destination.pathname === current.pathname) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !Element.prototype.animate) return;
    event.preventDefault();
    if (entering) return;
    entering = true;
    // Start loading the destination immediately, without tying navigation timing to the request.
    warmProject(destination);

    overlay = document.createElement('div');
    overlay.setAttribute('role', 'status');
    overlay.setAttribute('aria-live', 'polite');
    const theme = projectThemes[destinationPage];
    const isRadioed = destinationPage === 'radioed.html';
    const transitionDuration = isRadioed ? 3500 : 2500;
    const fixedDuration = new Promise((resolve) => setTimeout(resolve, transitionDuration));
    overlay.style.cssText = `position:fixed;inset:0;z-index:99999;display:grid;place-items:center;background:${theme.background};color:${theme.logo};cursor:wait`;
    const radioLanguageLines = [
      { lang: 'zh-CN', text: '团结人类，为了每一个孩子' },
      { lang: 'en', text: 'Uniting humanity, for every child' },
      { lang: 'ru', text: 'Объединяя человечество, ради каждого ребёнка' },
      { lang: 'fr', text: 'Unir l’humanité, pour chaque enfant' },
      { lang: 'es', text: 'Uniendo a la humanidad, para cada niño' },
      { lang: 'ar', dir: 'rtl', text: 'توحيد البشرية، من أجل كل طفل' },
      { lang: 'ja', text: 'すべての子どものために、人類をひとつに' },
      { lang: 'ko', text: '모든 어린이를 위해 인류를 하나로' },
      { lang: 'id', text: 'Menyatukan umat manusia, untuk setiap anak' },
      { lang: 'pt', text: 'Unir a humanidade, para cada criança' }
    ];
    const radioLanguages = isRadioed ? `<div aria-hidden="true" style="position:absolute;inset:0;display:grid;grid-template-rows:repeat(${radioLanguageLines.length},auto);align-content:center;gap:clamp(7px,1.2vh,12px);overflow:hidden;color:#fff;opacity:.68;font-family:'Noto Sans SC','Segoe UI',Arial,sans-serif;font-size:clamp(13px,2.15vw,34px);font-weight:800;line-height:1.05;text-shadow:0 2px 12px rgba(0,59,92,.32)">${radioLanguageLines.map((item) => `<span lang="${item.lang}"${item.dir ? ` dir="${item.dir}"` : ''} style="display:grid;place-items:center;padding:clamp(1px,.25vh,3px) 4vw;text-align:center">${item.text}</span>`).join('')}</div>` : '';
    overlay.innerHTML = `${radioLanguages}<div style="position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:28px"><svg aria-hidden="true" viewBox="0 0 850.39 850.39" style="display:block;width:clamp(96px,14vw,150px);height:auto;overflow:visible;fill:currentColor;filter:drop-shadow(0 4px 18px rgba(0,59,92,.28))"><g class="entry-logo"><path class="entry-triangle" d="M421.3,72.14c13.88-1.17,27.81,4.16,38.4,12.89l317.59,291.34c41.1,47.18-15.58,112.84-68.11,78.61L425.47,195.71,141.22,454.98c-52.53,34.22-109.22-31.42-68.11-78.61L389.94,85.78c8.76-7.59,19.7-12.66,31.36-13.64Z"/><path class="entry-circle" d="M413.8,386.59c146.34-8.41,250.36,141.66,190.52,276.01-61.73,138.61-252.57,156.92-339.77,32.52-88.06-125.64-3.3-299.77,149.24-308.53ZM423.56,490.81c-74.09,1.33-115.69,85.85-72.15,145.95,38.21,52.74,119.21,48.67,152.38-7.19,36.61-61.65-8.64-140.05-80.23-138.76Z"/></g></svg><span style="font:700 14px/1.5 sans-serif;letter-spacing:.16em;color:${theme.text};text-shadow:0 2px 10px rgba(0,59,92,.45)">正在进入项目</span></div>`;
    if (isRadioed) {
      const languagePanel = overlay.firstElementChild;
      const loaderPanel = overlay.lastElementChild;
      languagePanel.style.right = 'clamp(140px,26vw,390px)';
      loaderPanel.style.position = 'absolute';
      loaderPanel.style.top = '50%';
      loaderPanel.style.right = 'clamp(18px,7vw,110px)';
      loaderPanel.style.transform = 'translateY(-50%)';
    }
    document.body.append(overlay);
    const triangle = overlay.querySelector('.entry-triangle');
    const circle = overlay.querySelector('.entry-circle');
    const logo = overlay.querySelector('.entry-logo');
    logo.style.transformOrigin = '425.195px 425.195px';
    // Both pieces retain their exact SVG geometry once assembled.
    try {
      await Promise.all([
        overlay.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 140 }).finished,
        triangle.animate([
          { transform: 'translate(-260px, 210px) rotate(-18deg)', offset: 0 },
          { transform: 'translate(-260px, 210px) rotate(-18deg)', offset: .18 },
          { transform: 'translate(-110px, -230px) rotate(-8deg)', offset: .52 },
          { transform: 'translate(0, 22px) rotate(0deg)', offset: .82 },
          { transform: 'translate(0, 0) rotate(0deg)', offset: 1 }
        ], { duration: isRadioed ? 1400 : 1000, easing: 'ease-in-out', fill: 'forwards' }).finished,
        circle.animate([
          { transform: 'translate(150px, 80px)' },
          { transform: 'translate(0, 0)' }
        ], { duration: isRadioed ? 1400 : 1000, easing: 'ease-in-out', fill: 'forwards' }).finished
      ]);
      await logo.animate([
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(720deg)' }
      ], { duration: isRadioed ? 2100 : 1500, easing: 'cubic-bezier(.45,0,.25,1)', fill: 'forwards' }).finished;
    } catch {
      // A cancelled animation must never prevent navigation.
    }
    await fixedDuration;
    location.assign(destination.href);
  });
})();
