import os from 'os';
import moment from 'moment/moment';
import report from 'multiple-cucumber-html-reporter';
import { initialDate } from '../cypress.config';


/**
 * A function to generate a useful HTML report.
 * It uses the Multiple Cucumber HTML Reporter module, parsing some JSON input to a beautiful report, including the following characteristics:
 * a quick overview of all tested features and scenarios, showing some pie graphics;
 * a features overview that can hold multiple runs of the same feature / runs of the same feature on different browsers / devices;
 * a features overview that can be searched / filtered / sorted;
 * a feature(s) overview with metadata of the used browser(s) / devices;
 * the environment/tenant/user used;
 * date/time/duration info data.
 * @link https://github.com/WasiqB/multiple-cucumber-html-reporter
 * */
export function generateReport(): void {
  const conclusion: moment.Moment = moment();

  const duration: moment.Moment = moment()
    .hours(0)
    .minutes(0)
    .seconds(0)
    .add(conclusion.diff(initialDate, 'seconds'), 'seconds');
  
  const dateInitial: string = moment(initialDate).format('DD/MM/YYYY HH:mm:ss');
  const dateConclusion: string = conclusion.format('DD/MM/YYYY HH:mm:ss');
  const totalDuration: string = duration.format('HH[h]mm[m]ss[s]');

  process.stdout.write('\n\n');
  process.stdout.write('Execution conclusion: ' + dateConclusion + '\n');
  process.stdout.write('Duration: ' + totalDuration);

  process.stdout.write('\n');

  const dirPath: string = './.tmp/' + process.env.CYPRESS_E2E_REPORT_FOLDER;

  const user: string = process.env.CYPRESS_E2E_USER,
    url: string = process.env.CYPRESS_E2E_FRONTEND_URL,
    environment: string = process.env.CYPRESS_E2E_ENVIRONMENT,
    npmScript: string = process.env.CYPRESS_E2E_NPM_SCRIPT;

  /**
   * Configures some report options.
   * @link https://github.com/WasiqB/multiple-cucumber-html-reporter#options
   * */
  const reportOptionsCucumber = {
    jsonDir: `${dirPath}`,
    reportPath: `${dirPath}` + '/report',
    reportName: 'Cypress Automation Execution Report',
    pageTitle: 'Cypress Automation Execution Report',
    automaticallyGenerateReport: true,
    openReportInBrowser: false,
    saveCollectedJSON: true,
    pageFooter: '<div><p> </p></div>',
    disableLog: false,
    displayDuration: true,
    displayReportTime: true,
    durationInMS: false,
    browserName: 'chrome',
    metadata: {
      device: process.env.USERNAME + '@' + os.hostname(),
      platform: {
        name: os.type(),
      },
      browser: {
        name: process.env.BROWSER_NAME,
        version: process.env.BROWSER_VERSION,
      },
    },
    customData: {
      title: 'Run info',
      data: [
        {
          label: 'Project',
          value: process.env.CYPRESS_E2E_PROJECT,
        },
        {
          label: 'Ambiente',
          value: environment,
        },
        {
          label: 'URL',
          value: url,
        },
        {
          label: 'NPM Script',
          value: npmScript,
        },
        {
          label: 'Execution start',
          value: dateInitial,
        },
        {
          label: 'Execution end',
          value: dateConclusion,
        },
        {
          label: 'Duration',
          value: totalDuration,
        },
      ],
    },
  };
  try {
    report.generate(reportOptionsCucumber);
  } catch (err) {
    console.error('\nAutomation execution failed!\nCheck connectivity.\n');
    console.error(err);
    process.exit(1);
  }
}
