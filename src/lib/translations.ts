type Language = 'en' | 'ms';

interface Translations {
  [key: string]: {
    en: string;
    ms: string;
  };
}

const translations: Translations = {
  'title': {
    en: 'Welcome Back',
    ms: 'Selamat Kembali',
  },
  'enterCredentials': {
    en: 'Sign in to your account',
    ms: 'Masuk ke akaun anda',
  },
  'email': {
    en: 'Email',
    ms: 'Emel',
  },
  'enterEmail': {
    en: 'Enter your email address',
    ms: 'Masukkan alamat emel anda',
  },
  'password': {
    en: 'Password',
    ms: 'Kata Laluan',
  },
  'enterPassword': {
    en: 'Enter your password',
    ms: 'Masukkan kata laluan anda',
  },
  'signIn': {
    en: 'Sign In',
    ms: 'Log Masuk',
  },
  'loading': {
    en: 'Signing in...',
    ms: 'Sedang log masuk...',
  },
  'error': {
    en: 'Failed to sign in',
    ms: 'Gagal log masuk',
  },
  'noAccount': {
    en: "New to Workshop1Manager?",
    ms: 'Baru di Workshop1Manager?',
  },
  'register': {
    en: 'Create an Account',
    ms: 'Cipta Akaun',
  },

  // Form validation
  'validation.required': {
    en: 'This field is required',
    ms: 'Ruangan ini diperlukan',
  },
  'validation.email': {
    en: 'Please enter a valid email',
    ms: 'Sila masukkan emel yang sah',
  },
  'validation.password': {
    en: 'Password must be at least 6 characters',
    ms: 'Kata laluan mestilah sekurang-kurangnya 6 aksara',
  },

  // Success messages
  'success.login': {
    en: 'Successfully signed in',
    ms: 'Berjaya log masuk',
  },
  'success.register': {
    en: 'Successfully registered',
    ms: 'Berjaya mendaftar',
  },
  'success.logout': {
    en: 'Successfully signed out',
    ms: 'Berjaya log keluar',
  },

  // Error messages
  'error.register': {
    en: 'Failed to register',
    ms: 'Gagal mendaftar',
  },
  'error.general': {
    en: 'Something went wrong',
    ms: 'Sesuatu tidak kena',
  },

  // Signup translations
  'signup.title': {
    en: 'Create an Account',
    ms: 'Cipta Akaun Baru',
  },
  'signup.description': {
    en: 'Enter your email and password to get started.',
    ms: 'Masukkan emel dan kata laluan untuk bermula.',
  },
  'signup.firstName': {
    en: 'First Name',
    ms: 'Nama Pertama',
  },
  'signup.lastName': {
    en: 'Last Name',
    ms: 'Nama Akhir',
  },
  'signup.phoneNumber': {
    en: 'Phone Number',
    ms: 'Nombor Telefon',
  },
  'signup.submit': {
    en: 'Sign Up',
    ms: 'Daftar',
  },
  'signup.haveAccount': {
    en: 'Already have an account?',
    ms: 'Sudah mempunyai akaun?',
  },
  'signup.login': {
    en: 'Log in',
    ms: 'Log Masuk',
  },
  'signup.success': {
    en: 'Sign up successful! Please check your email to verify your account.',
    ms: 'Pendaftaran berjaya! Sila semak emel anda untuk pengesahan akaun.',
  },

  // Verify Email translations
  'verify.title': {
    en: 'Verify Your Email',
    ms: 'Sahkan Emel Anda',
  },
  'verify.sent': {
    en: 'A verification email has been sent to',
    ms: 'Emel pengesahan telah dihantar ke',
  },
  'verify.verified': {
    en: 'Verified',
    ms: 'Disahkan',
  },
  'verify.pending': {
    en: 'Pending Verification',
    ms: 'Menunggu Pengesahan',
  },
  'verify.resend': {
    en: 'Resend Verification Email',
    ms: 'Hantar Semula Emel Pengesahan',
  },
  'verify.resending': {
    en: 'Resending...',
    ms: 'Menghantar Semula...',
  },
  'verify.success': {
    en: 'Verification email sent! Please check your inbox.',
    ms: 'Emel pengesahan dihantar! Sila semak peti masuk anda.',
  },
  'verify.error': {
    en: 'Failed to send verification email.',
    ms: 'Gagal menghantar emel pengesahan.',
  },

  // Vehicle page translations
  'vehicle.add': {
    en: 'Add Vehicle',
    ms: 'Tambah Kenderaan',
  },
  'vehicle.details': {
    en: 'Enter your vehicle details below.',
    ms: 'Masukkan butiran kenderaan anda di bawah.',
  },
  'vehicle.nameModel': {
    en: 'Vehicle Name/Model',
    ms: 'Nama/Model Kenderaan',
  },
  'vehicle.licensePlate': {
    en: 'License Plate',
    ms: 'Nombor Plat',
  },
  'vehicle.myVehicles': {
    en: 'My Vehicles',
    ms: 'Kenderaan Saya',
  },
  'vehicle.noVehicles': {
    en: 'No vehicles found.',
    ms: 'Tiada kenderaan dijumpai.',
  },
  'vehicle.edit': {
    en: 'Edit',
    ms: 'Edit',
  },
  'vehicle.save': {
    en: 'Save',
    ms: 'Simpan',
  },
  'vehicle.cancel': {
    en: 'Cancel',
    ms: 'Batal',
  },
  'vehicle.remove': {
    en: 'Remove',
    ms: 'Buang',
  },
  'vehicle.confirmRemove': {
    en: 'Are you sure you want to remove this vehicle?',
    ms: 'Adakah anda pasti mahu membuang kenderaan ini?',
  },
  'vehicle.yes': {
    en: 'Yes, Remove',
    ms: 'Ya, Buang',
  },
  'vehicle.no': {
    en: 'No',
    ms: 'Tidak',
  },
  'vehicle.added': {
    en: 'Vehicle added!',
    ms: 'Kenderaan ditambah!',
  },
  'vehicle.updated': {
    en: 'Vehicle updated!',
    ms: 'Kenderaan dikemas kini!',
  },
  'vehicle.removed': {
    en: 'Vehicle removed!',
    ms: 'Kenderaan dibuang!',
  },
  'vehicle.error.auth': {
    en: 'You must be signed in to add a vehicle.',
    ms: 'Anda perlu log masuk untuk menambah kenderaan.',
  },

  // Appointment page translations
  'appointment.book': {
    en: 'Book Appointment',
    ms: 'Tempah Temujanji',
  },
  'appointment.details': {
    en: 'Fill in the details to book a service appointment.',
    ms: 'Isi butiran untuk menempah temujanji servis.',
  },
  'appointment.selectVehicle': {
    en: 'Select Vehicle',
    ms: 'Pilih Kenderaan',
  },
  'appointment.serviceDate': {
    en: 'Service Date',
    ms: 'Tarikh Servis',
  },
  'appointment.timeSlot': {
    en: 'Time Slot',
    ms: 'Slot Masa',
  },
  'appointment.serviceType': {
    en: 'Service Type',
    ms: 'Jenis Servis',
  },
  'appointment.upcoming': {
    en: 'Upcoming Appointments',
    ms: 'Temujanji Akan Datang',
  },
  'appointment.noUpcoming': {
    en: 'No upcoming appointments.',
    ms: 'Tiada temujanji akan datang.',
  },
  'appointment.cancel': {
    en: 'Cancel',
    ms: 'Batal',
  },
  'appointment.confirmCancel': {
    en: 'Are you sure you want to cancel this appointment?',
    ms: 'Adakah anda pasti mahu membatalkan temujanji ini?',
  },
  'appointment.yesCancel': {
    en: 'Yes, Cancel',
    ms: 'Ya, Batal',
  },
  'appointment.noKeep': {
    en: 'No, Keep',
    ms: 'Tidak, Kekal',
  },
  'appointment.success.book': {
    en: 'Appointment booked!',
    ms: 'Temujanji ditempah!',
  },
  'appointment.success.cancel': {
    en: 'Appointment cancelled!',
    ms: 'Temujanji dibatalkan!',
  },
  'appointment.error.auth': {
    en: 'You must be signed in to book an appointment.',
    ms: 'Anda perlu log masuk untuk menempah temujanji.',
  },
  'appointment.error.required': {
    en: 'Please fill in all fields.',
    ms: 'Sila isi semua ruangan.',
  },
  'appointment.select': {
    en: '-- Select --',
    ms: '-- Pilih --',
  },
  // Time slots
  'timeSlot.morning': {
    en: 'Morning',
    ms: 'Pagi',
  },
  'timeSlot.noon': {
    en: 'Noon',
    ms: 'Tengah Hari',
  },
  'timeSlot.afternoon': {
    en: 'Afternoon',
    ms: 'Petang',
  },
  // Service types
  'serviceType.basic': {
    en: 'Basic',
    ms: 'Asas',
  },
  'serviceType.brake': {
    en: 'Brake',
    ms: 'Brek',
  },
  'serviceType.engine': {
    en: 'Engine',
    ms: 'Enjin',
  },
  'serviceType.tire': {
    en: 'Tire',
    ms: 'Tayar',
  },
  'serviceType.battery': {
    en: 'Battery',
    ms: 'Bateri',
  },
  'serviceType.other': {
    en: 'Other',
    ms: 'Lain-lain',
  },

  // Service history translations
  'service.selectVehicle': {
    en: 'Select Vehicle',
    ms: 'Pilih Kenderaan',
  },
  'service.addRecord': {
    en: 'Add Service Record',
    ms: 'Tambah Rekod Servis',
  },
  'service.date': {
    en: 'Service Date',
    ms: 'Tarikh Servis',
  },
  'service.description': {
    en: 'Service Description',
    ms: 'Penerangan Servis',
  },
  'service.workshop': {
    en: 'Workshop Name (optional)',
    ms: 'Nama Bengkel (pilihan)',
  },
  'service.records': {
    en: 'Service Records',
    ms: 'Rekod Servis',
  },
  'service.noRecords': {
    en: 'No service records found.',
    ms: 'Tiada rekod servis dijumpai.',
  },
  'service.success.add': {
    en: 'Service record added!',
    ms: 'Rekod servis ditambah!',
  },
  'service.workshop.label': {
    en: 'Workshop: ',
    ms: 'Bengkel: ',
  },

  // Profile page translations
  'profile.title': {
    en: 'My Profile',
    ms: 'Profil Saya',
  },
  'profile.description': {
    en: 'View and edit your profile information.',
    ms: 'Lihat dan sunting maklumat profil anda.',
  },
  'profile.firstName': {
    en: 'First Name',
    ms: 'Nama Pertama',
  },
  'profile.lastName': {
    en: 'Last Name',
    ms: 'Nama Akhir',
  },
  'profile.phoneNumber': {
    en: 'Phone Number',
    ms: 'Nombor Telefon',
  },
  'profile.saveChanges': {
    en: 'Save Changes',
    ms: 'Simpan Perubahan',
  },
  'profile.updateSuccess': {
    en: 'Profile updated successfully!',
    ms: 'Profil berjaya dikemas kini!',
  },
  'logout': {
    en: 'Logout',
    ms: 'Log Keluar',
  },

  // Dashboard translations
  'dashboard.welcome': {
    en: 'Welcome',
    ms: 'Selamat Datang',
  },
  'dashboard.description': {
    en: 'This is your Workshop1Manager dashboard.',
    ms: 'Ini ialah papan pemuka Workshop1Manager anda.',
  },
  'dashboard.loading': {
    en: 'Loading...',
    ms: 'Memuatkan...',
  },
  // Dashboard cards
  'dashboard.vehicles.title': {
    en: 'Vehicles',
    ms: 'Kenderaan',
  },
  'dashboard.vehicles.description': {
    en: 'Manage your vehicles',
    ms: 'Urus kenderaan anda',
  },
  'dashboard.vehicles.registered': {
    en: 'registered',
    ms: 'berdaftar',
  },
  'dashboard.appointments.title': {
    en: 'Appointments',
    ms: 'Temujanji',
  },
  'dashboard.appointments.description': {
    en: 'Book or view service appointments',
    ms: 'Tempah atau lihat temujanji servis',
  },
  'dashboard.appointments.next': {
    en: 'Next',
    ms: 'Seterusnya',
  },
  'dashboard.appointments.noUpcoming': {
    en: 'No upcoming',
    ms: 'Tiada temujanji',
  },
  'dashboard.appointments.service': {
    en: 'Service',
    ms: 'Servis',
  },
  'dashboard.history.title': {
    en: 'Service History',
    ms: 'Sejarah Servis',
  },
  'dashboard.history.description': {
    en: 'View and add service records',
    ms: 'Lihat dan tambah rekod servis',
  },
  'dashboard.profile.title': {
    en: 'Profile',
    ms: 'Profil',
  },
  'dashboard.profile.description': {
    en: 'Manage your account',
    ms: 'Urus akaun anda',
  },
};

export const translate = (key: string, lang: Language): string => {
  const translation = translations[key];
  if (!translation) {
    if (typeof window !== 'undefined') {
      console.warn(`Translation missing for key: ${key}`);
    }
    return key;
  }
  return translation[lang] || translation['en'] || key;
};

export const useTranslation = (lang: Language) => {
  // We'll memoize the translation function to avoid unnecessary re-renders
  return (key: string) => {
    if (!key) return '';
    return translate(key, lang);
  };
};
