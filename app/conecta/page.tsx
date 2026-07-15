"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const tiposProyecto = [
  "Jardín Residencial",
  "Departamento / Terraza",
  "Azotea",
  "Corporativo / Oficinas",
  "Hotelería / Lodge",
  "Clínica / Salud",
  "Restaurant / Retail",
  "Inmobiliaria",
  "Parque / Espacio Público",
  "Asesoría Puntual",
];

const viaContacto = [
  "Email",
  "WhatsApp",
  "Videollamada",
  "Reunión presencial",
];

const comunasPorRegion: Record<string, string[]> = {
  "Región de Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
  "Región de Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
  "Región de Antofagasta": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"],
  "Región de Atacama": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"],
  "Región de Coquimbo": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
  "Región de Valparaíso": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Limache", "Nogales", "Olmué", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Villa Alemana"],
  "Región Metropolitana": ["Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"],
  "Región del Libertador Gral. B. O'Higgins": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"],
  "Región del Maule": ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"],
  "Región de Ñuble": ["Chillán", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "Chillán Viejo", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"],
  "Región del Biobío": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío"],
  "Región de La Araucanía": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre Las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"],
  "Región de Los Ríos": ["Valdivia", "Corral", "Futrono", "La Unión", "Lago Ranco", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "Río Bueno"],
  "Región de Los Lagos": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"],
  "Región de Aysén": ["Coyhaique", "Lago Verde", "Aysén", "Cisnes", "Guaitecas", "Cochrane", "O'Higgins", "Tortel", "Chile Chico", "Río Ibáñez"],
  "Región de Magallanes": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"],
};

const regionesChile = Object.keys(comunasPorRegion);

export default function ConectaPage() {
  const [superficie, setSuperficie] = useState(300);
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");

  const comunas = region ? [...(comunasPorRegion[region] ?? [])].sort((a, b) => a.localeCompare(b, "es")) : [];

  return (
    <div style={{ backgroundColor: "#f2ede8", minHeight: "100vh" }}>
      <Header />

      <div className="grid-2col" style={{ minHeight: "calc(100vh - 73px)", borderBottom: "1px solid rgba(43,37,32,0.12)" }}>

        {/* Columna izquierda */}
        <div style={{
          padding: "60px 40px 60px 24px",
          borderRight: "1px solid rgba(43,37,32,0.12)",
          display: "flex",
          flexDirection: "column",
        }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.15em", color: "#c8873a", fontWeight: "600", marginBottom: "24px" }}>
            CONECTA
          </div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: "700", color: "#2b2520", lineHeight: 1.2, marginBottom: "12px" }}>
            Cuentanos tu proyecto.
          </h1>
          <p style={{ fontSize: "14px", lineHeight: 1.7, color: "rgba(43,37,32,0.7)", marginBottom: "36px" }}>
            En 20 minutos evaluamos si hay fit<br />y cómo podemos trabajar juntos.
          </p>

          {/* CTAs */}
          <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" style={{
            display: "block", padding: "14px 20px", backgroundColor: "#c8873a",
            color: "#f2ede8", fontSize: "11px", fontWeight: "700", letterSpacing: "0.12em",
            textDecoration: "none", textAlign: "center", marginBottom: "10px",
          }}>
            AGENDAR REUNIÓN DE 20 MIN →
          </a>
          <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" style={{
            display: "block", padding: "13px 20px", backgroundColor: "transparent",
            color: "#2b2520", fontSize: "11px", fontWeight: "600", letterSpacing: "0.12em",
            textDecoration: "none", textAlign: "center",
            border: "1px solid rgba(43,37,32,0.3)", marginBottom: "48px",
          }}>
            VER DISPONIBILIDAD EN CALENDLY
          </a>

          {/* Contacto — todos con borde circular */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Email */}
            <a href="mailto:oficina@passalacquapaisajismo.cl" style={{ display: "flex", alignItems: "center", gap: "14px", textDecoration: "none" }}>
              <div style={iconCircle}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <div>
                <div style={iconLabel}>EMAIL</div>
                <div style={iconText}>oficina@passalacquapaisajismo.cl</div>
              </div>
            </a>

            {/* Instagram */}
            <a href="https://www.instagram.com/passalacquapaisajismo" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "14px", textDecoration: "none" }}>
              <div style={iconCircle}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </div>
              <div>
                <div style={iconLabel}>INSTAGRAM</div>
                <div style={iconText}>@passalacquapaisajismo</div>
              </div>
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "14px", textDecoration: "none" }}>
              <div style={iconCircle}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <div>
                <div style={iconLabel}>LINKEDIN</div>
                <div style={iconText}>Passalacqua Paisajismo</div>
              </div>
            </a>

            {/* Estudio */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={iconCircle}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <div>
                <div style={iconLabel}>ESTUDIO</div>
                <div style={iconText}>Santiago, Chile</div>
              </div>
            </div>
          </div>
        </div>

        {/* Columna derecha — formulario */}
        <div style={{ padding: "60px 24px 60px 48px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.15em", color: "rgba(43,37,32,0.5)", marginBottom: "32px", fontWeight: "600" }}>
            CUENTANOS DE TU PROYECTO
          </div>

          <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "0" }}>

            {/* Nombre + Email */}
            <div className="grid-form-2col">
              <div>
                <label style={labelStyle}>NOMBRE</label>
                <input placeholder="Tu nombre" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>EMAIL</label>
                <input type="email" placeholder="tu@email.com" style={inputStyle} />
              </div>
            </div>

            {/* Tipo de proyecto */}
            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>TIPO DE PROYECTO</label>
              <select style={selectStyle} defaultValue="">
                <option value="" disabled>Selecciona una tipología...</option>
                {tiposProyecto.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* Región */}
            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>REGIÓN</label>
              <select style={selectStyle} value={region} onChange={(e) => { setRegion(e.target.value); setComuna(""); }}>
                <option value="" disabled>Selecciona una región...</option>
                {regionesChile.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            {/* Comuna */}
            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>COMUNA</label>
              <select
                style={{ ...selectStyle, opacity: region ? 1 : 0.5, cursor: region ? "pointer" : "not-allowed" }}
                value={comuna}
                onChange={(e) => setComuna(e.target.value)}
                disabled={!region}
              >
                <option value="" disabled>{region ? "Selecciona una comuna..." : "Primero selecciona una región..."}</option>
                {comunas.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Comunicar */}
            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>¿CÓMO PREFIERES COMUNICARTE?</label>
              <select style={selectStyle} defaultValue="">
                <option value="" disabled>Selecciona una opción...</option>
                {viaContacto.map((v) => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>

            {/* Superficie */}
            <div style={{ marginBottom: "28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <label style={labelStyle}>SUPERFICIE ESTIMADA (m²)</label>
                <span style={{ fontSize: "13px", fontWeight: "600", color: "#2b2520" }}>{superficie} m²</span>
              </div>
              <input
                type="range"
                min={50} max={5000} step={50}
                value={superficie}
                onChange={(e) => setSuperficie(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#c8873a", cursor: "pointer" } as React.CSSProperties}
              />
            </div>

            {/* Detalles */}
            <div style={{ marginBottom: "36px" }}>
              <label style={labelStyle}>DETALLES DEL PROYECTO</label>
              <textarea
                placeholder="Cuentanos qué tienes en mente, el estado actual del espacio y cualquier referencia que te inspire..."
                rows={5}
                style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
              />
            </div>

            {/* Submit */}
            <button type="submit" style={{
              padding: "16px 32px", backgroundColor: "#c8873a", color: "#f2ede8",
              fontSize: "11px", fontWeight: "700", letterSpacing: "0.15em",
              border: "none", cursor: "pointer", width: "100%", marginBottom: "16px",
              fontFamily: "inherit",
            }}>
              ENVIAR Y AGENDAR REUNIÓN →
            </button>
            <div style={{ fontSize: "12px", color: "rgba(43,37,32,0.5)", textAlign: "center" }}>
              Te respondemos en menos de 24 horas hábiles
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

const iconCircle: React.CSSProperties = {
  width: "30px",
  height: "30px",
  border: "2px solid #2b2520",
  color: "#2b2520",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  flexShrink: 0,
};

const iconLabel: React.CSSProperties = {
  fontSize: "10px",
  letterSpacing: "0.15em",
  color: "rgba(43,37,32,0.5)",
  marginBottom: "2px",
};

const iconText: React.CSSProperties = {
  fontSize: "13px",
  color: "#2b2520",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "10px",
  letterSpacing: "0.15em",
  fontWeight: "600",
  color: "rgba(43,37,32,0.6)",
  marginBottom: "8px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  backgroundColor: "rgba(43,37,32,0.04)",
  border: "none",
  borderBottom: "1px solid rgba(43,37,32,0.12)",
  fontSize: "13px",
  color: "#2b2520",
  outline: "none",
  fontFamily: "inherit",
};

const selectStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  backgroundColor: "rgba(43,37,32,0.04)",
  border: "none",
  borderBottom: "1px solid rgba(43,37,32,0.12)",
  fontSize: "13px",
  color: "#2b2520",
  outline: "none",
  fontFamily: "inherit",
  cursor: "pointer",
  appearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%232b2520' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 14px center",
  paddingRight: "36px",
};
