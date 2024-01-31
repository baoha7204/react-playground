import { makeFetching } from "../data";
import { getBioData } from "../data/bio";
import use from "../hooks/use";
import { Bio } from "../types/core";

const bioFetch = makeFetching<Bio>();

export default function Biography({ artistId }: { artistId: string }) {
  const bio = use<Bio>(bioFetch(`/${artistId}/bio`, () => getBioData()));
  return (
    <section>
      <p className="bio">{bio!.content}</p>
    </section>
  );
}
