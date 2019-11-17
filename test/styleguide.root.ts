import boot from './boot'

export default (previewComponent) => {
  const {app} = boot()

  return {
    ...app,
    render(h) {
      return h(previewComponent)
    },
  }
}
