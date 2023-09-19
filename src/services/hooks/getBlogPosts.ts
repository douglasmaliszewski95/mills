import xmlJs from "xml-js";

export const getBlogPosts = async () => {
  const result = await fetch("https://blog.mills.com.br/feed/")
    .then((response) => response.text())
    .then((data) => {
      const obj = JSON.parse(
        xmlJs.xml2json(data, { compact: true, spaces: 4 })
      );
      JSON.stringify(obj);
      return obj;
    })
    .catch(console.error);

  return result?.rss?.channel;
};
