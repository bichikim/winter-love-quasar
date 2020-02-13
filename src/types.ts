import {BootFileParams} from 'quasar'
import Vue, {ComponentOptions} from 'vue'

/**
 * Quasar boot function context
 * @link https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
 */
export interface BootContext extends Omit<BootFileParams, 'app'>{
  app: ComponentOptions<Vue>
}

/**
 * Quasar boot function type
 * boot Function in src/boot
 * @link https://quasar.dev/quasar-cli/cli-documentation/boot-files#Introduction
 */
export type BootFileFunction = (context: BootContext, options?: any) => Promise<any> | any
