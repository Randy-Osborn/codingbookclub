import './globals.css'; // contains Tailwind directives

import ClientLayout from "./clientLayout";

export const metadata = {
  title: "Coding Book Club",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Wrap children in the client layout */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
