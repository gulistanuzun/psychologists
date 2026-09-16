# Psychologists

Psikolog hizmetleri sunan bir şirket için geliştirilmiş, 3 sayfalı bir React uygulaması. Kullanıcılar psikolog listesini inceleyebilir, sıralayabilir, favorilerine ekleyebilir ve randevu talebi oluşturabilir.

## Sayfalar

- **Home** — tanıtım başlığı, slogan ve Psychologists sayfasına yönlendiren CTA.
- **Psychologists** — psikolog kartları listesi. Alfabetik (A-Z / Z-A), fiyat (artan/azalan) ve popülerliğe (rating) göre sıralama; "Load more" ile ek kayıtların yüklenmesi; favori ekleme/çıkarma; "Read more" ile detay ve yorumların açılması; "Make an appointment" ile randevu formu.
- **Favorites** — sadece giriş yapmış kullanıcıların erişebildiği, favorilere eklenen psikologların listelendiği sayfa.

## Teknolojiler

- **React** + **Vite** — component tabanlı UI ve geliştirme ortamı.
- **React Router** — sayfalar arası routing (Home / Psychologists / Favorites), giriş yapmamış kullanıcılar için `/favorites` route koruması.
- **Firebase Authentication** — e-posta/şifre ile kayıt, giriş, çıkış.
- **Firebase Realtime Database** — psikolog verilerinin tutulması.
- **react-hook-form** + **yup** — kayıt/giriş formu ve randevu formu doğrulaması.
- **CSS Modules** — component bazlı, çakışmasız stil yönetimi.

## Tasarım

Maket olarak verilen Figma tasarımının UI yapısı (bileşenler, sayfa akışı) korunmuş, projeyi özgünleştirmek amacıyla farklı bir renk paleti uygulanmıştır:

- Ana renk (terracotta): `#D96C4A`
- Vurgu (şeftali): `#E8A87C`
- Arka plan (krem): `#FBF3E7`
- Metin (koyu kahve): `#3D2B22`

Figma maketi: https://www.figma.com/design/I5vjNb0NsJOpQRnRpMloSY/Psychologists.Services

## Kurulum

```bash
npm install
```

`.env.example` dosyasını `.env` olarak kopyalayıp kendi Firebase proje bilgilerinizi girin:

```bash
cp .env.example .env
```

## Geliştirme

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Şartname Özeti

- Responsive tasarım: 320px – 1440px arası tüm sayfalarda test edilmiştir.
- Semantik ve valid HTML, konsolda hata yok.
- Auth ve veri işlemleri Firebase üzerinden yürütülür.
- Form doğrulamaları react-hook-form + yup ile zorunlu alan kontrolü içerir.
