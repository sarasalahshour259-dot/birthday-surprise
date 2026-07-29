import os
from PIL import Image

def convert_to_webp(source_folder, output_folder, quality=80):
    # ساخت پوشه خروجی اگر وجود نداشته باشد
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
        
    supported_formats = ('.png', '.jpg', '.jpeg', '.PNG', '.JPG', '.JPEG')
    total_old_size = 0
    total_new_size = 0
    converted_count = 0
    
    print("🚀 شروع عملیات فشرده‌سازی و تبدیل عکس‌ها...")
    
    for filename in os.listdir(source_folder):
        if filename.endswith(supported_formats):
            source_path = os.path.join(source_folder, filename)
            
            # تغییر پسوند به webp
            name_without_ext = os.path.splitext(filename)[0]
            output_filename = f"{name_without_ext}.webp"
            output_path = os.path.join(output_folder, output_filename)
            
            # محاسبه حجم قبلی
            old_size = os.path.getsize(source_path)
            total_old_size += old_size
            
            try:
                # باز کردن و تبدیل تصویر
                with Image.open(source_path) as img:
                    # تبدیل به RGB در صورت وجود کانال آلفا (برای جلوگیری از ارور JPG/PNGهای خاص)
                    if img.mode in ('RGBA', 'LA') and filename.lower().endswith(('.jpg', '.jpeg')):
                        img = img.convert('RGB')
                    
                    # ذخیره با فرمت webp و کیفیت بهینه
                    img.save(output_path, 'webp', quality=quality)
                
                # محاسبه حجم جدید
                new_size = os.path.getsize(output_path)
                total_new_size += new_size
                converted_count += 1
                
                reduction = ((old_size - new_size) / old_size) * 100
                print(f"✅ {filename} -> {output_filename} ({reduction:.1f}% کاهش حجم)")
                
            except Exception as e:
                print(f"❌ خطا در پردازش {filename}: {e}")
                
    if converted_count > 0:
        # محاسبه درصد کل بهینه‌سازی
        saved_space = total_old_size - total_new_size
        total_reduction = (saved_space / total_old_size) * 100
        
        print("\n🎉 عملیات با موفقیت انجام شد!")
        print(f"📊 تعداد عکس‌های تبدیل شده: {converted_count}")
        print(f"💾 حجم اولیه: {total_old_size / (1024*1024):.2f} MB")
        print(f"⚡ حجم بهینه شده: {total_new_size / (1024*1024):.2f} MB")
        print(f"📉 میزان کاهش کل حجم: {total_reduction:.2f}%")
    else:
        print("⚠️ هیچ عکسی با فرمت‌های PNG یا JPG پیدا نشد.")

# تنظیم مسیرها
# فرض می‌کنیم عکس‌های سنگینت در پوشه‌ای به نام 'raw_images' هستند
# و می‌خواهی خروجی‌ها مستقیم بروند داخل پوشه اصلی پروژه تو یعنی 'docs/image'
source_dir = "./raw_images" 
output_dir = "./docs/image"

convert_to_webp(source_dir, output_dir, quality=75)
