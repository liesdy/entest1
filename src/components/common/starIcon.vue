<template>
  <div class="star-icon">
    <i v-if='baseData.starData' :class="[starOn, levelColor(baseData), { 'in-detail': inDetail }]" @click="showStarDialog(baseData)"></i>
    <i v-else :class="['el-icon-star-off', { 'in-detail': inDetail }]" @click="showStarDialog(baseData)"></i>
    <el-dialog
      :modal='true'
      append-to-body
      title=""
      :visible.sync="showDialog"
      width="400px">
      <star
        v-if='showDialog'
        :baseData='baseData'
        :starType='starType'
        @dialogHandlerSuccess='dialogHandlerSuccess'
        @cancel='showDialog = false'
        >
      </star>
    </el-dialog>
  </div>
</template>

<script>
// import api from '@/common-api/starBase.js'
export default {
  name: 'starIcon',
  props: {
    inDetail: {
      type: Boolean,
      default: false
    },
    starType: {
      type: String,
      default: null
    },
    baseData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      showDialog: false,
      starOn: 'el-icon-star-on'
      // stared: false,
      // hardLevel: null,
      // showedText: ['人畜不分', '雌雄难辨', '似是而非', '相见恨晚', '心有灵犀'],
      // showedColor: { 1: '#f74747', 2: '#FF9900', 3: '#ddd700', 4: '#00df2e', 5: '#00d2ff' }
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    showStarDialog (data) {
      this.choicedRow = data
      this.detailType = 'star'
      this.showDialog = true
    },
    levelColor (data) {
      switch (data.starData.hard_level) {
        case 1:
          return 'color-level1'
        case 2:
          return 'color-level2'
        case 3:
          return 'color-level3'
        case 4:
          return 'color-level4'
        case 5:
          return 'color-level5'
        default:
          break
      }
    },
    dialogHandlerSuccess () {
      this.$emit('dialogHandlerSuccess')
      this.showDialog = false
    }
  },
  mounted () {
    // if (this.baseData.starData) {
    //   this.hardLevel = this.baseData.starData.hard_level
    //   this.stared = true
    // }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  .star-icon {
    display: inline-block;
  }
  i {
    cursor: pointer;
    font-size: 20px;
  }
  .el-icon-star-on {
    font-size: 26px;
    position: relative;
    left: -3px;
  }
  .edit-frame .fade{
    display: none
  }
  .edit-frame:hover .fade {
    display: inline-block;
  }
  .rate-width {
    width: 72%;
  }
  .in-detail {
    position: relative;
    top: 5px;
    left: 10px;
  }
</style>
