**Source files:** Download and extract [the project archive](product-export-management-system.zip). The folder paths below refer to the extracted archive.

# Product Export Management System

Team project for managing Ceylon spice product catalogs, customer orders, shipments, payments, and export documents. The mobile client uses React Native and Expo; the API uses Express and MongoDB.

## Repository layout

- `backend`: REST API, authentication, product, order, shipment, payment, and document modules.
- `frontend`: Expo mobile application for admin, staff, and client workflows.

## Local setup

1. Copy `backend/.env.example` to `backend/.env` and add your own MongoDB, JWT, and Cloudinary values. Do not commit the completed `.env` file.
2. From `backend`, run `npm install` and `npm start`.
3. Copy `frontend/.env.example` to `frontend/.env` and set `EXPO_PUBLIC_API_URL` for your backend.
4. From `frontend`, run `npm install` and `npx expo start`.

The Android project can be generated locally with Expo when needed. Uploaded customer documents, local credentials, dependencies, build outputs, and debug signing keys are excluded from this public repository.

## Team work

The original project divided product and inventory, orders and analytics, logistics, client management, payments, and document storage among team members.
