# Workshop1Manager Design System

## Color System
- Primary: #FFFFF0 (Ivory White)
- Secondary: #2A2E35 (Dark Slate)
- Accent: #DC143C (Crimson Red)
- Background: #121212 (Deep Black)
- Card/Panel: #2A2E35 (Dark Slate)
- Hover: #1E1E1E (Darker Slate)
- Border: #3C3C3C (Medium Gray)

### Status Colors
- Success: #28A745 (Green)
- Warning: #FFC107 (Amber)
- Error: #FF4C4C (Red)
- Info: #17A2B8 (Blue)

## Typography
### Font Families
- Primary: Inter
- Secondary: Merriweather Sans
- Monospace: Roboto Mono

### Type Scale
- Display (Hero): 2.5rem (40px)
- H1 (Page Titles): 2rem (32px)
- H2 (Section Titles): 1.5rem (24px)
- H3 (Card Titles): 1.25rem (20px)
- Body: 1rem (16px)
- Small: 0.875rem (14px)
- XSmall: 0.75rem (12px)

### Font Weights
- Bold: 700 (Titles/Headlines)
- Medium: 500 (Subtitles/Labels)
- Regular: 400 (Body/Paragraphs)
- Light: 300 (Muted/Captions)

## Component Styling

### Cards
- Background: var(--card)
- Border Radius: 0.625rem
- Hover Effect: Scale 1.01 + Shadow
- Padding: 1.5rem
- Icon Background: 10% opacity of accent color

### Buttons
- Primary: Accent color
- Secondary: 10% opacity of primary color
- Border Radius: 0.375rem
- Height: 2.5rem
- Hover: Scale 1.02 + Darken

### Forms
- Input Height: 2.5rem
- Border: 1px solid var(--border)
- Focus Ring: 2px var(--accent) at 20% opacity
- Label: Small text size, Medium weight

### Icons
- Base Size: 1.5rem (24px)
- Container: Circular, 10% opacity background
- Color: Match text or accent color

## Spacing System
- 4px grid base
- Common spacing values: 0.5rem, 1rem, 1.5rem, 2rem
- Card gap: 1.5rem
- Section spacing: 2rem or 3rem

## Animation Guidelines
- Duration: 200ms - 300ms
- Easing: ease-in-out
- Hover transitions: All properties
- Page transitions: Fade + Slide
- Loading states: Pulse effect

## Accessibility
- Minimum contrast ratio: 4.5:1
- Focus states: Visible ring
- Interactive elements: Minimum 44px touch target
- Text zoom: Supports 200%
