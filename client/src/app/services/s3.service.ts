import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';
import { AlertService, httpAlert } from './alert.service';
import { IObjectUrls } from 'src/app/types/object-urls.interface';

@Injectable({
    providedIn: 'root'
})
export class S3Service {

    constructor(private http: HttpClient, private alertService: AlertService) { }

    uploadRx(file: File): Observable<string> {
        return this.http.post<IObjectUrls>('/api/s3', { path: 'products/', type: file.type }).pipe(
            switchMap(({ getUrl, putUrl }) => this.http.put(putUrl, file).pipe(mapTo(getUrl))),
            httpAlert(this.alertService),
        );
    }

}
