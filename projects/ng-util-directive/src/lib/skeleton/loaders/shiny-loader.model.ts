export type ShinyLoaderData = (FullSize | Circle | Square | Rectangle) & {
  loaderColor1?: string;
  loaderColor2?: string;
};

export type FullSize = {
  shape: 'fullSize';
  borderRadius?: string;
};

export type Circle = {
  shape: 'circle';
  size: string;
};

export type Square = {
  shape: 'square';
  size: string;
  borderRadius?: string;
};

export type Rectangle = {
  shape: 'rectangle';
  borderRadius?: string;
  width: string;
  height: string;
};
