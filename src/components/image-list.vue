<template>
  <div>
    <div class="flex justify-between">
      <el-radio-group @change="getimg()" v-model="params.collect" size="small">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button
        v-if="isShowAdd"
        type="primary"
        size="small"
        @click="dialogShow = true"
        >上传素材</el-button
      >
    </div>
    <!-- 图片列表 -->
    <div style="margin-top:20px;">
      <el-row :gutter="20">
        <el-col
          class="mb-20"
          :lg="4"
          :sm="6"
          :xs="8"
          v-for="(item, index) in imgs"
          :key="item.id"
          @click.native="selected = index"
        >
          <div class="imgbox">
            <el-image
              v-if="isShowPreview"
              style="height:120px"
              :src="item.url"
              :preview-src-list="[item.url]"
            ></el-image>
            <el-image v-else style="height:120px" :src="item.url"></el-image>
            <div v-if="selected === index" class="img-item">
              <i class="el-icon-circle-check selected"></i>
            </div>
            <div class="flex justify-between">
              <el-button
                v-if="isShowStar"
                :type="item.is_collected ? 'warning' : ''"
                :icon="
                  item.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'
                "
                size="mini"
                :loading="item.loading"
                circle
                @click="starBtn(item)"
              ></el-button>
              <el-button
                v-if="isShowCopy"
                type="info"
                icon="el-icon-link"
                size="mini"
                circle
                @click="copyBtn(item.url)"
              ></el-button>
              <el-button
                v-if="isShowDel"
                type="danger"
                icon="el-icon-delete"
                size="mini"
                circle
                @click="deleteBtn(item)"
              ></el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="params.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="params.per_page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total_count"
      >
      </el-pagination>
    </div>
    <!-- 对话框 -->
    <el-dialog append-to-body title="上传素材" :visible.sync="dialogShow">
      <el-upload
        v-if="dialogShow"
        class="upload-demo"
        :headers="uploadHeaders"
        name="image"
        drag
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        multiple
        :on-success="onUploadSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getImages, deleteImages, startImages } from "@/api/image";
import copys from "@/utils/copy";
export default {
  name: "ImageList",
  props: {
    isShowAdd: {
      // 上传素材按钮
      type: Boolean,
      default: true
    },
    isShowDel: {
      // 删除图片按钮
      type: Boolean,
      default: true
    },
    isShowCopy: {
      // 复制链接按钮
      type: Boolean,
      default: true
    },
    isShowStar: {
      // 收藏按钮
      type: Boolean,
      default: true
    },
    isShowPreview: {
      // 预览图片
      type: Boolean,
      default: true
    }
  },
  data() {
    const user = JSON.parse(window.localStorage.getItem("user"));
    return {
      dialogShow: false, // 对话框
      params: {
        page: 1,
        per_page: 10,
        collect: false // 默认查询全部素材
      },
      total_count: 0, // 总条数
      imgs: [],
      // 请求头
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      },
      selected: null // 选中的索引
    };
  },
  created() {
    this.getimg();
  },
  methods: {
    // 获取素材数据
    getimg(page = 1) {
      // 重置页码
      this.params.page = page;
      getImages(this.params).then(res => {
        this.total_count = res.data.data.total_count;
        const results = res.data.data.results;
        results.forEach(img => {
          img.loading = false;
        });
        this.imgs = results;
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.params.per_page = val;
      this.getimg();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.getimg(val);
    },
    // 素材上传成功
    onUploadSuccess() {
      this.dialogShow = false;
      this.getimg();
      this.$message.success("上传成功");
    },
    // 图片收藏
    starBtn(item) {
      item.loading = true;
      startImages(item.id, !item.is_collected).then(res => {
        item.is_collected = !item.is_collected;
        item.loading = false;
        if (res.data.message == "OK") {
          this.$message.success("收藏成功");
        }
      });
    },
    // 图片删除
    deleteBtn(item) {
      deleteImages(item.id).then(res => {
        this.$confirm("删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          if (res.status == 204) {
            this.$message.success("删除成功");
            this.getimg();
          }
        });
      });
    },
    // 复制图片链接
    copyBtn(url) {
      copys(url);
    }
  }
};
</script>

<style lang="scss" scoped>
.imgbox {
  position: relative;
  .img-item {
    background: rgba($color: #000000, $alpha: 0.4);
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .selected {
      font-size: 28px;
      color: red;
    }
  }
}
</style>
