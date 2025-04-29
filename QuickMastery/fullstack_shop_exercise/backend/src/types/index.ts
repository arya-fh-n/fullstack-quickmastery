/**
 * Interface to represent a product
 * @interface ProductType
 * @property {Date} createdAt - The date when the product was created.
 * @property {Date} updatedAt - The date when the product was last updated.
 */
export interface ProductType {
    id: number;
    name: string;
    price: number;
    category: string;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Interface to represent environment variables
 * @interface EnvVars
 * @property {string} DB_HOST - The database host.
 * @property {number} DB_PORT - The database port.
 * @property {string} DB_USER - The database user.
 *  @property {string} DB_PASSWORD - The database password.
 * @property {string} DB_NAME - The database name.
 * @property {number} PORT - The server port number.
 */
export interface EnvVars {
    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    PORT: number;
}