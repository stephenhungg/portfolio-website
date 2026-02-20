export function FeatureItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="text-green mt-1.5 text-xs">●</span>
      <span>{text}</span>
    </li>
  );
}

export function ProjectLink({ href, label, primary }: { href: string, label: string, primary?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
        primary
          ? 'bg-white text-black hover:bg-gray-200 hover:scale-[1.02]'
          : 'bg-black/20 text-gray-300 hover:bg-black/40 hover:text-white border border-white/10 hover:border-white/20'
      }`}
    >
      <span>{label}</span>
      {!primary && <span className="ml-auto text-gray-600 text-sm">↗</span>}
    </a>
  );
}

export function TechSection({ title, items }: { title: string, items: string[] }) {
  return (
    <div>
      <div className="text-xs text-gray-500 mb-2">{title}</div>
      <div className="flex flex-wrap gap-2">
        {items.map(item => (
          <span key={item} className="text-xs px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/5">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
