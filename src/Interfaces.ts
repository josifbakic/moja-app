
export interface Film {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

export interface Api {
    Search: Film[];
    totalResults: string;
    Response: string;
}