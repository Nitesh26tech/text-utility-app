import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";

export default function TextForm({ mode, showAlert }) {
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [replaceWord, setReplaceWord] = useState("");
  const prevText = useRef("");

  // LocalStorage
  useEffect(() => {
    const savedText = localStorage.getItem("textutils-text");
    if (savedText) setText(savedText);
  }, []);

  useEffect(() => {
    localStorage.setItem("textutils-text", text);
  }, [text]);

  //
  const updateText = (newText, message) => {
    if (!text.trim()) {
      showAlert("Please enter some text first", "warning");
      return;
    }
    prevText.current = text;
    setText(newText);
    showAlert(message, "success");
  };

  // text Handler
  const handleChange = (e) => setText(e.target.value);

  const undoText = () => {
    if (!prevText.current) {
      showAlert("Nothing to undo", "warning");
      return;
    }
    setText(prevText.current);
    showAlert("Undo successful", "info");
  };

  // Text Transform
  const toUpper = () =>
    updateText(text.toUpperCase(), "Converted to Uppercase");

  const toLower = () =>
    updateText(text.toLowerCase(), "Converted to Lowercase");

  const clearText = () => {
    if (!text.trim()) {
      showAlert("Text already empty", "warning");
      return;
    }
    prevText.current = text;
    setText("");
    showAlert("Text cleared", "danger");
  };

  const removeSpaces = () =>
    updateText(text.replace(/\s+/g, " ").trim(), "Extra spaces removed");

  const reverseText = () =>
    updateText(text.split("").reverse().join(""), "Text reversed");

  const removeSpecialChars = () =>
    updateText(
      text.replace(/[^a-zA-Z0-9\s]/g, ""),
      "Special characters removed",
    );

  const pasteText = async () => {
    const pasted = await navigator.clipboard.readText();
    prevText.current = text;
    setText(pasted);
    showAlert("Text pasted from clipboard", "success");
  };

  const speakText = () => {
    if (!text.trim()) {
      showAlert("Nothing to speak", "warning");
      return;
    }
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
    showAlert("Reading text aloud", "info");
  };

  const toSentences = () => {
    if (!text.trim()) {
      showAlert("Text is empty", "warning");
      return;
    }
    const formatted = text
      .toLowerCase()
      .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());

    prevText.current = text;
    setText(formatted);
    showAlert("Converted to sentence case", "success");
  };

  const replaceText = () => {
    if (!search.trim()) {
      showAlert("Enter word to search", "warning");
      return;
    }
    prevText.current = text;
    setText(text.replaceAll(search, replaceWord));
    showAlert("Text replaced successfully", "success");
  };

  const highlightText = () => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    return text
      .split(regex)
      .map((part, i) =>
        part.toLowerCase() === search.toLowerCase() ? (
          <mark key={i}>{part}</mark>
        ) : (
          part
        ),
      );
  };

  // File Upload
  const uploadFile = (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "text/plain") {
      showAlert("Only .txt files allowed", "danger");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      prevText.current = text;
      setText(e.target.result);
      showAlert("File loaded successfully", "success");
    };
    reader.readAsText(file);
  };

  //Download TXT file
  const downloadTxt = () => {
    if (!text.trim()) {
      showAlert("Nothing to download", "warning");
      return;
    }
    if (!window.confirm("Download text as TXT file?")) return;

    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    link.download = "textutils.txt";
    link.click();
    showAlert("TXT file downloaded", "success");
  };

  //download as PDF
  const exportPDF = () => {
    if (!text.trim()) {
      showAlert("Nothing to export", "warning");
      return;
    }
    if (!window.confirm("Export text as PDF?")) return;

    const pdf = new jsPDF();
    pdf.text(text, 10, 10);
    pdf.save("textutils.pdf");
    showAlert("PDF exported successfully", "success");
  };

  //Stats 
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <>
      <h2 className={`text-${mode === "dark" ? "light" : "dark"}`}>
        Advanced Text Utility
      </h2>

      <textarea
        className="form-control my-3"
        rows="8"
        value={text}
        onChange={handleChange}
        style={{
          backgroundColor: mode === "dark" ? "#343a40" : "white",
          color: mode === "dark" ? "white" : "black",
        }}
      />

      {/* Buttons */}
      <div className="mb-3">
        <button
          type="button"
          className="btn btn-primary mx-1"
          onClick={toUpper}
          disabled={!text.trim()}
        >
          UpperCase
        </button>
        <button
          type="button"
          className="btn btn-primary mx-1"
          onClick={toLower}
          disabled={!text.trim()}
        >
          LowerCase
        </button>
        <button
          type="button"
          className="btn btn-warning mx-1"
          onClick={toSentences}
        >
          To Sentences
        </button>
        <button
          type="button"
          className="btn btn-danger mx-1"
          onClick={clearText}
        >
          ClearText
        </button>
        <button
          type="button"
          className="btn btn-secondary mx-1"
          onClick={undoText}
        >
          Undo
        </button>
        <button
          type="button"
          className="btn btn-success mx-1"
          onClick={pasteText}
        >
          Paste
        </button>
        <button type="button" className="btn btn-info mx-1" onClick={speakText}>
          Listen Text
        </button>
        <button
          type="button"
          className="btn btn-warning mx-1"
          onClick={removeSpaces}
        >
          Remove Spaces
        </button>
        <button
          type="button"
          className="btn btn-dark mx-1"
          onClick={removeSpecialChars}
        >
          Remove SpecialChar
        </button>
        <button
          type="button"
          className="btn btn-secondary mx-1"
          onClick={reverseText}
        >
          Reverse Text
        </button>
      </div>

      <div className="mb-3">
        <button
          type="button"
          className="btn btn-outline-dark mx-1"
          onClick={downloadTxt}
        >
          TXT Download
        </button>
        <button
          type="button"
          className="btn btn-outline-info mx-1"
          onClick={exportPDF}
        >
          PDF Download
        </button>
      </div>

      <input
        type="file"
        accept=".txt"
        className="form-control my-2"
        onChange={uploadFile}
      />

      {/* Search Replace */}
      <div className="row my-3">
        <div className="col">
          <input
            className="form-control"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            className="form-control"
            placeholder="Replace Word"
            value={replaceWord}
            onChange={(e) => setReplaceWord(e.target.value)}
          />
        </div>
        <div className="col">
          <button
            type="button"
            className="btn btn-outline-info w-100"
            onClick={replaceText}
          >
            Replace
          </button>
        </div>
      </div>

      <hr />

      <p>
        {words} Words | {text.length} Characters
      </p>
      <p>Reading Time: {(0.008 * words).toFixed(2)} minutes</p>

      <h5>Highlighted Preview</h5>
      <div style={{ whiteSpace: "pre-wrap" }}>
        {search ? highlightText() : text || "Nothing to preview"}
      </div>
    </>
  );
}
