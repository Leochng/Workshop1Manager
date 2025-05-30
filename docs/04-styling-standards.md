# Styling Standards

## Tailwind CSS Implementation

### 1. Base Styles

```css
/* From globals.css */
@import "tailwindcss/base";
@import "../styles/tokens.css";
@import "../styles/typography.css";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### 2. Color System

```typescript
// Color tokens from your theme
const colors = {
  border: "var(--border)",
  input: "var(--input)",
  ring: "var(--ring)",
  background: "var(--background)",
  foreground: "var(--foreground)",
  primary: {
    DEFAULT: "var(--primary)",
    foreground: "var(--primary-foreground)",
  },
  secondary: {
    DEFAULT: "var(--secondary)",
    foreground: "var(--secondary-foreground)",
  },
  muted: {
    DEFAULT: "var(--muted)",
    foreground: "var(--muted-foreground)",
  },
  accent: {
    DEFAULT: "var(--accent)",
    foreground: "var(--accent-foreground)",
  },
}
```

## Component Styling

### 1. Button Styles

```typescript
// From button.tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90",
        outline: "border bg-background shadow-xs hover:bg-accent",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3",
        lg: "h-10 rounded-md px-6",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

### 2. Card Styles

```typescript
// From card.tsx
<div
  data-slot="card"
  className={cn(
    "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
    className
  )}
/>
```

## Dark Mode Support

### 1. Dark Mode Implementation

```typescript
// Theme switching logic
const [darkMode, setDarkMode] = useState(false)

useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}, [darkMode])
```

### 2. Dark Mode Classes

```typescript
// Example dark mode styling
const className = cn(
  "bg-white text-gray-900",
  "dark:bg-gray-800 dark:text-white",
  className
)
```

## Responsive Design

### 1. Breakpoints

```typescript
// Standard breakpoints
const breakpoints = {
  sm: '640px',    // @media (min-width: 640px)
  md: '768px',    // @media (min-width: 768px)
  lg: '1024px',   // @media (min-width: 1024px)
  xl: '1280px',   // @media (min-width: 1280px)
  '2xl': '1536px' // @media (min-width: 1536px)
}
```

### 2. Responsive Classes

```typescript
// Example responsive layout
<div className="
  grid
  grid-cols-1
  md:grid-cols-2
  lg:grid-cols-3
  gap-4
  p-4
  md:p-6
  lg:p-8
">
```

## Form Styling

### 1. Input Styles

```typescript
// From input.tsx
<input
  className={cn(
    "flex h-9 w-full rounded-md border bg-transparent px-3 py-1",
    "text-sm shadow-sm transition-colors",
    "focus-visible:outline-none focus-visible:ring-1",
    "disabled:cursor-not-allowed disabled:opacity-50",
    className
  )}
/>
```

### 2. Label Styles

```typescript
// From label.tsx
<Label
  className={cn(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    className
  )}
/>
```

## Best Practices

1. **Class Organization**
   - Group related classes
   - Use consistent ordering
   - Maintain readability

2. **Utility Classes**
   - Use @apply for repeated patterns
   - Create reusable components
   - Maintain consistent spacing

3. **Theme Consistency**
   - Use CSS variables
   - Follow color system
   - Maintain spacing scale

4. **Accessibility**
   - Maintain color contrast
   - Use proper focus states
   - Support reduced motion

5. **Performance**
   - Purge unused styles
   - Optimize for production
   - Monitor bundle size
