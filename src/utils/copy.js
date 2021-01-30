import { Message } from "element-ui";
export default function copys(url) {
  let oInput = document.createElement("input");
  oInput.value = url;
  document.body.appendChild(oInput);
  oInput.select(); // 选择对象
  document.execCommand("Copy");
  Message.success("复制成功");
  oInput.remove();
}
