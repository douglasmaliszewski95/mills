import React from "react";
import ReactHtmlParser from "html-react-parser";

export function HtmlRenderer({ htmlContent }: any) {
  return <div>{ReactHtmlParser(htmlContent ?? "")}</div>;
}
