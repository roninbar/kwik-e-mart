import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';
import { IObjectUrls } from 'src/app/types/object-urls.interface';
import { AlertService, httpAlert } from './alert.service';

@Injectable({
    providedIn: 'root'
})
export class GsService {

    constructor(private http: HttpClient, private alertService: AlertService) { }

    uploadRx(file: File): Observable<string> {
        return this.http.post<IObjectUrls>('/api/gs', { path: 'products/', type: file.type }).pipe(
            switchMap(({ getUrl, putUrl }) => this.http.put(putUrl, file).pipe(mapTo(getUrl))),
            httpAlert(this.alertService),
        );
    }
}
