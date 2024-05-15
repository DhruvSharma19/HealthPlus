from django.core.exceptions import ValidationError
from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from .models import PatientProfile, Predicted_Diseases, DoctorProfile

UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = '__all__'
	def create(self, clean_data):
		user_obj = UserModel.objects.create_user(email=clean_data['email'], password=clean_data['password'])
		user_obj.username = clean_data['username']
		user_obj.save()
		return user_obj

class UserLoginSerializer(serializers.Serializer):
	email = serializers.EmailField()
	password = serializers.CharField()
	##
	def check_user(self, clean_data):
		user = authenticate(username=clean_data['email'], password=clean_data['password'])
		if not user:
			raise ValidationError('user not found')
		return user

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = ('email', 'username')


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientProfile
        fields = ('__all__')

    def create(self, validated_data):
        user = self.context['request'].user
        profile = PatientProfile.objects.create(user=user, **validated_data)
        return profile

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class PredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Predicted_Diseases
        fields = ('diseases', 'diseases_prob')


class DoctorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorProfile
        fields = '__all__'
