<template>
  <div class="q-ma-md" >
    <q-btn rounded class="q-mb-md text-black" icon="mdi-plus"  @click="openDialog" />
    <q-table title="Items List" :rows="items" :columns="columns" row-key="name">
      <!-- столбец с кнопкой -->
      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn-dropdown @click.stop color="primary">
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-btn
                    class="bg-blue-500 hover:bg-blue-600 text-white"
                    icon="mdi-pencil"
                    size="sm"
                    @click="onEdit(props.row)"
                  />
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-btn
                    class="bg-rose-500 hover:bg-rose-600 text-white"
                    icon="mdi-delete"
                    size="sm"
                    @click="onDelete(props.row)"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { serverURL } from 'src/boot/config'
import { deleteMethod } from 'src/composables/api-method/delete'
import { itemsApiStore } from 'src/stores/items-api'
import { onMounted, ref } from 'vue'

const itemStore = itemsApiStore()
const $q = useQuasar()

const items = ref([])
const columns = [
  {
    name: 'name',
    label: 'Name',
    field: 'name',
    align: 'left',
    sortable: true,
  },
  {
    name: 'price',
    label: 'Price',
    field: 'price',
    align: 'left',
    sortable: true,
  },
  {
    name: 'actions',
    label: 'Actions',
    field: 'actions',
    align: 'center',
  },
]

const getItems = async () => {
  try {
    await itemStore.getAllItems($q)
    items.value = itemStore.items
    console.log(items.value)
  } catch (error) {
    console.log(error)
  }
}

const onEdit = (row) => {
  console.log('Edit row:', row)
  // здесь можешь открыть диалог, роутер и т.д.
}

const openDialog = () => {
  console.log('Open create item dialog')
  // здесь можешь открыть диалог для создания нового элемента
}

const onDelete = async (row) => {
  try {
    console.log('Deleted row:', row)
    await deleteMethod(serverURL, 'items/weak_destroy', row.id)
    getItems()
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getItems()
})
</script>
