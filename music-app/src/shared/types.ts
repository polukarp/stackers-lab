export type MockData = {
  albums: Album[];
};

export type Album = {
  id: number;
  title: string;
  artist: string;
  genre: string;
  release_year: number;
  tracks: Track[];
};

export type Track = {
  track_number: number;
  title: string;
  duration: string;
};
