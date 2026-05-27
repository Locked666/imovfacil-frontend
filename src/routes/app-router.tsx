import * as React from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import { AppErrorBoundary } from "@/routes/error-boundary"
import { ProtectedRoute, RoleGuard, TenantGuard } from "@/routes/guards"
import { AuthLayout } from "@/components/layout/auth-layout"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { PublicLayout } from "@/components/layout/public-layout"

const HomePage = React.lazy(() => import("@/pages/home"))
const LoginPage = React.lazy(() => import("@/pages/auth/login"))
const SignupPage = React.lazy(() => import("@/pages/auth/signup"))
const PropertyDetailPage = React.lazy(() => import("@/pages/property"))
const DashboardHomePage = React.lazy(() => import("@/pages/dashboard"))
const DashboardPropertiesPage = React.lazy(() => import("@/pages/dashboard/properties"))
const DashboardPropertyNewPage = React.lazy(() => import("@/pages/dashboard/property-new"))
const DashboardLeadsPage = React.lazy(() => import("@/pages/dashboard/leads"))
const DashboardFinancePage = React.lazy(() => import("@/pages/dashboard/finance"))
const DashboardSettingsPage = React.lazy(() => import("@/pages/dashboard/settings"))
const AdminHomePage = React.lazy(() => import("@/pages/admin"))
const AdminUsersPage = React.lazy(() => import("@/pages/admin/users"))
const AdminPlansPage = React.lazy(() => import("@/pages/admin/plans"))
const AdminMetricsPage = React.lazy(() => import("@/pages/admin/metrics"))

function RouteFallback() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground">
        <span className="animate-pulse">Carregando...</span>
      </div>
    </div>
  )
}

function LazyBoundary({ children }: React.PropsWithChildren) {
  return <React.Suspense fallback={<RouteFallback />}>{children}</React.Suspense>
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <AppErrorBoundary>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LazyBoundary><HomePage /></LazyBoundary>} />
            <Route path="/explorar" element={<LazyBoundary><HomePage /></LazyBoundary>} />
            <Route
              path="/imovel/:slug"
              element={<LazyBoundary><PropertyDetailPage /></LazyBoundary>}
            />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LazyBoundary><LoginPage /></LazyBoundary>} />
            <Route path="/signup" element={<LazyBoundary><SignupPage /></LazyBoundary>} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<TenantGuard />}>
              <Route element={<DashboardLayout scope="dashboard" />}>
                <Route path="/dashboard" element={<LazyBoundary><DashboardHomePage /></LazyBoundary>} />
                <Route
                  path="/dashboard/imoveis"
                  element={<LazyBoundary><DashboardPropertiesPage /></LazyBoundary>}
                />
                <Route
                  path="/dashboard/imoveis/novo"
                  element={<LazyBoundary><DashboardPropertyNewPage /></LazyBoundary>}
                />
                <Route
                  path="/dashboard/leads"
                  element={<LazyBoundary><DashboardLeadsPage /></LazyBoundary>}
                />
                <Route
                  path="/dashboard/financeiro"
                  element={<LazyBoundary><DashboardFinancePage /></LazyBoundary>}
                />
                <Route
                  path="/dashboard/configuracoes"
                  element={<LazyBoundary><DashboardSettingsPage /></LazyBoundary>}
                />
              </Route>
            </Route>
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<RoleGuard allowedRoles={["ADMIN"]} />}>
              <Route element={<DashboardLayout scope="admin" />}>
                <Route path="/admin" element={<LazyBoundary><AdminHomePage /></LazyBoundary>} />
                <Route
                  path="/admin/usuarios"
                  element={<LazyBoundary><AdminUsersPage /></LazyBoundary>}
                />
                <Route
                  path="/admin/planos"
                  element={<LazyBoundary><AdminPlansPage /></LazyBoundary>}
                />
                <Route
                  path="/admin/metricas"
                  element={<LazyBoundary><AdminMetricsPage /></LazyBoundary>}
                />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppErrorBoundary>
    </BrowserRouter>
  )
}

