import { Language } from './types';

type TranslationKeys = {
  [key: string]: string;
};

export const TRANSLATIONS: Record<Language, TranslationKeys> = {
  en: {
    // Header
    nav_home: "Home",
    nav_services: "Services",
    nav_gallery: "Gallery",
    nav_quote: "Get a Quote",
    nav_admin: "Staff Login",
    
    // Footer
    footer_desc: "Transforming spaces with precision. We are a fully licensed and insured general contractor, taking pride in quality craftsmanship and customer satisfaction.",
    footer_contact: "Contact Us",
    footer_rights: "All rights reserved.",
    footer_admin: "Admin Area",

    // Home
    hero_title_1: "Transforming Spaces with",
    hero_title_highlight: "AED Remodeling LLC",
    hero_subtitle: "Home remodeling, premium kitchen and bath renovations, and expert craftsmanship tailored to your unique style and budget. Quality finish, every time.",
    hero_cta_quote: "Request a Quote",
    hero_cta_work: "View Our Work",
    
    why_choose_us: "Why Choose AED Remodeling LLC?",
    reason_quality: "Quality Guaranteed",
    reason_quality_desc: "We use only premium materials. Our work is backed by our commitment to excellence.",
    reason_time: "Fully Licensed & Insured",
    reason_time_desc: "We provide complete peace of mind. Your property is protected, and our work meets all standards.",
    reason_rated: "Professional Team",
    reason_rated_desc: "Our contractors are experienced professionals dedicated to delivering the best results for your project.",
    
    services_title: "Our Core Specialties",
    services_subtitle: "Comprehensive remodeling and contracting solutions for every need.",
    view_all_services: "View all services",
    learn_more: "Learn more",
    
    featured_projects: "Featured Projects",
    view_gallery: "View Full Portfolio",
    
    transformation_title: "See the Difference",
    transformation_subtitle: "Slide to see our remodeling transformations.",
    before: "Before",
    after: "After",
    
    ready_title: "Ready to Transform Your Space?",
    ready_subtitle: "Contact us today for a free consultation and quote. We're ready to help you with your next project.",
    schedule_now: "Schedule Now",

    // Services Page
    services_page_title: "Our Professional Services",
    services_page_subtitle: "Expert remodeling solutions tailored to your unique needs.",
    request_quote: "Request Quote",
    service_point_paint: "Premium material selection",
    service_point_prep: "Detailed surface and site preparation",
    service_point_clean: "Clean and efficient workspace",

    // Gallery Page
    gallery_title: "Our Portfolio",
    gallery_subtitle: "Browse our collection of residential and commercial remodeling projects.",
    gallery_no_projects: "No projects found in this category.",
    cat_all: "All",

    // Contact Page
    contact_title: "Request a Free Quote",
    contact_subtitle: "Fill out the form below, call, or text us to schedule your consultation.",
    contact_info: "Contact Information",
    info_phone: "Phone",
    info_phone_desc: "Call Mon-Fri, 8am-6pm",
    info_text: "Text Message",
    info_text_desc: "Text us anytime for quick questions",
    info_email: "Email",
    info_area: "Service Area",
    info_area_desc: "Greater Metro Area & Suburbs",
    emergency_title: "Emergency Service?",
    emergency_desc: "Need a project done urgently? We have limited weekend slots available.",
    call_emergency: "Call Emergency Line",
    
    schedule_appt: "Request a Quote",
    form_name: "Full Name *",
    form_email: "Email Address *",
    form_phone: "Phone Number *",
    form_date: "Preferred Appointment Date",
    form_service: "Service Needed",
    form_budget: "Budget Range",
    form_desc: "Project Description *",
    form_desc_placeholder: "Please describe the project details, approx sq footage, and any specific requirements...",
    form_upload: "Upload Project Image (Optional)",
    form_max_size: "Max file size: 8MB",
    form_file_error: "File size exceeds 8MB limit. Please choose a smaller image.",
    submit_btn: "Submit Quote Request",
    submit_sending: "Sending Request...",
    submit_agree: "By submitting this form, you agree to receive email or text communications from AED Remodeling LLC.",
    request_received: "Request Received!",
    request_thanks: "Thank you, {name}. We will contact you shortly to discuss your quote.",
    send_another: "Send another",

    // Login
    admin_access: "Admin Access",
    enter_passcode: "Please enter your passcode to continue.",
    unlock_dashboard: "Unlock Dashboard",
    invalid_pass: "Invalid password.",

    // Admin
    admin_dashboard: "Admin Dashboard",
    logout: "Logout",
    tab_appointments: "Appointments",
    tab_gallery: "Gallery Manager",
    tab_services: "Services Manager",
    new: "New",
    
    appt_requests: "Quote Requests",
    no_requests: "No quote requests yet.",
    btn_confirm: "Confirm",
    btn_archive: "Archive",
    
    manage_portfolio: "Manage Portfolio",
    add_project: "Add New Project",
    upload_project: "Upload Project",

    // Estimator
    est_title: "AED Remodeling LLC",
    est_subtitle: "Estimator & Contract Generator",
    est_tab_builder: "Builder",
    est_tab_saved: "Saved Estimates",
    est_new: "New",
    est_save: "Save",
    est_export: "Export PDF",
    est_client_info: "Client Information",
    est_project_details: "Project Details",
    est_line_items: "Line Items",
    est_add_item: "Add Item",
    est_desc: "Description",
    est_qty: "Qty",
    est_price: "Price",
    est_total: "Total",
    est_subtotal: "Subtotal",
    est_discount: "Discount",
    est_tax: "Tax Rate (%)",
    est_total_due: "Total Due",
    est_deposit: "Deposit (50%)",
    est_balance: "Balance",
    est_contract: "Contract Agreement",
    est_terms: "Terms & Conditions",
    est_colors: "Color Selections",
    est_signature: "Client Signature",
    est_clear: "Clear",
    est_confirm: "Confirm Signature",
    est_signed: "Signed",
    est_date_signed: "Date Signed",
    est_translate: "Translate to Spanish",
    est_translating: "Translating...",
  },
  es: {
    // Header
    nav_home: "Inicio",
    nav_services: "Servicios",
    nav_gallery: "Galería",
    nav_quote: "Cotización",
    nav_admin: "Acceso Personal",
    
    // Footer
    footer_desc: "Transformando espacios con precisión. Somos un contratista general con licencia y seguro completos, orgullosos de nuestra calidad artesanal y la satisfacción del cliente.",
    footer_contact: "Contáctenos",
    footer_rights: "Todos los derechos reservados.",
    footer_admin: "Área de Admin",

    // Home
    hero_title_1: "Transformando Espacios con",
    hero_title_highlight: "AED Remodeling LLC",
    hero_subtitle: "Remodelación de hogares, renovaciones premium de cocinas y baños, y artesanía experta adaptada a su estilo único y presupuesto. Acabados de calidad, siempre.",
    hero_cta_quote: "Solicitar Cotización",
    hero_cta_work: "Ver Nuestro Trabajo",
    
    why_choose_us: "¿Por Qué Elegir AED Remodeling LLC?",
    reason_quality: "Calidad Garantizada",
    reason_quality_desc: "Utilizamos solo materiales premium. Nuestro trabajo está respaldado por nuestro compromiso con la excelencia.",
    reason_time: "Licencia y Seguro Completos",
    reason_time_desc: "Brindamos total tranquilidad. Su propiedad está protegida y nuestro trabajo cumple con todos los estándares.",
    reason_rated: "Equipo Profesional",
    reason_rated_desc: "Nuestros contratistas son profesionales experimentados dedicados a entregar los mejores resultados para su proyecto.",
    
    services_title: "Nuestras Especialidades Principales",
    services_subtitle: "Soluciones integrales de remodelación y contratación para cada necesidad.",
    view_all_services: "Ver todos los servicios",
    learn_more: "Aprender más",
    
    featured_projects: "Proyectos Destacados",
    view_gallery: "Ver Portafolio Completo",
    
    transformation_title: "Vea la Diferencia",
    transformation_subtitle: "Deslice para ver nuestras transformaciones de remodelación.",
    before: "Antes",
    after: "Después",
    
    ready_title: "¿Listo para Transformar Su Espacio?",
    ready_subtitle: "Contáctenos hoy para una consulta y cotización gratuita. Estamos listos para ayudarlo con su próximo proyecto.",
    schedule_now: "Programar Ahora",

    // Services Page
    services_page_title: "Nuestros Servicios Profesionales",
    services_page_subtitle: "Soluciones expertas de remodelación adaptadas a sus necesidades únicas.",
    request_quote: "Solicitar Cotización",
    service_point_paint: "Selección de materiales premium",
    service_point_prep: "Preparación detallada de la superficie y el sitio",
    service_point_clean: "Espacio de trabajo limpio y eficiente",

    // Gallery Page
    gallery_title: "Nuestro Portafolio",
    gallery_subtitle: "Explore nuestra colección de proyectos de remodelación residencial y comercial.",
    gallery_no_projects: "No se encontraron proyectos en esta categoría.",
    cat_all: "Todos",

    // Contact Page
    contact_title: "Solicitar Cotización Gratis",
    contact_subtitle: "Complete el formulario a continuación, llame o envíenos un mensaje de texto para programar su consulta.",
    contact_info: "Información de Contacto",
    info_phone: "Teléfono",
    info_phone_desc: "Llame Lun-Vie, 8am-6pm",
    info_text: "Mensaje de Texto",
    info_text_desc: "Envíenos un mensaje en cualquier momento",
    info_email: "Correo Electrónico",
    info_area: "Área de Servicio",
    info_area_desc: "Área Metropolitana y Suburbios",
    emergency_title: "¿Servicio de Emergencia?",
    emergency_desc: "¿Necesita un proyecto urgente? Tenemos espacios limitados los fines de semana.",
    call_emergency: "Llamar Línea de Emergencia",
    
    schedule_appt: "Solicitar Cotización",
    form_name: "Nombre Completo *",
    form_email: "Correo Electrónico *",
    form_phone: "Número de Teléfono *",
    form_date: "Fecha Preferida",
    form_service: "Servicio Necesario",
    form_budget: "Rango de Presupuesto",
    form_desc: "Descripción del Proyecto *",
    form_desc_placeholder: "Describa los detalles del proyecto, pies cuadrados aprox. y cualquier requisito específico...",
    form_upload: "Subir Imagen del Proyecto (Opcional)",
    form_max_size: "Tamaño máximo de archivo: 8MB",
    form_file_error: "El tamaño del archivo excede el límite de 8MB. Por favor, elija una imagen más pequeña.",
    submit_btn: "Enviar Solicitud de Cotización",
    submit_sending: "Enviando...",
    submit_agree: "Al enviar este formulario, acepta recibir comunicaciones por correo o texto de AED Remodeling LLC.",
    request_received: "¡Solicitud Recibida!",
    request_thanks: "Gracias, {name}. Nos pondremos en contacto pronto para hablar sobre su cotización.",
    send_another: "Enviar otro",

    // Login
    admin_access: "Acceso Administrativo",
    enter_passcode: "Por favor ingrese su código para continuar.",
    unlock_dashboard: "Desbloquear Panel",
    invalid_pass: "Contraseña inválida.",

    // Admin
    admin_dashboard: "Panel de Administración",
    logout: "Cerrar Sesión",
    tab_appointments: "Citas",
    tab_gallery: "Gestor de Galería",
    tab_services: "Gestor de Servicios",
    new: "Nuevo",
    
    appt_requests: "Solicitudes de Cotización",
    no_requests: "No hay solicitudes de cotización todavía.",
    btn_confirm: "Confirmar",
    btn_archive: "Archivar",
    
    manage_portfolio: "Gestionar Portafolio",
    add_project: "Agregar Nuevo Proyecto",
    upload_project: "Subir Proyecto",

    // Estimator
    est_title: "AED Remodeling LLC",
    est_subtitle: "Estimador y Generador de Contratos",
    est_tab_builder: "Constructor",
    est_tab_saved: "Estimaciones Guardadas",
    est_new: "Nuevo",
    est_save: "Guardar",
    est_export: "Exportar PDF",
    est_client_info: "Información del Cliente",
    est_project_details: "Detalles del Proyecto",
    est_line_items: "Partidas",
    est_add_item: "Agregar Ítem",
    est_desc: "Descripción",
    est_qty: "Cant",
    est_price: "Precio",
    est_total: "Total",
    est_subtotal: "Subtotal",
    est_discount: "Descuento",
    est_tax: "Impuesto (%)",
    est_total_due: "Total a Pagar",
    est_deposit: "Depósito (50%)",
    est_balance: "Saldo",
    est_contract: "Acuerdo de Contrato",
    est_terms: "Términos y Condiciones",
    est_colors: "Selección de Colores",
    est_signature: "Firma del Cliente",
    est_clear: "Borrar",
    est_confirm: "Confirmar Firma",
    est_signed: "Firmado",
    est_date_signed: "Fecha de Firma",
    est_translate: "Traducir a Inglés",
    est_translating: "Traduciendo...",
  }
};

