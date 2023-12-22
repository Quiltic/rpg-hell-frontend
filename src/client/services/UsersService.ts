/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DBUser } from '../models/DBUser';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UsersService {

    /**
     * Login
     * @returns any Successful Response
     * @throws ApiError
     */
    public static login(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/login',
        });
    }

    /**
     * Logout
     * @returns any Successful Response
     * @throws ApiError
     */
    public static logout(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/logout',
        });
    }

    /**
     * Callback
     * @returns any Successful Response
     * @throws ApiError
     */
    public static callback({
        code,
    }: {
        code: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/discord/callback',
            query: {
                'code': code,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Refresh
     * @returns any Successful Response
     * @throws ApiError
     */
    public static refresh(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/refresh',
        });
    }

    /**
     * Get Discord User
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getDiscordUser(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user',
        });
    }

    /**
     * Get Or Create Database User
     * @returns DBUser Successful Response
     * @throws ApiError
     */
    public static getOrCreateDatabaseUser(): CancelablePromise<DBUser> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/me',
        });
    }

}
