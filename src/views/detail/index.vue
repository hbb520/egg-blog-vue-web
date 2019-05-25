<template>
  <div id="detail-container">
    <div class="article-left">
      <div class="page-top-box Card">
        <div class="avatar">
          <img :src="imgR +DetailData.avator" alt="">
        </div>
        <div>
          <strong> {{DetailData.nickname}}</strong>
        </div>
        <div>
          {{DetailData.updateTime}}发布  查看 {{ DetailData.page_view}} 回复 {{ DetailData.comments}}
          <Tag color="purple" style="margin-left: 10px">{{DetailData.category.name}}</Tag>
          <span class="page-top-box-edilbtn" @click="deleteArticle(DetailData.id)"
                v-if="DetailData.uid == 1 && loading"
          >删除</span>
          <span class="page-top-box-edilbtn" @click="goLink(DetailData.id)"
                v-if="DetailData.uid == $Cookies.get('userId') && loading"
          >编辑</span>

          <span class="page-top-box-edilbtn" @click="recommend(DetailData.id)"
                v-if=" DetailData.uid == 1 && loading && DetailData.is_recommend == 0"
          >推荐</span>
          <span class="page-top-box-edilbtn" @click="cancelRecommend(DetailData.id)"
                v-if=" DetailData.uid == 1 && loading && DetailData.is_recommend == 1"
          >取消推荐</span>
        </div>


      </div>
      <div class="DetailData-box Card">

        <h2 class="title">{{DetailData.title}}</h2>
        <div v-html="DetailData.content" class="DetailData-content">

        </div>
      </div>
      <div class="comment-box  Card" style="margin-top: 10px;margin-bottom: 10px">
        <ul class="">
          <li class=" comment-box-li" style="padding: 10px 20px">
            <h4 style="color: #000">全部评论</h4>
          </li>
          <li v-for="item in list" class=" comment-box-li">
            <div class="avatar">
              <img :src="imgR+item.avator" alt="">
            </div>
            <div class="">
              <Tag color="green">{{item.nickname}}</Tag>
            </div>
            <div class="Content">
              <div class="desc" v-html="item.content">
              </div>
            </div>
            <div class="time">
              {{item.updateTime}}
            </div>
          </li>
        </ul>
        <div class="page-box ">
          <Page :total="total" show-elevator :current="currentPage" :page-size="20" show-total
                @on-change="handleCurrentChange"/>
        </div>
      </div>
      <div class="editor-box  Card" style="margin-top: 10px;margin-bottom: 100px">
        <div class="editor-box">
          <VueUEditor @ready="editorReady" style="width: 100%" :ueditorConfig="config"
          ></VueUEditor>
          <Upload
            multiple
            :show-upload-list="false"
            :on-error="onError"
            :on-success="uploadImageSuccess"
            action="http://47.99.113.195:3000/api/upload">
            <Button size="small" type="primary" class="ivu-btn1">上传图片</Button>
          </Upload>
        </div>
        <div style="text-align: right;padding: 20px 10px 20px 10px;">
          <Button type="primary" @click="comment()">回复</Button>
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
