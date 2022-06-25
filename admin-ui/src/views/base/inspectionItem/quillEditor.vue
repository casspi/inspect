<template>
  <div>
    <quill-editor
      :id="randomId(3)"
      :ref="myEditor"
      v-model="content"
      :options="options"
      @change="onChange($event)"
      @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)"
      style="width: 100%; height: 100%"
    />
    <el-upload
      :key="randomId(3)"
      class="upload-col"
      :auto-upload="false"
      :accept="accept"
      action=""
      multiple
      :before-upload="beforeUpload"
      :data="myHeaders"
      :on-change="fileAdd"
      ref="upload"
    >
    </el-upload>
  </div>
</template>
<script>
import { quillEditor }  from 'vue-quill-editor'
import { uploadImage } from "@/api/base/inspectionItem";

/**
 * 富文本
 * content 内容
 * options 参数配置
 *
*/
// 工具栏配置
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],       // 加粗 斜体 下划线 删除线
  ["blockquote", "code-block"],                    // 引用  代码块
  [{ list: "ordered" }, { list: "bullet" }],       // 有序、无序列表
  [{ indent: "-1" }, { indent: "+1" }],            // 缩进
  [{ size: ["small", false, "large", "huge"] }],   // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }],         // 标题
  [{ color: [] }, { background: [] }],             // 字体颜色、字体背景颜色
  [{ align: [] }],                                 // 对齐方式
  ["clean"],                                       // 清除文本格式
  ["link", "image"]                       // 链接、图片
];
export default {
  props: {
    /* 编辑器的内容 */
    value: {
      type: String
    },
    /* 编辑器的索引 */
    quillIndex: {
      type: Number,
      default: 0
    },
    /* 编辑器的唯一标识符 */
    myEditor: {
      type: String,
      default: "quillEditor"
    }
  },
  components: {
    quillEditor
  },
  computed: {
    editor () {
      return this.$refs.myEditor.quillEditor;
    },
  },
  data () {
    return {
      accept: 'image/*',
      imageTypes: ['jpg', 'jpeg', 'png', 'gif'],
      maxFileLen: 0,
      content: this.value,
      options: {
        theme: "snow", // or 'bubble'
        placeholder: "请输入内容",
        modules: {
          imageDrop: true,      //图片拖拽
          imageResize: {          //放大缩小
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white"
            },
            modules: ["Resize", "DisplaySize", "Toolbar"]
          },
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: (value) => {
                if (value) {
                  document.querySelectorAll(".upload-col input")[this.quillIndex].click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          },
        }
      },
      myHeaders: { token: localStorage.getItem('token') },
    }
  },
  watch: {
    value: function () {
      this.content = this.value;
    }
  },
    methods: {
        randomId(len) {
            var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
            var tempLen = chars.length, tempStr = '';
            for (var i = 0; i < len; ++i) {
                tempStr += chars.charAt(Math.floor(Math.random() * tempLen));
            }
            return tempStr;
        },
        // 图片单个或者批量按照顺序上传
        fileAdd(fileobj, filelist) {
            let currLength = filelist.length
            this.maxFileLen = Math.max(currLength, this.maxFileLen)
            setTimeout(() => {
                if (currLength != this.maxFileLen) return
                this.maxFileLen = 0
                this.$refs.upload.clearFiles()
                this.fileUpload(filelist)
            })
        },
        fileUpload(files) {
            let _this = this;
            var param = new FormData()
            files.forEach(item => {
                param.append('file', item.raw)
            })
            uploadImage(param).then(res => {
                console.log("code: {}", res)
                if (res.code === 200) {
                    const quill = this.$refs["" + this.myEditor + ""].quill
                        , length = quill.getSelection().index
                    console.log("ddafasdf", res.data.fileList)
                    var fileList = res.data.fileList.reverse()
                    fileList.forEach(item => {
                        quill.insertEmbed(length, 'image', _this.getImgUrl(item))
                        quill.setSelection(length + 1) //定位索引
                    })
                }
            }).catch(err => {
              console.log("err=>", err)
                this.$message.error('上传图片失败！请重新上传')
            })
        },
        beforeUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isLt2M) {
                this.$message({
                    message: '图片单张不得超过2M，请重新选择！',
                    type: 'error'
                })
            }
            return isLt2M
        },
        onChange({ html }) {
            this.$emit("input", this.content);
        },
        getImgUrl(titleImg) {
            return process.env.VUE_APP_BASE_API + '/common/download/resource?name=' + titleImg
        },
         // 准备富文本编辑器
    onEditorReady (quill) {
    },
    //失去焦点事件
    onEditorBlur (quill) {
      console.log('editor blur!', quill)
    },
    //获得焦点事件
    onEditorFocus (quill) {
      console.log('editor focus!', quill)
    },
    //内容改变事件
    onEditorChange ({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.content = html
    }
    }
}
</script>
<style lang="scss" scoped>
.upload-col {
  height: 0;
  width: 0;
  overflow: hidden;
}
</style>
