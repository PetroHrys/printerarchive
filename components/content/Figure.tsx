import type { ArchiveImage as ArchiveImageData } from "@/lib/content/types";
import { ArchiveImage } from "./ArchiveImage";

/**
 * A single in-article figure.
 *
 * Portrait images are capped so that the image itself never exceeds about two
 * thirds of the viewport's height: a tall engraving or phone screenshot at the
 * full reading measure would otherwise fill more than a screen and push the
 * text it illustrates out of view. Landscape images are unaffected (the cap
 * resolves above the column width).
 */
export function Figure({ image }: { image: ArchiveImageData }) {
  const portrait = image.height > image.width;
  return (
    <ArchiveImage
      image={image}
      sizes="(max-width: 768px) 100vw, 720px"
      className="mx-auto max-w-2xl"
      figureStyle={
        portrait
          ? {
              maxWidth: `min(42rem, 100%, calc(65vh * ${image.width} / ${image.height}))`,
            }
          : undefined
      }
    />
  );
}
