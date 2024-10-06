export interface IBlogEntry {
  blogEntryTitle: string;
  blogEntry: JSON;
  _id: string;
  photo: IPhoto;
}

export interface IPhoto {
  width: number;
  height: number;
  url: string;
  fileName: string;
}

export interface ISkeletonLoader {
  amount: number;
}
