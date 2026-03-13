'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import Image from 'next/image'

const adminNavItems = [
  {
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: 'fa-chart-line',
  },
  {
    label: 'Products',
    href: '/admin/products',
    icon: 'fa-box',
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { logout, user } = useAuth()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <aside className="w-64 border-r border-slate-200 bg-white shadow-sm">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="border-b border-slate-200 px-6 py-4">
          <Link href="/admin/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image src="/images/Book Store Shop Logo (1).png" alt="JSEdumart" width={40} height={40} className="object-contain" />
            <div className="text-sm font-semibold text-slate-900">JSEdumart</div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-4 py-6">
          {adminNavItems.map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <i className={`fa-solid ${item.icon} w-5`} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* User Info */}
        <div className="border-t border-slate-200 px-4 py-4">
          <div className="mb-4 rounded-lg bg-slate-50 p-3">
            <p className="text-xs text-slate-600">Logged in as</p>
            <p className="text-sm font-semibold text-slate-900">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-slate-500">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full rounded-lg border border-slate-300 bg-white py-2 px-4 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <i className="fa-solid fa-sign-out-alt mr-2" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  )
}
