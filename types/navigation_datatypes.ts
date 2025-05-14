export interface NavItem {
  pk: number;
  val: string;
  name: string;
  link: string;
  children?: NavItem[]; 
}
export interface CategoryItem {
  id: number;
  title: string;
  image: string;
}
