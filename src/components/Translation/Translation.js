import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { TextContext } from "../LangSelect/LangSelect";

export default function Translation(props) {
  const [translationParams, setTranslationParams] = useState({
    source: props.langLeft,
    target: props.langRight,
  });
  const [translatedText, setTranslatedText] = useContext(TextContext);
  useEffect(() => {
    if (props.langLeft !== undefined) {
      setTranslationParams((prevParams) => ({
        ...prevParams,
        source: props.langLeft,
      }));
    }
    if (props.langRight !== undefined) {
      setTranslationParams((prevParams) => ({
        ...prevParams,
        target: props.langRight,
      }));
    }
  }, [props.langLeft, props.langRight]);
  useEffect(() => {
    // console.log("OriginalLang:", props.OriginalLang);
    // console.log("langLeft:", translationParams.source);
    // console.log("langRight:", translationParams.target);

    const translate = () => {
      if (
        props.OriginalLang &&
        translationParams.source &&
        translationParams.target
      ) {
        console.log("All props available. Initiating translation...");

        const encodedParams = new URLSearchParams();
        encodedParams.set("from", translationParams.source);
        encodedParams.set("to", translationParams.target);
        encodedParams.set("text", props.OriginalLang);

        const options = {
          method: "POST",
          url: "https://google-translate113.p.rapidapi.com/api/v1/translator/text",
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            "X-RapidAPI-Key":
              "5855a33cfamsh4c0ba46a227ead6p104687jsneb419b209fef",
            "X-RapidAPI-Host": "google-translate113.p.rapidapi.com",
          },
          data: encodedParams,
        };
        async function initiate() {
          try {
            const response = await axios.request(options);
            if (response.data) {
              setTranslatedText(response.data.trans);
            }
          } catch (error) {
            console.error("Translation error:", error);
          }
        }
        initiate();
      } else {
        console.log("Not all props available. Translation skipped.");
      }
    };

    translate();
  }, [props.OriginalLang]);
}
