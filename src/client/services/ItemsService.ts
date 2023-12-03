/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FilterOption } from '../models/FilterOption';
import type { Item } from '../models/Item';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ItemsService {

    /**
     * Put Item
     * @returns any Successful Response
     * @throws ApiError
     */
    public static putItem({
        requestBody,
    }: {
        requestBody: Item,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/item/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get All Items
     * @returns Item Successful Response
     * @throws ApiError
     */
    public static getAllItems(): CancelablePromise<Record<string, Item>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/items/',
        });
    }

    /**
     * Update Item
     * @returns any Successful Response
     * @throws ApiError
     */
    public static updateItem({
        id,
        requestBody,
    }: {
        id: number,
        requestBody: Item,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/item/{id}',
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
     * Delete Item
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteItem({
        id,
    }: {
        id: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/item/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Filter Items By Tags Or Requirements
     * @returns Item Successful Response
     * @throws ApiError
     */
    public static filterItemsByTagsOrRequirements({
        option,
        filters,
    }: {
        /**
         *  0 = tags, 1 = requirements
         */
        option: FilterOption,
        /**
         * csv
         */
        filters: string,
    }): CancelablePromise<Record<string, Item>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/filteritems/{option}',
            path: {
                'option': option,
            },
            query: {
                'filters': filters,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
