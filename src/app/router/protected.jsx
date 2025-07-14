// Import Dependencies
import { Navigate } from "react-router";

// Local Imports
import { AppLayout } from "app/layouts/AppLayout";
import { DynamicLayout } from "app/layouts/DynamicLayout";
import AuthGuard from "middleware/AuthGuard";

// ----------------------------------------------------------------------

const protectedRoutes = {
  id: "protected",
  Component: AuthGuard,
  children: [
    // The dynamic layout supports both the main layout and the sideblock.
    {
      Component: DynamicLayout,
      children: [
        {
          index: true,
          element: <Navigate to="/dashboards" />,
        },
        {
          path: "dashboards",
          children: [
            {
              index: true,
              element: <Navigate to="/dashboards/home" />,
            },
            {
              path: "home",
              lazy: async () => ({
                Component: (await import("app/pages/dashboards/home")).default,
              }),
            },
          ],
        },
        {
          path: "master_data",
          children: [
            {
              index: true,
              element: <Navigate to="/management" />,
            },
            {
              path: "navigation",
              lazy: async () => ({
                Component: (await import("app/pages/management/navigation")).default,
              }),
            },
            {
              path: "roles",
              lazy: async () => ({
                Component: (await import("app/pages/management/roles")).default,
              }),
            },
            {
              path: "Customer",
              lazy: async () => ({
                Component: (await import("app/pages/management/customer")).default,
              }),
            },
            {
              path: "permissions",
              lazy: async () => ({
                Component: (await import("app/pages/management/permission")).default,
              }),
            }
          ],
        },
        {
          path: "administrator",
          children: [
            {
              path: "admin",
              lazy: async () => ({
                Component: (await import("app/pages/administrator/admin")).default,
              })
            },
            {
              path: "role_has_navigation",
              lazy: async() => ({
                Component: (await import("app/pages/administrator/role_has_navigation")).default,
              })
            }
          ]
        }
      ],
    },
    // The app layout supports only the main layout. Avoid using it for other layouts.
    {
      Component: AppLayout,
      children: [
        {
          path: "settings",
          lazy: async () => ({
            Component: (await import("app/pages/settings/Layout")).default,
          }),
          children: [
            {
              index: true,
              element: <Navigate to="/settings/general" />,
            },
            {
              path: "general",
              lazy: async () => ({
                Component: (await import("app/pages/settings/sections/General"))
                  .default,
              }),
            },
            {
              path: "appearance",
              lazy: async () => ({
                Component: (
                  await import("app/pages/settings/sections/Appearance")
                ).default,
              }),
            },
          ],
        },
      ],
    },
  ],
};

export { protectedRoutes };
