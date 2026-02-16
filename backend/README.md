# AROHANA Backend

> Role-Based Event Management System for Arohana, the annual fest of Hyperion (PGDAV College DU)

---

## 📋 Project Overview

AROHANA Backend is a robust Node.js server designed to manage the annual fest **Arohana** organized under **Hyperion**, the multi-society management wing of PGDAV College, Delhi University.

This backend serves as the core API for:
- **Role-based event management** with hierarchical access control
- **Admin and Society management** through a structured admin hierarchy
- **User registration and event participation** with approval workflows
- **Entry pass generation** with QR codes for event tracking

The system implements a secure, scalable architecture with JWT-based authentication, input validation, and role-based middleware to ensure data integrity and controlled access.

---

## 🏗️ Current Architecture

### Core Stack

| Component | Version/Technology |
|-----------|-------------------|
| **Runtime** | Node.js with ES Modules |
| **Framework** | Express 5 |
| **Database** | MongoDB Atlas + Mongoose |
| **Authentication** | JWT (HTTP-only cookies) |
| **Validation** | Joi |
| **Password Hashing** | bcrypt |
| **Security** | Helmet, CORS |
| **Utilities** | nanoid (unique token generation), multer (file uploads) |

### Key Architectural Decisions

- **Separate Collections**: Distinct `Admin` and `User` collections for role separation
- **Dual JWT Secrets**: Separate `ADMIN_JWT_SECRET` and `USER_JWT_SECRET` for enhanced security
- **HTTP-only Cookies**: Prevents XSS attacks by preventing JavaScript access to tokens
- **Role-Based Middleware**: Granular access control through dedicated authentication layers
- **Input Validation**: All requests validated with Joi schemas before processing
 - **File Uploads**: Aadhaar uploads handled server-side with `multer`, file filtering and limits enforced

---

## 👥 Admin Hierarchy

```
┌─ Super Admin ━━━┐
│  (Seeded)       │
│                 │
└━━━┬─────────────┘
    │
    ├─→ Create Societies
    ├─→ Create Society Admins
    └─→ Manage Platform

    ┌─────────────────────┐
    │     Society Admin    │
    │  (Created by Super)  │
    │                      │
    └──────────┬───────────┘
               │
               ├─→ View Society Details
               ├─→ Manage Events (future)
               └─→ View Registrations (future)
```

### Role-Based Access Control

- **Super Admin**: Full platform access, society creation, admin account management
- **Society Admin**: Society-specific operations, event management (future)
- **Users**: Event registration, entry pass generation (future)

Each role is protected by dedicated middleware (`superAdmin.middleware.js`, `authAdmin.middleware.js`).

The user authentication flow is implemented with a separate user JWT secret and HTTP-only cookie storage.

---

## ✅ Completed Features

### Core Infrastructure
- ✅ Express server setup with ES Modules
- ✅ MongoDB connection via Mongoose
- ✅ Environment configuration management

### Authentication & Authorization
- ✅ Admin login endpoint with JWT generation
- ✅ Admin logout endpoint with token clearing
- ✅ JWT utility function for token generation/verification
- ✅ Admin authentication middleware (`authAdmin.middleware.js`)
- ✅ Super-admin role verification middleware (`superAdmin.middleware.js`)
- ✅ HTTP-only cookie configuration for secure token storage

### Admin Management
- ✅ Super Admin seeding script (`seedSuperAdmin.js`)
- ✅ Admin model with password hashing
- ✅ Admin login/logout controller

### User Management
- ✅ User registration endpoint with Aadhaar upload (multer)
- ✅ User login & logout with JWT stored in HTTP-only cookie
- ✅ User profile retrieval (protected route)
- ✅ Document reupload functionality for Aadhaar/ID cards
- ✅ Upload middleware (`upload.middleware.js`) with file-type filtering and 20MB limit
- ✅ Joi validation for user registration (`userAuth.validator.js`)

### Society Management
- ✅ Society creation endpoint with validation
- ✅ Society model with proper schema
- ✅ Joi validation schema for society data (`adminAuth.validator.js`)
- ✅ Role-based access to society operations

### Event Management
- ✅ Event creation by society admin with banner upload
- ✅ Event listing for society admins
- ✅ Event deletion by society admin
- ✅ Public event listing and retrieval
- ✅ Single event details endpoint

### User Approval System
- ✅ User approval by super admin
- ✅ User rejection by super admin
- ✅ QR token validation for entry passes

### Security Layer
- ✅ Password hashing with bcrypt
- ✅ Helmet security headers
- ✅ CORS configuration
- ✅ Input validation with Joi
- ✅ Request sanitization

---

## 📁 Folder Structure

```
backend/
├── src/
│   ├── configs/
│   │   └── db.js                    # MongoDB connection
│   │
│   ├── models/
│   │   ├── admin.model.js           # Admin schema
│   │   ├── society.model.js         # Society schema
│   │   └── user.model.js            # User schema
│   │
│   ├── controllers/
│   │   ├── adminAuth.controller.js  # Admin login/logout logic
│   │   ├── superAdmin.controller.js # Super admin operations
│   │   └── userAuth.controller.js   # User registration/login (future)
│   │
│   ├── routes/
│   │   ├── adminAuth.routes.js      # Admin auth endpoints
│   │   ├── superAdmin.routes.js     # Super admin endpoints
│   │   └── userAuth.routes.js       # User auth endpoints (future)
│   │
│   ├── middleware/
│   │   ├── authAdmin.middleware.js  # Admin verification
│   │   ├── superAdmin.middleware.js # Super admin verification
│   │   └── upload.middleware.js     # Aadhaar upload handling (multer)
│   │
│   ├── validators/
│   │   ├── adminAuth.validator.js   # Joi validation schemas
│   │   └── userAuth.validator.js    # User registration/login validation
│   │
│   ├── utils/
│   │   └── generateToken.js         # JWT token generation
│   │
│   └── app.js                       # Express app initialization
│
├── seed/
│   └── seedSuperAdmin.js            # Super admin initialization
│
├── uploads/                         # User file uploads (Aadhaar future)
│
├── server.js                        # Entry point
├── package.json                     # Dependencies
├── .env                             # Environment variables
└── .gitignore
```

---

## 🔒 Security Design

### Authentication & Authorization

```javascript
// JWT stored in HTTP-only cookies (XSS prevention)
res.cookie('adminToken', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});

// Separate secrets prevent admin/user token confusion
const adminToken = jwt.sign(payload, process.env.JWT_ADMIN_SECRET);
const userToken = jwt.sign(payload, process.env.JWT_USER_SECRET);
```

### Input Validation

All API requests pass through Joi validation before reaching controllers:

```javascript
// adminAuth.validator.js
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});
```

### Password Security

- Passwords hashed with bcrypt (salt rounds: 10)
- No plaintext passwords stored
- Comparison done securely in authentication flow

### Role-Based Middleware

```javascript
// Protects super-admin only endpoints
const superAdminProtect = (req, res, next) => {
  if (req.admin.role !== 'superAdmin') {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  next();
};
```

### Infrastructure Security

- **Helmet**: Sets security headers (CSP, X-Frame-Options, etc.)
- **CORS**: Restricted to frontend origin
- **Input Sanitization**: All inputs validated before processing
- **Rate Limiting**: Implemented on authentication endpoints (recommended future)

### Environment Variables

```
# Authentication
JWT_ADMIN_SECRET=<random-32-char-string>
JWT_USER_SECRET=<random-32-char-string>
JWT_EXPIRE=7d

# Database
MONGODB_URI=<atlas-connection-string>
DB_NAME=arohana

# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Admin Seed
SUPER_ADMIN_EMAIL=admin@arohana.in
SUPER_ADMIN_PASSWORD=<secure-password>
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ with ES Modules support
- MongoDB Atlas account
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Seed super admin (one-time)
npm run seed

# Start development server
npm run dev

# Start production server
npm start
```

### Initial Setup

1. Configure MongoDB connection in `.env`
2. Generate secure JWT secrets (32+ characters)
3. Run super admin seeding script
4. Test admin login endpoint

---

## 📊 API Endpoints (Current)

### Route Status Summary
**Total Routes: 16 Completed ✅**

| Route Group | Total | Completed |
|-------------|-------|-----------|
| Admin Authentication | 2 | 2 ✅ |
| User Authentication | 5 | 5 ✅ |
| Admin Operations | 6 | 6 ✅ |
| Event Management | 2 | 2 ✅ |
| QR & Entry Pass Validation | 1 | 1 ✅ |
| **TOTAL** | **16** | **16 ✅** |

### Admin Authentication (2/2 Completed ✅)

```
POST   /api/v1/auth/admin/login       # Admin login with credentials
POST   /api/v1/auth/admin/logout      # Admin logout, clear token cookie
```

### User Authentication (5/5 Completed ✅)

```
POST   /api/v1/auth/user/register    # User registration with Aadhaar & ID card upload
POST   /api/v1/auth/user/login       # User login with credentials
POST   /api/v1/auth/user/logout      # User logout, clear token cookie
PATCH  /api/v1/auth/user/reupload-documents  # Reupload Aadhaar/ID card (protected)
GET    /api/v1/auth/user/profile     # Get user profile (protected)
```

### Admin Operations (6/6 Completed ✅)

```
POST   /api/v1/admin/create-society        # Create new society (Super Admin only)
GET    /api/v1/admin/events                # Get society events (Society Admin only)
POST   /api/v1/admin/events                # Create event with banner (Society Admin only)
DELETE /api/v1/admin/events/:id            # Delete event (Society Admin only)
PATCH  /api/v1/admin/users/:id/approve    # Approve user registration (Super Admin only)
PATCH  /api/v1/admin/users/:id/reject     # Reject user registration (Super Admin only)
```

### Event Management (2/2 Completed ✅)

```
GET    /api/v1/events                # Get all events with details
GET    /api/v1/events/:id            # Get specific event details
```

### QR & Entry Pass Validation (1/1 Completed ✅)

```
GET    /api/v1/qr/validate/:token    # Validate QR token for entry pass
```

---

## 📋 Planned Features & TODO

### Phase 1: User Management
 - [x] User registration endpoint (with Aadhaar upload)
 - [ ] Email verification workflow
 - [x] Aadhaar document upload (supports `.pdf`, `.jpg`, `.png`) via `multer`
 - [ ] Aadhaar validation preprocessing
 - [ ] Approval system (Super Admin reviews uploads)

### Phase 2: Entry Pass & QR Generation
- [ ] QR code generation library integration
- [ ] Entry pass creation after approval
- [ ] Entry pass download/email functionality
- [ ] Unique pass ID generation using nanoid

### Phase 3: Event Management
- [ ] Event creation by society admin
- [ ] Event details and description
- [ ] Event registration with capacity limits
- [ ] Event listing and filtering

### Phase 4: Advanced Features
- [ ] Real-time event updates (WebSocket future)
- [ ] Analytics dashboard
- [ ] Payment integration (if ticketed events)
- [ ] Email notifications
- [ ] SMS notifications for event updates

### Phase 5: Performance & Monitoring
- [ ] Rate limiting on all endpoints
- [ ] Request logging middleware
- [ ] Error monitoring (Sentry integration)
- [ ] Database query optimization
- [ ] Caching layer (Redis)

---

## 🛠️ Development Workflow

### Running Tests

```bash
# Run test suite (setup required)
npm test
```

### Code Style

- ES Modules throughout
- Async/await for asynchronous operations
- Middleware composition pattern
- MVC architecture adherence

### Git Workflow

```bash
# Feature branch naming
git checkout -b feature/user-registration
git commit -m "feat: implement user registration"
git push origin feature/user-registration
```

---

## 📝 Environment Setup

### Development

```bash
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### Production

```bash
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://arohana.in
```

---

## 🤝 Contributing

### Adding New Features

1. Create feature branch: `git checkout -b feature/your-feature`
2. Implement feature with validation and error handling
3. Add controller, route, and validator files
4. Push and create pull request
5. Request review from team lead

### Code Standards

- Use async/await over callbacks
- Implement proper error handling
- Add JSDoc comments for functions
- Follow existing folder structure
- Validate all inputs with Joi

---

## 📚 Technology Documentation

- [Express 5](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Joi Validation](https://joi.dev/)
- [JWT.io](https://jwt.io/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [Helmet](https://helmetjs.github.io/)

---

## 📞 Support & Contact

**Organization**: Hyperion, PGDAV College, Delhi University  
**Project**: AROHANA (Annual Fest)  
**Contact**: [Add contact email/team lead details]

---

## 📄 License

This project is maintained by Hyperion, PGDAV College DU.

---

**Last Updated**: February 2026  
**Current Version**: 1.0.0 Beta
