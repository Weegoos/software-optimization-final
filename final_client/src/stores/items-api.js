import { defineStore } from 'pinia'
import { serverURL } from 'src/boot/config'
import { getMethod } from 'src/composables/api-method/get'

export const itemsApiStore = defineStore('items-api', {
  state: () => ({
    items: null,
  }),
  actions: {
    async getAllItems($q) {
      try {
        this.items = await getMethod(
          serverURL,
          `items/weak_find_all`,
          $q,
          'Информация об элементах получена',
        )
      } catch (error) {
        console.error(error)
      }
    },
  },
})
