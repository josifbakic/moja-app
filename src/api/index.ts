export type Film = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export type Data = {
  Search: Film[];
  totalResults?: string;
  Response: string;
};
