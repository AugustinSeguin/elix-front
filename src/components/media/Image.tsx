import { ImgHTMLAttributes, forwardRef, useState } from "react";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatio?: "1/1" | "4/3" | "16/9" | "21/9" | "auto";
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  loading?: "lazy" | "eager";
  placeholderSrc?: string;
  fallbackSrc?: string;
  showCaption?: boolean;
  caption?: string;
  zoomOnHover?: boolean;
}

const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      aspectRatio = "auto",
      objectFit = "cover",
      rounded = "md",
      loading = "lazy",
      placeholderSrc,
      fallbackSrc = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="18" fill="%239ca3af"%3EImage non disponible%3C/text%3E%3C/svg%3E',
      showCaption = false,
      caption,
      zoomOnHover = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const [imgSrc, setImgSrc] = useState(placeholderSrc || src);
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Map des ratios d'aspect
    const aspectRatioMap = {
      "1/1": "aspect-square",
      "4/3": "aspect-[4/3]",
      "16/9": "aspect-video",
      "21/9": "aspect-[21/9]",
      auto: "",
    };

    // Map des arrondis
    const roundedMap = {
      none: "",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    };

    // Map de l'object-fit
    const objectFitMap = {
      contain: "object-contain",
      cover: "object-cover",
      fill: "object-fill",
      none: "object-none",
      "scale-down": "object-scale-down",
    };

    // Gestion du chargement de l'image
    const handleLoad = () => {
      setIsLoaded(true);
      if (placeholderSrc) {
        setImgSrc(src);
      }
    };

    // Gestion des erreurs de chargement
    const handleError = () => {
      setHasError(true);
      setImgSrc(fallbackSrc);
    };

    // Classes de base
    const baseClasses = "w-full h-full transition-all duration-300";

    // Classes conditionnelles
    const loadingClasses = !isLoaded && placeholderSrc ? "blur-sm" : "";
    const zoomClasses = zoomOnHover ? "hover:scale-105 cursor-pointer" : "";

    // Combinaison de toutes les classes
    const imageClasses = `
      ${baseClasses}
      ${objectFitMap[objectFit]}
      ${loadingClasses}
      ${zoomClasses}
      ${className}
    `.trim();

    const containerClasses = `
      ${aspectRatioMap[aspectRatio]}
      ${roundedMap[rounded]}
      overflow-hidden
      bg-gray-100
      ${zoomOnHover ? "overflow-hidden" : ""}
    `.trim();

    return (
      <figure className="inline-block">
        <div className={containerClasses}>
          <img
            ref={ref}
            src={imgSrc}
            alt={alt}
            loading={loading}
            onLoad={handleLoad}
            onError={handleError}
            className={imageClasses}
            {...props}
          />
        </div>

        {showCaption && (caption || alt) && (
          <figcaption className="mt-2 text-sm text-gray-600 text-center">
            {caption || alt}
          </figcaption>
        )}

        {hasError && !fallbackSrc && (
          <div className="mt-2 text-sm text-red-600 text-center">
            Erreur de chargement de l'image
          </div>
        )}
      </figure>
    );
  }
);

Image.displayName = "Image";

export default Image;
