import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import Reveal from "../components/Reveal";
import { volunteerSkills, availabilityOptions } from "../lib/content";

type VolunteerForm = {
  name: string;
  email: string;
  phone: string;
  city: string;
  skills: string[];
  availability: string[];
  experience: string;
  motivation: string;
};

const emptyForm: VolunteerForm = {
  name: "",
  email: "",
  phone: "",
  city: "",
  skills: [],
  availability: [],
  experience: "",
  motivation: "",
};

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
        active
          ? "bg-navy-900 text-cream-100 border-navy-900"
          : "bg-white text-navy-700 border-navy-900/15 hover:border-navy-900/40"
      }`}
    >
      {label}
    </button>
  );
}

export default function Volunteer() {
  const [form, setForm] = useState<VolunteerForm>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const toggle = (key: "skills" | "availability", value: string) => {
    setForm((f) => ({
      ...f,
      [key]: f[key].includes(value)
        ? f[key].filter((v) => v !== value)
        : [...f[key], value],
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Full name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    if (!form.phone.trim()) newErrors.phone = "Phone is required.";
    if (!form.city.trim()) newErrors.city = "City is required.";
    if (form.skills.length === 0) newErrors.skills = "Select at least one skill.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Isolated submit handler — a real integration (API / Sheets / email)
  // would replace the TODO below.
  const handleSubmit = (data: VolunteerForm) => {
    // TODO: send `data` to a backend endpoint or Google Sheets webhook.
    setSubmitted(true);
    void data;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) handleSubmit(form);
  };

  return (
    <section className="-mt-20 relative bg-cream-100 pt-40 sm:pt-48 pb-20 sm:pb-28 min-h-screen" data-header-surface="light">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {!submitted ? (
          <>
            <Reveal className="text-center mb-10">
              <p className="eyebrow mb-4">Register</p>
              <h1 className="font-serif text-3xl sm:text-4xl text-navy-900 mb-3">
                Register your interest
              </h1>
              <p className="text-navy-500 max-w-xl mx-auto leading-relaxed">
                We'll reach out when opportunities matching your skills open up.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <form
                onSubmit={onSubmit}
                className="rounded-3xl bg-white shadow-card p-6 sm:p-10 space-y-9"
              >
                <div>
                  <h3 className="font-mono text-caption tracking-widest uppercase text-gold-500 mb-5">
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-navy-900 mb-2">
                        Full name*
                      </label>
                      <input
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className="w-full rounded-xl border border-navy-900/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                      />
                      {errors.name && <p className="text-red-600 text-sm mt-1.5">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-900 mb-2">
                        Email*
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className="w-full rounded-xl border border-navy-900/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                      />
                      {errors.email && <p className="text-red-600 text-sm mt-1.5">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-900 mb-2">
                        Phone*
                      </label>
                      <input
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        className="w-full rounded-xl border border-navy-900/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                      />
                      {errors.phone && <p className="text-red-600 text-sm mt-1.5">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-900 mb-2">
                        City*
                      </label>
                      <input
                        value={form.city}
                        onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                        className="w-full rounded-xl border border-navy-900/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                      />
                      {errors.city && <p className="text-red-600 text-sm mt-1.5">{errors.city}</p>}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-mono text-caption tracking-widest uppercase text-gold-500 mb-4">
                    Skills*
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {volunteerSkills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        active={form.skills.includes(skill)}
                        onClick={() => toggle("skills", skill)}
                      />
                    ))}
                  </div>
                  {errors.skills && <p className="text-red-600 text-sm mt-2">{errors.skills}</p>}
                </div>

                <div>
                  <h3 className="font-mono text-caption tracking-widest uppercase text-gold-500 mb-4">
                    Availability
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {availabilityOptions.map((a) => (
                      <Chip
                        key={a}
                        label={a}
                        active={form.availability.includes(a)}
                        onClick={() => toggle("availability", a)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-900 mb-2">
                    Relevant experience
                  </label>
                  <textarea
                    rows={3}
                    value={form.experience}
                    onChange={(e) => setForm((f) => ({ ...f, experience: e.target.value }))}
                    placeholder="Share any relevant work, education, or past volunteering..."
                    className="w-full rounded-xl border border-navy-900/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-900 mb-2">
                    Why do you want to volunteer with YA IT?
                  </label>
                  <textarea
                    rows={3}
                    value={form.motivation}
                    onChange={(e) => setForm((f) => ({ ...f, motivation: e.target.value }))}
                    placeholder="What motivates you to serve in this way?"
                    className="w-full rounded-xl border border-navy-900/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                  />
                </div>

                <div className="flex justify-center pt-2">
                  <button type="submit" className="btn-gold !px-10 !py-4 !text-base">
                    Register Interest
                  </button>
                </div>
              </form>
            </Reveal>
          </>
        ) : (
          <Reveal className="rounded-3xl bg-white shadow-card p-10 sm:p-14 text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-gold-100 flex items-center justify-center mb-6">
              <CheckCircle2 size={32} className="text-gold-500" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-navy-900 mb-3">
              Thank you for registering!
            </h2>
            <div className="max-w-md mx-auto rounded-2xl bg-navy-900 px-7 py-8 my-7">
              <p className="font-serif italic text-lg text-gold-300 leading-relaxed">
                "Time Spent in Selfless Service opens up to God."
              </p>
              <p className="font-mono text-micro tracking-widest uppercase text-cream-100/50 mt-3">
                — Sant Rajinder Singh Ji Maharaj
              </p>
            </div>
            <p className="text-navy-500 max-w-md mx-auto text-sm leading-relaxed mb-8">
              You are now part of the YA IT seva family. Our team will review your interests
              and reach out to you when an opportunity matching your skills opens up. We are
              grateful you chose to serve with us.
            </p>
            <Link to="/" className="btn-outline-dark">
              Back to Home
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
