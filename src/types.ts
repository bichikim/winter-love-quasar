import {BootFileParams} from 'quasar'
import Vue, {ComponentOptions} from 'vue'

export interface BootContext extends Omit<BootFileParams, 'app'>{
  app: ComponentOptions<Vue>
}

export type BootFileFunction = (context: BootContext, options?: any) => Promise<any> | any
