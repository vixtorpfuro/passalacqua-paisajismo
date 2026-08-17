import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getProyectosByType, urlFor } from "@/lib/sanity-fetch";

export const revalidate = 60;

type Servicio = {
  slug: string;
  label: string;
  color: string;
  sanityType?: string;
  intro: string;
  parrafos: string[];
};

const SERVICIOS: Servicio[] = [
  {
    slug: "diseno-de-jardin",
    label: "Diseño de Jardín",
    color: "#e8603c",
    intro: "Transformamos el espacio exterior en una extensión del interior. Cada proyecto comienza con una escucha atenta del lugar y de quienes lo habitan.",
    parrafos: [
      "El diseño de jardín es el corazón de lo que hacemos. Desde el primer encuentro con el terreno hasta la entrega del proyecto ejecutivo, acompañamos cada etapa con rigor técnico y sensibilidad estética.",
      "Desarrollamos una memoria descriptiva completa que incluye paleta vegetal, criterios de materialidad, sistema de riego, iluminación y estructura espacial. Cada decisión responde a la orientación solar, las condiciones climáticas y el estilo de vida de las personas que van a habitar el jardín.",
      "El resultado es un espacio que crece con el tiempo — que madura, que cambia con las estaciones y que, sobre todo, pertenece al lugar donde está.",
    ],
  },
  {
    slug: "residencial",
    label: "Residencial",
    color: "#e8963c",
    sanityType: "Residencial",
    intro: "Jardines privados que nacen de la identidad de quienes los habitan. Espacios pensados para la vida cotidiana, para el descanso y para el encuentro.",
    parrafos: [
      "Trabajamos con residencias de todo tipo — casas en la ciudad, parcelas en el campo, departamentos con terrazas. En cada caso, el punto de partida es el mismo: conocer a fondo el lugar y a las personas que lo van a vivir.",
      "Diseñamos con plantas que se adaptan al clima local, que requieren un mantenimiento razonable y que ofrecen color, textura y movimiento durante todo el año. Priorizamos especies nativas y mediterráneas que dialogan con el paisaje chileno.",
      "Cada jardín residencial que firmamos es único. No aplicamos fórmulas — construimos una propuesta que responde específicamente a ese terreno, esa casa y esa familia.",
    ],
  },
  {
    slug: "corporativo",
    label: "Corporativo",
    color: "#c8d44e",
    sanityType: "Corporativo",
    intro: "Paisajismo que mejora la experiencia de las personas y proyecta la identidad de las organizaciones. Diseño que trabaja para las personas, no solo para la imagen.",
    parrafos: [
      "Los espacios verdes en entornos corporativos tienen un impacto directo en el bienestar, la productividad y la percepción de quienes trabajan y visitan esos lugares. Lo hemos comprobado en cada proyecto que hemos desarrollado.",
      "Diseñamos jardines para oficinas, edificios de uso mixto, clínicas y espacios institucionales. Entendemos las restricciones técnicas de estos proyectos — mantenimiento, durabilidad, acceso, normativa — y las incorporamos desde el inicio del diseño.",
      "El verde bien diseñado no es un lujo: es una inversión en la calidad del ambiente de trabajo y en la huella que la organización deja en quienes la habitan.",
    ],
  },
  {
    slug: "hoteleria",
    label: "Hotelería",
    color: "#5abeaa",
    sanityType: "Hotelería y Entretenimiento",
    intro: "El jardín como parte de la experiencia de hospedaje. Diseñamos paisajes que se convierten en el recuerdo que los huéspedes llevan consigo.",
    parrafos: [
      "En hoteles, lodges y centros de descanso, el paisaje no es un complemento — es parte del servicio. La primera impresión al llegar, la vista desde la habitación, el camino al desayuno: todo eso es diseño de paisaje.",
      "Trabajamos con equipos de arquitectura, interiorismo y operaciones hoteleras para integrar el jardín de forma coherente con la propuesta de valor del proyecto. Entendemos los tiempos de construcción, los requerimientos de mantenimiento y las exigencias de un espacio de uso intensivo.",
      "Nuestros proyectos en hotelería van desde lodges en la Patagonia hasta terrazas de hoteles boutique en Santiago. En cada caso, buscamos crear una experiencia de naturaleza que sea auténtica, memorable y sostenible.",
    ],
  },
  {
    slug: "azoteas-y-terrazas",
    label: "Azoteas y Terrazas",
    color: "#4a8fd4",
    sanityType: "Azoteas y Terrazas",
    intro: "Verde en altura. Diseñamos jardines para terrazas, azoteas y balcones con soluciones técnicas que responden a las exigencias de cada estructura.",
    parrafos: [
      "Los jardines en altura tienen sus propias reglas. El peso, el viento, el riego, el sustrato, la impermeabilización — cada elemento requiere una solución técnica específica que integramos desde el inicio del proyecto.",
      "Trabajamos en estrecha colaboración con ingenieros y arquitectos para garantizar que el diseño sea no solo bello, sino seguro y durable. Seleccionamos plantas que toleran la exposición al viento y las temperaturas extremas de los pisos altos.",
      "Una azotea verde transforma un espacio residual en un lugar para vivir. En proyectos de edificios, además, genera valor para todas las unidades y contribuye a la sustentabilidad del conjunto.",
    ],
  },
  {
    slug: "supervision-y-mantenimiento",
    label: "Supervisión y Mantenimiento",
    color: "#9b6cc8",
    intro: "El jardín es un ser vivo que crece y cambia. Lo acompañamos en el tiempo para que madure exactamente como fue concebido.",
    parrafos: [
      "Un jardín bien diseñado necesita un acompañamiento que entienda su lógica. No se trata solo de podar y regar — se trata de leer el estado de cada especie, anticipar los cambios estacionales y tomar decisiones que cuiden la intención original del proyecto.",
      "Ofrecemos planes de mantención personalizados que incluyen visitas periódicas, poda de formación, fertilización, control de plagas y seguimiento del sistema de riego. Cada plan se construye según el tamaño del jardín, las especies plantadas y el nivel de intervención deseado.",
      "Para proyectos que hemos diseñado, el mantenimiento continúa la conversación iniciada en el diseño. Para jardines existentes, comenzamos con un diagnóstico que nos permite proponer un plan realista y adaptado.",
    ],
  },
  {
    slug: "asesorias-en-paisaje",
    label: "Asesorías en Paisaje",
    color: "#d44e7a",
    intro: "Orientación experta para quienes necesitan una mirada profesional sin necesariamente un proyecto completo. Consultoría clara, práctica y honesta.",
    parrafos: [
      "No todos los momentos requieren un proyecto integral. A veces se necesita una segunda opinión sobre una compra de plantas, orientación para intervenir un jardín existente, o revisión de un diseño ya elaborado. Para eso están nuestras asesorías.",
      "Ofrecemos sesiones de consultoría individual donde analizamos el espacio, escuchamos las necesidades y entregamos recomendaciones concretas: qué plantar, cómo organizar el espacio, qué priorizar, qué evitar.",
      "También asesoramos a arquitectos, constructoras e inmobiliarias que necesitan criterio paisajístico en etapas tempranas de un proyecto. Una buena asesoría al inicio puede ahorrar decisiones costosas más adelante.",
    ],
  },
  {
    slug: "supervision-de-obras",
    label: "Supervisión de Obras",
    color: "#e87a3c",
    intro: "El diseño solo se realiza completamente en la obra. Estamos en terreno para que cada detalle se ejecute con la calidad y la intención con que fue concebido.",
    parrafos: [
      "La supervisión de obra es el puente entre el proyecto en papel y el jardín real. Coordinamos con contratistas, proveedores de plantas y ejecutores para garantizar que lo que se construye responde fielmente al diseño aprobado.",
      "Realizamos visitas periódicas a terreno en las etapas clave de la ejecución: movimiento de tierra, instalación de riego, plantación, pavimentos y terminaciones. En cada visita documentamos el avance, resolvemos imprevistos y tomamos decisiones de ajuste cuando el terreno lo requiere.",
      "Nuestra presencia en obra protege la inversión del cliente y asegura que el resultado final — el jardín vivo — sea fiel a la visión original del proyecto.",
    ],
  },
];

export async function generateStaticParams() {
  return SERVICIOS.map((s) => ({ slug: s.slug }));
}

export default async function ServicioPage({ params }: { params: { slug: string } }) {
  const servicio = SERVICIOS.find((s) => s.slug === params.slug);
  if (!servicio) notFound();

  const proyectos = servicio.sanityType
    ? await getProyectosByType(servicio.sanityType)
    : [];

  const proyectosConFoto = proyectos.filter((p) => p.coverImage);

  return (
    <div style={{ backgroundColor: "#f2ede8", minHeight: "100vh" }}>
      <Header />

      {/* Hero header */}
      <div style={{ padding: "60px 24px 40px" }}>
        <div style={{
          fontSize: "11px", letterSpacing: "0.18em",
          color: servicio.color, marginBottom: "20px", fontWeight: "600",
        }}>
          SERVICIOS
        </div>
        <h1 style={{
          fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
          fontWeight: "700",
          lineHeight: 1.0,
          color: "#2b2520",
          textTransform: "uppercase",
          letterSpacing: "-0.02em",
          marginBottom: "32px",
        }}>
          {servicio.label}
        </h1>
        <div style={{ borderTop: `2px solid ${servicio.color}`, marginBottom: "40px" }} />
        <p style={{
          fontSize: "1.2rem", lineHeight: 1.7,
          color: "#2b2520", maxWidth: "640px",
          fontWeight: "400",
        }}>
          {servicio.intro}
        </p>
      </div>

      {/* Texto descriptivo */}
      <div style={{ padding: "0 24px 60px" }}>
        <div style={{ maxWidth: "640px" }}>
          {servicio.parrafos.map((p, i) => (
            <p key={i} style={{
              fontSize: "1rem", lineHeight: 1.85,
              color: "#2b2520",
              marginBottom: "24px",
              borderTop: i === 0 ? "none" : "none",
            }}>
              {p}
            </p>
          ))}
        </div>
      </div>

      {/* Proyectos de esta categoría */}
      {proyectosConFoto.length > 0 && (
        <div style={{ padding: "0 24px 80px" }}>
          <div style={{
            borderTop: "1px solid rgba(43,37,32,0.15)",
            paddingTop: "40px",
            marginBottom: "32px",
          }}>
            <div style={{ fontSize: "11px", letterSpacing: "0.15em", color: "rgba(43,37,32,0.45)" }}>
              PROYECTOS
            </div>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "8px",
          }}>
            {proyectosConFoto.map((p) => (
              <Link key={p._id} href={`/proyectos/${p.slug.current}`} style={{ textDecoration: "none" }}>
                <div style={{ overflow: "hidden", aspectRatio: "4/3", position: "relative" }}>
                  <img
                    src={urlFor(p.coverImage!).width(800).quality(82).url()}
                    alt={p.name}
                    loading="lazy"
                    style={{
                      width: "100%", height: "100%",
                      objectFit: "cover", display: "block",
                      transition: "transform 0.5s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    padding: "40px 16px 16px",
                    background: "linear-gradient(to top, rgba(43,37,32,0.6) 0%, transparent 100%)",
                  }}>
                    <div style={{ fontSize: "13px", fontWeight: "600", color: "#f2ede8" }}>
                      {p.name}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Volver */}
      <div style={{ padding: "0 24px 80px" }}>
        <Link href="/servicios" style={{
          fontSize: "11px", letterSpacing: "0.15em",
          color: servicio.color, textDecoration: "none",
          fontWeight: "600",
          borderBottom: `1px solid ${servicio.color}`,
          paddingBottom: "2px",
        }}>
          ← VOLVER A SERVICIOS
        </Link>
      </div>

      <Footer />
    </div>
  );
}
