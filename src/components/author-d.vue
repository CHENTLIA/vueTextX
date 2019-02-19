<template>
  <div class="author-d">
    <div class="author-intro">
      <div class="author-img">
        <img v-lazy="data.avatar" alt="">
        <p class="author-name">{{data.name}}</p>
      </div>
      <div class="author-con">
        {{data.resume}}
      </div>
      <p class="main-page">
        <span @click="gotoPage(data.id)">进入主页</span>
      </p>
    </div>
    <p class="tab-title">热门文章</p>
    <div class="post" v-for="item in theAuthor" :key="item.id" @click="enterDetail(item)">
      <span class="column" v-if="item.column.length>0">{{item.column}}</span>
      <p class="title">
        {{item.title}}
      </p>
      <div class="post-d" :class="{width_full: (item.thumbs.length==0 || item.abstract.length<40)}">
        <div class="post-detail"  v-if="item.abstract.length>40">
          {{item.abstract}}
        </div>
        <div class="post-thumb" v-if="item.thumbs.length>0">
          <img v-lazy="item.thumbs[0].large.url" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  data () {
    return {
      data: [],
      theAuthor: []
    }
  },
  created () {
    this.getTheAuthor(this.$route.params.id)
    this.getMoreArticle(this.$route.params.id)
  },
  computed: {
    ...mapState(['header'])
  },
  mounted () {
    console.log(this.header)
  },
  methods: {
    ...mapMutations(['set_header']),
    getTheAuthor (id) {
      var self = this
      this.$http.get('/api/author/' + id + '/posts').then(res => {
        // console.log(res)
        self.data = res.data.author
        console.log(res.data)
        // console.log(this.data)
        self.set_header({
          show: false,
          title: res.data.author.name,
          icon: false
        })
      })
    },
    getMoreArticle (id) {
      var self = this
      this.$http.get('/api/author/' + id + '/posts?count=10&max_id').then(res => {
        console.log(res.data.posts)
        self.theAuthor = res.data.posts
        // console.log(self.theAuthor)
      })
    },
    enterDetail (item) {
      this.$router.push({path: `/post/${item.id}/?douban_rec=1`})
    },
    gotoPage (id) {
      this.$router.push({path: `/author-page/${id}`})
    }
  }
}
</script>

<style scoped>
  .author-img{
    text-align: center;
  }
  .author-img img {
    margin: 4px auto;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
  .author-name {
    text-align: center;
  }
  .author-intro, .author-con{
    padding: 10px;
  }
  .main-page{
    text-align: center
  }
  .main-page span{
    display: inline-block;
    padding: 10px 20px;
    background: #42b983;
    color: #fff;
  }
  .tab-title{
    padding: 10px 0;
    font-size: 1.2rem;
    text-align: center;
    position: relative;
  }
  .tab-title::before, .tab-title::after{
    content: '';
    height: 1px;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transform: scaleY(0.5);
    background: #000;
  }
  .tab-title::after{
    top: 100%;
  }
  .width_full{
    width: 100%
  }
  .width_ban{
    width: 50%;
  }
  .post{
    border-bottom: 1px solid #ddd;
    position: relative;
    padding: 10px 4%;
    cursor: pointer;
  }
  .title{
    font-size: 1.2rem;
    line-height: 2rem;
    margin-top: 5px;
    font-weight: bold;
  }
  .post-d{
    display: flex;
    justify-content: space-between;
  }
  .post-detail{
    width: 60%;
    line-height: 2;
  }
  .post-d.width_full .post-detail{
    width: 100%;
  }
  .post-d.width_full .post-thumb{
    width: 100%;
  }
  .post-d .post-thumb{
    width: 40%;
    text-align: center
  }
  .post-thumb img{
    width: 60%;
    background: #ccc;
  }
</style>
