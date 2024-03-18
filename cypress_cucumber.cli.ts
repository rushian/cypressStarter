// noinspection SpellCheckingInspection

import * as fs from 'fs';
import boxen, { Options } from 'boxen';
import chalk from 'chalk';
import moment from 'moment';
import { ChildProcess, exec } from 'child_process';
import { CliOptions, createOptions } from './cli/create-options';
import { parseUrl } from './cli/parse-url';
import internal, { PassThrough, Transform } from 'stream';
import { SetupCypress } from './cypress';

const options: CliOptions = createOptions();

SetupCypress({
    environmentConfigs: {
        environment: options.environment.toUpperCase(),
        default_timeout_requests: 5000,
    },
})
    .then((): void => {
        const boxenOptions: Options = {
            borderStyle: 'classic',
            borderColor: 'green',
            margin: 1,
            padding: 1,
        };

        // noinspection JSCheckFunctionSignatures
        const taGreeting: string = chalk.white.bold(
                'Cypress Automation Tests.'
            ),
            atGreetingBox: string = boxen(taGreeting, boxenOptions),
            initial: moment.Moment = moment(),
            date_initial: string = initial.format('DD/MM/YYYY HH:mm:ss'),
            user: string = options.user,
            password: string = options.password,
            url: string = parseUrl(options, 'base'),
            npmScript: string = options.script;

        process.env.CYPRESS_E2E_USER = user;
        process.env.CYPRESS_E2E_ENVIRONMENT = options.environment;
        process.env.CYPRESS_E2E_NPM_SCRIPT = npmScript;
        process.env.CYPRESS_E2E_VIDEO = options.video;

        /**
         * Define environment process variables
         */
        process.stdout.write(atGreetingBox + '\n');
        process.env.CYPRESS_E2E_PROJECT = 'Automation Tests';
        process.env.CYPRESS_E2E_REPORT_FOLDER =
            'REPORT_' + initial.format('DD-MM-YYYY_HH-mm-ss');
        process.env.CYPRESS_E2E_FRONTEND_URL = url;

        const dirPath: string = '.tmp/' + process.env.CYPRESS_E2E_REPORT_FOLDER;

        try {
            process.stdout.write(
                'Project: ' + process.env.CYPRESS_E2E_PROJECT + '\n'
            );
            process.stdout.write(`NPM script: ${npmScript}` + '\n');
            process.stdout.write(`Environment URL: ${url}` + '\n');
            process.stdout.write(
                `credentials - User: ${user} / Password: ${password
                    .split('')
                    .map((e: string, i: number, a: string[]): string =>
                        !(i < 1 || i > a.length - 2) ? '*' : e
                    )
                    .join('')}` + '\n'
            );
            process.stdout.write(`Execution start: ${date_initial}` + '\n');

            if (!fs.existsSync(`${dirPath}` + '/report')) {
                fs.mkdirSync(`${dirPath}` + '/report', { recursive: true });
            }

            const command = `npm run ${npmScript}`,
                env = { ...process.env };

            if (options.output === 'plain') env.NO_COLOR = '1';

            const bigCommand: ChildProcess = exec(command, { env });

            bigCommand.stdout.pipe(removeSpecialChars()).pipe(process.stdout);
            bigCommand.stderr.pipe(removeSpecialChars()).pipe(process.stderr);

            bigCommand.on(
                'exit',
                async (code: number, signal: NodeJS.Signals): Promise<void> => {
                    process.stdout.write('\n' + `Exit code: ${code}` + '\n\n');

                    if (code !== null) {
                        process.exit(code);
                    } else {
                        process.stdout.write('\n' + `Signal: ${signal}`);
                        process.exit(1);
                    }
                }
            );
        } catch (err) {
            console.error(
                '\nAutomation execution failed!\nCheck connectivity.\n'
            );
            console.error(err);
            process.exit(1);
        }

        function removeSpecialChars(): Transform {
            if (options.output === 'plain') {
                return new Transform({
                    transform(
                        chunk,
                        _encoding: BufferEncoding,
                        callback: internal.TransformCallback
                    ): void {
                        callback(null, strip(chunk));
                    },
                });
            }
            return new PassThrough();

            function strip(chunk: Buffer): string {
                return chunk
                    .toString('utf8')
                    .replace(/│/g, '|')
                    .replace(/[┌┐└┘├┤]/g, '+')
                    .replace(/─/g, '-')
                    .replace(/[√✔]/g, 'v')
                    .replace(/✖/g, 'x')
                    .replace(/…/g, '...');
            }
        }
    })
    .catch((error): void => {
        throw new Error(error);
    });
