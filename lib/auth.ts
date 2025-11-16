import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import type { User, UserRole } from './types'

export type { User, UserRole }

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

// In-memory user store (in production, use a database)
const users: Array<User & { password: string }> = []

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateToken(user: User): string {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

export function verifyToken(token: string): User | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as User
    return decoded
  } catch {
    return null
  }
}

export async function createUser(
  email: string,
  password: string,
  name: string,
  role: UserRole = 'public'
): Promise<User> {
  const hashedPassword = await hashPassword(password)
  const user: User & { password: string } = {
    id: Date.now().toString(),
    email,
    name,
    role,
    password: hashedPassword,
  }
  users.push(user)
  return { id: user.id, email: user.email, name: user.name, role: user.role }
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const user = users.find(u => u.email === email)
  if (!user) return null

  const isValid = await verifyPassword(password, user.password)
  if (!isValid) return null

  return { id: user.id, email: user.email, name: user.name, role: user.role }
}

export function getUserByEmail(email: string): User | null {
  const user = users.find(u => u.email === email)
  if (!user) return null
  return { id: user.id, email: user.email, name: user.name, role: user.role }
}

