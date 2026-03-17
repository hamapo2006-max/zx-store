let apps = [];

function loadApps() {
    const saved = localStorage.getItem('zx_apps');
    if (saved) {
        apps = JSON.parse(saved);
    }
    displayApps();
    updateStats();
}

function displayApps() {
    const tbody = document.getElementById('appsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = apps.map((app, index) => `
        <tr>
            <td><img src="${app.image || 'https://via.placeholder.com/50'}" class="table-icon" onerror="this.src='https://via.placeholder.com/50'"></td>
            <td>${app.name}</td>
            <td>${app.category}</td>
            <td>${app.version}</td>
            <td>${app.downloads?.toLocaleString() || 0}</td>
            <td><span class="status-badge ${app.active ? 'status-active' : 'status-inactive'}">${app.active ? 'نشط' : 'متوقف'}</span></td>
            <td>
                <button class="btn-danger" onclick="deleteApp(${index})" style="padding: 5px 10px; font-size: 12px;">
                    <i class="fas fa-trash"></i>
                </button>
                <button class="btn-primary" onclick="toggleApp(${index})" style="padding: 5px 10px; font-size: 12px; background: ${app.active ? '#FFA500' : '#4A2C7A'}">
                    ${app.active ? 'إيقاف' : 'تشغيل'}
                </button>
            </td>
        </tr>
    `).join('');
}

function updateStats() {
    document.getElementById('totalApps').textContent = apps.length;
    document.getElementById('activeApps').textContent = apps.filter(a => a.active).length;
    document.getElementById('totalDownloads').textContent = apps.reduce((a, b) => a + (b.downloads || 0), 0).toLocaleString();
}

document.getElementById('appForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('appName').value;
    const desc = document.getElementById('appDesc').value;
    const version = document.getElementById('appVersion').value;
    const category = document.getElementById('appCategory').value;
    const url = document.getElementById('appUrl').value;
    const icon = document.getElementById('appIcon').value || '📱';
    
    if (!name || !desc || !version || !category || !url) {
        alert('❌ يرجى ملء جميع الحقول');
        return;
    }
    
    const imageInput = document.getElementById('appImage');
    let imageUrl = 'https://via.placeholder.com/200/4A2C7A/FFD700?text=' + encodeURIComponent(name);
    
    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imageUrl = e.target.result;
            saveNewApp(name, desc, version, category, url, icon, imageUrl);
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        saveNewApp(name, desc, version, category, url, icon, imageUrl);
    }
});

function saveNewApp(name, desc, version, category, url, icon, imageUrl) {
    const newApp = {
        id: Date.now(),
        name: name,
        desc: desc,
        version: version,
        category: category,
        url: url,
        icon: icon,
        image: imageUrl,
        downloads: 0,
        active: true,
        date: new Date().toISOString()
    };
    
    apps.push(newApp);
    localStorage.setItem('zx_apps', JSON.stringify(apps));
    
    document.getElementById('appForm').reset();
    document.getElementById('imagePreview').style.display = 'none';
    
    displayApps();
    updateStats();
    
    alert('✅ تمت إضافة التطبيق بنجاح');
}

function deleteApp(index) {
    if (confirm('هل أنت متأكد من حذف هذا التطبيق؟')) {
        apps.splice(index, 1);
        localStorage.setItem('zx_apps', JSON.stringify(apps));
        displayApps();
        updateStats();
    }
}

function toggleApp(index) {
    apps[index].active = !apps[index].active;
    localStorage.setItem('zx_apps', JSON.stringify(apps));
    displayApps();
}

document.getElementById('appImage')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('imagePreview');
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

loadApps();
