import axios from 'axios'

export async function deleteMethod(serverURL, url, id) {
  try {
    const response = await axios.delete(`${serverURL}${url}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    return response.data
  } catch (error) {
    console.error('Ошибка при удалении турнира:', error)

    if (error.response) {
      console.error('Статус:', error.response.status)
      console.error('Ответ сервера:', error.response.data)
    }

    throw error
  }
}
