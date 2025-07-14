// Import Depndencies
import { isRouteErrorResponse, useRouteError } from "react-router";
import { lazy } from "react";

// Local Imports
import { Loadable } from "components/shared/Loadable";

// ----------------------------------------------------------------------

const app = {
  401: lazy(() => import("./401")),
  404: lazy(() => import("./404")),
  429: lazy(() => import("./429")),
  500: lazy(() => import("./500")),
};

function RootErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    const Component = Loadable(app[error.status]);
    return <Component />;
  }

  // return <div>Something went wrong</div>;
  return(
    <div className="p-10 text-center text-red-600">
      <h2 className="text-2xl font-bold mb-2">Something Went Wrong</h2>
      <pre className="text-sm bg-red-100 p-4 rounded-md text-left overflow-x-auto">
        {error?.message || JSON.stringify(error, null, 2)}
      </pre>
    </div>
  )
}

export default RootErrorBoundary;
