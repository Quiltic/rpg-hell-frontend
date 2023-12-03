/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Creature } from '../models/Creature';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CreaturesService {

    /**
     * Creature Search
     * This method will eventually support filtering all values. Not just name.
     * @returns Creature Successful Response
     * @throws ApiError
     */
    public static creatureSearch({
        name,
    }: {
        name: string,
    }): CancelablePromise<Creature> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/creature/',
            query: {
                'name': name,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Put Creature
     * @returns any Successful Response
     * @throws ApiError
     */
    public static putCreature({
        requestBody,
    }: {
        requestBody: Creature,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/creature/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Creature By Id
     * @returns Creature Successful Response
     * @throws ApiError
     */
    public static getCreatureById({
        id,
    }: {
        id: number,
    }): CancelablePromise<Creature> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/creature/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Creature
     * @returns any Successful Response
     * @throws ApiError
     */
    public static updateCreature({
        id,
        requestBody,
    }: {
        id: number,
        requestBody: Creature,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/creature/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Creature
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteCreature({
        id,
    }: {
        id: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/creature/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
