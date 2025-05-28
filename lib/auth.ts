// This is a mock authentication utility
// In a real app, you would use a real authentication library like bcrypt

export async function hash(password: string): Promise<string> {
  // Mock password hashing
  return `$2a$10$${Buffer.from(password).toString("base64")}`
}

export async function compare(password: string, hashedPassword: string): Promise<boolean> {
  // Mock password comparison
  // In a real app, this would use bcrypt.compare
  // For demo purposes, we'll just check if the password is "password"
  return password === "password"
}
