# Dashboard Implementation Plan

## Overview
After the user submits the form and clicks "Close" on the popup, navigate to a full dashboard layout with sidebar, header, and widget content area. Include a logout button to return to the landing page.

## Current Flow
1. User fills form (username, email) → Submit
2. Popup shows "Thanks for submitting your email information"
3. User clicks "Close" → Popup closes (stays on landing page)

## New Flow
1. User fills form (username, email) → Submit
2. Popup shows "Thanks for submitting your email information"
3. User clicks "Close" → **Navigate to Dashboard**
4. Dashboard displays with user info, sidebar, widgets
5. User can click "Logout" → **Return to landing page**

## Implementation Steps

### 1. Add View State to App.jsx
- Add `currentView` state: `'landing'` | `'dashboard'`
- Store submitted `username` and `email` before clearing (pass to dashboard)
- Modify `closePopup` to set `currentView` to `'dashboard'`

### 2. Create Dashboard Component
**File**: `src/components/Dashboard.jsx`

Layout structure:
```
┌─────────────────────────────────────────┐
│  Header (Welcome, {username} | Logout)  │
├────────────┬────────────────────────────┤
│            │                            │
│  Sidebar   │   Content Area             │
│  - Home    │   ┌────────┐ ┌────────┐    │
│  - Profile │   │Widget 1│ │Widget 2│    │
│  - Settings│   └────────┘ └────────┘    │
│            │   ┌────────┐ ┌────────┐    │
│            │   │Widget 3│ │Widget 4│    │
│            │   └────────┘ └────────┘    │
└────────────┴────────────────────────────┘
```

Components:
- Header with username display and logout button
- Sidebar with navigation items (placeholder)
- Content area with 4 widget cards (placeholder stats)

### 3. Add Dashboard Styles
**File**: `src/components/Dashboard.css`
- Dark mode styling matching existing theme
- Glassmorphism effects on widgets
- Flexbox/Grid layout for dashboard structure

### 4. Update App.jsx
- Conditionally render Landing or Dashboard based on `currentView`
- Pass `username`, `email`, and `onLogout` handler to Dashboard
- `onLogout` resets view to `'landing'`

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `src/App.jsx` | Modify | Add view state, conditional rendering |
| `src/components/Dashboard.jsx` | Create | Full dashboard component |
| `src/components/Dashboard.css` | Create | Dashboard styling |
| `src/components/Popup.jsx` | Modify | Change button text to "Continue" |
