export default () => {
  if(document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }
}
