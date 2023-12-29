import React, { useEffect, useState, useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import "./LangSelect.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Swal from "sweetalert2";
import "../Buttons_Text/Buttons_Text.css";
import Translation from "../Translation/Translation";

export const TextContext = React.createContext();
export default function LangSelect() {
  const [currentLangLeft, setCurrentLangLeft] = useState("en");
  const [currentLangRight, setCurrentLangRight] = useState("en");
  const [clicked1, setClicked1] = useState(false);
  const [clicked2, setClicked2] = useState(false);
  const [clicked3, setClicked3] = useState(false);
  const [clicked4, setClicked4] = useState(false);
  const [clicked5, setClicked5] = useState(false);
  const [showText, setShowText] = useState(false);
  const [sentence, setSentence] = useState(" ");
  const [translateTime, setTranslateTime] = useState(false);
  const textBoxRef = useRef(null);

  const [translatedText, setTranslatedText] = useState("");
  // useEffect(() => {
  //   console.log("translatedText:", translatedText);
  // }, [translatedText]);

  const { transcript, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition({});

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
    SpeechRecognition.startListening({ continuous: true });
    setClicked2(false);
    setClicked3(false);
    setClicked4(false);
    setClicked5(false);
    setTranslateTime(false);
    setShowText(true);

    if (!clicked1) {
      resetTranscript();
      setTranslatedText("");
    }
  };
  const HandleStopClick = () => {
    setClicked1(false);
    setClicked2(!clicked2);
    if (!clicked2) {
      SpeechRecognition.stopListening();
    }
    setClicked3(false);
    setClicked4(false);
    setClicked5(false);
  };
  const HandleCopyClick = () => {
    setClicked1(false);
    setClicked2(false);
    setClicked3(!clicked3);
    setClicked4(false);
    setClicked5(false);

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
    setClicked5(false);
    setTranslateTime(false);
    if (!clicked4) {
      resetTranscript();
      setTranslatedText("");
    }
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

    const translatedContent = translatedText;
    resetTranscript(); // Reset the transcript
    setTranslatedText(translatedContent);
    setTranslateTime(true);
  };

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <div className="lang-box">
      <ul className="list-style">
        <li>
          <select
            id="source-lang"
            value={currentLangLeft}
            onChange={(e) => setCurrentLangLeft(e.target.value)}
          >
            <option className="lang-options" value="en">
              English
            </option>
          </select>
        </li>
      </ul>
      <FontAwesomeIcon
        className="rev-icon"
        icon={faRepeat}
        spin
        size="2xl"
        style={{ color: "#ffffff" }}
      />
      <ul className="list-style">
        <li>
          <select
            value={currentLangRight}
            onChange={(e) => setCurrentLangRight(e.target.value)}
          >
            <option className="lang-options" value="en">
              English
            </option>
            <option className="lang-options" value="bn">
              Bengali
            </option>
            <option className="lang-options" value="hi">
              Hindi
            </option>
          </select>
        </li>
      </ul>
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
            placeholder={
              translateTime ? "Please Wait..." : "Speak Something..."
            }
            className="txt-area"
            id="txt-trans"
            cols="100"
            ref={textBoxRef}
            value={transcript || translatedText}
          ></textarea>
        ) : (
          <p className="txt-placeholder">
            Click Start Listening to get started ;)
          </p>
        )}
      </div>
      <TextContext.Provider value={[translatedText, setTranslatedText]}>
        <Translation
          OriginalLang={sentence}
          langLeft={currentLangLeft}
          langRight={currentLangRight}
        />
      </TextContext.Provider>
    </div>
  );
}
