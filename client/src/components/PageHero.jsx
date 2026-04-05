/** @param {{ label?: string, title: import('react').ReactNode, lede?: string, tone?: "purple" | "green" | "dark" | "mist" }} props */
export default function PageHero({ label, title, lede, tone = "purple" }) {
  return (
    <header className={`page-hero page-hero--${tone}`}>
      <div className="page-inner">
        {label ? <p className="page-hero__label">{label}</p> : null}
        <h1 className="page-hero__title">{title}</h1>
        {lede ? <p className="page-hero__lede">{lede}</p> : null}
      </div>
    </header>
  );
}
