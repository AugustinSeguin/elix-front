import {
  VideoHTMLAttributes,
  forwardRef,
  useState,
  useRef,
  useEffect,
} from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaCompress,
} from "react-icons/fa";
import Button from "../button/Button";

interface VideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  aspectRatio?: "1/1" | "4/3" | "16/9" | "21/9" | "auto";
  rounded?: "none" | "sm" | "md" | "lg";
  showControls?: boolean;
  showCustomControls?: boolean;
  poster?: string;
  fallbackMessage?: string;
}

const Video = forwardRef<HTMLVideoElement, VideoProps>(
  (
    {
      src,
      aspectRatio = "16/9",
      rounded = "md",
      showControls = true,
      showCustomControls = true,
      poster,
      fallbackMessage = "Votre navigateur ne supporte pas la lecture de vidéos.",
      autoPlay = false,
      loop = false,
      muted = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(muted);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [hasError, setHasError] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Utiliser la ref externe ou interne
    const videoElement = (ref as any)?.current || videoRef.current;

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
    };

    // Gestion de la lecture/pause
    const togglePlay = () => {
      if (videoElement) {
        if (isPlaying) {
          videoElement.pause();
        } else {
          videoElement.play();
        }
        setIsPlaying(!isPlaying);
      }
    };

    // Gestion du son
    const toggleMute = () => {
      if (videoElement) {
        videoElement.muted = !isMuted;
        setIsMuted(!isMuted);
      }
    };

    // Gestion du plein écran
    const toggleFullscreen = () => {
      if (!containerRef.current) return;

      if (!isFullscreen) {
        if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
      setIsFullscreen(!isFullscreen);
    };

    // Mise à jour du temps
    const handleTimeUpdate = () => {
      if (videoElement) {
        setCurrentTime(videoElement.currentTime);
      }
    };

    // Chargement des métadonnées
    const handleLoadedMetadata = () => {
      if (videoElement) {
        setDuration(videoElement.duration);
      }
    };

    // Gestion du seek (barre de progression)
    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTime = parseFloat(e.target.value);
      if (videoElement) {
        videoElement.currentTime = newTime;
        setCurrentTime(newTime);
      }
    };

    // Gestion des erreurs
    const handleError = () => {
      setHasError(true);
    };

    // Formater le temps (en secondes -> mm:ss)
    const formatTime = (seconds: number) => {
      if (isNaN(seconds)) return "00:00";
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    };

    // Écouter les événements fullscreen
    useEffect(() => {
      const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
      };

      document.addEventListener("fullscreenchange", handleFullscreenChange);
      return () =>
        document.removeEventListener(
          "fullscreenchange",
          handleFullscreenChange
        );
    }, []);

    const containerClasses = `
      relative
      ${aspectRatioMap[aspectRatio]}
      ${roundedMap[rounded]}
      overflow-hidden
      bg-black
      group
    `.trim();

    const videoClasses = `
      w-full
      h-full
      object-cover
      ${className}
    `.trim();

    return (
      <div ref={containerRef} className={containerClasses}>
        {/* Vidéo */}
        <video
          ref={ref || videoRef}
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          controls={showControls && !showCustomControls}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={handleError}
          className={videoClasses}
          {...props}
        >
          {fallbackMessage}
        </video>

        {/* Contrôles personnalisés */}
        {showCustomControls && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Barre de progression */}
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 mb-3 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-primary-500"
            />

            {/* Boutons de contrôle */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                {/* Play/Pause */}
                <Button
                  onClick={togglePlay}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-primary-400 transition-colors focus:outline-none p-0"
                  aria-label={isPlaying ? "Pause" : "Lecture"}
                >
                  {isPlaying ? (
                    <FaPause className="w-5 h-5" />
                  ) : (
                    <FaPlay className="w-5 h-5" />
                  )}
                </Button>

                {/* Mute/Unmute */}
                <Button
                  onClick={toggleMute}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-primary-400 transition-colors focus:outline-none p-0"
                  aria-label={isMuted ? "Activer le son" : "Couper le son"}
                >
                  {isMuted ? (
                    <FaVolumeMute className="w-5 h-5" />
                  ) : (
                    <FaVolumeUp className="w-5 h-5" />
                  )}
                </Button>

                {/* Timer */}
                <span className="text-white text-sm font-medium">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              {/* Fullscreen */}
              <Button
                onClick={toggleFullscreen}
                variant="ghost"
                size="sm"
                className="text-white hover:text-primary-400 transition-colors focus:outline-none p-0"
                aria-label={
                  isFullscreen ? "Quitter le plein écran" : "Plein écran"
                }
              >
                {isFullscreen ? (
                  <FaCompress className="w-5 h-5" />
                ) : (
                  <FaExpand className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Message d'erreur */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/90">
            <div className="text-center p-6">
              <p className="text-white text-lg mb-2">
                Erreur de chargement de la vidéo
              </p>
              <p className="text-gray-400 text-sm">
                Le fichier vidéo est introuvable ou corrompu.
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
);

Video.displayName = "Video";

export default Video;
