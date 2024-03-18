import * as preprocessorConfig from './cypress-cucumber-preprocessor.config';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { defineConfig } from 'cypress';
import { Formatter } from 'cucumber-json-report-formatter';
import { generateReport } from './cli/generate-report';
import { typecheckPlugin } from '@jgoz/esbuild-plugin-typecheck';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild';
import fs from 'fs';
import moment from 'moment/moment';

export const initialDate: moment.Moment = moment();

type VideoCapture = {
    videoCompressionValue: any;
    videoCapture: boolean;
};

function setVideoCaptureValue(): VideoCapture {
    const videoCaptureValue: string = process.env.CYPRESS_E2E_VIDEO;

    if (videoCaptureValue === 'never') {
        return {
            videoCompressionValue: false,
            videoCapture: false,
        };
    }

    return {
        videoCompressionValue: 32,
        videoCapture: ['always', 'failure'].includes(videoCaptureValue),
    };
}

const { videoCapture, videoCompressionValue } = setVideoCaptureValue();

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
    projectId: 'proj01',
    chromeWebSecurity: false,
    env: {
        TAGS: 'not @bug and not @dev and not @fixme and not @ignore and not @skip',
        CYPRESS_CLEAR_CACHE: 1,
    },
    viewportWidth: 1366,
    viewportHeight: 768,
    defaultCommandTimeout: 5000,
    video: videoCapture,
    videoCompression: videoCompressionValue,
    screenshotOnRunFailure: true,
    numTestsKeptInMemory: 2,
    experimentalMemoryManagement: true,
    retries: {
        runMode: 1,
        openMode: 0,
    },

    e2e: {
        specPattern: 'cypress/e2e/**/*.{feature,ts}',
        screenshotsFolder: 'cypress/screenshots',
        video: true,
        videosFolder: 'cypress/videos',
        defaultCommandTimeout: 5000,
        baseUrl: 'https://blazedemo.com',
        watchForFileChanges: true,
        async setupNodeEvents(
            on: Cypress.PluginEvents,
            config: Cypress.PluginConfigOptions
        ): Promise<Cypress.PluginConfigOptions> {
            await addCucumberPreprocessorPlugin(on, config);

            on(
                'file:preprocessor',
                createBundler({
                    plugins: [typecheckPlugin(), createEsbuildPlugin(config)],
                })
            );

            on('before:browser:launch', (browser, launchOptions) => {
                if (browser.name === 'chrome') {
                    // Disabling Chrome's cache.
                    launchOptions.args.push('--disable-web-security');
                    launchOptions.args.push('--disk-cache-size=0');
                    launchOptions.args.push('--disable-site-isolation-trials');
                }
                return launchOptions;
            });

            on('before:run', async (results: any): Promise<void> => {
                process.env.BROWSER_NAME = results.browser.name;
                process.env.BROWSER_VERSION = results.browser.version;
            });

            on('after:run', async ({ runs }: any): Promise<void> => {
                // Remove video files of on passing scenarios
                const videoCaptureValue: string = process.env.CYPRESS_E2E_VIDEO;
                if (runs?.length && videoCaptureValue === 'failure') {
                    for (const run of runs) {
                        if (!run?.tests?.length) continue;
                        const failures = run.tests.some(
                            (test: { attempts: any[] }) =>
                                test.attempts.some(
                                    (attempt): boolean =>
                                        attempt.state === 'failed'
                                )
                        );
                        if (!failures) {
                            fs.unlinkSync(run.video);
                        }
                    }
                }

                // Generate json and html report files
                if (!preprocessorConfig.cucumberJson.generate) return;
                const formatter: Formatter = new Formatter();
                const output: string = preprocessorConfig.messages.output;
                const outputFolder: string =
                    preprocessorConfig.cucumberJson.outputFolder;
                const outputFile: string =
                    preprocessorConfig.cucumberJson.outputFile;
                await formatter
                    .parseCucumberJson(output, `${outputFolder}/${outputFile}`)
                    .then(() => generateReport());
            });
            return config;
        },
    },
});
