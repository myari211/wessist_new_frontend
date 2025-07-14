// Import Dependencies
import { RouterProvider } from "react-router";
import { Provider } from 'react-redux';

//redux store
import { store } from './services/redux/store';

// Local Imports
import { AuthProvider } from "app/contexts/auth/Provider";
import { BreakpointProvider } from "app/contexts/breakpoint/Provider";
import { LocaleProvider } from "app/contexts/locale/Provider";
import { SidebarProvider } from "app/contexts/sidebar/Provider";
import { ThemeProvider } from "app/contexts/theme/Provider";

//router
import router from "app/router/router";
import NotificationListener from "listener/NotificationListener";

// ----------------------------------------------------------------------

function App() {
  const userId = localStorage.getItem('userId');

  return (
    <Provider store={store}>
      <AuthProvider>
        {userId && <NotificationListener userId={userId} />}
        <ThemeProvider>
          <LocaleProvider>
            <BreakpointProvider>
              <SidebarProvider>
                <RouterProvider router={router} />
              </SidebarProvider>
            </BreakpointProvider>
          </LocaleProvider>
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;