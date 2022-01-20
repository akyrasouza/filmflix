import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { user } from 'rxfire/auth';
import { docData } from 'rxfire/firestore';
import { from, map, of, pipe, switchMap, tap } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private db: Firestore) { }

  //from cria um Observable
  login(email: string, password: string){
    return from(signInWithEmailAndPassword(this.auth,email,password))

  }

  signup(email: string, password: string,payload: User){
    return from(
      createUserWithEmailAndPassword(this.auth,email,password)
      ).pipe(
        tap((creds) => {
          payload.uid = creds.user.uid;

          const users = collection(this.db, 'users');
          const userDoc = doc(users, payload.uid);

          setDoc(userDoc, payload);
        })
      )
  }

  get user(){
    return user(this.auth).pipe(switchMap((user) => {
      if(user){
        return this.getUserData(user.uid);
      }
      return of(undefined);
    }));
  }

  private getUserData(uid: string){
    const users = collection(this.db, 'users');
    const userDoc = doc(users, uid);

    return docData(userDoc).pipe(map((data) => data as User));
  }
}
