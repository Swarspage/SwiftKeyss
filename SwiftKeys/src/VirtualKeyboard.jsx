import React, { useEffect, useState, useRef } from "react";

const VirtualKeyboard = ({ textareaId }) => {
  const KEY_ROWS = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
  ];

  const [pressed, setPressed] = useState(new Set());
  const containerRef = useRef(null);

  // find textarea: either by id or first on page
  const getTextarea = () => {
    if (textareaId) {
      return document.getElementById(textareaId);
    }
    return document.querySelector("textarea");
  };

  // helpers to mark/unmark keys in Set state
  const markKey = (k) => {
    setPressed((s) => {
      const copy = new Set(s);
      copy.add(k);
      return copy;
    });
  };
  const unmarkKey = (k) => {
    setPressed((s) => {
      const copy = new Set(s);
      copy.delete(k);
      return copy;
    });
  };

  // normalize key strings for matching
  const normalizeKey = (raw) => {
    if (!raw) return "";
    if (raw === " ") return "space";
    return String(raw).toLowerCase();
  };

  // physical keyboard highlight handlers
  useEffect(() => {
    const down = (e) => {
      const k = normalizeKey(e.key);
      markKey(k);
    };
    const up = (e) => {
      const k = normalizeKey(e.key);
      unmarkKey(k);
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // insert text in textarea at caret
  const insertAtCaret = (ta, text) => {
    if (!ta) return;
    const start = ta.selectionStart ?? ta.value.length;
    const end = ta.selectionEnd ?? ta.value.length;
    const before = ta.value.slice(0, start);
    const after = ta.value.slice(end);
    ta.value = before + text + after;
    const newPos = start + text.length;
    ta.selectionStart = ta.selectionEnd = newPos;
    ta.focus();
    ta.dispatchEvent(new Event("input", { bubbles: true }));
  };

  // handle backspace
  const handleBackspace = (ta) => {
    if (!ta) return;
    const start = ta.selectionStart ?? ta.value.length;
    const end = ta.selectionEnd ?? ta.value.length;
    if (start === end && start > 0) {
      const before = ta.value.slice(0, start - 1);
      const after = ta.value.slice(end);
      ta.value = before + after;
      ta.selectionStart = ta.selectionEnd = start - 1;
    } else {
      const before = ta.value.slice(0, start);
      const after = ta.value.slice(end);
      ta.value = before + after;
      ta.selectionStart = ta.selectionEnd = start;
    }
    ta.focus();
    ta.dispatchEvent(new Event("input", { bubbles: true }));
  };

  // click handler for virtual keys
  const onVirtualKey = (key) => {
    const ta = getTextarea();
    const norm = normalizeKey(key);
    // highlight briefly
    markKey(norm);
    setTimeout(() => unmarkKey(norm), 120);

    if (!ta) return;
    if (norm === "enter") {
      insertAtCaret(ta, "\n");
    } else if (norm === "backspace") {
      handleBackspace(ta);
    } else if (norm === "space") {
      insertAtCaret(ta, " ");
    } else {
      insertAtCaret(ta, key);
    }
  };

  const isPressed = (k) => pressed.has(k);

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 flex justify-center items-center font-[Quicksand]">
      <div
        ref={containerRef}
        className="mt-4 p-3 text-[white] font-[Quicksand] shadow-2xl border-black border-solid border-[0.1px] rounded-2xl"
        style={{ width: 760 }} // fixed width — not responsive as requested
      >
        {KEY_ROWS.map((row, rIdx) => (
          <div key={rIdx} className="flex justify-center mb-2">
            {row.map((k) => (
              <button
                key={k}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onVirtualKey(k);
                }}
                className={`w-12 h-12 m-1 rounded-md flex items-center justify-center text-white select-none
                ${
                  isPressed(normalizeKey(k))
                    ? "bg-[#e4e2de92] text-black"
                    : "text-[white]  bg-[#e2dfdb0c]"
                }`}
                type="button"
              >
                {k}
              </button>
            ))}
          </div>
        ))}

        <div className="flex justify-center mt-2">
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              onVirtualKey("backspace");
            }}
            className={`w-28 h-12 m-1 rounded-md flex items-center justify-center text-white select-none
            ${
              isPressed("backspace")
                ? "bg-[#e4e2de92] text-black"
                : "text-[white]  bg-[#e2dfdb0c]"
            }`}
            type="button"
          >
            Backspace
          </button>

          <button
            onMouseDown={(e) => {
              e.preventDefault();
              onVirtualKey("space");
            }}
            className={`w-56 h-12 m-1 rounded-md flex items-center justify-center text-white select-none
            ${
              isPressed("space")
                ? "bg-[#e4e2de92] text-black"
                : "text-[white]  bg-[#e2dfdb0c]"
            }`}
            type="button"
          >
            Space
          </button>

          <button
            onMouseDown={(e) => {
              e.preventDefault();
              onVirtualKey("enter");
            }}
            className={`w-28 h-12 m-1 rounded-md flex items-center justify-center text-white select-none
            ${
              isPressed("enter")
                ? "bg-[#e4e2de92] text-black"
                : "text-[white]  bg-[#e2dfdb0c]"
            }`}
            type="button"
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
};

export default VirtualKeyboard;
