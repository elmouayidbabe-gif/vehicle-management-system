# 🚗 Vehicle Management System - Groupe 8
## دليل المشروع الكامل | Guide Complet du Projet

---

## 📁 هيكل المشروع | Structure du Projet

```
vehicle-management-system/
├── backend/                          # Spring Boot 3
│   ├── src/main/java/com/groupe8/backend/
│   │   ├── BackendApplication.java
│   │   ├── controller/
│   │   │   ├── AuthController.java      ← /api/auth
│   │   │   ├── VehicleController.java   ← /api/vehicles
│   │   │   └── PurchaseController.java  ← /api/purchases
│   │   ├── entity/
│   │   │   ├── Vehicle.java
│   │   │   ├── User.java
│   │   │   └── Purchase.java
│   │   ├── repository/
│   │   │   ├── VehicleRepository.java
│   │   │   ├── UserRepository.java
│   │   │   └── PurchaseRepository.java
│   │   ├── service/
│   │   │   ├── VehicleService.java
│   │   │   ├── AuthService.java
│   │   │   └── PurchaseService.java
│   │   ├── security/
│   │   │   └── SecurityConfig.java
│   │   └── dto/
│   │       └── AuthDTO.java
│   └── src/main/resources/
│       └── application.properties
│
├── frontend/                         # React + Vite
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── AdminPage.jsx
│   │   │   └── CataloguePage.jsx
│   │   └── components/
│   │       └── Navbar.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── .gitignore
```

---

## ⚙️ الإعداد والتشغيل | Configuration & Démarrage

### 1. إعداد قاعدة البيانات | Base de données MySQL

```sql
CREATE DATABASE vehicle_db;
```

ثم في `application.properties`، غيّر كلمة المرور إذا لزم:
```properties
spring.datasource.password=ton_mot_de_passe
```

### 2. تشغيل الـ Backend | Démarrer le Backend

```bash
cd backend
./mvnw spring-boot:run
```
أو في IntelliJ IDEA: شغّل `BackendApplication.java`

الـ Backend سيعمل على: **http://localhost:8080**

### 3. تشغيل الـ Frontend | Démarrer le Frontend

```bash
cd frontend
npm install
npm run dev
```

الـ Frontend سيعمل على: **http://localhost:5173**

---

## 👥 نظام المستخدمين | Système d'Utilisateurs

### Admin 🛡️
- يستطيع **إضافة** وـ **تعديل** وـ **حذف** المركبات
- يرى **جميع المشتريات**
- يُدار عبر: `/admin`

### User 👤
- يستطيع **البحث** عن المركبات
- يستطيع **شراء** مركبة
- يدفع عبر **Bankili** أو **Sedad**
- يُدار عبر: `/catalogue`

---

## 💳 نظام الدفع | Système de Paiement

يدعم طريقتَي دفع محليتَين:

| الطريقة | المعرّف |
|---------|---------|
| 🏦 **Bankili** | `BANKILI` |
| 📱 **Sedad** | `SEDAD` |

عند الشراء، يختار المستخدم الطريقة ويدخل رقم هاتفه.

---

## 🔗 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | إنشاء حساب |
| POST | `/api/auth/login` | تسجيل الدخول |

### Vehicles
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/vehicles` | جميع المركبات (Admin) |
| GET | `/api/vehicles/available` | المتاحة فقط (User) |
| GET | `/api/vehicles/{id}` | مركبة بالمعرّف |
| POST | `/api/vehicles` | إضافة مركبة |
| PUT | `/api/vehicles/{id}` | تعديل مركبة |
| DELETE | `/api/vehicles/{id}` | حذف مركبة |
| GET | `/api/vehicles/search?query=...` | بحث |

### Purchases
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/purchases` | إنشاء عملية شراء |
| GET | `/api/purchases/user/{userId}` | مشتريات مستخدم |
| GET | `/api/purchases` | جميع المشتريات |

---

## 🐙 خطوات رفع المشروع على GitHub
## Pousser le Projet sur GitHub (Remplacer le Code de ton Ami)

### الخطوة 1 - Clone المستودع الموجود

```bash
# استنسخ المستودع الذي رفعه صديقك
git clone https://github.com/NOM_UTILISATEUR/NOM_REPO.git
cd NOM_REPO
```

### الخطوة 2 - انسخ الملفات الجديدة

```bash
# احذف المحتوى القديم (ما عدا .git)
rm -rf backend frontend .gitignore README.md

# انسخ الملفات الجديدة من هذا المشروع
cp -r /chemin/vers/vehicle-management-system/* .
```

**ملاحظة:** لا تنسخ مجلد `node_modules` و `target` — هذه في `.gitignore`

### الخطوة 3 - أضف الملفات للـ Git

```bash
git add .
git status   # تحقق مما سيُرفع
```

### الخطوة 4 - Commit

```bash
git commit -m "feat: Add auth system (Admin/User), payment (Bankili/Sedad), purchase flow"
```

### الخطوة 5 - Push

```bash
git push origin main
```

إذا طلب منك اسم المستخدم وكلمة المرور:
- اسم المستخدم: اسم حساب GitHub
- كلمة المرور: استخدم **Personal Access Token** وليس كلمة المرور العادية
  - اذهب إلى: GitHub → Settings → Developer Settings → Personal access tokens → Generate new token

### إذا رفض الـ Push (rejected)

```bash
# إذا كان المستودع يحتوي على commits مختلفة
git pull origin main --rebase
# ثم
git push origin main
```

### إذا أردت الاستبدال الكامل (force push)

```bash
# ⚠️ هذا يمحو تاريخ صديقك - تأكد أنه موافق
git push origin main --force
```

---

## ✅ اختبار سريع | Test Rapide

1. سجّل حساب Admin: `POST /api/auth/register` بـ `{"username":"admin","password":"1234","role":"ADMIN"}`
2. سجّل حساب User: `POST /api/auth/register` بـ `{"username":"user","password":"1234","role":"USER"}`
3. أضف مركبة (كـ Admin): `POST /api/vehicles`
4. ابحث واشتر (كـ User) عبر واجهة `/catalogue`

---

*Groupe 8 — Vehicle Management System*
