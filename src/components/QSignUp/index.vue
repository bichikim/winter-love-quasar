<template lang="pug">
  .column
    q-form(@submit="handleSignUp")
      q-input(:label="labels.email" v-model="nativeEmail")
      q-input(:label="labels.password" v-model="password")
      q-btn(:label="labels.signUp" type="submit")
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator'
import {Labels} from './types'

const DEFAULT_LABELS: Labels = {
  signUp: 'sign-up',
  email: 'email',
  password: 'password',
}

@Component
export default class QSignUp extends Vue {
  @Prop() email: string
  @Prop({default: () => (DEFAULT_LABELS)}) labels: Labels

  nativeEmail: string = ''
  password: string = ''

  @Watch('email')
  watchEmail(value) {
    this.nativeEmail = value
  }

  handleSignUp() {
    this.$emit('sign-up', {
      email: this.nativeEmail,
      password: this.password,
    })
  }
}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
