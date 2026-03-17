let apps = [];
let categories = [];

function loadData() {
    const saved = localStorage.getItem('zx_apps');
    if (saved) {
        apps = JSON.parse(saved);
    } else {
        apps = [
            {
                id: Date.now(),
                name: "ESign",
                desc: "أداة توقيع التطبيقات الاحترافية",
                version: "4.0.0",
                icon: "📝",
                category: "أدوات",
                downloads: 15420,
                url: "itms-services://?action=download-manifest&url=https://example.com/esign.plist",
                image: "https://via.placeholder.com/200/4A2C7A/FFD700?text=ESign",
                active: true,
                date: new Date().toISOString()
            },
            {
                id: Date.now() + 1,
                name: "uYou+",
                desc: "يوتيوب بدون إعلانات مع تحميل",
                version: "19.08.3",
                icon: "▶️",
                category: "وسائط",
                downloads: 23200,
                url: "itms-services://?action=download-manifest&url=https://example.com/uyou.plist",
                image: "https://via.placeholder.com/200/4A2C7A/FFD700?text=uYou",
                active: true,
                date: new Date().toISOString()
            }
        ];
        saveData();
    }
    
    categories = [...new Set(apps.map(a => a.category))];
    updateUI();
}

function saveData() {
    localStorage.setItem('zx_apps', JSON.stringify(apps));
    updateUI();
}

function updateUI() {
    document.getElementById('totalApps').textContent = apps.length;
    
    const stats = document.getElementById('stats');
    stats.innerHTML = `
        <div class="stat-card">
            <div class="stat-number">${apps.length}</div>
            <div class="stat-label">تطبيق</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${categories.length}</div>
            <div class="stat-label">تصنيف</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${apps.reduce((a, b) => a + (b.downloads || 0), 0).toLocaleString()}</div>
            <div class="stat-label">تحميل</div>
        </div>
    `;
    
    const categoriesGrid = document.getElementById('categoriesGrid');
    categoriesGrid.innerHTML = categories.map(cat => {
        const count = apps.filter(a => a.category === cat).length;
        return `
            <div class="category-card" onclick="filterByCategory('${cat}')">
                <div class="category-icon">📁</div>
                <div class="category-name">${cat}</div>
                <div class="category-count">${count} تطبيق</div>
            </div>
        `;
    }).join('');
    
    const latest = [...apps].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);
    const appsGrid = document.getElementById('appsGrid');
    appsGrid.innerHTML = latest.map(app => `
        <div class="app-card">
            ${app.downloads > 10000 ? '<div class="app-badge">⭐ مشهور</div>' : ''}
            <div class="app-icon">${app.icon}</div>
            <h3 class="app-name">${app.name}</h3>
            <div class="app-category"><i class="fas fa-tag"></i> ${app.category}</div>
            <p class="app-desc">${app.desc}</p>
            <div class="app-stats">
                <span><i class="fas fa-download"></i> ${app.downloads.toLocaleString()}</span>
            </div>
            <div class="app-version">الإصدار: ${app.version}</div>
            <a href="${app.url}" class="install-btn">📲 تثبيت</a>
        </div>
    `).join('');
}

function filterByCategory(category) {
    const filtered = apps.filter(a => a.category === category);
    const appsGrid = document.getElementById('appsGrid');
    appsGrid.innerHTML = filtered.map(app => `
        <div class="app-card">
            ${app.downloads > 10000 ? '<div class="app-badge">⭐ مشهور</div>' : ''}
            <div class="app-icon">${app.icon}</div>
            <h3 class="app-name">${app.name}</h3>
            <div class="app-category"><i class="fas fa-tag"></i> ${app.category}</div>
            <p class="app-desc">${app.desc}</p>
            <div class="app-stats">
                <span><i class="fas fa-download"></i> ${app.downloads.toLocaleString()}</span>
            </div>
            <div class="app-version">الإصدار: ${app.version}</div>
            <a href="${app.url}" class="install-btn">📲 تثبيت</a>
        </div>
    `).join('');
    
    document.getElementById('latest').scrollIntoView({ behavior: 'smooth' });
}

loadData();
