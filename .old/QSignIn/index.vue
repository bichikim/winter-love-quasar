<template lang="pug">
  .column
    q-form(@submit="handleSignIn")
      q-input(v-model="nativeEmail" :label="labels.email")
      q-input(v-model="password" :label="labels.password")
      q-btn(:label="labels.signIn" type="submit")
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator'

const DEFAULT_LABELS = {
  signIn: 'Sign-in',
  email: 'email',
  password: 'password',
}

@Component
export default class QSignIn extends Vue {

  @Prop({default: () => (DEFAULT_LABELS)}) labels

  nativeEmail: string = ''
  password: string = ''

  handleSignIn() {
    this.$emit('sign-in', {email: this.nativeEmail, password: this.password})
  }
}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
