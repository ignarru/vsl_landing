/* Marca de texto con el isotipo. El PNG de 64 px pesa ~4 KB contra los 118 KB del
   original de 512 px que se servía para mostrarse a 26 px. `alt=""`: el nombre ya
   está en el texto del link, repetirlo en el icono era ruido para el lector de pantalla. */
export default function Wordmark({ size = 26 }: { size?: number }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/logo-icon-64.png"
        alt=""
        width={size}
        height={size}
        className="wm-icon"
        style={{ width: size, height: size }}
      />
      <span>IAbyIA</span>
    </>
  );
}
