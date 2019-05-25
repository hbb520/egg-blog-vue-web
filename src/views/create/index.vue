<template>
  <div id="create-container">
    <div class="article-left">
      <div class="Card ">
        <Input v-model="title" placeholder="请输入标题(最多50字)" style="width: 100%"/>
        <div class="Tag-box">
          <RadioGroup v-model="categoryId">
            <Radio :label="item.id"  v-for="(item,index) in TagList" :key="index"> {{item.name}}</Radio>
          </RadioGroup>
        </div>
        <div class="editor-box">
          <VueUEditor @ready="editorReady" style="width: 100%" :ueditorConfig="config"
          ></VueUEditor>
          <Upload
            multiple
            :show-upload-list="false"
            :on-error="onError"
            :on-success="uploadImageSuccess"
            :action="'http://47.99.113.195:3000/api/upload'">
            <Button size="small" type="primary">上传图片</Button>
          </Upload>
        </div>
        <div class="sendMessage-box" style="margin-top: 20px">
          <Button type="primary" @click="create()" v-if="createPage">发布</Button>
          <Button type="primary" @click="edit()" v-else>确认修改并发布</Button>

        </div>

      </div>

    </div>
    <div class="article-right">
      <article-right></article-right>
    </div>
  </div>
</template>

<script>
  import index from  './index.js'
  export default index
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "index";
</style>
