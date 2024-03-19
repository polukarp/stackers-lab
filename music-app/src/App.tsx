import type { Album, MockData, Track } from "@/shared";
import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import mockData from "./mock.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/ui/accordion";

export const App: React.FC = () => {
  const [data, setData] = useState<MockData | null>(null);

  useMemo(() => {
    if (!mockData) return;
    setData(mockData as MockData);
  }, [mockData]);

  if (!data?.albums) return <div>No albums available</div>;

  return (
    <div className="flex flex-col justify-center w-screen items-center gap-4 p-2 lg:p-8">
      {data.albums.map((album) => (
        <Album key={album.id} data={album} />
      ))}
    </div>
  );
};

const Album: React.FC<{ data: Album }> = ({ data }) => {
  const { tracks, title, genre, artist, thumbnail } = data;

  return (
    <Card className="w-full max-w-[400px] lg:max-w-[800px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="flex justify-between">
          <span>{artist}</span>
          <span>{genre}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col lg:flex-row ">
        <div className="lg:flex-1">
          <img src={thumbnail} className="rounded-sm" />
        </div>
        <div className="flex flex-col gap-2 lg:flex-1">
          <Accordion type="single" collapsible className="px-4">
            <AccordionItem value="tracklist">
              <AccordionTrigger>TrackList</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2 lg:px-4 pt-3 w-full">
                  {tracks.map(({ title, duration, track_number }) => (
                    <Track
                      key={track_number}
                      title={title}
                      duration={duration}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="description">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>
                Lorem ipsum dolor sit amet, qui minim labore adipisicing minim
                sint cillum sint consectetur cupidatat.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
};

const Track: React.FC<Partial<Track>> = ({ title, duration }) => {
  return (
    <div className="flex flex-row gap-2 items-start justify-between">
      <div className="text-md font-medium">{title}</div>
      <div>{duration}</div>
    </div>
  );
};
