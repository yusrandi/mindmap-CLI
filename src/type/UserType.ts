export type UserType = {
    id: string
    email: string
    name: string
    online: boolean
};

export const emptUser: UserType = {
    id: "",
    email: "",
    name: "...",
    online: false,
}