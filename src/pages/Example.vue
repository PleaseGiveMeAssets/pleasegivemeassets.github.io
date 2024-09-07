<template>
    <div>

    </div>
</template>

<script setup>
import { reactive } from 'vue';
import axios from 'axios'

const BASE = '/api/example/list'
const example = reactive([])

const load = async () => {
    try {
        const response = await axios.get(BASE)

        Object.assign(example, response.data)

        console.log("Example.vue : ", example)
    } catch (err) {
        console.log("Example.vue : ", err.message)
    }
}
load()
</script>

<style lang="scss" scoped></style>