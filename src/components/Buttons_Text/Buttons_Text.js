import React, { useEffect, useState, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Swal from "sweetalert2";
import "./Buttons_Text.css";
import Translation from "../Translation/Translation";

export default function Buttons_Text() {
  const [clicked1, setClicked1] = useState(false);
  const [clicked2, setClicked2] = useState(false);
  const [clicked3, setClicked3] = useState(false);
  const [clicked4, setClicked4] = useState(false);
  const [clicked5, setClicked5] = useState(false);
  const [showText, setShowText] = useState(false);
  const [sentence, setSentence] = useState(" ");
  const textBoxRef = useRef(null);

  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition(
    {}
  );

  useEffect(() => {
    //Text Box Resize
    if (textBoxRef.current) {
      const adjustTextareaHeight = () => {
        textBoxRef.current.style.height = "auto";
        textBoxRef.current.style.height =
          textBoxRef.current.scrollHeight + "px";
      };
      textBoxRef.current.addEventListener("input", adjustTextareaHeight);
    }
  }, [showText]);

  const HandleStartClick = () => {
    setClicked1(!clicked1);
    if (!clicked1) {
      SpeechRecognition.startListening({ continuous: true });
    }
    setClicked2(false);
    setClicked3(false);
    setClicked4(false);
    setShowText(true);
  };
  const HandleStopClick = () => {
    setClicked1(false);
    setClicked2(!clicked2);
    if (!clicked2) {
      SpeechRecognition.stopListening();
    }
    setClicked3(false);
    setClicked4(false);
  };
  const HandleCopyClick = () => {
    setClicked1(false);
    setClicked2(false);
    setClicked3(!clicked3);
    setClicked4(false);
    if (!clicked3) {
      SpeechRecognition.abortListening();
      SpeechRecognition.startListening({ continuous: false });
    }

    //Pop up Notif for copy
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    if (!clicked3) {
      Toast.fire({
        icon: "success",
        title: "Copied to Clipboard",
      });
    }
  };
  const HandleResetClick = () => {
    setClicked1(false);
    setClicked2(false);
    setClicked3(false);
    setClicked4(!clicked4);

    //Pop up Notif for Reset
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    if (!clicked4) {
      Toast.fire({
        icon: "success",
        title: "Text Cleared",
      });
    }

    //Text Box Reset
    if (!clicked4) {
      SpeechRecognition.abortListening();
      SpeechRecognition.startListening({ continuous: false });
    }
  };

  const HandleTranslateClick = () => {
    setClicked1(false);
    setClicked2(false);
    setClicked3(false);
    setClicked4(false);
    setClicked5(!clicked5);
    if (!clicked5 && transcript) {
      setSentence(transcript.toString());
    }
    if (!clicked5) {
      SpeechRecognition.stopListening();
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <div className="btn-text">
      <div className="buttons">
        <button
          onClick={HandleStartClick}
          className={`start-btn btn-style ${clicked1 ? "click" : ""}`}
        >
          Start Listening
        </button>
        <button
          onClick={HandleStopClick}
          className={`start-btn btn-style ${clicked2 ? "click" : ""}`}
        >
          Stop Listening
        </button>
        <button
          onClick={HandleCopyClick}
          className={`start-btn btn-style ${clicked3 ? "click" : ""}`}
        >
          Copy to Clipboard
        </button>
        <button
          onClick={HandleResetClick}
          className={`start-btn btn-style ${clicked4 ? "click" : ""}`}
        >
          Reset
        </button>
      </div>
      <button
        onClick={HandleTranslateClick}
        className={`translate start-btn btn-style ${clicked5 ? "click" : ""}`}
      >
        Translate
      </button>
      {showText ? (
        <textarea
          name="text-translated"
          className="txt-area"
          id="txt-trans"
          cols="100"
          ref={textBoxRef}
          value={transcript}
        ></textarea>
      ) : (
        <p className="txt-placeholder">
          Click Start Listening to get started ;)
        </p>
      )}
      <Translation OriginalLang={transcript} />
    </div>
  );
}
