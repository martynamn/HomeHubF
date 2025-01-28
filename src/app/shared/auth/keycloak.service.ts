import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { KeyCloakTokenResult, TokenParsed } from '../types/authTypes';
import { UserRoles } from '../models/user.model';

declare let Keycloak: any;

@Injectable()
export class KeycloakService {
  static keycloakAuthObject: any;
  static token?: BehaviorSubject<string | null>;

  constructor() {
    KeycloakService.token = new BehaviorSubject<string | null>(null);
  }

  static init(): Promise<any> {
    KeycloakService.keycloakAuthObject = new Keycloak(environment.keyCloakConstructParams);
    KeycloakService.keycloakAuthObject.onTokenExpired = () => {
      console.warn('[Auth-service] Auth token expired');
      if (environment.authConfig.tokenAutoRefresh) {
        KeycloakService.getTokenSt()
          .then(() => {
            if (environment.authDebug) { console.log('Updated token via auto-refresh'); }
          }, (reason) => {
            if (environment.authDebug) { console.log('Failed token via auto-refresh: ', reason); }
          });
      }
    };

    KeycloakService.keycloakAuthObject.onAuthRefreshSuccess = () => {
      if (environment.authDebug) { console.warn('[Auth-service] Token refreshed'); }
    };

    KeycloakService.keycloakAuthObject.onAuthRefreshError = () => {
      if (environment.authDebug) { console.warn('[Auth-service] Auth token refresh error'); }
      setInterval(() => {
        KeycloakService.logout();
      }, 15000);
    };

    return new Promise((resolve, reject) => {
      KeycloakService.keycloakAuthObject.init(environment.keyCloakInitParams)
        .then(() => {
          if (environment.authDebug) {
            console.log('Auth granted via KeyCloak service');
            console.log(KeycloakService.keycloakAuthObject);
          }
          resolve(KeycloakService.keycloakAuthObject);
        })
        .catch(() => {
          console.error('Auth rejected');
          reject();
        });
    });
  }

  static logout(url: string = environment.keyCloakConstructParams.logoutUrl) {
    KeycloakService.keycloakAuthObject.logout(url);
  }

  static getUsername(): string {
    return KeycloakService.keycloakAuthObject.tokenParsed.preferred_username;
  }

  getUserId(): string {
    return KeycloakService.keycloakAuthObject.tokenParsed.sub;
  }

  isAdmin() {
    return KeycloakService.keycloakAuthObject.tokenParsed?.resource_access['frontend-test']?.roles?.includes(UserRoles.ADMIN);
  }

  getUserRoles() {
    return KeycloakService.keycloakAuthObject.tokenParsed?.resource_access['frontend-test']?.roles;
  }

  static getFullName(): string {
    return KeycloakService.keycloakAuthObject.tokenParsed.name;
  }

  static getTokenParsed(): TokenParsed {
    return KeycloakService.keycloakAuthObject.tokenParsed;
  }

  static getSub(): string | null {
    if (KeycloakService.keycloakAuthObject && KeycloakService.keycloakAuthObject['tokenParsed']) {
      return KeycloakService.keycloakAuthObject['tokenParsed']['sub'];
    } else {
      return null;
    }
  }

  static isAuthenticated(): boolean {
    return KeycloakService.keycloakAuthObject.authenticated;
  }

  static getTokenSt(): Promise<KeyCloakTokenResult> {
    return new Promise((resolve, reject) => {
      if (KeycloakService.keycloakAuthObject && KeycloakService.keycloakAuthObject.token) {
        KeycloakService.keycloakAuthObject
          .updateToken(environment.authConfig.tokenValidUntilTime)
          .then((refreshed: any) => {
            if (environment.authDebug) {
              console.log('Token refreshed: ', refreshed);
            }
            KeycloakService.token?.next(KeycloakService.keycloakAuthObject.token);
            resolve({
              token: KeycloakService.keycloakAuthObject.token,
              success: true
            }
            );
          })
          .catch(() => {
            KeycloakService.token?.next(null);
            resolve({
              token: undefined,
              success: false
            });
          });
      } else {
        KeycloakService.token?.next(null);
        resolve({
          token: undefined,
          success: false
        });
      }
    });
  }

  login(): Promise<any> {
    return new Promise((resolve, reject) => {
      KeycloakService.keycloakAuthObject.login()
        .then((l: any) => {
          console.log('l', l)
          if (environment.authDebug) {
            console.error('Auth granted');
            console.log(KeycloakService.keycloakAuthObject);
          }
          KeycloakService.keycloakAuthObject = environment.keyCloakConstructParams.logoutUrl;
          resolve(KeycloakService.keycloakAuthObject);
        })
        .catch(() => {
          console.error('Auth rejected');
          reject();
        });
    });
  }

  getToken(): Promise<KeyCloakTokenResult> {
    return new Promise((resolve, reject) => {
      if (KeycloakService.keycloakAuthObject && KeycloakService.keycloakAuthObject.token) {
        KeycloakService.keycloakAuthObject
          .updateToken(environment.authConfig.tokenValidUntilTime)
          .then(() => {

            KeycloakService.token?.next(KeycloakService.keycloakAuthObject.token);
            resolve({
              token: KeycloakService.keycloakAuthObject.token,
              success: true
            }
            );
          })
          .catch(() => {
            KeycloakService.token?.next(null);
            resolve({
              token: undefined,
              success: false
            });
          });
      } else {
        KeycloakService.token?.next(null);
        resolve({
          token: undefined,
          success: false
        });
      }
    });
  }

  clearToken() {
    KeycloakService.keycloakAuthObject.clearToken();
  }

  getTokenSubject() {
    return KeycloakService.token;
  }

}
