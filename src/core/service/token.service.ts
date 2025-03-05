import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';


interface DecodedToken {
  unique_name: string;
  nameid: string;
  nbf: number;
  exp: number;
  iat: number;
}

@Injectable({
  providedIn: 'root'
})
export class TokenDecodeService {
  decodeToken(token: string): DecodedToken | null {
    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  }

  getTokenDetails(token: string | null) {
    const decoded = token ? this.decodeToken(token): '';
    if (decoded) {
      return {
        username: decoded.unique_name,
        userId: decoded.nameid,
        issuedAt: new Date(decoded.iat * 1000),
        expiresAt: new Date(decoded.exp * 1000),
        remainingTime: this.getTokenRemainingTime(decoded)
      };
    }
    return null;
  }

  private getTokenRemainingTime(decoded: DecodedToken): number {
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp - currentTime;
  }

  isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded) return true;
    
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  }
}