interface ProductsProps {
  img: string;
  title: string;
  description: string;
  link: string;
}

interface CompareTwoProductsProps {
  products?: ProductsProps[];
  title: string;
}

export { CompareTwoProductsProps, ProductsProps };
