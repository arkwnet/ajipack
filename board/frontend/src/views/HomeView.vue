<template>
  <div class="main">
    <h1 class="title">Ajipack Board</h1>
    <div class="post">
      <table>
        <tr>
          <th>名前</th>
          <td><input type="text" v-model="name" /></td>
        </tr>
        <tr>
          <th>メッセージ</th>
          <td>
            <textarea v-model="message"></textarea>
          </td>
        </tr>
        <tr>
          <th>ファイル</th>
          <td>
            <input type="file" @change="readFile" />
            <div id="file_message">対応フォーマット : Ajipack パッケージ (*.js)</div>
          </td>
        </tr>
      </table>
      <button class="submit" @click="post">投稿</button>
    </div>
    <div class="list">
      <div class="item" v-for="item in list">
        <p>
          名前: {{ item.name }} / 投稿日時: {{ new Date(item.timestamp * 1000) }}<br />
          {{ item.message }}
        </p>
        <p>
          <iframe :src="`${url}files/${item.id}.html`"></iframe>
        </p>
        <hr />
      </div>
    </div>
  </div>
</template>

<style>
.main {
  width: 1000px;
  margin: auto;
}

.main h1.title {
  margin-top: 24px;
  font-size: 28px;
  font-weight: bold;
  color: #757575;
}

.post {
  margin: 20px 0;
  padding: 20px;
  border: solid 2px #757575;
  border-radius: 10px;
}

.post th,
.post td {
  padding-bottom: 10px;
}

.post th {
  padding-right: 20px;
  text-align: left;
}

.post #file_message {
  margin-top: 5px;
  color: #757575;
}

.post .submit {
  margin: 10px 0;
  padding: 5px 15px;
}

.list {
  margin-top: 20px;
  margin-bottom: 40px;
}

.list hr {
  height: 1px;
  margin: 20px 0;
  background-color: #757575;
  border: 0;
}

.list p {
  margin-bottom: 10px;
}

.list iframe {
  width: 320px;
  height: 240px;
  border: solid 1px #757575;
}
</style>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'

const name = ref('')
const message = ref('')
const file = ref('')
const list = ref(new Array())
const url = ref('')

onMounted(() => {
  load()
  url.value = import.meta.env.VITE_BACKEND_URL
})

const post = async () => {
  const result = await axios.post(import.meta.env.VITE_BACKEND_URL + 'post.php', {
    params: { name: name.value, message: message.value, file: file.value }
  })
  if (result.data.status == false) {
    alert('投稿に失敗しました。')
  } else {
    name.value = ''
    message.value = ''
    load()
  }
}

const load = async () => {
  const result = await axios.get(import.meta.env.VITE_BACKEND_URL + 'get.php', {})
  list.value = result.data
}

const readFile = (e) => {
  const f = e.target.files[0]
  const reader = new FileReader()
  reader.onload = function () {
    file.value = reader.result
  }
  reader.readAsText(f)
}
</script>
