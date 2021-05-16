import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';

interface ObjectUrls {
  getUrl: string;
  putUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class S3Service {

  constructor(private http: HttpClient) { }

  uploadRx(file: File): Observable<string> {
    return this.http.post<ObjectUrls>('/api/s3', { mimeType: file.type }).pipe(
      switchMap(({ getUrl, putUrl }) => this.http.put(putUrl, file).pipe(mapTo(getUrl))),
    );
  }

}
