import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";

const UPLOAD_URL = "https://functions.poehali.dev/62b84cd5-8e0c-4754-a253-d0da835922e6";

const OS_OPTIONS = [
  "Windows 11 / 10",
  "Windows 7 / 8",
  "macOS 13+",
  "Linux (Ubuntu/Debian)",
];

interface UploadState {
  status: "idle" | "uploading" | "success" | "error";
  message: string;
}

export default function Admin() {
  const [osName, setOsName] = useState(OS_OPTIONS[0]);
  const [version, setVersion] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [state, setState] = useState<UploadState>({ status: "idle", message: "" });
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    if (!file || !version.trim()) {
      setState({ status: "error", message: "Выберите файл и укажите версию" });
      return;
    }

    setState({ status: "uploading", message: "Загружаем файл..." });

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(",")[1];
      const res = await fetch(UPLOAD_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          os_name: osName,
          version,
          file_data: base64,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setState({ status: "success", message: `Файл загружен · ${data.size_mb} МБ` });
        setFile(null);
        setVersion("");
        if (fileRef.current) fileRef.current.value = "";
      } else {
        setState({ status: "error", message: data.error || "Ошибка загрузки" });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-white font-golos text-[#111]">
      <header className="border-b border-[#e8e8e8] px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 text-sm text-[#666] hover:text-[#111] transition-colors">
          <Icon name="ArrowLeft" size={16} />
          На сайт
        </a>
        <span className="text-sm font-semibold tracking-widest uppercase">Админ-панель</span>
        <div className="w-20" />
      </header>

      <main className="max-w-xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-light text-[#111] mb-2">Загрузка драйвера</h1>
        <p className="text-sm text-[#999] mb-10">
          Загрузите файл драйвера — он сразу появится на сайте в разделе скачивания.
        </p>

        <div className="flex flex-col gap-6">
          {/* OS Select */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#999] mb-2">
              Операционная система
            </label>
            <select
              value={osName}
              onChange={(e) => setOsName(e.target.value)}
              className="w-full border border-[#e8e8e8] px-4 py-3 text-sm text-[#111] bg-white focus:outline-none focus:border-[#111] transition-colors"
            >
              {OS_OPTIONS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          {/* Version */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#999] mb-2">
              Версия драйвера
            </label>
            <input
              type="text"
              placeholder="например: v5.2.1"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="w-full border border-[#e8e8e8] px-4 py-3 text-sm text-[#111] placeholder:text-[#ccc] focus:outline-none focus:border-[#111] transition-colors"
            />
          </div>

          {/* File */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#999] mb-2">
              Файл драйвера
            </label>
            <div
              className="border border-dashed border-[#e8e8e8] p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-[#ccc] transition-colors"
              onClick={() => fileRef.current?.click()}
            >
              <Icon name="UploadCloud" size={28} className="text-[#ccc]" />
              {file ? (
                <div className="text-center">
                  <p className="text-sm font-medium text-[#111]">{file.name}</p>
                  <p className="text-xs text-[#aaa] mt-1">{(file.size / (1024 * 1024)).toFixed(1)} МБ</p>
                </div>
              ) : (
                <p className="text-sm text-[#aaa]">Нажмите чтобы выбрать файл</p>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              className="hidden"
              onChange={(e) => {
                setFile(e.target.files?.[0] || null);
                setState({ status: "idle", message: "" });
              }}
            />
          </div>

          {/* Status */}
          {state.status !== "idle" && (
            <div
              className={`flex items-center gap-3 px-4 py-3 text-sm ${
                state.status === "success"
                  ? "bg-[#f0faf0] text-[#1a7a1a]"
                  : state.status === "error"
                  ? "bg-[#fff0f0] text-[#b00]"
                  : "bg-[#f7f7f7] text-[#666]"
              }`}
            >
              <Icon
                name={
                  state.status === "success"
                    ? "CheckCircle"
                    : state.status === "error"
                    ? "AlertCircle"
                    : "Loader"
                }
                size={16}
              />
              {state.message}
            </div>
          )}

          {/* Button */}
          <button
            onClick={handleUpload}
            disabled={state.status === "uploading"}
            className="bg-[#111] text-white text-sm px-6 py-3 hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {state.status === "uploading" ? (
              <>
                <Icon name="Loader" size={16} />
                Загрузка...
              </>
            ) : (
              <>
                <Icon name="Upload" size={16} />
                Загрузить драйвер
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  );
}
