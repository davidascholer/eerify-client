import * as React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Film, Gamepad2 } from "lucide-react";
import Book from "../../assets/icons/Book";
import { useNavigate } from "react-router-dom";

interface FavoritesItemInterface {
  id: number;
  title: string;
  poster: string;
}

const testFilms: Array<FavoritesItemInterface> = [
  {
    id: 11,
    title: "Film 1",
    poster:
      "https://d2bzx2vuetkzse.cloudfront.net/fit-in/0x450/unshoppable_producs/ff37bd77-0f02-4f96-833d-07911b2d7209.jpg",
  },
  {
    id: 12,
    title: "Film 2",
    poster:
      "https://d2bzx2vuetkzse.cloudfront.net/fit-in/0x450/unshoppable_producs/ff37bd77-0f02-4f96-833d-07911b2d7209.jpg",
  },
  {
    id: 13,
    title: "Film 3",
    poster:
      "https://d2bzx2vuetkzse.cloudfront.net/fit-in/0x450/unshoppable_producs/ff37bd77-0f02-4f96-833d-07911b2d7209.jpg",
  },
];

const testBooks: Array<FavoritesItemInterface> = [];

const testGames: Array<FavoritesItemInterface> = [
  {
    id: 31,
    title: "Film 1",
    poster:
      "https://d2bzx2vuetkzse.cloudfront.net/fit-in/0x450/unshoppable_producs/ff37bd77-0f02-4f96-833d-07911b2d7209.jpg",
  },
  {
    id: 32,
    title: "Film 2",
    poster:
      "https://d2bzx2vuetkzse.cloudfront.net/fit-in/0x450/unshoppable_producs/ff37bd77-0f02-4f96-833d-07911b2d7209.jpg",
  },
];

const iconStyle: React.CSSProperties = { width: 75, height: 75, padding: 4 };

const Card = ({
  title,
  poster,
  onPress,
}: {
  title: string;
  poster: string;
  onPress: () => void;
}) => {
  return (
    <>
      <div className="border-t my-2" />
      <div onClick={onPress} className="cursor-pointer">
        <div className="text-sm mb-2">{title}</div>
        <img
          alt={title}
          src={poster}
          className="max-h-[167px] max-w-[250px]"
        />
      </div>
    </>
  );
};

const Summary = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <AccordionTrigger>
      <div className="flex flex-col items-center gap-1 py-1 w-full">
        {children}
        <div className="text-base font-medium">{title}</div>
      </div>
    </AccordionTrigger>
  );
};

export default function Favorites() {
  const navigate = useNavigate();
  return (
    <div className="space-y-2">
      {testFilms.length > 0 ? (
        <Accordion type="single" collapsible defaultValue="films">
          <AccordionItem value="films">
            <Summary title="Film">
              <Film style={iconStyle} className="text-primary" />
            </Summary>
            <AccordionContent>
              {testFilms.map((film) => (
                <Card
                  key={film.id}
                  title={film.title}
                  poster={film.poster}
                  onPress={() => navigate("/film/" + film.id)}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : null}
      {testBooks.length > 0 ? (
        <Accordion type="single" collapsible defaultValue="books">
          <AccordionItem value="books">
            <Summary title="Books">
              <Book style={iconStyle} className="text-primary" />
            </Summary>
            <AccordionContent>
              {testBooks.map((film) => (
                <Card
                  key={film.id}
                  title={film.title}
                  poster={film.poster}
                  onPress={() => navigate("/books/" + film.id)}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : null}
      {testGames.length > 0 ? (
        <Accordion type="single" collapsible defaultValue="games">
          <AccordionItem value="games">
            <Summary title="Games">
              <Gamepad2 style={iconStyle} className="text-primary" />
            </Summary>
            <AccordionContent>
              {testGames.map((film) => (
                <Card
                  key={film.id}
                  title={film.title}
                  poster={film.poster}
                  onPress={() => navigate("/games/" + film.id)}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : null}
    </div>
  );
}
