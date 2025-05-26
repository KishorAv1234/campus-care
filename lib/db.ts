// This is a mock database client
// In a real app, you would use a real database client like Prisma

export const db = {
  user: {
    findUnique: async ({ where }: { where: { email: string } }) => {
      // Mock user data
      if (where.email === "user@example.com") {
        return {
          id: "1",
          name: "John Doe",
          email: "user@example.com",
          password: "$2a$10$GQH.xZUBHMDqpkAQpj1NkOZcJ1dVhQz7u.X0jRlmfT8X8kP7eIFie", // hashed "password"
        }
      }
      return null
    },
    create: async ({ data }: { data: { name: string; email: string; password: string } }) => {
      // Mock user creation
      return {
        id: "2",
        name: data.name,
        email: data.email,
        password: data.password,
      }
    },
  },
}
