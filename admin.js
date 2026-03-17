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
            <td><img src="${app.image || 'https://via.placeholder.com/50'}" width="50"></td>
            <td>${app.name}</td>
            <td>${app.category}</td>
            <td>${app.version}</td>
            <td>${app.downloads || 0}</td>
            <td><span class="status-badge ${app.active ? 'status-active' : 'status-inactive'}">${app.active ? 'نشط' : 'متوقف'}</span></td>
            <td>
                <button onclick="deleteApp(${index})">🗑️ حذف</button>
                <button onclick="toggleApp(${index})">${app.active ? '⏸️ إيقاف' : '▶️ تشغيل'}</button>
            </td>
        </tr>
    `).join('');
}

document.getElementById('appForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('appName').value;
    const desc = document.getElementById('appDesc').value;
    const version = document.getElementById('appVersion').value;
    const category = document.getElementById('appCategory').value;
    const icon = document.getElementById('appIcon').value || '📱';
    const ipaFile = document.getElementById('ipaFile').files[0];
    
    if (!name || !desc || !version || !category || !ipaFile) {
        alert('❌ يرجى ملء جميع الحقول واختيار ملف IPA');
        return;
    }

    // رفع البيانات إلى upload.php
    const formData = new FormData();
    formData.append('name', name);
    formData.append('desc', desc);
    formData.append('version', version);
    formData.append('category', category);
    formData.append('icon', icon);
    formData.append('ipa', ipaFile);

    fetch('upload.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert('✅ تم رفع التطبيق بنجاح');
            location.reload();  // تحديث الصفحة
        } else {
            alert('❌ فشل الرفع: ' + data.message);
        }
    });
});

loadApps();
