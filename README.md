# 🍽️ Dish Poll Project

A modern React application for collaborative dish voting and ranking. Users can login with static credentials, vote for their favorite dishes and see real-time poll results.

## ✨ Features

- **User Authentication**: Secure login with demo credentials (Amar, Akbar, Antony, John, Paul)
- **Dish Voting System**: Vote for your top 3 favorite dishes with ranking
- **Points-Based System**: 
  - Rank 1 = 30 points 🥇
  - Rank 2 = 20 points 🥈
  - Rank 3 = 10 points 🥉
- **Live Results Dashboard**: View real-time poll rankings with vote distribution
- **Edit Votes Anytime**: Change your selections at any time
- **Persistent State**: Data persists across sessions using Redux Persist
- **Responsive Design**: Fully responsive mobile-friendly interface
- **Error Handling**: Comprehensive error handling and logging
- **Performance**: Caching strategy for API calls and optimized selectors

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/Dish-Poll-Project.git
cd Dish-Poll-Project

# Install dependencies
npm install

# Start the development server
npm start
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 📋 Demo Credentials

Use these credentials to test the application:

| Username | Password |
|----------|----------|
| amar     | amar123  |
| akbar    | akbar123 |
| antony   | antony123|
| john     | john123  |
| paul     | paul123  |

## 🏗️ Project Structure

```
src/
├── app/                    # Redux store configuration
│   ├── store.js
│   └── rootReducer.js
├── components/             # Reusable UI components
│   ├── common/            # Common components (Loading, ErrorMessage, etc)
│   └── layout/            # Layout components (Header, Navigation)
├── contexts/              # React Context
│   └── ToastContext.jsx
├── features/              # Feature modules
│   ├── auth/             # Authentication feature
│   ├── dishes/           # Dishes voting feature
│   └── poll/             # Poll results feature
├── hooks/                # Custom React hooks
├── routes/               # Router configuration
├── services/             # API services
├── styles/               # Global styles
└── utils/                # Utility functions
```

## 🔄 Redux State Structure

```javascript
{
  auth: {
    currentUser: { id, username },
    isLoading: boolean,
    error: string | null
  },
  dishes: {
    items: Array<Dish>,
    isLoading: boolean,
    error: string | null,
    lastFetched: timestamp
  },
  poll: {
    votes: {
      [userId]: {
        [dishId]: rank
      }
    }
  }
}
```

## 📡 API Integration

The app fetches dishes from:
```
https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json
```

**Dish Object Structure:**
```json
{
  "id": 1,
  "dishName": "Lasagne",
  "description": "Breaded fried chicken with waffles, and a side of maple syrup.",
  "image": "https://loremflickr.com/300/300/food"
}
```

## 🎨 Key Features Implementation

### 1. Voting System
- Select up to 3 dishes with unique ranks
- Automatic conflict resolution (reassigning existing ranks)
- Edit votes anytime with immediate UI updates

### 2. Results Page
- Dishes ranked by total points (descending)
- Vote distribution breakdown for each dish
- Visual indicators of user's own rankings
- Position-based medal display (1st, 2nd, 3rd)

### 3. State Persistence
- Redux Persist stores auth and poll data
- Automatic cache expiration for dishes (1 hour)
- Clean slate for new sessions

### 4. Error Handling
- Comprehensive error boundaries
- Network error fallbacks
- Detailed logging in development mode
- User-friendly error messages

## 🧪 Testing

```bash
npm test
```

## 📊 Performance Considerations

- **Memoized Selectors**: Using Redux Toolkit's `createSelector` for optimized state selection
- **Lazy Image Loading**: Images load asynchronously to reduce bundle impact
- **API Caching**: Dishes cached for 1 hour to reduce API calls
- **React Strict Mode**: Enabled in development for detecting potential issues

## 🔐 Code Quality

- **ESLint**: Code quality rules configured
- **Error Boundary**: Application-level error handling
- **Logger Utility**: Structured logging throughout the app
- **Accessibility**: ARIA labels and semantic HTML
- **Responsive**: Mobile-first design approach

## 🐛 Logging

The app includes a custom logger with levels:
- `logger.info()` - Information messages
- `logger.warn()` - Warning messages  
- `logger.error()` - Error messages
- `logger.debug()` - Debug info (development only)

## 📦 Dependencies

Key dependencies:
- **React 19** - UI library
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Redux Persist** - State persistence
- **Tailwind CSS** - Styling

## 🚨 Exception Handling

The application handles:
- Network failures with retry options
- Invalid credentials with clear messaging
- Missing or broken images with placeholders
- Component crashes with error boundaries
- API timeouts with user notifications

## 📝 Git Commit Practices

The project follows conventional commit practices:
- Feature commits: `feat: add voting system`
- Fix commits: `fix: resolve vote conflict`
- Documentation: `docs: update README`
- Refactor: `refactor: optimize selectors`

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Write meaningful commit messages
4. Push to the branch
5. Create a pull request

## 📄 License

This project is private and for educational purposes.

## 📧 Support

For issues or questions, contact the development team.

---

**Last Updated:** February 6, 2026
**Version:** 0.1.0