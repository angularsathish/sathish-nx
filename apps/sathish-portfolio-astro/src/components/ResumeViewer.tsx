// src/components/ResumeViewer.tsx
import { useState, useEffect } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import ResumePDF from './ResumePDF';

const ResumeViewer = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [showPDF, setShowPDF] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Detect mobile devices
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      const isSmallScreen = window.innerWidth < 768;
      return isMobileDevice || isSmallScreen;
    };

    setIsMobile(checkMobile());

    // Small delay to ensure proper mounting
    setTimeout(() => setShowPDF(true), 100);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-900/50 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Header with Actions */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-mono inline-block relative text-white mb-1">
            My <span className="text-green-400">Resume</span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-green-500 opacity-70"></div>
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mt-3 sm:mt-4 max-w-2xl mx-auto px-2">
            Download my professional resume in PDF format
          </p>

          {/* Download button - only show on desktop since mobile has it in the viewer area */}
          {!isMobile && (
            <div className="flex justify-center gap-4 mt-6">
              {showPDF && (
                <PDFDownloadLink
                  document={<ResumePDF />}
                  fileName="Sathish_Kumar_Resume.pdf"
                  className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-all flex items-center gap-2"
                >
                  {({ loading }) =>
                    loading ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i> Loading...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-download"></i> Download Resume
                      </>
                    )
                  }
                </PDFDownloadLink>
              )}
            </div>
          )}
        </div>

        {/* PDF Preview Container */}
        <div className="bg-gray-950 rounded-lg p-2 sm:p-4 shadow-2xl border border-gray-800">
          {isMobile ? (
            // Mobile: Show message and download CTA instead of viewer
            <div className="flex flex-col items-center justify-center bg-gray-800 rounded-lg h-[400px] px-6">
              <div className="text-center max-w-md">
                <i className="fas fa-mobile-alt text-5xl text-green-500 mb-6"></i>
                <h3 className="text-xl font-bold text-white mb-3">Mobile View</h3>
                <p className="text-gray-300 mb-6">
                  PDF preview is not available on mobile devices. Please download the resume to view it.
                </p>
                {showPDF && (
                  <PDFDownloadLink
                    document={<ResumePDF />}
                    fileName="Sathish_Kumar_Resume.pdf"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-all text-lg"
                  >
                    {({ loading }) =>
                      loading ? (
                        <>
                          <i className="fas fa-spinner fa-spin"></i> Preparing...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-download"></i> Download Resume
                        </>
                      )
                    }
                  </PDFDownloadLink>
                )}
              </div>
            </div>
          ) : showPDF ? (
            // Desktop: Show PDF viewer
            <div className="w-full h-[600px] sm:h-[700px] lg:h-[900px]">
              <PDFViewer
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: '8px'
                }}
                showToolbar={true}
              >
                <ResumePDF />
              </PDFViewer>
            </div>
          ) : (
            // Desktop: Loading state
            <div className="flex items-center justify-center bg-gray-800 rounded-lg h-[600px] sm:h-[700px] lg:h-[900px]">
              <div className="text-center">
                <i className="fas fa-spinner fa-spin text-4xl text-green-500 mb-4"></i>
                <p className="text-gray-400">Loading Resume...</p>
              </div>
            </div>
          )}
        </div>


        {/* Info Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            {isMobile ? (
              <>
                Download the PDF to view my professional resume on your device.
                <br />
                The file will open in your default PDF viewer.
              </>
            ) : (
              <>
                View my professional resume above. Use the built-in PDF controls to zoom, navigate pages, and print.
                <br />
                Click the download button to save a copy for offline viewing.
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ResumeViewer;
