import { Injectable, Logger } from '@nestjs/common'
import { Scraper } from './scraper'
import { JSDOM } from 'jsdom'
import { StatusCodes } from 'http-status-codes'
import { SanitizerOpts, sanitize } from 'src/util/string.sanitizer'

@Injectable()
export default class AsideJSDomScraper extends Scraper {
  html: Element[]
  logger = new Logger(AsideJSDomScraper.name)
  async readHtml(url: string, selector: string): Promise<void> {
    const req = await fetch(url)
    this.logger.log(`Request completed with status ${req.status}`)
    if (req.status === StatusCodes.NOT_FOUND) {
      throw new Error('Pirate not found')
    }
    const htmlText = await req.text()
    this.html = [
      ...new JSDOM(htmlText, {
        runScripts: 'outside-only',
      }).window.document.body.querySelectorAll(selector),
    ]
  }
  getValueForLabel(selector: string, opts: SanitizerOpts): string {
    const labelNameSanityOpts: SanitizerOpts = {
      noBrackets: true,
      removeSpaces: true,
      specialChars: true,
    }
    const node = this.html.find((item) => {
      this.logger.debug(
        `GOT textContent ${sanitize(item.textContent, labelNameSanityOpts)}`,
      )
      return (
        sanitize(item.textContent, labelNameSanityOpts).toLowerCase() ===
        sanitize(selector, labelNameSanityOpts).toLowerCase()
      )
    })
    return sanitize(node?.nextElementSibling?.textContent, opts) || null
  }
  getNumberValueForLabel(selector: string, opts: SanitizerOpts): number {
    return (this.getValueForLabel(selector, opts) as unknown as number) || null
  }
  getListValuesForLabel(
    selector: string,
    opts: SanitizerOpts,
    delimiter: string,
  ): string[] {
    return this.getValueForLabel(selector, opts)?.split(delimiter)
  }
  getListNumberValuesForLabel(
    selector: string,
    opts: SanitizerOpts,
    delimiter: string,
  ): number[] {
    return this.getValueForLabel(selector, opts)
      ?.split(delimiter)
      .map((item) => item as unknown as number)
  }
}
