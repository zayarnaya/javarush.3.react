import { createBrowserRouter } from "react-router";
import { HomePage, NotFoundPage, PaymentPage, ReviewBookingPage, SearchResultsPage, SuccessPage } from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/search-results",
    element: <SearchResultsPage />
  },
  {
    path: "/review-booking",
    element: <ReviewBookingPage />,
  },
  {
    path: "/payment",
    element: <PaymentPage />,
  },
  {
    path: "/success",
    element: <SuccessPage />
  },
  {
    path: "*",
    element: <NotFoundPage />,
  }
]);