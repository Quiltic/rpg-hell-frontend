/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Spell } from '../models/Spell';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SpellsService {

    /**
     * Spell Search
     * This method will eventually support filtering all values. Not just name.
     * @returns Spell Successful Response
     * @throws ApiError
     */
    public static spellSearch({
        name,
    }: {
        name: string,
    }): CancelablePromise<Spell> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/spell/',
            query: {
                'name': name,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Put Spell
     * @returns any Successful Response
     * @throws ApiError
     */
    public static putSpell({
        requestBody,
    }: {
        requestBody: Spell,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/spell/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get All Spells
     * @returns Spell Successful Response
     * @throws ApiError
     */
    public static getAllSpells(): CancelablePromise<Record<string, Spell>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/spells/',
        });
    }

    /**
     * Get Spell By Id
     * @returns Spell Successful Response
     * @throws ApiError
     */
    public static getSpellById({
        id,
    }: {
        id: number,
    }): CancelablePromise<Spell> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/spell/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Spell
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteSpell({
        id,
    }: {
        id: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/spell/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Spell
     * @returns any Successful Response
     * @throws ApiError
     */
    public static updateSpell({
        name,
        requestBody,
    }: {
        name: string,
        requestBody: Spell,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/spell/{name}',
            path: {
                'name': name,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Filter Spells By Tags
     * @returns Spell Successful Response
     * @throws ApiError
     */
    public static filterSpellsByTags({
        tags,
    }: {
        /**
         * csv
         */
        tags: string,
    }): CancelablePromise<Record<string, Spell>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/filterspells/',
            query: {
                'tags': tags,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
