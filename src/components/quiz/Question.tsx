import Image from "../media/Image";
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
            <Image src={mediaPath} alt="question media" />
          )}
        </div>
      )}
      <h2 className="text-2xl font-bold text-center text-black">{title}</h2>
    </div>
  );
};

export default Question;
