import { debounce } from "./utils"
import BackTop from 'components/content/backtop/BackTop.vue'

export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null,
            newRefresh: null
        }
    },
    mounted() {
        this.newRefresh = debounce(this.$refs.scroll.refresh, 100)
        this.itemImgListener = () => {
            this.newRefresh()
        }
        this.$bus.$on('itemImageLoad', this.itemImgListener)
        console.log('我是混入的内容');
    }
}

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isBackTopShow: false
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, 500)
        },
    }
}