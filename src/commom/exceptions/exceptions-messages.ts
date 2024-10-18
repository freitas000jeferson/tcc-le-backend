// import { HttpStatus } from '@nestjs/common';

// export const ExceptionMessages = {
//   /**
//    *
//    * @param resource
//    * @returns {
//    * message: `${resource}-not-found`,
//    * status: HttpStatus.NOT_FOUND
//    * }
//    */
//   NOT_FOUND: (resource: string) => ({
//     message: `${resource}-not-found`,
//     status: HttpStatus.NOT_FOUND,
//   }),

//   /**
//    *
//    * @param resource
//    * @returns {
//    * message: `${param}-already-registered`,
//    * status: HttpStatus.CONFLICT
//    * }
//    */
//   ALREADY_EXIST: (param: string) => ({
//     message: `${param}-already-registered`,
//     status: HttpStatus.CONFLICT,
//   }),

//   /**
//    *
//    * @param resource
//    * @returns {
//    * message: 'invalid-fields',
//    * status: HttpStatus.BAD_REQUEST
//    * }
//    */
//   INVALID_FIELDS: () => ({
//     message: 'invalid-fields',
//     status: HttpStatus.BAD_REQUEST,
//   }),

//   /**
//    *
//    * @param resource
//    * @returns {
//    * message: 'invalid-password',
//    * status: HttpStatus.UNAUTHORIZED
//    * }
//    */
//   INVALID_PASSWORD: () => ({
//     message: 'invalid-password',
//     status: HttpStatus.UNAUTHORIZED,
//   }),

//   /**
//    *
//    * @param resource
//    * @returns {
//    * message: 'expired-token',
//    * status: HttpStatus.UNAUTHORIZED
//    * }
//    */
//   EXPIRED_TOKEN: () => ({
//     message: 'expired-token',
//     status: HttpStatus.UNAUTHORIZED,
//   }),

//   /**
//    *
//    * @param resource
//    * @returns {
//    * message: 'invalid-token',
//    * status: HttpStatus.UNAUTHORIZED
//    * }
//    */
//   INVALID_TOKEN: () => ({
//     message: 'invalid-token',
//     status: HttpStatus.UNAUTHORIZED,
//   }),

//   /**
//    *
//    * @param resource
//    * @returns {
//    * message: 'missing-token',
//    * status: HttpStatus.UNAUTHORIZED
//    * }
//    */
//   MISSING_TOKEN: () => ({
//     message: 'missing-token',
//     status: HttpStatus.UNAUTHORIZED,
//   }),

//   /**
//    *
//    * @param resource
//    * @returns {
//    * message: `${resource}-invalid-resource`,
//    * status: HttpStatus.FORBIDDEN
//    * }
//    */
//   INVALID_RESOURCE: (resource: string) => ({
//     message: `${resource}-invalid-resource`,
//     status: HttpStatus.FORBIDDEN,
//   }),

//   /**
//    *
//    * @param resource
//    * @returns {
//    * message: 'invalid-authorization-format',
//    * status: HttpStatus.UNAUTHORIZED
//    * }
//    */
//   INVALID_AUTH_FORMAT: () => ({
//     message: 'invalid-authorization-format',
//     status: HttpStatus.UNAUTHORIZED,
//   }),

//   /**
//    *
//    * @param resource
//    * @returns {
//    * message: 'missing-authorization-header',
//    * status: HttpStatus.UNAUTHORIZED
//    * }
//    */
//   AUTH_MISSING: () => ({
//     message: 'missing-authorization-header',
//     status: HttpStatus.UNAUTHORIZED,
//   }),

//   /**
//    *
//    * @param resource
//    * @returns {
//    * message: 'internal-server-error',
//    * status: HttpStatus.INTERNAL_SERVER_ERROR
//    * }
//    */
//   INTERNAL_ERROR: () => ({
//     message: 'internal-server-error',
//     status: HttpStatus.INTERNAL_SERVER_ERROR,
//   }),

//   /**
//    *
//    * @param resource
//    * @returns {
//    * message: 'bad-request',
//    * status: HttpStatus.BAD_REQUEST
//    * }
//    */
//   BAD_REQUEST: () => ({
//     message: 'bad-request',
//     status: HttpStatus.BAD_REQUEST,
//   }),
// };
