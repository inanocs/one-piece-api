import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = 'app.yaml';
const SRC_PATH = join(__dirname, '..');
export default () => {
  return yaml.load(
    readFileSync(join(SRC_PATH, YAML_CONFIG_FILENAME), 'utf8'),
  ) as Record<string, any>;
};
