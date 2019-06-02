<template lang="pug">
  .main
    q-sign-up(@sign-up="handleSignUp")
</template>

<script lang="ts">
  import QSignUp from '@/components/QSignUp/index.vue'
  import {SignUpPayload} from '@/store/modules/auth'
  import {
    Component, Prop, Vue,
  } from 'vue-property-decorator'
  import {namespace} from 'vuex-class'

  const auth = namespace('auth')

  @Component({
    components: {
      QSignUp,
    },
  })
  export default class SignUpPage extends Vue {
    @auth.Action signUp: (payload) => Promise<void>

    handleSignUp(payload) {
      console.log('sign-up')
      // empty
      this.signUp(payload).catch((error) => {
        console.log(error)
      })
    }
  }
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
