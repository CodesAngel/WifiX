import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const FileUploadZone = ({
  fileInputRef,
  onUpload,
  onFileSelect,
  pinProtectionEnabled,
  pinPrepared = false,
  onTogglePinProtection,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFileUpload(e);
  };

  const handleFileUpload = (e) => {
    const files = e.target?.files || e.dataTransfer?.files;
    console.log("handleFileUpload called, files:", files);

    if (files && files.length > 0) {
      // Update the file input ref to contain the selected files for drag-drop
      if (fileInputRef.current && e.dataTransfer?.files) {
        fileInputRef.current.files = e.dataTransfer.files;
      }

      // Update selected files display
      const fileArray = Array.from(files);
      setSelectedFiles(fileArray);
      console.log(
        "Files selected:",
        fileArray.map((f) => f.name)
      );

      if (onFileSelect) {
        onFileSelect(files);
      }
    }
  };

  const handleClearFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setSelectedFiles([]);
    if (onFileSelect) {
      onFileSelect([]);
    }
    console.log("Files cleared");
  };

  // Handle clipboard paste
  useEffect(() => {
    const handlePaste = async (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      const imageFiles = [];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.indexOf("image") !== -1) {
          const blob = item.getAsFile();
          if (blob) {
            // Generate a unique filename
            const timestamp = new Date().getTime();
            const extension = item.type.split("/")[1] || "png";
            const fileName = `pasted-screenshot-${timestamp}.${extension}`;

            // Create a File object from the blob with a proper name
            const file = new File([blob], fileName, { type: item.type });
            imageFiles.push(file);
          }
        }
      }

      if (imageFiles.length > 0) {
        // Update the file input ref
        const dataTransfer = new DataTransfer();

        // Add existing selected files first
        if (selectedFiles.length > 0) {
          selectedFiles.forEach((file) => dataTransfer.items.add(file));
        }

        // Add the pasted images
        imageFiles.forEach((file) => dataTransfer.items.add(file));

        if (fileInputRef.current) {
          fileInputRef.current.files = dataTransfer.files;
        }

        // Update selected files display
        const allFiles = [...selectedFiles, ...imageFiles];
        setSelectedFiles(allFiles);

        if (onFileSelect) {
          onFileSelect(dataTransfer.files);
        }

        toast.success(
          `📋 ${imageFiles.length} screenshot${
            imageFiles.length > 1 ? "s" : ""
          } pasted!`,
          {
            duration: 3000,
          }
        );

        console.log(
          "Pasted images:",
          imageFiles.map((f) => f.name)
        );
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [selectedFiles, fileInputRef, onFileSelect]);

  return (
    <section
      data-tour="upload-zone"
      className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-lg shadow-sm dark:shadow-blue-900/20 p-4 sm:p-5 md:p-6 flex flex-col border border-slate-200 dark:border-slate-800 min-w-0"
    >
      <div className="mb-4 flex flex-col gap-2 border-b border-slate-200 pb-3 dark:border-slate-700 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg md:text-xl font-bold text-blue-600 dark:text-blue-400">
          Upload Files
        </h2>
        <span
          className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold ${
            pinProtectionEnabled
              ? pinPrepared
                ? "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-300"
                : "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300"
              : "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          }`}
        >
          {pinProtectionEnabled
            ? pinPrepared
              ? "PIN ready"
              : "PIN needed"
            : "No PIN"}
        </span>
      </div>

      {/* Clipboard hint */}
      <div className="mb-3 hidden text-center sm:block">
        <p className="text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center justify-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          💡 Tip: Press{" "}
          <kbd className="px-2 py-0.5 text-xs font-semibold bg-gray-200 dark:bg-slate-800 rounded">
            Ctrl+V
          </kbd>{" "}
          to paste screenshots
        </p>
      </div>

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
        className={`border-2 border-dashed rounded-xl min-h-56 flex-1 flex items-center justify-center p-5 sm:p-8 md:p-10 text-center cursor-pointer transition-all ${
          dragActive
            ? "border-blue-400 bg-blue-50 dark:bg-blue-900"
            : selectedFiles.length > 0
            ? "border-green-300 bg-green-50/60 dark:border-green-900 dark:bg-green-950/20"
            : "border-gray-300 dark:border-slate-700"
        }`}
      >
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
        />
        <div className="text-sm sm:text-base md:text-lg min-w-0 max-w-full">
          {selectedFiles.length > 0 ? (
            <div className="space-y-2">
              <p className="text-green-600 font-semibold">
                ✓ {selectedFiles.length} File
                {selectedFiles.length > 1 ? "s" : ""} Selected:
              </p>
              <div className="max-h-32 overflow-y-auto px-1 sm:px-4">
                {selectedFiles.map((file, idx) => (
                  <p
                    key={idx}
                    className="text-sm text-slate-700 dark:text-slate-200 break-all"
                  >
                    {idx + 1}. {file.name} ({(file.size / 1024).toFixed(2)} KB)
                  </p>
                ))}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClearFile();
                }}
                className="mt-2 text-sm text-red-600 hover:text-red-700 underline"
              >
                Clear Selection
              </button>
            </div>
          ) : (
            <p>
              Drag & drop files here or{" "}
              <span className="text-blue-600 font-semibold">
                click to select
              </span>
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {/* PIN Protection Toggle */}
        <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="min-w-0 text-left">
            <label
              htmlFor="pinProtection"
              className="block cursor-pointer select-none text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              PIN Protection
            </label>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {pinProtectionEnabled
                ? pinPrepared
                  ? "A PIN is set for the next upload."
                  : "You will set a PIN before upload starts."
                : "Files upload without a PIN."}
            </p>
          </div>
          <input
            type="checkbox"
            id="pinProtection"
            checked={pinProtectionEnabled}
            onChange={onTogglePinProtection}
            className="h-5 w-5 shrink-0 cursor-pointer rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
          />
        </div>

        {/* Upload Button */}
        <div className="flex justify-center">
          <button
            onClick={onUpload}
            className="min-h-12 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-semibold transition w-full sm:w-auto"
          >
            {pinProtectionEnabled && !pinPrepared
              ? "Set PIN"
              : pinPrepared
              ? "Upload with PIN"
              : "Upload"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FileUploadZone;
