# Elite Streaks App Design Guidelines

## Design Approach
**System-Based Approach**: Using a modern sports app design system optimized for data visualization and mobile-first experiences, drawing inspiration from ESPN, The Athletic, and other premium sports applications.

## Core Design Elements

### A. Color Palette
**Dark Theme Primary**:
- Background: 220 25% 8% (deep navy/black)
- Surface: 220 20% 12% (elevated cards/panels)
- Text Primary: 0 0% 95% (near white)
- Text Secondary: 220 10% 70% (muted text)

**Accent Colors**:
- Winning/Success: 142 76% 36% (vibrant green for wins)
- Warning/Draw: 45 93% 58% (golden yellow for draws)
- Loss/Danger: 0 84% 60% (strong red for losses)
- Brand Accent: 45 100% 51% (gold for highlights and CTAs)

### B. Typography
**Font Stack**: Inter via Google Fonts CDN
- Headings: Inter 600-700 (semibold to bold)
- Body Text: Inter 400-500 (regular to medium)
- Small Text/Labels: Inter 400 (regular)
- Sizes: 12px (labels), 14px (body), 16px (cards), 18px (subheadings), 24px+ (headings)

### C. Layout System
**Tailwind Spacing Units**: Consistently use 2, 4, 6, 8, 12, 16
- Tight spacing: p-2, gap-2 (8px)
- Standard spacing: p-4, m-4, gap-4 (16px)  
- Section spacing: p-6, mb-8 (24px, 32px)
- Large spacing: p-8, mt-12, gap-16 (32px, 48px, 64px)

### D. Component Library

**Navigation**:
- Horizontal scrolling tabs for "Winning Streaks" / "Drawing Streaks"
- Tab indicators with gold underline accent
- Mobile-optimized touch targets (44px minimum)

**Team Cards**:
- Rounded corners (8px border radius)
- Subtle drop shadow on dark surface color
- Flag icons (16x12px) next to league names
- Streak pattern display using colored pills/circles:
  - W: Green circle with white "W"
  - D: Yellow circle with dark "D" 
  - L: Red circle with white "L"
- Most recent result on the left, chronological order right-to-left

**Data Display**:
- Clean typography hierarchy
- Generous whitespace between sections
- Status indicators for data freshness
- Empty states with friendly messaging

**Interactive Elements**:
- Search bar with dark styling and gold focus states
- Filter dropdowns for league selection
- Subtle hover states (brightness increase on dark backgrounds)
- Touch-friendly mobile interactions

### E. Animations
**Minimal Approach**:
- Subtle fade transitions for data updates
- Smooth tab switching (300ms ease)
- Card hover lift effect (2px translate)
- Loading states with simple spinner

## Images
No large hero images required. Focus on:
- League flag icons (small, 16x12px for identification)
- Team logos if available (24x24px in cards)
- Placeholder team crests using initials in colored circles

## Key Design Principles
1. **Mobile-First**: All interactions optimized for touch
2. **Data Clarity**: Clear visual hierarchy for streak information
3. **Performance**: Minimal animations, efficient rendering
4. **Accessibility**: High contrast ratios, readable typography
5. **Sports Aesthetic**: Professional, data-driven appearance matching premium sports platforms