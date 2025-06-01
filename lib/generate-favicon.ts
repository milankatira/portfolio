export function generateFavicon() {
  const svgContent = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      style="color-scheme: light dark;"
    >
      <style>
        path {
          stroke: #000;
          fill: #000;
        }
        @media (prefers-color-scheme: dark) {
          path {
            stroke: #fff;
            fill: #fff;
          }
        }
      </style>
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
    </svg>
  `;

  const encodedSvg = Buffer.from(svgContent).toString('base64');
  return `data:image/svg+xml;base64,${encodedSvg}`;
}
