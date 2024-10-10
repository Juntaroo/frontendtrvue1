
export interface UserData {
    id: number,
    firstname: string,
    lastname: string,
    username: string,
    password: string,
    remember?: boolean,
    isAdmin: boolean,
    jwtToken: string,
    refreshTokens: string[]
  }


