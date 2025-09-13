"use client";
import { Button } from "@/src/lib/components/ui/button";
import { Progress } from "@/src/lib/components/ui/progress";
import { button_color, text_size } from "@/src/utils/constants/css.constants";
import { FaPause } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
type PlayAudioProps = {
  src: string; // audio file URL or blob
  autoPlay?: boolean; // optional autoplay
  deleteAudio: () => void;
};

export default function PlayAudio({
  src,
  autoPlay = false,
  deleteAudio,
}: PlayAudioProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // % progress
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
      setProgress((audio.currentTime / (audio.duration || 1)) * 100);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateProgress);
    };
  }, []);

  // Format seconds → mm:ss
  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <>
      <div className="w-full flex justify-end">
        <Button
          onClick={togglePlay}
          variant="default"
          className={`${button_color.linerGradient} w-9 h-9 rounded-full`}
        >
          {isPlaying ? (
            <FaPause className="text-white scale-125" />
          ) : (
            <FaPlay className="text-white scale-100" />
          )}
        </Button>
      </div>
      <div className="flex-1 flex flex-col">
        <Progress value={progress} className="h-2 rounded-full" />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <audio
        ref={audioRef}
        src={src}
        autoPlay={autoPlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />
      <div className="flex w-full justify-end">
        <Button
          onClick={() => deleteAudio()}
          variant="ghost"
          className="rounded-full w-9 h-9"
        >
          <FaTrash className="scale-120 text-[#939393]" />
        </Button>
      </div>
    </>
  );
}
