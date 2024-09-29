
export interface UserData {
    user: string;
    password: string;
    remember: boolean;
  }
      
//Esta recibiendo los datos ingresados que van a ser mostrados por consola
export function setUserData(userData: UserData) {
    console.log(`user: ${userData.user}`);
    console.log(`password: ${userData.password}`);
    console.log(`remind me: ${userData.remember}`);
}

