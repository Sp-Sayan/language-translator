import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import "./LangSelect.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Swal from "sweetalert2";
import "../Buttons_Text/Buttons_Text.css";
import Translation from "../Translation/Translation";
import useClipboard from "react-use-clipboard";
import { motion } from "framer-motion";

const AnimationVariants = (key) => ({
  hover: {
    scale: 1.2,
  },
  tap: {
    scale: 0.8,
  },
  slideIn: {
    x: 0,
    transition: {
      duration: key,
    },
  },
  FadeIn: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  initialSlide: {
    x: "100vw",
  },
  initialTextArea: {
    x: -400,
  },
  initialFade: {
    opacity: 0,
  },
});

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
  const [sentence, setSentence] = useState("");
  const [translateTime, setTranslateTime] = useState(false);
  const textBoxRef = useRef(null);
  const [translatedText, setTranslatedText] = useState("");
  const [textCopy, setTextCopy] = useState("");
  const [isCopied, setCopied] = useClipboard(textCopy, {
    successDuration: 1000,
  });
  const [showButton, setShowButton] = useState(false);

  // useEffect(() => {
  //   console.log("translatedText:", translatedText);
  // }, [translatedText]);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

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
      textBoxRef.current.value = transcript ? transcript : translatedText;
    }
  }, [showText, transcript, translatedText]);

  const HandleStartClick = () => {
    setClicked1(!clicked1);
    SpeechRecognition.startListening({ continuous: true });
    setClicked2(false);
    setClicked3(false);
    setClicked4(false);
    setClicked5(false);
    setTranslateTime(false);
    setShowText(true);
    setShowButton(true);

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

    if (!clicked3) {
      SpeechRecognition.abortListening();
      SpeechRecognition.startListening({ continuous: false });
      // Copy the content of the textarea to the clipboard
      navigator.clipboard
        .writeText(textBoxRef.current.value)
        .then(() => {
          // Successful copy
          setCopied(true);
          setTextCopy(textBoxRef.current.value);

          // Pop up notification for copy success
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

          Toast.fire({
            icon: "none",
            title: "Copied to Clipboard",
          });
        })
        .catch((error) => {
          // Handle any errors during copying
          console.error("Copy to clipboard failed:", error);
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
      textBoxRef.current.value = "";
    }
    //Pop up Notif for Reset

    if (!clicked4) {
      Toast.fire({
        icon: "none",
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
    if (!clicked5) {
      setSentence(textBoxRef.current.value);
      // console.log("Inner Text: ", sentence);
      //textBoxRef.current.value = translatedContent;
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
    <div className="lang-box-container">
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
              <option className="lang-options" value="bho">
                Bhojpuri
              </option>
              <option className="lang-options" value="fr">
                French
              </option>
              <option className="lang-options" value="de">
                German
              </option>
              <option className="lang-options" value="hi">
                Hindi
              </option>
              <option className="lang-options" value="es">
                Spanish
              </option>
              <option className="lang-options" value="ta">
                Tamil
              </option>
            </select>
          </li>
        </ul>
      </div>
      <div className="btn-text">
        {showText ? (
          <div className="txt-area-div">
            <p className="txt-edit">You can make any corrections required.</p>
            <motion.textarea
              variants={AnimationVariants(0.5)}
              initial="initialTextArea"
              animate="slideIn"
              name="text-translated"
              placeholder={
                translateTime ? "Please Wait..." : "Speak Something..."
              }
              className="txt-area"
              id="txt-trans"
              cols="100"
              ref={textBoxRef}
            //defaultValue={transcript || translatedText}
            ></motion.textarea>
          </div>
        ) : (
          <p className="txt-placeholder">
            Click Start Listening to get started ;)
          </p>
        )}
        {showButton ? (
          <div className="btn-all">
            <div className="buttons">
              <button
                onClick={HandleStartClick}
                className={`start-btn btn-style ${clicked1 ? "click" : ""}`}
              >
                Start Listening
              </button>
              <motion.button
                variants={AnimationVariants(0.3)}
                initial="initialSlide"
                animate="slideIn"
                onClick={HandleStopClick}
                className={`start-btn btn-style ${clicked2 ? "click" : ""}`}
              >
                Stop Listening
              </motion.button>
              <motion.button
                variants={AnimationVariants(0.5)}
                initial="initialSlide"
                animate="slideIn"
                onClick={HandleCopyClick}
                className={`start-btn btn-style ${clicked3 ? "click" : ""}`}
              >
                Copy to Clipboard
              </motion.button>
              <motion.button
                variants={AnimationVariants(0.7)}
                initial="initialSlide"
                animate="slideIn"
                onClick={HandleResetClick}
                className={`start-btn btn-style ${clicked4 ? "click" : ""}`}
              >
                Reset
              </motion.button>
            </div>
            <motion.button
              variants={AnimationVariants(0.7)}
              initial="initialFade"
              animate="FadeIn"
              onClick={HandleTranslateClick}
              className={`translate start-btn btn-style ${clicked5 ? "click" : ""
                }`}
            >
              Translate
            </motion.button>
          </div>
        ) : (
          <div className="buttons">
            <button
              onClick={HandleStartClick}
              className={`start-btn btn-style ${clicked1 ? "click" : ""}`}
            >
              Start Listening
            </button>
          </div>
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
