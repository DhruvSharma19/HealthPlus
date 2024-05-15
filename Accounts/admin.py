from django.contrib import admin
from .models import AppUser, PatientProfile, DoctorProfile, symptoms_diseases, Predicted_Diseases

admin.site.register(AppUser)
admin.site.register(PatientProfile)
admin.site.register(DoctorProfile)
admin.site.register(symptoms_diseases) 
admin.site.register(Predicted_Diseases)

