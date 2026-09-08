import fs from 'fs';
import path from 'path';

export const metadata = {
  title: 'Generate OSHA Safety Briefing & Sign-in Sheets in 30 Seconds (100% Free PDF)',
  description: 'Instantly create compliant OSHA safety briefing notes & crew sign-in sheets. Select hazard topics, customize, and download a printable 1-page PDF. Built for US/UK site managers.',
  keywords: 'OSHA safety briefing, sign-in sheet, daily toolbox talk, construction safety, safety forms, OSHA compliance',
  alternates: {
    canonical: 'https://masterenglishbook.com/international/osha-safety-tool',
  },
  openGraph: {
    title: 'Free OSHA Safety Briefing & Sign-In Sheet Generator',
    description: 'Instant OSHA-compliant safety briefing forms. Download as PDF, print, and share with your crew.',
    type: 'website',
    url: 'https://masterenglishbook.com/international/osha-safety-tool',
    images: [
      {
        url: 'https://masterenglishbook.com/osha-tool-og-image.png',
        width: 1200,
        height: 630,
        alt: 'Free OSHA Safety Briefing & Sign-In Sheet Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free OSHA Safety Briefing & Sign-In Sheet Generator',
    description: 'Create compliant OSHA safety briefing forms in 30 seconds. Free PDF download.',
    images: ['https://masterenglishbook.com/osha-tool-og-image.png'],
  },
};

export default function OSHAToolPage() {
  // Read the HTML file
  const htmlPath = path.join(process.cwd(), 'public', 'osha-safety-tool.html');
  let htmlContent = '';

  try {
    htmlContent = fs.readFileSync(htmlPath, 'utf-8');
  } catch (error) {
    console.error('Error reading OSHA tool file:', error);
    return <div>Error loading OSHA tool. Please refresh the page.</div>;
  }

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
}
