import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CheckCircle2, ChevronLeft } from "lucide-react";
import StepIndicator from "../StepIndicator";
import Reveal from "../Reveal";
import Watermark from "../Watermark";
import { serviceCategories } from "../../lib/content";

type FormState = {
  services: string[];
  date: string;
  time: string;
  description: string;
  name: string;
  email: string;
  phone: string;
  department: string;
};

const emptyForm: FormState = {
  services: [],
  date: "",
  time: "",
  description: "",
  name: "",
  email: "",
  phone: "",
  department: "",
};

const steps = ["Services", "Date", "Details", "Review"];

function generateTicketId() {
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `YAIT-${digits}`;
}

export default function GetSupport() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [ticketId, setTicketId] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleService = (name: string) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(name)
        ? f.services.filter((s) => s !== name)
        : [...f.services, name],
    }));
  };

  const validateStep = (s: number) => {
    const newErrors: Record<string, string> = {};
    if (s === 1 && form.services.length === 0) {
      newErrors.services = "Please select at least one service.";
    }
    if (s === 3) {
      if (!form.description.trim()) newErrors.description = "Please describe your request.";
      if (!form.name.trim()) newErrors.name = "Your name is required.";
      if (!form.email.trim()) newErrors.email = "Your email is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goNext = () => {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, 5));
  };
  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  // Isolated submit handler — this is where a real integration (API call,
  // Google Sheets append, or email notification) would be wired in.
  const handleSubmit = (data: FormState) => {
    // TODO: replace with a real backend call, e.g.
    // await fetch("/api/support-requests", { method: "POST", body: JSON.stringify(data) })
    const id = generateTicketId();
    setTicketId(id);
    setStep(5);
    void data;
  };

  const resetForm = () => {
    setForm(emptyForm);
    setErrors({});
    setStep(1);
    setTicketId("");
  };

  return (
    <section
      id="get-support"
      className="relative overflow-hidden bg-gradient-to-b from-cream-50 via-cream-100 to-cream-200 py-24 sm:py-32"
      data-header-surface="light"
    >
      <Watermark className="text-navy-900" />
      {/* Soft ambient colour wash behind the glass card */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-16 h-[420px] w-[420px] rounded-full bg-gold-400/25 blur-[120px]" />
        <div className="absolute bottom-0 -left-24 h-[380px] w-[380px] rounded-full bg-navy-400/15 blur-[110px]" />
        <div className="absolute top-1/2 left-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-300/15 blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-10">
          <p className="eyebrow text-gold-800 font-semibold mb-4">Get Support</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-navy-900 leading-tight">
            Raise a request. <span className="italic text-gold-600">We will take it from here.</span>
          </h2>
          <p className="mt-5 text-navy-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            No request is too small, and no seva opportunity is too big. Whether you need
            support with your online setup, an offline event, automation, website design, or
            a technical challenge — simply describe your requirement, and we will take care
            of the same.
          </p>
        </Reveal>

        <div className="rounded-3xl bg-navy-950/95 backdrop-blur-xl border border-white/10 shadow-[0_25px_70px_-20px_rgba(0,0,0,0.6)] p-6 sm:p-10">
          {step <= 4 && <StepIndicator steps={steps} current={step} />}
          {step <= 4 && (
            <p className="font-mono text-caption tracking-widest uppercase text-cream-100/40 -mt-4 mb-6">
              Step {step} of 4
            </p>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.3 }}
            >
              {step === 1 && (
                <div>
                  <h2 className="font-serif text-2xl text-cream-100 mb-1">What do you need?</h2>
                  <p className="text-cream-100/60 text-sm mb-7">
                    Select one or more services. Pick as many as apply.
                  </p>

                  <div className="space-y-8">
                    {serviceCategories.map((cat) => (
                      <div key={cat.id}>
                        <h3 className="font-mono text-caption tracking-widest uppercase text-gold-500 mb-3">
                          {cat.shortLabel}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {cat.subServices.map((sub) => {
                            const checked = form.services.includes(sub.name);
                            return (
                              <label
                                key={sub.name}
                                className={`btn-press flex items-center gap-3 rounded-xl border px-4 py-3 cursor-pointer transition-colors ${
                                  checked
                                    ? "border-gold-400 bg-navy-900 shadow-[0_0_16px_rgba(228,189,76,0.3)]"
                                    : "border-navy-700 bg-navy-800 hover:bg-navy-700 hover:border-navy-600"
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() => toggleService(sub.name)}
                                  className="sr-only"
                                />
                                <span
                                  aria-hidden="true"
                                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                                    checked
                                      ? "bg-gold-400 border-gold-400"
                                      : "bg-navy-900/50 border-cream-100/25"
                                  }`}
                                >
                                  {checked && <Check size={13} strokeWidth={3} className="text-navy-900" />}
                                </span>
                                <span className="text-sm text-cream-100">{sub.name}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.services && (
                    <p className="text-red-600 text-sm mt-4">{errors.services}</p>
                  )}

                  <div className="mt-9 flex justify-end">
                    <button
                      onClick={goNext}
                      disabled={form.services.length === 0}
                      className="btn-gold disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="font-serif text-2xl text-cream-100 mb-1">
                    When is this needed?
                  </h2>
                  <p className="text-cream-100/60 text-sm mb-7">
                    Enter the session or event date, if applicable.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-cream-100 mb-2">
                        Session / Event Date
                      </label>
                      <input
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                        className="w-full rounded-xl border border-navy-700 bg-navy-800 px-4 py-3 text-sm text-cream-100 [color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-gold-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-cream-100 mb-2">
                        Preferred Time
                      </label>
                      <input
                        type="time"
                        value={form.time}
                        onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                        className="w-full rounded-xl border border-navy-700 bg-navy-800 px-4 py-3 text-sm text-cream-100 [color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-gold-400"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-cream-100/40 mt-4">
                    Leave blank for non-date-specific requests.
                  </p>

                  <div className="mt-9 flex justify-between">
                    <button onClick={goBack} className="btn-outline-light">
                      <ChevronLeft size={16} /> Back
                    </button>
                    <button onClick={goNext} className="btn-gold">
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="font-serif text-2xl text-cream-100 mb-1">Tell us more</h2>
                  <p className="text-cream-100/60 text-sm mb-7">
                    Describe your request and share your contact details.
                  </p>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-cream-100 mb-2">
                        Description*
                      </label>
                      <textarea
                        rows={4}
                        value={form.description}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, description: e.target.value }))
                        }
                        placeholder="Describe your session, what you need, any special requirements..."
                        className="w-full rounded-xl border border-navy-700 bg-navy-800 px-4 py-3 text-sm text-cream-100 placeholder:text-cream-100/35 focus:outline-none focus:ring-2 focus:ring-gold-400"
                      />
                      {errors.description && (
                        <p className="text-red-600 text-sm mt-1.5">{errors.description}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-cream-100 mb-2">
                          Your Name*
                        </label>
                        <input
                          value={form.name}
                          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                          className="w-full rounded-xl border border-navy-700 bg-navy-800 px-4 py-3 text-sm text-cream-100 focus:outline-none focus:ring-2 focus:ring-gold-400"
                        />
                        {errors.name && (
                          <p className="text-red-600 text-sm mt-1.5">{errors.name}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-cream-100 mb-2">
                          Email*
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                          className="w-full rounded-xl border border-navy-700 bg-navy-800 px-4 py-3 text-sm text-cream-100 focus:outline-none focus:ring-2 focus:ring-gold-400"
                        />
                        {errors.email && (
                          <p className="text-red-600 text-sm mt-1.5">{errors.email}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-cream-100 mb-2">
                          Phone
                        </label>
                        <input
                          value={form.phone}
                          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                          className="w-full rounded-xl border border-navy-700 bg-navy-800 px-4 py-3 text-sm text-cream-100 focus:outline-none focus:ring-2 focus:ring-gold-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-cream-100 mb-2">
                          Department / Centre
                        </label>
                        <input
                          value={form.department}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, department: e.target.value }))
                          }
                          placeholder="e.g. Young Adults, GDLP"
                          className="w-full rounded-xl border border-navy-700 bg-navy-800 px-4 py-3 text-sm text-cream-100 placeholder:text-cream-100/35 focus:outline-none focus:ring-2 focus:ring-gold-400"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-9 flex justify-between">
                    <button onClick={goBack} className="btn-outline-dark">
                      <ChevronLeft size={16} /> Back
                    </button>
                    <button onClick={goNext} className="btn-gold">
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h2 className="font-serif text-2xl text-cream-100 mb-1">Review your request</h2>
                  <p className="text-cream-100/60 text-sm mb-7">
                    Please verify your details before submitting.
                  </p>

                  <div className="space-y-4">
                    {[
                      { label: "Services", value: form.services.join(", ") || "—" },
                      {
                        label: "Date & Time",
                        value:
                          [form.date, form.time].filter(Boolean).join(" at ") ||
                          "Not specified",
                      },
                      { label: "Description", value: form.description || "—" },
                      {
                        label: "Contact",
                        value: [form.name, form.email, form.phone]
                          .filter(Boolean)
                          .join(" · "),
                      },
                    ].map((row) => (
                      <div
                        key={row.label}
                        className="rounded-xl border border-navy-700 bg-navy-800 px-5 py-4"
                      >
                        <p className="font-mono text-micro tracking-widest uppercase text-gold-400 mb-1.5">
                          {row.label}
                        </p>
                        <p className="text-sm text-cream-100 leading-relaxed">{row.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-9 flex justify-between">
                    <button onClick={goBack} className="btn-outline-dark">
                      <ChevronLeft size={16} /> Back
                    </button>
                    <button onClick={() => handleSubmit(form)} className="btn-gold">
                      Submit Request
                    </button>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="text-center py-6">
                  <div className="mx-auto h-16 w-16 rounded-full bg-gold-100 flex items-center justify-center mb-6">
                    <CheckCircle2 size={32} className="text-gold-500" />
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-cream-100 mb-2">
                    Request submitted
                  </h2>
                  <p className="text-cream-100/60 max-w-md mx-auto mb-6 leading-relaxed">
                    Your support request has been received. Our team will reach out to you
                    shortly.
                  </p>

                  <div className="inline-block font-mono text-xs tracking-widest uppercase text-gold-300 bg-navy-800 border border-gold-400/40 rounded-full px-4 py-2 mb-8">
                    Ticket · {ticketId}
                  </div>

                  <div className="max-w-md mx-auto rounded-2xl bg-navy-800 border border-gold-400/20 px-7 py-8 mb-8">
                    <p className="font-serif italic text-lg text-gold-300 leading-relaxed">
                      "Where there is love, there is service."
                    </p>
                    <p className="font-mono text-micro tracking-widest uppercase text-cream-100/50 mt-3">
                      — Sant Darshan Singh Ji Maharaj
                    </p>
                  </div>

                  <p className="text-cream-100/60 max-w-md mx-auto text-sm leading-relaxed mb-8">
                    Thank you for reaching out to SOS YA IT and giving us the opportunity to
                    serve. We are grateful to be part of this seva journey and will get back
                    to you soon.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <button onClick={resetForm} className="btn-gold">
                      Submit another request
                    </button>
                    <button
                      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                      className="btn-outline-light"
                    >
                      Back to Top
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
