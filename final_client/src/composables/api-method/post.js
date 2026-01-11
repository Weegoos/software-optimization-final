import axios from 'axios'
import { errorMessage } from '../notify/errorMessage'
import { successMessage } from '../notify/successMessage'

export async function postMethod(serverURL, url, data, $q, successMsg) {
  try {
    const response = await axios.post(`${serverURL}${url}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    successMessage($q, successMsg)
    return response.data
  } catch (error) {
    if (error.response) {
      console.error('Ошибка:', error.response.data)
      errorMessage($q, `Ошибка: ${error.response.data.message || error}`)
    } else {
      console.error('Ошибка:', error.message)
      errorMessage($q, `Ошибка: ${error.message}`)
    }
  } finally {
    $q.loading.hide()
  }
}
