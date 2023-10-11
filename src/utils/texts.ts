function containsHTMLLikeText(inputString: string) {
  const htmlRegex = /<[^>]*>/;

  return htmlRegex.test(inputString);
}

export const updateParagraphs = () => {
  const selectors = "p, h1, h2, h3, h4, h5, h6, span";

  const elements = document.querySelectorAll(selectors);

  elements.forEach((paragraph: any) => {
    if (containsHTMLLikeText(paragraph.innerText)) {
      paragraph.innerHTML = paragraph.innerText;
    }
  });
};
