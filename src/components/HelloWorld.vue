<template>
  <div class="hello">
    <m-header></m-header>
    <m-nav></m-nav>
    <transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <router-view class="content"></router-view>
    </transition>
    <div class="mask" v-if="navbar.show"></div>
  </div>
</template>

<script>
import mHeader from './header.vue'
import mNav from './navBar'
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    mHeader,
    mNav
  },
  computed: {
    ...mapState(['navbar'])
  },
  created () {
    this.getNews()
    this.set_navbarItem('今日一刻')
  },
  methods: {
    ...mapMutations(['set_navbarItem']),
    // navh () {
    //   this.set_navbar({
    //     show: false
    //   })
    // },
    getNews () {
      this.$http.get('/api/columns').then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.mask{
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .4);
  z-index: 100;
  top: 0;
  left: 0;
}
</style>
