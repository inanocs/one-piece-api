export interface SanitizerOpts {
  removeSpaces: boolean
  noBrackets: boolean
  specialChars: boolean
}

export const DEFAULT_SANITIZER_OPTIONS: SanitizerOpts = {
  removeSpaces: false,
  noBrackets: false,
  specialChars: false,
}

export function sanitize(
  text: string,
  opts = DEFAULT_SANITIZER_OPTIONS,
): string | null {
  const { removeSpaces, noBrackets, specialChars } = opts
  if (!text) {
    return null
  }
  if (removeSpaces) {
    text = replaceSpaces(text, ' ')
  }
  if (noBrackets) {
    text = removeNumberInBrackets(text)
  }

  if (specialChars) {
    text = removeSpecialCharacters(text)
  }
  return text.trim()
}

export function removeNumberInBrackets(text: string, replacer = ''): string {
  const REPLACER_REGEX = /\[\d+\]/gu
  return text.replace(REPLACER_REGEX, replacer)
}

export function replaceSpaces(text: string, replacer: string): string {
  const REPLACER_REGEX = /  +/g
  return text.replace(REPLACER_REGEX, replacer)
}

export function removeSpecialCharacters(text: string): string {
  const NORMALIZER = 'NFD'
  const REPLACER_REGEX = /\p{Diacritic}/gu
  return text.normalize(NORMALIZER).replace(REPLACER_REGEX, '')
}
