<?php
$target_dir = "ipas/";
$target_file = $target_dir . "app.ipa";
$uploadOk = 1;

// التحقق من نوع الملف
if ($_FILES["ipaFile"]["type"] != "application/octet-stream" && 
    !strpos($_FILES["ipaFile"]["name"], ".ipa")) {
    echo "❌ يجب رفع ملف IPA فقط.";
    $uploadOk = 0;
}

// رفع الملف
if ($uploadOk == 1) {
    if (move_uploaded_file($_FILES["ipaFile"]["tmp_name"], $target_file)) {
        echo "✅ تم رفع التطبيق بنجاح!";
    } else {
        echo "❌ حدث خطأ أثناء الرفع.";
    }
}
?>
