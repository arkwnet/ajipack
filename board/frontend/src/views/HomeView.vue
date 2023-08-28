<template>
  <div class="main">
    <h1 class="title">Ajipack Board</h1>
    <div class="post">
      <table>
        <tr>
          <th>名前</th>
          <td><input type="text" id="input_name" v-model="name" /></td>
        </tr>
        <tr>
          <th>メッセージ</th>
          <td>
            <textarea id="input_message" v-model="message"></textarea>
          </td>
        </tr>
        <tr>
          <th>ファイル</th>
          <td>
            <input type="file" id="input_file" @change="readFile" />
            <div id="file_message">
              対応フォーマット : Ajipack パッケージ (*.js) / 画像ファイル (*.jpg, png)
            </div>
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
    if (f.type == 'application/x-javascript') {
      file.value = reader.result
    } else if (f.type == 'image/jpeg' || f.type == 'image/png') {
      file.value = `const ajiData = [
  {
    id: "image",
    data: "${reader.result}",
  },
];

async function setup() {
  await ajiAddSprite("image", "image");
  const image = ajiGetSprite("image");
  const w = image.width;
  const h = image.height;
  let ratio = 1.0;
  if (w < h) {
    ratio = 240 / h;
  } else {
    ratio = 320 / w;
  }
  ajiDrawSpriteZoom(
    "image",
    160 - (w * ratio) / 2,
    120 - (h * ratio) / 2,
    w * ratio,
    h * ratio
  );
}

function loop() {
  if (ajiClick() == true) {
    window.open(ajiGetData("image"));
  }
}`
    }
  }
  if (f.type == 'application/x-javascript') {
    reader.readAsText(f)
  } else {
    reader.readAsDataURL(f)
  }
}
</script>

<style lang="scss">
@import url(../assets/HomeView.scss);
</style>
