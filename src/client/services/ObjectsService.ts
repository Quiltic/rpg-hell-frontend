/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Item } from '../models/Item';
import type { Trait } from '../models/Trait';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ObjectsService {

    /**
     * Object Search
     * @returns any Successful Response
     * @throws ApiError
     */
    public static objectSearch({
        name,
    }: {
        name: string,
    }): CancelablePromise<(Trait | Item)> {
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
    }): CancelablePromise<(Trait | Item)> {
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
