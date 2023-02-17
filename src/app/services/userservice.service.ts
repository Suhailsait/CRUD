import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options = {
  headers: new HttpHeaders(),
};

@Injectable({
  providedIn: 'root',
})
export class UserserviceService {
  constructor(private http: HttpClient) {}

  //signup
  signup(username: any, email: any, phoneno: any, password: any) {
    const data = {
      username,
      email,
      phoneno,
      password,
    };
    //asynchronous
    return this.http.post('http://localhost:3000/signup', data);
  }

  //login
  login(email: any, password: any) {
    const data = {
      email,
      password,
    };
    //asynchronous
    return this.http.post('http://localhost:3000/login', data);
  }

  //forgot
  forgot(email: any) {
    return this.http.post('http://localhost:3000/forget-password', email);
  }

  //reset
  reset(token: any, password: any) {
    const data = {
      password,
    };

    return this.http.post('http://localhost:3000/reset-password', data, {
      params: { token: token },
    });
  }

  //verify
  verify(email: any, otp: any) {
    const data = {
      email,
      otp
    };

    return this.http.post('http://localhost:3000/verify-user', data);
  }
}

// {params:{token:token}}
