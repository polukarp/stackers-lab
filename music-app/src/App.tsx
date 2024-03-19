import { useEffect, useState } from "react";
import mockData from "./mock.json";
import type { Album, Track, MockData } from "@/shared";

export const App: React.FC = () => {
  const [data, setData] = useState<MockData | null>(null);

  useEffect(() => {
    if (mockData) {
      setData(mockData);
    }
  }, [mockData]);

  if (!data?.albums) return <div>No albums available</div>;

  return (
    <div className="flex flex-col">
      {data.albums.map((album) => (
        <Album data={album} />
      ))}
    </div>
  );
};

const Album: React.FC<{ data: Album }> = ({ data }) => {
  const { tracks, title } = data;

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <h2 className="">{title}</h2>
      <div className="flex flex-col gap-2">
        {tracks.map(({ title, duration }) => (
          <Track title={title} duration={duration} />
        ))}
      </div>
    </div>
  );
};

const Track: React.FC<Partial<Track>> = ({ title, duration }) => {
  return (
    <div className="flex flex-col gap-2">
      <div>{title}</div>
      <div>{duration}</div>
    </div>
  );
};
