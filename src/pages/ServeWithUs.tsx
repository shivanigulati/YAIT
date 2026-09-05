import { Link } from "react-router-dom";
import { BookOpen, TrendingUp, HeartHandshake } from "lucide-react";
import Reveal from "../components/Reveal";

const offerings = [
  { icon: BookOpen, label: "Learn", desc: "Grow your technical and creative skills through real seva." },
  { icon: TrendingUp, label: "Grow", desc: "Take on responsibility at a pace that fits your life." },
  { icon: HeartHandshake, label: "Serve", desc: "Put your talents to work for something larger than yourself." },
];

export default function ServeWithUs() {
  return (
    <section className="-mt-20 relative bg-cream-100 pt-40 sm:pt-48 pb-24 sm:pb-32 min-h-screen flex items-center" data-header-surface="light">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <p className="eyebrow mb-5">Serve with Us</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-navy-900 leading-tight mb-7">
            Everyone has <span className="italic text-gold-500">something unique</span> to
            offer.
          </h1>
          <p className="text-navy-500 leading-relaxed text-body sm:text-base mb-4">
            At YA IT, seva is more than contributing your skills — it is becoming part of a
            family that learns, grows, and serves together. Whether you are just beginning
            or already have experience, you will find opportunities to develop your
            abilities, collaborate with like-minded volunteers, and make a meaningful impact
            through technology — all at a pace that fits your schedule.
          </p>
          <p className="text-navy-500 leading-relaxed text-body sm:text-base mb-12">
            Find your interest, join our seva team, and be part of this beautiful journey.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
          {offerings.map((o) => (
            <div
              key={o.label}
              className="rounded-2xl bg-white border border-navy-900/10 shadow-soft px-6 py-8"
            >
              <o.icon size={26} className="text-gold-500 mx-auto mb-4" />
              <p className="font-serif text-lg text-navy-900 mb-1.5">{o.label}</p>
              <p className="text-sm text-navy-500 leading-relaxed">{o.desc}</p>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.2}>
          <Link to="/volunteer" className="btn-gold !px-10 !py-4 !text-base">
            Become a Volunteer
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
