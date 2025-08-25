import express from 'express'
import cors from 'cors'
import path from 'node:path'
import Database from 'better-sqlite3'

const app = express()
app.use(cors({ origin: true, credentials: true }))
app.use(express.json())

const DB_PATH = path.resolve(process.cwd(), 'server', 'data.sqlite')
const db = new Database(DB_PATH)
db.pragma('journal_mode = WAL')

// ------------------------ NAVIGATION ------------------------
db.exec(`
CREATE TABLE IF NOT EXISTS menu_items (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT,
  icon TEXT,
  parent_id TEXT,
  ord INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  roles TEXT
);
`)

const menuCount = db.prepare('SELECT COUNT(*) AS c FROM menu_items').get().c
if (menuCount === 0) {
  const rows = [
    { id: 'home', title: 'Главная', url: '/', icon: 'home', parent_id: null, ord: 0, roles: null, is_active: true },

    { id: 'requests', title: 'Заявки', url: null, icon: 'requests', parent_id: null, ord: 10, roles: null, is_active: true },
      { id: 'requests.all', title: 'Все заявки', url: '/requests', icon: null, parent_id: 'requests', ord: 0, roles: null },
      { id: 'requests.new', title: 'Новые', url: '/requests/new', icon: null, parent_id: 'requests', ord: 1, roles: null },
      { id: 'requests.inprogress', title: 'В работе', url: '/requests/in-progress', icon: null, parent_id: 'requests', ord: 2, roles: null },
      { id: 'requests.closed', title: 'Закрытые', url: '/requests/closed', icon: null, parent_id: 'requests', ord: 3, roles: null },

    { id: 'orders', title: 'Заказы', url: null, icon: 'orders', parent_id: null, ord: 20, roles: null, is_active: true  },
      { id: 'orders.all', title: 'Все', url: '/orders', icon: null, parent_id: 'orders', ord: 0, roles: null },
      { id: 'orders.new', title: 'Создать', url: '/orders/new', icon: null, parent_id: 'orders', ord: 1, roles: null },
      { id: 'orders.drafts', title: 'Черновики', url: '/orders/drafts', icon: null, parent_id: 'orders', ord: 2, roles: null },

    { id: 'catalogs', title: 'Каталоги', url: '/catalogs', icon: 'catalogs', parent_id: null, ord: 30, roles: null, is_active: true  },
    { id: 'employees', title: 'Сотрудники', url: '/employees', icon: 'employees', parent_id: null, ord: 40, roles: null, is_active: true  },
    { id: 'settings', title: 'Настройки', url: '/settings', icon: 'settings', parent_id: null, ord: 90, roles: null, is_active: true  },
  ]
  const ins = db.prepare(`
    INSERT INTO menu_items (id, title, url, icon, parent_id, ord, is_active, roles)
    VALUES (@id, @title, @url, @icon, @parent_id, @ord, TRUE, @roles)
  `)
  const tr = db.transaction(() => rows.forEach(r => ins.run(r)))
  tr()
}

function listMenu(userRoles = []) {
  const rows = db.prepare(`
    SELECT * FROM menu_items
    WHERE is_active = TRUE
    ORDER BY COALESCE(parent_id, id), ord, title
  `).all()

  const visible = rows.filter(r => {
    if (!r.roles) return true
    try {
      const allowed = JSON.parse(r.roles)
      return allowed.length === 0 || allowed.some(x => userRoles.includes(x))
    } catch { return false }
  })

  const byId = new Map()
  visible.forEach(r => {
    byId.set(r.id, {
      id: r.id, title: r.title, url: r.url, icon: r.icon, isActive: r.is_active, items: []
    })    
  })
  const roots = []
  visible.forEach(r => {
    const node = byId.get(r.id)
    if (r.parent_id && byId.has(r.parent_id)) byId.get(r.parent_id).items.push(node)
    else roots.push(node)
  })
  return roots
}

app.get('/api/navigation', (req, res) => {
  const roles = Array.isArray(req.query.role) ? req.query.role : []
  res.json({ items: listMenu(roles) })
})

// ------------------------ EMPLOYEES + SKILLS ------------------------
db.exec(`
CREATE TABLE IF NOT EXISTS employees (
  id TEXT PRIMARY KEY,
  last_name TEXT NOT NULL,
  first_name TEXT NOT NULL,
  birth_date TEXT NOT NULL,
  employment_status TEXT NOT NULL DEFAULT 'active' CHECK (employment_status IN ('active','fired')),
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT,
  updated_at TEXT
);
CREATE TABLE IF NOT EXISTS skills (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  is_active INTEGER NOT NULL DEFAULT 1,
  ord INTEGER DEFAULT 0
);
CREATE TABLE IF NOT EXISTS employee_skill_rates (
  id TEXT PRIMARY KEY,
  employee_id TEXT NOT NULL,
  skill_id TEXT NOT NULL,
  rate_percent REAL NOT NULL CHECK(rate_percent >= 0 AND rate_percent <= 100),
  UNIQUE(employee_id, skill_id)
);
CREATE INDEX IF NOT EXISTS idx_employees_name ON employees(last_name, first_name);
CREATE INDEX IF NOT EXISTS idx_rates_emp ON employee_skill_rates(employee_id);
CREATE INDEX IF NOT EXISTS idx_rates_skill ON employee_skill_rates(skill_id);
`)

// seed skills
const skillsCount = db.prepare('SELECT COUNT(*) AS c FROM skills').get().c
if (skillsCount === 0) {
  const ins = db.prepare('INSERT INTO skills (id, code, name, is_active, ord) VALUES (@id,@code,@name,1,@ord)')
  const rows = [
    { id: 's-assembly', code: 'assembly', name: 'Сборка', ord: 0 },
    { id: 's-mount',    code: 'mount',    name: 'Монтаж', ord: 1 },
    { id: 's-measure',  code: 'measure',  name: 'Замер',  ord: 2 },
    { id: 's-design',   code: 'design',   name: 'Дизайн', ord: 3 },
  ]
  const tr = db.transaction(() => rows.forEach(r => ins.run(r)))
  tr()
}

// seed 10 employees if empty
const employeesCount = db.prepare('SELECT COUNT(*) AS c FROM employees').get().c
if (employeesCount === 0) {
  const now = new Date().toISOString()
  const insEmp = db.prepare(`
    INSERT INTO employees (id, last_name, first_name, birth_date, employment_status, is_active, created_at, updated_at)
    VALUES (@id, @last_name, @first_name, @birth_date, @employment_status, 1, @now, @now)
  `)
  const insRate = db.prepare(`
    INSERT INTO employee_skill_rates (id, employee_id, skill_id, rate_percent)
    VALUES (@id, @employee_id, @skill_id, @rate_percent)
  `)

  const E = [
    { id: 'emp-001', ln: 'Иванов',   fn: 'Иван',     bd: '1990-05-12', st: 'active',
      rates: [ ['s-assembly', 15], ['s-measure', 10] ] },
    { id: 'emp-002', ln: 'Петров',   fn: 'Пётр',     bd: '1988-11-03', st: 'active',
      rates: [ ['s-mount', 12], ['s-assembly', 14] ] },
    { id: 'emp-003', ln: 'Сидорова', fn: 'Анна',     bd: '1992-07-21', st: 'active',
      rates: [ ['s-design', 18] ] },
    { id: 'emp-004', ln: 'Кузнецов', fn: 'Дмитрий',  bd: '1985-02-17', st: 'active',
      rates: [ ['s-measure', 11], ['s-mount', 13] ] },
    { id: 'emp-005', ln: 'Смирнова', fn: 'Ольга',    bd: '1994-09-09', st: 'active',
      rates: [ ['s-design', 16], ['s-measure', 9] ] },
    { id: 'emp-006', ln: 'Попов',    fn: 'Сергей',   bd: '1987-01-28', st: 'active',
      rates: [ ['s-assembly', 12] ] },
    { id: 'emp-007', ln: 'Соболева', fn: 'Мария',    bd: '1991-03-14', st: 'fired',
      rates: [ ['s-design', 14], ['s-assembly', 10] ] },
    { id: 'emp-008', ln: 'Волков',   fn: 'Андрей',   bd: '1989-06-30', st: 'active',
      rates: [ ['s-mount', 15] ] },
    { id: 'emp-009', ln: 'Морозова', fn: 'Елена',    bd: '1993-12-05', st: 'fired',
      rates: [ ['s-measure', 12], ['s-design', 15] ] },
    { id: 'emp-010', ln: 'Захаров',  fn: 'Никита',   bd: '1995-04-23', st: 'active',
      rates: [ ['s-assembly', 13], ['s-mount', 12], ['s-measure', 8] ] },
  ]

  const tr = db.transaction(() => {
    for (const e of E) {
      insEmp.run({ id: e.id, last_name: e.ln, first_name: e.fn, birth_date: e.bd, employment_status: e.st, now })
      e.rates.forEach((r, idx) => {
        insRate.run({ id: `${e.id}-${idx}`, employee_id: e.id, skill_id: r[0], rate_percent: r[1] })
      })
    }
  })
  tr()
}

// API: skills
app.get('/api/skills', (_req, res) => {
  const rows = db.prepare(`SELECT id, code, name FROM skills WHERE is_active = 1 ORDER BY ord, name`).all()
  res.json({ items: rows })
})

// API: employees list
app.get('/api/employees', (req, res) => {
  const search = (req.query.search ?? '').toString().trim()
  const skillId = (req.query.skillId ?? '').toString().trim() || null
  const status = ['active','fired','all'].includes(req.query.status) ? req.query.status : 'active'
  const page = Math.max(1, parseInt(req.query.page || '1', 10))
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit || '20', 10)))
  const off = (page - 1) * limit

  const where = ['e.is_active = 1']
  const params = {}

  if (status !== 'all') {
    where.push('e.employment_status = @status')
    params.status = status
  }
  if (search) {
    where.push('(e.last_name LIKE @q OR e.first_name LIKE @q)')
    params.q = `%${search}%`
  }
  if (skillId) {
    where.push('EXISTS (SELECT 1 FROM employee_skill_rates r WHERE r.employee_id = e.id AND r.skill_id = @skillId)')
    params.skillId = skillId
  }

  const base = `FROM employees e WHERE ${where.join(' AND ')}`
  const total = db.prepare(`SELECT COUNT(*) AS c ${base}`).get(params).c
  const items = db.prepare(`
    SELECT e.id, e.last_name, e.first_name, e.birth_date, e.employment_status
    ${base}
    ORDER BY e.last_name, e.first_name
    LIMIT ${limit} OFFSET ${off}
  `).all(params)

  const rateStmt = db.prepare(`
    SELECT r.skill_id, r.rate_percent, s.name
    FROM employee_skill_rates r JOIN skills s ON s.id = r.skill_id
    WHERE r.employee_id = @id
    ORDER BY s.ord, s.name
  `)
  const withRates = items.map(e => ({
    ...e,
    skills: rateStmt.all({ id: e.id })
  }))

  res.json({ items: withRates, total, page, limit })
})

// ------------------------ START ------------------------
const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`[api] http://localhost:${port}`)
})
