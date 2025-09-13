"use client";
import { useState } from "react";
import TakeAudio from "./takeAudio";
import PlayAudio from "./playAudio";

type AudioProps = {
  onAudioReady?: (blob: Blob, url: string) => void; // ✅ send audio back to parent
};

export default function Audio({ onAudioReady }: AudioProps) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const handleRecorded = (url: string, blob: Blob) => {
    setAudioUrl(url);
    setAudioBlob(blob);

    if (onAudioReady) {
      onAudioReady(blob, url);
    }
  };

  const resetAudio = () => {
    setAudioBlob(null);
    setAudioUrl(null);
  };

  return (
    <div className="space-y-4">
      {audioUrl ? (
        <PlayAudio src={audioUrl} autoPlay deleteAudio={resetAudio} />
      ) : (
        <TakeAudio onRecorded={handleRecorded} />
      )}
    </div>
  );
}
