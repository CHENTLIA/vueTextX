<template>
  <div class="posts">
    <!-- <span class="column" v-if="data.column.length>0">{{data.column}}</span> -->
    <div v-html="content" class="contents">

    </div>
    <div class="comment" v-if="comment">

    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      content: '',
      data: {},
      author: {},
      comment: false
    }
  },
  created () {
    this.id = this.$route.params.id
    this.getPost(this.id)
  },
  methods: {
    ...mapMutations(['set_header']),
    getPost () {
      var self = this
      this.$http.get('/api/post/' + this.id).then((res) => {
        console.log(res)
        self.content = res.data.content
        self.author = res.data.author || {}
        self.data = res.data
        self.set_header({
          show: false,
          // title: res.data.title
          title: '',
          icon: true
        })
      })
    },
    getComment () {
      
    }
  }
}
</script>
<style>
  .posts .column{
    padding: 5px 10px;
    border-radius: 6px;
    margin-top: 5px;
    display: inline-block;
    background: #ccc;
  }
  .posts .contents{
    padding: 0.2rem;
  }
  .posts #title{
    font-size: 1.4rem;
    font-weight: bold;
    line-height: 2rem;
    text-align: center;
  }
  .posts #collumn{
    display: none;
  }
  .posts .info{
    font-size: 1rem;
    font-weight: bold;
    color: #ccc;
    text-align: right;
  }
  .posts .status-card{
    padding: 10px 5px;
    background: #CFCFCF;
    margin-top: 10px;
  }
  .posts .hd {
    position: relative;
    height: 32px;
    line-height: 32px;
    padding-left: 40px;
  }
  .posts .hd .avatar.cache-avatar {
    border-radius: 50%;
    /* position: relative; */
    position: absolute;
    left: 0;
    top: 0;
  }
  .posts .hd a{
    color: #42b983;
  }
  .posts .bd{
    /* padding: 10px 0; */
    line-height: 2;
    font-size: 0.8rem;
  }
  .posts .bd img{
    width: 100%;
  }
  .posts #content p{
    padding: 5px 0;
    line-height: 2;
    text-indent: 2em;
  }
</style>
