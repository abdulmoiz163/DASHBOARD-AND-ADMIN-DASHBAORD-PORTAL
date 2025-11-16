// Client-safe types that can be imported in client components
export type UserRole = 'admin' | 'senior_executive' | 'public'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
}

