from django.db import connection
from django.shortcuts import render

# Create your views here.
from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer, PatientSerializer, UserSerializer, DoctorProfileSerializer
from rest_framework import permissions, status, generics
from .validations import custom_validation, validate_email, validate_password
from .models import DoctorProfile, AppUser
from django.http import JsonResponse


class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)
    ##

    def post(self, request):
        data = request.data
        assert validate_email(data)
        assert validate_password(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    ##

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)

def check_email(request):
    email = request.GET.get('email')
    if email:
        email_exists = AppUser.objects.filter(email=email).exists()
        response_data = {'email_exists': email_exists}
        return JsonResponse(response_data)
    else:
        response_data = {'error': 'Email parameter is missing'}
        return JsonResponse(response_data, status=400)


class PatientProfile(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        profile = request.user.profile

        if not profile:
            return Response({'error': 'User does not have a profile'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = PatientSerializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        serializer = PatientSerializer(
            request.user.profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DoctorProfileListAPIView(generics.ListAPIView):
    serializer_class = DoctorProfileSerializer

    def get_queryset(self):
        speciality = self.kwargs.get('sp', '')
        if speciality == 'All':
            queryset = DoctorProfile.objects.all()
        else:
            queryset = DoctorProfile.objects.filter(speciality__icontains=speciality)
        
        queryset = queryset.order_by('?')[:12]
        
        return queryset




def insert_data(request):
    query = """
        INSERT INTO "Accounts_doctorprofile" (name, speciality, sex, experience, work_address, mobile_no, image_link, profile_link)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s);
    """
    values = [
    # Family Medicine
    ('Dr. John Smith', 'Family Medicine', 'male', 15, '123 Main Street, City, State', '1234567890', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-john-smith'),
    ('Dr. Emma Thompson', 'Family Medicine', 'female', 12, '456 Elm Street, City, State', '9876543210', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-emma-thompson'),
    ('Dr. David Wilson', 'Family Medicine', 'male', 10, '789 Oak Street, City, State', '2468135790', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-david-wilson'),
    ('Dr. Lily Rodriguez', 'Family Medicine', 'female', 8, '321 Maple Street, City, State', '1357924680', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-lily-rodriguez'),
    

    # Internal Medicine
    ('Dr. Emily Johnson', 'Internal Medicine', 'female', 20, '123 Main Street, City, State', '1234567890', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-emily-johnson'),
    ('Dr. Benjamin Davis', 'Internal Medicine', 'male', 18, '456 Elm Street, City, State', '9876543210', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-benjamin-davis'),
    ('Dr. Sophia Thompson', 'Internal Medicine', 'female', 22, '789 Oak Street, City, State', '2468135790', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-sophia-thompson'),
    ('Dr. Daniel Wilson', 'Internal Medicine', 'male', 16, '321 Maple Street, City, State', '1357924680', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-daniel-wilson'),
    

    # Pediatrician
    ('Dr. Michael Johnson', 'Pediatrician', 'male', 18, '123 Main Street, City, State', '1234567890', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-michael-johnson'),
    ('Dr. Abigail Smith', 'Pediatrician', 'female', 15, '456 Elm Street, City, State', '9876543210', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-abigail-smith'),
    ('Dr. Ethan Davis', 'Pediatrician', 'male', 10, '789 Oak Street, City, State', '2468135790', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-ethan-davis'),
    ('Dr. Isabella Wilson', 'Pediatrician', 'female', 12, '321 Maple Street, City, State', '1357924680', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-isabella-wilson'),
    
    # Obstetricians/gynecologist (OBGYNs)
    ('Dr. Olivia Davis', 'Gynecologist', 'female', 25, '123 Main Street, City, State', '1234567890', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-olivia-davis'),
    ('Dr. Liam Johnson', 'Gynecologist', 'male', 22, '456 Elm Street, City, State', '9876543210', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-liam-johnson'),
    ('Dr. Ava Brown', 'Gynecologist', 'female', 20, '789 Oak Street, City, State', '2468135790', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-ava-brown'),
    ('Dr. Noah Thompson', 'Gynecologist', 'male', 18, '321 Maple Street, City, State', '1357924680', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-noah-thompson'),

    # Cardiologist
    ('Dr. Benjamin Smith', 'Cardiologist', 'male', 22, '123 Main Street, City, State', '1234567890', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-benjamin-smith'),
    ('Dr. Charlotte Johnson', 'Cardiologist', 'female', 20, '456 Elm Street, City, State', '9876543210', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-charlotte-johnson'),
    ('Dr. Samuel Brown', 'Cardiologist', 'male', 18, '789 Oak Street, City, State', '2468135790', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-samuel-brown'),
    ('Dr. Grace Thompson', 'Cardiologist', 'female', 16, '321 Maple Street, City, State', '1357924680', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-grace-thompson'),
    
    # Oncologist
    ('Dr. William Wilson', 'Oncologist', 'male', 30, '123 Main Street, City, State', '1234567890', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-william-wilson'),
    ('Dr. Sophia Johnson', 'Oncologist', 'female', 28, '456 Elm Street, City, State', '9876543210', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-sophia-johnson'),
    ('Dr. Alexander Brown', 'Oncologist', 'male', 25, '789 Oak Street, City, State', '2468135790', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-alexander-brown'),
    ('Dr. Mia Thompson', 'Oncologist', 'female', 22, '321 Maple Street, City, State', '1357924680', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-mia-thompson'),
    
    # Gastroenterologist
    ('Dr. Olivia Smith', 'Gastroenterologist', 'female', 25, '123 Main Street, City, State', '1234567890', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-olivia-smith'),
    ('Dr. Liam Johnson', 'Gastroenterologist', 'male', 22, '456 Elm Street, City, State', '9876543210', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-liam-johnson'),
    ('Dr. Ava Brown', 'Gastroenterologist', 'female', 20, '789 Oak Street, City, State', '2468135790', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-ava-brown'),
    ('Dr. Noah Thompson', 'Gastroenterologist', 'male', 18, '321 Maple Street, City, State', '1357924680', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-noah-thompson'),
    
    # Pulmonologist
    ('Dr. Benjamin Wilson', 'Pulmonologist', 'male', 20, '123 Main Street, City, State', '1234567890', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-benjamin-wilson'),
    ('Dr. Charlotte Johnson', 'Pulmonologist', 'female', 18, '456 Elm Street, City, State', '9876543210', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-charlotte-johnson'),
    ('Dr. Samuel Brown', 'Pulmonologist', 'male', 16, '789 Oak Street, City, State', '2468135790', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-samuel-brown'),
    ('Dr. Grace Thompson', 'Pulmonologist', 'female', 14, '321 Maple Street, City, State', '1357924680', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-grace-thompson'),
    
    # Infectious Disease
    ('Dr. William Smith', 'Infectious Disease', 'male', 18, '123 Main Street, City, State', '1234567890', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-william-smith'),
    ('Dr. Sophia Johnson', 'Infectious Disease', 'female', 16, '456 Elm Street, City, State', '9876543210', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-sophia-johnson'),
    ('Dr. Alexander Brown', 'Infectious Disease', 'male', 14, '789 Oak Street, City, State', '2468135790', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-alexander-brown'),
    ('Dr. Mia Thompson', 'Infectious Disease', 'female', 12, '321 Maple Street, City, State', '1357924680', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-mia-thompson'),
    

    # Nephrologist
    ('Dr. Olivia Smith', 'Nephrologist', 'female', 25, '123 Main Street, City, State', '1234567890', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-olivia-smith'),
    ('Dr. Liam Johnson', 'Nephrologist', 'male', 22, '456 Elm Street, City, State', '9876543210', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-liam-johnson'),
    ('Dr. Ava Brown', 'Nephrologist', 'female', 20, '789 Oak Street, City, State', '2468135790', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-ava-brown'),
    ('Dr. Noah Thompson', 'Nephrologist', 'male', 18, '321 Maple Street, City, State', '1357924680', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-noah-thompson'),
    
    # Endocrinologist
    ('Dr. Benjamin Wilson', 'Endocrinologist', 'male', 20, '123 Main Street, City, State', '1234567890', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-benjamin-wilson'),
    ('Dr. Charlotte Johnson', 'Endocrinologist', 'female', 18, '456 Elm Street, City, State', '9876543210', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-charlotte-johnson'),
    ('Dr. Samuel Brown', 'Endocrinologist', 'male', 16, '789 Oak Street, City, State', '2468135790', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-samuel-brown'),
    ('Dr. Grace Thompson', 'Endocrinologist', 'female', 14, '321 Maple Street, City, State', '1357924680', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-grace-thompson'),
    
    # Ophthalmologist
    ('Dr. William Smith', 'Ophthalmologist', 'male', 18, '123 Main Street, City, State', '1234567890', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-william-smith'),
    ('Dr. Sophia Johnson', 'Ophthalmologist', 'female', 16, '456 Elm Street, City, State', '9876543210', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-sophia-johnson'),
    ('Dr. Alexander Brown', 'Ophthalmologist', 'male', 14, '789 Oak Street, City, State', '2468135790', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-alexander-brown'),
    ('Dr. Mia Thompson', 'Ophthalmologist', 'female', 12, '321 Maple Street, City, State', '1357924680', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-mia-thompson'),
    
    # Otolaryngologist
    ('Dr. Olivia Smith', 'Otolaryngologist', 'female', 25, '123 Main Street, City, State', '1234567890', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-olivia-smith'),
    ('Dr. Liam Johnson', 'Otolaryngologist', 'male', 22, '456 Elm Street, City, State', '9876543210', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-liam-johnson'),
    ('Dr. Ava Brown', 'Otolaryngologist', 'female', 20, '789 Oak Street, City, State', '2468135790', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-ava-brown'),
    ('Dr. Noah Thompson', 'Otolaryngologist', 'male', 18, '321 Maple Street, City, State', '1357924680', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-noah-thompson'),
    
    # Dermatologist
    ('Dr. Benjamin Wilson', 'Dermatologist', 'male', 20, '123 Main Street, City, State', '1234567890', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-benjamin-wilson'),
    ('Dr. Charlotte Johnson', 'Dermatologist', 'female', 18, '456 Elm Street, City, State', '9876543210', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-charlotte-johnson'),
    ('Dr. Samuel Brown', 'Dermatologist', 'male', 16, '789 Oak Street, City, State', '2468135790', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-samuel-brown'),
    ('Dr. Grace Thompson', 'Dermatologist', 'female', 14, '321 Maple Street, City, State', '1357924680', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-grace-thompson'),
    
    # Psychiatrist
    ('Dr. William Smith', 'Psychiatrist', 'male', 18, '123 Main Street, City, State', '1234567890', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-william-smith'),
    ('Dr. Sophia Johnson', 'Psychiatrist', 'female', 16, '456 Elm Street, City, State', '9876543210', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-sophia-johnson'),
    ('Dr. Alexander Brown', 'Psychiatrist', 'male', 14, '789 Oak Street, City, State', '2468135790', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-alexander-brown'),
    ('Dr. Mia Thompson', 'Psychiatrist', 'female', 12, '321 Maple Street, City, State', '1357924680', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-mia-thompson'),
    
    # Neurologist
    ('Dr. Olivia Smith', 'Neurologist', 'female', 25, '123 Main Street, City, State', '1234567890', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-olivia-smith'),
    ('Dr. Liam Johnson', 'Neurologist', 'male', 22, '456 Elm Street, City, State', '9876543210', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-liam-johnson'),
    ('Dr. Ava Brown', 'Neurologist', 'female', 20, '789 Oak Street, City, State', '2468135790', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-ava-brown'),
    ('Dr. Noah Thompson', 'Neurologist', 'male', 18, '321 Maple Street, City, State', '1357924680', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-noah-thompson'),
    
    # Radiologist
    ('Dr. Benjamin Wilson', 'Radiologist', 'male', 20, '123 Main Street, City, State', '1234567890', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-benjamin-wilson'),
    ('Dr. Charlotte Johnson', 'Radiologist', 'female', 18, '456 Elm Street, City, State', '9876543210', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-charlotte-johnson'),
    ('Dr. Samuel Brown', 'Radiologist', 'male', 16, '789 Oak Street, City, State', '2468135790', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-samuel-brown'),
    ('Dr. Grace Thompson', 'Radiologist', 'female', 14, '321 Maple Street, City, State', '1357924680', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-grace-thompson'),
    
    # Anesthesiologist
    ('Dr. William Smith', 'Anesthesiologist', 'male', 18, '123 Main Street, City, State', '1234567890', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-william-smith'),
    ('Dr. Sophia Johnson', 'Anesthesiologist', 'female', 16, '456 Elm Street, City, State', '9876543210', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-sophia-johnson'),
    ('Dr. Alexander Brown', 'Anesthesiologist', 'male', 14, '789 Oak Street, City, State', '2468135790', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-alexander-brown'),
    ('Dr. Mia Thompson', 'Anesthesiologist', 'female', 12, '321 Maple Street, City, State', '1357924680', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-mia-thompson'),
    
    # Surgeon
    ('Dr. Olivia Smith', 'Surgeon', 'female', 25, '123 Main Street, City, State', '1234567890', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-olivia-smith'),
    ('Dr. Liam Johnson', 'Surgeon', 'male', 22, '456 Elm Street, City, State', '9876543210', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-liam-johnson'),
    ('Dr. Ava Brown', 'Surgeon', 'female', 20, '789 Oak Street, City, State', '2468135790', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-ava-brown'),
    ('Dr. Noah Thompson', 'Surgeon', 'male', 18, '321 Maple Street, City, State', '1357924680', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-noah-thompson'),
    
    # Physician Executive
    ('Dr. Benjamin Wilson', 'Physician Executive', 'male', 20, '123 Main Street, City, State', '1234567890', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-benjamin-wilson'),
    ('Dr. Charlotte Johnson', 'Physician Executive', 'female', 18, '456 Elm Street, City, State', '9876543210', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-charlotte-johnson'),
    ('Dr. Samuel Brown', 'Physician Executive', 'male', 16, '789 Oak Street, City, State', '2468135790', 'https://svgshare.com/i/tfW.svg', 'https://example.com/doctors/dr-samuel-brown'),
    ('Dr. Grace Thompson', 'Physician Executive', 'female', 14, '321 Maple Street, City, State', '1357924680', 'https://svgshare.com/i/teF.svg', 'https://example.com/doctors/dr-grace-thompson')
]

    with connection.cursor() as cursor:
        cursor.executemany(query, values)

        return render(request, 'index.html')
