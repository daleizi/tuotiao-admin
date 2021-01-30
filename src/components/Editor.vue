<template>
  <el-tiptap
    lang="zh"
    :extensions="extensions"
    :content="content"
    placeholder="Write something ..."
  />
</template>

<script>
import {
  // all extensions
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Italic,
  Strike,
  Underline,
  Link,
  Image,
  Blockquote,
  ListItem,
  BulletList, // use with ListItem
  OrderedList, // use with ListItem
  TodoItem,
  TodoList, // use with TodoItem
  TextAlign,
  Indent,
  HorizontalRule,
  HardBreak,
  History,
  Fullscreen,
  Preview,
  CodeBlock,
  TextColor,
  Table,
  TableHeader,
  TableCell,
  TableRow
} from "element-tiptap";

import Bold from "./bold/index";
import { uploadImage } from "@/api/image";
export default {
  name: "Editor",
  props: {
    content: String
  },
  components: {
    "el-tiptap": ElementTiptap
  },
  data: () => ({
    extensions: [
      new Doc(),
      new Text(),
      new Paragraph(),
      new Heading({ level: 5 }),
      new Bold({ bubble: true }),
      new Underline({ bubble: true }),
      new Italic({ bubble: true }),
      new Strike({ bubble: true }),
      new Link({ bubble: true }),
      new Image({
        // 默认会把图片生成 base64 字符串和内容存储在一起，如果需要自定义图片上传
        uploadRequest(file) {
          // 如果接口要求 Content-Type 是 multipart/form-data，则请求体必须使用 FormData
          const fd = new FormData();
          fd.append("image", file);
          // 第1个 return 是返回 Promise 对象
          // 为什么？因为 axios 本身就是返回 Promise 对象
          return uploadImage(fd).then(res => {
            // 这个 return 是返回最后的结果
            return res.data.data.url;
          });
        } // 图片的上传方法，返回一个 Promise<url>
      }),
      new Blockquote(),
      new TextAlign(),
      new Indent(),
      new HardBreak(),
      new HorizontalRule({ bubble: true }),
      new History(),
      new HorizontalRule(), // 分割线
      new Fullscreen(), // 全屏
      new Preview(), // 预览
      new CodeBlock(), // 代码块
      new TextColor(), // 文本颜色
      new ListItem(),
      new BulletList(), // 无序列表  (必须与 ListItem 一起使用)
      new OrderedList(), // 有序列表  (必须与 ListItem 一起使用)
      new TodoItem(),
      new TodoList(), // 任务列表 (必须与 ListItem 一起使用)
      new Table(), // (与 TableHeader, TableCell, TableRow 一起使用)
      new TableHeader(),
      new TableCell(),
      new TableRow()
    ]
  })
};
</script>
