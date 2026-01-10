export const mobileWidth = 1050
export const serverURL = 'http://localhost:3000/'
export default ({ app }) => {
  app.config.globalProperties.$mobileWidth = mobileWidth
  app.config.globalProperties.$serverURL = serverURL
}

// http://localhost:3000/
// https://software-optimization-final.onrender.com/
