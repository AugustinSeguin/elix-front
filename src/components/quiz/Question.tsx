import Video from "../media/Video";

interface QuestionProps {
  title: string;
  mediaPath?: string;
}

const Question = ({ title, mediaPath }: QuestionProps) => {
  const isVideo = (path: string) => {
    const videoExtensions = [".mp4", ".webm", ".ogg", ".mov", ".avi", ".mkv"];
    return videoExtensions.some((ext) => path.toLowerCase().endsWith(ext));
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 px-4 py-8">
      {mediaPath && (
        <div className="w-full max-w-md">
          {isVideo(mediaPath) ? (
            <Video src={mediaPath} />
          ) : (
            <img
              src={
                mediaPath?.startsWith("http")
                  ? mediaPath // Si c'est déjà une URL, on l'utilise telle quelle
                  : `https://api.elix.cleanascode.fr/uploads/${mediaPath}` // Sinon, on ajoute le préfixe
              }
              alt={title}
              className="w-16 h-16 rounded-xl object-cover w-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                // On garde ton log pour vérifier la nouvelle URL en cas d'échec
                console.error("Échec du chargement :", target.src);
                target.src = "https://placehold.co/64x64?text=IMG";
              }}
            />
          )}
        </div>
      )}
      <h2 className="text-2xl font-bold text-center color-text">{title}</h2>
    </div>
  );
};

export default Question;
