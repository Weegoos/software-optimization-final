// src/composables/api-method/patch.js
import axios from 'axios'
import { successMessage } from '../notify/successMessage'
import { Cookies } from 'quasar'

export async function patchMethod(
  serverURL,
  url,
  variableRefOrData,
  $q,
  notifyMessage = 'Данные успешно обновлены',
  params = {},
) {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${Cookies.get('access_token')}`,
    }

    const config = {
      headers,
      params,
      withCredentials: true,
    }

    const data =
      variableRefOrData && typeof variableRefOrData === 'object' && 'value' in variableRefOrData
        ? variableRefOrData.value
        : variableRefOrData

    const response =
      data !== undefined
        ? await axios.patch(`${serverURL}${url}`, data, config)
        : await axios.patch(`${serverURL}${url}`, {}, config)

    console.log('Ответ сервера:', response.data)
    successMessage($q, notifyMessage)
    return response.data
  } catch (error) {
    console.error('Ошибка при частичном обновлении:', error)
    console.error('Детали ошибки:', error.response?.data)
    throw error
  } finally {
    $q.loading.hide()
  }
}
