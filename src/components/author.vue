<template>
  <div class="author" ref="author" @scroll.native="scrollHandler" >
    <div class="recommend" ref="recommend">
      <p class="title">
        本周推荐
      </p>
      <ul class="author-list">
        <li v-for="(item, index) in rec" :key="index" @click="goAuthors(item)">
          <div class="tpic">
            <img v-lazy="item.avatar" alt="">
          </div>
          <div class="tcon">
            <p class="name">{{item.name}}</p>
            <p class="notes">{{item.editor_notes}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="hot" ref="hot">
      <p class="title">
        热门作者
      </p>
      <ul class="author-list">
        <li v-for="(item, index) in all" :key="index" @click="goAuthors(item)">
          <div class="tpic">
            <img v-lazy="item.avatar" alt="">
          </div>
          <div class="tcon">
            <p class="name">{{item.name}}</p>
            <p class="notes">{{item.editor_notes}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      rec: [],
      all: [],
      count: 20,
      total: 0,
      start: 0
    }
  },
  created () {
    this.getRecommend()
    this.getHotUser(this.count, this.start)
  },
  mounted () {
    // this.all = []
    window.addEventListener('scroll', this.handleScroll)
  },
  computed: {

  },
  watch: {
    // scrollY (newY) {
    //   const listHeight = this.listHeight
    //   if (newY > 0) {

    //   }
    // }
  },
  methods: {
    // ...mapMutations(['set'])
    handleScroll () {
      // 变量scrollTop 是滚动条滚动时，距离顶部的距离
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      // 可视区的高度
      var windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      // 滚动条总高度
      var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      // 滚动条走到底部的条件
      if (scrollTop + windowHeight === scrollHeight) {
        if (this.count > 100) {
          // this.start = this.total - this.total % this.count
          this.count = 100
        } else {
          this.count += 20
        }
        this.getHotUser(this.count, 0)
      }
    },
    getRecommend () {
      var self = this
      this.$http.get('/api/auth_authors/rec').then((res) => {
        // console.log(res.data)
        self.rec = res.data.authors
      })
    },
    getHotUser (count, start) {
      var self = this
      this.$http.get('/api/auth_authors/all?count=' + count + '&start=' + start).then((res) => {
        self.all = res.data.authors
        // console.log(self.all)
        self.total = res.data.total
      })
    },
    goAuthors (item) {
      console.log(item)
      this.$router.push({path: '/author-d/' + item.id})
    }
  }
}
</script>

<style scoped>
  .title{
    line-height: 2;
    font-size: 1rem;
    padding: 4px;
    position: relative;
  }
  .title:after, .author-list li:after{
    content: '';
    height: 1px;
    width: 100%;
    position: absolute;
    top: 100%;
    background: #000;
    left: 0;
    transform: scaleY(0.5)
  }
  .author-list{
    padding: 4px 0;
  }
  .author-list li{
    padding: 4px 0;
    display: flex;
    justify-content: flex-start;
    position: relative;
  }
  .tpic{
    height: 32px;
    width: 32px;
    position: absolute;
    top: 50%;
    left: 2%;
    transform: translate(0, -50%);
    border-radius: 50%;
  }
  .tpic img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .tcon{
    padding: 0 6px;
    line-height: 1.4rem;
    padding-left: 60px;
  }
  .name{
    font-size: 1rem;
    font-weight: bold;

  }
  .notes{
    color: #987;
    font-size: 0.8rem;
  }
</style>
