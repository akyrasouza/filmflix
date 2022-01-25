import { Injectable } from '@angular/core';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import {from, switchMap } from 'rxjs';
import { Storage } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(private storage: Storage) { }

  private createFileName(f: File){
    const ext = f.name.split('.').pop();
    const name = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

    return `${name}.${ext}`;
  }

  upload(image: File, folder: string = 'users/'){
    const filename = this.createFileName(image);
    const profile = ref(this.storage, folder + filename);

    return from(uploadBytes(profile, image)).pipe(
      switchMap((_) => {
        return from(getDownloadURL(profile));
      })
    );
  }
}
