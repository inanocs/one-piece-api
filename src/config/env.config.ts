import { readFileSync } from 'fs'
import * as yaml from 'js-yaml'
import { join } from 'path'
import * as ejs from 'ejs'

const YAML_CONFIG_FILENAME = 'app.yaml'
const SRC_PATH = join(__dirname, '..')
const loadEnvYaml = (): string => {
  const yaml = readFileSync(
    join(SRC_PATH, YAML_CONFIG_FILENAME),
    'utf8',
  ) as string
  return ejs.render(yaml)
}

export default () => {
  const yamlConfig = loadEnvYaml()
  return yaml.load(yamlConfig) as Record<string, any>
}
