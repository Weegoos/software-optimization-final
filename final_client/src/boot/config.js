export const mobileWidth = 1050
export const serverURL = 'https://software-optimization-final.onrender.com/'
export default ({ app }) => {
  app.config.globalProperties.$mobileWidth = mobileWidth
  app.config.globalProperties.$serverURL = serverURL
}
