# Testing Strategy Guidelines

## Testing Setup

### 1. Required Dependencies
```json
{
  "devDependencies": {
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/user-event": "^14.0.0",
    "jest": "^29.0.0"
  }
}
```

## Component Testing

### 1. Basic Component Test
```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    await userEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalled()
  })
})
```

### 2. Protected Route Testing
```typescript
import { render, screen } from '@testing-library/react'
import { useAuth } from '@/lib/AuthContext'
import { ProtectedRoute } from '@/lib/ProtectedRoute'

// Mock AuthContext
jest.mock('@/lib/AuthContext')

describe('ProtectedRoute', () => {
  it('renders children when authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({ 
      user: { uid: '123' }, 
      loading: false 
    })

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    )

    expect(screen.getByText('Protected Content')).toBeInTheDocument()
  })

  it('redirects when not authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({ 
      user: null, 
      loading: false 
    })

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    )

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
  })
})
```

## Firebase Testing

### 1. Mocking Firebase
```typescript
// __mocks__/firebase.ts
const mockFirebase = {
  auth: jest.fn(),
  firestore: jest.fn(),
  // Add other Firebase services as needed
}

export default mockFirebase
```

### 2. Testing Firebase Integration
```typescript
import { render, screen, waitFor } from '@testing-library/react'
import { db } from '@/lib/firebase'

// Mock Firestore
jest.mock('@/lib/firebase', () => ({
  db: {
    collection: jest.fn(),
    doc: jest.fn(),
  }
}))

describe('Firebase Integration', () => {
  it('fetches data correctly', async () => {
    const mockData = [{ id: '1', name: 'Test' }]
    
    // Mock Firestore query
    db.collection.mockImplementation(() => ({
      where: () => ({
        get: () => Promise.resolve({
          docs: mockData.map(item => ({
            id: item.id,
            data: () => item
          }))
        })
      })
    }))

    // Test component that uses Firebase
    render(<YourComponent />)
    
    await waitFor(() => {
      expect(screen.getByText('Test')).toBeInTheDocument()
    })
  })
})
```

## Form Testing

### 1. Input Validation
```typescript
describe('Form Validation', () => {
  it('validates required fields', async () => {
    render(<YourForm />)
    
    const submitButton = screen.getByRole('button', { name: /submit/i })
    await userEvent.click(submitButton)
    
    expect(screen.getByText(/this field is required/i)).toBeInTheDocument()
  })
})
```

### 2. Form Submission
```typescript
describe('Form Submission', () => {
  it('handles successful submission', async () => {
    const onSubmit = jest.fn()
    render(<YourForm onSubmit={onSubmit} />)
    
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com')
    await userEvent.type(screen.getByLabelText(/password/i), 'password123')
    
    await userEvent.click(screen.getByRole('button', { name: /submit/i }))
    
    expect(onSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    })
  })
})
```

## Test Coverage Requirements

### 1. Coverage Thresholds
```json
{
  "jest": {
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}
```

### 2. Required Test Cases
- Component rendering
- User interactions
- Error states
- Loading states
- Edge cases
- Integration with Firebase
- Form validation
- Protected routes
- Authentication flow

## Best Practices

1. **Test Organization**
   - Group related tests
   - Use clear descriptions
   - Test one thing per test
   - Use setup and teardown

2. **Mocking**
   - Mock external dependencies
   - Use consistent mock data
   - Clean up mocks after tests
   - Document mock behavior

3. **Async Testing**
   - Use proper async/await
   - Handle loading states
   - Test error scenarios
   - Use proper timeouts

4. **User Interaction**
   - Use userEvent over fireEvent
   - Test keyboard navigation
   - Test accessibility
   - Test form submissions

5. **Maintenance**
   - Keep tests up to date
   - Refactor when needed
   - Document complex tests
   - Review test coverage
