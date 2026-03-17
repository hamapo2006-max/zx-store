<?php
header('Content-Type: application/json');

$uploadDir = 'ipas/';
$appsFile = 'apps.json';

// استقبال البيانات
$name = $_POST['name'] ?? '';
$desc = $_POST['desc'] ?? '';
$version = $_POST['version'] ?? '';
$category = $_POST['category'] ?? '';
$icon = $_POST['icon'] ?? '📱';

if (!$name || !$desc || !$version || !$category || !isset($_FILES['ipa'])) {
    echo json_encode(['success' => false, 'message' => 'بيانات ناقصة']);
    exit;
}

// رفع ملف IPA
$ipaFile = $_FILES['ipa'];
$ext = pathinfo($ipaFile['name'], PATHINFO_EXTENSION);
if ($ext !== 'ipa') {
    echo json_encode(['success' => false, 'message' => 'الملف يجب أن يكون IPA']);
    exit;
}

$appId = time();  // معرف فريد للتطبيق
$ipaName = $appId . '.ipa';
$ipaPath = $uploadDir . $ipaName;

if (!move_uploaded_file($ipaFile['tmp_name'], $ipaPath)) {
    echo json_encode(['success' => false, 'message' => 'فشل رفع الملف']);
    exit;
}

// إضافة التطبيق إلى apps.json
$apps = [];
if (file_exists($appsFile)) {
    $apps = json_decode(file_get_contents($appsFile), true);
}

$newApp = [
    'id' => $appId,
    'name' => $name,
    'desc' => $desc,
    'version' => $version,
    'category' => $category,
    'icon' => $icon,
    'image' => 'https://hamapo2006-max.github.io/zx-store/icon.png',
    'url' => 'itms-services://?action=download-manifest&url=https://hamapo2006-max.github.io/zx-store/install.plist',
    'downloads' => 0,
    'active' => true
];

$apps[] = $newApp;
file_put_contents($appsFile, json_encode($apps, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo json_encode(['success' => true, 'message' => 'تم رفع التطبيق']);
?>
