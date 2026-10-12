# PEMS Frontend - React Native (Expo)

Complete React Native frontend for Product Export Management System using Expo, React Navigation, and Stripe payments.

## Prerequisites

- Node.js (v14+)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- Backend running at `http://localhost:5000/api/v1`

## Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd pems-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install additional required packages:**
   ```bash
   npm install @react-native-picker/picker @react-native-community/datetimepicker
   ```

## Environment Setup

1. **Configure `.env` file:**
   ```
   EXPO_PUBLIC_API_URL=http://localhost:5000/api/v1
   EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
   ```

2. **Get Stripe Test Keys:**
   - Visit https://dashboard.stripe.com
   - Get your publishable key (starts with `pk_test_`)
   - Replace `pk_test_your_key_here` in `.env`

## Running the Application

### Development Mode

**Start Expo:**
```bash
npm start
```

**Run on specific platform:**
```bash
# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

### Using Expo Go (Easiest)

1. Install Expo Go app on your phone (iOS/Android)
2. Scan the QR code shown in terminal
3. App opens in Expo Go

## Project Structure

```
pems-frontend/
├── App.js                          # Main app entry
├── app.json                        # Expo configuration
├── package.json                    # Dependencies
├── .env                           # Environment variables
├── src/
│   ├── api/
│   │   └── axios.js              # Axios instance with JWT interceptor
│   ├── context/
│   │   └── AuthContext.js        # Global auth state & hooks
│   ├── navigation/
│   │   ├── AppNavigator.js       # Root navigator (auth vs app)
│   │   ├── AdminTabs.js          # Admin bottom tab navigation
│   │   ├── StaffTabs.js          # Staff bottom tab navigation
│   │   └── ClientTabs.js         # Client bottom tab navigation
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── LoginScreen.js
│   │   │   └── RegisterScreen.js
│   │   ├── products/
│   │   │   ├── ProductListScreen.js
│   │   │   ├── ProductDetailScreen.js
│   │   │   ├── AddProductScreen.js
│   │   │   └── EditProductScreen.js
│   │   ├── orders/
│   │   │   ├── OrderListScreen.js
│   │   │   ├── OrderDetailScreen.js
│   │   │   └── PlaceOrderScreen.js
│   │   ├── clients/
│   │   │   ├── ClientListScreen.js
│   │   │   ├── ClientDetailScreen.js
│   │   │   └── AddClientScreen.js
│   │   ├── shipments/
│   │   │   ├── ShipmentListScreen.js
│   │   │   ├── ShipmentDetailScreen.js
│   │   │   └── AddShipmentScreen.js
│   │   ├── payments/
│   │   │   ├── PaymentListScreen.js
│   │   │   ├── PaymentDetailScreen.js
│   │   │   └── PayScreen.js
│   │   ├── documents/
│   │   │   ├── DocumentListScreen.js
│   │   │   ├── DocumentDetailScreen.js
│   │   │   └── UploadDocumentScreen.js
│   │   ├── dashboard/
│   │   │   └── DashboardScreen.js
│   │   └── MoreScreen.js
│   └── components/
│       ├── LoadingSpinner.js
│       ├── ErrorMessage.js
│       ├── StatusBadge.js
│       └── EmptyState.js
```

## Key Features

### Authentication
- Login/Register with role-based access (Admin/Staff/Client)
- JWT token stored in AsyncStorage
- Auto-login on app launch if token exists
- 401 error handling redirects to login

### Role-Based Navigation
- **Admin**: Dashboard, Products, Orders, Clients, Shipments, Payments, Documents
- **Staff**: Products, Orders, Shipments, Documents, Payments
- **Client**: Browse Products, My Orders, Track Shipments, My Payments

### Products
- View all products with search and category filtering
- Admin/Staff: Add, edit, delete products
- View product details

### Orders
- View orders filtered by status
- Admin/Staff: Update order status
- Client: Place orders (multi-step wizard), cancel orders
- Pay for unpaid orders using Stripe

### Clients
- Admin: Create clients with accounts
- View client details and order history

### Shipments
- Track shipments with visual progress
- Admin/Staff: Add shipments to approved/paid orders
- Filter by shipping method (Air/Sea)

### Payments
- Stripe integration for secure payments
- Payment history and invoice view
- Status tracking (Paid/Unpaid)

### Documents
- Upload documents (PDF/images)
- Filter by type and status
- Download/view documents
- Archive documents

### Dashboard (Admin Only)
- Summary statistics
- Recent orders and payments
- Real-time metrics

## API Integration

All API calls use the Axios instance in `src/api/axios.js` which:
- Automatically adds JWT token to headers
- Handles 401 errors (expired token)
- Clears storage and redirects to login

### Example API Call:
```javascript
const response = await axiosInstance.get('/products');
const { data } = response.data;
```

## Stripe Testing

**Test Card Details:**
- Card: `4242 4242 4242 4242`
- Expiry: Any future date (MM/YY)
- CVC: Any 3 digits
- ZIP: Any 5 digits

## Troubleshooting

### Backend Connection Issues
```bash
# Check backend is running
curl http://localhost:5000/api/v1

# Update .env if backend URL is different
EXPO_PUBLIC_API_URL=http://your-backend-url/api/v1
```

### Stripe Configuration
```bash
# Update EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY in .env
# Make sure backend has matching secret key
```

### Dependencies Issues
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules
npm install
```

### Hot Reload Not Working
```bash
# Press 'r' in Expo CLI terminal
# Or scan QR code again
```

## Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser

## Building for Production

### Web
```bash
expo build:web
```

### Android APK
```bash
eas build --platform android
```

### iOS IPA
```bash
eas build --platform ios
```

## Performance Tips

1. **Lazy Loading**: Screens load data on mount
2. **Caching**: Use AsyncStorage for non-sensitive data
3. **Image Optimization**: Use Expo Image Picker with compression
4. **Pagination**: Lists use React Native FlatList for optimization
5. **Debouncing**: Search inputs debounced

## Security Considerations

- JWT tokens stored in AsyncStorage (consider SecureStore for production)
- HTTPS enforced for API calls in production
- Token auto-refresh on 401 response
- No sensitive data logged
- Environment variables for secrets

## Version Information

- React: 18.3.1
- React Native: 0.74.0
- Expo: 50.0.0
- React Navigation: 6.1.0
- React Native Paper: 5.11.0
- Stripe React Native: 0.32.0

## Support

For issues or questions:
1. Check the backend logs
2. Verify .env configuration
3. Ensure backend is running
4. Check network connectivity
5. Inspect browser/Expo console for errors

## Next Steps

1. Configure Stripe live keys for production
2. Set up CI/CD pipeline for deployments
3. Add push notifications
4. Implement offline support
5. Add unit and integration tests
