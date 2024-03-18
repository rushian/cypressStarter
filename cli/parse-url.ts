/* eslint-disable @typescript-eslint/no-unused-vars */
// noinspection JSJoinVariableDeclarationAndAssignment
import { CliOptions } from './create-options';

/**
 * A function to parse some Command Line Interface options, including a relative path, to return an absolut application path.
 * @param {string} options - CLI Options variables configuration.
 * @param {string} endPoint - an environment variable endpoint option.
 * @return - an absolute application path.
 * */
export function parseUrl(options: CliOptions, endPoint: string): string {
    let relative_url: any;

    const tenant: string = options.tenant,
        environment: string = options.environment;

    if (environment.includes('staging') || environment.includes('dev')) {
        relative_url = `https://${tenant}.google.${environment}.com`;
    } else {
        relative_url = `https://gmail.com`;
    }

    switch (endPoint) {
        case 'access_token':
            return `${relative_url}/connect/token`;
        case 'base':
            return `${relative_url}/`;
    }
}
