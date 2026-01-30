import React from "react";

export default function About({ mode }) {
  const textColor = mode === "dark" ? "text-light" : "text-dark";
  const bgColor = mode === "dark" ? "bg-dark" : "bg-light";
  const borderColor = mode === "dark" ? "border-secondary" : "";

  return (
    <div className={`container my-5 ${textColor}`}>
      <h1 className="mb-4 text-center">About Text Utility</h1>

      <p className="lead text-center">
        Text Utility is a simple and powerful web application designed to help
        users manage and analyze text efficiently.
      </p>

      <hr />

      {/* Accordion Section */}
      <div className="accordion" id="aboutAccordion">
        {/* Section 1 */}
        <div className={`accordion-item ${bgColor} ${borderColor}`}>
          <h2 className="accordion-header">
            <button
              className={`accordion-button ${mode === "dark" ? "bg-dark text-light" : ""}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
            >
              Analyze Your Text
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#aboutAccordion"
          >
            <div className="accordion-body">
              Text Utility helps you analyze your text by counting words,
              characters, and estimating reading time instantly.
            </div>
          </div>
        </div>

        {/* section 2 */}
        <div className={`accordion-item ${bgColor} ${borderColor}`}>
          <h2 className="accordion-header">
            <button
              className={`accordion-button collapsed ${mode === "dark" ? "bg-dark text-light" : ""}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
            >
              Free to Use
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#aboutAccordion"
          >
            <div className="accordion-body">
              It is completely free to use. No credit cards
              required. Use it as much as you want!
            </div>
          </div>
        </div>

        {/* section 3 */}
        <div className={`accordion-item ${bgColor} ${borderColor}`}>
          <h2 className="accordion-header">
            <button
              className={`accordion-button collapsed ${mode === "dark" ? "bg-dark text-light" : ""}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
            >
              Browser Compatible
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#aboutAccordion"
          >
            <div className="accordion-body">
              This app works smoothly on all modern browsers like Chrome,
              Firefox, Edge, and Safari.
            </div>
          </div>
        </div>
      </div>


      <footer className="text-center mt-5 text-muted">
        <hr />
        <p>© 2026 Text Utility | Built with ❤️ using React by Dev Nits</p>
      </footer>
    </div>
  );
}
