/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TemporaryService {

    /**
     * Root
     * @returns any Successful Response
     * @throws ApiError
     */
    public static root(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/',
        });
    }

    /**
     * Open Query
     * Takes in a raw SQL query.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static openQuery({
        query,
    }: {
        query: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/openquery',
            query: {
                'query': query,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
