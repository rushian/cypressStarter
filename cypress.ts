import fs from 'fs';
import { EnvironmentConfigsModel } from './cypress/support/scripts/common/models/environment-configs.model';

export function SetupCypress(config: {
  environmentConfigs: Partial<EnvironmentConfigsModel>;
}): Promise<Partial<EnvironmentConfigsModel>> {
  return new Promise((resolve, reject): void => {
    // In the future, if you need to add other configuration promises, use Promise.all to merge them asynchronously.

    // eslint-disable-next-line @typescript-eslint/prefer-as-const
    const fileWriting: 'cypress.env.json' = 'cypress.env.json';

    const defaultConfigs: Partial<EnvironmentConfigsModel> = {
      grant_type: 'password',
      scope: 'authorization_api',
      ...config.environmentConfigs,
    };

    const error = `Error on writing configuration on the env file: ${fileWriting}`;

    if (fs.existsSync(fileWriting)) {
      fs.promises
        .writeFile(fileWriting, JSON.stringify(defaultConfigs))
        .then(() => resolve(defaultConfigs))
        .catch((error) => reject(error));
    } else {
      fs.writeFile(fileWriting, JSON.stringify(defaultConfigs), function (err) {
        if (err) reject(error);
        resolve(defaultConfigs);
      });
    }
  });
}
