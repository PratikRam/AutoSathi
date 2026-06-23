import jsPDF from "jspdf";
import { toast } from "sonner";


const generatePDF = (vehicle, services, AllCost) => {
    const pdf = new jsPDF();
    let y = 20;

    // Header Background
    pdf.setFillColor(37, 99, 235); // blue
    pdf.rect(0, 0, 210, 30, "F");

    // Header Text
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.text("Service History Report", 60, 20);

    y = 40;

    // Reset text color
    pdf.setTextColor(0, 0, 0);

    // Vehicle Details Section
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    y += 10;
    pdf.text("Vehicle Details", 10, y);
    y += 10;

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");

    pdf.text(`Vehicle Name: ${vehicle.vehicleName}`, 10, y);
    y += 8;

    pdf.text(`Registration No: ${vehicle.registrationNumber}`, 10, y);
    y += 15;

    // Services Section Title
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.text("Service Records :", 10, y);
    y += 10;

    services.forEach((service, index) => {
      if (y > 250) {
        pdf.addPage();
        y = 20;
      }

      const serviceNumber = services.length - index;
      const serviceDate = new Date(service.serviceDate);
      const newDate = serviceDate.toLocaleDateString('en-IN');

      // Card background
      pdf.setFillColor(240, 248, 255);
      pdf.roundedRect(10, y - 5, 190, 35, 3, 3, "F");

      pdf.setFontSize(12);
      pdf.setFont("helvetica", "bold");
      pdf.text(`Service ${serviceNumber}`, 15, y + 2);

      pdf.setFont("helvetica", "normal");

      pdf.text(`Notes: ${service.notes}`, 15, y + 10);
      pdf.text(`Garage: ${service.garageName}`, 15, y + 18);
      pdf.text(`Date: ${newDate}`, 110, y + 10);
      pdf.text(`Cost: ${service.cost}`, 110, y + 18);

      y += 45;
    });

    // Summary Section
    if (y > 250) {
      pdf.addPage();
      y = 20;
    }

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.text("Summary", 10, y);
    y += 10;

    pdf.setFont("helvetica", "normal");
    pdf.text(`Total Services: ${services.length}`, 10, y);
    y += 8;

    pdf.text(`Total Cost: ${AllCost}`, 10, y);

    pdf.save(`service-history-${vehicle.vehicleName}.pdf`);
    toast.success('PDF generated successfully')
  };

export default generatePDF