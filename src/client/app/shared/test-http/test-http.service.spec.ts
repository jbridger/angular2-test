import {
    describe,
    expect,
    it,
    inject,
    beforeEachProviders
} from '@angular/core/testing';

import {provide} from '@angular/core';
import {HTTP_PROVIDERS, XHRBackend, ResponseOptions, Response, Headers} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing/mock_backend';

import {TestHttpService} from './test-http.service';

export function main() {
    describe('test http service', () => {

        // provide our implementations or mocks to the dependency injector
        beforeEachProviders(() => {
            return [
                HTTP_PROVIDERS,
                provide(XHRBackend, {useClass: MockBackend}),
                TestHttpService
            ];
        });

        it('should return valid when response is success',
            inject([XHRBackend, TestHttpService], (mockBackend: MockBackend, testHttpService: TestHttpService) => {

                mockBackend.connections.subscribe(
                    (connection: MockConnection) => {

                        var expectedHeaders = new Headers();
                        expectedHeaders.append('Content-Type', 'application/json');
                        expectedHeaders.append('Accept', 'application/json');
                        expect(connection.request.headers).toEqual(expectedHeaders);

                        connection.mockRespond(new Response(
                            new ResponseOptions({
                                    body: {'success': true}
                                }
                            )));
                    });
                testHttpService.validate('myUsername', 'myPassword').subscribe((valid: boolean) => {
                    expect(valid).toBeTruthy();
                });
            }));
    });
};
