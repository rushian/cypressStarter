import yargs from 'yargs';

export interface CliOptions {
    script: string;
    tenant: string;
    environment: string;
    user: string;
    password: string;
    video: string;
    output: 'full' | 'plain';
}

/**
 * A function to build an interactive command line tool, by parsing arguments and generating an elegant user interface,
 * It uses: commands and (grouped) options;
 * a dynamically generated help menu based on some arguments;
 * bash-completion shortcuts for commands and options.
 * These arguments are used through all automation scripts.
 * @link https://github.com/yargs/yargs
 * */
export function createOptions(): CliOptions {
    return yargs
        .usage(
            'Usage: ts-node cypress_cucumber.cli.ts -s all [-t teanant] [-e environment] [-u usuario@gmail.com] [-p password]'
        )
        .env('E2E_ENVIRONMENT')
        .option('script', {
            alias: 's',
            describe: 'NPM script to be executed. E.G.: all|cy|debug',
            type: 'string',
            demandOption: true,
        })
        .option('tenant', {
            alias: 't',
            describe: 'The Tenant of the environment. E.G.: smoke',
            type: 'string',
            default: '',
            demandOption: false,
        })
        .option('environment', {
            alias: 'e',
            choices: ['dev', 'staging', 'production', 'www'],
            describe:
                'The Environment of the application. E.G.: dev|staging|production',
            type: 'string',
            default: 'www',
            demandOption: false,
        })
        .option('user', {
            alias: 'u',
            describe: 'A user. E.G.: user@gmail.com',
            type: 'string',
            default: 'user@gmail.com',
            demandOption: false,
        })
        .option('password', {
            alias: 'p',
            describe:
                'An application user password. Case it begins with some special characters, must be informed in the quote unquote format (please note that some special characters, such as ! and $ are not allowed/supported). E.G.: "PassWord"',
            type: 'string',
            default: 'password',
            demandOption: false,
        })
        .option('client_id', {
            alias: 'i',
            describe: 'A client_id. E.G.: user@gmail.com',
            type: 'string',
            default: 'user@gmail.com',
            demandOption: false,
        })
        .option('client_secret', {
            alias: 'n',
            describe: 'A client_secret. E.G.: "Password"',
            type: 'string',
            default: 'password',
            demandOption: false,
        })
        .option('video', {
            alias: 'v',
            describe:
                'Sets the video recording function behavior, between always generating a video; only on failed scenarios; or never doing this. E.G.: always|failure|never',
            choices: ['always', 'failure', 'never'],
            type: 'string',
            default: 'failure',
            demandOption: false,
        })
        .option('output', {
            describe: 'Console output type.',
            choices: ['full', 'plain'],
            default: 'full' as CliOptions['output'],
            demandOption: false,
        }).argv;
}
