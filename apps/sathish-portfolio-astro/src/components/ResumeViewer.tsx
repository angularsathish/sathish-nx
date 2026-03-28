// src/components/ResumeViewer.tsx
import { useState, useEffect } from 'react';
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import ResumePDF from './ResumePDF';

const ResumeViewer = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [showPDF, setShowPDF] = useState(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);

    // Generate blob URL for viewing
    const generatePdfBlob = async () => {
      try {
        const blob = await pdf(<ResumePDF />).toBlob();
        const url = URL.createObjectURL(blob);
        setPdfBlobUrl(url);
        setShowPDF(true);
      } catch (error) {
        console.error('Error generating PDF blob:', error);
      }
    };

    generatePdfBlob();

    // Cleanup blob URL on unmount
    return () => {
      if (pdfBlobUrl) {
        URL.revokeObjectURL(pdfBlobUrl);
      }
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <section className="mt-10 py-12 sm:py-16 lg:py-20 bg-gray-900/50 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Header with Actions */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-mono inline-block relative text-white mb-1">
            My <span className="text-green-400">Resume</span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-green-500 opacity-70"></div>
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mt-3 sm:mt-4 max-w-2xl mx-auto px-2">
            View and download my professional resume
          </p>
        </div>

        {/* PDF Preview Container - Same view for all devices */}
        <div className="bg-gray-950 rounded-lg p-2 sm:p-4 shadow-2xl border border-gray-800">
          {pdfBlobUrl ? (
            <div className="w-full">
              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4 px-2">
                <a
                  href={pdfBlobUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-all"
                >
                  <i className="fas fa-external-link-alt"></i> Open in New Tab
                </a>
                {showPDF && (
                  <PDFDownloadLink
                    document={<ResumePDF />}
                    fileName="Sathish_Kumar_Resume.pdf"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-all"
                  >
                    {({ loading }) =>
                      loading ? (
                        <>
                          <i className="fas fa-spinner fa-spin"></i> Loading...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-download"></i> Download
                        </>
                      )
                    }
                  </PDFDownloadLink>
                )}
              </div>
              {/* PDF iframe - responsive height */}
              <iframe
                src={pdfBlobUrl}
                className="w-full h-[500px] sm:h-[650px] lg:h-[900px] rounded-lg border-0"
                title="Resume PDF"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center bg-gray-800 rounded-lg h-[500px] sm:h-[650px] lg:h-[900px]">
              <div className="text-center">
                <i className="fas fa-spinner fa-spin text-4xl text-green-500 mb-4"></i>
                <p className="text-gray-400">Preparing Resume...</p>
              </div>
            </div>
          )}
        </div>


        {/* Info Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            View the resume above or open it in a new tab for the best experience.
            <br />
            You can also download it for offline viewing.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ResumeViewer;
