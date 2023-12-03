/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ObjectsService {

    /**
     * Object Search
     * This method will eventually support filtering all values. Not just name.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static objectSearch({
        name,
    }: {
        name: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/object/',
            query: {
                'name': name,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Object By Id
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getObjectById({
        id,
    }: {
        id: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/object/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
