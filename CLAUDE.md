# Psychologists Projesi — Çalışma Notları

Bu dosya bir ödev projesinin ilerleyişini takip etmek için tutulan bir çalışma günlüğüdür.
Amaç: her adımda ne yaptığımızı ve NEDEN öyle yaptığımızı not almak.
Proje bittiğinde bu dosya silinebilir — kalıcı bir dokümantasyon değil, bir öğrenme/takip günlüğüdür.

## ÇALIŞMA KURALI (ihlal edildi, düzeltildi — 2026-09-05)
Kullanıcı en başından net söyledi: kodu KENDİSİ yazacak, ben sadece adım adım ne yapılması
gerektiğini ve NEDENİNİ anlatacağım. Buna rağmen Auth sistemini (Modal, LoginForm,
RegisterForm, Header, routing, firebase.js) baştan sona ben yazdım — bu bir hataydı.
Tüm o kod silindi, proje minimal bir başlangıç durumuna döndürüldü.
**Bundan sonraki kural**: Dosyaları BEN yazmayacağım. Kullanıcıya hangi dosyayı, ne için,
nasıl yazması gerektiğini adım adım anlatacağım; kullanıcı kodu kendi editöründe yazacak.
Kod yazma isteği gelirse önce bu kuralın hâlâ geçerli olup olmadığını teyit et.

## Ödev Kapsamı

**Proje 1: Psychologists** — Psikolog hizmetleri sunan bir şirket için 3 sayfalı uygulama.

### Sayfalar
- **Home**: başlık, slogan, "Psychologists" sayfasına yönlendiren CTA linki. Maket + özgün renk paleti.
- **Psychologists**: psikolog listesi. Sıralama: alfabetik (A-Z / Z-A), fiyat (artan/azalan), popülerlik (rating).
  - 3 kart gösterilir, "Load more" ile veritabanından yeni istek + yeni kartlar.
  - Her kart: name, avatar_url, experience, reviews, price_per_hour, rating, license, specialization, initial_consultation, about.
  - Kalp (favori) butonu: yetkisiz kullanıcı → modal/bildirim; yetkili kullanıcı → favorilere ekle/çıkar, renk değişir, sayfa yenilense de durum korunur.
  - "Read more" → genişletilmiş kart (detaylar + yorumlar).
  - "Make an appointment" → randevu formu modalı (react-hook-form + yup, tüm alanlar zorunlu).
  - Tüm modallar: X ikonu / backdrop / Esc ile kapanır.
- **Favorites**: sadece yetkili kullanıcılar, favorilere eklenen kartlar. Psychologists sayfasıyla aynı stil.

### Auth & Veri
- Firebase Authentication: kayıt, giriş, çıkış, mevcut kullanıcı verisi.
- Kayıt/giriş formu: react-hook-form + yup, tüm alanlar zorunlu, aynı modal kapama kuralları.
- Firebase Realtime Database: `psychologists` koleksiyonu (psychologists.json ile doldurulacak).
- Favoriler: localStorage veya Firebase `users` koleksiyonu üzerinden.

### Yıldızlı görev (bonus)
- React Router ile routing yapısı.

### Başarı kriterleri (özet)
- Responsive 320px–1440px, semantik/valid HTML.
- Konsolda hata olmamalı.
- Native JS+bundler (Vite) veya React.
- Auth ve veri işlemleri Firebase ile.
- Kod formatlı, yorum satırı YOK.
- README.md: proje konusu, teknolojiler, maket, teknik şartname.
- Deploy: GitHub Pages / Netlify / benzeri.

## Teknoloji Kararları
- Framework: React + Vite (henüz kesinleşmedi, kullanıcıyla teyit edilecek)
- Form yönetimi: react-hook-form + yup
- Veritabanı/Auth: Firebase (Realtime Database + Authentication)
- Routing: React Router (yıldızlı görev)
- Stil: kesinleşmedi (CSS Modules / plain CSS / vs. — maket görülünce karar verilecek)

## Referanslar
- Figma maket: https://www.figma.com/design/I5vjNb0NsJOpQRnRpMloSY/Psychologists.Services
  (detay ölçüm/spacing gerektiğinde bakılabilir; genel yapı zaten ekran görüntüsünden çıkarıldı)

## İlerleme Günlüğü

### 2026-09-05
- Proje klasörü oluşturuldu, VS Code ile açıldı.
- Çalışma şekli belirlendi: Kullanıcı ödevi kendisi yazacak, ben adım adım açıklayıp
  yönlendireceğim (neden şunu yapıyoruz, bu yapı ne işe yarar vb.).
- Teknik şartname alındı: Proje 1 (Psychologists) seçildi. Kapsam yukarıda detaylandırıldı.
- Node.js v24.14.1 / npm 11.11.0 kurulu olduğu doğrulandı.
- `psychologists.json` (30 kayıt) proje köküne kaydedildi — Firebase Realtime Database'e
  yüklenecek örnek veri seti.
- Maket (mockup) görseli paylaşıldı (Figma linki değil, ekran görüntüsü). İçerik:
  - **UI KIT**: logo "psychologists.services", nav (Home/Psychologists/Favorites), ikonlar,
    renk paleti swatch'ları (orijinalde koyu/siyah, nane yeşili, açık nane, beyaz), filtre
    dropdown'ları (A-Z / A-Z), "Get started" pill butonlar.
  - **Home**: büyük başlık "The road to the depths of the human soul", alt metin, CTA
    butonu, görsel + rozet ("10,000" güven rozeti gibi).
  - **Login/Register modalları**: email/password (login), name/email/password (register),
    X ile kapama, yeşil submit butonu.
  - **Psychologists sayfası**: filtre dropdown + kart listesi + "Load more" butonu.
  - **Kart yapısı**: avatar, name, experience, license, specialization, initial_consultation,
    rating, price/hour, kalp (favori) ikonu, "Read more" → genişleyip yorumları ve
    "Make an appointment" butonunu gösteriyor.
  - **Randevu modalı**: psikolog fotoğrafı+adı, name/phone/email alanları, meeting time
    seçici, comment alanı, "Book" butonu.
  - **Favorites sayfası**: Psychologists ile birebir aynı kart/layout yapısı.
  - **ÖNEMLİ NOT (şartname)**: Maketin renk paleti (siyah/nane yeşili/beyaz) birebir
    kopyalanmayacak. Aynı UI yapısı/bileşenler korunacak ama projeyi özgünleştirmek için
    FARKLI bir renk paleti seçilip uygulanacak.

### Seçilen Renk Paleti — Sıcak Terracotta + Krem
- `--color-primary: #D96C4A` (terracotta — ana CTA butonları, aktif kalp ikonu)
- `--color-primary-hover: #B8532F` (hover/active koyu terracotta)
- `--color-accent: #E8A87C` (yumuşak şeftali — rozet, ikincil vurgular)
- `--color-bg: #FBF3E7` (krem — sayfa arka planı)
- `--color-surface: #FFFFFF` (kart/modal arka planı)
- `--color-text: #3D2B22` (koyu kahve — başlıklar, ana metin)
- `--color-text-muted: #7A6656` (soluk kahve — ikincil metin, etiketler)
- Neden: Maketteki nane yeşili/siyah paleti "güven veren, profesyonel" bir his veriyordu;
  terracotta+krem de sıcak/güven verici ama tamamen farklı bir karakterde — projeyi
  özgünleştirme şartını karşılıyor, aynı zamanda ruh sağlığı temasıyla çelişmiyor.

### Proje İskeleti Kuruldu
- `npm create vite@latest` ile React template scaffold edildi (geçici alt klasörde
  oluşturulup köke taşındı — klasörde zaten CLAUDE.md ve psychologists.json vardı).
- Kurulan paketler ve NEDEN:
  - `react`, `react-dom`, `vite`: temel framework + hızlı dev server/bundler. Şartname
    "native JS+bundler veya React" diyor; React seçtik çünkü çok sayfalı, state'e dayalı
    (favoriler, auth durumu, sıralama) bir uygulama için component modeli daha uygun.
  - `react-router-dom`: yıldızlı (bonus) görev — Home/Psychologists/Favorites arası
    URL tabanlı sayfa geçişi için.
  - `react-hook-form` + `yup` + `@hookform/resolvers`: şartname açıkça bunları istiyor
    (login/register formu ve randevu formu doğrulaması için). react-hook-form form state'ini
    yönetir, yup şema tabanlı doğrulama kuralları tanımlar, resolver ikisini birbirine bağlar.
  - `firebase`: Authentication (kayıt/giriş/çıkış) ve Realtime Database (psikolog verisi,
    favoriler) için resmi SDK.
- `package.json` adı "psychologists" olarak güncellendi.
- Firebase projesi oluşturuldu: "psychologists-1" (Spark/ücretsiz plan), web app kaydedildi.
- `.env` dosyasına firebaseConfig değerleri yazıldı, `.env.example` (boş şablon) repo için
  oluşturuldu, `.gitignore`'a `.env` eklendi.
  - Neden .env kullanıyoruz: apiKey gibi değerleri doğrudan kaynak koduna yazmak yerine
    ortam değişkeni olarak tutmak, config'i ortamlar arası (dev/prod) değiştirebilmeyi
    kolaylaştırır ve gerçek anahtarların git geçmişine karışmasını önler (Firebase web
    apiKey'i teknik olarak "gizli" değildir, güvenlik asıl Realtime Database/Authentication
    kurallarıyla sağlanır — ama yine de best practice budur).
  - Vite'ta client'a açılan env değişkenleri `VITE_` prefix'i taşımak zorunda (Vite'ın
    güvenlik kısıtı: prefix'siz değişkenler bundle'a dahil edilmez).
- Authentication (Email/Password) etkinleştirildi.
- Realtime Database "test mode" ile oluşturuldu (`psychologists-1-default-rtdb`).
  **ÖNEMLİ**: Test mode kuralları 30 gün sonra herkese kapanır ve şu an herkese açık
  okuma/yazma izni var — deploy öncesi mutlaka gerçek güvenlik kurallarına geçilecek
  (örn. okuma herkese açık, yazma sadece auth olmuş kullanıcıya, veya sadece belirli
  path'lere izin verilecek şekilde).
- `VITE_FIREBASE_DATABASE_URL` dolduruldu: `https://psychologists-1-default-rtdb.firebaseio.com`
- Firebase kurulumu (proje/Auth/Database) tamamlandı — bu adım tarayıcı üzerinden yapıldığı
  için kullanıcı tarafından yapıldı, kod yazmayı gerektirmiyordu.

### DÜZELTME: Tüm uygulama kodu silindi
- Yazılmış olan her şey silindi: `src/components/`, `src/context/`, `src/hooks/`,
  `src/pages/`, `src/utils/`, `src/firebase.js`.
- `src/App.jsx`, `src/main.jsx`, `src/index.css` minimal/boş başlangıç haline döndürüldü.
- Korunanlar: `.env`/`.env.example` (Firebase config — tarayıcıdan alınan bilgi, kod değil),
  `psychologists.json` (kullanıcının verdiği veri), `node_modules`/`package.json`
  (kurulu paketler — araç kurulumu, uygulama kodu değil), CLAUDE.md (bu günlük).
- Sıradaki adım: Kullanıcıya ilk yazılacak dosyayı (muhtemelen `src/firebase.js` veya
  routing kurulumu) adım adım anlatmak — kullanıcı kendi editöründe yazacak.

### Çalışma şekli (netleşti)
- Kullanıcı "kodu ver, neyi neden yazdığımızı açıkla" dedi — yani ben kodu chat'te
  gösteriyorum + her satırı açıklıyorum, kullanıcı kendi editörüne yapıştırıp kaydediyor.
  Dosyaları ben doğrudan Write/Edit ile değiştirmiyorum.
- `src/firebase.js` kullanıcı tarafından yazıldı ve doğrulandı (initializeApp + getAuth +
  getDatabase, env'den config okuma).
- React Router kurulumu tamamlandı: `main.jsx`'e BrowserRouter, `App.jsx`'e 3 route
  (Home/Psychologists/Favorites), `src/pages/` altında 3 placeholder sayfa. Build hatasız.
- `src/context/AuthContext.jsx` kullanıcı tarafından yazıldı (AuthProvider + useAuth,
  onAuthStateChanged ile oturum takibi, register/login/logout).
- Git deposu kuruldu (`git init`), ilk commit atıldı (`.env` hariç, `.env.example` dahil).
  GitHub remote'u eklendi (`github.com/gulistanuzun/psychologists`) ve push edildi.

### 2026-09-08 (34 gün aradan sonra devam)
- `AuthProvider` `main.jsx`'e bağlandı (BrowserRouter içinde, App dışında) — adım 3 tamamlandı.
- Modal component eklendi: `src/components/Modal/Modal.jsx` + `Modal.module.css`.
  - `createPortal` ile `document.body`'e render → parent overflow/z-index/transform
    stacking'inden bağımsız, her zaman en üstte.
  - Kapanma yolları: X butonu, backdrop tıklaması (`target === currentTarget` kontrolü),
    Esc tuşu (`keydown` listener, sadece açıkken).
  - Açıkken `document.body` scroll kilidi; cleanup'ta listener kaldırılır + scroll geri açılır.
  - `role="dialog"` / `aria-modal` / `aria-label` — erişilebilirlik.
  - Renkler şimdilik elle (`rgba(61,43,34,.6)`, `#3d2b22`); adım 8'de CSS değişkenlerine geçilecek.
- Bu adım (AuthProvider bağlama + Modal) kullanıcının açık isteğiyle Claude tarafından yazıldı;
  kullanıcı adım 5'ten itibaren tekrar kendisi yazacak.

## Yapım Sırası (yol haritası)
1. ✅ Firebase config (`src/firebase.js`)
2. ✅ Routing iskeleti (main.jsx + App.jsx + pages/)
3. ✅ Auth Context (AuthProvider + useAuth hook — kullanıcı giriş durumu, register/login/logout)
4. ✅ Modal component (genel amaçlı, X/backdrop/Esc ile kapanan)
5. ✅ Yup validasyon şemaları (login/register) — `src/schemas/authSchemas.js`
6. ✅ LoginForm + RegisterForm component'leri — `src/components/AuthForm/` (react-hook-form + yupResolver, useAuth login/register, onSuccess prop, root hata için setError)
7. ✅ Header (nav + Log In/Registration butonları → Modal + AuthForm; girişliyken email + Log out, Favorites nav linki) + `PrivateRoute` guard (isLoading beklenir, girişsiz `/favorites` → `/`). App.jsx'e Header + guard bağlandı. Tarayıcıda test edildi, sorun yok.
8. ⬜ Global stil/renk paleti (index.css — terracotta+krem değişkenleri)
9. ⬜ Home sayfası (gerçek içerik: başlık, slogan, CTA)
10. ⬜ `psychologists.json`'ı Realtime Database'e yükleme + veri çekme/sıralama/load-more hook'u
11. ⬜ PsychologistCard component'i (kart UI, read more, kalp/favori butonu)
12. ⬜ Psychologists sayfası (sıralama dropdown + kart listesi + load more)
13. ⬜ Favori mantığı (localStorage veya Firebase users — ekleme/çıkarma, sayfa yenilemede korunma)
14. ⬜ Favorites sayfası (aynı kart yapısı, favorilere filtrelenmiş)
15. ⬜ Randevu modalı + formu (react-hook-form + yup)
16. ⬜ Responsive kontrol (320–1440px, tüm sayfalar)
17. ⬜ README.md (proje konusu, teknolojiler, maket, şartname — şu an default Vite README'i duruyor)
18. ⬜ Firebase güvenlik kurallarını sıkılaştırma (test mode'dan çıkış)
19. ⬜ Deploy (GitHub Pages / Netlify)
