import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import UploadForm from "./UploadForm";
import { Link } from "react-router-dom";

export default function Editor() {
  const [markdown, setMarkdown] = useState("");
  const [metadataForm, setMetadataForm] = useState(false);

  const handleUpload = (e) => {
    e.preventDefault();
    setMetadataForm(true);
  };

  // Improved handleFormat to support all buttons and preserve text
  const handleFormat = (symbol) => {
    const textarea = document.getElementById("editor");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = markdown.substring(start, end) || (symbol === "**" ? "bold" : symbol === "_" ? "italic" : "");
    const before = markdown.substring(0, start);
    const after = markdown.substring(end);

    let formatted = "";
    if (symbol === "**") {
      formatted = `${before}**${selectedText}**${after}`;
    } else if (symbol === "_") {
      formatted = `${before}_${selectedText}_${after}`;
    } else if (symbol === "# ") {
      // Heading: add at start of line
      const lineStart = markdown.lastIndexOf('\n', start - 1) + 1;
      formatted = `${markdown.substring(0, lineStart)}# ${markdown.substring(lineStart, end)}${markdown.substring(end)}`;
    } else if (symbol === "![]()") {
      
      formatted = `${before}![](${selectedText})${after}`;
      console.log("Formated: " + formatted);
    } else if (symbol === "`") {
      formatted = `${before}\`${selectedText}\`${after}`;
    } else if (symbol === "> ") {
      formatted = `${before}> ${selectedText}${after}`;
    } else if (symbol === "- ") {
      formatted = `${before}- ${selectedText}${after}`;
    } else {
      formatted = markdown;
    }

    setMarkdown(formatted);

    setTimeout(() => {
      textarea.focus();
      // Place cursor inside the formatted text
      if (symbol === "**" || symbol === "_" || symbol === "`") {
        textarea.setSelectionRange(
          start + symbol.length,
          start + symbol.length + selectedText.length
        );
      } else if (symbol === "![]()") {
        // Place cursor inside url
        const linkStart = before.length + selectedText.length + 3;
        textarea.setSelectionRange(linkStart, linkStart + 3);
        console.log(linkStart)
      } else if (symbol === "# ") {
        // Place cursor at the end of the heading
        textarea.setSelectionRange(start + 2, end + 2);
      } else if (symbol === "> " || symbol === "- ") {
        textarea.setSelectionRange(start + symbol.length, start + symbol.length + selectedText.length);
      } else {
        textarea.setSelectionRange(start, start + selectedText.length);
      }
    }, 0);
  };

  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row w-full h-full gap-4 p-4 bg-[#181b20]">
        {/* Editor area */}
        <div className="w-full md:w-1/2">
          <textarea
            id="editor"
            className="w-full h-[30rem] p-4 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-blue-400 transition"
            value={markdown}
            onChange={handleChange}
            placeholder="Type markdown here..."
          />
        </div>
        {/* Formatting buttons */}
        <div
          className="flex flex-col justify-start items-end md:items-center space-y-4 ml-4 max-h-[36rem]"
          style={{ scrollbarWidth: "thin" }}
        >
          {/* Bold */}
          <button
            onClick={() => handleFormat("**")}
            className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-xl font-extrabold rounded-full shadow-lg transition duration-150 flex items-center justify-center"
            title="Bold"
          >
            <span className="font-bold">B</span>
          </button>
          {/* Italic */}
          <button
            onClick={() => handleFormat("_")}
            className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-xl italic font-extrabold rounded-full shadow-lg transition duration-150 flex items-center justify-center"
            title="Italic">
            <span className="italic">I</span>
          </button>
          {/* Heading */}
          <button
            onClick={() => handleFormat("# ")}
            className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xl font-extrabold rounded-full shadow-lg transition duration-150 flex items-center justify-center"
            title="Heading"
          >
            <span className="font-bold text-lg">H</span>
          </button>
          {/* Link */}
          <button
            onClick={() => handleFormat("![]()")}
            className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white text-lg font-extrabold rounded-full shadow-lg transition duration-150 flex items-center justify-center"
            title="Image"
          >
            <span>🔗</span>
          </button>
          {/* Code */}
          <button
            onClick={() => handleFormat("`")}
            className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 text-white text-lg font-mono rounded-full shadow-lg transition duration-150 flex items-center justify-center"
            title="Inline Code"
          >
            <span>{'{' + '}'}</span>
          </button>
          {/* Blockquote */}
          <button
            onClick={() => handleFormat("> ")}
            className="w-10 h-10 bg-gradient-to-br from-lime-500 to-green-700 hover:from-lime-600 hover:to-green-800 text-white text-lg font-extrabold rounded-full shadow-lg transition duration-150 flex items-center justify-center"
            title="Blockquote"
          >
            <span>&quot;</span>
          </button>
          {/* List */}
          <button
            onClick={() => handleFormat("- ")}
            className="w-10 h-10 bg-gradient-to-br from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white text-lg font-extrabold rounded-full shadow-lg transition duration-150 flex items-center justify-center"
            title="List"
          >
            <span>&bull;</span>
          </button>
          {/* Upload button */}
          <button onClick={handleUpload} type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" data-hs-file-upload-trigger="">
          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" x2="12" y1="3" y2="15"></line>
          </svg>
          Upload
        </button>

        {/* Delete button */}
            <Link to={'/admin/deleteBlogs'} type="button" className="flex items-center gap-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow transition duration-150" title="Delete">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
            Delete
          </Link>
        </div>
        {/* Preview area */}
        <div className="w-full md:w-1/2">
          <div className="p-4 border rounded bg-gray-50  h-[30rem] overflow-auto">
            <div className="prose prose-sm md:prose lg:prose-lg max-w-none">
              <ReactMarkdown children={markdown} />
            </div>
          </div>
        </div>
         </div>

        {
        metadataForm && <div className="fixed inset-x-96 m-16 inset-y-40 z-50 flex items-center justify-center">
            <UploadForm setMetadataForm={setMetadataForm} markdown={markdown}/>
        </div>
        }


    </>
  );
}