// pdfUtils.ts

export const downloadPdf = async (rowData) => {
    try {
      const response = await fetch(`http://localhost:3001/api/download-pdf/${rowData.id}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      // Log the file path on the client side
      console.log('Received PDF path (Client):', response.url);
  
      const blob = await response.blob();
  
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `${rowData.partnership_name}.pdf`;
      link.click();
    } catch (error) {
      console.error('Error downloading PDF:', error);
  
      if (error instanceof Error && error.message) {
        console.error('Server response:', error.message);
      }
    }
  };




  export const handleDownloadAllPdf = async () => {
    try {
      // Make a request to your server to generate and download the PDF for all partnerships
      const response = await fetch('http://localhost:3001/api/download-all-pdf');
  
      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      // Get the blob data from the response
      const blob = await response.blob();
  
      // Create a download link and trigger the download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'all_partnerships.pdf';
      link.click();
    } catch (error) {
      console.error('Error downloading all PDFs:', error);
    }
  };
  