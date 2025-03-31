import type { Route } from "./+types/home";
import Hero from "~/components/Hero";
import { FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa6";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
      <Hero />
      <div className="hero bg-base-200 min-h-96">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-left max-w-full lg:w-1/2">
            <h1 className="text-5xl font-bold">Contactez-nous!</h1>
            <p className="py-6">
              {' '}
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <span className="flex  items-center">
              <FaPhone className="h-8 m-2" /> +90 536 461 35 55
            </span>
            <span className="flex items-center">
              <FaEnvelope className="h-8 m-2" /> solitdio079@gmail.com
            </span>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <a
                href="https://wa.me/905364613555"
                target="_blank"
                className="btn h-36 w-full"
              >
                {' '}
                <FaWhatsapp className="w-36 h-36 text-green-700" />{' '}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
