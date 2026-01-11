<template>
  <div class="q-ma-md">
    <q-btn rounded class="q-mb-md text-black" icon="mdi-plus" @click="confirm = true" />
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

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section>
          <p>Create New Item</p>
          <q-input placeholder="Name" dense outlined v-model="name" class="q-mt-sm" type="text" />
          <q-input
            placeholder="Price"
            dense
            outlined
            v-model="price"
            class="q-mt-sm"
            type="number"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Close" no-caps color="primary" @click="confirm = false" />
          <q-btn flat label="Create" no-caps color="primary" @click="createItem" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="isEditing" persistent>
      <q-card>
        <q-card-section>
          <p>Edit Item</p>
          <q-input placeholder="Name" dense outlined v-model="name" class="q-mt-sm" type="text" />
          <q-input
            placeholder="Price"
            dense
            outlined
            v-model="price"
            class="q-mt-sm"
            type="number"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Close" no-caps color="primary" @click="isEditing = false" />
          <q-btn flat label="Save" no-caps color="primary" @click="editItem" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { serverURL } from 'src/boot/config'
import { deleteMethod } from 'src/composables/api-method/delete'
import { patchMethod } from 'src/composables/api-method/patch'
import { postMethod } from 'src/composables/api-method/post'
import { itemsApiStore } from 'src/stores/items-api'
import { onMounted, ref } from 'vue'

const itemStore = itemsApiStore()
const $q = useQuasar()

const items = ref([])
const confirm = ref(false)
const isEditing = ref(false)
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

const itemId = ref(null)
const onEdit = async (row) => {
  console.log('Edit row:', row)
  isEditing.value = true
  name.value = row.name
  price.value = row.price
  itemId.value = row.id
}

const editItem = async () => {
  try {
    const payload = {
      name: name.value,
      price: price.value,
    }

    await patchMethod(
      serverURL,
      `items/weak_patch/${itemId.value}`,
      payload,
      $q,
      'Item updated successfully',
      {},
    )

    isEditing.value = false
    name.value = ''
    price.value = 0
    getItems()
  } catch (error) {
    console.log(error)
  }
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

const name = ref('')
const price = ref(0)
const createItem = async () => {
  try {
    const payload = {
      name: name.value,
      price: price.value,
    }
    await postMethod(serverURL, 'items/weak_create', payload, $q, 'Item created successfully')
    confirm.value = false
    name.value = ''
    price.value = 0
    getItems()
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getItems()
})
</script>
