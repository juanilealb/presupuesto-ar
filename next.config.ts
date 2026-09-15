import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/anio/2023", destination: "/comparar", permanent: false },
      { source: "/anio/2026", destination: "/comparar", permanent: false },
      { source: "/anio/2027", destination: "/comparar", permanent: false },
      { source: "/anio/2024", destination: "/pronostico", permanent: false },
      { source: "/anio/2025", destination: "/pronostico", permanent: false },
    ];
  },
};

export default nextConfig;
