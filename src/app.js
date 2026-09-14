import './app.css'

const tasks = [
  { id: 1, title: '整理漫游城市项目的用户反馈', meta: '产品体验 · 今天', done: false },
  { id: 2, title: '更新作品集中的项目说明', meta: '个人品牌 · 今天', done: true },
  { id: 3, title: '和 Morrow Lab 对齐下周提案', meta: '会议 · 明天', done: false },
  { id: 4, title: '补充潮汐项目的视觉归档', meta: '品牌视觉 · 周五', done: false },
]
let filter = '全部'

const render = () => {
  const visible = filter === '全部' ? tasks : tasks.filter((task) => filter === '已完成' ? task.done : !task.done)
  const completed = tasks.filter((task) => task.done).length
  document.querySelector('#app').innerHTML = `<div class="shell"><aside><a class="brand" href="/">DYX<span>.</span></a><p class="side-label">Workspace</p><nav><a class="active" href="#today">◒　今日工作台</a><a href="#projects">▦　项目空间 <small>03</small></a><a href="#notes">⌁　灵感笔记</a></nav><div class="account"><b>DY</b><div><strong>Duanyuxiao</strong><small>设计师账户</small></div></div><a class="back" href="/">↖ 返回作品集</a></aside><main id="today"><header><span>Workspace <i>/</i> Today</span><div><button aria-label="搜索">⌕</button><button aria-label="通知">◌</button><b>DY</b></div></header><section class="welcome"><div><p class="eyebrow">Wednesday · 14 August 2024</p><h1>早上好，<em>Duanyuxiao。</em></h1><p>今天也给重要的事情留一点空间。</p></div><div class="weather">☼ <strong>24°</strong><small>上海 · 晴朗</small></div></section><section class="metrics"><div><small>本周进度</small><strong>72<span>%</span></strong><i><u></u></i><em>比上周 +8%</em></div><div><small>进行中的项目</small><strong>03</strong><p>都在按计划推进</p></div><div><small>专注时间</small><strong>04<span>h</span> 28<span>m</span></strong><p>目标 06h 00m</p></div></section><section class="tasks"><div class="section-head"><div><p class="eyebrow">Focus list</p><h2>今天要做的事 <small>${completed}/${tasks.length}</small></h2></div><button id="add">＋ 新任务</button></div><div class="filters">${['全部', '未完成', '已完成'].map((item) => `<button class="${filter === item ? 'active' : ''}" data-filter="${item}">${item}</button>`).join('')}</div><div class="task-list">${visible.map((task) => `<article class="task ${task.done ? 'done' : ''}"><button class="check ${task.done ? 'checked' : ''}" data-id="${task.id}" aria-label="切换任务状态">${task.done ? '✓' : ''}</button><div><strong>${task.title}</strong><small>${task.meta}</small></div><span>···</span></article>`).join('')}</div></section><div class="bottom"><blockquote>“<br><strong>好的设计不是增加更多，<br>而是删掉不必要的。</strong><small>— Dieter Rams</small></blockquote><div class="next"><p>Next up</p><strong>Portfolio refresh</strong><small>视觉整理 · 45 min　↗</small></div></div></main></div><dialog id="dialog"><form method="dialog" id="form"><button class="close">×</button><p class="eyebrow">New focus</p><h2>添加一件要做的事</h2><label>任务名称<input id="input" required placeholder="例如：整理项目素材"></label><div><button value="cancel">取消</button><button id="confirm" value="default">加入清单</button></div></form></dialog>`
  document.querySelectorAll('[data-filter]').forEach((button) => button.addEventListener('click', () => { filter = button.dataset.filter; render() }))
  document.querySelectorAll('.check').forEach((button) => button.addEventListener('click', () => { const task = tasks.find((item) => item.id === Number(button.dataset.id)); task.done = !task.done; render() }))
  document.querySelector('#add').addEventListener('click', () => { document.querySelector('#dialog').showModal(); document.querySelector('#input').focus() })
  document.querySelector('#form').addEventListener('submit', (event) => { event.preventDefault(); const input = document.querySelector('#input'); if (input.value.trim()) tasks.unshift({ id: Date.now(), title: input.value.trim(), meta: '新任务 · 今天', done: false }); document.querySelector('#dialog').close(); render() })
}
render()
