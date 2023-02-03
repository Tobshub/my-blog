import { marked } from "marked";
import DOMPurify from "dompurify";

export default function MDToHTML(text: string) {
  try {
    const parsed = marked.parse(text);
    const sanitized = DOMPurify.sanitize(parsed);
    return sanitized;
  } catch (error) {
    console.error("could not convert to html", error);
  }
}
