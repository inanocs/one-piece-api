import { Logger } from '@nestjs/common'
import { SanitizerOpts } from 'src/util/string.sanitizer'
export const SCRAPER_REPOSITORY_PROVIDER = 'SCRAPER'
export abstract class Scraper {
  logger: Logger
  html: unknown
  public abstract readHtml(url: string, selector: string): Promise<void>
  public abstract getValueForLabel(
    selector: string,
    opts: SanitizerOpts,
  ): string | null
  public abstract getNumberValueForLabel(
    selector: string,
    opts: SanitizerOpts,
  ): number | null
  public abstract getListValuesForLabel(
    selector: string,
    opts: SanitizerOpts,
    delimiter: string,
  ): string[] | null
  public abstract getListNumberValuesForLabel(
    selector: string,
    opts: SanitizerOpts,
    delimiter: string,
  ): number[] | null
}
