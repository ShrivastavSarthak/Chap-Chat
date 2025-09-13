"use client";
import { Button } from "@/src/lib/components/ui/button";
import { button_color, text_size } from "@/src/utils/constants/css.constants";
import { useState, useRef } from "react";
import { IoMic } from "react-icons/io5";
import { IoMdSquare } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

type TakeAudioProps = {
  onRecorded?: (url: string, blob: Blob) => void;
};

export default function TakeAudio({ onRecorded }: TakeAudioProps) {
  const [isAudioRecording, setIsAudioRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // 🎤 Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        if (chunksRef.current.length > 0) {
          const blob = new Blob(chunksRef.current, { type: "audio/webm" });
          const url = URL.createObjectURL(blob);
          setAudioUrl(url);

          // ✅ Send audio back to parent
          if (onRecorded) {
            onRecorded(url, blob);
          }

          chunksRef.current = [];
        }
      };

      mediaRecorder.start();
      setIsAudioRecording(true);
      setElapsedTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Mic permission denied:", err);
      alert("Microphone access is required to record audio.");
    }
  };

  // 🛑 Stop recording (✅ keeps audio)
  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    stopTracks();
    setIsAudioRecording(false);

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  const cancelRecording = () => {
    stopTracks();

    if (mediaRecorderRef.current) {
      if (mediaRecorderRef.current.state === "recording") {
        // remove event handlers so blob never gets created
        mediaRecorderRef.current.ondataavailable = null;
        mediaRecorderRef.current.onstop = null;
        mediaRecorderRef.current.stop();
      }
      mediaRecorderRef.current = null;
    }

    // 🔄 Reset everything
    setIsAudioRecording(false);
    setAudioUrl(null);
    setElapsedTime(0);
    chunksRef.current = [];

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // 🔇 Stop all mic tracks
  const stopTracks = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  };

  // Format time (mm:ss)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div
      className={`flex ${
        !isAudioRecording ? "justify-end" : "justify-between"
      } w-full items-center`}
    >
      {isAudioRecording && (
        <>
          <Button variant="ghost" onClick={cancelRecording}>
            <RxCross2 />
          </Button>
          <div className="bg-[#ecf5fa] rounded-3xl py-1.5 px-3">
            <p className={`${text_size.p3} text-[#19A9F9] font-[600]`}>
              {formatTime(elapsedTime)}/05:00
            </p>
          </div>
        </>
      )}

      {isAudioRecording ? (
        <Button
          variant="default"
          onClick={stopRecording}
          className={`${button_color.linerGradient} cursor-pointer rounded-full w-9 h-9`}
        >
          <IoMdSquare className="scale-125 text-white" />
        </Button>
      ) : (
        <Button
          onClick={startRecording}
          variant="ghost"
          className="cursor-pointer"
        >
          <IoMic className="scale-125 text-[#19A9F9]" />
        </Button>
      )}
    </div>
  );
}
