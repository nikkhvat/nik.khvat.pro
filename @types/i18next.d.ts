/**
 * If you want to enable locale keys typechecking and enhance IDE experience.
 *
 * Requires `resolveJsonModule:true` in your tsconfig.json.
 *
 * @link https://www.i18next.com/overview/typescript
 */
import 'i18next'

import type common from '../public/locales/en/common.json'
import type admin from '../public/locales/en/common.json'
import type meta from '../public/locales/en/common.json'

interface I18nNamespaces {
  common: typeof common
  admin: typeof admin
  meta: typeof meta
}

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: I18nNamespaces
  }
}
