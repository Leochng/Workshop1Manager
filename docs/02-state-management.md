# State Management Guidelines

## Current Implementation

Our application uses a combination of:
- React Context for global state (Auth)
- Local state with useState
- Firebase for data persistence

## 1. Authentication State

### Using AuthContext
```typescript
import { useAuth } from '@/lib/AuthContext'

const Component = () => {
  const { user, loading, isVerified } = useAuth()
  
  if (loading) return <div>Loading...</div>
  if (!user) return <div>Not authenticated</div>
  
  return <div>Welcome, {user.email}</div>
}
```

## 2. Local State Management

### Component State
```typescript
// Use for component-specific state
const [state, setState] = useState(initialValue)

// Use for complex state updates
const [state, setState] = useState(() => {
  // Complex initialization logic
  return computedInitialValue
})
```

### Form State
```typescript
// Example from signup/page.tsx
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState<string | null>(null)
```

## 3. Firebase Data Management

### Reading Data
```typescript
// Example from vehicles/page.tsx
const fetchVehicles = async () => {
  const q = query(
    collection(db, 'vehicles'), 
    where('user_id', '==', userId)
  )
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}
```

### Writing Data
```typescript
// Example pattern for adding data
const addData = async (data: any) => {
  try {
    await addDoc(collection(db, 'collection'), {
      ...data,
      user_id: userId,
      created_at: new Date().toISOString(),
    })
  } catch (error) {
    handleError(error)
  }
}
```

## 4. Protected Routes

### Implementation
```typescript
// Using ProtectedRoute component
<ProtectedRoute>
  <Component />
</ProtectedRoute>
```

## 5. State Management Rules

1. **Global State**
   - Use AuthContext for auth state
   - Keep global state minimal
   - Document context providers

2. **Local State**
   - Use for component-specific data
   - Keep state close to where it's used
   - Clean up effects properly

3. **Form State**
   - Handle validation locally
   - Show loading states during submission
   - Clear form after successful submission

4. **Error State**
   - Handle all async operations
   - Show user-friendly error messages
   - Log errors for debugging

5. **Loading State**
   - Show loading indicators
   - Disable forms during submission
   - Handle partial loading states

## 6. Best Practices

1. **State Updates**
   - Use functional updates for state based on previous value
   - Batch related state updates
   - Handle race conditions in async operations

2. **Effect Cleanup**
```typescript
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    // Handle auth state
  })
  return () => unsubscribe()
}, [])
```

3. **Performance**
   - Memoize callbacks with useCallback
   - Memoize expensive computations with useMemo
   - Use proper dependency arrays in effects
