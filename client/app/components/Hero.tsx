import { Link } from "react-router";

export default function Hero() {
    return (
      <>
        <div className="hero bg-base-200 min-h-96">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img
              src="https://www.cumhuriyet.com.tr/Archive/2021/1/18/1806962/kapak_152506.jpg"
              className="h-full w-full lg:max-w-1/2 rounded-lg shadow-2xl"
            />
            <div className="lg:w-1/2">
              <div className="badge badge-soft badge-primary text-sm my-2">
                Commerce Turquie Afrique
              </div>
              <h1 className="text-5xl font-bold">
                Des Produits de qualite a bas prix!
              </h1>
              <p className="py-6">
                En tant que Haruka Mirai, nous renforçons les ponts commerciaux entre
                la Turquie et l'Afrique, Nous créons des partenariats
                commerciaux durables.
              </p>
              <Link to="/categoriesList" className="btn btn-primary">Nos Produits</Link>
            </div>
          </div>
        </div>
      </>
    )
}