from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.postgres.fields import ArrayField
from django.db.models import JSONField



class AppUserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('An email is required.')
        if not password:
            raise ValueError('A password is required.')
        email = self.normalize_email(email)
        user = self.model(email=email)
        user.set_password(password)
        user.save()
        # import PatientProfile here to avoid circular import
        from .models import PatientProfile
        profile = PatientProfile.objects.create(user=user)
        
        return user

    def create_superuser(self, email, password=None):
        if not email:
            raise ValueError('An email is required.')
        if not password:
            raise ValueError('A password is required.')
        user = self.create_user(email, password)
        user.is_superuser = True
        user.save()
        return user


class AppUser(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=50)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    objects = AppUserManager()

    def __str__(self):
        return self.username


class PatientProfile(models.Model): 
    user = models.OneToOneField(AppUser, on_delete=models.CASCADE, related_name='profile')
    age = models.IntegerField(default=0)
    sex = models.CharField(max_length=20, default='Not to say')
    first_name = models.CharField(max_length=20, default='a')
    last_name = models.CharField(max_length=20, default='a')
    medical_history = ArrayField(models.CharField(max_length=200), blank=True, default=list)
    dob_day = models.IntegerField(default=0)
    dob_month = models.IntegerField(default=0)
    dob_year = models.IntegerField(default=0)
    height = models.IntegerField(default=0)
    weight = models.IntegerField(default=0)
    current_med = ArrayField(models.CharField(max_length=200), blank=True, default=list)
    exercise = models.CharField(max_length=200, default='no exercise')
    diet = models.CharField(max_length=200, default='no diet')
    smoke_cons  = models.CharField(max_length=200, default='no smoke')
    alcohol_cons = models.CharField(max_length=200, default='no alcohol')
    bp_log = JSONField(default=dict)
    blood_glucose = JSONField(default=dict)
    new_patient = models.BooleanField(default=True)

class DoctorProfile(models.Model):
    name = models.CharField(max_length=200, default='NA')
    speciality = models.CharField(max_length=200, default='NA')
    sex = models.CharField(max_length=200, default='NA')
    experience = models.IntegerField(default=0)
    work_address = models.CharField(max_length=200, default='NA')
    mobile_no = models.CharField(max_length=200, default='0000000000')
    image_link = models.URLField(max_length=200)
    profile_link = models.URLField(max_length=200)

class symptoms_diseases(models.Model):
    itching = models.IntegerField()
    skin_rash = models.IntegerField()
    shivering = models.IntegerField()
    chills = models.IntegerField()
    joint_pain = models.IntegerField()
    stomach_pain = models.IntegerField()
    acidity = models.IntegerField()
    ulcers_on_tongue = models.IntegerField()
    muscle_wasting = models.IntegerField()
    vomiting = models.IntegerField()
    burning_micturition = models.IntegerField()
    spotting_urination = models.IntegerField()
    fatigue = models.IntegerField()
    weight_gain = models.IntegerField()
    anxiety = models.IntegerField()
    cold_hands_and_feets = models.IntegerField()
    mood_swings = models.IntegerField()
    weight_loss = models.IntegerField()
    restlessness = models.IntegerField()
    lethargy = models.IntegerField()
    patches_in_throat = models.IntegerField()
    irregular_sugar_level = models.IntegerField()
    cough = models.IntegerField()
    high_fever = models.IntegerField()
    sunken_eyes = models.IntegerField()
    breathlessness = models.IntegerField()
    sweating = models.IntegerField()
    dehydration = models.IntegerField()
    indigestion = models.IntegerField()
    headache = models.IntegerField()
    yellowish_skin = models.IntegerField()
    dark_urine = models.IntegerField()
    nausea = models.IntegerField()
    loss_of_appetite = models.IntegerField()
    pain_behind_the_eyes = models.IntegerField()
    back_pain = models.IntegerField()
    constipation = models.IntegerField()
    abdominal_pain = models.IntegerField()
    diarrhoea = models.IntegerField()
    mild_fever = models.IntegerField()
    yellow_urine = models.IntegerField()
    yellowing_of_eyes = models.IntegerField()
    acute_liver_failure = models.IntegerField()
    fluid_overload = models.IntegerField()
    swelling_of_stomach = models.IntegerField()
    swelled_lymph_nodes = models.IntegerField()
    malaise = models.IntegerField()
    blurred_and_distorted_vision = models.IntegerField()	
    phlegm = models.IntegerField()	
    throat_irritation = models.IntegerField()	
    redness_of_eyes  = models.IntegerField()	
    sinus_pressure = models.IntegerField()	
    runny_nose = models.IntegerField()	
    congestion = models.IntegerField()	
    chest_pain = models.IntegerField() 	
    weakness_in_limbs = models.IntegerField()	
    fast_heart_rate = models.IntegerField()	
    pain_during_bowel_movements = models.IntegerField()	
    pain_in_anal_region = models.IntegerField()	
    bloody_stool = models.IntegerField()	
    irritation_in_anus = models.IntegerField()	
    neck_pain = models.IntegerField()	
    dizziness = models.IntegerField()	
    cramps = models.IntegerField()	
    bruising = models.IntegerField()	
    obesity = models.IntegerField()	
    swollen_legs = models.IntegerField()	
    swollen_blood_vessels = models.IntegerField()	
    puffy_face_and_eyes = models.IntegerField()	
    enlarged_thyroid = models.IntegerField()	
    brittle_nails = models.IntegerField()	
    swollen_extremeties = models.IntegerField()	
    excessive_hunger = models.IntegerField()	
    extra_marital_contacts = models.IntegerField()	
    drying_and_tingling_lips = models.IntegerField()	
    slurred_speech = models.IntegerField()	
    knee_pain = models.IntegerField()	
    hip_joint_pain = models.IntegerField()	
    muscle_weakness = models.IntegerField()	
    stiff_neck = models.IntegerField()	
    swelling_joints = models.IntegerField()	
    movement_stiffness = models.IntegerField()	
    spinning_movements = models.IntegerField()	
    loss_of_balance = models.IntegerField()
    unsteadiness = models.IntegerField()
    weakness_of_one_body_side = models.IntegerField()
    loss_of_smell = models.IntegerField()
    bladder_discomfort = models.IntegerField()
    foul_smell_of_urine = models.IntegerField()
    continuous_feel_of_urine = models.IntegerField()
    passage_of_gases = models.IntegerField()
    internal_itching = models.IntegerField()
    toxic_look = models.IntegerField()
    depression = models.IntegerField()
    irritability = models.IntegerField()
    muscle_pain = models.IntegerField()
    altered_sensorium = models.IntegerField()
    red_spots_over_body = models.IntegerField()
    belly_pain = models.IntegerField()
    abnormal_menstruation = models.IntegerField()
    dischromic_patches = models.IntegerField()
    watering_from_eyes = models.IntegerField()
    increased_appetite = models.IntegerField()
    polyuria = models.IntegerField()
    family_history = models.IntegerField()
    mucoid_sputum = models.IntegerField()
    rusty_sputum = models.IntegerField()
    lack_of_concentration = models.IntegerField()
    visual_disturbances = models.IntegerField()
    receiving_blood_transfusion = models.IntegerField()
    receiving_unsterile_injections = models.IntegerField()
    coma = models.IntegerField()
    stomach_bleeding = models.IntegerField()
    distention_of_abdomen = models.IntegerField()
    history_of_alcohol_consumption = models.IntegerField()
    blood_in_sputum = models.IntegerField()
    prominent_veins_on_calf = models.IntegerField()
    palpitations = models.IntegerField()
    painful_walking = models.IntegerField()
    pus_filled_pimples = models.IntegerField()
    blackheads = models.IntegerField()
    scurring = models.IntegerField()
    skin_peeling = models.IntegerField()
    silver_like_dusting = models.IntegerField()
    small_dents_in_nails = models.IntegerField()
    inflammatory_nails = models.IntegerField()
    blister = models.IntegerField()
    red_sore_around_nose = models.IntegerField()
    yellow_crust_ooze = models.IntegerField()
    prognosis = models.CharField(max_length=100)


    class Meta:
        db_table = 'symptoms_diseases'

class Predicted_Diseases(models.Model) :
    diseases = ArrayField(models.CharField(max_length=200), blank=True, default=list)
    diseases_prob = ArrayField(models.FloatField(default=0), blank=True, default=list)
