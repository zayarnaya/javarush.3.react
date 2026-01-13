import { createBrowserRouter } from "react-router";
import { HomePage, NotFoundPage, PaymentPage, ReviewBookingPage, SearchResultsPage, SuccessPage } from "../pages";
import { MainLayout } from "src/layouts/MainLayout/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
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
    ]
  },
]);