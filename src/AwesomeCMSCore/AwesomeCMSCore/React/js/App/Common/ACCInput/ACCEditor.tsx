import React from "react";
import { Editor } from "@tinymce/tinymce-react";

import { APP_CONFIG } from "@Helper/Config";

type ACCEditorProps = {
  onChange: (...args: any[]) => any,
  value?: string
};

const ACCEditor: React.SFC<ACCEditorProps> = props => {
  return (
    <Editor
      apiKey={APP_CONFIG.EDITOR_API_KEY}
      initialValue=""
      value={props.value}
      init={{
        theme: "modern",
        plugins:
          "print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern help",
        toolbar:
          "undo redo | bold italic | alignleft aligncenter alignright | code",
        height: "300"
      }}
      onChange={props.onChange}
    />
  );
};
export default ACCEditor;
