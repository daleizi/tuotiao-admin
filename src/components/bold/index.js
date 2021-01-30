import { Bold as OriginalBold } from "element-tiptap";
import CustomBoldMenuButton from "./MenuButton";

export default class Bold extends OriginalBold {
  // here you can extend the extension like tiptap, such as schema, plugins ...

  menuBtnView({ isActive, commands, focus, editor }) {
    return {
      component: CustomBoldMenuButton,
      componentProps: {
        isActive: isActive.bold()
      },
      componentEvents: {
        click: () => {
          console.log("button clicked");
          // you can do somethings when button clicked
          commands.bold();
        }
      }
    };
  }
}
