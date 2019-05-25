import {create, edit, getAllCategory, getDetail} from '@/api/user';
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
      BASE_API: process.env.BASE_API,
      imgR: process.env.imgR,
      myimgR: 'http://47.99.113.195',
      avatar: this.$Cookies.get('avatar'),
      username: this.$Cookies.get('username'),
      logo: this.$Cookies.get('logo'),
      title: '',
      DetailData: {},
      createPage: true,
      TagList: [],
      content: '',
      categoryId: null,
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
        initialFrameHeight: 300,  //初始化编辑器高度,默认
        enableAutoSave: false,    //启用自动保存
        saveInterval: 50000,  //自动保存间隔时间， 单位ms
        // pasteplain: true,  //纯文本链接
        // retainOnlyLabelPasted: true,
        // elementPathEnabled: false  //是否启用元素路径，默认是显示
      },
      html: '<p><embed type="application/x-shockwave-flash" class="edui-faked-video" pluginspage="http://www.macromedia.com/go/getflashplayer" src="http://player.youku.com/player.php/sid/XMzg4MTg4ODIzNg==/v.swf" width="420" height="280" wmode="transparent" play="true" loop="false" menu="false" allowscriptaccess="never" allowfullscreen="true"/></p>'

    };

  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': function (to, from) {
      if (to.name == 'create') {
        this.createPage = true;
        this.title = null;
        this.editorInstance.setContent('');
      } else {
        this.createPage = false;
      }
    }
  },
  mounted() {
    if (this.$route.name == 'create') {
      this.createPage = true;
    } else {
      this.createPage = false;
    }
  },
  beforeDestroy() {
  },
  created() {
    this.getAllCategory();

  },
  methods: {
    /**
     * 发布文章
     * @author hbb
     * @param
     */
    create(){
      if (!this.username) {
        this.$router.push({
          path: '/login'
        });
        return;
      }
      if (this.title == null || this.title == '') {
        this.$Message.info('请填写标题!');
        return;
      } else if (this.title.length < 2) {
        this.$Message.info('请丰富你的标题');
        return;
      }
      if (this.content == null || this.content == '') {
        this.$Message.info('请填写文章内容!');
        return;
      } else if (this.title.content < 10) {
        this.$Message.info('请丰富你的文章内容');
        return;
      }

      create({
        title: this.title,
        content: this.content,
        categoryId: this.categoryId
      }).then(res => {
        if (res.status == 0) {
          this.$Message.success('发布成功!');
          this.$router.push('/all-article');
        } else {
          this.$Notice.warning({
            title: '发布失败',
            desc: '请检查内容是否有特殊字符串'
          });
        }

      });
    },
    /**
     * 编辑
     * @author hbb
     * @param
     */
    edit(){
      if (!this.username) {
        this.$router.push({
          path: '/login'
        });
        return;
      }
      if (this.title == null || this.title == '') {
        this.$Message.info('请填写标题!');
        return;
      } else if (this.title.length < 2) {
        this.$Message.info('请丰富你的标题');
        return;
      }
      if (this.content == null || this.content == '') {
        this.$Message.info('请填写文章内容!');
        return;
      } else if (this.title.content < 10) {
        this.$Message.info('请丰富你的文章内容');
        return;
      }
      create({
        title: this.title,
        content: this.content,
        categoryId: this.categoryId,
        id: this.$route.params.id
      }).then(res => {
        if (res.status == 0) {
          this.$Message.success('发布成功!');
          this.$router.push('/all-article');
        } else {
          this.$Notice.warning({
            title: '发布失败',
            desc: '请检查内容是否有特殊字符串'
          });
        }
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

      this.getDetail();

    },
    //图片上传成功 后的  回调
    //这里写了默认前缀地址,根据你的服务可变动
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
     * 获取文章详情
     * @author hbb
     * @param
     */
    getDetail(){
      if (this.$route.params.id) {
        getDetail(this.$route.params.id).then(res => {
          this.DetailData = res.data;
          this.title = res.data.title;
          this.categoryId = res.data.categoryId;
          this.editorInstance.setContent(res.data.content);
        });
      }
    },
    /**
     * 分类
     * @author hbb
     * @param 0 顶级节点
     */
    getAllCategory(){
      getAllCategory(0).then(res => {
        this.TagList = res.data;
        if (this.TagList.length > 0) {
          this.categoryId = this.TagList[0].id;
        }
      });
    },


  }
};
