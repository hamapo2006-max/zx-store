document.getElementById('appForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('appName').value;
    const desc = document.getElementById('appDesc').value;
    const version = document.getElementById('appVersion').value;
    const category = document.getElementById('appCategory').value;
    const icon = document.getElementById('appIcon').value || '📱';

    const newApp = {
        id: Date.now(),
        name: name,
        desc: desc,
        version: version,
        category: category,
        icon: icon,
        image: "https://hamapo2006-max.github.io/zz-store/icon.png",
        url: "itms-services://?action=download-manifest&url=https://hamapo2006-max.github.io/zz-store/install.plist",
        downloads: 0,
        active: true
    };

    apps.push(newApp);
    localStorage.setItem('zx_apps', JSON.stringify(apps));
    alert('✅ تمت إضافة التطبيق');
    location.reload();
});
