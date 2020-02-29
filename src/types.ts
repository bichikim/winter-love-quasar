import Vue, {ComponentOptions, VueConstructor} from 'vue'
import VueRouter from 'vue-router'

/**
 * Quasar ssr Context
 */
export interface QSsrContext {
  req: {
    headers: Record<string, string>;
  };
  res: {
    setHeader(name: string, value: string): void;
  };
}

/**
 * Quasar boot function params
 * @link https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
 */
export interface BootFileParams
<TStore extends typeof Vue.prototype.$store  = typeof Vue.prototype.$store> {
  app: ComponentOptions<Vue>
  Vue: VueConstructor<Vue>;
  store: TStore;
  router: VueRouter;
  ssrContext?: QSsrContext | null;
}

/**
 * Quasar boot function type
 * boot Function in src/boot
 * @link https://quasar.dev/quasar-cli/cli-documentation/boot-files#Introduction
 */
export type BootFileFunction = (context: BootFileParams, options?: any) => Promise<any> | any
