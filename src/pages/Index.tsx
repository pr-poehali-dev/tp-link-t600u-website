import { useState } from "react";
import Icon from "@/components/ui/icon";

const drivers = [
  {
    os: "Windows 11 / 10",
    icon: "Monitor",
    version: "v5.2.1",
    size: "12.4 MB",
    date: "Март 2025",
  },
  {
    os: "Windows 7 / 8",
    icon: "Monitor",
    version: "v4.8.3",
    size: "9.1 MB",
    date: "Янв 2025",
  },
  {
    os: "macOS 13+",
    icon: "Apple",
    version: "v3.6.0",
    size: "14.2 MB",
    date: "Февр 2025",
  },
  {
    os: "Linux (Ubuntu/Debian)",
    icon: "Terminal",
    version: "v2.9.4",
    size: "6.8 MB",
    date: "Март 2025",
  },
];

const steps = [
  {
    number: "01",
    title: "Подключите адаптер",
    description:
      "Вставьте USB Wi-Fi адаптер в свободный порт компьютера. Дождитесь звукового сигнала Windows или появления нового устройства в трее.",
  },
  {
    number: "02",
    title: "Скачайте драйвер",
    description:
      "Выберите вашу операционную систему в разделе ниже и скачайте соответствующий драйвер. Убедитесь, что у вас достаточно свободного места на диске.",
  },
  {
    number: "03",
    title: "Запустите установщик",
    description:
      "Откройте скачанный файл от имени администратора. Следуйте инструкциям мастера установки — нажимайте «Далее» до завершения процесса.",
  },
  {
    number: "04",
    title: "Перезагрузите компьютер",
    description:
      "После установки обязательно перезагрузите компьютер. Драйвер активируется при следующем запуске системы.",
  },
  {
    number: "05",
    title: "Подключитесь к Wi-Fi",
    description:
      "В трее появится иконка беспроводной сети. Нажмите на неё, выберите вашу сеть из списка и введите пароль.",
  },
];

const faqs = [
  {
    question: "Адаптер не определяется после установки — что делать?",
    answer:
      "Попробуйте другой USB-порт. Если не помогает — удалите драйвер через «Диспетчер устройств» и установите повторно.",
  },
  {
    question: "Нужен ли интернет для скачивания драйвера?",
    answer:
      "Да. Если интернета нет вовсе — подключитесь по кабелю или скачайте драйвер на другом устройстве и перенесите на флешке.",
  },
  {
    question: "Совместим ли адаптер с Wi-Fi 6?",
    answer:
      "Зависит от модели. Проверьте характеристики на упаковке или в документации к устройству.",
  },
];

export default function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white font-golos text-[#111]">

      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#e8e8e8]">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-sm font-semibold tracking-widest uppercase text-[#111]">
            WiFi Adapter
          </span>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#drivers" className="text-sm text-[#666] hover:text-[#111] transition-colors">
              Драйверы
            </a>
            <a href="#install" className="text-sm text-[#666] hover:text-[#111] transition-colors">
              Установка
            </a>
            <a href="#faq" className="text-sm text-[#666] hover:text-[#111] transition-colors">
              FAQ
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#999] mb-4">
                USB Wi-Fi Адаптер — 2.4 / 5 ГГц
              </p>
              <h1 className="text-5xl md:text-7xl font-light leading-[1.05] text-[#111] mb-6">
                Быстрое<br />
                <span className="font-semibold">подключение</span><br />
                к сети
              </h1>
              <p className="text-base text-[#777] max-w-md leading-relaxed">
                Драйверы и пошаговая инструкция по установке адаптера для Windows, macOS и Linux.
              </p>
            </div>
            <div className="flex flex-col gap-4 items-start md:items-end shrink-0">
              <a
                href="#drivers"
                className="inline-flex items-center gap-2 bg-[#111] text-white text-sm px-6 py-3 hover:bg-[#333] transition-colors"
              >
                <Icon name="Download" size={16} />
                Скачать драйвер
              </a>
              <a
                href="#install"
                className="inline-flex items-center gap-2 text-sm text-[#666] hover:text-[#111] transition-colors"
              >
                <Icon name="BookOpen" size={14} />
                Инструкция по установке
              </a>
            </div>
          </div>

          {/* Divider stat line */}
          <div className="mt-20 pt-8 border-t border-[#e8e8e8] grid grid-cols-3 gap-8">
            {[
              { val: "300", unit: "Мбит/с", label: "Скорость" },
              { val: "5", unit: "ГГц", label: "Диапазоны" },
              { val: "10 м", unit: "", label: "Дальность" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-light text-[#111]">
                  {s.val}
                  <span className="text-base text-[#aaa] ml-1">{s.unit}</span>
                </p>
                <p className="text-xs text-[#999] tracking-widest uppercase mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Drivers */}
      <section id="drivers" className="py-20 px-6 bg-[#f7f7f7]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="text-xs tracking-[0.2em] uppercase text-[#999] mb-2">Раздел 01</p>
            <h2 className="text-3xl font-light text-[#111]">Драйверы</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#e8e8e8]">
            {drivers.map((d) => (
              <div
                key={d.os}
                className="bg-white p-8 flex items-start justify-between gap-4 group hover:bg-[#fafafa] transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-10 h-10 border border-[#e8e8e8] flex items-center justify-center shrink-0">
                    <Icon name={d.icon} size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-[#111] text-sm mb-1">{d.os}</p>
                    <p className="text-xs text-[#aaa]">
                      {d.version} · {d.size} · {d.date}
                    </p>
                  </div>
                </div>
                <button className="shrink-0 w-9 h-9 border border-[#e8e8e8] flex items-center justify-center hover:bg-[#111] hover:text-white hover:border-[#111] transition-all group-hover:border-[#ccc]">
                  <Icon name="Download" size={15} />
                </button>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-[#aaa]">
            Возникли проблемы? Напишите нам — поможем подобрать правильную версию.
          </p>
        </div>
      </section>

      {/* Installation */}
      <section id="install" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="text-xs tracking-[0.2em] uppercase text-[#999] mb-2">Раздел 02</p>
            <h2 className="text-3xl font-light text-[#111]">Инструкция по установке</h2>
          </div>
          <div className="relative">
            <div className="absolute left-[2.25rem] top-0 bottom-0 w-px bg-[#e8e8e8] hidden md:block" />
            <div className="flex flex-col gap-0">
              {steps.map((step, i) => (
                <div key={step.number} className="flex gap-8 items-start relative pb-10 last:pb-0">
                  <div className="shrink-0 w-[4.5rem] flex flex-col items-center">
                    <div className="w-11 h-11 border border-[#e8e8e8] bg-white flex items-center justify-center z-10 relative">
                      <span className="text-xs font-semibold text-[#111] tracking-wider">
                        {step.number}
                      </span>
                    </div>
                  </div>
                  <div className="pt-2 pb-2">
                    <h3 className="text-base font-semibold text-[#111] mb-2">{step.title}</h3>
                    <p className="text-sm text-[#777] leading-relaxed max-w-xl">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6 bg-[#f7f7f7]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="text-xs tracking-[0.2em] uppercase text-[#999] mb-2">Раздел 03</p>
            <h2 className="text-3xl font-light text-[#111]">Частые вопросы</h2>
          </div>
          <div className="flex flex-col gap-px bg-[#e8e8e8]">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white">
                <button
                  className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left hover:bg-[#fafafa] transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-sm font-medium text-[#111]">{faq.question}</span>
                  <Icon
                    name={openFaq === i ? "Minus" : "Plus"}
                    size={16}
                    className="shrink-0 mt-0.5 text-[#999]"
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-[#777] leading-relaxed border-t border-[#f0f0f0] pt-4">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[#e8e8e8]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <span className="text-sm font-semibold tracking-widest uppercase text-[#111]">
            WiFi Adapter
          </span>
          <p className="text-xs text-[#bbb]">
            © 2025 · Техподдержка и вопросы по установке
          </p>
        </div>
      </footer>
    </div>
  );
}
