import {get_userInfo, put_updateUserPs} from '@/api/user';
import ArticleRight from '@/views/components/article-right/index.vue';
export default {
  name: 'change-password',
  components: {
    ArticleRight
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
        oldPassword: null,
        newPassword: null,
        repeatpass: null
      },
    };

  },
  watch: {},
  mounted() {
  },
  beforeDestroy() {
  },
  created() {
    // this.get_userInfo();
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
      });
    },

    /**
     * 修改用户
     * @author hbb
     * @param
     */
    put_updateUserPs(){
      if (this.formItem.newPassword != this.formItem.repeatpass) {
        this.$Message.error(
          '两次输入的密码不一致'
        );
        return;
      }
      put_updateUserPs({
        passwordOld: this.formItem.oldPassword,
        passwordNew: this.formItem.newPassword
      }).then(res => {
        if (res.status == 0) {
          this.$Message.success('修改成功');
          this.goLink('/login');
        } else if (res.status == 1 && res.msg == '旧密码错误') {
          this.$Message.error(
            res.msg
          );
        }

      });
    }
  }
};
