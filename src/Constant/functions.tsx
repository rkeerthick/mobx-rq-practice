
export const userPresent = (email: string, data: [any]): boolean => {
    return data.some(user => (user.email === email) ? true : false)
}

export const userAlreadyExist = (email: string, data: [any]): boolean => {
    return data.some(user => (user.email === email) ? true : false)
}