<template lang="pug">
  .main
    q-sign-in(@sign-in="onSignIn")
</template>

<script lang="ts">
  import QSignIn from '@/components/QSignIn/index.vue'
  import {Component, Vue} from 'vue-property-decorator'
  import {namespace} from 'vuex-class'

  const auth = namespace('auth')

  @Component({
    components: {
      QSignIn,
    },
  })
  export default class SignInPage extends Vue {
    @auth.Action signIn: (payload) => Promise<void>

    onSignIn(payload) {
      this.signIn(payload).catch((error) => {
        console.log(error)
      })
    }
  }
</script>

<style lang="stylus" scoped>
  .main
    display flex
</style>
