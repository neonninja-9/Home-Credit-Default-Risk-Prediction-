import Link from 'next/link';

interface SettingsSidebarProps {
  activeTab?: 'general' | 'underwriting' | 'api' | 'appearance';
}

export default function SettingsSidebar({ activeTab = 'general' }: SettingsSidebarProps) {
  const tabs = [
    { id: 'general', label: 'General', icon: 'settings' },
    { id: 'underwriting', label: 'Underwriting', icon: 'analytics' },
    { id: 'api', label: 'API & Integrations', icon: 'api' },
    { id: 'appearance', label: 'Appearance', icon: 'palette' },
  ];

  return (
    <aside className="w-full md:w-64 flex-shrink-0">
      <h1 className="font-headline-md text-headline-md text-on-surface mb-8 tracking-tight">Settings</h1>
      <nav className="flex flex-col gap-2 relative">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-glass-stroke"></div>
        
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          
          return (
            <Link
              key={tab.id}
              href={`#${tab.id}`}
              className={`group flex items-center gap-3 py-3 pl-4 relative rounded-r-lg transition-colors ${
                isActive
                  ? 'text-primary font-medium bg-white/5'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5'
              }`}
            >
              <div
                className={`absolute left-0 top-0 bottom-0 w-0.5 rounded-r-full transition-colors ${
                  isActive
                    ? 'bg-primary shadow-[0_0_8px_rgba(255,179,175,0.5)]'
                    : 'bg-transparent group-hover:bg-glass-stroke'
                }`}
              ></div>
              <span
                className={`material-symbols-outlined transition-colors ${
                  isActive ? 'text-primary' : 'text-on-surface-variant group-hover:text-on-surface'
                }`}
              >
                {tab.icon}
              </span>
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
