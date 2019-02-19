<template>
  <div class="navBar" v-show="navbar.show">
    <ul class="nav-list" ref="navList">
      <li v-for="(item, index) in navList" :key="index" :class="{active: shows == index}" @click.stop="tab(item, index)">
        {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  data () {
    return {
      navList: [
        {path: '/daily', name: '今日一刻'},
        // {path: '/last-content', name: '往期内容'},
        {path: '/author', name: '热门作者'},
        {path: '/column', name: '栏目浏览'}
      ],
      shows: 0
    }
  },
  computed: {
    ...mapState(['navbar'])
  },
  created () {
    // this.$refs.navList.querySelectorAll('li')[0].style.color = '#dfd'
  },
  methods: {
    ...mapMutations(['set_navbar', 'set_navbarItem']),
    tab (item, index) {
      this.shows = index
      // this.$refs.navList.querySelectorAll('li')[index].style.color = '#dfd'
      this.set_navbar({
        show: false,
        info: item.name,
        showInfo: item.name
      })
      this.set_navbarItem(item.name)
      this.$router.push({path: item.path})
    }
  }
}
</script>

<style>
  .navBar{
    position: absolute;
    top: 3rem;
    left: 0;
    width: 5rem;
    height: 100%;
    background: #fff;
    z-index: 101;
  }
  .nav-list li{
    padding: 10px 0;
    text-align: center;
  }
  .active{
    color: #42b983;
  }
</style>
