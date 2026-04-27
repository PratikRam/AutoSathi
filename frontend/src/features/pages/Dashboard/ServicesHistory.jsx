import { getService, deleteService } from '@/api/services/services.api'
import { Button } from '@/components/ui/button'
import useServiceStore from '@/store/servicesStore'
import useVehicleStore from '@/store/vehicleStore'
import jsPDF from 'jspdf'
import { ChevronRight, Loader2, Trash2, Calendar, Wrench, IndianRupee } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ServicesHistory = () => {
  const { services, setServices, loading, setLoading, error, setError } = useServiceStore()
  const { vehicles } = useVehicleStore()
  const { id } = useParams()
  const navigate = useNavigate()

  const vehicle = vehicles.find(v => v._id === id)
  const vehicleImg = vehicle?.image

  const AllCost = services?.reduce((acc, service) => acc + (service.cost || 0), 0) || 0;


  const generatePDF = () => {
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
  };

  const handleDelete = async serviceId => {
    try {
      setLoading(true)
      if (!window.confirm('Are you sure you want to delete this service?')) {
        return
      }
      await deleteService(serviceId)
      setServices(services.filter(s => s._id !== serviceId))
      setError(null)
    } catch (err) {
      setError(err.message)
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchServices = async () => {
    if (!id) return;
    try {
      setLoading(true)
      const response = await getService(id)
      setServices(response.services || [])
      setError(null)
    } catch (err) {
      setError(err.message)
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [id])

  if (!vehicle) {
    return (
      <div className='p-8 flex justify-center items-center min-h-[50vh]'>
        <p className="text-gray-500 text-lg">Loading vehicle details or vehicle not found...</p>
      </div>
    )
  }

  return (
    <div className='w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-8 bg-slate-50/50 min-h-screen'>
      {/* Header Section */}
      <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight'>Service History</h1>
          <p className='text-gray-500 text-sm flex items-center flex-wrap gap-1 mt-1'>
            <span className='cursor-pointer hover:text-blue-600 transition-colors font-medium' onClick={() => navigate('/myvehicles')}>My Vehicles</span>
            <ChevronRight size={16} className="text-gray-400" />
            <span className="font-medium text-gray-700">{vehicle.vehicleName}</span>
            <ChevronRight size={16} className="text-gray-400" />
            <span className='font-semibold text-blue-600'>History</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="flex flex-col bg-slate-50 px-5 py-3 rounded-xl border border-slate-100 min-w-[120px]">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Total Services</span>
            <span className="text-2xl font-bold text-gray-900">{services?.length || 0}</span>
          </div>
          <div className="flex flex-col bg-blue-50/50 px-5 py-3 rounded-xl border border-blue-100 min-w-[120px]">
            <span className="text-[11px] font-bold text-blue-600/80 uppercase tracking-wider mb-1">Total Maintenance</span>
            <span className="text-2xl font-bold text-blue-600">₹{AllCost.toLocaleString('en-IN')}</span>
          </div>
          <Button
            onClick={() => navigate(`/add-service/${id}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all duration-200 active:scale-95 w-full sm:w-auto font-medium h-[4.5rem] sm:h-[4.5rem] px-8 rounded-xl mt-2 sm:mt-0 text-[15px]"
          >
            Add Service
          </Button>
        </div>
      </div>

      {/* Vehicle Info Section */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Image Card */}
        <div className='lg:col-span-1 rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white group h-72 lg:h-auto min-h-[280px] relative'>
          <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
            {vehicleImg ? (
              <img
                src={vehicleImg}
                alt={vehicle.vehicleName}
                className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
              />
            ) : (
              <span className="text-gray-400 font-medium">No Image Available</span>
            )}
          </div>
        </div>

        {/* Overview Card */}
        <div className='lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col justify-center relative overflow-hidden'>
          <div className="absolute -top-10 -right-10 p-8 opacity-[0.03] pointer-events-none">
            <Wrench size={200} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{vehicle.vehicleName} Overview</h2>
          <p className="text-gray-500 max-w-2xl leading-relaxed text-lg">
            Keep track of your {vehicle.vehicleName}'s service history to ensure optimal performance and longevity. Regular servicing prevents major breakdowns and preserves the value of your {vehicle.vehicleName}.
          </p>
        </div>
      </div>

      {/* Services List */}
      <div className='w-full space-y-6'>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-1">

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Service Records
          </h2>

          <Button
            onClick={() => generatePDF()}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all duration-200 active:scale-95 w-full sm:w-auto h-12 sm:h-[4.5rem] px-6 sm:px-8 rounded-xl text-sm sm:text-[15px] font-medium"
          >
            Download PDF
          </Button>

        </div>

        {loading ? (
          <div className='flex items-center justify-center py-24 w-full bg-white rounded-2xl border border-gray-100 shadow-sm'>
            <div className="flex flex-col items-center gap-4 text-gray-500">
              <Loader2 className='animate-spin h-10 w-10 text-blue-600' />
              <span className="text-lg font-medium">Loading service records...</span>
            </div>
          </div>
        ) : services?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(service => (
              <div
                key={service._id}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col relative group overflow-hidden"
              >
                {/* Accent bar at the top */}
                <div className="h-1 w-full bg-blue-600/80"></div>

                <div className="p-6 flex flex-col h-full flex-grow">
                  <div className='flex justify-between items-start mb-6 gap-4'>
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-snug flex-1">
                      {service.notes || "General Maintenance"}
                    </h3>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className='p-2 -mr-2 -mt-2 rounded-full text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors opacity-100 lg:opacity-0 group-hover:opacity-100 focus:opacity-100 bg-white'
                      title='Delete Service'
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="space-y-4 mt-auto pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="p-2.5 bg-blue-50/80 text-blue-600 rounded-xl">
                        <Wrench size={18} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">Garage</span>
                        <span className="font-semibold text-gray-900">{service.garageName || "Not specified"}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="p-2.5 bg-emerald-50/80 text-emerald-600 rounded-xl">
                        <Calendar size={18} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">Date</span>
                        <span className="font-semibold text-gray-900">
                          {new Date(service.serviceDate).toLocaleDateString("en-IN", {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="p-2.5 bg-purple-50/80 text-purple-600 rounded-xl">
                        <IndianRupee size={18} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">Cost</span>
                        <span className="font-bold text-gray-900 text-base">₹{Number(service.cost).toLocaleString('en-IN') || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-dashed border-gray-200 shadow-sm px-4'>
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <Wrench className="text-slate-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">No services recorded</h3>
            <p className='text-gray-500 text-center max-w-md mb-8 text-lg'>
              You haven't added any service history for this vehicle yet. Keep track of your maintenance to ensure longevity.
            </p>
            <Button
              onClick={() => navigate(`/add-service/${id}`)}
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-md h-12 px-8 rounded-xl font-medium"
            >
              Add Your First Service
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ServicesHistory