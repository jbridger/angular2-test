import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class TestHttpService {
    private validateUrl = '/validateuser';

    opts:RequestOptions;

    constructor(private http:Http) {
        var headers:Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json')

        this.opts = new RequestOptions();
        this.opts.headers = headers;
    }

    validate(username: string, password: string):Observable<boolean> {
        return this.http.post(this.validateUrl, this.getValidateBody(username, password), this.opts)
            .map((res:Response) => {
                let validationResponse = res.json();
                return validationResponse.success;
            });
    }

    private getValidateBody(username: string, password: string) {
        return JSON.stringify({
            'userId': username,
            'password': password
        });
    }
}