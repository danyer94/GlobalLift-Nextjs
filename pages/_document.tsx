import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <link rel="icon" type="image/x-icon" href="/logo/Global-Lift.ico" />
        <link rel="apple-touch-icon" href="/logo/Global-Lift.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Archivo+SemiExpanded:wght@500;600;700&family=JetBrains+Mono:wght@400;600&family=Onest:wght@300;400;500;600;700;800&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+SemiExpanded:wght@500;600;700&family=JetBrains+Mono:wght@400;600&family=Onest:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
