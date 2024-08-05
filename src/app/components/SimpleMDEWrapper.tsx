import React, { forwardRef, Ref } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { SimpleMDEReactProps } from "react-simplemde-editor";

const SimpleMDEWrapper = forwardRef<HTMLDivElement, SimpleMDEReactProps>(
  (props, ref) => {
    return <SimpleMDE ref={ref as Ref<HTMLDivElement>} {...props} />;
  }
);

SimpleMDEWrapper.displayName = "SimpleMDEWrapper"; // Optional, but helps with debugging

export default SimpleMDEWrapper;
