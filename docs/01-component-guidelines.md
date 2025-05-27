# Component Development Guidelines

## Directory Structure

Components should be organized following the current structure:

```plaintext
src/
├── components/
│   ├── ui/              # Reusable UI components (button.tsx, card.tsx, input.tsx, label.tsx)
│   └── [feature]/       # Feature-specific components for each route
```

## Component Creation Rules

### 1. Basic Component Structure

```typescript
import React from 'react'
import { cn } from '@/lib/utils'

interface ComponentProps {
  // Props definition with proper types
  className?: string;
  children?: React.ReactNode;
}

const Component: React.FC<ComponentProps> = ({ 
  className,
  children,
  ...props 
}) => {
  return (
    <div className={cn("base-classes", className)} {...props}>
      {children}
    </div>
  )
}

export default Component
```

### 2. UI Components

- Must be placed in `src/components/ui/`
- Follow existing patterns like `button.tsx`, `card.tsx`
- Use Tailwind CSS for styling
- Support dark mode by default
- Include proper type definitions

### 3. Feature Components

- Place in relevant feature folder
- Keep components focused and single-responsibility
- Implement proper error handling
- Use Protected Routes where needed

### 4. Props Requirements

- Always define TypeScript interfaces
- Use descriptive prop names
- Provide default values where appropriate
- Document complex props

### 5. Error Handling

```typescript
const Component: React.FC<ComponentProps> = ({ onError }) => {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  // Component logic with try-catch blocks
};
```

### 6. Loading States

- Implement proper loading states
- Use skeleton loaders where appropriate
- Show error states when needed

### 7. Component Testing

- Create test file alongside component
- Test all component states
- Test user interactions
- Test error scenarios

## Examples from Current Codebase

### Button Component

```typescript
// Based on current button.tsx pattern
import { Button } from '@/components/ui/button'

// Usage
<Button 
  variant="default"
  size="default"
  onClick={handleClick}
>
  Click Me
</Button>
```

### Card Component

```typescript
// Based on current card.tsx pattern
import { Card, CardHeader, CardContent } from '@/components/ui/card'

// Usage
<Card>
  <CardHeader>Title</CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### Form Components

```typescript
// Based on current input.tsx and label.tsx patterns
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Usage
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" required />
</div>
```
