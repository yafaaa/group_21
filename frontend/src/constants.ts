export const UserRole = {
    ADMIN: 'ADMIN',
    MENTOR: 'MENTOR',
    STUDENT: 'STUDENT'
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];