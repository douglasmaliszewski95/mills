interface PostsProps {
  title: {
    rendered: string;
  }
  categories: string[];
  date: string;
  link: string;
  yoast_head_json: {
    og_image: [{
      url: string;
    }]
  }
  slug: string;
}

export const getBlogPosts = async () => {
  const result: PostsProps[] = await fetch("https://blog.mills.com.br/wp-json/wp/v2/posts")
    .then((response) => response.json())
    .catch(console.error);

  let filterPosts: any[] = [];
  for (let i = 0; i < result?.length; i++) {
    if (filterPosts.length === 9) break;
    else {
      const category = await fetch(`https://blog.mills.com.br/wp-json/wp/v2/categories/${result[i].categories[0]}`).then(res => res.json());
      filterPosts.push({
        image: result[i].yoast_head_json.og_image[0].url,
        alt: result[i].slug,
        category: category.name,
        title: result[i].title.rendered,
        date: new Date(result[i].date).toLocaleDateString(),
        link: result[i].link,
      })
    }
  }

  return filterPosts;
};
