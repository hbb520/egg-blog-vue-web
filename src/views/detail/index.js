import {
  comment,
  commentPage,
  commentRemove,
  getDetail,
  postCancelRecommend,
  postRecommend,
  postsRemove
} from '@/api/user';
import ArticleRight from '@/views/components/article-right/index.vue';
import VueUEditor from '@/views/components/UEditor';

export default {
  name: 'home',
  components: {
    ArticleRight,
    VueUEditor
  },
  data() {
    return {
      imgR: process.env.imgR,
      avatar: this.$Cookies.get('avatar'),
      username: this.$Cookies.get('nickname'),
      logo: this.$Cookies.get('logo'),
      DetailData: {
        category: {},
        name: null
      },
      list: [],
      total: 0,
      loading: false,
      content: '',
      editorInstance: null,
      config: {
        toolbars: [[
          'fullscreen',
          'bold', 'italic', 'underline', 'fontfamily', 'fontsize', '|',
          'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
          'insertorderedlist', 'insertunorderedlist', '|',
          'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
          'emotion', 'autosubmit',
          'preview', 'cleardoc',
        ], [
          'forecolor', 'backcolor', 'horizontal', 'date', 'time', 'link', 'spechars', 'autotypeset', '|',
        ]],

        initialFrameWidth: '100%',  //初始化编辑器宽度,默认1000
        initialFrameHeight: 240,  //初始化编辑器高度,默认
        enableAutoSave: false,    //启用自动保存
        saveInterval: 50000,  //自动保存间隔时间， 单位ms
        // pasteplain: true,  //纯文本链接
        retainOnlyLabelPasted: true,
        elementPathEnabled: false  //是否启用元素路径，默认是显示
      },

    };

  },
  mounted() {

  },
  beforeDestroy() {
  },
  created() {
    this.getDetail();
    this.commentPage(1);
  },
  methods: {
    /**
     * 获取文章详情
     * @author hbb
     * @param
     */
    getDetail(){
      getDetail(this.$route.params.id).then(res => {
        this.DetailData = res.data;
        this.loading = true;
        this.DetailData.updateTime = this.formatMsgTime(this.DetailData.updateTime);
      }).catch(res => {
        this.loading = true;
      });
    },
    /**
     * 获取文章所有评论分页
     * @author hbb
     * @param
     */
    commentPage(page){
      this.currentPage = page;
      commentPage({
        page: page,
        pageSize: 20,
        postId: this.$route.params.id
      }).then(res => {
        this.list = res.data.list;
        this.total = res.data.total;
        for (let i = 0; i < this.list.length; i++) {
          this.list[i].updateTime = this.formatMsgTime(this.list[i].updateTime);
        }
      });
    },
    //分页函数
    handleCurrentChange(val){
      this.commentPage(val);
    },

    /**
     * 时间处理
     * @author hbb
     * @param
     */
    formatMsgTime (timespan) {
      let dateTime = new Date(timespan);
      let dateTime_1 = dateTime.getTime();
      let now = new Date();
      let now_new = now.getTime();  //typescript转换写法
      let milliseconds = 0;
      let timeSpanStr;
      milliseconds = now_new - dateTime_1;
      if (milliseconds <= 1000 * 60 * 1) {
        timeSpanStr = '刚刚';
      }
      else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
        timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
      }
      else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
      }
      else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
      }
      else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
        timeSpanStr = timespan;
      }
      return timeSpanStr;
    },
    /**
     * 发布评论
     * @author hbb
     * @param
     */
    comment(){
      if (!this.username) {
        this.$router.push({
          path: '/login'
        });
        return;
      }
      if (this.content == null || this.content == '') {
        this.$Message.info('请填写什么!');
        return;
      }
      comment({
        postId: this.$route.params.id,
        content: this.content
      }).then(res => {
        if (res.msg == '添加成功') {
          this.$Message.success('评论成功!');
          this.commentPage(this.currentPage);
          this.editorInstance.setContent('');
          this.DetailData.comments++;
        } else {
          this.$Notice.warning({
            title: '发布失败',
            desc: '请检查内容是否有太特殊字符串'
          });
        }

      }).catch(err => {
        this.$Notice.warning({
          title: '发布失败',
          desc: '请检查内容是否有太特殊字符串'
        });
      });
    },

    /**
     * 加载编辑器
     * @author hbb
     * @param
     */
    editorReady (editorInstance) {
      this.editorInstance = editorInstance;
      editorInstance.setContent('');
      editorInstance.addListener('contentChange', () => {
        this.content = editorInstance.getContent();
      });
    },
    //图片上传成功 后的  回调
    uploadImageSuccess(res, file){
      this.editorInstance.execCommand('insertimage', {
        src: 'http://47.99.113.195:3000' + res.data.url
      });
      this.progressShow = false;
      this.percent = 0;
    },
    onError(){
      this.progressShow = false;
      this.percent = 0;
      this.$Message.error('上传出错');
    },
    /**
     * 推荐
     * @author hbb
     * @param
     */
    recommend(id){
      postRecommend({
        id: id,
        'is_recommend': '1'
      }).then(res => {
        this.$Message.success('推荐成功');
        this.DetailData.is_recommend = 1;
      });
    },
    /**
     * 取消推荐
     * @author hbb
     * @param
     */
    cancelRecommend(id){
      postCancelRecommend({
        id: id,
        'is_recommend': '0'
      }).then(res => {
        this.$Message.success('取消推荐成功');
        this.DetailData.is_recommend = 0;
      });
    },
    goLink(id){
      this.$router.push({
        path: '/edit/' + id,
      });
    },
  }
};
