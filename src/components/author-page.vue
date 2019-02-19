<template>
  <div class="author-content">
    <div class="author-des">
      <div class="author-thumb">
        <img v-lazy="des.avatar" alt="">
        <p>{{des.name}}</p>
        <p>常居地：{{des.loc_name}}</p>
      </div>
    </div>
    <div class="author-others">
      <yd-cell-group>
        <yd-cell-item>
          <span slot="left">广播</span>
          <span slot="right">{{des.status_count}}</span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">日记</span>
          <span slot="right">{{des.note_count}}</span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">相册</span>
          <span slot="right">{{des.album_count}}</span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">书影音长评</span>
          <span slot="right">{{des.review_count}}</span>
        </yd-cell-item>
      </yd-cell-group>
      <p class="movie">电影</p>
      <yd-cell-group>
        <yd-cell-item>
          <span slot="left">看过</span>
          <span slot="right">{{des.movie_collect_count}}</span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">想看</span>
          <span slot="right">{{des.movie_wish_count}}</span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">在看</span>
          <span slot="right">{{des.movie_do_count}}</span>
        </yd-cell-item>
      </yd-cell-group>
      <p class="movie">读书</p>
      <yd-cell-group>
        <yd-cell-item>
          <span slot="left">读过</span>
          <span slot="right">{{des.book_collect_count}}</span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">想读</span>
          <span slot="right">{{des.book_wish_count}}</span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">在读</span>
          <span slot="right">{{des.book_do_count}}</span>
        </yd-cell-item>
      </yd-cell-group>
      <p class="movie">音乐</p>
      <yd-cell-group>
        <yd-cell-item>
          <span slot="left">听过</span>
          <span slot="right">{{des.music_collect_count}}</span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">想听</span>
          <span slot="right">{{des.music_wish_count}}</span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">在听</span>
          <span slot="right">{{des.music_do_count}}</span>
        </yd-cell-item>
      </yd-cell-group>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      des: {}
    }
  },
  created () {
    // console.log(this.$route.params.id)
    this.getAuthorPage(this.$route.params.id)
  },
  methods: {
    ...mapMutations(['set_header']),
    getAuthorPage (id) {
      var self = this
      this.$http.get('/api/user/' + id + '/profile').then((res) => {
        console.log(res.data)
        self.des = res.data
        self.set_header({
          show: false,
          title: '作者主页',
          icon: false
        })
      })
    }
  }
}
</script>

<style scoped>
  .author-des {
    padding: 10px;
    background: #fff;
  }
  .author-thumb{
    text-align: center;
  }
  .author-thumb img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .author-others{
    margin-top: 20px;
  }
  .yd-cell-item{
    padding: 10px;
  }
  .movie{
    padding: 10px;
  }
</style>
