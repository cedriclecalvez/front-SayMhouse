export type user = {
    id: number | string,
    email: string,
    password?: string,
    access_token: string
}

export type userStore = {
    user: user | null,
    isLogged: boolean
}