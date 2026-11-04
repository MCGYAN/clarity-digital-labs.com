export function MonitorIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  )
}

export function CloudIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M7 18h10a4 4 0 0 0 .5-8 5.5 5.5 0 0 0-10.7-1.5A3.5 3.5 0 0 0 7 18z" />
    </svg>
  )
}

export function ShieldIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

export function GridIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}

export function BrainIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M9.5 4.5a3.5 3.5 0 0 0-3 5.4A3 3 0 0 0 7 16h1.5" />
      <path d="M14.5 4.5a3.5 3.5 0 0 1 3 5.4A3 3 0 0 1 17 16h-1.5" />
      <path d="M9 8.5v8M15 8.5v8M12 7v11" />
      <path d="M8.5 19h7" />
    </svg>
  )
}

export function LayersIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 12l9 5 9-5" />
      <path d="M3 16l9 5 9-5" />
    </svg>
  )
}

const map = {
  monitor: MonitorIcon,
  cloud: CloudIcon,
  shield: ShieldIcon,
  grid: GridIcon,
  brain: BrainIcon,
  layers: LayersIcon,
}

export function ServiceIcon({ name }) {
  const Icon = map[name] || MonitorIcon
  return <Icon />
}
