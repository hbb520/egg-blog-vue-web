import {get_userInfo, put_UserInfo} from '@/api/user';
import ArticleRight from '@/views/components/article-right/index.vue';
import VueCoreImageUpload from 'vue-core-image-upload';
export default {
  name: 'people',
  components: {
    ArticleRight,
    'vue-core-image-upload': VueCoreImageUpload
  },
  data() {
    return {
      imgR: process.env.imgR,
      avatar: this.$Cookies.get('avatar'),
      username: this.$Cookies.get('username'),
      logo: this.$Cookies.get('logo'),
      BASE_API: process.env.BASE_API,
      infoData: {},
      formItem: {
        nickname: null,
        lives_in_city: null,
        introduction: null,
        phone: null,
        email: null
      },
      src: '/static/imgs/default_avatar.jpg',
    };

  },
  watch: {},
  mounted() {
  },
  beforeDestroy() {
  },
  created() {
    this.get_userInfo();
  },
  methods: {
    /**
     * 获取用户详情
     * @author hbb
     * @param
     */
    get_userInfo(){
      get_userInfo().then(res => {
        this.infoData = res.data;
        this.src = res.data.avator;
        this.formItem.lives_in_city = res.data.lives_in_city;
        this.formItem.nickname = res.data.nickname;
        this.formItem.introduction = res.data.introduction;
        this.formItem.email = res.data.email;
        this.formItem.phone = res.data.phone;

      });
    },
    /**
     * 上传
     * @author hbb
     * @param
     */
    imageuploaded(res){
      this.src = res.data.url;
    },
    errorhandle(){
      this.$Message.error('上传出错');
    },
    /**
     * 修改用户
     * @author hbb
     * @param
     */
    put_UserInfo(){
      put_UserInfo({
        avator: this.src,
        nickname: this.formItem.nickname,
        lives_in_city: this.formItem.lives_in_city,
        introduction: this.formItem.introduction,
        email: this.formItem.email,
        phone: this.formItem.phone,
      }).then(res => {
        this.$Message.success('修改成功');
        this.get_userInfo();
        document.getElementById('header-avatar').src = this.imgR + this.src;
        this.$Cookies.set('avator', this.src);
      });
    }
  }
};
