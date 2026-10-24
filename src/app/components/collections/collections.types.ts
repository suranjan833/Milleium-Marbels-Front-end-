export interface CollectionItem {
  id: string;
  title: string;
  slug: string;
  textureImage: string;
  blockImage: string;
  intro: string;
  description: string;
  align?: "left" | "right";
}
