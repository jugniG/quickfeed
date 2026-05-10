import { Avatar } from '@heroui/avatar'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from '@heroui/dropdown'
import { Link } from '@tanstack/react-router'
import { authClient } from '#/lib/auth-client'

type User = {
  name?: string | null
  email?: string | null
  image?: string | null
}

export function DashboardTopbar({ user }: { user: User | undefined }) {
  function signOut() {
    authClient.signOut({
      fetchOptions: { onSuccess: () => { window.location.href = '/login' } },
    })
  }

  const displayName = user?.name || user?.email || '?'
  const initials = displayName
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(s => s[0].toUpperCase())
    .join('')

  return (
    <header className="h-[60px] border-b border-neutral-200 bg-white relative flex items-center justify-between px-6 shrink-0 min-w-0">
      {/* Brand */}
      <Link to="/dashboard" className="flex items-center gap-2 no-underline">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-md shadow-orange-500/30">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 4h10M2 7h7M2 10h5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </div>
        <span
          className="text-[15px] text-[#0A0A0A] tracking-tight"
          style={{ fontFamily: "'Cal Sans', sans-serif", fontWeight: 600 }}
        >
          QuickFeed
        </span>
      </Link>

      {/* Center nav */}
      <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1">
        <Link
          to="/dashboard"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[13px] font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-colors no-underline"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-neutral-400">
            <rect x="1.5" y="1.5" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.2"/>
            <rect x="7.5" y="1.5" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.2"/>
            <rect x="1.5" y="7.5" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.2"/>
            <rect x="7.5" y="7.5" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.2"/>
          </svg>
          Dashboard
        </Link>
      </nav>

      {/* User dropdown */}
      <Dropdown placement="bottom-end" classNames={{ content: 'p-0 rounded-2xl border border-neutral-200 shadow-[0_8px_30px_rgba(0,0,0,0.10)] min-w-[220px] overflow-hidden' }}>
        <DropdownTrigger>
          <button className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-neutral-50 transition-colors outline-none">
            <Avatar
              src={user?.image ?? undefined}
              name={initials}
              size="sm"
              classNames={{
                base: 'w-7 h-7 text-[11px] font-bold bg-gradient-to-br from-orange-400 to-amber-400 text-white shrink-0',
              }}
              showFallback
            />
            <span className="text-[13px] text-neutral-700 font-medium max-w-[160px] truncate hidden sm:block">
              {user?.name || user?.email}
            </span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-neutral-400 shrink-0">
              <path d="M3.5 5.25L7 8.75l3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </DropdownTrigger>

        <DropdownMenu
          aria-label="User menu"
          variant="flat"
          itemClasses={{
            base: 'rounded-none px-4 data-[hover=true]:bg-neutral-50',
          }}
        >
          {/* Profile section */}
          <DropdownSection showDivider classNames={{ divider: 'my-0', group: 'p-0' }}>
            <DropdownItem
              key="profile"
              isReadOnly
              className="cursor-default bg-neutral-50/80 py-3 data-[hover=true]:bg-neutral-50/80"
            >
              <div className="flex items-center gap-2.5">
                <Avatar
                  src={user?.image ?? undefined}
                  name={initials}
                  size="sm"
                  classNames={{
                    base: 'w-8 h-8 text-[12px] font-bold bg-gradient-to-br from-orange-400 to-amber-400 text-white shrink-0',
                  }}
                  showFallback
                />
                <div className="min-w-0">
                  {user?.name && (
                    <div className="text-[13px] font-semibold text-neutral-800 truncate">
                      {user.name}
                    </div>
                  )}
                  <div className="text-[12px] text-neutral-400 truncate">
                    {user?.email}
                  </div>
                </div>
              </div>
            </DropdownItem>
          </DropdownSection>

          {/* Actions */}
          <DropdownSection classNames={{ group: 'py-1' }}>
            <DropdownItem
              key="dashboard"
              href="/dashboard"
              className="py-2 text-[13px] text-neutral-700"
              startContent={
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-neutral-400">
                  <rect x="1.5" y="1.5" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.2"/>
                  <rect x="7.5" y="1.5" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.2"/>
                  <rect x="1.5" y="7.5" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.2"/>
                  <rect x="7.5" y="7.5" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.2"/>
                </svg>
              }
            >
              Dashboard
            </DropdownItem>
            <DropdownItem
              key="billing"
              href="/billing"
              className="py-2 text-[13px] text-neutral-700"
              startContent={
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-neutral-400">
                  <rect x="1.5" y="3" width="11" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M1.5 6h11" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M4 9h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              }
            >
              Billing
            </DropdownItem>
            <DropdownItem
              key="logout"
              className="py-2 text-[13px] text-red-500 data-[hover=true]:bg-red-50"
              onPress={signOut}
              startContent={
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-red-400">
                  <path d="M5.5 2H2.5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1H5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  <path d="M9.5 9.5L12.5 7l-3-2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12.5 7H5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              }
            >
              Log out
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </header>
  )
}
