export interface IEnvironment {
  appName: string;
  production?: boolean;
  baseUrl: {
    backend: string;
    frontEnd: string;
  }
  userCredentials?: {
    username: string;
    password: string;
  }

}
