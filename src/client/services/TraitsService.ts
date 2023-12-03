/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Trait } from '../models/Trait';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TraitsService {

    /**
     * Put Trait
     * @returns any Successful Response
     * @throws ApiError
     */
    public static putTrait({
        requestBody,
    }: {
        requestBody: Trait,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/trait/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get All Traits
     * @returns Trait Successful Response
     * @throws ApiError
     */
    public static getAllTraits(): CancelablePromise<Record<string, Trait>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/traits/',
        });
    }

    /**
     * Update Trait
     * @returns any Successful Response
     * @throws ApiError
     */
    public static updateTrait({
        id,
        requestBody,
    }: {
        id: number,
        requestBody: Trait,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/trait/{id}',
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
     * Delete Trait
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteTrait({
        id,
    }: {
        id: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/trait/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Filter Traits By Requirements
     * @returns Trait Successful Response
     * @throws ApiError
     */
    public static filterTraitsByRequirements({
        requirements,
    }: {
        /**
         * csv
         */
        requirements: string,
    }): CancelablePromise<Record<string, Trait>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/filtertraits/',
            query: {
                'requirements': requirements,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
