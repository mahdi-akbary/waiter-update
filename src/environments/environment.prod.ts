import {IEnvironment} from "./environment.types";

export const environment: IEnvironment = {
  appName: 'Tea Talk',
  production: true,
  baseUrl: {
    backend: 'http://127.0.0.1:7000/',
    frontEnd: 'http://127.0.0.1:4500/'
  }
};
