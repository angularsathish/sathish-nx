// src/components/ResumeViewer.tsx
import { useState, useEffect } from 'react';
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import ResumePDF from './ResumePDF';
import ResumePDF2Page from './ResumePDF2Page';
import ResumeMobileView from './ResumeMobileView';

type TemplateType = '1-page' | '2-page';

const ResumeViewer = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [showPDF, setShowPDF] = useState(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('1-page');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Generate PDF based on selected template
  const generatePdfBlob = async (template: TemplateType) => {
    setIsGenerating(true);
    try {
      // Revoke previous blob URL
      if (pdfBlobUrl) {
        URL.revokeObjectURL(pdfBlobUrl);
      }

      const pdfComponent = template === '1-page' ? <ResumePDF /> : <ResumePDF2Page />;
      const blob = await pdf(pdfComponent).toBlob();
      const url = URL.createObjectURL(blob);
      setPdfBlobUrl(url);
      setShowPDF(true);
    } catch (error) {
      console.error('Error generating PDF blob:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);

    // Detect mobile device
    const checkMobile = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const mobileKeywords = ['android', 'iphone', 'ipad', 'ipod', 'mobile'];
      const isMobileDevice = mobileKeywords.some(keyword => userAgent.includes(keyword)) || window.innerWidth < 768;
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    generatePdfBlob('1-page');

    // Cleanup blob URL on unmount
    return () => {
      if (pdfBlobUrl) {
        URL.revokeObjectURL(pdfBlobUrl);
      }
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Handle template change
  const handleTemplateChange = (template: TemplateType) => {
    setSelectedTemplate(template);
    generatePdfBlob(template);
  };

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

        {/* Template Selection */}
        <div className="mb-6">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-2 sm:mb-3 text-center">
            Choose Resume Template
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:gap-4 max-w-md sm:max-w-2xl mx-auto">
            {/* Template 1 - Single Page */}
            <div
              onClick={() => handleTemplateChange('1-page')}
              className={`cursor-pointer rounded-md sm:rounded-lg border-2 transition-all p-2 sm:p-3 ${
                selectedTemplate === '1-page'
                  ? 'border-green-500 bg-green-500/10 shadow-lg shadow-green-500/20'
                  : 'border-gray-700 bg-gray-800/50 hover:border-green-400 hover:bg-gray-800'
              }`}
            >
              <div className="aspect-[4/5] bg-gray-900 rounded mb-1 sm:mb-2 flex items-center justify-center border border-gray-700 relative overflow-hidden">
                {/* Single page preview visualization */}
                <div className="absolute inset-2 bg-white rounded flex flex-col p-2">
                  <div className="h-3 bg-green-500 rounded mb-1"></div>
                  <div className="h-1 bg-gray-300 rounded mb-1"></div>
                  <div className="h-1 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="flex gap-1 mb-2">
                    <div className="h-1 bg-gray-400 rounded flex-1"></div>
                    <div className="h-1 bg-gray-400 rounded flex-1"></div>
                  </div>
                  <div className="space-y-0.5 mb-2">
                    <div className="h-1 bg-gray-300 rounded"></div>
                    <div className="h-1 bg-gray-300 rounded"></div>
                    <div className="h-1 bg-gray-300 rounded w-5/6"></div>
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className="h-1 bg-gray-400 rounded w-1/2"></div>
                    <div className="h-1 bg-gray-300 rounded"></div>
                    <div className="h-1 bg-gray-300 rounded w-4/5"></div>
                  </div>
                </div>
                <div className="absolute bottom-1 right-1 sm:bottom-1.5 sm:right-1.5 bg-green-500 text-white text-[8px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded font-bold">
                  1 PAGE
                </div>
              </div>
              <div className="text-center">
                <h4 className="text-white font-semibold text-xs sm:text-sm mb-0.5">Modern Compact</h4>
                <p className="text-gray-400 text-[10px] sm:text-xs hidden sm:block">
                  Clean single-page resume
                </p>
              </div>
              {selectedTemplate === '1-page' && (
                <div className="mt-1 sm:mt-2 text-center">
                  <span className="inline-flex items-center gap-1 text-green-400 text-[10px] sm:text-xs font-semibold">
                    <i className="fas fa-check-circle"></i> Selected
                  </span>
                </div>
              )}
            </div>

            {/* Template 2 - Two Page */}
            <div
              onClick={() => handleTemplateChange('2-page')}
              className={`cursor-pointer rounded-md sm:rounded-lg border-2 transition-all p-2 sm:p-3 ${
                selectedTemplate === '2-page'
                  ? 'border-green-500 bg-green-500/10 shadow-lg shadow-green-500/20'
                  : 'border-gray-700 bg-gray-800/50 hover:border-green-400 hover:bg-gray-800'
              }`}
            >
              <div className="aspect-[4/5] bg-gray-900 rounded mb-1 sm:mb-2 flex items-center justify-center border border-gray-700 relative overflow-hidden">
                {/* Two page preview visualization */}
                <div className="absolute inset-2 flex gap-1">
                  <div className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 rounded"></div>
                  <div className="flex-1 bg-white rounded p-1.5">
                    <div className="h-2 bg-gray-700 rounded mb-1"></div>
                    <div className="h-1 bg-gray-300 rounded mb-1"></div>
                    <div className="space-y-0.5">
                      <div className="h-0.5 bg-gray-300 rounded"></div>
                      <div className="h-0.5 bg-gray-300 rounded"></div>
                      <div className="h-0.5 bg-gray-300 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-1 right-1 sm:bottom-1.5 sm:right-1.5 bg-blue-500 text-white text-[8px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded font-bold">
                  2 PAGES
                </div>
              </div>
              <div className="text-center">
                <h4 className="text-white font-semibold text-xs sm:text-sm mb-0.5">Professional Detailed</h4>
                <p className="text-gray-400 text-[10px] sm:text-xs hidden sm:block">
                  2-page resume with sidebar
                </p>
              </div>
              {selectedTemplate === '2-page' && (
                <div className="mt-1 sm:mt-2 text-center">
                  <span className="inline-flex items-center gap-1 text-green-400 text-[10px] sm:text-xs font-semibold">
                    <i className="fas fa-check-circle"></i> Selected
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PDF Preview Container - Responsive for mobile and desktop */}
        <div className="bg-gray-950 rounded-lg p-2 sm:p-4 shadow-2xl border border-gray-800">
          {isGenerating ? (
            <div className="flex items-center justify-center bg-gray-800 rounded-lg h-[500px] sm:h-[650px] lg:h-[900px]">
              <div className="text-center">
                <i className="fas fa-spinner fa-spin text-4xl text-green-500 mb-4"></i>
                <p className="text-gray-400">Generating Resume...</p>
              </div>
            </div>
          ) : pdfBlobUrl ? (
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
                    document={selectedTemplate === '1-page' ? <ResumePDF /> : <ResumePDF2Page />}
                    fileName={`Sathish_Kumar_Resume_${selectedTemplate === '1-page' ? 'Compact' : 'Detailed'}.pdf`}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-all"
                  >
                    {({ loading }) =>
                      loading ? (
                        <>
                          <i className="fas fa-spinner fa-spin"></i> Loading...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-download"></i> Download {selectedTemplate === '1-page' ? '(1-Page)' : '(2-Page)'}
                        </>
                      )
                    }
                  </PDFDownloadLink>
                )}
              </div>

              {/* Show HTML resume on all devices */}
              <div className="overflow-y-auto max-h-[600px] sm:max-h-[800px] lg:max-h-[1000px]">
                <ResumeMobileView template={selectedTemplate} />
              </div>
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
            Choose between two professional resume templates above.
            <br />
            Scroll to view the full resume, or download the PDF for offline viewing.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ResumeViewer;
