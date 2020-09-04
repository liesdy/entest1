<template>
  <quill-editor
    v-model="content"
    ref="myQuillEditor"
    :options="editorOption"
    @focus="onEditorFocus($event)"
    @blur="onEditorBlur($event)"
    @change="onEditorChange($event)">
    <!-- <div id="toolbar" slot="toolbar"> -->
    <div :id="id" slot="toolbar">
      <button class="ql-bold" title="加粗"></button>
      <button class="ql-italic" title="斜体"></button>
      <button class="ql-underline" title="下划线"></button>
      <button class="ql-strike" title="删除线"></button>

      <button class="ql-blockquote" title="引用"></button>
      <!-- <button class="ql-code-block" title="代码块"></button> -->

      <!-- <button class="ql-header" title="标题1" value='1'></button>
      <button class="ql-header" title="标题2" value='2'></button> -->

      <button class="ql-script" title="下标" value='sub'></button>
      <button class="ql-script" title="上标" value='super'></button>

      <button class="ql-direction" title="位置变更" value='rtl'></button>

      <!-- <button class="ql-font ql-picker" title="字体选择" value='rtl'></button> -->
      <select class="ql-font" title="字体选择">
        <option selected value="Sans Serif"></option>
        <option value="serif"></option>
        <option value="monospace"></option>
      </select>

      <select class="ql-header" title="段落格式">
        <option selected value="1">正文</option>
        <option value="4">小</option>
        <option value="3">中</option>
        <option value="2">大</option>
      </select>
      <button class="ql-list" value="ordered" title="有序列表"></button>
      <button class="ql-list" value="bullet" title="无序列表"></button>
      <select class="ql-color" value="color" title="字体颜色"></select>
      <select class="ql-background" value="color" title="字体背景颜色"></select>
      <select class="ql-align">
        <option selected>left</option>
        <option value="center">center</option>
        <option value="right">right</option>
        <option value="justify">justify</option>
      </select>
      <button class='ql-link'></button>
      <!-- <span class="icon-pic custom-icon" title="图片" @click="insertImgClick($event)"></span>
      <span class="icon-video custom-icon" title="视频" @click="insertImgClick($event)"></span> -->
    </div>
    <!-- <input style="display: none;" type="file" id="insert_image" @change="fileInsert($event)">   -->
    <!-- 选择图片input -->
    <!-- <input style="display: none;" type="file" id="insert_video" @change="fileInsert($event)">   -->
    <!-- 选择视频input -->
  </quill-editor>
</template>

<script>
// npm install vue-quill-editor -S
import { quillEditor } from 'vue-quill-editor' // 调用富文本编辑器
import 'quill/dist/quill.snow.css' // 富文本编辑器外部引用样式  三种样式三选一引入即可
import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.bubble.css'
// import * as Quill from 'quill'; // 富文本基于quill
export default {
  name: 'editor',
  components: {
    quillEditor
  },
  props: {
    value: String,
    id: {
      type: String,
      default: 'editId'
    }
  },
  model: {
    prop: 'value',
    event: 'emitValue'
  },
  data () {
    let _this = this
    return {
      editor: null, // 富文本编辑器对象
      content: `<p></p><p><br></p><ol></ol>`, // 富文本编辑器默认内容
      editorOption: { //  富文本编辑器配置
        modules: {
          // toolbar: '#toolbar'
          toolbar: '#' + _this.id
          // toolbar: [
          // ['bold', 'italic', 'underline', 'strike'],
          // ['blockquote', 'code-block'],
          // [{ 'header': 1 }, { 'header': 2 }],
          // [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          // [{ 'script': 'sub' }, { 'script': 'super' }],
          // [{ 'indent': '-1' }, { 'indent': '+1' }],
          // [{ 'direction': 'rtl' }],
          // [{ 'size': ['small', false, 'large', 'huge'] }],
          // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          // [{ 'font': [] }],
          // [{ 'color': [] }, { 'background': [] }],
          // [{ 'align': [] }]
          // ['clean'],
          // ['link', 'image', 'video']
        // ]
        },
        theme: 'snow',
        placeholder: '请输入正文'
      }
    }
  },
  watch: {
    value (val, oldVal) {
      // console.log('oldVal: ', oldVal)
      this.content = val
    }
  },
  methods: {
    // 准备富文本编辑器
    onEditorReady (editor) {
      // console.log('editor: ', editor)
    },
    // 富文本编辑器 失去焦点事件
    onEditorBlur (editor) {
      // console.log('editor: ', editor)
    },
    // 富文本编辑器 获得焦点事件
    onEditorFocus (editor) {
      // console.log('editor: ', editor)
    },
    // 富文本编辑器 内容改变事件
    onEditorChange (editor) {
      // console.log('editor: ', editor)
      // this.emitValue()
      this.$emit('emitValue', editor.html)
    },
    // emitValue () {
    //   this.$emit('change', this.content)
    // },
    // 富文本编辑器 点击插入图片或者视频
    insertImgClick (e) {
      if (e.target.className.indexOf('icon-pic') !== -1) {
        document.getElementById('insert_image').click()
      } else if (e.target.className.indexOf('icon-video') !== -1) {
        document.getElementById('insert_video').click()
      }
    }
    // // 富文本编辑器 点击插入图片或者视频上传并预览
    // fileInsert (e) {
    //   var oFile = e.target.files[0];
    //   if (typeof (oFile) === 'undefined') {
    //     return;
    //   }
    //   let sExtensionName = oFile.name.substring(oFile.name.lastIndexOf('.') + 1).toLowerCase();   // 文件扩展名
    //   let sfileType = ''; // 上传文件类型
    //   if (e.target.id == 'insert_image') {
    //     sfileType = 'image'
    //     if (sExtensionName !== 'png' && sExtensionName !== 'jpg' && sExtensionName !== 'jpeg') {
    //       alert('不支持该类型图片');
    //       return;
    //     }
    //   }
    //   if (e.target.id == 'insert_video') {
    //     sfileType = 'video';
    //     if (sExtensionName !== 'mp4' && sExtensionName !== 'avi' && sExtensionName !== 'mov') {
    //       alert('不支持该类型视频');
    //       return;
    //     }
    //     let maxSize = 100*1024*1024;    // 100MB
    //     if (oFile.size > maxSize) {
    //       alert('上传视频大小不能超过100MB');
    //       return;
    //     }
    //   }
    //   var reader = new FileReader();
    //   reader.readAsDataURL(oFile);
    //   reader.onloadend = () => {
    //     let formData = new FormData(); // 通过formdata上传
    //     formData.append('file', oFile);
    //     let sUrl = '';
    //     if (sfileType == 'image') {
    //       sUrl = 'Pic';
    //     }
    //     if (sfileType == 'video') {
    //       sUrl = 'Vie';
    //     }
    //     var url = this.api_config + '/dealerIndex/upload' + sUrl + '.htm';
    //     this.axios.post(url, formData, {
    //       headers: { 'Content-Type': 'multipart/form-data' }
    //     }).then((res) => {
    //       this.editor.insertEmbed(this.editor.selection.savedRange.index, sfileType, res.data.data);  // 这个方法用来手动插入dom到编辑器里
    //       let isAndroid = this.$is_android(); // 判断是ios还是android
    //       if (isAndroid) {
    //         $('video').removeAttr('controls');
    //         $('video').attr('x5-video-player-type', 'h5');
    //       }
    //       this.editor.setSelection(this.editor.selection.savedRange.index + 1);  // 这个方法可以获取光标位置
    //     }).catch((response) => {
    //       console.log('失败', response);
    //     })
    //   }
    // }
  },
  mounted () {
    this.content = this.value
    this.editor = this.$refs.myQuillEditor.quill
  },
  beforeDestroy () {
    this.editor = null
    delete this.editor
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.ql-editor p {
  line-height: 36px;
}
</style>
<style scoped lang='scss'>
h3 {
  margin: 40px 0 0;
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
.ql-header, .ql-color, .ql-font, .ql-background, .ql-align{
  line-height: 23px;
}
.ql-color {
  position: relative;
  top: 1px;
}
</style>
